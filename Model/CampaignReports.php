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
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Numbers;

/**
 * Visits, conversions and revenue per campaign from Matomo's archived campaign report (Referrers.getCampaigns), never
 * from the log tables. Labels are folded to campaign keys (Numbers); stored labels can be HTML-escaped by the tracker
 * and are unescaped first.
 */
class CampaignReports
{
    /**
     * @return array<string, array> key => numbers (Numbers::all()) of the period
     */
    public function forPeriod(int $idSite, string $period, string $date, string $segment): array
    {
        $table = $this->request($idSite, $period, $date, $segment);
        $numbers = new Numbers();
        if ($table instanceof DataTable\Map) {
            foreach ($table->getDataTables() as $one) {
                $this->collect($one, $numbers);
            }
        } elseif ($table instanceof DataTable) {
            $this->collect($table, $numbers);
        }
        return $numbers->all();
    }

    /**
     * @return array<string, array<string, array>> YYYY-MM-DD => key => numbers, one entry per day from $from to $to
     */
    public function daily(int $idSite, string $from, string $to, string $segment): array
    {
        $table = $this->request($idSite, 'day', $from . ',' . $to, $segment);
        $days = [];
        $tables = $table instanceof DataTable\Map ? $table->getDataTables() : [$from => $table];
        foreach ($tables as $label => $one) {
            if (!$one instanceof DataTable) {
                continue;
            }
            $period = $one->getMetadata('period');
            $day = $period && method_exists($period, 'getDateStart') ? $period->getDateStart()->toString('Y-m-d') : substr((string) $label, 0, 10);
            $numbers = new Numbers();
            $this->collect($one, $numbers);
            $days[$day] = $numbers->all();
        }
        return $days;
    }

    /** @return DataTable|DataTable\Map */
    private function request(int $idSite, string $period, string $date, string $segment)
    {
        return Request::processRequest('Referrers.getCampaigns', [
            'idSite' => $idSite,
            'period' => $period,
            'date' => $date,
            'segment' => $segment,
            'format' => 'original',
            'format_metrics' => 0,
            'filter_limit' => -1,
            'expanded' => 0,
            'flat' => 0,
        ], []);
    }

    private function collect(DataTable $table, Numbers $numbers): void
    {
        foreach ($table->getRows() as $row) {
            $goals = [];
            $byGoal = $row->getColumn('goals');
            if (is_array($byGoal)) {
                foreach ($byGoal as $id => $metrics) {
                    if (!is_array($metrics) || !preg_match('/(\d+)$/', (string) $id, $m)) {
                        continue;
                    }
                    $goals[(int) $m[1]] = [
                        'conversions' => (int) ($metrics['nb_conversions'] ?? 0),
                        'revenue' => (float) ($metrics['revenue'] ?? 0),
                    ];
                }
            }
            $numbers->add(
                Common::unsanitizeInputValue((string) $row->getColumn('label')),
                (int) $row->getColumn('nb_visits'),
                (int) $row->getColumn('nb_conversions'),
                (float) $row->getColumn('revenue'),
                $goals
            );
        }
    }
}
