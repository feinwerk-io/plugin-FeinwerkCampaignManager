<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkBasis;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkShares;

class LinkSharesTest extends TestCase
{
    public function test_aCampaignRowCountsEveryLinkOfTheCampaign(): void
    {
        $shares = new LinkShares([
            ['campaign' => 'Herbst', 'keyword' => 'Banner', 'campaign_id' => 'nl-1'],
            ['campaign' => 'herbst', 'keyword' => '', 'campaign_id' => 'so-2'],
            ['campaign' => 'herbst', 'keyword' => '', 'campaign_id' => ''],
            ['campaign' => 'herbst', 'keyword' => 'banner', 'campaign_id' => ''],
            ['campaign' => 'partner', 'keyword' => '', 'campaign_id' => ''],
        ]);
        // links with a link ID or a keyword land in the campaign row too
        $this->assertSame(4, $shares->count(LinkBasis::of('herbst', '', '', true)));
        $this->assertSame(2, $shares->count(LinkBasis::of('herbst', 'BANNER', '', true)));
        $this->assertSame(1, $shares->count(LinkBasis::of('herbst', '', 'SO-2', true)));
        $this->assertSame(1, $shares->count(LinkBasis::of('partner', '', '', false)));
        $this->assertSame(0, $shares->count(LinkBasis::of('winter', '', '', false)));
    }
}
