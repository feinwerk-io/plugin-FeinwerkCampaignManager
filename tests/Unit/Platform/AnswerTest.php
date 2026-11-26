<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Platform;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Answer;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\ConnectionState;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformError;

/** Platform answers (contract §3) and the stored connection state */
class AnswerTest extends TestCase
{
    private static function error(int $status, string $body, array $headers = []): PlatformError
    {
        try {
            Answer::read($status, $headers, $body);
        } catch (PlatformError $e) {
            return $e;
        }
        self::fail('PlatformError expected');
    }

    public function test_successAndNoContent(): void
    {
        $this->assertSame(['state' => 'trial'], Answer::read(200, [], '{"state":"trial"}'));
        $this->assertSame([], Answer::read(204, [], ''));
    }

    public function test_errorsCarryTheContractsCode(): void
    {
        $lost = self::error(401, '{"error":"access_lost","message":"Zugang verloren"}');
        $this->assertSame('access_lost', $lost->error);
        $this->assertTrue($lost->connectionLost());
        $this->assertSame('Zugang verloren', $lost->getMessage());
        $this->assertTrue(self::error(401, '')->connectionLost(), 'no body: unauthorized');
        $this->assertSame('blocked', self::error(403, '{"error":"blocked"}')->error);
        $this->assertFalse(self::error(403, '{"error":"blocked"}')->connectionLost());

        $validation = self::error(422, '{"error":"validation","message":"x","fields":{"target_url":["fehlt"]}}');
        $this->assertSame(['target_url' => ['fehlt']], $validation->fields);

        $limited = self::error(429, '{"error":"rate_limited"}', ['Retry-After' => '30']);
        $this->assertSame(30, $limited->retryAfter);
        $this->assertSame(60, self::error(429, '', ['retry-after' => 'Wed, 26 Nov 2026 10:00:00 GMT'])->retryAfter);
    }

    /** Matomo's socket and fopen clients drop 4xx bodies: the code then comes from X-Feinwerk-Error, else the status */
    public function test_theErrorHeaderStandsInForAMissingBody(): void
    {
        $this->assertSame('access_lost', self::error(401, '', ['x-feinwerk-error' => 'access_lost'])->error);
        $this->assertSame('trial_ended', self::error(403, '', ['X-Feinwerk-Error' => ['trial_ended']])->error);
        $this->assertSame('blocked', self::error(403, '{"error":"blocked"}', ['X-Feinwerk-Error' => 'other'])->error, 'the body wins');
        $this->assertSame('forbidden', self::error(403, '', ['X-Feinwerk-Error' => '<script>'])->error, 'codes only');
    }

    public function test_noAnswerAndNoJson(): void
    {
        $this->assertSame(PlatformError::UNREACHABLE, self::error(0, '')->error);
        $this->assertSame(PlatformError::BAD_ANSWER, self::error(200, '<html>')->error);
        $this->assertSame('server_error', self::error(502, '<html>')->error);
    }

    public function test_theStoredStateDecidesWhetherFeaturesWork(): void
    {
        $this->assertNull(ConnectionState::fromStored(null));
        $this->assertNull(ConnectionState::fromStored(['token' => '']));
        $c = ConnectionState::fromStored(['token' => 'fwcp_x', 'workspaceName' => 'Online', 'state' => 'trial']);
        $this->assertTrue($c->works());
        $this->assertSame('fwcp_x', ConnectionState::fromStored($c->toStored())->token);
        foreach (['expired', 'lost', 'blocked'] as $state) {
            $this->assertFalse($c->withState($state, '2026-11-25 10:00:00')->works(), $state);
        }
        $this->assertTrue($c->withState('nonsense', '')->works(), 'an unknown state counts as not asked yet');
        $this->assertSame('expired', ConnectionState::fromStatus(['state' => 'expired']));
        $this->assertSame('unknown', ConnectionState::fromStatus([]));
    }
}
