<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Container\StaticContainer;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkStatus;

/**
 * The API shape of a saved link: raw values, ISO 8601 UTC times, stable keys.
 */
class LinkPresenter
{
    /**
     * @return array{idLink: int, idSite: int, url: string, targetUrl: string, parameterSet: string,
     *               values: array<string, string>, campaignIdGenerated: bool, startDate: ?string, endDate: ?string,
     *               note: ?string, archived: bool, status: string, liveAt: ?string, liveSince: ?string,
     *               liveReason: ?string, createdBy: string,
     *               createdAt: string, updatedBy: string, updatedAt: string, archivedAt: ?string}
     */
    public static function link(array $row, ?string $today = null): array
    {
        $today = $today ?? StaticContainer::get(Today::class)->forSite((int) $row['idsite']);
        $status = LinkLiveDetector::status($row, $today);
        $values = [];
        foreach (LinkDao::VALUE_COLUMNS as $field => $column) {
            $values[$field] = (string) $row[$column];
        }
        return [
            'idLink' => (int) $row['idlink'],
            'idSite' => (int) $row['idsite'],
            'url' => (string) $row['url'],
            'targetUrl' => (string) $row['target_url'],
            'parameterSet' => (string) $row['parameter_set'],
            'values' => $values,
            'campaignIdGenerated' => (bool) $row['campaign_id_generated'],
            'startDate' => $row['start_date'] === null ? null : (string) $row['start_date'],
            'endDate' => $row['end_date'] === null ? null : (string) $row['end_date'],
            'note' => $row['note'] === null ? null : (string) $row['note'],
            'archived' => $row['archived_at'] !== null,
            'status' => $status,
            'liveAt' => ($row['live_at'] ?? null) === null ? null : self::time($row['live_at']),
            'liveSince' => self::liveSince($row, $status),
            'liveReason' => self::liveReason($row, $status),
            'createdBy' => (string) $row['created_by'],
            'createdAt' => self::time($row['created_at']),
            'updatedBy' => (string) $row['updated_by'],
            'updatedAt' => self::time($row['updated_at']),
            'archivedAt' => $row['archived_at'] === null ? null : self::time($row['archived_at']),
        ];
    }

    /** the website's day the link went live; for a link live only by its start date so far, that date */
    private static function liveSince(array $row, string $status): ?string
    {
        if (($row['live_since'] ?? null) !== null) {
            return (string) $row['live_since'];
        }
        $start = $row['start_date'] ?? null;
        return $status !== LinkStatus::DRAFT && ($row['live_at'] ?? null) === null && $start !== null && $start !== ''
            ? (string) $start
            : null;
    }

    private static function liveReason(array $row, string $status): ?string
    {
        if (($row['live_reason'] ?? null) !== null) {
            return (string) $row['live_reason'];
        }
        return self::liveSince($row, $status) !== null ? LinkStatus::REASON_START : null;
    }

    private static function time($datetime): string
    {
        return str_replace(' ', 'T', (string) $datetime) . 'Z';
    }
}
