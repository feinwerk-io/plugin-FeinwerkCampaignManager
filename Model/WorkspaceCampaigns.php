<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Cache;
use Piwik\Piwik;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Connection;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService;

/**
 * The connected workspace's campaigns of a site's website, keyed like the campaign details, for the overview and All
 * campaigns (Peter, 2026-11-26: "Q2 ja"). Standalone, or with the platform switched off, it makes no call; a failure
 * gives [] and is remembered FAILED_TTL seconds, so the pages show the local campaigns and never wait on the platform.
 * The anonymous user of a public site gets none: planned workspace campaigns are no public data, and its page views
 * reach no platform.
 */
class WorkspaceCampaigns
{
    public const FAILED_TTL = 60;

    public function __construct(private PlatformService $platform)
    {
    }

    /**
     * @return array<string, array{id: string, name: string, status: string, startsOn: ?string, endsOn: ?string, appUrl: ?string}>
     *         campaign key (CampaignKey::of of the campaign value) => the workspace campaign
     */
    public function forSite(int $idSite): array
    {
        if (!PlatformConfig::enabled() || Piwik::isUserIsAnonymous() || !Connection::isConnected()) {
            return [];
        }
        $failedKey = 'FeinwerkCampaignManager_wscampaigns_failed_' . $idSite;
        try {
            $cache = Cache::getLazyCache();
            if ($cache->fetch($failedKey)) {
                return [];
            }
            $urls = (array) \Piwik\Plugins\SitesManager\API::getInstance()->getSiteUrlsFromId($idSite);
            $rows = $this->platform->campaignsForSite($idSite, array_values(array_map('strval', $urls)), 'en');
        } catch (\Throwable $e) {
            try {
                Cache::getLazyCache()->save($failedKey, 1, self::FAILED_TTL);
            } catch (\Throwable $ignored) {
                // nothing remembered then
            }
            return [];
        }
        return self::byKey($rows);
    }

    /**
     * @param list<mixed> $rows rows of GET /campaigns
     * @return array<string, array{id: string, name: string, status: string, startsOn: ?string, endsOn: ?string, appUrl: ?string}>
     */
    public static function byKey(array $rows): array
    {
        $out = [];
        foreach ($rows as $c) {
            if (!is_array($c)) {
                continue;
            }
            $key = CampaignKey::of((string) ($c['parameter'] ?? ''));
            if ($key === '' || isset($out[$key])) {
                continue;
            }
            $out[$key] = [
                'id' => (string) ($c['id'] ?? ''),
                'name' => (string) ($c['name'] ?? ''),
                'status' => (string) ($c['status'] ?? ''),
                'startsOn' => self::day($c['starts_on'] ?? null),
                'endsOn' => self::day($c['ends_on'] ?? null),
                'appUrl' => PlatformConfig::appLink($c['app_url'] ?? null),
            ];
        }
        return $out;
    }

    private static function day($value): ?string
    {
        return is_string($value) && preg_match('/^\d{4}-\d{2}-\d{2}/', $value) ? substr($value, 0, 10) : null;
    }
}
