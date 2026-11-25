<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

/**
 * The API shape of saved campaign details: raw values, ISO 8601 UTC times, stable keys.
 */
class CampaignPresenter
{
    /**
     * @return array{campaign: string, name: ?string, startDate: ?string, endDate: ?string,
     *               goal: ?array{metric: string, target: ?float, idGoal: ?int}, notes: ?string, archived: bool,
     *               createdBy: string, createdAt: string, updatedBy: string, updatedAt: string, archivedAt: ?string}
     */
    public static function details(array $row): array
    {
        return [
            'campaign' => (string) $row['campaign'],
            'name' => $row['name'] === null ? null : (string) $row['name'],
            'startDate' => $row['start_date'] === null ? null : (string) $row['start_date'],
            'endDate' => $row['end_date'] === null ? null : (string) $row['end_date'],
            'goal' => $row['goal_metric'] === 'none' ? null : [
                'metric' => (string) $row['goal_metric'],
                'target' => $row['goal_target'] === null ? null : (float) $row['goal_target'],
                'idGoal' => $row['idgoal'] === null ? null : (int) $row['idgoal'],
            ],
            'notes' => $row['notes'] === null ? null : (string) $row['notes'],
            'archived' => $row['archived_at'] !== null,
            'createdBy' => (string) $row['created_by'],
            'createdAt' => self::time($row['created_at']),
            'updatedBy' => (string) $row['updated_by'],
            'updatedAt' => self::time($row['updated_at']),
            'archivedAt' => $row['archived_at'] === null ? null : self::time($row['archived_at']),
        ];
    }

    private static function time($datetime): string
    {
        return str_replace(' ', 'T', (string) $datetime) . 'Z';
    }
}
