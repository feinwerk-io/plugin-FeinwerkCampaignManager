<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * Cleans campaign values before they are saved or compared.
 */
final class ValueNormalizer
{
    /**
     * Trims, collapses every run of white space into one space and drops control characters; lower case on request
     * (core Matomo stores campaign names and keywords in lower case anyway).
     */
    public static function normalize(string $value, bool $lowercase): string
    {
        $value = (string) preg_replace('/[\p{Cc}\p{Cf}](?<![\t\n\r])/u', '', $value);
        $value = trim((string) preg_replace('/[\s\p{Z}]+/u', ' ', $value));
        return $lowercase ? mb_strtolower($value, 'UTF-8') : $value;
    }

    /**
     * The key two spellings share when they differ only in case or separators (spaces, hyphens, underscores, dots).
     */
    public static function fold(string $value): string
    {
        return (string) preg_replace('/[\s\p{Z}\-_.]+/u', '', mb_strtolower($value, 'UTF-8'));
    }
}
