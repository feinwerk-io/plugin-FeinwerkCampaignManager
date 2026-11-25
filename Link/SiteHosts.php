<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * Whether a target URL belongs to a website, judged by the website's main and alias URLs in Matomo.
 */
final class SiteHosts
{
    /**
     * @param string[] $siteUrls the site's URLs as Matomo stores them; "*.example.com" matches example.com and every
     *                           subdomain, a leading "www." is ignored on both sides
     */
    public static function belongs(string $target, array $siteUrls): bool
    {
        $host = self::hostOf($target);
        if ($host === null) {
            return false;
        }
        foreach ($siteUrls as $url) {
            $url = trim((string) $url);
            if (strpos($url, '*.') === 0) {
                $base = self::hostOf('http://' . substr($url, 2));
                if ($base !== null && ($host === $base || substr($host, -strlen('.' . $base)) === '.' . $base)) {
                    return true;
                }
                continue;
            }
            $siteHost = self::hostOf(preg_match('#^[a-z][a-z0-9+.\-]*://#i', $url) ? $url : 'http://' . $url);
            if ($siteHost !== null && $siteHost === $host) {
                return true;
            }
        }
        return false;
    }

    private static function hostOf(string $url): ?string
    {
        $host = parse_url($url, PHP_URL_HOST);
        if (!is_string($host) || $host === '') {
            return null;
        }
        $host = mb_strtolower(rtrim($host, '.'), 'UTF-8');
        return strpos($host, 'www.') === 0 ? substr($host, 4) : $host;
    }
}
