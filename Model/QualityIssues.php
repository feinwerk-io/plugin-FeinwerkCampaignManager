<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\SpellingGroups;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\CampaignDao;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;

/**
 * The Datenqualität page: spelling variants among the campaign values of a period (counted by Matomo, used by saved
 * links, or with campaign details) and the values Matomo counted that no saved link and no details explain. Numbers
 * from Matomo's archived campaign report only (one request).
 */
class QualityIssues
{
    /** values without a saved link listed at most */
    public const UNEXPLAINED_MAX = 50;

    public function __construct(private CampaignReports $reports, private LinkDao $links, private CampaignDao $details)
    {
    }

    /**
     * @return array{variants: list<array>, unexplained: list<array{value: string, visits: int, conversions: int}>,
     *               counts: array{variants: int, unexplained: int, unexplainedVisits: int, campaignVisits: int}}
     */
    public function find(int $idSite, string $period, string $date, string $segment): array
    {
        $values = [];
        $entry = static fn(): array => ['visits' => 0, 'conversions' => 0, 'savedLinks' => 0, 'hasDetails' => false];
        foreach ($this->reports->forPeriod($idSite, $period, $date, $segment) as $key => $numbers) {
            $values[$key] = $entry();
            $values[$key]['visits'] = (int) $numbers['visits'];
            $values[$key]['conversions'] = (int) $numbers['conversions'];
        }
        foreach ($this->links->knownValues($idSite)['campaign'] ?? [] as $value => $links) {
            $key = CampaignKey::of((string) $value);
            if ($key === '') {
                continue;
            }
            $values[$key] = $values[$key] ?? $entry();
            $values[$key]['savedLinks'] += (int) $links;
        }
        foreach ($this->details->all($idSite) as $row) {
            if ($row['archived_at'] !== null) {
                continue;
            }
            $key = (string) $row['campaign'];
            $values[$key] = $values[$key] ?? $entry();
            $values[$key]['hasDetails'] = true;
        }

        $unexplained = [];
        foreach ($values as $key => $n) {
            if ($n['visits'] > 0 && $n['savedLinks'] === 0 && !$n['hasDetails']) {
                $unexplained[] = ['value' => (string) $key, 'visits' => $n['visits'], 'conversions' => $n['conversions']];
            }
        }
        usort($unexplained, static fn(array $a, array $b): int => [$b['visits'], $a['value']] <=> [$a['visits'], $b['value']]);
        $variants = SpellingGroups::of($values);
        return [
            'variants' => $variants,
            'unexplained' => array_slice($unexplained, 0, self::UNEXPLAINED_MAX),
            'counts' => [
                'variants' => count($variants),
                'unexplained' => count($unexplained),
                'unexplainedVisits' => array_sum(array_column($unexplained, 'visits')),
                'campaignVisits' => array_sum(array_column($values, 'visits')),
            ],
        ];
    }
}
