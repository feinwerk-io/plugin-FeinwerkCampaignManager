<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Container\StaticContainer;
use Piwik\Option;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Connection;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Store;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Transport;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The connection to Feinwerk Campaigns against a scripted platform (contract §1 to §4): nothing is sent before a
 * connection exists, the return accepts only the stored state of the same login once, the token goes only to the
 * platform, and lost or blocked connections fall back to the standalone mode.
 *
 * @group FeinwerkCampaignManager
 */
class PlatformConnectionTest extends IntegrationTestCase
{
    /** @var FakePlatform */
    public static $platform;

    public function provideContainerConfig()
    {
        // one instance for the whole class: the container may be built more than once per test
        self::$platform = self::$platform ?? new FakePlatform();

        return ['Piwik\\Access' => new FakeAccess(), Transport::class => self::$platform];
    }

    public function setUp(): void
    {
        parent::setUp();
        FakeAccess::$superUser = true;
        FakeAccess::$identity = 'superUserLogin';
        PlatformConfig::$enabledOverride = null;
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Lindenholz', 'https://www.lindenholz.example');
        (new FeinwerkCampaignManager())->install();
        Option::delete(Store::CONNECTION);
        Option::delete(Store::PENDING);
        \Piwik\Cache::getLazyCache()->flushAll();
        self::$platform->reset();
    }

    public function tearDown(): void
    {
        PlatformConfig::$enabledOverride = null;
        parent::tearDown();
    }

    private static function service(): PlatformService
    {
        return StaticContainer::get(PlatformService::class);
    }

    /** the cookie value of the browser that started last */
    private static string $browser = '';

    /** @return array<string, string> the start's fields by name (the last value of repeated names) */
    private static function start(string $login = 'superUserLogin'): array
    {
        $start = self::service()->connectStart('https://matomo.example.com/', $login, '', 'lena@example.com', 'de', 1000);
        self::$browser = $start['browser'];
        $fields = [];
        foreach ($start['fields'] as [$name, $value]) {
            $fields[$name] = $value;
        }
        return $fields;
    }

    private static function connect(): void
    {
        $fields = self::start();
        self::$platform->answer(200, ['access_token' => 'fwcp_secret', 'workspace' => ['id' => 'W1', 'name' => 'Online-Marketing'], 'connection_id' => 'C1']);
        self::$platform->answer(200, ['state' => 'trial', 'workspace' => ['id' => 'W1', 'name' => 'Online-Marketing'],
            'person' => ['name' => 'Lena Lindner', 'role' => 'admin'], 'can_buy' => true,
            'trial' => ['ends_at' => '2026-12-20T19:52:00Z', 'days_left' => 25],
            'links' => ['app' => PlatformConfig::DEFAULT_URL . '/w/W1', 'buy' => PlatformConfig::DEFAULT_URL . '/w/W1?buy=1', 'evil' => 'https://x.example'],
            'features' => ['short_links' => true, 'dynamic_qr' => true]]);
        $result = self::service()->connectReturn($fields['state'], 'code-1', '', 'superUserLogin', 1100, '2026-11-25 10:00:00');
        self::assertSame('connected', $result['result']);
    }

    public function test_standaloneSendsNothing(): void
    {
        $status = API::getInstance()->getConnectionStatus();
        $this->assertSame('standalone', $status['mode']);
        $this->assertTrue($status['canConnect']);
        $this->assertFalse(Connection::isConnected());
        API::getInstance()->getLinks(1);
        API::getInstance()->previewLink(1, 'https://www.lindenholz.example/', 'herbst');
        $this->assertSame([], self::$platform->calls, 'no outbound call before a connection exists');
    }

    public function test_theStartStoresStateAndVerifierAndSendsNothing(): void
    {
        $fields = self::start();
        $this->assertSame('https://matomo.example.com/index.php?module=FeinwerkCampaignManager&action=connectReturn', $fields['redirect_uri']);
        $this->assertSame('https://matomo.example.com', $fields['matomo_url']);
        $this->assertSame('S256', $fields['code_challenge_method']);
        $this->assertSame('lena@example.com', $fields['email']);
        $this->assertSame('Lindenholz', $fields['sites[0][name]']);
        $this->assertSame([], self::$platform->calls);
    }

    public function test_connectingExchangesTheCodeAndStoresTheConnection(): void
    {
        self::connect();
        [$method, $url, $headers, $body] = self::$platform->calls[0];
        $this->assertSame(['POST', PlatformConfig::DEFAULT_URL . '/api/plugin/v1/token'], [$method, $url]);
        $this->assertContains('Content-Type: application/x-www-form-urlencoded', $headers, 'form fields, also through socket and fopen');
        parse_str((string) $body, $sent);
        $this->assertSame('code-1', $sent['code']);
        $this->assertSame('https://matomo.example.com/index.php?module=FeinwerkCampaignManager&action=connectReturn', $sent['redirect_uri']);
        $this->assertSame(64, strlen($sent['code_verifier']), 'RFC 7636: 43 to 128 characters');
        $this->assertContains('Authorization: Bearer fwcp_secret', self::$platform->calls[1][2], '/status with the token');

        $this->assertTrue(Connection::isConnected());
        $status = API::getInstance()->getConnectionStatus();
        $this->assertSame(['connected', true, 'trial', ''], [$status['mode'], $status['connected'], $status['state'], $status['reason']]);
        $this->assertSame('Online-Marketing', $status['workspace']['name']);
        $this->assertSame(25, $status['trial']['daysLeft']);
        $this->assertSame(['shortLinks' => true, 'qrCodes' => true], $status['features']);
        $this->assertSame(PlatformConfig::DEFAULT_URL . '/w/W1?buy=1', $status['links']['buy']);
        $this->assertStringNotContainsString('fwcp_secret', (string) json_encode($status), 'the token never leaves the server');
        $this->assertCount(2, self::$platform->calls, 'the status is cached');
    }

    public function test_theReturnTakesOnlyItsOwnStateOnceForTheSameLogin(): void
    {
        $fields = self::start();
        $this->assertSame('expired', self::service()->connectReturn('forged-state-0123456789', 'c', '', 'superUserLogin', 1100, 'now')['result']);
        $fields = self::start();
        $this->assertSame('expired', self::service()->connectReturn($fields['state'], 'c', '', 'someoneElse', 1100, 'now')['result']);
        $fields = self::start();
        $this->assertSame('expired', self::service()->connectReturn($fields['state'], 'c', '', 'superUserLogin', 1000 + Store::PENDING_SECONDS + 1, 'now')['result']);
        $fields = self::start();
        $this->assertSame('denied', self::service()->connectReturn($fields['state'], '', 'access_denied', 'superUserLogin', 1100, 'now')['result']);
        $this->assertSame('expired', self::service()->connectReturn($fields['state'], 'c', '', 'superUserLogin', 1100, 'now')['result'], 'used once');
        $this->assertSame([], self::$platform->calls, 'no exchange for a refused return');
        $this->assertFalse(Connection::isConnected());
    }

    /** a return in the starting browser without its Matomo session keeps its code until the same super user is signed in */
    public function test_aLoggedOutReturnIsFinishedAfterTheSignIn(): void
    {
        $fields = self::start();
        $store = new Store();
        $this->assertSame(43, strlen(self::$browser));
        $this->assertFalse($store->attachCode('forged-state-0123456789', 'code-x', self::$browser, 1100), 'only with the pending state');
        $this->assertTrue($store->attachCode($fields['state'], 'code-9', self::$browser, 1100));
        $this->assertNull(self::service()->resumeReturn('someoneElse', 1200, 'now'), 'another login finishes nothing');

        self::$platform->answer(200, ['access_token' => 'fwcp_resumed', 'workspace' => ['id' => 'W1', 'name' => 'Online'], 'connection_id' => 'C2']);
        self::$platform->answer(200, ['state' => 'active']);
        $result = self::service()->resumeReturn('superUserLogin', 1200, '2026-11-26 10:00:00');
        $this->assertSame('connected', $result['result']);
        parse_str((string) self::$platform->calls[0][3], $sent);
        $this->assertSame('code-9', $sent['code']);
        $this->assertTrue(Connection::isConnected());
        $this->assertNull(self::service()->resumeReturn('superUserLogin', 1200, 'now'), 'used once');
    }

    public function test_aKeptCodeRunsOutWithThePlatformsTenMinutes(): void
    {
        $fields = self::start();
        $this->assertTrue((new Store())->attachCode($fields['state'], 'code-old', self::$browser, 1100));
        $this->assertNull(self::service()->resumeReturn('superUserLogin', 1100 + Store::CODE_SECONDS + 1, 'now'));
        $this->assertSame([], self::$platform->calls);
    }

    /** the state alone is not enough: a return in another browser (someone else's consent) keeps nothing */
    public function test_aReturnInAnotherBrowserKeepsNothing(): void
    {
        $fields = self::start();
        $store = new Store();
        $this->assertFalse($store->attachCode($fields['state'], 'code-x', '', 1100), 'no cookie');
        $this->assertFalse($store->attachCode($fields['state'], 'code-x', 'another-browser-0123456789abcdefghijklmnopq', 1100));
        $this->assertNull(self::service()->resumeReturn('superUserLogin', 1200, 'now'));
        $this->assertSame([], self::$platform->calls);
        $this->assertFalse(Connection::isConnected());
        $this->assertNotSame(self::$browser, $fields['state'], 'the cookie value is not the state');
        $this->assertNotContains(self::$browser, array_values($fields), 'the cookie value never goes to the platform');
    }

    public function test_aRefusedExchangeStoresNothing(): void
    {
        $fields = self::start();
        self::$platform->answer(400, ['error' => 'invalid_grant']);
        $result = self::service()->connectReturn($fields['state'], 'old-code', '', 'superUserLogin', 1100, 'now');
        $this->assertSame(['failed', 'invalid_grant'], [$result['result'], $result['error']]);
        $this->assertFalse(Connection::isConnected());
    }

    public function test_aLostOrBlockedConnectionFallsBackToStandalone(): void
    {
        self::connect();
        \Piwik\Cache::getLazyCache()->flushAll();
        self::$platform->answer(401, ['error' => 'access_lost', 'message' => 'Zugang verloren']);
        $status = API::getInstance()->getConnectionStatus();
        $this->assertSame(['lost', 'access_lost', false], [$status['state'], $status['reason'], $status['connected']]);
        $this->assertFalse(Connection::isConnected(), 'read locally, without a call');
    }

    public function test_anUnreachablePlatformKeepsTheConnection(): void
    {
        self::connect();
        \Piwik\Cache::getLazyCache()->flushAll();
        self::$platform->answer(0, null);
        $status = API::getInstance()->getConnectionStatus();
        $this->assertSame('unreachable', $status['reason']);
        $this->assertTrue(Connection::isConnected(), 'a short outage does not end the connection');
    }

    /** pages never wait on an unreachable platform one by one, and a lost connection is not asked again */
    public function test_failuresAreRememberedAndALostConnectionIsNotAsked(): void
    {
        self::connect();
        \Piwik\Cache::getLazyCache()->flushAll();
        self::$platform->answer(0, null);
        $this->assertSame('unreachable', API::getInstance()->getConnectionStatus()['reason']);
        $calls = count(self::$platform->calls);
        $this->assertSame('unreachable', API::getInstance()->getConnectionStatus()['reason']);
        $this->assertCount($calls, self::$platform->calls, 'the failure is remembered');

        \Piwik\Cache::getLazyCache()->flushAll();
        self::$platform->answer(401, ['error' => 'unauthorized']);
        $this->assertSame('connection_lost', API::getInstance()->getConnectionStatus()['reason']);
        \Piwik\Cache::getLazyCache()->flushAll();
        $calls = count(self::$platform->calls);
        $this->assertSame('connection_lost', API::getInstance()->getConnectionStatus()['reason']);
        $this->assertCount($calls, self::$platform->calls, 'a lost connection is not asked again');
    }

    public function test_disconnectRemovesTheTokenEvenWhenThePlatformDoesNotAnswer(): void
    {
        self::connect();
        self::$platform->answer(0, null);
        $status = API::getInstance()->disconnectPlatform();
        $this->assertSame('DELETE', self::$platform->calls[2][0]);
        $this->assertSame('standalone', $status['mode']);
        $this->assertFalse(Connection::isConnected());
        $this->assertFalse(Option::get(Store::CONNECTION));
    }

    /** a request that waited for the platform never writes its old copy over a reconnect or a disconnect */
    public function test_aLateAnswerNeverOverwritesANewerConnection(): void
    {
        self::connect();
        $store = new Store();
        $old = $store->connection();
        $stored = json_decode((string) Option::get(Store::CONNECTION), true);
        $stored['token'] = 'fwcp_newer';
        Option::set(Store::CONNECTION, (string) json_encode($stored));
        $this->assertFalse($store->saveConnectionIfToken($old->withState('lost', 'now')), 'reconnected meanwhile');
        Option::clearCachedOption(Store::CONNECTION);
        $this->assertSame('fwcp_newer', $store->connection()->token);
        $this->assertNotSame('lost', $store->connection()->state);

        Option::delete(Store::CONNECTION);
        $this->assertFalse($store->saveConnectionIfToken($old->withState('lost', 'now')), 'disconnected meanwhile');
        Option::clearCachedOption(Store::CONNECTION);
        $this->assertNull($store->connection());

        $store->saveConnection($old);
        $this->assertTrue($store->saveConnectionIfToken($old->withState('lost', 'now')));
        $this->assertSame('lost', $store->connection()->state);
    }

    /** uninstalling leaves no working token behind: revoked on the platform, removed here with any pending start */
    public function test_uninstallRevokesAndRemovesTheConnection(): void
    {
        self::connect();
        self::start();
        self::$platform->answer(204, null);
        (new \Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager())->uninstall();
        (new \Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager())->install();
        $last = end(self::$platform->calls);
        $this->assertSame('DELETE', $last[0]);
        $this->assertContains('Authorization: Bearer fwcp_secret', $last[2]);
        $this->assertFalse(Option::get(Store::CONNECTION));
        $this->assertFalse(Option::get(Store::PENDING));
    }

    /** what the connection adds: promotion, so admins only and off with promotions = 0 (decision 1 of 2026-11-23) */
    public function test_theBenefitsAreForAdminsWhilePromotionsAreOn(): void
    {
        $status = API::getInstance()->getConnectionStatus();
        $this->assertTrue($status['promote'], 'standalone super user');
        $this->assertStringContainsString('mtm_campaign=plugin-promo', (string) $status['moreUrl']);
        $this->assertStringEndsWith('#campaign-manager', (string) $status['moreUrl'], 'the anchor after the query');
        $this->assertNull($status['inUse']);

        \Piwik\Config::getInstance()->FeinwerkCampaignManager = ['promotions' => 0];
        try {
            $this->assertFalse(API::getInstance()->getConnectionStatus()['promote'], 'promotions = 0');
            $this->assertNull(API::getInstance()->getConnectionStatus()['moreUrl']);
        } finally {
            \Piwik\Config::getInstance()->FeinwerkCampaignManager = [];
        }

        FakeAccess::$superUser = false;
        FakeAccess::$idSitesView = [1];
        try {
            $this->assertFalse(API::getInstance()->getConnectionStatus()['promote'], 'a view user');
        } finally {
            FakeAccess::$superUser = true;
            FakeAccess::$idSitesView = [];
        }

        self::connect();
        $connected = API::getInstance()->getConnectionStatus();
        $this->assertFalse($connected['promote'], 'connected: nothing to promote');
        $this->assertSame(['shortLinks' => 0, 'qrCodes' => 0], $connected['inUse']);
    }

    public function test_platformOffHidesEverything(): void
    {
        self::connect();
        PlatformConfig::$enabledOverride = false;
        $this->assertFalse(Connection::isConnected());
        $status = API::getInstance()->getConnectionStatus();
        $this->assertSame(['disabled', 'platform_disabled', false, null], [$status['mode'], $status['reason'], $status['canConnect'], $status['connectUrl']]);
    }

    public function test_onlySuperUsersConnectOrDisconnect(): void
    {
        FakeAccess::$superUser = false;
        FakeAccess::$idSitesView = [1];
        $status = API::getInstance()->getConnectionStatus();
        $this->assertFalse($status['canConnect']);
        $this->assertNull($status['connectUrl']);
        $this->expectException(\Piwik\NoAccessException::class);
        API::getInstance()->disconnectPlatform();
    }
}
