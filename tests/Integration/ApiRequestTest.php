<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\API\Request;
use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The API through Matomo's request path (API proxy), as the UI and AI clients call it: raw values arrive unchanged,
 * omitted parameters keep their defaults, and bad numbers get an error naming the parameter.
 *
 * @group FeinwerkCampaignManager
 */
class ApiRequestTest extends IntegrationTestCase
{
    public function provideContainerConfig()
    {
        return ['Piwik\\Access' => new FakeAccess()];
    }

    public function setUp(): void
    {
        parent::setUp();
        FakeAccess::$superUser = true;
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Lindenholz', 'https://www.lindenholz.example');
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
        Fixture::loadAllTranslations();
    }

    public function tearDown(): void
    {
        Fixture::resetTranslations();
        parent::tearDown();
    }

    private static function call(string $method, array $params)
    {
        return Request::processRequest('FeinwerkCampaignManager.' . $method, $params + ['format' => 'original'], []);
    }

    public function test_addLink_keepsAmpersandsAndQuotesRaw(): void
    {
        $result = self::call('addLink', [
            'idSite' => '1',
            'targetUrl' => 'https://www.lindenholz.example/p?a=1&b=2',
            'campaign' => 'Küche & "Bad"',
            'source' => "o'reilly",
        ]);

        $link = $result['link'];
        $this->assertSame('https://www.lindenholz.example/p?a=1&b=2', $link['targetUrl']);
        $this->assertSame('küche & "bad"', $link['values']['campaign']);
        $this->assertSame("o'reilly", $link['values']['source']);
        $this->assertSame(
            'https://www.lindenholz.example/p?a=1&b=2&utm_source=o%27reilly&utm_campaign=k%C3%BCche%20%26%20%22bad%22',
            $link['url']
        );
    }

    public function test_updateLink_omittedParametersKeepTheirValues_emptyOnesClear(): void
    {
        $id = self::call('addLink', ['idSite' => 1, 'targetUrl' => 'https://www.lindenholz.example/', 'campaign' => 'herbst', 'source' => 'newsletter', 'medium' => 'email'])['link']['idLink'];

        $kept = self::call('updateLink', ['idSite' => 1, 'idLink' => $id, 'medium' => 'social'])['link'];
        $this->assertSame(['herbst', 'newsletter', 'social'], [$kept['values']['campaign'], $kept['values']['source'], $kept['values']['medium']]);

        $cleared = self::call('updateLink', ['idSite' => 1, 'idLink' => $id, 'source' => ''])['link'];
        $this->assertSame('', $cleared['values']['source']);
        $this->assertSame('social', $cleared['values']['medium']);
    }

    /**
     * @dataProvider badNumbers
     */
    public function test_badNumbers_areA400NamingTheParameter(string $method, array $params, string $param): void
    {
        // with format=original the response builder rethrows a plain exception with the message; the class and its
        // HTTP code 400 are covered by the direct calls in LinkApiTest
        try {
            self::call($method, $params);
            $this->fail('error expected');
        } catch (\Exception $e) {
            $this->assertStringContainsString('Parameter ' . $param, $e->getMessage());
        }
    }

    public static function badNumbers(): array
    {
        return [
            'limit text' => ['getLinks', ['idSite' => 1, 'limit' => 'abc'], 'limit'],
            'offset negative' => ['getLinks', ['idSite' => 1, 'offset' => '-5'], 'offset'],
            'idSite text' => ['getLinks', ['idSite' => 'abc'], 'idSite'],
            'idSite zero' => ['getTemplates', ['idSite' => '0'], 'idSite'],
            'idLink text' => ['getLink', ['idSite' => 1, 'idLink' => '7x'], 'idLink'],
            'idLink missing' => ['archiveLink', ['idSite' => 1], 'idLink'],
        ];
    }

    /** Matomo 6 no longer trims request parameters: the API trims the words it compares or passes on */
    public function test_spacesAroundWordsAreIgnored(): void
    {
        $added = self::call('addLink', [
            'idSite' => '1', 'targetUrl' => ' https://www.lindenholz.example/herbst ', 'campaign' => ' Herbst ', 'parameterSet' => ' utm ',
            'source' => ' newsletter ',
        ]);
        $this->assertSame('https://www.lindenholz.example/herbst?utm_source=newsletter&utm_campaign=herbst', $added['link']['url']);
        $this->assertSame(1, self::call('getLinks', ['idSite' => '1', 'status' => ' active '])['total']);
        $this->assertSame([], self::call('getSuggestions', ['idSite' => '1', 'field' => ' campaign ', 'query' => 'zzz']));
        $campaigns = self::call('getCampaigns', ['idSite' => '1', 'period' => ' month ', 'date' => ' 2026-11-01 ', 'status' => ' active ']);
        $this->assertContains('herbst', array_column($campaigns, 'campaign'));
        $this->assertSame('herbst', self::call('getCampaign', ['idSite' => '1', 'campaign' => ' herbst ', 'period' => ' day ', 'date' => ' 2026-11-01 '])['campaign']);
    }

    public function test_missingTargetUrl_isA400(): void
    {
        $this->expectExceptionMessage('Parameter targetUrl');
        self::call('addLink', ['idSite' => 1, 'campaign' => 'x']);
    }
}
