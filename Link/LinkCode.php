<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * The short link ID that goes into the campaign ID parameter, so Marketing Campaigns Reporting can count per link.
 */
final class LinkCode
{
    /** lower case letters and digits without 0, 1, l and o (easy to read aloud and to type from print) */
    public const ALPHABET = 'abcdefghijkmnpqrstuvwxyz23456789';
    public const LENGTH = 8;

    public static function generate(): string
    {
        $code = '';
        $max = strlen(self::ALPHABET) - 1;
        for ($i = 0; $i < self::LENGTH; $i++) {
            $code .= self::ALPHABET[random_int(0, $max)];
        }
        return $code;
    }
}
