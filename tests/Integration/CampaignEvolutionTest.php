<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\API\Request;
use Piwik\Container\StaticContainer;
use Piwik\DataTable;
use Piwik\Plugins\FeinwerkCampaignManager\Model\InstanceContext;
use Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures\LinkTrafficFixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The campaign page's evolution graph with Marketing Campaigns Reporting active (LinkTrafficFixture loads it): that
 * plugin takes Referrers.getCampaigns out of Matomo's report list, so the graph has to use its campaign name report
 * (found on a customer's Matomo: "Requested report Referrers.getCampaigns ... not found in the list of available
 * reports", HTTP 500 on every campaign page).
 *
 * @group FeinwerkCampaignManager
 */
class CampaignEvolutionTest extends IntegrationTestCase
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
    }

    /** @return array{label: string, reportData: DataTable\Map, metadata: array} Matomo's row evolution */
    private static function rowEvolution(string $apiMethod)
    {
        [$module, $action] = explode('.', $apiMethod);
        return Request::processRequest('API.getRowEvolution', [
            'idSite' => self::S, 'period' => 'day', 'date' => '2026-11-01,2026-11-10', 'apiModule' => $module,
            'apiAction' => $action, 'label' => 'herbst', 'format' => 'original',
        ], []);
    }

    public function test_withMarketingCampaignsReportingTheGraphUsesItsCampaignNameReport(): void
    {
        $method = StaticContainer::get(InstanceContext::class)->evolutionApiMethod();
        $this->assertSame('MarketingCampaignsReporting.getName', $method);

        $evolution = self::rowEvolution($method);
        $this->assertIsArray($evolution);
        $visits = 0;
        foreach ($evolution['reportData']->getDataTables() as $day) {
            foreach ($day->getRows() as $row) {
                $visits += (int) $row->getColumn('nb_visits');
            }
        }
        $this->assertGreaterThan(0, $visits, 'the campaign herbst has visits in the fixture');
    }

    /** the cause of the fix: Matomo's own campaign report is no longer in the report list */
    public function test_matomosOwnCampaignReportIsGoneWithMarketingCampaignsReporting(): void
    {
        try {
            self::rowEvolution('Referrers.getCampaigns');
            $this->fail('Referrers.getCampaigns should be missing from the report list');
        } catch (\Exception $e) {
            $this->assertStringContainsString('not found in the list of available reports', $e->getMessage());
        }
    }
}

CampaignEvolutionTest::$fixture = new LinkTrafficFixture();
