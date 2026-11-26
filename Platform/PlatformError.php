<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

/**
 * A platform answer that is no success (contract §3), with the contract's error code: unauthorized, access_lost,
 * forbidden, trial_ended, blocked, not_found, workspace_ended, idempotency_conflict, validation, rate_limited,
 * invalid_grant, and two of our own: unreachable (no answer, timeout, TLS) and bad_answer (no JSON). The platform's
 * message (in the requested language) and the validation fields come along; the token never does.
 */
final class PlatformError extends \RuntimeException
{
    public const UNREACHABLE = 'unreachable';
    public const BAD_ANSWER = 'bad_answer';

    /**
     * @param array<string, list<string>> $fields validation messages per field (422 only)
     */
    public function __construct(
        public readonly string $error,
        public readonly int $status,
        string $message = '',
        public readonly array $fields = [],
        public readonly int $retryAfter = 0
    ) {
        parent::__construct($message !== '' ? $message : $error);
    }

    /** the connection no longer works and must be made again (revoked or unknown token, approving person lost access) */
    public function connectionLost(): bool
    {
        return $this->error === 'unauthorized' || $this->error === 'access_lost';
    }
}
