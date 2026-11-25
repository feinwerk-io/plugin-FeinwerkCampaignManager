<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\NotFoundException;
use Piwik\Plugins\FeinwerkCampaignManager\MeasurableSettings;
use Piwik\Plugins\FeinwerkCampaignManager\Model\LinkReports;
use Piwik\Plugins\FeinwerkCampaignManager\Model\Today;
use Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures\LinkTrafficFixture;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * Editing saved links by status (decision 6): a draft changes freely; a live link (marked live, start date reached, or
 * its first visit counted) keeps target and campaign values, only note and dates change. First visits on the tracked
 * visits of LinkTrafficFixture (see its hand count), today fixed at its TODAY.
 *
 * @group FeinwerkCampaignManager
 */
class LinkLockTest extends IntegrationTestCase
{
    /** @var LinkTrafficFixture */
    public static $fixture = null;

    private const S = LinkTrafficFixture::SITE;

    /** the reports fail (fail-soft test) */
    public static bool $reportsFail = false;

    public function provideContainerConfig()
    {
        return [
            'Piwik\\Access' => new FakeAccess(),
            LinkReports::class => new class extends LinkReports {
                public function dailyVisits(int $idSite, string $from, string $to, bool $withKeywords, bool $withLinkIds, bool $withCampaigns = true): array
                {
                    if (LinkLockTest::$reportsFail) {
                        throw new \RuntimeException('archives unavailable');
                    }
                    return parent::dailyVisits($idSite, $from, $to, $withKeywords, $withLinkIds, $withCampaigns);
                }
            },
            Today::class => new class extends Today {
                public function forSite(int $idSite): string
                {
                    return LinkTrafficFixture::TODAY;
                }
            },
        ];
    }

    public function setUp(): void
    {
        parent::setUp();
        self::$reportsFail = false;
        FakeAccess::$superUser = true;
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
        Fixture::loadAllTranslations();
        $settings = new MeasurableSettings(self::S);
        $settings->lowercaseValues->setValue(true);
        $settings->save();
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

    /** a saved link created on $createdDay, without a link ID unless given */
    private static function link(string $campaign, string $source, string $createdDay, string $linkId = '', string $startDate = null, bool $generated = false): int
    {
        static $n = 0;
        $n++;
        return (new LinkDao())->insert([
            'idsite' => self::S, 'fingerprint' => sha1('lock' . $n), 'target_url' => LinkTrafficFixture::BASE . '/',
            'url' => LinkTrafficFixture::BASE . '/?utm_campaign=' . rawurlencode($campaign) . '&utm_source=' . rawurlencode($source),
            'parameter_set' => 'utm', 'campaign' => $campaign, 'source' => $source, 'medium' => '', 'keyword' => '',
            'content' => '', 'campaign_id' => $linkId, 'campaign_group' => '', 'placement' => '', 'campaign_id_generated' => $generated ? 1 : 0,
            'start_date' => $startDate, 'end_date' => null, 'note' => null, 'created_by' => 'superUserLogin',
            'created_at' => $createdDay . ' 08:00:00', 'updated_by' => 'superUserLogin', 'updated_at' => $createdDay . ' 08:00:00',
            'archived_at' => null, 'live_at' => null,
        ]);
    }

    public function test_aLiveLinkKeepsItsValuesButNoteAndDatesChange(): void
    {
        $id = self::link('winter', 'print', '2026-11-19', '', '2026-11-20');
        $link = self::api()->getLink(self::S, $id);
        $this->assertSame('live', $link['status'], 'live on its start day');
        $this->assertNull($link['liveAt']);
        $this->assertSame(['2026-11-20', 'start'], [$link['liveSince'], $link['liveReason']]);

        try {
            self::api()->updateLink(self::S, $id, null, null, null, 'flyer');
            $this->fail('a changed source of a live link must be refused');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString('source', $e->getMessage());
            $this->assertStringContainsString('addLink', $e->getMessage());
        }

        // the builder sends every value back unchanged, with a new note and end date
        $changed = self::api()->updateLink(self::S, $id, $link['targetUrl'], 'winter', 'utm', 'print', '', '', '', '', '', '', null, '2026-12-31', 'Plakat am Bahnhof');
        $this->assertSame('Plakat am Bahnhof', $changed['link']['note']);
        $this->assertSame('2026-12-31', $changed['link']['endDate']);
        $this->assertSame($link['url'], $changed['link']['url']);
        $this->assertSame([], $changed['warnings']);
        $this->assertNotNull($changed['link']['liveAt'], 'live by its start date so far: now it stays live');
        $this->assertSame(['2026-11-20', 'start'], [$changed['link']['liveSince'], $changed['link']['liveReason']]);

        // moving the start date into the future does not make it a draft again
        $later = self::api()->updateLink(self::S, $id, null, null, null, null, null, null, null, null, null, null, '2027-01-01', '')['link'];
        $this->assertSame('live', $later['status']);
    }

    public function test_aNoteChangeNeverRebuildsALiveLink(): void
    {
        // saved while values kept their case; then lower case values are switched on
        $settings = new MeasurableSettings(self::S);
        $settings->lowercaseValues->setValue(false);
        $settings->save();
        $id = self::api()->addLink(self::S, LinkTrafficFixture::BASE . '/', 'Winter Sale', 'utm', 'Print', '', '', '', 'WS-1')['link']['idLink'];
        $before = self::api()->markLinkLive(self::S, $id);
        $settings->lowercaseValues->setValue(true);
        $settings->save();

        $after = self::api()->updateLink(self::S, $id, null, null, null, null, null, null, null, null, null, null, null, null, 'Nur die Notiz')['link'];
        $this->assertSame($before['url'], $after['url']);
        $this->assertSame('Winter Sale', $after['values']['campaign']);
        // the stored spelling sent back is no change, also with lower case values on now
        $same = self::api()->updateLink(self::S, $id, null, 'Winter Sale', null, 'Print')['link'];
        $this->assertSame($before['url'], $same['url']);
    }

    public function test_markLinkLive(): void
    {
        $id = self::link('winter', 'print', '2026-11-19');
        $this->assertSame('draft', self::api()->getLink(self::S, $id)['status']);
        $live = self::api()->markLinkLive(self::S, $id);
        $this->assertSame('live', $live['status']);
        $this->assertNotNull($live['liveAt']);
        $this->assertSame(['2026-11-20', 'manual'], [$live['liveSince'], $live['liveReason']]);
        $this->assertSame($live['liveAt'], self::api()->markLinkLive(self::S, $id)['liveAt'], 'marking again changes nothing');

        $this->expectException(NotFoundException::class);
        self::api()->markLinkLive(self::S, 999);
    }

    public function test_aDraftChangesFreely(): void
    {
        $id = self::link('winter', 'print', '2026-11-19');
        $changed = self::api()->updateLink(self::S, $id, null, null, null, 'flyer')['link'];
        $this->assertSame('flyer', $changed['values']['source']);
        $this->assertSame('draft', $changed['status']);
    }

    public function test_theFirstVisitMakesADraftLive(): void
    {
        // its own link ID was visited on 11-06 and 11-07
        $byId = self::link('herbst', 'social', '2026-11-01', 'so-2');
        // a campaign only this link uses, quiet before it was created, visited on 11-08
        $partner = self::link('partner', 'newsletter', '2026-11-01');
        // the campaign ran before this link existed (11-05): its visits may be other links'
        $busy = self::link('herbst', 'flyer', '2026-11-06');
        // no visit since its creation
        $quiet = self::link('winter', 'print', '2026-11-19');

        $links = array_column(self::api()->getLinks(self::S)['links'], 'status', 'idLink');
        $this->assertSame('live', $links[$byId]);
        $this->assertSame('live', $links[$partner]);
        $this->assertSame('draft', $links[$busy]);
        $this->assertSame('draft', $links[$quiet]);
        $this->assertNotNull(self::api()->getLink(self::S, $partner)['liveAt'], 'written once found');
        // since the day of the first visit, for the reason that it was counted
        $this->assertSame(['2026-11-06', 'visit'], array_values(array_intersect_key(self::api()->getLink(self::S, $byId), ['liveSince' => 1, 'liveReason' => 1])));
        $this->assertSame('2026-11-08', self::api()->getLink(self::S, $partner)['liveSince']);
        $this->assertNull(self::api()->getLink(self::S, $quiet)['liveReason']);
    }

    public function test_aCampaignRowSharedByTwoSavedLinksMakesNeitherLive(): void
    {
        $a = self::link('partner', 'newsletter', '2026-11-01');
        $b = self::link('partner', 'social', '2026-11-01');
        $links = array_column(self::api()->getLinks(self::S)['links'], 'status', 'idLink');
        $this->assertSame('draft', $links[$a]);
        $this->assertSame('draft', $links[$b]);
    }

    public function test_visitsOfLinksWithAnIdAreNotADraftsWithoutOne(): void
    {
        // with Marketing Campaigns Reporting a link with an ID counts by its ID, yet its visits land in the campaign
        // row too: a draft of the same campaign without an ID must not go live on them
        $plain = self::link('herbst', 'print', '2026-11-01');
        $withId = self::link('herbst', 'social', '2026-11-01', 'so-2');
        $links = array_column(self::api()->getLinks(self::S)['links'], 'status', 'idLink');
        $this->assertSame('draft', $links[$plain]);
        $this->assertSame('live', $links[$withId]);
    }

    public function test_aGeneratedLinkIdGoesLiveAtItsFirstVisitWhateverCameBefore(): void
    {
        // created on 2026-11-07: so-2 had a visit on 2026-11-06, the day before, and one on the creation day
        $generated = self::link('herbst', 'social', '2026-11-07', 'so-2', null, true);
        $link = self::api()->getLink(self::S, $generated);
        $this->assertSame('live', $link['status']);
        $this->assertSame(['2026-11-07', 'visit'], [$link['liveSince'], $link['liveReason']]);
    }

    public function test_aTypedLinkIdUsedBeforeTheLinkStaysADraft(): void
    {
        $typed = self::link('herbst', 'social', '2026-11-07', 'so-2');
        $this->assertSame('draft', self::api()->getLink(self::S, $typed)['status'], 'the visit of 2026-11-06 was not this link');
    }

    public function test_aLinkIdTwoSavedLinksCarryMakesNeitherLive(): void
    {
        // the same typed link ID on two drafts: the visits on so-2 may be either one's
        $a = self::link('herbst', 'social', '2026-11-01', 'so-2');
        $b = self::link('herbst', 'flyer', '2026-11-01', 'so-2');
        $links = array_column(self::api()->getLinks(self::S)['links'], 'status', 'idLink');
        $this->assertSame('draft', $links[$a]);
        $this->assertSame('draft', $links[$b]);
    }

    public function test_quietDaysThatCannotBeReadDoNotCountAsQuiet(): void
    {
        // created in August: the 30 days before lie beyond the 92 days read back from 2026-11-20
        $old = self::link('partner', 'newsletter', '2026-08-01');
        $this->assertSame('draft', self::api()->getLink(self::S, $old)['status']);
    }

    public function test_unreadableReportsLeaveDraftsAsTheyAre(): void
    {
        $id = self::link('partner', 'newsletter', '2026-11-01');
        self::$reportsFail = true;
        $links = array_column(self::api()->getLinks(self::S)['links'], 'status', 'idLink');
        $this->assertSame('draft', $links[$id]);
        self::$reportsFail = false;
        $this->assertSame('live', self::api()->getLink(self::S, $id)['status']);
    }

    public function test_updateLinkLocksADraftWhoseFirstVisitWasCounted(): void
    {
        $id = self::link('herbst', 'social', '2026-11-01', 'so-2');
        try {
            self::api()->updateLink(self::S, $id, null, null, null, null, null, null, null, 'so-3');
            $this->fail('the first visit was counted: the link ID is locked');
        } catch (InvalidInputException $e) {
            $this->assertStringContainsString('campaignId', $e->getMessage());
        }
        $this->assertSame('live', self::api()->getLink(self::S, $id)['status']);
    }
}

LinkLockTest::$fixture = new LinkTrafficFixture();
