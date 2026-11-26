<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Platform;

/**
 * Reads one platform answer (status, headers, body) into data or a PlatformError (contract §3). Pure.
 */
final class Answer
{
    /**
     * @param array<string, string|string[]> $headers
     * @return array<mixed> the decoded JSON body (an empty array for 204)
     * @throws PlatformError
     */
    public static function read(int $status, array $headers, string $body, string $transportError = ''): array
    {
        if ($status === 0) {
            throw new PlatformError(PlatformError::UNREACHABLE, 0, $transportError);
        }
        if ($status === 204) {
            return [];
        }
        $data = json_decode($body, true);
        if ($status >= 200 && $status < 300) {
            if (!is_array($data)) {
                throw new PlatformError(PlatformError::BAD_ANSWER, $status);
            }
            return $data;
        }
        $data = is_array($data) ? $data : [];
        // without a body (Matomo's socket and fopen clients drop it for 4xx) the code may come as a header
        $error = is_string($data['error'] ?? null) && $data['error'] !== '' ? $data['error']
            : (self::header($headers, 'x-feinwerk-error') ?? self::byStatus($status));
        $fields = [];
        foreach (is_array($data['fields'] ?? null) ? $data['fields'] : [] as $field => $messages) {
            $fields[(string) $field] = array_values(array_map('strval', (array) $messages));
        }

        throw new PlatformError(
            $error,
            $status,
            is_string($data['message'] ?? null) ? $data['message'] : '',
            $fields,
            self::retryAfter($headers)
        );
    }

    private static function byStatus(int $status): string
    {
        return match (true) {
            $status === 401 => 'unauthorized',
            $status === 403 => 'forbidden',
            $status === 404 => 'not_found',
            $status === 409 => 'conflict',
            $status === 422 => 'validation',
            $status === 429 => 'rate_limited',
            $status >= 500 => 'server_error',
            default => 'bad_request',
        };
    }

    /** @param array<string, string|string[]> $headers */
    private static function retryAfter(array $headers): int
    {
        $value = self::header($headers, 'retry-after');
        if ($value === null) {
            return 0;
        }
        return ctype_digit($value) ? min(3600, (int) $value) : 60;
    }

    /**
     * One header's value, whatever case the server used; a code-like header only as [a-z0-9_], at most 64 characters.
     *
     * @param array<string, string|string[]> $headers
     */
    private static function header(array $headers, string $name): ?string
    {
        foreach ($headers as $key => $value) {
            if (strtolower((string) $key) === $name) {
                $value = trim(is_array($value) ? (string) reset($value) : (string) $value);
                if ($name === 'x-feinwerk-error') {
                    return preg_match('/^[a-z0-9_]{1,64}$/', $value) ? $value : null;
                }
                return $value;
            }
        }
        return null;
    }
}
