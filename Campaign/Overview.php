<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Campaign;

/**
 * The campaign overview: every campaign with details, of the connected workspace's website, with active saved links, or
 * with visits in the selected period (those only up to REPORT_ONLY_MAX), with its phase, numbers, goal progress and
 * warnings. Pure: the caller reads the details, the workspace campaigns, the links and Matomo's archived reports and
 * passes "today" in.
 */
final class Overview
{
    public const RECENT_DAYS = 30;
    /** the day window for activity and goal progress reaches back at most this many days */
    public const MAX_DAYS = 92;
    /** report-only campaign values (no details, no saved link) listed at most */
    public const REPORT_ONLY_MAX = 20;
    /** a running campaign without a visit this many days after its start gets the warning */
    public const QUIET_DAYS = 2;
    public const STATUSES = ['active', 'archived', 'all'];

    /** the phase of a workspace campaign without dates, by its status in Feinwerk Campaigns */
    private const WORKSPACE_PHASES = [
        'draft' => Phase::PREPARING, 'preparing' => Phase::PREPARING, 'ready' => Phase::PREPARING,
        'live' => Phase::RUNNING, 'paused' => Phase::RUNNING, 'ended' => Phase::ENDED,
    ];

    /**
     * The days to read from Matomo: the last RECENT_DAYS, widened to the earliest start of a non-archived campaign that
     * has begun, but never more than MAX_DAYS back.
     *
     * @param array<string, array> $details key => details
     * @return array{0: string, 1: string} from, to (YYYY-MM-DD)
     */
    public static function window(array $details, string $today): array
    {
        $from = self::addDays($today, -(self::RECENT_DAYS - 1));
        $cap = self::addDays($today, -(self::MAX_DAYS - 1));
        foreach ($details as $d) {
            $start = $d['startDate'] ?? null;
            if (empty($d['archived']) && $start !== null && $start <= $today && $start < $from) {
                $from = $start;
            }
        }
        return [max($from, $cap), $today];
    }

    /**
     * @param array<string, array> $details key => ['name', 'startDate', 'endDate', 'goalMetric', 'goalTarget', 'idGoal', 'notes', 'archived']
     * @param array<string, int> $links key => active saved links
     * @param array<string, array> $period key => numbers of the selected period (Numbers::all())
     * @param array<string, array<string, array>> $daily YYYY-MM-DD => key => numbers, for the days of window()
     * @param string $status active, archived or all
     * @param array<string, array{draft: int, live: int, ended: int}> $linkStates key => active saved links per status
     * @param array<string, array{id: string, name: string, status: string, startsOn: ?string, endsOn: ?string, appUrl: ?string}> $workspace
     *        key => the campaign of the connected workspace's website with that campaign value (Peter, 2026-11-26: "Q2 ja");
     *        its name and dates stand in where the details have none, its status gives the phase of a campaign without
     *        dates and details
     * @return list<array> see API::getCampaigns
     */
    public static function build(array $details, array $links, array $period, array $daily, string $today, string $status, array $linkStates = [], array $workspace = []): array
    {
        [$from] = self::window($details, $today);
        $recentFrom = self::addDays($today, -(self::RECENT_DAYS - 1));

        $keys = [];
        foreach ($details as $key => $d) {
            $keys[(string) $key] = 'details';
        }
        foreach ($workspace as $key => $w) {
            if (!isset($keys[(string) $key])) {
                $keys[(string) $key] = 'workspace';
            }
        }
        foreach ($links as $key => $count) {
            if ($count > 0 && !isset($keys[(string) $key])) {
                $keys[(string) $key] = 'links';
            }
        }
        $reportOnly = [];
        foreach ($period as $key => $numbers) {
            if (!isset($keys[(string) $key]) && $numbers['visits'] > 0) {
                $reportOnly[(string) $key] = $numbers['visits'];
            }
        }
        arsort($reportOnly);
        foreach (array_slice($reportOnly, 0, self::REPORT_ONLY_MAX, true) as $key => $visits) {
            $keys[(string) $key] = 'report';
        }

        $rows = [];
        foreach ($keys as $key => $source) {
            $key = (string) $key;
            $local = $details[$key] ?? null;
            $w = $workspace[$key] ?? null;
            $d = self::withWorkspace($local, $w);
            $archived = $d !== null && !empty($d['archived']);
            if (($status === 'active' && $archived) || ($status === 'archived' && !$archived)) {
                continue;
            }
            $recentVisits = self::sum($daily, $key, $recentFrom, $today, 'visits', null);
            $phase = $local === null && $w !== null && $d['startDate'] === null && $d['endDate'] === null
                && isset(self::WORKSPACE_PHASES[$w['status']])
                ? self::WORKSPACE_PHASES[$w['status']]
                : Phase::of($d, $today, $recentVisits, (int) ($links[$key] ?? 0));
            $p = $period[$key] ?? ['visits' => 0, 'conversions' => 0, 'revenue' => 0.0];

            $warnings = [];
            $start = $d['startDate'] ?? null;
            if ($phase === Phase::RUNNING && $start !== null && $start <= self::addDays($today, -self::QUIET_DAYS)
                && self::sum($daily, $key, max($start, $from), $today, 'visits', null) === 0
            ) {
                $warnings[] = 'no_visits_since_start';
            }

            $rows[] = [
                'campaign' => $key,
                'name' => $d['name'] ?? null,
                'phase' => $phase,
                'source' => $source,
                'hasDetails' => $local !== null,
                'activeLinks' => (int) ($links[$key] ?? 0),
                'linkStates' => $linkStates[$key] ?? ['draft' => 0, 'live' => 0, 'ended' => 0],
                'startDate' => $start,
                'endDate' => $d['endDate'] ?? null,
                'notes' => $d['notes'] ?? null,
                'period' => ['visits' => (int) $p['visits'], 'conversions' => (int) $p['conversions'], 'revenue' => round((float) $p['revenue'], 2)],
                'recentVisits' => $recentVisits,
                'goal' => $local !== null ? self::goal($d, $daily, $key, $from, $today) : null,
                'warnings' => $warnings,
                'platform' => $w === null ? null : ['id' => $w['id'], 'name' => $w['name'], 'status' => $w['status'], 'appUrl' => $w['appUrl']],
            ];
        }

        usort($rows, static function (array $a, array $b): int {
            // within a phase the planned campaigns (details or saved links) come before values only Matomo counted
            return [array_search($a['phase'], Phase::ORDER, true), $a['source'] === 'report' ? 1 : 0, -$a['period']['visits'], -$a['recentVisits'], $a['campaign']]
                <=> [array_search($b['phase'], Phase::ORDER, true), $b['source'] === 'report' ? 1 : 0, -$b['period']['visits'], -$b['recentVisits'], $b['campaign']];
        });
        return $rows;
    }

    /**
     * The details a row works with: the local ones, their missing name and dates taken from the workspace campaign; a
     * workspace campaign without local details stands alone (never archived: the platform lists no archived ones).
     */
    private static function withWorkspace(?array $local, ?array $w): ?array
    {
        if ($w === null) {
            return $local;
        }
        if ($local === null) {
            return ['name' => $w['name'] !== '' ? $w['name'] : null, 'startDate' => $w['startsOn'], 'endDate' => $w['endsOn'], 'archived' => false];
        }
        $local['name'] = ($local['name'] ?? null) ?: ($w['name'] !== '' ? $w['name'] : null);
        $local['startDate'] = $local['startDate'] ?? $w['startsOn'];
        $local['endDate'] = $local['endDate'] ?? $w['endsOn'];
        return $local;
    }

    /** goal progress from the start (or the window's first day) to the end or today; null without a goal or start */
    private static function goal(array $d, array $daily, string $key, string $from, string $today): ?array
    {
        $metric = $d['goalMetric'] ?? 'none';
        $target = $d['goalTarget'] ?? null;
        $start = $d['startDate'] ?? null;
        if ($metric === 'none' || $target === null || $start === null || $start > $today) {
            return null;
        }
        $end = $d['endDate'] ?? null;
        $to = $end !== null && $end < $today ? $end : $today;
        $countFrom = max($start, $from);
        $idGoal = isset($d['idGoal']) ? (int) $d['idGoal'] : null;
        $value = round((float) self::sum($daily, $key, $countFrom, $to, $metric, $idGoal), 2);
        return [
            'metric' => $metric,
            'target' => (float) $target,
            'idGoal' => $idGoal,
            'value' => $value,
            'progress' => $target > 0 ? round($value / (float) $target, 4) : null,
            'from' => $countFrom,
            'to' => $to,
            'complete' => $countFrom === $start,
        ];
    }

    /**
     * @param string $metric visits, conversions or revenue
     * @return int|float
     */
    private static function sum(array $daily, string $key, string $from, string $to, string $metric, ?int $idGoal)
    {
        $sum = $metric === 'revenue' ? 0.0 : 0;
        foreach ($daily as $day => $numbers) {
            if ($day < $from || $day > $to || !isset($numbers[$key])) {
                continue;
            }
            $n = $numbers[$key];
            if ($idGoal !== null && $metric !== 'visits') {
                $sum += $metric === 'revenue' ? (float) ($n['goals'][$idGoal]['revenue'] ?? 0) : (int) ($n['goals'][$idGoal]['conversions'] ?? 0);
            } else {
                $sum += $metric === 'revenue' ? (float) $n['revenue'] : (int) $n[$metric];
            }
        }
        return $sum;
    }

    public static function addDays(string $date, int $days): string
    {
        return (new \DateTimeImmutable($date . ' 00:00:00', new \DateTimeZone('UTC')))->modify(sprintf('%+d days', $days))->format('Y-m-d');
    }
}
