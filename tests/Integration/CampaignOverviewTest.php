<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\API\Request;
use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\CampaignDao;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\NotFoundException;
use Piwik\Plugins\FeinwerkCampaignManager\Model\Today;
use Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures\CampaignTrafficFixture;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * Campaign details and the overview on archived campaign reports of CampaignTrafficFixture (see its hand count).
 *
 * @group FeinwerkCampaignManager
 */
class CampaignOverviewTest extends IntegrationTestCase
{
    /** @var CampaignTrafficFixture */
    public static $fixture = null;

    private const S = CampaignTrafficFixture::SITE;

    public function provideContainerConfig()
    {
        return [
            'Piwik\\Access' => new FakeAccess(),
            Today::class => new class extends Today {
                public function forSite(int $idSite): string
                {
                    return CampaignTrafficFixture::TODAY;
                }
            },
        ];
    }

    public function setUp(): void
    {
        parent::setUp();
        FakeAccess::$superUser = true;
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
        Db::query('TRUNCATE TABLE ' . CampaignDao::tableName());
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

    private static function byKey(array $rows): array
    {
        return array_column($rows, null, 'campaign');
    }

    private static function addHerbstLink(): void
    {
        self::api()->addLink(self::S, CampaignTrafficFixture::BASE . '/herbst', 'Herbst & "Küche"', 'utm', 'newsletter', 'email');
    }

    public function test_overview_joinsSavedLinkDetailsAndReportNumbers(): void
    {
        self::addHerbstLink();
        self::api()->addCampaign(self::S, ' Herbst & "KÜCHE" ', 'Herbstaktion', '2026-11-01', '', 'visits', '4');

        $rows = self::byKey(self::api()->getCampaigns(self::S, 'month', '2026-11-01'));

        $herbst = $rows[CampaignTrafficFixture::HERBST];
        $this->assertSame('Herbstaktion', $herbst['name']);
        $this->assertSame('running', $herbst['phase']);
        $this->assertSame('details', $herbst['source']);
        $this->assertSame(1, $herbst['activeLinks'], 'the saved link joins by the cleaned value');
        $this->assertSame(['visits' => 2, 'conversions' => 1, 'revenue' => 12.5], $herbst['period']);
        $this->assertSame(2.0, $herbst['goal']['value'], 'since the start, not the October visit');
        $this->assertSame(0.5, $herbst['goal']['progress']);
        $this->assertTrue($herbst['goal']['complete']);

        $this->assertSame('report', $rows['partner aktion']['source']);
        $this->assertSame(1, $rows['partner aktion']['period']['visits']);
        $this->assertSame('running', $rows['partner aktion']['phase'], 'a visit in the last 30 days');
    }

    public function test_overview_numbersEqualMatomosCampaignReport(): void
    {
        $report = Request::processRequest('Referrers.getCampaigns', ['idSite' => self::S, 'period' => 'month', 'date' => '2026-11-01', 'format' => 'original', 'filter_limit' => -1], []);
        $visits = 0;
        foreach ($report->getRows() as $row) {
            $visits += (int) $row->getColumn('nb_visits');
        }

        $ours = array_sum(array_map(static fn(array $r): int => $r['period']['visits'], self::api()->getCampaigns(self::S, 'month', '2026-11-01')));

        $this->assertSame(3, $visits);
        $this->assertSame($visits, $ours);
    }

    public function test_goalOfOneMatomoGoal_countsItsConversions(): void
    {
        self::api()->addCampaign(self::S, CampaignTrafficFixture::HERBST, '', '2026-11-01', '2026-11-30', 'conversions', 2, 1);

        $goal = self::api()->getCampaign(self::S, CampaignTrafficFixture::HERBST, 'day', '2026-11-12')['goal'];

        $this->assertSame(['metric' => 'conversions', 'target' => 2.0, 'idGoal' => 1, 'value' => 1.0, 'progress' => 0.5, 'from' => '2026-11-01', 'to' => '2026-11-20', 'complete' => true], $goal);
    }

    public function test_addCampaign_isIdempotent_updateChangesOnlyWhatIsGiven(): void
    {
        $first = self::api()->addCampaign(self::S, 'Winter', 'Winter sale', '2026-12-01');
        $again = self::api()->addCampaign(self::S, ' WINTER ', 'other name');

        $this->assertFalse($first['existed']);
        $this->assertTrue($again['existed']);
        $this->assertSame('Winter sale', $again['campaign']['name']);
        $this->assertSame('winter', $first['campaign']['campaign']);

        $changed = self::api()->updateCampaign(self::S, 'winter', null, null, '2026-12-31', 'revenue', '1000', null, 'Shop window');
        $this->assertSame('Winter sale', $changed['name']);
        $this->assertSame('2026-12-31', $changed['endDate']);
        $this->assertSame(['metric' => 'revenue', 'target' => 1000.0, 'idGoal' => null], $changed['goal']);

        $cleared = self::api()->updateCampaign(self::S, 'winter', '', null, null, 'none', null, null, '');
        $this->assertNull($cleared['name']);
        $this->assertNull($cleared['goal']);
        $this->assertNull($cleared['notes']);
        $this->assertSame('2026-12-01', $cleared['startDate']);

        $row = self::byKey(self::api()->getCampaigns(self::S, 'month', '2026-11-01'))['winter'];
        $this->assertSame('preparing', $row['phase']);
    }

    public function test_archiveAndRestore(): void
    {
        self::api()->addCampaign(self::S, 'winter');
        $this->assertTrue(self::api()->archiveCampaign(self::S, 'winter')['archived']);
        $this->assertArrayNotHasKey('winter', self::byKey(self::api()->getCampaigns(self::S, 'month', '2026-11-01')));
        $this->assertSame(['winter'], array_column(self::api()->getCampaigns(self::S, 'month', '2026-11-01', '', 'archived'), 'campaign'));
        $this->assertFalse(self::api()->restoreCampaign(self::S, 'winter')['archived']);
    }

    /**
     * @dataProvider badInput
     */
    public function test_badInput_isA400NamingTheParameter(callable $call, string $param): void
    {
        self::api()->addCampaign(self::S, 'winter');
        try {
            $call();
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString($param, $e->getMessage());
        }
    }

    public static function badInput(): array
    {
        $a = static fn(): API => API::getInstance();
        $s = CampaignTrafficFixture::SITE;
        return [
            'period' => [static fn() => $a()->getCampaigns($s, 'quarter', 'today'), 'day, week, month, year, range'],
            'date' => [static fn() => $a()->getCampaigns($s, 'day', 'soon'), 'period and date'],
            'missing date' => [static fn() => $a()->getCampaigns($s, 'day', ''), 'period and date'],
            'status' => [static fn() => $a()->getCampaigns($s, 'day', 'today', '', 'old'), 'active, archived, all'],
            'empty campaign' => [static fn() => $a()->addCampaign($s, '  '), 'campaign'],
            'goal metric' => [static fn() => $a()->addCampaign($s, 'x', '', '', '', 'clicks'), 'none, visits, conversions, revenue'],
            'goal target' => [static fn() => $a()->addCampaign($s, 'x', '', '', '', 'visits', '-3'), 'goalTarget'],
            'goal target text' => [static fn() => $a()->updateCampaign($s, 'winter', null, null, null, 'visits', 'many'), 'goalTarget'],
            'unknown goal' => [static fn() => $a()->addCampaign($s, 'x', '', '', '', 'conversions', 1, 99), 'idGoal'],
            'dates' => [static fn() => $a()->addCampaign($s, 'x', '', '2026-12-10', '2026-12-01'), 'endDate'],
        ];
    }

    public function test_unknownCampaign_isA404(): void
    {
        foreach ([
            static fn() => API::getInstance()->updateCampaign(self::S, 'nothing'),
            static fn() => API::getInstance()->archiveCampaign(self::S, 'nothing'),
            static fn() => API::getInstance()->getCampaign(self::S, 'nothing', 'month', '2026-11-01'),
        ] as $call) {
            try {
                $call();
                $this->fail('404 expected');
            } catch (NotFoundException $e) {
                $this->assertSame(404, $e->getCode());
            }
        }
    }

    public function test_writesNeedWriteAccess(): void
    {
        FakeAccess::clearAccess(false, [], [self::S], 'viewer');
        $this->assertIsArray(self::api()->getCampaigns(self::S, 'month', '2026-11-01'));
        $this->expectException(\Piwik\NoAccessException::class);
        self::api()->addCampaign(self::S, 'winter');
    }

    public function test_campaignResultsOverItsOwnDays(): void
    {
        // with a start date: from it to today (2026-11-20); herbst visits on 11-05 and 11-12 (one conversion, 12.5)
        self::api()->addCampaign(self::S, 'herbst & "küche"', 'Herbstaktion', '2026-11-01');
        self::addHerbstLink();
        $r = self::api()->getCampaignResults(self::S, 'Herbst & "Küche"');
        $this->assertSame(['from' => '2026-11-01', 'to' => '2026-11-20', 'complete' => true], $r['window']);
        $this->assertSame(['visits' => 2, 'conversions' => 1, 'revenue' => 12.5], $r['totals']);
        $this->assertCount(20, $r['series']);
        $this->assertSame(['day' => '2026-11-12', 'visits' => 1, 'conversions' => 1, 'revenue' => 12.5], $r['series'][11]);
        $this->assertSame('Herbstaktion', $r['campaign']['name']);
        $this->assertCount(1, $r['links']);
        $this->assertSame('campaign', $r['links'][0]['results']['basis']);
        $this->assertSame(2, $r['links'][0]['results']['visits']);
        $this->assertSame([], $r['warnings']);

        // an end date ends the days early
        self::api()->updateCampaign(self::S, 'herbst & "küche"', null, null, '2026-11-10');
        $ended = self::api()->getCampaignResults(self::S, 'herbst & "küche"');
        $this->assertSame(['from' => '2026-11-01', 'to' => '2026-11-10', 'complete' => true], $ended['window']);
        $this->assertSame(1, $ended['totals']['visits']);
    }

    public function test_campaignRowsCountTheirLinksPerStatus(): void
    {
        self::addHerbstLink();
        $id = self::api()->addLink(self::S, CampaignTrafficFixture::BASE . '/x', 'herbst & "küche"', 'utm', 'print')['link']['idLink'];
        self::api()->markLinkLive(self::S, $id);
        $row = self::byKey(self::api()->getCampaigns(self::S, 'month', '2026-11-01'))[CampaignTrafficFixture::HERBST];
        $this->assertSame(['draft' => 1, 'live' => 1, 'ended' => 0], $row['linkStates']);
        $this->assertSame(2, $row['activeLinks']);
    }

    public function test_campaignResultsWithoutDatesStartAtTheFirstVisit(): void
    {
        $r = self::api()->getCampaignResults(self::S, 'herbst & "küche"');
        $this->assertSame(['from' => '2026-10-10', 'to' => '2026-11-20', 'complete' => true], $r['window']);
        $this->assertSame(3, $r['totals']['visits']);
    }

    public function test_campaignResultsBeforeTheStart(): void
    {
        self::api()->addCampaign(self::S, 'winter', 'Winter', '2026-12-01');
        $r = self::api()->getCampaignResults(self::S, 'winter');
        $this->assertSame(['from' => '2026-12-01', 'to' => '2026-12-01', 'complete' => true], $r['window']);
        $this->assertSame([], $r['series']);
        $this->assertSame(0, $r['totals']['visits']);
        $this->assertSame('preparing', $r['campaign']['phase']);
    }

    public function test_campaignResultsErrors(): void
    {
        try {
            self::api()->getCampaignResults(self::S, '  ');
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
        }
        try {
            self::api()->getCampaignResults(self::S, 'never seen');
            $this->fail('404 expected');
        } catch (NotFoundException $e) {
            $this->assertSame(404, $e->getCode());
            $this->assertStringContainsString('92', $e->getMessage());
        }
    }

    public function test_campaignSuggestionsAddValuesMatomoCountedLately(): void
    {
        // the last 30 days up to 2026-11-20: herbst on 11-05 and 11-12, partner aktion on 11-15 (10-10 is too old)
        $before = self::api()->getSuggestions(self::S, 'campaign');
        $this->assertSame(
            [[CampaignTrafficFixture::HERBST, 'report', 2], ['partner aktion', 'report', 1]],
            array_map(static fn(array $s): array => [$s['value'], $s['source'], $s['visits']], $before)
        );

        // a saved value comes first and is not offered again from the report
        self::addHerbstLink();
        $after = self::api()->getSuggestions(self::S, 'campaign');
        $this->assertSame(['links', 'report'], array_column($after, 'source'));
        $this->assertSame('partner aktion', $after[1]['value']);
        $this->assertSame(['partner aktion'], array_column(self::api()->getSuggestions(self::S, 'campaign', 'PART'), 'value'));
        // other fields only from saved links
        $this->assertSame(['links'], array_unique(array_column(self::api()->getSuggestions(self::S, 'source'), 'source')));
    }

    public function test_setupChecklist(): void
    {
        $before = self::api()->getSetupChecklist(self::S);
        $this->assertFalse($before['complete']);
        $this->assertSame(['goals' => true, 'marketing_campaigns_reporting' => false, 'saved_link' => false, 'campaign_details' => false], array_column($before['items'], 'done', 'key'));
        $this->assertSame(['goals' => true, 'marketing_campaigns_reporting' => false, 'saved_link' => true, 'campaign_details' => true], array_column($before['items'], 'required', 'key'));

        self::addHerbstLink();
        self::api()->addCampaign(self::S, 'winter');
        $after = self::api()->getSetupChecklist(self::S);
        $done = array_column($after['items'], 'done', 'key');
        $this->assertTrue($done['saved_link']);
        $this->assertTrue($done['campaign_details']);
        // Marketing Campaigns Reporting is recommended only: complete without it
        $this->assertFalse($done['marketing_campaigns_reporting']);
        $this->assertTrue($after['complete']);
    }
}

CampaignOverviewTest::$fixture = new CampaignTrafficFixture();
