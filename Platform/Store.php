<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

use Piwik\Option;

/**
 * The connection and the pending connect start, in Matomo options (not in a settings field: the token never comes back
 * through Matomo's settings API or UI). Never throws on read.
 */
class Store
{
    public const CONNECTION = 'fw_campaignmanager_platform';
    public const PENDING = 'fw_campaignmanager_connect';
    /** the platform keeps a connect request 48 hours after a sign-up (contract §1.1), so the return may come that late */
    public const PENDING_SECONDS = 172800;

    public function connection(): ?ConnectionState
    {
        try {
            return ConnectionState::fromStored(json_decode((string) Option::get(self::CONNECTION), true));
        } catch (\Throwable $e) {
            return null;
        }
    }

    public function saveConnection(ConnectionState $connection): void
    {
        Option::set(self::CONNECTION, (string) json_encode($connection->toStored()));
    }

    /**
     * Saves a changed state only while the stored connection still has this token (read fresh, past Matomo's option
     * cache): another request may have reconnected or disconnected while this one waited for the platform. Returns
     * whether it was saved.
     */
    public function saveConnectionIfToken(ConnectionState $connection): bool
    {
        Option::clearCachedOption(self::CONNECTION);
        $stored = $this->connection();
        if ($stored === null || !hash_equals($stored->token, $connection->token)) {
            return false;
        }
        $this->saveConnection($connection);
        return true;
    }

    public function removeConnection(): void
    {
        Option::delete(self::CONNECTION);
    }

    /**
     * One pending start at a time: a new start replaces the older one.
     *
     * @param array{state: string, verifier: string, redirectUri: string, matomoUrl: string, login: string, createdAt: int, browserHash: string} $pending
     */
    public function putPending(array $pending): void
    {
        Option::set(self::PENDING, (string) json_encode($pending));
    }

    /** the platform's code is single use and lives 10 minutes (contract §1.3) */
    public const CODE_SECONDS = 600;

    /** the cookie that carries the starting browser's value (PlatformService::connectStart) */
    public const BROWSER_COOKIE = 'fw_campaignmanager_browser';

    /**
     * Keeps the code of a return that reached the starting browser without its Matomo session (the session expired
     * during the consent): the state proves it belongs to the pending start, the cookie value that it is the browser
     * that started, so no login is needed for this step. A return in any other browser is not kept. The exchange waits
     * until the super user who started is signed in (takePendingWithCode). Returns whether it was kept.
     */
    public function attachCode(string $state, string $code, string $browser, int $now): bool
    {
        try {
            $pending = json_decode((string) Option::get(self::PENDING), true);
        } catch (\Throwable $e) {
            return false;
        }
        if (!is_array($pending) || !is_string($pending['state'] ?? null) || !hash_equals($pending['state'], $state)
            || !is_string($pending['browserHash'] ?? null) || $browser === ''
            || !hash_equals($pending['browserHash'], hash('sha256', $browser))
            || $code === '' || strlen($code) > 512 || $now - (int) ($pending['createdAt'] ?? 0) > self::PENDING_SECONDS
        ) {
            return false;
        }
        $pending['code'] = $code;
        $pending['codeAt'] = $now;
        Option::set(self::PENDING, (string) json_encode($pending));
        return true;
    }

    /**
     * The pending start with a kept code for this login, removed in the same step; null when there is none, it belongs to
     * another login, or the code is older than CODE_SECONDS.
     *
     * @return array{state: string, verifier: string, redirectUri: string, matomoUrl: string, login: string, createdAt: int, code: string, codeAt: int}|null
     */
    public function takePendingWithCode(string $login, int $now): ?array
    {
        try {
            $pending = json_decode((string) Option::get(self::PENDING), true);
        } catch (\Throwable $e) {
            return null;
        }
        if (!is_array($pending) || !is_string($pending['code'] ?? null) || ($pending['login'] ?? null) !== $login) {
            return null;
        }
        Option::delete(self::PENDING);
        return $now - (int) ($pending['codeAt'] ?? 0) > self::CODE_SECONDS ? null : $pending;
    }

    /**
     * The pending start for this state and login, removed in the same step, so a state works once. Null when there is
     * none, the state or the login differ, or it is older than PENDING_SECONDS.
     *
     * @return array{state: string, verifier: string, redirectUri: string, matomoUrl: string, login: string, createdAt: int}|null
     */
    public function takePending(string $state, string $login, int $now): ?array
    {
        try {
            $pending = json_decode((string) Option::get(self::PENDING), true);
        } catch (\Throwable $e) {
            return null;
        }
        if (!is_array($pending) || !is_string($pending['state'] ?? null) || !hash_equals($pending['state'], $state)) {
            return null;
        }
        Option::delete(self::PENDING);
        if (($pending['login'] ?? null) !== $login || $now - (int) ($pending['createdAt'] ?? 0) > self::PENDING_SECONDS) {
            return null;
        }

        return $pending;
    }
}
