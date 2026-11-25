<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Overview;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\NotFoundException;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkBasis;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkShares;

/**
 * The numbers of one campaign over its own days (the campaign page): from its start date, or else its first visit in
 * the days that can be read, to its end date or today, at most Overview::MAX_DAYS. Day archives only, so cron archiving
 * is enough: the campaign report per day, its saved links' numbers over the same days, and for links counted by their
 * own link ID the last day with a visit.
 */
class CampaignResults
{
    /** a live link with an own link ID and no visit for this many days gets the warning link_quiet */
    public const LINK_QUIET_DAYS = 5;

    public function __construct(
        private CampaignService $campaigns,
        private CampaignReports $reports,
        private LinkDao $links,
        private LinkResults $linkResults,
        private LinkReports $linkReports,
        private LinkLiveDetector $detector,
        private InstanceContext $context,
        private Today $today,
        private Messages $messages
    ) {
    }

    /**
     * @return array see API::getCampaignResults
     */
    public function find(int $idSite, string $campaign, string $segment, string $now): array
    {
        $key = CampaignKey::of($campaign);
        if ($key === '') {
            throw new InvalidInputException($this->messages->campaignRequired());
        }
        $today = $this->today->forSite($idSite);
        $details = $this->detailsOf($idSite, $key);
        $start = $details['startDate'] ?? null;
        $end = $details['endDate'] ?? null;
        $to = $end !== null && $end < $today ? $end : $today;
        $cap = Overview::addDays($to, -(Overview::MAX_DAYS - 1));

        $series = [];
        $from = $to;
        $complete = true;
        if ($start !== null && $start > $today) {
            // not started yet: nothing to count
            $from = $start;
            $to = $start;
        } else {
            $readFrom = max($start ?? $cap, $cap);
            $daily = $this->reports->daily($idSite, $readFrom, $to, $segment);
            ksort($daily);
            $firstVisit = null;
            foreach ($daily as $day => $numbers) {
                $n = $numbers[$key] ?? null;
                if ($firstVisit === null && $n !== null && (int) $n['visits'] > 0) {
                    $firstVisit = (string) $day;
                }
            }
            $from = $start !== null ? $readFrom : ($firstVisit ?? $to);
            $complete = $start !== null ? $start >= $cap : ($firstVisit === null || $firstVisit > $cap);
            foreach ($daily as $day => $numbers) {
                if ((string) $day < $from) {
                    continue;
                }
                $n = $numbers[$key] ?? ['visits' => 0, 'conversions' => 0, 'revenue' => 0.0];
                $series[] = ['day' => (string) $day, 'visits' => (int) $n['visits'], 'conversions' => (int) $n['conversions'], 'revenue' => round((float) $n['revenue'], 2)];
            }
        }

        // not started: the row only for its details and phase (today's numbers are zero for it anyway)
        try {
            $row = $start !== null && $start > $today
                ? $this->campaigns->one($idSite, $key, 'day', $today, $segment)
                : $this->campaigns->one($idSite, $key, 'day', $from . ',' . $to, $segment);
        } catch (NotFoundException $e) {
            throw new NotFoundException($this->messages->campaignNoData($key, $idSite));
        }
        $links = $this->detector->refresh($idSite, $this->links->activeByCampaign($idSite, $key), $now);
        $results = [];
        $linkDates = $start !== null && $start > $today ? $today : $from . ',' . $to;
        foreach ($this->linkResults->forRows($idSite, $links, 'day', $linkDates, $segment) as $r) {
            $results[$r['idLink']] = $r;
        }
        $lastVisits = $this->lastVisits($idSite, $links, $from, $to);

        $warnings = [];
        $linkRows = [];
        foreach ($links as $link) {
            $id = (int) $link['idlink'];
            $presented = LinkPresenter::link($link, $today);
            $last = $lastVisits[$id] ?? null;
            if ($last !== null && $presented['status'] === 'live' && $last < Overview::addDays($today, -self::LINK_QUIET_DAYS)) {
                $warnings[] = ['code' => 'link_quiet', 'idLink' => $id, 'lastVisitDay' => $last];
            }
            $linkRows[] = ['link' => $presented, 'results' => $results[$id] ?? null, 'lastVisitDay' => $last];
        }

        return [
            'campaign' => $row,
            'window' => ['from' => $from, 'to' => $to, 'complete' => $complete],
            'totals' => [
                'visits' => array_sum(array_column($series, 'visits')),
                'conversions' => array_sum(array_column($series, 'conversions')),
                'revenue' => round(array_sum(array_column($series, 'revenue')), 2),
            ],
            'series' => $series,
            'links' => $linkRows,
            'warnings' => $warnings,
        ];
    }

    /** @return array<string, mixed>|null the campaign's details as Overview reads them */
    private function detailsOf(int $idSite, string $key): ?array
    {
        try {
            $row = $this->campaigns->details($idSite, $key);
        } catch (NotFoundException $e) {
            return null;
        }
        return [
            'startDate' => $row['start_date'] === null ? null : (string) $row['start_date'],
            'endDate' => $row['end_date'] === null ? null : (string) $row['end_date'],
        ];
    }

    /**
     * The last day with a visit, only for links counted by their own link ID that no other saved link carries (a shared
     * row says nothing about one link); all visits, whatever segment the page uses
     *
     * @param list<array> $links
     * @return array<int, string> idLink => YYYY-MM-DD
     */
    private function lastVisits(int $idSite, array $links, string $from, string $to): array
    {
        if (!$this->context->isMcrActive() || $from > $to) {
            return [];
        }
        $ids = [];
        $shares = new LinkShares($this->links->basisValues($idSite));
        foreach ($links as $link) {
            $basis = LinkBasis::of((string) $link['campaign'], (string) $link['keyword'], (string) $link['campaign_id'], true);
            // only an ID no other saved link carries says something about this one link
            if ($basis->type === LinkBasis::LINK_ID && $shares->count($basis) === 1) {
                $ids[(int) $link['idlink']] = $basis->id();
            }
        }
        if ($ids === []) {
            return [];
        }
        $daily = $this->linkReports->dailyVisits($idSite, $from, $to, false, true, false);
        krsort($daily);
        $out = [];
        foreach ($ids as $idLink => $basisId) {
            foreach ($daily as $day => $visits) {
                if (($visits[$basisId] ?? 0) > 0) {
                    $out[$idLink] = (string) $day;
                    break;
                }
            }
        }
        return $out;
    }
}
