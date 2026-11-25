<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Date;
use Piwik\Site;

/**
 * Today's date in a website's time zone. A service, so tests replace it with a fixed day.
 */
class Today
{
    /** @return string YYYY-MM-DD */
    public function forSite(int $idSite): string
    {
        return Date::factory('now', Site::getTimezoneFor($idSite))->toString('Y-m-d');
    }

    /**
     * The website's local day of a stored UTC time (Matomo's own time zone handling, also for "UTC+2" zones)
     *
     * @return string YYYY-MM-DD
     */
    public function dayOf(int $idSite, string $utcDatetime): string
    {
        $timestamp = Date::factory($utcDatetime)->getTimestamp();
        return gmdate('Y-m-d', (int) Date::adjustForTimezone($timestamp, Site::getTimezoneFor($idSite)));
    }
}
