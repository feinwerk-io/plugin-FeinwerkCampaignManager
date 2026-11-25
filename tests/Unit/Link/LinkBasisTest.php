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

class LinkBasisTest extends TestCase
{
    public function test_linkIdIsExactWhileItIsCounted(): void
    {
        $basis = LinkBasis::of('Herbst', 'banner', ' NL-7 ', true);
        $this->assertSame(LinkBasis::LINK_ID, $basis->type);
        $this->assertSame('nl-7', $basis->key);
    }

    public function test_withoutMarketingCampaignsReportingTheLinkIdDoesNotCount(): void
    {
        $basis = LinkBasis::of('Herbst', 'Banner', 'nl-7', false);
        $this->assertSame(LinkBasis::CAMPAIGN_KEYWORD, $basis->type);
        $this->assertSame(LinkBasis::pair('herbst', 'banner'), $basis->key);
    }

    public function test_campaignAloneWithoutKeywordOrLinkId(): void
    {
        $basis = LinkBasis::of("  Herbst   & \"Küche\" ", '', '', true);
        $this->assertSame(LinkBasis::CAMPAIGN, $basis->type);
        $this->assertSame('herbst & "küche"', $basis->key);
    }

    public function test_separatorsStayApartAsInMatomosReports(): void
    {
        $this->assertNotSame(LinkBasis::of('black-friday', '', '', false)->id(), LinkBasis::of('black friday', '', '', false)->id());
        $this->assertSame(LinkBasis::of('Black Friday', '', '', false)->id(), LinkBasis::of('black friday', '', '', false)->id());
    }

    public function test_typesNeverShareAnId(): void
    {
        $this->assertNotSame(LinkBasis::of('x', '', '', false)->id(), LinkBasis::of('', '', 'x', true)->id());
    }
}
