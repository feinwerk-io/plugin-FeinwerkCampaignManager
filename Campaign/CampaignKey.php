<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Campaign;

use Piwik\Plugins\FeinwerkCampaignManager\Link\ValueNormalizer;

/**
 * The key of a campaign per website: its campaign value as links and Matomo's reports carry it, cleaned and lower case
 * (core Matomo stores campaign names in lower case). Stored with a hash, so uniqueness does not depend on the
 * database collation ("küche" and "kuche" stay two campaigns).
 */
final class CampaignKey
{
    public static function of(string $value): string
    {
        return ValueNormalizer::normalize($value, true);
    }

    /** 40 hex characters */
    public static function hash(string $key): string
    {
        return sha1($key);
    }
}
