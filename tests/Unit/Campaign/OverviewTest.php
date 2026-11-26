<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Campaign;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Numbers;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Overview;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Phase;

/**
 * Phases, the day window and the overview built from details, saved links and report numbers. Fixed dates only.
 *
 * @group FeinwerkCampaignManager
 */
class OverviewTest extends TestCase
{
    private const TODAY = '2026-11-20';

    private static function details(array $over = []): array
    {
        return $over + [
            'name' => null, 'startDate' => null, 'endDate' => null, 'goalMetric' => 'none', 'goalTarget' => null,
            'idGoal' => null, 'notes' => null, 'archived' => false,
        ];
    }

    private static function n(int $visits, int $conversions = 0, float $revenue = 0.0, array $goals = []): array
    {
        return ['visits' => $visits, 'conversions' => $conversions, 'revenue' => $revenue, 'goals' => $goals];
    }

    public function test_key_isTheNormalisedLowerCaseValue(): void
    {
        $this->assertSame('herbst aktion', CampaignKey::of("  Herbst \t Aktion "));
        $this->assertSame(CampaignKey::of('KÜCHE'), CampaignKey::of('küche'));
        $this->assertNotSame(CampaignKey::hash('küche'), CampaignKey::hash('kuche'), 'umlauts stay apart');
        $this->assertSame(40, strlen(CampaignKey::hash('x')));
    }

    /**
     * @dataProvider phases
     */
    public function test_phase(?array $details, int $recentVisits, int $activeLinks, string $expected): void
    {
        $this->assertSame($expected, Phase::of($details, self::TODAY, $recentVisits, $activeLinks));
    }

    public static function phases(): array
    {
        return [
            'archived wins' => [self::details(['archived' => true, 'startDate' => '2026-11-01']), 50, 1, Phase::ARCHIVED],
            'starts later' => [self::details(['startDate' => '2026-12-01']), 50, 0, Phase::PREPARING],
            'ended' => [self::details(['startDate' => '2026-10-01', 'endDate' => '2026-11-19']), 50, 1, Phase::ENDED],
            'ends today' => [self::details(['startDate' => '2026-10-01', 'endDate' => '2026-11-20']), 0, 0, Phase::RUNNING],
            'started, no visits' => [self::details(['startDate' => '2026-11-20']), 0, 0, Phase::RUNNING],
            'no dates, recent visits' => [self::details(), 3, 0, Phase::RUNNING],
            'no dates, links only' => [null, 0, 2, Phase::PREPARING],
            'no dates, old visits only' => [null, 0, 0, Phase::ENDED],
        ];
    }

    public function test_window_coversTheLast30DaysAndEarlierStartsUpToTheCap(): void
    {
        $this->assertSame(['2026-10-22', self::TODAY], Overview::window([], self::TODAY));
        $this->assertSame(['2026-10-01', self::TODAY], Overview::window([
            'a' => self::details(['startDate' => '2026-10-01']),
            'b' => self::details(['startDate' => '2026-12-01']),
        ], self::TODAY));
        $this->assertSame(['2026-08-21', self::TODAY], Overview::window(['a' => self::details(['startDate' => '2025-01-01'])], self::TODAY), '92 days at most');
        $this->assertSame(['2026-10-22', self::TODAY], Overview::window(['a' => self::details(['startDate' => '2025-01-01', 'archived' => true])], self::TODAY), 'archived campaigns do not widen it');
    }

    public function test_build_joinsDetailsLinksAndNumbers_sortedByPhaseAndVisits(): void
    {
        $details = [
            'herbst' => self::details(['name' => 'Herbstaktion', 'startDate' => '2026-11-01', 'goalMetric' => 'visits', 'goalTarget' => 100.0]),
            'winter' => self::details(['startDate' => '2026-12-01']),
            'alt' => self::details(['archived' => true]),
        ];
        $links = ['herbst' => 2, 'newsletter' => 1];
        $period = ['herbst' => self::n(40, 2, 19.5), 'fremd' => self::n(7), 'newsletter' => self::n(0)];
        $daily = [
            '2026-11-01' => ['herbst' => self::n(10)],
            '2026-11-15' => ['herbst' => self::n(15), 'newsletter' => self::n(1)],
        ];

        $rows = Overview::build($details, $links, $period, $daily, self::TODAY, 'active');
        $byKey = array_column($rows, null, 'campaign');

        $this->assertSame(['herbst', 'newsletter', 'winter', 'fremd'], array_column($rows, 'campaign'), 'running, preparing, ended; then visits');
        $this->assertSame(Phase::RUNNING, $byKey['herbst']['phase']);
        $this->assertSame('Herbstaktion', $byKey['herbst']['name']);
        $this->assertSame(2, $byKey['herbst']['activeLinks']);
        $this->assertSame(['visits' => 40, 'conversions' => 2, 'revenue' => 19.5], $byKey['herbst']['period']);
        $this->assertSame(
            ['metric' => 'visits', 'target' => 100.0, 'idGoal' => null, 'value' => 25.0, 'progress' => 0.25, 'from' => '2026-11-01', 'to' => self::TODAY, 'complete' => true],
            $byKey['herbst']['goal']
        );
        $this->assertSame('details', $byKey['herbst']['source']);
        $this->assertSame(Phase::RUNNING, $byKey['newsletter']['phase'], 'a visit in the last 30 days');
        $this->assertSame('links', $byKey['newsletter']['source']);
        $this->assertSame('report', $byKey['fremd']['source']);
        $this->assertSame(Phase::ENDED, $byKey['fremd']['phase']);
        $this->assertSame(Phase::PREPARING, $byKey['winter']['phase']);
        $this->assertArrayNotHasKey('alt', $byKey, 'archived only with status archived or all');

        $this->assertSame(['alt'], array_column(Overview::build($details, $links, $period, $daily, self::TODAY, 'archived'), 'campaign'));
        $this->assertCount(5, Overview::build($details, $links, $period, $daily, self::TODAY, 'all'));
    }

    public function test_noVisitsSinceStart_isAWarningAfterTwoDays(): void
    {
        $details = [
            'quiet' => self::details(['startDate' => '2026-11-18']),
            'fresh' => self::details(['startDate' => '2026-11-19']),
            'busy' => self::details(['startDate' => '2026-11-01']),
        ];
        $daily = ['2026-11-05' => ['busy' => self::n(3)]];

        $byKey = array_column(Overview::build($details, [], [], $daily, self::TODAY, 'active'), null, 'campaign');

        $this->assertSame(['no_visits_since_start'], $byKey['quiet']['warnings']);
        $this->assertSame([], $byKey['fresh']['warnings']);
        $this->assertSame([], $byKey['busy']['warnings']);
    }

    public function test_goalOfOneMatomoGoal_andAStartBeforeTheWindow(): void
    {
        $details = ['old' => self::details(['startDate' => '2025-01-01', 'goalMetric' => 'revenue', 'goalTarget' => 1000.0, 'idGoal' => 2])];
        $daily = [
            '2026-08-20' => ['old' => self::n(5, 1, 500.0, [2 => ['conversions' => 1, 'revenue' => 500.0]])],
            '2026-09-01' => ['old' => self::n(5, 2, 300.0, [1 => ['conversions' => 1, 'revenue' => 100.0], 2 => ['conversions' => 1, 'revenue' => 200.0]])],
        ];

        $goal = Overview::build($details, [], [], $daily, self::TODAY, 'active')[0]['goal'];

        $this->assertSame(200.0, $goal['value'], 'only goal 2, only inside the window');
        $this->assertSame('2026-08-21', $goal['from']);
        $this->assertFalse($goal['complete'], 'the start lies before the window');
        $this->assertSame(0.2, $goal['progress']);
    }

    public function test_plannedCampaigns_comeBeforeCountedOnesInAPhase(): void
    {
        $rows = Overview::build(['planned' => self::details(['startDate' => '2026-11-01'])], [], ['counted' => self::n(500), 'planned' => self::n(3)], [], self::TODAY, 'active');

        $this->assertSame(['planned', 'counted'], array_column($rows, 'campaign'));
    }

    public function test_revenue_isRoundedToCents(): void
    {
        $row = Overview::build([], [], ['a' => self::n(1, 1, 4324.950000000001)], [], self::TODAY, 'active')[0];

        $this->assertSame(4324.95, $row['period']['revenue']);
    }

    public function test_reportOnlyValues_areCappedByVisits(): void
    {
        $period = [];
        for ($i = 1; $i <= Overview::REPORT_ONLY_MAX + 5; $i++) {
            $period['c' . $i] = self::n($i);
        }

        $rows = Overview::build([], [], $period, [], self::TODAY, 'active');

        $this->assertCount(Overview::REPORT_ONLY_MAX, $rows);
        $this->assertSame('c' . (Overview::REPORT_ONLY_MAX + 5), $rows[0]['campaign']);
    }

    public function test_numbers_sumLabelsThatFoldToOneKey(): void
    {
        $numbers = new Numbers();
        $numbers->add('Herbst', 3, 1, 10.0, [1 => ['conversions' => 1, 'revenue' => 10.0]]);
        $numbers->add('herbst', 2, 0, 0.0, []);
        $numbers->add('', 9, 0, 0.0, []);

        $this->assertSame(['herbst' => self::n(5, 1, 10.0, [1 => ['conversions' => 1, 'revenue' => 10.0]])], $numbers->all());
    }

    /** while connected the workspace campaigns of the site's website join the overview (Peter, 2026-11-26: "Q2 ja") */
    public function test_build_takesTheWorkspaceCampaigns(): void
    {
        $ws = static fn(string $name, string $status, ?string $start = null, ?string $end = null): array => [
            'id' => 'C' . $name, 'name' => $name, 'status' => $status, 'startsOn' => $start, 'endsOn' => $end,
            'appUrl' => 'https://app.campaigns.feinwerk.io/w/W1/c/C' . $name,
        ];
        $workspace = [
            'herbst' => $ws('Herbst 2026', 'live', '2026-11-01'),
            'winter' => $ws('Winter', 'draft'),
            'sommer' => $ws('Sommer', 'ended'),
            'fruehling' => $ws('Frühling', 'ready', '2026-12-01', '2026-12-31'),
            'lokal' => $ws('Name im Arbeitsbereich', 'live', '2026-10-01'),
        ];
        $details = ['lokal' => self::details(['name' => 'Eigener Name', 'goalMetric' => 'visits', 'goalTarget' => 10.0])];
        $daily = ['2026-11-15' => ['lokal' => self::n(4)]];
        $rows = Overview::build($details, [], ['herbst' => self::n(12)], $daily, self::TODAY, 'active', [], $workspace);
        $byKey = array_column($rows, null, 'campaign');

        $this->assertSame(['workspace', 'workspace', 'workspace', 'workspace', 'details'], array_map(static fn($k) => $byKey[$k]['source'], ['herbst', 'winter', 'sommer', 'fruehling', 'lokal']));
        $this->assertSame([Phase::RUNNING, Phase::PREPARING, Phase::ENDED, Phase::PREPARING], array_map(static fn($k) => $byKey[$k]['phase'], ['herbst', 'winter', 'sommer', 'fruehling']), 'dates first, else the status');
        $this->assertSame(['Herbst 2026', '2026-11-01', 12], [$byKey['herbst']['name'], $byKey['herbst']['startDate'], $byKey['herbst']['period']['visits']]);
        $this->assertFalse($byKey['herbst']['hasDetails'], 'no local details yet');
        $this->assertNull($byKey['herbst']['goal']);
        $this->assertSame(['CWinter', 'draft'], [$byKey['winter']['platform']['id'], $byKey['winter']['platform']['status']]);
        $this->assertStringStartsWith('https://app.campaigns.feinwerk.io/', $byKey['winter']['platform']['appUrl']);

        // local details win; their missing start comes from the workspace, so the goal counts from it
        $this->assertSame(['Eigener Name', '2026-10-01', Phase::RUNNING], [$byKey['lokal']['name'], $byKey['lokal']['startDate'], $byKey['lokal']['phase']]);
        $this->assertTrue($byKey['lokal']['hasDetails']);
        $this->assertSame(4.0, $byKey['lokal']['goal']['value']);
        $this->assertSame('Name im Arbeitsbereich', $byKey['lokal']['platform']['name']);

        // without the workspace nothing of it remains
        $this->assertSame(['lokal'], array_column(Overview::build($details, [], [], $daily, self::TODAY, 'active'), 'campaign'));
        $this->assertNull(Overview::build($details, [], [], $daily, self::TODAY, 'active')[0]['platform']);
    }
}
