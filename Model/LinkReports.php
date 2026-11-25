<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\API\Request;
use Piwik\Common;
use Piwik\DataTable;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkBasis;

/**
 * Visits, conversions and revenue per report row a saved link can be counted by (LinkBasis), from Matomo's archived
 * reports only: Referrers.getCampaigns (campaign rows, with expanded keyword rows on request) and Marketing Campaigns
 * Reporting's getId (link IDs). Labels are unescaped (the tracker may store them HTML-escaped) and folded like
 * LinkBasis::label(). A multi-period answer (a Map) is summed.
 */
class LinkReports
{
    /**
     * @return array<string, array{visits: int, conversions: int, revenue: float}> LinkBasis id() => numbers, for the
     *         campaign rows and, with $withKeywords, their keyword rows
     */
    public function campaigns(int $idSite, string $period, string $date, string $segment, bool $withKeywords): array
    {
        $table = $this->request('Referrers.getCampaigns', $idSite, $period, $date, $segment, $withKeywords);
        $out = [];
        foreach ($this->tables($table) as $one) {
            $this->collectCampaigns($one, $withKeywords, $out);
        }
        return $out;
    }

    /**
     * @return array<string, array{visits: int, conversions: int, revenue: float}> LinkBasis id() => numbers per link ID
     *         (Marketing Campaigns Reporting must be active)
     */
    public function linkIds(int $idSite, string $period, string $date, string $segment): array
    {
        $table = $this->request('MarketingCampaignsReporting.getId', $idSite, $period, $date, $segment, false);
        $out = [];
        foreach ($this->tables($table) as $one) {
            $this->collectLinkIds($one, $out);
        }
        return $out;
    }

    /** @param array<string, array{visits: int, conversions: int, revenue: float}> $out */
    private function collectCampaigns(DataTable $table, bool $withKeywords, array &$out): void
    {
        foreach ($table->getRows() as $row) {
            $campaign = LinkBasis::label(Common::unsanitizeInputValue((string) $row->getColumn('label')));
            self::add($out, LinkBasis::CAMPAIGN . ':' . $campaign, $row);
            if (!$withKeywords) {
                continue;
            }
            $keywords = $row->getSubtable();
            if (!$keywords instanceof DataTable) {
                continue;
            }
            foreach ($keywords->getRows() as $keywordRow) {
                $keyword = LinkBasis::label(Common::unsanitizeInputValue((string) $keywordRow->getColumn('label')));
                self::add($out, LinkBasis::CAMPAIGN_KEYWORD . ':' . LinkBasis::pair($campaign, $keyword), $keywordRow);
            }
        }
    }

    /** @param array<string, array{visits: int, conversions: int, revenue: float}> $out */
    private function collectLinkIds(DataTable $table, array &$out): void
    {
        foreach ($table->getRows() as $row) {
            $id = LinkBasis::label(Common::unsanitizeInputValue((string) $row->getColumn('label')));
            self::add($out, LinkBasis::LINK_ID . ':' . $id, $row);
        }
    }

    /**
     * Visits per report row and day, for telling a draft's first visit and a link's last one (all visits, no segment).
     *
     * @return array<string, array<string, int>> YYYY-MM-DD => LinkBasis id() => visits
     */
    public function dailyVisits(int $idSite, string $from, string $to, bool $withKeywords, bool $withLinkIds, bool $withCampaigns = true): array
    {
        $days = [];
        // the campaign report only when a campaign or keyword row is needed (link IDs alone come from getId)
        $sources = $withCampaigns || $withKeywords ? [['Referrers.getCampaigns', $withKeywords]] : [];
        if ($withLinkIds) {
            $sources[] = ['MarketingCampaignsReporting.getId', false];
        }
        foreach ($sources as [$method, $expanded]) {
            $table = $this->request($method, $idSite, 'day', $from . ',' . $to, '', $expanded);
            $tables = $table instanceof DataTable\Map ? $table->getDataTables() : [$from => $table];
            foreach ($tables as $label => $one) {
                if (!$one instanceof DataTable) {
                    continue;
                }
                $period = $one->getMetadata('period');
                $day = $period && method_exists($period, 'getDateStart') ? $period->getDateStart()->toString('Y-m-d') : substr((string) $label, 0, 10);
                $numbers = [];
                if ($method === 'Referrers.getCampaigns') {
                    $this->collectCampaigns($one, $expanded, $numbers);
                } else {
                    $this->collectLinkIds($one, $numbers);
                }
                foreach ($numbers as $id => $n) {
                    $days[$day][$id] = ($days[$day][$id] ?? 0) + $n['visits'];
                }
            }
        }
        return $days;
    }

    /** @return DataTable|DataTable\Map|mixed */
    private function request(string $method, int $idSite, string $period, string $date, string $segment, bool $expanded)
    {
        return Request::processRequest($method, [
            'idSite' => $idSite,
            'period' => $period,
            'date' => $date,
            'segment' => $segment,
            'format' => 'original',
            'format_metrics' => 0,
            'filter_limit' => -1,
            'expanded' => $expanded ? 1 : 0,
            'flat' => 0,
        ], []);
    }

    /** @return list<DataTable> */
    private function tables($table): array
    {
        if ($table instanceof DataTable\Map) {
            $out = [];
            foreach ($table->getDataTables() as $one) {
                $out = array_merge($out, $this->tables($one));
            }
            return $out;
        }
        return $table instanceof DataTable ? [$table] : [];
    }

    /** @param array<string, array{visits: int, conversions: int, revenue: float}> $out */
    private static function add(array &$out, string $id, DataTable\Row $row): void
    {
        $numbers = $out[$id] ?? ['visits' => 0, 'conversions' => 0, 'revenue' => 0.0];
        $numbers['visits'] += (int) $row->getColumn('nb_visits');
        $numbers['conversions'] += (int) $row->getColumn('nb_conversions');
        $numbers['revenue'] += (float) $row->getColumn('revenue');
        $out[$id] = $numbers;
    }
}
