<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * Checks a target URL and builds the campaign link from it.
 */
final class LinkUrl
{
    /** longest target URL, in bytes */
    public const MAX_LENGTH = 2000;

    /**
     * What is wrong with a target URL, as a stable code, or null when it can be used.
     *
     * @return string|null required, too_long, invalid_url, unsupported_scheme or null
     */
    public static function problemOf(string $target): ?string
    {
        if (trim($target) === '') {
            return 'required';
        }
        if (strlen($target) > self::MAX_LENGTH) {
            return 'too_long';
        }
        if (preg_match('/[\s\x00-\x1F\x7F]/u', $target)) {
            return 'invalid_url';
        }
        if (!preg_match('/^([a-z][a-z0-9+.\-]*):/i', $target, $scheme)) {
            return 'invalid_url';
        }
        if (!in_array(strtolower($scheme[1]), ['http', 'https'], true)) {
            return 'unsupported_scheme';
        }
        $parts = parse_url($target);
        if (!is_array($parts) || empty($parts['host'])) {
            return 'invalid_url';
        }
        return null;
    }

    /**
     * The link: the target with the campaign parameters of the non-empty values appended to its query, before its
     * fragment. Query and fragment of the target are kept as they are.
     *
     * @param array<string, string> $values field => value; empty values are left out
     */
    public static function build(string $target, ParameterSet $set, array $values): string
    {
        $fragment = '';
        $hash = strpos($target, '#');
        if ($hash !== false) {
            $fragment = substr($target, $hash);
            $target = substr($target, 0, $hash);
        }

        $pairs = [];
        foreach (Fields::URL_ORDER as $field) {
            $value = (string) ($values[$field] ?? '');
            if ($value !== '') {
                $pairs[] = rawurlencode($set->nameOf($field)) . '=' . rawurlencode($value);
            }
        }
        if ($pairs === []) {
            return $target . $fragment;
        }

        if (strpos($target, '?') === false) {
            $separator = '?';
        } elseif (substr($target, -1) === '?' || substr($target, -1) === '&') {
            $separator = '';
        } else {
            $separator = '&';
        }
        return $target . $separator . implode('&', $pairs) . $fragment;
    }

    /**
     * The campaign parameter names the target already carries in its query.
     *
     * @param string[] $names the names to look for (lower case)
     * @return string[] the names found, lower case, in the order of $names
     */
    public static function campaignParametersIn(string $target, array $names): array
    {
        $query = (string) parse_url($target, PHP_URL_QUERY);
        if ($query === '') {
            return [];
        }
        $present = [];
        foreach (explode('&', $query) as $pair) {
            $name = strtolower(rawurldecode(explode('=', $pair, 2)[0]));
            if ($name !== '') {
                $present[$name] = true;
            }
        }
        $found = [];
        foreach ($names as $name) {
            if (isset($present[strtolower($name)])) {
                $found[] = strtolower($name);
            }
        }
        return $found;
    }
}
