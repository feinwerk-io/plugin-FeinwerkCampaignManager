<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Config;
use Piwik\Db;
use Piwik\NoAccessException;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\NotFoundException;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fields;
use Piwik\Plugins\FeinwerkCampaignManager\Model\InstanceContext;
use Piwik\Plugins\FeinwerkCampaignManager\Model\Today;
use Piwik\Plugins\SitesManager\API as SitesManagerApi;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The link API on a real Matomo: checks, saves, changes, archives and lists links of a website.
 *
 * @group FeinwerkCampaignManager
 */
class LinkApiTest extends IntegrationTestCase
{
    private const TARGET = 'https://www.lindenholz.example/herbst';

    /** set per test: whether Marketing Campaigns Reporting counts as active */
    public static bool $mcr = false;

    public function provideContainerConfig()
    {
        return [
            'Piwik\\Access' => new FakeAccess(),
            InstanceContext::class => new class extends InstanceContext {
                public function isMcrActive(): bool
                {
                    return LinkApiTest::$mcr;
                }
            },
            // a fixed day, so start dates before or after it decide draft or live (LinkLockTest covers the lock)
            Today::class => new class extends Today {
                public function forSite(int $idSite): string
                {
                    return '2026-11-20';
                }
            },
        ];
    }

    public function setUp(): void
    {
        parent::setUp();
        self::$mcr = false;
        FakeAccess::$superUser = true;
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Lindenholz', 'https://www.lindenholz.example');
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Other', 'https://other.example');
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
        Fixture::loadAllTranslations();
    }

    public function tearDown(): void
    {
        Fixture::resetTranslations();
        parent::tearDown();
    }

    private static function api(): API
    {
        return API::getInstance();
    }

    private static function rows(): int
    {
        return (int) Db::fetchOne('SELECT COUNT(*) FROM ' . LinkDao::tableName());
    }

    private static function codes(array $messages): array
    {
        return array_map(static fn(array $m): string => $m['field'] . ':' . $m['code'], $messages);
    }

    private static function add(string $campaign = 'herbst', array $more = []): array
    {
        return self::api()->addLink(
            1,
            $more['targetUrl'] ?? self::TARGET,
            $campaign,
            $more['parameterSet'] ?? 'utm',
            $more['source'] ?? 'newsletter',
            $more['medium'] ?? 'email'
        );
    }

    public function test_previewLink_buildsAndChecksWithoutSaving(): void
    {
        $preview = self::api()->previewLink(1, self::TARGET . '?ref=7#top', ' Herbst ', 'utm', 'Newsletter', 'email');

        $this->assertTrue($preview['valid']);
        $this->assertSame('https://www.lindenholz.example/herbst?ref=7&utm_source=newsletter&utm_medium=email&utm_campaign=herbst#top', $preview['url']);
        $this->assertSame('herbst', $preview['values']['campaign']);
        $this->assertSame(['source:not_read', 'medium:not_read'], self::codes($preview['warnings']), 'core stores no source or medium');
        $this->assertStringContainsString('Marketing Campaigns Reporting', $preview['warnings'][0]['message']);
        $this->assertNull($preview['existingIdLink']);
        $this->assertFalse($preview['campaignIdOnSave']);
        $this->assertSame(0, self::rows());
    }

    public function test_previewLink_reportsErrorsWithReadableMessages(): void
    {
        $preview = self::api()->previewLink(1, 'https://www.lindenholz.example/?utm_campaign=old', '');

        $this->assertFalse($preview['valid']);
        $this->assertNull($preview['url']);
        $this->assertSame(['targetUrl:has_campaign_parameters', 'campaign:required'], self::codes($preview['errors']));
        $this->assertStringContainsString('utm_campaign', $preview['errors'][0]['message']);
    }

    public function test_previewLink_unknownParameterSet_isA400NamingTheAllowedSets(): void
    {
        try {
            self::api()->previewLink(1, self::TARGET, 'x', 'ga4');
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString('parameterSet', $e->getMessage());
            $this->assertStringContainsString('utm, mtm', $e->getMessage());
        }
    }

    public function test_addLink_savesOnceAndReturnsTheSameLinkAgain(): void
    {
        $first = self::add();
        $again = self::add(' HERBST ');

        $this->assertFalse($first['existed']);
        $this->assertTrue($again['existed']);
        $this->assertSame($first['link']['idLink'], $again['link']['idLink']);
        $this->assertSame(1, self::rows());

        $link = $first['link'];
        $this->assertSame('https://www.lindenholz.example/herbst?utm_source=newsletter&utm_medium=email&utm_campaign=herbst', $link['url']);
        $this->assertSame('superUserLogin', $link['createdBy']);
        $this->assertSame(1, preg_match('/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/', $link['createdAt']), $link['createdAt']);
        $this->assertFalse($link['archived']);
        $this->assertSame('', $link['values']['campaignId']);
    }

    public function test_addLink_withMcr_generatesALinkIdThatDoesNotBreakIdempotency(): void
    {
        self::$mcr = true;
        $first = self::add();
        $again = self::add();

        $this->assertSame(1, preg_match('/^[a-z2-9]{8}$/', $first['link']['values']['campaignId']), $first['link']['values']['campaignId']);
        $this->assertTrue($first['link']['campaignIdGenerated']);
        $this->assertStringContainsString('&utm_id=' . $first['link']['values']['campaignId'], $first['link']['url']);
        $this->assertTrue($again['existed']);
        $this->assertSame(1, self::rows());
    }

    public function test_updateLink_keepsAGeneratedLinkId_sentBackUnchanged(): void
    {
        self::$mcr = true;
        $saved = self::add()['link'];
        $code = $saved['values']['campaignId'];

        // the builder sends every field, the generated ID included
        $changed = self::api()->updateLink(1, $saved['idLink'], null, null, null, null, 'social', null, null, $code)['link'];

        $this->assertSame($code, $changed['values']['campaignId']);
        $this->assertTrue($changed['campaignIdGenerated']);
        $this->assertStringContainsString('utm_id=' . $code, $changed['url']);

        $kept = self::api()->updateLink(1, $saved['idLink'], null, null, null, null, 'email')['link'];
        $this->assertSame($code, $kept['values']['campaignId'], 'not given keeps it');
        $this->assertTrue($kept['campaignIdGenerated']);
    }

    public function test_previewOfASavedLink_buildsTheSameUrlAsTheList(): void
    {
        self::$mcr = true;
        $link = self::add()['link'];
        $v = $link['values'];

        $preview = self::api()->previewLink(1, $link['targetUrl'], $v['campaign'], $link['parameterSet'], $v['source'], $v['medium'], $v['keyword'], $v['content'], $v['campaignId']);

        $this->assertSame($link['url'], $preview['url']);
        $this->assertSame($link['url'], self::api()->getLink(1, $link['idLink'])['url']);
    }

    public function test_updateLink_emptyCampaignId_clearsAGeneratedOne(): void
    {
        self::$mcr = true;
        $saved = self::add()['link'];

        $cleared = self::api()->updateLink(1, $saved['idLink'], null, null, null, null, null, null, null, '')['link'];

        $this->assertSame('', $cleared['values']['campaignId']);
        $this->assertFalse($cleared['campaignIdGenerated']);
        $this->assertStringNotContainsString('utm_id=', $cleared['url']);
    }

    public function test_addLink_withErrors_isA400AndSavesNothing(): void
    {
        try {
            self::add('', ['targetUrl' => 'ftp://files.example/']);
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString('targetUrl', $e->getMessage());
            $this->assertStringContainsString('ftp://files.example/', $e->getMessage());
            $this->assertStringContainsString('campaign', $e->getMessage());
        }
        $this->assertSame(0, self::rows());
    }

    public function test_addLink_invalidDates_areA400(): void
    {
        $this->expectException(InvalidInputException::class);
        $this->expectExceptionMessage('endDate');
        self::api()->addLink(1, self::TARGET, 'x', 'utm', '', '', '', '', '', '', '', '2026-12-01', '2026-11-01');
    }

    public function test_writes_needWriteAccess_readsViewAccess(): void
    {
        $saved = self::add();
        FakeAccess::clearAccess(false, [], [1], 'viewer');

        $this->assertSame($saved['link']['idLink'], self::api()->getLink(1, $saved['link']['idLink'])['idLink']);
        $this->assertTrue(self::api()->previewLink(1, self::TARGET, 'x')['valid']);
        try {
            self::add('other');
            $this->fail('write access needed');
        } catch (NoAccessException $e) {
            $this->assertSame(1, self::rows());
        }
    }

    public function test_viewerOfAnotherSite_seesNothing(): void
    {
        self::add();
        FakeAccess::clearAccess(false, [], [2], 'viewer');
        $this->expectException(NoAccessException::class);
        self::api()->getLinks(1);
    }

    public function test_updateLink_changesOnlyWhatIsGiven(): void
    {
        $id = self::add()['link']['idLink'];

        // a start date after today keeps the link a draft, so its values can still change
        $changed = self::api()->updateLink(1, $id, null, null, null, null, 'social', null, null, null, null, null, '2026-12-01', null, 'Flyer');
        $link = $changed['link'];

        $this->assertSame('social', $link['values']['medium']);
        $this->assertSame('newsletter', $link['values']['source']);
        $this->assertSame('herbst', $link['values']['campaign']);
        $this->assertSame('2026-12-01', $link['startDate']);
        $this->assertSame('draft', $link['status']);
        $this->assertSame('Flyer', $link['note']);
        $this->assertStringContainsString('utm_medium=social', $link['url']);

        $cleared = self::api()->updateLink(1, $id, null, null, null, '', null, null, null, null, null, null, null, null, '')['link'];
        $this->assertSame('', $cleared['values']['source']);
        $this->assertNull($cleared['note']);
        $this->assertSame('2026-12-01', $cleared['startDate'], 'null keeps the start date');
    }

    public function test_updateLink_intoAnotherSavedLink_isRefused(): void
    {
        $a = self::add('a')['link']['idLink'];
        self::add('b');

        $this->expectException(InvalidInputException::class);
        self::api()->updateLink(1, $a, null, 'b');
    }

    public function test_updateLink_cannotEmptyTheCampaign(): void
    {
        $id = self::add()['link']['idLink'];
        $this->expectException(InvalidInputException::class);
        $this->expectExceptionMessage('campaign');
        self::api()->updateLink(1, $id, null, '');
    }

    public function test_archiveAndRestore_moveTheLinkBetweenLists(): void
    {
        $id = self::add()['link']['idLink'];
        self::add('other');

        $archived = self::api()->archiveLink(1, $id);
        $this->assertTrue($archived['archived']);
        $this->assertSame(1, self::api()->getLinks(1)['total']);
        $this->assertSame([$id], array_column(self::api()->getLinks(1, 'archived')['links'], 'idLink'));
        $this->assertSame(2, self::api()->getLinks(1, 'all')['total']);

        $this->assertFalse(self::api()->restoreLink(1, $id)['archived']);
        $this->assertSame(2, self::api()->getLinks(1)['total']);
    }

    public function test_getLinks_searchesAndPages(): void
    {
        self::add('herbst');
        self::add('winter');
        self::add('fruehling', ['source' => 'flyer', 'medium' => 'print']);

        $this->assertSame(['fruehling'], array_column(array_column(self::api()->getLinks(1, 'active', 'FLYER')['links'], 'values'), 'campaign'));
        $page = self::api()->getLinks(1, 'active', '', 2, 2);
        $this->assertSame(3, $page['total']);
        $this->assertCount(1, $page['links']);
        $this->assertSame(0, self::api()->getLinks(2)['total'], 'links belong to their website');
    }

    public function test_getLinks_byIdLink_findsOneOrNoneWithoutAnError(): void
    {
        $id = self::add()['link']['idLink'];
        self::api()->archiveLink(1, $id);

        $this->assertSame([$id], array_column(self::api()->getLinks(1, 'all', '', 100, 0, $id)['links'], 'idLink'));
        $this->assertSame(0, self::api()->getLinks(1, 'all', '', 100, 0, $id + 100)['total']);
        $this->assertSame(0, self::api()->getLinks(2, 'all', '', 100, 0, $id)['total'], 'not on another website');
    }

    /**
     * @dataProvider invalidListParameters
     */
    public function test_getLinks_invalidParameters_areA400NamingTheParameter(string $status, int $limit, int $offset, string $param): void
    {
        try {
            self::api()->getLinks(1, $status, '', $limit, $offset);
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString($param, $e->getMessage());
        }
    }

    public static function invalidListParameters(): array
    {
        return [
            'status' => ['deleted', 100, 0, 'active, archived, all'],
            'limit' => ['active', 0, 0, 'limit'],
            'limit high' => ['active', 501, 0, 'limit'],
            'offset' => ['active', 10, -1, 'offset'],
        ];
    }

    public function test_unknownLink_isA404(): void
    {
        $id = self::add()['link']['idLink'];
        foreach ([[1, $id + 100], [2, $id]] as [$idSite, $idLink]) {
            try {
                self::api()->getLink($idSite, $idLink);
                $this->fail('404 expected');
            } catch (NotFoundException $e) {
                $this->assertSame(404, $e->getCode());
            }
        }
    }

    public function test_nearDuplicate_ofASavedValue_isAWarning(): void
    {
        self::add('herbstaktion-2026');

        $preview = self::api()->previewLink(1, self::TARGET, 'herbstaktion_2026');

        $this->assertContains('campaign:near_duplicate', self::codes($preview['warnings']));
    }

    public function test_aLinkIdAnotherSavedLinkCarries_isAWarning(): void
    {
        $first = self::api()->addLink(1, self::TARGET, 'herbst', 'utm', 'newsletter', 'email', '', '', 'nl-7');
        $idLink = (int) $first['link']['idLink'];
        $field = Fields::ID . ':id_in_use';

        $other = self::api()->previewLink(1, self::TARGET, 'herbst', 'utm', 'social', '', '', '', 'nl-7');
        $this->assertContains($field, self::codes($other['warnings']));
        $this->assertStringContainsString('nl-7', $other['warnings'][array_search($field, self::codes($other['warnings']), true)]['message']);

        $same = self::api()->previewLink(1, self::TARGET, 'herbst', 'utm', 'newsletter', 'email', '', '', 'nl-7');
        $this->assertNotContains($field, self::codes($same['warnings']), 'the same link saved again is no other link');

        $edited = self::api()->previewLink(1, self::TARGET, 'herbst', 'utm', 'flyer', '', '', '', 'nl-7', '', '', $idLink);
        $this->assertNotContains($field, self::codes($edited['warnings']), 'its own ID while it is edited');

        $second = self::add('herbst', ['source' => 'print']);
        $changed = self::api()->updateLink(1, $second['link']['idLink'], null, null, null, null, null, null, null, 'nl-7');
        $this->assertContains($field, self::codes($changed['warnings']));
    }

    public function test_getSuggestions_listsSavedValuesMostUsedFirst(): void
    {
        self::add('a', ['source' => 'facebook']);
        self::add('b', ['source' => 'newsletter']);
        self::add('c', ['source' => 'newsletter']);

        $this->assertSame(
            [['value' => 'newsletter', 'links' => 2, 'source' => 'links', 'visits' => 0], ['value' => 'facebook', 'links' => 1, 'source' => 'links', 'visits' => 0]],
            self::api()->getSuggestions(1, 'source')
        );
        $this->assertSame([['value' => 'facebook', 'links' => 1, 'source' => 'links', 'visits' => 0]], self::api()->getSuggestions(1, 'source', 'FACE'));
        $this->assertCount(1, self::api()->getSuggestions(1, 'source', '', 1));

        $this->expectException(InvalidInputException::class);
        $this->expectExceptionMessage('campaign, source, medium');
        self::api()->getSuggestions(1, 'utm_source');
    }

    public function test_getParameterSets_offersOwnNamesOfThisInstance(): void
    {
        $sets = self::api()->getParameterSets(1);
        $this->assertSame(['utm', 'mtm'], array_column($sets['sets'], 'key'));
        $this->assertTrue($sets['sets'][0]['read']['campaign']);
        $this->assertFalse($sets['sets'][0]['read']['source']);
        $this->assertFalse($sets['mcrActive']);
        $this->assertTrue($sets['lowercaseValues']);

        $tracker = Config::getInstance()->Tracker;
        $tracker['campaign_var_name'] = 'cpn,utm_campaign';
        Config::getInstance()->Tracker = $tracker;
        $this->resetContext();

        $sets = self::api()->getParameterSets(1);
        $this->assertSame(['utm', 'mtm', 'own'], array_column($sets['sets'], 'key'));
        $this->assertSame('cpn', $sets['sets'][2]['names']['campaign']);
    }

    public function test_getTemplates_haveKeysAndLabels(): void
    {
        $templates = self::api()->getTemplates(1);

        $this->assertSame('newsletter', $templates[0]['key']);
        $this->assertSame('Newsletter', $templates[0]['label']);
        $this->assertSame('email', $templates[0]['medium']);
    }

    public function test_getConnectionStatus_isStandalone(): void
    {
        $this->assertSame(
            ['mode' => 'standalone', 'connected' => false, 'reason' => 'not_connected', 'features' => ['shortLinks' => false, 'qrCodes' => false]],
            self::api()->getConnectionStatus()
        );
    }

    public function test_deletingAWebsite_deletesItsLinks(): void
    {
        self::add();
        self::api()->addLink(2, 'https://other.example/', 'x');

        SitesManagerApi::getInstance()->deleteSite(1);

        $this->assertSame(1, self::rows());
    }

    private function resetContext(): void
    {
        // the context caches the parameter sets for the request; a new request in a test starts fresh
        \Piwik\Container\StaticContainer::getContainer()->set(InstanceContext::class, new class extends InstanceContext {
            public function isMcrActive(): bool
            {
                return LinkApiTest::$mcr;
            }
        });
    }
}
