<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

use Piwik\Config;

/**
 * Where the platform is and whether the plugin may offer it at all. config.ini.php, section [FeinwerkCampaignManager]:
 * platform = 0 hides everything platform-related (Peter's decision 1 of 2026-11-23: the connect button is product, not
 * promotion, with its own switch); platform_url only for tests against another installation (default the live app).
 */
final class PlatformConfig
{
    public const DEFAULT_URL = 'https://app.campaigns.feinwerk.io';

    /** For tests: true or false instead of the config. */
    public static ?bool $enabledOverride = null;

    public static function enabled(): bool
    {
        if (self::$enabledOverride !== null) {
            return self::$enabledOverride;
        }
        try {
            $section = Config::getInstance()->FeinwerkCampaignManager;
            return !is_array($section) || !array_key_exists('platform', $section) || (string) $section['platform'] !== '0';
        } catch (\Throwable $e) {
            return true;
        }
    }

    /** the platform's base URL, https only (another value from the config is ignored) */
    public static function baseUrl(): string
    {
        try {
            $section = Config::getInstance()->FeinwerkCampaignManager;
            $url = is_array($section) ? trim((string) ($section['platform_url'] ?? '')) : '';
            if ($url !== '' && preg_match('#^https://[a-z0-9.-]+(:\d+)?$#i', $url)) {
                return strtolower($url);
            }
        } catch (\Throwable $e) {
            // the default then
        }
        return self::DEFAULT_URL;
    }

    public static function connectUrl(): string
    {
        return self::baseUrl() . '/connect/matomo';
    }

    public static function apiUrl(string $path): string
    {
        return self::baseUrl() . '/api/plugin/v1/' . ltrim($path, '/');
    }

    /** a link into the platform itself (its base URL), else null: only such links reach a browser's href */
    public static function appLink($url): ?string
    {
        return is_string($url) && strlen($url) <= 255 && strpos($url, self::baseUrl() . '/') === 0
            && !preg_match('/[\s\x00-\x1f]/', $url) ? $url : null;
    }

    /** a short link (any host, the workspace may have its own domain), https only, else null */
    public static function shortLink($url): ?string
    {
        return is_string($url) && strlen($url) <= 255 && preg_match('#^https://[^\s/?\#]+#i', $url)
            && !preg_match('/[\s\x00-\x1f]/', $url) ? $url : null;
    }

    /**
     * Matomo for WordPress: the return from the platform is not tested there yet (decision 4 of 2026-11-23), so the
     * connect button gives way to a note.
     */
    public static function isWordPress(): bool
    {
        try {
            return defined('ABSPATH') && function_exists('matomo_add_plugin');
        } catch (\Throwable $e) {
            return false;
        }
    }
}
