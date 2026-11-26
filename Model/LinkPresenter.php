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
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;

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
     *               createdAt: string, updatedBy: string, updatedAt: string, archivedAt: ?string,
     *               platform: ?array{id: string, campaignId: ?string, shortUrl: ?string, qr: bool, qrUrl: ?string,
     *               appUrl: ?string}}
     *         platform: the link in Feinwerk Campaigns (connected mode), null for links made here
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
            // platform = 0 hides everything about the platform (Peter's decision 1 of 2026-11-23)
            'platform' => empty($row['platform_link_id']) || !self::platformShown() ? null : [
                'id' => (string) $row['platform_link_id'],
                'campaignId' => ($row['platform_campaign_id'] ?? null) === null ? null : (string) $row['platform_campaign_id'],
                // a short link keeps redirecting while the workspace has it, connected or not
                'shortUrl' => PlatformConfig::shortLink($row['short_url'] ?? null),
                'qr' => !empty($row['platform_qr']),
                // the QR code downloads through this Matomo with the connection's token (never in the browser), so only
                // while the connection works
                'qrUrl' => empty($row['platform_qr']) || !self::platformWorks() ? null
                    : 'index.php?module=FeinwerkCampaignManager&action=platformQr&idSite=' . (int) $row['idsite']
                    . '&idLink=' . (int) $row['idlink'],
                'appUrl' => PlatformConfig::appLink($row['platform_app_url'] ?? null),
            ],
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

    /** @var bool|null per request: whether the connection works now (a local read, Connection::isConnected) */
    private static ?bool $works = null;

    /** @var bool|null per request: whether the platform is switched on (config, read once for a whole list) */
    private static ?bool $shown = null;

    private static function platformShown(): bool
    {
        if (PlatformConfig::$enabledOverride !== null) {
            return PlatformConfig::$enabledOverride;
        }
        if (self::$shown === null) {
            self::$shown = PlatformConfig::enabled();
        }
        return self::$shown;
    }

    private static function platformWorks(): bool
    {
        if (self::$works === null) {
            self::$works = \Piwik\Plugins\FeinwerkCampaignManager\Platform\Connection::isConnected();
        }
        return self::$works;
    }

    /** for tests and after connecting or disconnecting in the same request */
    public static function forgetPlatformState(): void
    {
        self::$works = null;
        self::$shown = null;
    }
}
