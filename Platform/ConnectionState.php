<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

/**
 * The stored connection (Option fw_campaignmanager_platform) as values. Pure.
 *
 * state: the last known answer of the platform: trial, active, expired (trial ended unpurchased: reads only), lost
 * (token revoked or unknown, or the approving person lost access: connect again), blocked (organisation blocked),
 * unknown (connected, no /status answer yet). Platform features work only in trial and active; otherwise the plugin
 * falls back to its standalone mode and keeps its local data (design section 6).
 */
final class ConnectionState
{
    public const STATES = ['trial', 'active', 'expired', 'lost', 'blocked', 'unknown'];
    public const WORKING = ['trial', 'active', 'unknown'];

    public function __construct(
        public readonly string $token,
        public readonly string $workspaceId,
        public readonly string $workspaceName,
        public readonly string $connectionId,
        public readonly string $matomoUrl,
        public readonly string $connectedBy,
        public readonly string $connectedAt,
        public readonly string $state,
        public readonly string $stateAt
    ) {
    }

    /** @param mixed $stored the decoded option, anything */
    public static function fromStored($stored): ?self
    {
        if (!is_array($stored) || !is_string($stored['token'] ?? null) || $stored['token'] === '') {
            return null;
        }
        $state = in_array($stored['state'] ?? null, self::STATES, true) ? $stored['state'] : 'unknown';

        return new self(
            $stored['token'],
            (string) ($stored['workspaceId'] ?? ''),
            (string) ($stored['workspaceName'] ?? ''),
            (string) ($stored['connectionId'] ?? ''),
            (string) ($stored['matomoUrl'] ?? ''),
            (string) ($stored['connectedBy'] ?? ''),
            (string) ($stored['connectedAt'] ?? ''),
            $state,
            (string) ($stored['stateAt'] ?? '')
        );
    }

    /** @return array<string, string> */
    public function toStored(): array
    {
        return [
            'token' => $this->token, 'workspaceId' => $this->workspaceId, 'workspaceName' => $this->workspaceName,
            'connectionId' => $this->connectionId, 'matomoUrl' => $this->matomoUrl, 'connectedBy' => $this->connectedBy,
            'connectedAt' => $this->connectedAt, 'state' => $this->state, 'stateAt' => $this->stateAt,
        ];
    }

    public function withState(string $state, string $at): self
    {
        $state = in_array($state, self::STATES, true) ? $state : 'unknown';

        return new self($this->token, $this->workspaceId, $this->workspaceName, $this->connectionId, $this->matomoUrl,
            $this->connectedBy, $this->connectedAt, $state, $at);
    }

    /** platform features can be used (trial or active, or connected with no answer yet) */
    public function works(): bool
    {
        return in_array($this->state, self::WORKING, true);
    }

    /** the state from a /status answer (contract §4): trial, active or expired */
    public static function fromStatus(array $status): string
    {
        $state = $status['state'] ?? '';
        return in_array($state, ['trial', 'active', 'expired'], true) ? $state : 'unknown';
    }
}
