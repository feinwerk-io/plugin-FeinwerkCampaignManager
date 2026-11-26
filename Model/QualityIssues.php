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

    public function __construct(
        private CampaignReports $reports,
        private LinkDao $links,
        private CampaignDao $details,
        private WorkspaceCampaigns $workspace
    ) {
    }

    /**
     * Spelling groups that are no spelling variants (UI review 2026-11-26 F3): two or more known campaigns (with
     * details here, or campaigns of the connected workspace) are distinct campaigns, never variants of one another, so
     * such a group goes; a group in which every value has its own saved links may be distinct campaigns too, so it
     * keeps its values but recommends none (maybeDistinct). Pure.
     *
     * @param list<array{suggested: string, visits: int, values: list<array{value: string, savedLinks: int}>}> $groups
     * @param array<string, bool> $known campaign key => a known campaign
     * @return list<array> the groups, each with maybeDistinct
     */
    public static function sortOutDistinct(array $groups, array $known): array
    {
        $out = [];
        foreach ($groups as $group) {
            $values = (array) ($group['values'] ?? []);
            $knownCount = count(array_filter($values, static fn(array $v): bool => !empty($known[(string) $v['value']])));
            if ($knownCount >= 2) {
                continue;
            }
            $group['maybeDistinct'] = $values !== []
                && count(array_filter($values, static fn(array $v): bool => (int) $v['savedLinks'] > 0)) === count($values);
            $out[] = $group;
        }
        return $out;
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
        $known = [];
        foreach ($values as $key => $n) {
            if ($n['hasDetails']) {
                $known[(string) $key] = true;
            }
        }
        foreach (array_keys($this->workspace->forSite($idSite)) as $key) {
            $known[(string) $key] = true;
        }
        $variants = self::sortOutDistinct(SpellingGroups::of($values), $known);
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
