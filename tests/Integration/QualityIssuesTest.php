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
use Piwik\Plugins\FeinwerkCampaignManager\Dao\CampaignDao;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures\VariantTrafficFixture;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The Datenqualität page (getQualityIssues) on the archived reports of VariantTrafficFixture (see its hand count).
 *
 * @group FeinwerkCampaignManager
 */
class QualityIssuesTest extends IntegrationTestCase
{
    /** @var VariantTrafficFixture */
    public static $fixture = null;

    private const S = VariantTrafficFixture::SITE;

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
        Db::query('TRUNCATE TABLE ' . CampaignDao::tableName());
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

    public function test_variantsAndValuesWithoutASavedLink(): void
    {
        // the rarer spelling has the saved links: that one is suggested
        self::api()->addLink(self::S, VariantTrafficFixture::BASE . '/', 'newsletter_november', 'utm', 'newsletter', 'email');
        self::api()->addLink(self::S, VariantTrafficFixture::BASE . '/', 'newsletter_november', 'utm', 'newsletter', 'social');
        self::api()->addCampaign(self::S, 'winter');

        $issues = self::api()->getQualityIssues(self::S, 'month', '2026-11-01');

        $this->assertCount(1, $issues['variants']);
        $group = $issues['variants'][0];
        $this->assertSame('newsletter_november', $group['suggested']);
        $this->assertSame(4, $group['visits']);
        $this->assertSame(
            [['newsletter_november', 1, 2], ['newsletter-november', 2, 0], ['newsleter-november', 1, 0]],
            array_map(static fn(array $v): array => [$v['value'], $v['visits'], $v['savedLinks']], $group['values'])
        );
        // partner has neither a saved link nor details; winter has details; the variants without links count too
        $this->assertSame(['newsletter-november', 'newsleter-november', 'partner'], array_column($issues['unexplained'], 'value'));
        $this->assertSame(['variants' => 1, 'unexplained' => 3, 'unexplainedVisits' => 4, 'campaignVisits' => 6], $issues['counts']);
    }

    public function test_anotherPeriodHasNothing(): void
    {
        $issues = self::api()->getQualityIssues(self::S, 'month', '2026-10-01');
        $this->assertSame(['variants' => [], 'unexplained' => [], 'counts' => ['variants' => 0, 'unexplained' => 0, 'unexplainedVisits' => 0, 'campaignVisits' => 0]], $issues);
    }

    public function test_aBadPeriodIs400(): void
    {
        try {
            self::api()->getQualityIssues(self::S, 'quarter', '2026-11-01');
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString('period', $e->getMessage());
        }
    }
}

QualityIssuesTest::$fixture = new VariantTrafficFixture();
