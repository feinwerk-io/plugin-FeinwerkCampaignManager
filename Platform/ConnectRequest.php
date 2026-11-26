<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

/**
 * The fields of the connect start (contract §1.1 with §11): the auto-submitted POST to the platform's /connect/matomo.
 * Pure: the Matomo URL, the person and the websites come in, the form fields go out. No Matomo code.
 */
final class ConnectRequest
{
    public const RETURN_QUERY = '/index.php?module=FeinwerkCampaignManager&action=connectReturn';
    public const MAX_SITES = 100;
    public const MAX_URLS = 20;
    public const MAX_BYTES = 255;
    public const MAX_PREFILL_BYTES = 262144;

    /**
     * The Matomo base URL as the contract wants it: http or https, lower-case host, no trailing slash, no query, no
     * fragment, no index.php. Null for anything else.
     */
    public static function normaliseMatomoUrl(string $url): ?string
    {
        $parts = parse_url(trim($url));
        if (!is_array($parts) || !isset($parts['scheme'], $parts['host'])) {
            return null;
        }
        $scheme = strtolower($parts['scheme']);
        if ($scheme !== 'http' && $scheme !== 'https') {
            return null;
        }
        $host = strtolower($parts['host']);
        if (preg_match('/[^\x20-\x7e]/', $host)) {
            $host = function_exists('idn_to_ascii') ? (string) idn_to_ascii($host, IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46) : '';
            if ($host === '') {
                return null;
            }
        }
        $port = isset($parts['port']) ? ':' . (int) $parts['port'] : '';
        $path = (string) ($parts['path'] ?? '');
        $path = (string) preg_replace('#/index\.php$#', '', $path);
        $path = rtrim($path, '/');

        return $scheme . '://' . $host . $port . $path;
    }

    /** the exact return address (contract §11, §12), built from the normalised Matomo URL */
    public static function redirectUri(string $matomoUrl): string
    {
        return $matomoUrl . self::RETURN_QUERY;
    }

    /**
     * The form fields, in the order they are sent.
     *
     * @param list<array{idsite: int, name: string, urls: list<string>}> $sites the Matomo websites, main URL first
     * @return list<array{0: string, 1: string}> name and value of every field
     */
    public static function fields(
        string $matomoUrl,
        string $state,
        string $challenge,
        string $lang,
        string $name,
        string $email,
        array $sites
    ): array {
        $fields = [
            ['redirect_uri', self::redirectUri($matomoUrl)],
            ['state', $state],
            ['code_challenge', $challenge],
            ['code_challenge_method', 'S256'],
            ['matomo_url', $matomoUrl],
        ];
        if (in_array($lang, ['de', 'en'], true)) {
            $fields[] = ['lang', $lang];
        }
        $prefill = [];
        if (($name = self::cut($name)) !== '') {
            $prefill[] = ['name', $name];
        }
        if (($email = trim($email)) !== '' && strlen($email) <= self::MAX_BYTES && filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $prefill[] = ['email', $email];
        }
        $i = 0;
        foreach (array_slice($sites, 0, self::MAX_SITES) as $site) {
            $siteFields = [
                ["sites[$i][idsite]", (string) (int) $site['idsite']],
                ["sites[$i][name]", self::cut((string) $site['name'])],
            ];
            $urls = 0;
            foreach ($site['urls'] as $url) {
                $ascii = self::asciiUrl((string) $url);
                if ($ascii === null || $urls >= self::MAX_URLS) {
                    continue;
                }
                $siteFields[] = ["sites[$i][urls][]", $ascii];
                $urls++;
            }
            $prefill = array_merge($prefill, $siteFields);
            $i++;
        }
        // the whole prefill at most 256 KB: drop websites from the end until it fits
        while (self::bytes($prefill) > self::MAX_PREFILL_BYTES && $i > 0) {
            $i--;
            $prefill = array_values(array_filter($prefill, static fn(array $f): bool => strpos($f[0], "sites[$i]") !== 0));
        }

        return array_merge($fields, $prefill);
    }

    /** an http(s) URL in ASCII (international domains as punycode), at most 255 bytes, or null to leave it out */
    public static function asciiUrl(string $url): ?string
    {
        $url = trim($url);
        $parts = parse_url($url);
        if (!is_array($parts) || !isset($parts['scheme'], $parts['host']) || !in_array(strtolower($parts['scheme']), ['http', 'https'], true)) {
            return null;
        }
        $host = $parts['host'];
        if (preg_match('/[^\x20-\x7e]/', $host)) {
            if (!function_exists('idn_to_ascii')) {
                return null;
            }
            $ascii = idn_to_ascii($host, IDNA_DEFAULT, INTL_IDNA_VARIANT_UTS46);
            if (!is_string($ascii) || $ascii === '') {
                return null;
            }
            $url = str_replace($host, $ascii, $url);
        }
        if (preg_match('/[^\x21-\x7e]/', $url) || strlen($url) > self::MAX_BYTES) {
            return null;
        }

        return $url;
    }

    /** trimmed and cut to 255 bytes on a character boundary */
    private static function cut(string $value): string
    {
        $value = trim($value);
        if (strlen($value) <= self::MAX_BYTES) {
            return $value;
        }

        return mb_strcut($value, 0, self::MAX_BYTES, 'UTF-8');
    }

    /** @param list<array{0: string, 1: string}> $fields */
    private static function bytes(array $fields): int
    {
        return strlen((string) json_encode($fields, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }
}
