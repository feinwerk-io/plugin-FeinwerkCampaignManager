<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkBasis;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkShares;

/**
 * The numbers of a page of saved links for a period: each link by its LinkBasis, with how many active links share
 * that report row. At most two report requests per call, whatever the number of links.
 */
class LinkResults
{
    public function __construct(private LinkDao $dao, private LinkReports $reports, private InstanceContext $context)
    {
    }

    /**
     * @param list<array> $rows link rows (LinkDao) of one page
     * @return list<array{idLink: int, basis: string, sharedWith: int, visits: int, conversions: int, revenue: float}>
     */
    public function forRows(int $idSite, array $rows, string $period, string $date, string $segment): array
    {
        if ($rows === []) {
            return [];
        }
        $mcr = $this->context->isMcrActive();
        $bases = [];
        $withKeywords = false;
        $withLinkIds = false;
        foreach ($rows as $row) {
            $basis = self::basis($row, $mcr);
            $bases[(int) $row['idlink']] = $basis;
            $withKeywords = $withKeywords || $basis->type === LinkBasis::CAMPAIGN_KEYWORD;
            $withLinkIds = $withLinkIds || $basis->type === LinkBasis::LINK_ID;
        }

        $shares = new LinkShares($this->dao->basisValues($idSite));

        $numbers = $this->reports->campaigns($idSite, $period, $date, $segment, $withKeywords);
        if ($withLinkIds) {
            $numbers += $this->reports->linkIds($idSite, $period, $date, $segment);
        }

        $out = [];
        foreach ($rows as $row) {
            $basis = $bases[(int) $row['idlink']];
            $found = $numbers[$basis->id()] ?? ['visits' => 0, 'conversions' => 0, 'revenue' => 0.0];
            $out[] = [
                'idLink' => (int) $row['idlink'],
                'basis' => $basis->type,
                // an archived link is not in the active count, yet it is counted by its row as well
                'sharedWith' => max(1, $shares->count($basis) + (($row['archived_at'] ?? null) !== null ? 1 : 0)),
                'visits' => $found['visits'],
                'conversions' => $found['conversions'],
                'revenue' => round($found['revenue'], 2),
            ];
        }
        return $out;
    }

    private static function basis(array $row, bool $mcr): LinkBasis
    {
        return LinkBasis::of((string) $row['campaign'], (string) $row['keyword'], (string) $row['campaign_id'], $mcr);
    }
}
