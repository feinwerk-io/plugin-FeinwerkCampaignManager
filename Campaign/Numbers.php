<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Campaign;

/**
 * Report numbers per campaign key: report labels that fold to one key are summed, empty labels are skipped.
 */
final class Numbers
{
    /** @var array<string, array{visits: int, conversions: int, revenue: float, goals: array<int, array{conversions: int, revenue: float}>}> */
    private array $byKey = [];

    /**
     * @param array<int, array{conversions: int, revenue: float}> $goals per Matomo goal id
     */
    public function add(string $label, int $visits, int $conversions, float $revenue, array $goals): void
    {
        $key = CampaignKey::of($label);
        if ($key === '') {
            return;
        }
        $row = $this->byKey[$key] ?? ['visits' => 0, 'conversions' => 0, 'revenue' => 0.0, 'goals' => []];
        $row['visits'] += $visits;
        $row['conversions'] += $conversions;
        $row['revenue'] += $revenue;
        foreach ($goals as $idGoal => $goal) {
            $was = $row['goals'][(int) $idGoal] ?? ['conversions' => 0, 'revenue' => 0.0];
            $row['goals'][(int) $idGoal] = [
                'conversions' => $was['conversions'] + (int) $goal['conversions'],
                'revenue' => $was['revenue'] + (float) $goal['revenue'],
            ];
        }
        $this->byKey[$key] = $row;
    }

    /** @return array<string, array{visits: int, conversions: int, revenue: float, goals: array}> */
    public function all(): array
    {
        return $this->byKey;
    }
}
