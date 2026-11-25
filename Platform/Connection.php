<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

/**
 * Whether this Matomo is connected to the Feinwerk Campaigns platform. A shared interface: other Feinwerk plugins read
 * it for the tip line funnel of the promotion kit (decision 8 of 2026-11-23: not installed, installed but not
 * connected, connected), always through class_exists() and inside catch (\Throwable). Stable name and signature;
 * announce any change to the plugin sessions and PluginLead first.
 *
 * The standalone version has no connection, so the answer is false until the connected mode ships.
 */
final class Connection
{
    public static function isConnected(): bool
    {
        return false;
    }

    /**
     * The page to open in Feinwerk Campaign Manager for a website (its campaign overview), relative to Matomo's index.php
     */
    public static function overviewUrl(int $idSite, string $period = 'day', string $date = 'yesterday'): string
    {
        $params = http_build_query(['idSite' => $idSite, 'period' => $period, 'date' => $date], '', '&', PHP_QUERY_RFC3986);
        return 'index.php?module=CoreHome&action=index&' . $params . '#?' . $params
            . '&category=FeinwerkCampaignManager_Campaigns&subcategory=FeinwerkCampaignManager_Overview';
    }
}
