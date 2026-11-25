<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Log\LoggerInterface;
use Piwik\Container\StaticContainer;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Overview;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkBasis;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkShares;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkStatus;

/**
 * Finds the drafts among saved links whose first visit Matomo has counted (LinkStatus::liveByVisits) and marks them
 * live. Only drafts whose visits can be told apart are looked at: alone on their report row, and with a generated link
 * ID, or else with the row's QUIET_DAYS_BEFORE days before the creation day readable (within Overview::MAX_DAYS). For
 * those, one report request (two with Marketing Campaigns Reporting) over their days, all visits; none when no draft
 * qualifies.
 * Fails soft: when the reports cannot be read, the links stay as they are.
 */
class LinkLiveDetector
{
    public function __construct(
        private LinkDao $dao,
        private LinkReports $reports,
        private InstanceContext $context,
        private Today $today
    ) {
    }

    /**
     * @param list<array> $rows link rows (LinkDao)
     * @return list<array> the same rows, live_at set where a first visit made a draft live
     */
    public function refresh(int $idSite, array $rows, string $now): array
    {
        $today = $this->today->forSite($idSite);
        $drafts = [];
        foreach ($rows as $i => $row) {
            if (($row['archived_at'] ?? null) === null && self::status($row, $today) === LinkStatus::DRAFT) {
                $drafts[$i] = $this->today->dayOf($idSite, (string) $row['created_at']);
            }
        }
        if ($drafts === []) {
            return $rows;
        }

        try {
            $mcr = $this->context->isMcrActive();
            $shares = new LinkShares($this->dao->basisValues($idSite));
            $cap = self::addDays($today, -Overview::MAX_DAYS);
            // only drafts whose first visit could be told apart; the rest needs no report at all
            $eligible = [];
            foreach ($drafts as $i => $created) {
                if ($created > $today) {
                    continue;
                }
                $basis = LinkBasis::of((string) $rows[$i]['campaign'], (string) $rows[$i]['keyword'], (string) $rows[$i]['campaign_id'], $mcr);
                if ($shares->count($basis) > 1) {
                    // another saved link carries the same values or link ID: its visits may be that link's
                    continue;
                }
                if ($basis->type === LinkBasis::LINK_ID && !empty($rows[$i]['campaign_id_generated'])) {
                    $eligible[$i] = [$basis, $created, max($created, $cap)];
                    continue;
                }
                $quietFrom = self::addDays($created, -LinkStatus::QUIET_DAYS_BEFORE);
                // its quiet days lie beyond the days that can be read: unknown
                if ($quietFrom < $cap) {
                    continue;
                }
                $eligible[$i] = [$basis, $created, $quietFrom];
            }
            if ($eligible === []) {
                return $rows;
            }
            $from = min(array_column($eligible, 2));
            $withKeywords = false;
            $withLinkIds = false;
            $withCampaigns = false;
            foreach ($eligible as [$basis]) {
                $withKeywords = $withKeywords || $basis->type === LinkBasis::CAMPAIGN_KEYWORD;
                $withLinkIds = $withLinkIds || $basis->type === LinkBasis::LINK_ID;
                $withCampaigns = $withCampaigns || $basis->type !== LinkBasis::LINK_ID;
            }
            $daily = $this->reports->dailyVisits($idSite, $from, $today, $withKeywords, $withLinkIds, $withCampaigns);
        } catch (\Throwable $e) {
            StaticContainer::get(LoggerInterface::class)->warning('FeinwerkCampaignManager: first visits of draft links not read: {message}', ['message' => $e->getMessage()]);
            return $rows;
        }

        ksort($daily);
        $live = [];
        foreach ($eligible as $i => [$basis, $created, $start]) {
            $id = $basis->id();
            $before = 0;
            $since = 0;
            $firstDay = null;
            foreach ($daily as $day => $visits) {
                $n = $visits[$id] ?? 0;
                if ($day >= $created) {
                    $since += $n;
                    if ($firstDay === null && $n > 0) {
                        $firstDay = (string) $day;
                    }
                } elseif ($day >= $start) {
                    $before += $n;
                }
            }
            $generated = !empty($rows[$i]['campaign_id_generated']);
            if ($firstDay !== null && LinkStatus::liveByVisits($basis->type, max(1, $shares->count($basis)), $before, $since, $generated)) {
                $live[(int) $rows[$i]['idlink']] = $firstDay;
                $rows[$i]['live_at'] = $now;
                $rows[$i]['live_since'] = $firstDay;
                $rows[$i]['live_reason'] = LinkStatus::REASON_VISIT;
            }
        }
        $this->dao->markLive($idSite, $live, LinkStatus::REASON_VISIT, $now);
        return $rows;
    }

    public static function status(array $row, string $today): string
    {
        return LinkStatus::of(
            $row['live_at'] ?? null,
            isset($row['start_date']) ? (string) $row['start_date'] : null,
            isset($row['end_date']) ? (string) $row['end_date'] : null,
            $today
        );
    }

    private static function addDays(string $day, int $days): string
    {
        return (new \DateTimeImmutable($day . ' 00:00:00', new \DateTimeZone('UTC')))->modify(sprintf('%+d days', $days))->format('Y-m-d');
    }
}
