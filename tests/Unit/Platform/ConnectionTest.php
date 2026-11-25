<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Platform;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Connection;

/** The interface other Feinwerk plugins read for the tip line funnel: its name and answers stay stable */
class ConnectionTest extends TestCase
{
    public function test_theStandaloneVersionIsNotConnected(): void
    {
        $this->assertFalse(Connection::isConnected());
    }

    public function test_overviewUrlOpensTheCampaignOverviewOfTheWebsite(): void
    {
        $this->assertSame(
            'index.php?module=CoreHome&action=index&idSite=3&period=month&date=2026-11-01#?idSite=3&period=month&date=2026-11-01&category=FeinwerkCampaignManager_Campaigns&subcategory=FeinwerkCampaignManager_Overview',
            Connection::overviewUrl(3, 'month', '2026-11-01')
        );
    }
}
