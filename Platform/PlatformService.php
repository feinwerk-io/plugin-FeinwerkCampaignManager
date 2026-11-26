<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

use Piwik\Cache;
use Piwik\Plugins\SitesManager\Model as SitesModel;

/**
 * The connection to Feinwerk Campaigns: connect start and return, status, disconnect. Nothing here calls the platform
 * before a connection exists (the standalone mode talks to nobody).
 */
class PlatformService
{
    /** /status is asked at most every 5 minutes per connection and language */
    public const STATUS_TTL = 300;
    /** after a failed /status (unreachable, switched off internet) the next try waits this long; blocked: an hour */
    public const FAILED_TTL = 60;

    public function __construct(private Store $store, private Client $client)
    {
    }

    /**
     * The fields of the connect start and where they go. Stores state and verifier for the return (one start at a
     * time). The Matomo URL is the address the super user is on, so the return finds their session.
     *
     * @return array{action: string, fields: list<array{0: string, 1: string}>, browser: string, matomoUrl: string}
     *         browser: the value for the starting browser's cookie (Store::BROWSER_COOKIE)
     * @throws \InvalidArgumentException when the Matomo URL cannot be used
     */
    public function connectStart(string $currentUrl, string $login, string $name, string $email, string $lang, int $now): array
    {
        $matomoUrl = ConnectRequest::normaliseMatomoUrl($currentUrl);
        if ($matomoUrl === null) {
            throw new \InvalidArgumentException('matomo_url');
        }
        $state = Pkce::state();
        $verifier = Pkce::verifier();
        // the browser that starts keeps this value in a cookie, the pending start only its hash: a return without the
        // Matomo session is kept only in that browser (Store::attachCode)
        $browser = Pkce::state();
        $this->store->putPending([
            'state' => $state,
            'verifier' => $verifier,
            'redirectUri' => ConnectRequest::redirectUri($matomoUrl),
            'matomoUrl' => $matomoUrl,
            'login' => $login,
            'createdAt' => $now,
            'browserHash' => hash('sha256', $browser),
        ]);

        return [
            'action' => PlatformConfig::connectUrl(),
            'fields' => ConnectRequest::fields($matomoUrl, $state, Pkce::challenge($verifier), $lang, $name, $email, $this->sites()),
            'browser' => $browser,
            'matomoUrl' => $matomoUrl,
        ];
    }

    /**
     * The return from the platform. Answers what happened: connected, denied (the person refused), expired (no
     * matching start: too old, used already, another login or browser), failed (the exchange did not work; the
     * PlatformError's code in $error).
     *
     * @return array{result: string, error: string, workspace: string}
     */
    public function connectReturn(string $state, string $code, string $error, string $login, int $now, string $nowDatetime): array
    {
        $pending = $this->store->takePending($state, $login, $now);
        if ($pending === null) {
            return ['result' => 'expired', 'error' => '', 'workspace' => ''];
        }
        if ($error !== '' || $code === '') {
            return ['result' => $error === 'access_denied' ? 'denied' : 'failed', 'error' => $error, 'workspace' => ''];
        }
        return $this->exchange($pending, $code, $login, $nowDatetime);
    }

    /**
     * Finishes a return whose code was kept while nobody was signed in (Store::attachCode), once the super user who
     * started is signed in. Null when there is nothing to finish for this login.
     *
     * @return array{result: string, error: string, workspace: string}|null
     */
    public function resumeReturn(string $login, int $now, string $nowDatetime): ?array
    {
        $pending = $this->store->takePendingWithCode($login, $now);
        return $pending === null ? null : $this->exchange($pending, (string) $pending['code'], $login, $nowDatetime);
    }

    /**
     * @param array{verifier: string, redirectUri: string, matomoUrl: string} $pending
     * @return array{result: string, error: string, workspace: string}
     */
    private function exchange(array $pending, string $code, string $login, string $nowDatetime): array
    {
        try {
            $token = $this->client->token($code, $pending['verifier'], $pending['redirectUri'], $pending['matomoUrl']);
        } catch (PlatformError $e) {
            return ['result' => 'failed', 'error' => $e->error, 'workspace' => ''];
        }
        $previous = $this->store->connection();
        $connection = new ConnectionState(
            $token['access_token'],
            $token['workspace']['id'],
            $token['workspace']['name'],
            $token['connection_id'],
            $pending['matomoUrl'],
            $login,
            $nowDatetime,
            'unknown',
            $nowDatetime
        );
        $this->store->saveConnection($connection);
        // a connection to another workspace before: revoke its token on the platform (best effort)
        if ($previous !== null && $previous->token !== $connection->token) {
            try {
                $this->client->disconnect($previous->token);
            } catch (PlatformError $e) {
                // the local token is replaced anyway
            }
        }
        $this->clearCache($connection);
        $this->status('en', $nowDatetime);

        return ['result' => 'connected', 'error' => '', 'workspace' => $connection->workspaceName];
    }

    /** Revokes the token on the platform (best effort) and removes it here in any case. */
    public function disconnect(): void
    {
        $connection = $this->store->connection();
        if ($connection !== null) {
            try {
                $this->client->disconnect($connection->token);
            } catch (PlatformError $e) {
                // gone locally all the same; the platform's own list lets people remove it there
            }
        }
        $this->store->removeConnection();
        $this->clearCache($connection);
    }

    /**
     * The connection as the API and the pages show it. Asks the platform's /status at most every STATUS_TTL seconds;
     * a revoked token or a blocked organisation is stored, so Connection::isConnected() follows without a call.
     *
     * @return array{mode: string, state: string, reason: string, workspace: ?array{id: string, name: string},
     *               person: ?array{name: string, role: string}, trial: ?array{endsAt: string, daysLeft: int},
     *               canBuy: bool, links: array{app: ?string, buy: ?string}, features: array{shortLinks: bool,
     *               qrCodes: bool}, checkedAt: string}
     */
    public function status(string $lang, string $nowDatetime): array
    {
        $out = [
            'mode' => 'standalone', 'state' => 'none', 'reason' => 'not_connected', 'workspace' => null, 'person' => null,
            'trial' => null, 'canBuy' => false, 'links' => ['app' => null, 'buy' => null],
            'features' => ['shortLinks' => false, 'qrCodes' => false], 'checkedAt' => '',
        ];
        if (!PlatformConfig::enabled()) {
            return ['mode' => 'disabled', 'reason' => 'platform_disabled'] + $out;
        }
        $connection = $this->store->connection();
        if ($connection === null) {
            return $out;
        }
        $out['mode'] = 'connected';
        $out['workspace'] = ['id' => $connection->workspaceId, 'name' => $connection->workspaceName];
        $cache = Cache::getLazyCache();
        $key = self::statusKey($connection, $lang);
        // a revoked token or a lost access stays so until someone connects again: no call for it
        if ($connection->state === 'lost') {
            return ['state' => 'lost', 'reason' => 'connection_lost'] + $out;
        }
        // a failed answer is remembered for a while, so pages never wait on an unreachable platform one by one
        $failed = $cache->fetch($key . '_failed');
        if (is_string($failed) && $failed !== '') {
            return ['state' => $connection->state, 'reason' => $failed] + $out;
        }
        $status = $cache->fetch($key);
        if (!is_array($status)) {
            try {
                $status = $this->client->status($connection->token, $lang);
                $status['_checkedAt'] = $nowDatetime;
                $cache->save($key, $status, self::STATUS_TTL);
                $connection = $this->remember($connection, ConnectionState::fromStatus($status), $nowDatetime);
            } catch (PlatformError $e) {
                if ($e->connectionLost()) {
                    $connection = $this->remember($connection, 'lost', $nowDatetime);
                } elseif ($e->error === 'blocked') {
                    $connection = $this->remember($connection, 'blocked', $nowDatetime);
                }
                $out['state'] = $connection->state;
                $out['reason'] = match (true) {
                    $connection->state === 'lost' => $e->error === 'access_lost' ? 'access_lost' : 'connection_lost',
                    $connection->state === 'blocked' => 'blocked',
                    default => $e->error === 'internet_disabled' ? 'internet_disabled' : 'unreachable',
                };
                if ($connection->state !== 'lost') {
                    $cache->save($key . '_failed', $out['reason'], $out['reason'] === 'blocked' ? 3600 : self::FAILED_TTL);
                }
                return $out;
            }
        }
        $out['state'] = $connection->state;
        $out['reason'] = match ($connection->state) {
            'trial', 'active', 'unknown' => '',
            'expired' => 'trial_ended',
            default => $connection->state,
        };
        $works = $connection->works();
        $features = is_array($status['features'] ?? null) ? $status['features'] : [];
        $out['features'] = [
            'shortLinks' => $works && !empty($features['short_links']),
            'qrCodes' => $works && !empty($features['dynamic_qr']),
        ];
        if (is_array($status['person'] ?? null)) {
            $out['person'] = ['name' => (string) ($status['person']['name'] ?? ''), 'role' => (string) ($status['person']['role'] ?? '')];
        }
        if (is_array($status['workspace'] ?? null) && ($status['workspace']['name'] ?? '') !== '') {
            $out['workspace']['name'] = (string) $status['workspace']['name'];
        }
        if (is_array($status['trial'] ?? null)) {
            $out['trial'] = ['endsAt' => (string) ($status['trial']['ends_at'] ?? ''), 'daysLeft' => (int) ($status['trial']['days_left'] ?? 0)];
        }
        $out['canBuy'] = !empty($status['can_buy']);
        $links = is_array($status['links'] ?? null) ? $status['links'] : [];
        $out['links'] = [
            'app' => self::platformLink($links['app'] ?? null),
            'buy' => $out['canBuy'] ? self::platformLink($links['buy'] ?? null) : null,
        ];
        $out['checkedAt'] = (string) ($status['_checkedAt'] ?? '');

        return $out;
    }

    /**
     * The connection when platform features can be used now; otherwise a PlatformError naming why (not_connected,
     * platform_disabled, or the stored state: expired, lost, blocked).
     *
     * @throws PlatformError
     */
    public function working(): ConnectionState
    {
        if (!PlatformConfig::enabled()) {
            throw new PlatformError('platform_disabled', 0);
        }
        $connection = $this->store->connection();
        if ($connection === null) {
            throw new PlatformError('not_connected', 0);
        }
        if (!$connection->works()) {
            throw new PlatformError($connection->state === 'expired' ? 'trial_ended' : $connection->state, 0);
        }
        return $connection;
    }

    /**
     * The workspace website of a Matomo site (CampaignsApp's rule of 2026-11-26, from its /websites code): first the
     * website that reads from this Matomo (this_matomo) with this site id; else one whose domains contain the site's
     * host and that is not tied to another site of this Matomo, preferring the one that carries this site id (a
     * website created at consent carries it with this_matomo false); null when none fits (the platform keeps one
     * website per domain, so a second Matomo site with the same address may map to nothing).
     *
     * @param list<string> $siteUrls the site's main and alias URLs
     * @return array{id: string, name: string, url: string, match: string}|null match: site (by site id) or domain
     */
    public function website(int $idSite, array $siteUrls, string $lang): ?array
    {
        $connection = $this->working();
        $websites = $this->cached($connection, 'websites_' . $lang, 600, fn() => $this->client->websites($connection->token, $lang));

        return self::mapWebsite(array_values(array_filter($websites, 'is_array')), $idSite, $siteUrls);
    }

    /**
     * The mapping of website() without the platform call, for tests.
     *
     * @param list<array> $websites rows of GET /websites
     * @param list<string> $siteUrls
     * @return array{id: string, name: string, url: string, match: string}|null
     */
    public static function mapWebsite(array $websites, int $idSite, array $siteUrls): ?array
    {
        $siteId = static fn(array $w): int => (int) ($w['matomo_site_id'] ?? 0);
        foreach ($websites as $w) {
            if (!empty($w['this_matomo']) && $siteId($w) === $idSite) {
                return self::websiteOut($w, 'site');
            }
        }
        $hosts = [];
        foreach ($siteUrls as $url) {
            $host = strtolower((string) parse_url((string) $url, PHP_URL_HOST));
            if ($host !== '') {
                $hosts[] = (string) preg_replace('/^www\./', '', $host);
            }
        }
        $candidates = [];
        foreach ($websites as $w) {
            if (!empty($w['this_matomo']) && $siteId($w) > 0) {
                continue; // tied to another site of this Matomo
            }
            foreach ((array) ($w['domains'] ?? []) as $domain) {
                if (in_array(preg_replace('/^www\./', '', strtolower((string) $domain)), $hosts, true)) {
                    $candidates[] = $w;
                    break;
                }
            }
        }
        foreach ($candidates as $w) {
            if ($siteId($w) === $idSite) {
                return self::websiteOut($w, 'domain');
            }
        }
        return $candidates !== [] ? self::websiteOut($candidates[0], 'domain') : null;
    }

    /** the workspace's naming convention (cached 10 minutes) */
    public function convention(string $lang): array
    {
        $connection = $this->working();
        return $this->cached($connection, 'convention_' . $lang, 600, fn() => $this->client->convention($connection->token, $lang));
    }

    /** pages of 100 the campaign picker reads at most */
    public const CAMPAIGN_PAGES = 5;

    /**
     * The campaigns of one workspace website, page by page (next_cursor) until $limit are found or CAMPAIGN_PAGES are
     * read. The platform filters by website_id (since 2026-11-26); the local filter stays, so an older platform answer
     * with every campaign of the workspace is narrowed here too.
     *
     * @return list<array<string, mixed>>
     */
    public function campaignsOfWebsite(string $lang, string $query, string $websiteId, int $limit): array
    {
        $connection = $this->working();
        $found = [];
        $cursor = '';
        for ($page = 0; $page < self::CAMPAIGN_PAGES; $page++) {
            $answer = $this->guarded($connection, fn() => $this->client->campaigns($connection->token, $lang, $query, '', 100, $cursor, $websiteId));
            foreach ((array) ($answer['data'] ?? []) as $campaign) {
                if (is_array($campaign) && in_array($websiteId, array_map('strval', (array) ($campaign['website_ids'] ?? [])), true)) {
                    $found[] = $campaign;
                }
            }
            $cursor = is_string($answer['next_cursor'] ?? null) ? $answer['next_cursor'] : '';
            if (count($found) >= $limit || $cursor === '') {
                break;
            }
        }
        return array_slice($found, 0, $limit);
    }

    /**
     * Creates a campaign draft for the website (§4 POST /campaigns). The same name and parameter again within 24 hours
     * replays the first answer (Idempotency-Key); the same parameter later answers existed.
     *
     * @return array{campaign: array, existed: bool}
     */
    public function createCampaign(string $lang, string $websiteId, string $name, string $parameter, string $startsOn, string $endsOn): array
    {
        $connection = $this->working();
        $body = [
            'name' => $name,
            'parameter' => $parameter !== '' ? $parameter : null,
            'starts_on' => $startsOn !== '' ? $startsOn : null,
            'ends_on' => $endsOn !== '' ? $endsOn : null,
            'website_ids' => [$websiteId],
        ];
        $answer = $this->guarded($connection, fn() => $this->client->createCampaign($connection->token, $lang, $body, self::idempotencyKey('campaign', $body)));
        return ['campaign' => is_array($answer['campaign'] ?? null) ? $answer['campaign'] : [], 'existed' => !empty($answer['existed'])];
    }

    /** builds and checks a link without saving (§4 POST /links/preview) */
    public function previewLink(string $lang, array $body): array
    {
        $connection = $this->working();
        return $this->guarded($connection, fn() => $this->client->previewLink($connection->token, $lang, $body));
    }

    /**
     * Creates the link in the workspace (§4 POST /links); the same body again within 24 hours replays the first answer.
     *
     * @return array{link: array, existed: bool}
     */
    public function createLink(string $lang, array $body): array
    {
        $connection = $this->working();
        $answer = $this->guarded($connection, fn() => $this->client->createLink($connection->token, $lang, $body, self::idempotencyKey('link', $body)));
        if (!is_array($answer['link'] ?? null)) {
            throw new PlatformError(PlatformError::BAD_ANSWER, 200);
        }
        return ['link' => $answer['link'], 'existed' => !empty($answer['existed'])];
    }

    /** @return array{body: string, contentType: string} the QR code file of a platform link */
    public function qr(string $platformLinkId, string $format): array
    {
        $connection = $this->working();
        return $this->guarded($connection, fn() => $this->client->qr($connection->token, $platformLinkId, $format));
    }

    /**
     * A key per request body: the same body within 24 hours replays the platform's first answer (contract §3), so a
     * double click or a retry after a timeout never creates two campaigns or links.
     */
    private static function idempotencyKey(string $kind, array $body): string
    {
        return 'fwcm-' . $kind . '-' . substr(hash('sha256', (string) json_encode($body)), 0, 40);
    }

    /**
     * @param callable(): array $call
     * @return array
     */
    private function guarded(ConnectionState $connection, callable $call): array
    {
        try {
            return $call();
        } catch (PlatformError $e) {
            if ($e->connectionLost()) {
                $this->remember($connection, 'lost', \Piwik\Date::now()->getDatetime());
            } elseif ($e->error === 'blocked') {
                $this->remember($connection, 'blocked', \Piwik\Date::now()->getDatetime());
            }
            throw $e;
        }
    }

    /** @return array{id: string, name: string, url: string, match: string} */
    private static function websiteOut(array $w, string $match): array
    {
        return ['id' => (string) ($w['id'] ?? ''), 'name' => (string) ($w['name'] ?? ''), 'url' => (string) ($w['url'] ?? ''), 'match' => $match];
    }

    /**
     * @param callable(): array $load
     * @return array
     */
    private function cached(ConnectionState $connection, string $what, int $ttl, callable $load): array
    {
        $cache = Cache::getLazyCache();
        $key = 'FeinwerkCampaignManager_' . $what . '_' . substr(sha1($connection->token), 0, 16);
        $value = $cache->fetch($key);
        if (is_array($value)) {
            return $value;
        }
        try {
            $value = $load();
        } catch (PlatformError $e) {
            if ($e->connectionLost()) {
                $this->remember($connection, 'lost', \Piwik\Date::now()->getDatetime());
            } elseif ($e->error === 'blocked') {
                $this->remember($connection, 'blocked', \Piwik\Date::now()->getDatetime());
            }
            throw $e;
        }
        $cache->save($key, $value, $ttl);
        return $value;
    }

    /** only links into the platform itself are passed on to the browser */
    private static function platformLink($url): ?string
    {
        return PlatformConfig::appLink($url);
    }

    private function remember(ConnectionState $connection, string $state, string $at): ConnectionState
    {
        if ($state === $connection->state) {
            return $connection;
        }
        $connection = $connection->withState($state, $at);
        try {
            // only over the same connection: a reconnect or a disconnect during this request's call wins
            $this->store->saveConnectionIfToken($connection);
        } catch (\Throwable $e) {
            // shown from memory this time
        }
        return $connection;
    }

    private static function statusKey(ConnectionState $connection, string $lang): string
    {
        return 'FeinwerkCampaignManager_status_' . substr(sha1($connection->token), 0, 16) . '_' . ($lang === 'de' ? 'de' : 'en');
    }

    /** only this plugin's entries, never Matomo's whole cache */
    private function clearCache(?ConnectionState $connection): void
    {
        if ($connection === null) {
            return;
        }
        try {
            $suffix = '_' . substr(sha1($connection->token), 0, 16);
            foreach (['de', 'en'] as $lang) {
                Cache::getLazyCache()->delete(self::statusKey($connection, $lang));
                Cache::getLazyCache()->delete(self::statusKey($connection, $lang) . '_failed');
                Cache::getLazyCache()->delete('FeinwerkCampaignManager_websites_' . $lang . $suffix);
                Cache::getLazyCache()->delete('FeinwerkCampaignManager_convention_' . $lang . $suffix);
            }
        } catch (\Throwable $e) {
            // the cache runs out on its own
        }
    }

    /**
     * The websites of this Matomo for the prefill: id, name and every known URL (main URL first), from two queries.
     *
     * @return list<array{idsite: int, name: string, urls: list<string>}>
     */
    private function sites(): array
    {
        $model = new SitesModel();
        $sites = [];
        foreach ($model->getAllSites() as $site) {
            $sites[(int) $site['idsite']] = [
                'idsite' => (int) $site['idsite'],
                'name' => html_entity_decode((string) $site['name'], ENT_QUOTES, 'UTF-8'),
                'urls' => [(string) $site['main_url']],
            ];
        }
        foreach ($model->getAllKnownUrlsForAllSites() as $row) {
            $id = (int) $row['idsite'];
            if (isset($sites[$id]) && !in_array((string) $row['url'], $sites[$id]['urls'], true)) {
                $sites[$id]['urls'][] = (string) $row['url'];
            }
        }
        ksort($sites);

        return array_values($sites);
    }
}
