<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * The key that makes a saved link unique per website: the same link saved twice is found again instead of copied.
 */
final class Fingerprint
{
    /**
     * @param string $url the built link without a generated link ID
     * @return string 40 hex characters
     */
    public static function of(int $idSite, string $url): string
    {
        // scheme and host are case insensitive, path and query are not
        if (preg_match('#^([a-z][a-z0-9+.\-]*://)([^/?\#]*)(.*)$#is', $url, $m)) {
            $url = strtolower($m[1]) . mb_strtolower($m[2], 'UTF-8') . $m[3];
        }
        return sha1($idSite . "\n" . $url);
    }
}
