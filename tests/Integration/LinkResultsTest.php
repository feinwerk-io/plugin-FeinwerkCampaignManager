<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures\LinkTrafficFixture;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * Numbers per saved link (getLinkResults) on the archived reports of LinkTrafficFixture (see its hand count): exact by
 * link ID with Marketing Campaigns Reporting, otherwise by campaign and keyword or by campaign, shared between links.
 *
 * @group FeinwerkCampaignManager
 */
class LinkResultsTest extends IntegrationTestCase
{
    /** @var LinkTrafficFixture */
    public static $fixture = null;

    private const S = LinkTrafficFixture::SITE;

    public function provideContainerConfig()
    {
        return ['Piwik\\Access' => new FakeAccess()];
    }

    public function setUp(): void
    {
        parent::setUp();
        FakeAccess::$superUser = true;
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
        Fixture::loadAllTranslations();
    }

    public function tearDown(): void
    {
        Fixture::resetTranslations();
        parent::tearDown();
    }

    private static function api(): API
    {
        return API::getInstance();
    }

    /** a saved link without a link ID (the API would generate one while Marketing Campaigns Reporting is active) */
    private static function plainLink(string $campaign, string $source, string $keyword = ''): int
    {
        static $n = 0;
        $n++;
        return (new LinkDao())->insert([
            'idsite' => self::S, 'fingerprint' => sha1('plain' . $n), 'target_url' => LinkTrafficFixture::BASE . '/',
            'url' => LinkTrafficFixture::BASE . '/?utm_campaign=' . rawurlencode($campaign) . '&n=' . $n, 'parameter_set' => 'utm',
            'campaign' => $campaign, 'source' => $source, 'medium' => '', 'keyword' => $keyword, 'content' => '',
            'campaign_id' => '', 'campaign_group' => '', 'placement' => '', 'campaign_id_generated' => 0,
            'start_date' => null, 'end_date' => null, 'note' => null, 'created_by' => 'superUserLogin',
            'created_at' => '2026-11-01 00:00:00', 'updated_by' => 'superUserLogin', 'updated_at' => '2026-11-01 00:00:00',
            'archived_at' => null,
        ]);
    }

    private static function byLink(array $results): array
    {
        return array_column($results, null, 'idLink');
    }

    public function test_numbersPerLinkByIdKeywordAndCampaign(): void
    {
        $nl = self::api()->addLink(self::S, LinkTrafficFixture::BASE . '/', 'Herbst', 'utm', 'newsletter', 'email', 'Banner', '', 'NL-1')['link']['idLink'];
        $so = self::api()->addLink(self::S, LinkTrafficFixture::BASE . '/', 'herbst', 'utm', 'social', '', '', '', 'so-2')['link']['idLink'];
        $print = self::plainLink('herbst', 'print');
        $banner = self::plainLink('Herbst', 'display', 'banner');
        $partnerA = self::plainLink('partner', 'a');
        $partnerB = self::plainLink('Partner', 'b');

        $results = self::byLink(self::api()->getLinkResults(self::S, 'month', '2026-11-01'));
        $this->assertCount(6, $results);

        $this->assertSame(['basis' => 'link_id', 'sharedWith' => 1, 'visits' => 1, 'conversions' => 0], self::pick($results[$nl]));
        $this->assertSame(['basis' => 'link_id', 'sharedWith' => 1, 'visits' => 2, 'conversions' => 1], self::pick($results[$so]));
        $this->assertEqualsWithDelta(12.5, $results[$so]['revenue'], 0.001);
        // without a link ID: the campaign's row (every herbst visit), and the keyword's row under it; those rows also
        // count the links with an ID or a keyword of the same campaign
        $this->assertSame(['basis' => 'campaign', 'sharedWith' => 4, 'visits' => 3, 'conversions' => 1], self::pick($results[$print]));
        $this->assertSame(['basis' => 'campaign_keyword', 'sharedWith' => 2, 'visits' => 1, 'conversions' => 0], self::pick($results[$banner]));
        // two links of the same campaign share its row
        $this->assertSame(['basis' => 'campaign', 'sharedWith' => 2, 'visits' => 1, 'conversions' => 0], self::pick($results[$partnerA]));
        $this->assertSame(['basis' => 'campaign', 'sharedWith' => 2, 'visits' => 1, 'conversions' => 0], self::pick($results[$partnerB]));
    }

    public function test_followsTheListPageAndPeriod(): void
    {
        $so = self::api()->addLink(self::S, LinkTrafficFixture::BASE . '/', 'herbst', 'utm', 'social', '', '', '', 'so-2')['link']['idLink'];
        self::plainLink('partner', 'a');

        $one = self::api()->getLinkResults(self::S, 'day', '2026-11-07', '', 'active', '', 100, 0, $so);
        $this->assertCount(1, $one);
        $this->assertSame(1, $one[0]['visits']);
        $this->assertSame([], self::api()->getLinkResults(self::S, 'month', '2026-11-01', '', 'active', '', 100, 0, 999));
        $this->assertCount(1, self::api()->getLinkResults(self::S, 'month', '2026-11-01', '', 'active', 'partner'));
        $october = self::byLink(self::api()->getLinkResults(self::S, 'month', '2026-10-01'));
        $this->assertSame(0, $october[$so]['visits']);
    }

    public function test_badPeriodAndStatusAnswer400(): void
    {
        foreach ([['hour', '2026-11-01', 'active', 'period'], ['month', 'yesterday-ish', 'active', 'date'], ['month', '2026-11-01', 'deleted', 'status']] as [$period, $date, $status, $name]) {
            try {
                self::api()->getLinkResults(self::S, $period, $date, '', $status);
                $this->fail('no error for ' . $name);
            } catch (InvalidInputException $e) {
                $this->assertSame(400, $e->getCode());
                $this->assertStringContainsString($name, $e->getMessage());
            }
        }
    }

    public function test_anInvalidRangeIs400(): void
    {
        try {
            self::api()->getLinkResults(self::S, 'range', '2026-13-01,foo');
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString('period', $e->getMessage());
        }
    }

    /** this plugin's pages call with force_api_session=1: HTTP 200 with the message, so Matomo's Ajax keeps the text */
    public function test_ownPagesGetTheMessageWithoutAnErrorStatus(): void
    {
        $_GET['force_api_session'] = '1';
        try {
            self::api()->getLinkResults(self::S, 'hour', '2026-11-01');
            $this->fail('error expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(0, $e->getCode());
            $this->assertStringContainsString('period', $e->getMessage());
        } finally {
            unset($_GET['force_api_session']);
        }
    }

    private static function pick(array $result): array
    {
        return ['basis' => $result['basis'], 'sharedWith' => $result['sharedWith'], 'visits' => $result['visits'], 'conversions' => $result['conversions']];
    }
}

LinkResultsTest::$fixture = new LinkTrafficFixture();
