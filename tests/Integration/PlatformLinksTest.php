<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Db;
use Piwik\Option;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\PlatformException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Model\LinkPresenter;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\ConnectionState;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Store;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Transport;
use Piwik\Plugins\FeinwerkCampaignManager\Updates_5_1_0;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The connected link builder's API against a scripted platform (contract §4): website mapping, platform campaigns,
 * links with short link and QR code kept in the local list, idempotency keys, and the 409 when not connected.
 *
 * @group FeinwerkCampaignManager
 */
class PlatformLinksTest extends IntegrationTestCase
{
    /** @var FakePlatform */
    public static $platform;

    /** the row shapes of GET /websites as CampaignsApp's code builds them (2026-11-26) */
    private const WEBSITES = [
        // the workspace reads from this Matomo (connection in the app): this_matomo true
        ['id' => 'WEB1', 'name' => 'Lindenholz', 'url' => 'https://www.lindenholz.example', 'domains' => ['lindenholz.example'],
            'source' => 'matomo', 'matomo_site_id' => 1, 'this_matomo' => true],
        // created at consent, the workspace reads from no Matomo yet: site id set, this_matomo false
        ['id' => 'WEB9', 'name' => 'Other', 'url' => 'https://www.other.example', 'domains' => ['www.other.example'],
            'source' => 'matomo', 'matomo_site_id' => 2, 'this_matomo' => false],
    ];

    private const CONVENTION = [
        'parameters' => ['style' => 'utm', 'base' => 'utm', 'names' => ['source' => 'utm_source', 'medium' => 'utm_medium',
            'campaign' => 'utm_campaign', 'content' => 'utm_content', 'term' => 'utm_term', 'id' => 'utm_id']],
        'fields' => [], 'channels' => [], 'networks' => [],
    ];

    public function provideContainerConfig()
    {
        self::$platform = self::$platform ?? new FakePlatform();

        return ['Piwik\\Access' => new FakeAccess(), Transport::class => self::$platform];
    }

    public function setUp(): void
    {
        parent::setUp();
        FakeAccess::$superUser = true;
        FakeAccess::$idSitesWrite = [];
        FakeAccess::$idSitesView = [];
        PlatformConfig::$enabledOverride = null;
        LinkPresenter::forgetPlatformState();
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Lindenholz', 'https://www.lindenholz.example');
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Other', 'https://www.other.example');
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Nowhere', 'https://nowhere.example');
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
        \Piwik\Cache::getLazyCache()->flushAll();
        self::$platform->reset();
        Fixture::loadAllTranslations();
        (new Store())->saveConnection(new ConnectionState('fwcp_secret', 'W1', 'Online', 'C1', 'https://matomo.example.com',
            'superUserLogin', '2026-11-25 10:00:00', 'active', '2026-11-25 10:00:00'));
    }

    public function tearDown(): void
    {
        Option::delete(Store::CONNECTION);
        Fixture::resetTranslations();
        parent::tearDown();
    }

    public function test_websitesMapBySiteIdThenByDomain(): void
    {
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, self::CONVENTION);
        $one = API::getInstance()->getPlatformConvention(1)['website'];
        $this->assertSame(['WEB1', 'site'], [$one['id'], $one['match']]);
        $two = API::getInstance()->getPlatformConvention(2)['website'];
        $this->assertSame(['WEB9', 'domain'], [$two['id'], $two['match']], 'cached websites and convention');
        try {
            API::getInstance()->getPlatformConvention(3);
            $this->fail('no website');
        } catch (PlatformException $e) {
            $this->assertSame('no_website', $e->reason);
            $this->assertSame(409, $e->getCode());
            $this->assertStringContainsString('Online', $e->getMessage());
        }
        $this->assertCount(2, self::$platform->calls, 'websites and convention once each, then from the cache');
    }

    /** a second Matomo site with the address of a website tied to another site maps to nothing (CampaignsApp, 2026-11-25) */
    public function test_aWebsiteTiedToAnotherSiteIsNotTakenByDomain(): void
    {
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Lindenholz copy', 'https://www.lindenholz.example');
        self::$platform->answer(200, self::WEBSITES);
        try {
            API::getInstance()->getPlatformConvention(4);
            $this->fail('no website');
        } catch (PlatformException $e) {
            $this->assertSame('no_website', $e->reason);
        }
    }

    public function test_aCampaignIsCreatedForTheMappedWebsiteWithAnIdempotencyKey(): void
    {
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(201, ['campaign' => ['id' => 'CAMP1', 'name' => 'Herbst', 'parameter' => '2026_herbst', 'status' => 'draft',
            'app_url' => PlatformConfig::DEFAULT_URL . '/w/W1/c/CAMP1'], 'existed' => false]);
        $answer = API::getInstance()->addPlatformCampaign(1, 'Herbst', '', '2026-10-01');
        $this->assertSame(['CAMP1', '2026_herbst', false], [$answer['campaign']['id'], $answer['campaign']['parameter'], $answer['existed']]);
        [$method, $url, $headers, $body] = self::$platform->calls[1];
        $this->assertSame(['POST', PlatformConfig::DEFAULT_URL . '/api/plugin/v1/campaigns'], [$method, $url]);
        $sent = json_decode((string) $body, true);
        $this->assertSame(['WEB1'], $sent['website_ids']);
        $this->assertSame('2026-10-01', $sent['starts_on']);
        $this->assertNull($sent['parameter']);
        $this->assertNotEmpty(preg_grep('/^Idempotency-Key: fwcm-campaign-[0-9a-f]{40}$/', $headers));
    }

    public function test_aPlatformLinkIsKeptInTheLocalListWithItsShortLinkAndQrCode(): void
    {
        $link = [
            'id' => 'LINK1', 'status' => 'live', 'campaign_id' => 'CAMP1', 'campaign_name' => 'Herbst',
            'url' => 'https://www.lindenholz.example/jacken?utm_source=newsletter&utm_medium=email&utm_campaign=2026_herbst&utm_content=kopf&utm_id=Kx7f2',
            'target_url' => 'https://www.lindenholz.example/jacken', 'website_id' => 'WEB1', 'values' => ['source' => 'newsletter'],
            'tracking_id' => 'Kx7f2', 'short_url' => 'https://fw.ink/abc', 'qr' => ['id' => 'QR1', 'formats' => ['svg', 'png']],
            'app_url' => PlatformConfig::DEFAULT_URL . '/w/W1/l/LINK1', 'placement' => null,
        ];
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, self::CONVENTION);
        self::$platform->answer(201, ['link' => $link, 'existed' => false]);
        $answer = API::getInstance()->addPlatformLink(1, 'https://www.lindenholz.example/jacken', 'CAMP1', 'newsletter', 'email', 'kopf', '', 'newsletter', '', 1, 1, 'Fuer den Newsletter');
        $this->assertStringEndsWith('/api/plugin/v1/links', self::$platform->calls[2][1], 'the convention first, then the link');
        $sent = json_decode((string) self::$platform->calls[2][3], true);
        $this->assertSame(['WEB1', 'CAMP1', 'live', true, true], [$sent['website_id'], $sent['campaign_id'], $sent['status'], $sent['short_link'], $sent['dynamic_qr']]);
        $this->assertSame(['source' => 'newsletter', 'medium' => 'email', 'content' => 'kopf'], $sent['values']);

        $saved = $answer['link'];
        $this->assertFalse($answer['existed']);
        $this->assertSame($link['url'], $saved['url']);
        $this->assertSame(['2026_herbst', 'newsletter', 'email', 'kopf', 'Kx7f2'], [$saved['values']['campaign'], $saved['values']['source'],
            $saved['values']['medium'], $saved['values']['content'], $saved['values']['campaignId']]);
        $this->assertSame(['live', 'platform'], [$saved['status'], $saved['liveReason']]);
        $this->assertSame('https://fw.ink/abc', $saved['platform']['shortUrl']);
        $this->assertSame('index.php?module=FeinwerkCampaignManager&action=platformQr&idSite=1&idLink=' . $saved['idLink'], $saved['platform']['qrUrl']);
        $this->assertSame('Fuer den Newsletter', $saved['note']);
        $this->assertStringNotContainsString('fwcp_secret', (string) json_encode($answer));

        // the platform answers the same link again: one row here
        self::$platform->answer(200, ['link' => $link, 'existed' => true]);
        $again = API::getInstance()->addPlatformLink(1, 'https://www.lindenholz.example/jacken', 'CAMP1', 'newsletter', 'email', 'kopf', '', 'newsletter', '', 1, 1);
        $this->assertTrue($again['existed']);
        $this->assertSame($saved['idLink'], $again['link']['idLink']);
        $this->assertSame(1, API::getInstance()->getLinks(1)['total']);
    }

    /** QR codes only while the connection works; nothing about the platform with platform = 0 (UI review F3) */
    public function test_theListShowsPlatformPartsOnlyWhileUsable(): void
    {
        $link = ['id' => 'LINK2', 'status' => 'live', 'campaign_id' => 'CAMP1',
            'url' => 'https://www.lindenholz.example/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_herbst&utm_id=Q1',
            'target_url' => 'https://www.lindenholz.example/', 'tracking_id' => 'Q1', 'short_url' => 'https://fw.ink/q1',
            'qr' => ['id' => 'QR2', 'formats' => ['svg']], 'app_url' => PlatformConfig::DEFAULT_URL . '/w/W1/l/LINK2'];
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, self::CONVENTION);
        self::$platform->answer(201, ['link' => $link, 'existed' => false]);
        $idLink = API::getInstance()->addPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email', '', '', '', '', 1, 1)['link']['idLink'];

        LinkPresenter::forgetPlatformState();
        (new Store())->saveConnection((new Store())->connection()->withState('lost', '2026-11-26 00:00:00'));
        $platform = API::getInstance()->getLink(1, $idLink)['platform'];
        $this->assertNull($platform['qrUrl'], 'no QR download while the connection is lost');
        $this->assertSame('https://fw.ink/q1', $platform['shortUrl'], 'the short link keeps redirecting');

        LinkPresenter::forgetPlatformState();
        PlatformConfig::$enabledOverride = false;
        $this->assertNull(API::getInstance()->getLink(1, $idLink)['platform']);
        LinkPresenter::forgetPlatformState();
    }

    public function test_inputIsCheckedBeforeAnyCall(): void
    {
        foreach ([['', 'CAMP1', 0, 0, 'targetUrl'], ['https://www.lindenholz.example/', '', 0, 0, 'platformCampaignId'],
            ['https://www.lindenholz.example/', 'CAMP1', 0, 1, 'dynamicQr'], ['https://www.lindenholz.example/', 'CAMP1', 'yes', 0, 'shortLink']] as [$target, $campaign, $short, $qr, $param]) {
            try {
                API::getInstance()->addPlatformLink(1, $target, $campaign, 'newsletter', 'email', '', '', '', '', $short, $qr);
                $this->fail($param);
            } catch (InvalidInputException $e) {
                $this->assertStringContainsString($param, $e->getMessage());
            }
        }
        $this->assertSame([], self::$platform->calls);
    }

    public function test_withoutAConnectionThePlatformMethodsAnswer409(): void
    {
        Option::delete(Store::CONNECTION);
        try {
            API::getInstance()->getPlatformCampaigns(1);
            $this->fail('409 expected');
        } catch (PlatformException $e) {
            $this->assertSame(['not_connected', 409], [$e->reason, $e->getCode()]);
        }
        $this->assertSame([], self::$platform->calls);
    }

    /** the picker pages through the workspace (no website filter on GET /campaigns) and keeps this site's website */
    public function test_writeUsersGetTheirWebsitesCampaignsAcrossPages(): void
    {
        FakeAccess::$superUser = false;
        FakeAccess::$idSitesWrite = [1];
        FakeAccess::$idSitesView = [1];
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, ['data' => [
            ['id' => 'CAMP9', 'name' => 'Herbst Other', 'parameter' => '2026_herbst_other', 'status' => 'live', 'website_ids' => ['WEB9']],
        ], 'next_cursor' => 'page-2']);
        self::$platform->answer(200, ['data' => [
            ['id' => 'CAMP1', 'name' => 'Herbst', 'parameter' => '2026_herbst', 'status' => 'live', 'website_ids' => ['WEB1'],
                'app_url' => 'javascript:alert(1)'],
        ], 'next_cursor' => null]);
        $campaigns = API::getInstance()->getPlatformCampaigns(1, 'herb', 5);
        $this->assertSame(['CAMP1'], array_column($campaigns, 'id'), 'only the campaigns of this site\'s website');
        $this->assertNull($campaigns[0]['appUrl'], 'only links into the platform');
        $this->assertStringContainsString('q=herb', self::$platform->calls[1][1]);
        $this->assertStringContainsString('limit=100', self::$platform->calls[1][1]);
        $this->assertStringContainsString('website_id=WEB1', self::$platform->calls[1][1], 'the platform filters, the plugin too');
        $this->assertStringContainsString('cursor=page-2', self::$platform->calls[2][1]);
        $this->assertCount(3, self::$platform->calls);
    }

    public function test_thePickerStopsAfterItsPages(): void
    {
        self::$platform->answer(200, self::WEBSITES);
        for ($i = 0; $i < PlatformService::CAMPAIGN_PAGES + 2; $i++) {
            self::$platform->answer(200, ['data' => [['id' => 'C' . $i, 'website_ids' => ['WEB9']]], 'next_cursor' => 'p' . ($i + 1)]);
        }
        $this->assertSame([], API::getInstance()->getPlatformCampaigns(1));
        $this->assertCount(1 + PlatformService::CAMPAIGN_PAGES, self::$platform->calls);
    }

    /** view users (and the anonymous user of a public site) reach the platform with none of the builder's calls */
    public function test_viewUsersReachNoPlatformCall(): void
    {
        FakeAccess::$superUser = false;
        FakeAccess::$idSitesView = [1];
        foreach ([
            static fn() => API::getInstance()->getPlatformCampaigns(1, 'herb'),
            static fn() => API::getInstance()->getPlatformConvention(1),
            static fn() => API::getInstance()->previewPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email'),
            static fn() => API::getInstance()->addPlatformCampaign(1, 'Neu'),
        ] as $i => $call) {
            try {
                $call();
                $this->fail('no access expected for call ' . $i);
            } catch (\Piwik\NoAccessException $e) {
                $this->addToAssertionCount(1);
            }
        }
        $this->assertSame([], self::$platform->calls);
    }

    public function test_aPreviewIsBuiltByThePlatformAndSavesNothing(): void
    {
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, ['url' => 'https://www.lindenholz.example/?utm_source=newsletter&utm_id=xxxxxxxx',
            'params' => [['key' => 'source', 'name' => 'utm_source', 'value' => 'newsletter']], 'errors' => [], 'warnings' => []]);
        $preview = API::getInstance()->previewPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email', '', '', 'newsletter', '', 1, 0);
        [$method, $url, $headers, $body] = self::$platform->calls[1];
        $this->assertSame(['POST', PlatformConfig::DEFAULT_URL . '/api/plugin/v1/links/preview'], [$method, $url]);
        $sent = json_decode((string) $body, true);
        $this->assertSame(['WEB1', 'CAMP1', true, false], [$sent['website_id'], $sent['campaign_id'], $sent['short_link'], $sent['dynamic_qr']]);
        $this->assertArrayNotHasKey('status', $sent, 'a preview is no link');
        $this->assertEmpty(preg_grep('/^Idempotency-Key:/', $headers));
        $this->assertSame('utm_source', $preview['params'][0]['name']);
        $this->assertSame(0, API::getInstance()->getLinks(1)['total']);
    }

    public function test_aPreviewNeedsValidInputAndAConnection(): void
    {
        try {
            API::getInstance()->previewPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email', '', '', '', '', 0, 1);
            $this->fail('dynamicQr needs shortLink');
        } catch (InvalidInputException $e) {
            $this->assertStringContainsString('dynamicQr', $e->getMessage());
        }
        try {
            API::getInstance()->previewPlatformLink(1, 'https://www.lindenholz.example/', 'not a campaign!', 'newsletter', 'email');
            $this->fail('bad campaign id');
        } catch (InvalidInputException $e) {
            $this->assertStringContainsString('platformCampaignId', $e->getMessage());
        }
        $this->assertSame([], self::$platform->calls);
        Option::delete(Store::CONNECTION);
        try {
            API::getInstance()->previewPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email');
            $this->fail('409 expected');
        } catch (PlatformException $e) {
            $this->assertSame(['not_connected', 409], [$e->reason, $e->getCode()]);
        }
    }

    /** a link created on the platform is live at once: nothing that can still fail here runs after it */
    public function test_noteAndDatesAreCheckedBeforeThePlatformCreatesALink(): void
    {
        foreach ([['', '2026-12-01', '2026-11-01', 'endDate'], [str_repeat('x', 2001), '', '', 'note'], ['', '2026-13-45', '', 'startDate']] as [$note, $start, $end, $param]) {
            try {
                API::getInstance()->addPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email', '', '', '', '', 1, 0, $note, $start, $end);
                $this->fail($param);
            } catch (InvalidInputException $e) {
                $this->assertStringContainsString($param, $e->getMessage());
            }
        }
        $this->assertSame([], self::$platform->calls);
    }

    /** short links and links into the platform end up in a browser's href: anything else is dropped */
    public function test_unsafePlatformUrlsAreNotKept(): void
    {
        $link = ['id' => 'LINK3', 'status' => 'live', 'campaign_id' => 'CAMP1',
            'url' => 'https://www.lindenholz.example/?utm_source=newsletter&utm_medium=email&utm_campaign=2026_herbst&utm_id=Z1',
            'target_url' => 'https://www.lindenholz.example/', 'tracking_id' => 'Z1', 'short_url' => 'javascript:alert(1)',
            'qr' => null, 'app_url' => 'https://evil.example/w/W1'];
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, self::CONVENTION);
        self::$platform->answer(201, ['link' => $link, 'existed' => false]);
        $saved = API::getInstance()->addPlatformLink(1, 'https://www.lindenholz.example/', 'CAMP1', 'newsletter', 'email', '', '', '', '', 1, 0)['link'];
        $this->assertSame([null, null], [$saved['platform']['shortUrl'], $saved['platform']['appUrl']]);
        $row = Db::fetchRow('SELECT short_url, platform_app_url FROM ' . LinkDao::tableName() . ' WHERE idlink = ?', [$saved['idLink']]);
        $this->assertSame([null, null], [$row['short_url'], $row['platform_app_url']]);

        // a link without a usable URL is no link: the platform's answer is reported, nothing is kept
        self::$platform->answer(201, ['link' => ['id' => 'LINK4', 'url' => 'javascript:alert(1)', 'target_url' => 'https://www.lindenholz.example/'], 'existed' => false]);
        try {
            API::getInstance()->addPlatformLink(1, 'https://www.lindenholz.example/a', 'CAMP1', 'newsletter', 'email', '', '', '', '', 0, 0);
            $this->fail('bad answer');
        } catch (PlatformException $e) {
            $this->assertSame('bad_answer', $e->reason);
        }
        $this->assertSame(1, API::getInstance()->getLinks(1)['total']);
    }

    /** while connected the overview shows the workspace campaigns of the site's website (Peter, 2026-11-26: "Q2 ja") */
    public function test_theOverviewShowsTheWorkspaceCampaigns(): void
    {
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, ['data' => [
            ['id' => 'CAMP1', 'name' => 'Herbst', 'parameter' => '2026_herbst', 'status' => 'draft', 'website_ids' => ['WEB1'],
                'app_url' => PlatformConfig::DEFAULT_URL . '/w/W1/c/CAMP1'],
            ['id' => 'CAMP2', 'name' => 'Sommer Sale', 'parameter' => 'Sommer_Sale', 'status' => 'live', 'website_ids' => ['WEB1'],
                'starts_on' => '2026-06-01', 'ends_on' => '2026-06-30', 'app_url' => 'javascript:alert(1)'],
        ], 'next_cursor' => null]);
        $rows = array_column(API::getInstance()->getCampaigns(1, 'day', '2026-11-20'), null, 'campaign');
        $this->assertSame(['workspace', 'preparing', 'Herbst', false], [$rows['2026_herbst']['source'], $rows['2026_herbst']['phase'],
            $rows['2026_herbst']['name'], $rows['2026_herbst']['hasDetails']]);
        $this->assertSame(['CAMP1', 'draft', PlatformConfig::DEFAULT_URL . '/w/W1/c/CAMP1'], [$rows['2026_herbst']['platform']['id'],
            $rows['2026_herbst']['platform']['status'], $rows['2026_herbst']['platform']['appUrl']]);
        $this->assertSame(['running', '2026-06-01', null], [$rows['sommer_sale']['phase'], $rows['sommer_sale']['startDate'],
            $rows['sommer_sale']['platform']['appUrl']], 'keyed like the details, the status over the dates, only links into the platform');
        $this->assertStringContainsString('website_id=WEB1', self::$platform->calls[1][1]);

        $calls = count(self::$platform->calls);
        API::getInstance()->getCampaigns(1, 'month', '2026-11-20');
        $this->assertSame('CAMP1', API::getInstance()->getCampaign(1, '2026_HERBST', 'day', '2026-11-20')['platform']['id']);
        $this->assertCount($calls, self::$platform->calls, 'cached: page views add no platform calls');

        // another site of this Matomo that maps to no website: no workspace campaigns
        $this->assertSame([], array_filter(API::getInstance()->getCampaigns(3, 'day', '2026-11-20'), static fn($r) => $r['platform'] !== null));
    }

    /** "Neue Kampagne" while connected: created in the workspace, details here under its value (Peter, 2026-11-26) */
    public function test_aNewCampaignGoesToTheWorkspaceAndKeepsItsDetailsHere(): void
    {
        $campaign = ['id' => 'CAMP7', 'name' => 'Herbst', 'parameter' => '2026_herbst', 'status' => 'draft', 'website_ids' => ['WEB1'],
            'starts_on' => '2026-10-01', 'ends_on' => null, 'app_url' => PlatformConfig::DEFAULT_URL . '/w/W1/c/CAMP7'];
        self::$platform->answer(200, self::WEBSITES);
        self::$platform->answer(200, ['data' => [], 'next_cursor' => null]);
        $this->assertSame([], API::getInstance()->getCampaigns(1, 'day', '2026-11-20'), 'the empty workspace list is cached now');

        self::$platform->answer(201, ['campaign' => $campaign, 'existed' => false]);
        $created = API::getInstance()->addPlatformCampaign(1, 'Herbst', '', '2026-10-01');
        $details = API::getInstance()->addCampaign(1, $created['campaign']['parameter'], '', '', '', 'visits', 500, '', 'Nur hier');
        $this->assertFalse($details['existed']);

        self::$platform->answer(200, ['data' => [$campaign], 'next_cursor' => null]);
        $row = API::getInstance()->getCampaign(1, '2026_herbst', 'day', '2026-11-20');
        $this->assertSame(['details', true, 'Herbst', '2026-10-01', 'CAMP7', 'Nur hier'], [$row['source'], $row['hasDetails'], $row['name'],
            $row['startDate'], $row['platform']['id'], $row['notes']], 'creating cleared the cached list; name and start from the workspace');
    }

    /** the admin page's table: this Matomo's sites against the workspace websites (UI review R51 D3) */
    public function test_superUsersSeeWhichSiteBelongsToWhichWebsite(): void
    {
        self::$platform->answer(200, self::WEBSITES);
        $all = API::getInstance()->getPlatformWebsites();
        $this->assertSame([3, 100, 0], [$all['total'], $all['limit'], $all['offset']]);
        $this->assertSame([[1, 'WEB1', 'site'], [2, 'WEB9', 'domain'], [3, null, null]], array_map(
            static fn(array $s): array => [$s['idSite'], $s['website'] === null ? null : $s['website']['id'], $s['match']],
            $all['sites']
        ));
        $this->assertSame(['Lindenholz', 'https://www.lindenholz.example'], [$all['sites'][0]['name'], $all['sites'][0]['url']]);
        $this->assertSame(['WEB1', 'WEB9'], array_column($all['websites'], 'id'));

        $page = API::getInstance()->getPlatformWebsites(1, 2);
        $this->assertSame([3], array_column($page['sites'], 'idSite'));
        $this->assertCount(1, self::$platform->calls, 'the websites come from the cache');

        foreach ([[0, 0, 'limit'], [501, 0, 'limit'], [10, -1, 'offset'], ['x', 0, 'limit']] as [$limit, $offset, $param]) {
            try {
                API::getInstance()->getPlatformWebsites($limit, $offset);
                $this->fail($param);
            } catch (InvalidInputException $e) {
                $this->assertStringContainsString($param, $e->getMessage());
            }
        }
        Option::delete(Store::CONNECTION);
        try {
            API::getInstance()->getPlatformWebsites();
            $this->fail('409 expected');
        } catch (PlatformException $e) {
            $this->assertSame(['not_connected', 409], [$e->reason, $e->getCode()]);
        }
        FakeAccess::$superUser = false;
        FakeAccess::$idSitesWrite = [1];
        $this->expectException(\Piwik\NoAccessException::class);
        API::getInstance()->getPlatformWebsites();
    }

    public function test_theAnonymousUserGetsNoWorkspaceCampaigns(): void
    {
        FakeAccess::$superUser = false;
        FakeAccess::$idSitesView = [1];
        FakeAccess::$identity = 'anonymous';
        try {
            $this->assertSame([], API::getInstance()->getCampaigns(1, 'day', '2026-11-20'));
            $this->assertSame([], self::$platform->calls, 'no platform call for a public page view');
        } finally {
            FakeAccess::$identity = 'superUserLogin';
        }
    }

    public function test_standaloneOrFailingTheOverviewStaysLocal(): void
    {
        Option::delete(Store::CONNECTION);
        $this->assertSame([], API::getInstance()->getCampaigns(1, 'day', '2026-11-20'));
        $this->assertSame([], self::$platform->calls, 'standalone: no call');

        (new Store())->saveConnection(new ConnectionState('fwcp_secret', 'W1', 'Online', 'C1', 'https://matomo.example.com',
            'superUserLogin', '2026-11-25 10:00:00', 'active', '2026-11-25 10:00:00'));
        self::$platform->answer(0, null);
        $this->assertSame([], API::getInstance()->getCampaigns(1, 'day', '2026-11-20'), 'unreachable: the local overview');
        $calls = count(self::$platform->calls);
        API::getInstance()->getCampaigns(1, 'day', '2026-11-20');
        $this->assertCount($calls, self::$platform->calls, 'a failure is remembered, the page does not wait again');
    }

    public function test_theUpdateAddsOnlyMissingColumns(): void
    {
        // update files are not autoloaded: Matomo includes them by file name
        require_once __DIR__ . '/../../Updates/5.1.0.php';
        $update = StaticContainer::getContainer()->make(Updates_5_1_0::class);
        $this->assertSame([], $update->getMigrations(new \Piwik\Updater()), 'a fresh install has them');
        Db::query('ALTER TABLE ' . LinkDao::tableName() . ' DROP COLUMN short_url, DROP COLUMN platform_qr');
        $this->assertCount(1, $update->getMigrations(new \Piwik\Updater()));
        $update->doUpdate(new \Piwik\Updater());
        $this->assertSame([], $update->getMigrations(new \Piwik\Updater()));
    }
}
