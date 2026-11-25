<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetUrlBuilderNote;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;
use Piwik\Widget\WidgetConfig;
use Piwik\Widget\WidgetsList;

/**
 * The line under Matomo's own Campaign URL Builder (decision 7): on that page after Matomo's widget, wide (so Matomo's
 * builder keeps the full width), not offered as a dashboard widget, and its link opens this plugin's link builder for
 * the same website and period.
 *
 * @group FeinwerkCampaignManager
 */
class UrlBuilderNoteTest extends IntegrationTestCase
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
        FakeAccess::$superUser = true;
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Shop', 'https://shop.example', 1, null, null, 'UTC');
        Fixture::loadAllTranslations();
        $this->get = $_GET;
        $_GET['idSite'] = '1';
        $_GET['period'] = 'month';
        $_GET['date'] = '2026-11-01';
    }

    public function tearDown(): void
    {
        $_GET = $this->get;
        Fixture::resetTranslations();
        parent::tearDown();
    }

    public function test_noteFollowsMatomosBuilderOnItsPage(): void
    {
        $orders = [];
        $note = null;
        foreach (WidgetsList::get()->getWidgetConfigs() as $config) {
            if ($config->getSubcategoryId() !== GetUrlBuilderNote::SUBCATEGORY) {
                continue;
            }
            $orders[$config->getModule() . '.' . $config->getAction()] = $config->getOrder();
            if ($config->getModule() === 'FeinwerkCampaignManager') {
                $note = $config;
            }
        }
        $this->assertNotNull($note, 'the note is on the URL builder page');
        $this->assertArrayHasKey('Referrers.getCampaignUrlBuilder', $orders);
        $this->assertGreaterThan($orders['Referrers.getCampaignUrlBuilder'], $note->getOrder());
        $this->assertSame(GetUrlBuilderNote::CATEGORY, $note->getCategoryId());
        $this->assertTrue($note->isWide());
        $this->assertFalse($note->isWidgetizeable());
    }

    public function test_noteIsHiddenWithoutViewAccess(): void
    {
        FakeAccess::$superUser = false;
        FakeAccess::$idSitesView = [];
        $config = new WidgetConfig();
        GetUrlBuilderNote::configure($config);
        $this->assertFalse($config->isEnabled());

        FakeAccess::$idSitesView = [1];
        $config = new WidgetConfig();
        GetUrlBuilderNote::configure($config);
        $this->assertTrue($config->isEnabled());
    }

    public function test_linkOpensTheLinkBuilderForTheSameWebsiteAndPeriod(): void
    {
        $html = (new GetUrlBuilderNote())->render();
        $this->assertStringContainsString('class="card fwcmp-urlbuilder-note"', $html);
        $this->assertSame(1, preg_match('/<a href="([^"]*)"/', $html, $m));
        $this->assertSame(
            'index.php?module=CoreHome&action=index&idSite=1&period=month&date=2026-11-01#?idSite=1&period=month&date=2026-11-01&category=FeinwerkCampaignManager_Campaigns&subcategory=FeinwerkCampaignManager_LinkBuilder',
            html_entity_decode($m[1], ENT_QUOTES | ENT_HTML5)
        );
        $this->assertStringContainsString('Feinwerk Campaign Manager', $html);
    }

    public function test_urlEncodesWhatTheRequestBrings(): void
    {
        $url = GetUrlBuilderNote::builderUrl(3, 'range', '2026-11-01,2026-11-07"><x');
        $this->assertStringNotContainsString('"', $url);
        $this->assertStringNotContainsString('<', $url);
        $this->assertStringContainsString('date=2026-11-01%2C2026-11-07%22%3E%3Cx', $url);
    }
}
