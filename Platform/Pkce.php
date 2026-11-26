<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

/**
 * PKCE (RFC 7636, method S256) and the opaque state of the connect flow. No Matomo code.
 */
final class Pkce
{
    /** a code verifier: 64 characters of [A-Za-z0-9-_] (RFC 7636: 43 to 128) */
    public static function verifier(): string
    {
        return self::base64url(random_bytes(48));
    }

    /** base64url of the SHA-256 of the verifier, 43 characters */
    public static function challenge(string $verifier): string
    {
        return self::base64url(hash('sha256', $verifier, true));
    }

    /** the state echoed back by the platform: 43 characters (the contract allows 16 to 200) */
    public static function state(): string
    {
        return self::base64url(random_bytes(32));
    }

    private static function base64url(string $bytes): string
    {
        return rtrim(strtr(base64_encode($bytes), '+/', '-_'), '=');
    }
}
