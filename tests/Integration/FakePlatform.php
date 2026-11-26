<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Plugins\FeinwerkCampaignManager\Platform\Transport;

/** A scripted platform: answers in order, records every call, and fails when called without a prepared answer. */
class FakePlatform extends Transport
{
    /** @var list<array{0: string, 1: string, 2: list<string>, 3: ?string}> */
    public array $calls = [];
    /** @var list<array{0: int, 1: ?array, 2: array<string, string>, 3: ?string}> */
    private array $answers = [];

    public function reset(): void
    {
        $this->calls = [];
        $this->answers = [];
    }

    /** @param array<string, string> $headers */
    public function answer(int $status, ?array $json, array $headers = [], ?string $raw = null): void
    {
        $this->answers[] = [$status, $json, $headers, $raw];
    }

    public function send(string $method, string $url, array $headers, ?string $body): array
    {
        $this->calls[] = [$method, $url, $headers, $body];
        if ($this->answers === []) {
            throw new \LogicException("unexpected call to the platform: $method $url");
        }
        [$status, $json, $headers, $raw] = array_shift($this->answers);

        return [
            'status' => $status,
            'headers' => $headers,
            'body' => $raw ?? ($json === null ? '' : (string) json_encode($json)),
            'error' => $status === 0 ? 'timeout' : '',
        ];
    }
}
