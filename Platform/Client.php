<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

use Piwik\SettingsPiwik;

/**
 * The platform's plugin API, phase 1 (contract /root/fw-handoffs/campaigns-plugin-api-v1-contract.md §2 to §4). Every
 * call goes through Transport, server side; the token never leaves this class towards the browser. Each method answers
 * the decoded JSON or throws PlatformError.
 */
class Client
{
    public function __construct(private Transport $transport)
    {
    }

    /**
     * Exchanges the connect code for the connection's token (contract §2).
     *
     * @return array{access_token: string, workspace: array{id: string, name: string}, connection_id: string}
     */
    public function token(string $code, string $verifier, string $redirectUri, string $matomoUrl): array
    {
        // as form fields: Matomo's socket and fopen clients add a form Content-Type to every POST, and the platform reads
        // the token request's fields by Content-Type (its other endpoints decode JSON whatever the header says)
        $answer = $this->call('POST', 'token', null, 'en', [
            'code' => $code, 'code_verifier' => $verifier, 'redirect_uri' => $redirectUri, 'matomo_url' => $matomoUrl,
        ], '', true);
        if (!is_string($answer['access_token'] ?? null) || $answer['access_token'] === '') {
            throw new PlatformError(PlatformError::BAD_ANSWER, 200);
        }
        return [
            'access_token' => $answer['access_token'],
            'workspace' => [
                'id' => (string) ($answer['workspace']['id'] ?? ''),
                'name' => (string) ($answer['workspace']['name'] ?? ''),
            ],
            'connection_id' => (string) ($answer['connection_id'] ?? ''),
        ];
    }

    /** the connection's state, workspace, person, trial and links (contract §4 GET /status) */
    public function status(string $token, string $lang): array
    {
        return $this->call('GET', 'status', $token, $lang);
    }

    /** the workspace's websites with the Matomo site id they read from (contract §4 GET /websites) */
    public function websites(string $token, string $lang): array
    {
        return $this->call('GET', 'websites', $token, $lang);
    }

    /** the workspace's naming convention: parameter names, fields with value lists, channels, ad networks (§4) */
    public function convention(string $token, string $lang): array
    {
        return $this->call('GET', 'convention', $token, $lang);
    }

    /**
     * The workspace's campaigns (§4 with §10: q searches name and parameter; archived ones only with status=archived).
     *
     * @return array{data: list<array>, next_cursor: ?string}
     */
    public function campaigns(
        string $token,
        string $lang,
        string $query,
        string $status,
        int $limit,
        string $cursor = '',
        string $websiteId = ''
    ): array {
        // website_id (contract §14): campaigns linked to that workspace website; an unknown id matches nothing
        $params = array_filter(
            ['q' => $query, 'status' => $status, 'limit' => (string) $limit, 'cursor' => $cursor, 'website_id' => $websiteId],
            static fn($v) => $v !== ''
        );
        return $this->call('GET', 'campaigns?' . http_build_query($params, '', '&', PHP_QUERY_RFC3986), $token, $lang);
    }

    /** creates a campaign draft (§4 POST /campaigns), the same parameter twice returns the existing one */
    public function createCampaign(string $token, string $lang, array $body, string $idempotencyKey): array
    {
        return $this->call('POST', 'campaigns', $token, $lang, $body, $idempotencyKey);
    }

    /** builds and checks a link without saving it (§4 POST /links/preview) */
    public function previewLink(string $token, string $lang, array $body): array
    {
        return $this->call('POST', 'links/preview', $token, $lang, $body);
    }

    /** creates a link, with short link and dynamic QR code when asked (§4 POST /links); the same link twice: existed */
    public function createLink(string $token, string $lang, array $body, string $idempotencyKey): array
    {
        return $this->call('POST', 'links', $token, $lang, $body, $idempotencyKey);
    }

    /**
     * The QR code file of a link with a dynamic QR code (§4 GET /links/{id}/qr).
     *
     * @return array{body: string, contentType: string}
     */
    public function qr(string $token, string $linkId, string $format): array
    {
        if (!self::internetEnabled()) {
            throw new PlatformError('internet_disabled', 0);
        }
        $result = $this->transport->send('GET', PlatformConfig::apiUrl('links/' . rawurlencode($linkId) . '/qr?format=' . rawurlencode($format)), [
            'Authorization: Bearer ' . $token,
        ], null);
        if ($result['status'] !== 200) {
            Answer::read($result['status'], $result['headers'], $result['body'], $result['error']);
            throw new PlatformError(PlatformError::BAD_ANSWER, $result['status']);
        }
        $type = '';
        foreach ($result['headers'] as $name => $value) {
            if (strtolower((string) $name) === 'content-type') {
                $type = is_array($value) ? (string) reset($value) : (string) $value;
            }
        }
        return ['body' => $result['body'], 'contentType' => $type];
    }

    /** revokes the token on the platform (contract §4 DELETE /connection) */
    public function disconnect(string $token): void
    {
        $this->call('DELETE', 'connection', $token, 'en');
    }

    /**
     * @param array<string, mixed>|null $json
     * @return array<mixed>
     */
    private function call(
        string $method,
        string $path,
        ?string $token,
        string $lang,
        ?array $json = null,
        string $idempotencyKey = '',
        bool $form = false
    ): array {
        if (!self::internetEnabled()) {
            throw new PlatformError('internet_disabled', 0);
        }
        $headers = ['Accept: application/json', 'Accept-Language: ' . ($lang === 'de' ? 'de' : 'en')];
        if ($token !== null) {
            $headers[] = 'Authorization: Bearer ' . $token;
        }
        if ($idempotencyKey !== '') {
            $headers[] = 'Idempotency-Key: ' . $idempotencyKey;
        }
        $body = null;
        if ($json !== null && $form) {
            $headers[] = 'Content-Type: application/x-www-form-urlencoded';
            $body = http_build_query($json, '', '&', PHP_QUERY_RFC3986);
        } elseif ($json !== null) {
            $headers[] = 'Content-Type: application/json';
            $body = (string) json_encode($json, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
        }
        $result = $this->transport->send($method, PlatformConfig::apiUrl($path), $headers, $body);

        return Answer::read($result['status'], $result['headers'], $result['body'], $result['error']);
    }

    private static function internetEnabled(): bool
    {
        try {
            return SettingsPiwik::isInternetEnabled();
        } catch (\Throwable $e) {
            return true;
        }
    }
}
