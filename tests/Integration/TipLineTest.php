<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Config;
use Piwik\Plugins\FeinwerkCampaignManager\Promo\PromoLine;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetCampaignOverview;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetCampaignPages;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetDataQuality;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetLinkBuilder;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetLinkList;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\WidgetProps;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Widget\Widget;

/**
 * The kit's tip line on the plugin's five pages, with Matomo itself (Promo\PromoLine::current() through
 * Widgets\WidgetProps, which turns any error into "no line"): one translated kit message for super users and admins,
 * none for users with view access only, none when one of the plugin's or the connector's config switches says off, none
 * in embeds.
 *
 * @group FeinwerkCampaignManager
 */
class TipLineTest extends IntegrationTestCase
{
    /** @var array<string, mixed> */
    private $get = [];

    public function provideContainerConfig()
    {
        return ['Piwik\\Access' => new FakeAccess()];
    }

    public function setUp(): void
    {
        parent::setUp();
        Fixture::loadAllTranslations();
        FakeAccess::clearAccess(true);
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Shop', 'https://shop.example');
        $this->get = $_GET;
        $_GET['idSite'] = '1';
        $_GET['period'] = 'month';
        $_GET['date'] = '2026-11-01';
        // both switches on, whatever the test config says
        Config::getInstance()->FeinwerkCampaignManager = [];
        Config::getInstance()->FeinwerkMarketplaceConnector = ['promotions' => '1'];
    }

    public function tearDown(): void
    {
        $_GET = $this->get;
        Config::getInstance()->FeinwerkCampaignManager = [];
        Config::getInstance()->FeinwerkMarketplaceConnector = [];
        Fixture::resetTranslations();
        parent::tearDown();
    }

    /** @return Widget[] */
    private static function pages(): array
    {
        return [new GetCampaignOverview(), new GetLinkBuilder(), new GetLinkList(), new GetDataQuality(), new GetCampaignPages()];
    }

    private static function assertKitLine(?array $promo, string $who): void
    {
        self::assertIsArray($promo, $who);
        self::assertContains($promo['id'], array_keys(PromoLine::MESSAGES), $who);
        self::assertSame('line', $promo['placement']);
        self::assertNotSame('', $promo['url']);
        foreach (['text', 'link'] as $field) {
            self::assertNotSame('', $promo[$field], $field);
            self::assertStringNotContainsString('FeinwerkCampaignManager_', $promo[$field], 'translated ' . $field);
        }
    }

    public function test_super_users_and_admins_get_one_kit_message_on_every_page(): void
    {
        self::assertKitLine(WidgetProps::promo(1), 'super user');
        foreach (self::pages() as $page) {
            $html = html_entity_decode($page->render(), ENT_QUOTES | ENT_HTML5);
            self::assertStringContainsString('promo="{"id":"', $html, get_class($page));
        }

        FakeAccess::clearAccess(false, [1], [1], 'admin');
        self::assertKitLine(WidgetProps::promo(1), 'admin');
    }

    public function test_users_with_view_access_only_get_none(): void
    {
        FakeAccess::clearAccess(false, [], [1], 'viewer');

        self::assertNull(WidgetProps::promo(1));
        foreach (self::pages() as $page) {
            self::assertStringNotContainsString('promo="', html_entity_decode($page->render()), get_class($page));
        }
    }

    public function test_the_config_switches_turn_it_off(): void
    {
        Config::getInstance()->FeinwerkCampaignManager = ['promotions' => '0'];
        self::assertNull(WidgetProps::promo(1), 'promotions = 0 in [FeinwerkCampaignManager]');

        Config::getInstance()->FeinwerkCampaignManager = [];
        Config::getInstance()->FeinwerkMarketplaceConnector = ['promotions' => '0'];
        self::assertNull(WidgetProps::promo(1), 'promotions = 0 in [FeinwerkMarketplaceConnector]');
    }

    public function test_none_in_embeds(): void
    {
        $_GET['module'] = 'Widgetize';
        self::assertNull(WidgetProps::promo(1), 'Widgetize');

        $_GET['module'] = 'CoreHome';
        $_GET['disableLink'] = '1';
        self::assertNull(WidgetProps::promo(1), 'disableLink=1');
    }
}
