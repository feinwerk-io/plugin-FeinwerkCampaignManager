<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

use Piwik\Http;

/**
 * The only way this plugin talks to the outside: Matomo's HTTP client, server side, 5 s, a fixed user agent. Tests
 * replace it (Platform\Transport in the container).
 */
class Transport
{
    private const TIMEOUT = 5;
    public const USER_AGENT = 'Feinwerk-Campaign-Manager/1.0';

    /**
     * @param list<string> $headers
     * @return array{status: int, headers: array<string, string|string[]>, body: string, error: string} status 0 when
     *         there was no answer
     */
    public function send(string $method, string $url, array $headers, ?string $body): array
    {
        // Matomo's client copies an incoming proxy chain (HTTP_VIA) into its Via header: leave it out
        $via = $_SERVER['HTTP_VIA'] ?? null;
        unset($_SERVER['HTTP_VIA']);
        try {
            $result = Http::sendHttpRequestBy(
                Http::getTransportMethod(),
                $url,
                self::TIMEOUT,
                self::USER_AGENT,
                null,
                null,
                0,
                false,
                false,
                false,
                true,
                $method,
                null,
                null,
                $body,
                $headers
            );
        } catch (\Exception $e) {
            return ['status' => 0, 'headers' => [], 'body' => '', 'error' => $e->getMessage()];
        } finally {
            if ($via !== null) {
                $_SERVER['HTTP_VIA'] = $via;
            }
        }
        if (!is_array($result)) {
            return ['status' => 0, 'headers' => [], 'body' => '', 'error' => 'no answer'];
        }

        return [
            'status' => (int) ($result['status'] ?? 0),
            'headers' => is_array($result['headers'] ?? null) ? $result['headers'] : [],
            'body' => (string) ($result['data'] ?? ''),
            'error' => '',
        ];
    }
}
