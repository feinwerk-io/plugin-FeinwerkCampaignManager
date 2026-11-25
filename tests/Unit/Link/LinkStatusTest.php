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
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkStatus;

class LinkStatusTest extends TestCase
{
    private const TODAY = '2026-11-20';

    public function test_draftUntilMarkedOrStarted(): void
    {
        $this->assertSame(LinkStatus::DRAFT, LinkStatus::of(null, null, null, self::TODAY));
        $this->assertSame(LinkStatus::DRAFT, LinkStatus::of(null, '2026-11-21', null, self::TODAY));
        $this->assertSame(LinkStatus::DRAFT, LinkStatus::of(null, '', '2026-11-01', self::TODAY), 'an end date alone does not make it live');
        $this->assertSame(LinkStatus::LIVE, LinkStatus::of('2026-11-02 10:00:00', null, null, self::TODAY));
        $this->assertSame(LinkStatus::LIVE, LinkStatus::of(null, self::TODAY, null, self::TODAY), 'live on its start day');
    }

    public function test_endedAfterTheEndDate(): void
    {
        $this->assertSame(LinkStatus::LIVE, LinkStatus::of(null, '2026-11-01', self::TODAY, self::TODAY), 'still live on its end day');
        $this->assertSame(LinkStatus::ENDED, LinkStatus::of(null, '2026-11-01', '2026-11-19', self::TODAY));
        $this->assertSame(LinkStatus::ENDED, LinkStatus::of('2026-11-02 10:00:00', null, '2026-11-19', self::TODAY));
        $this->assertTrue(LinkStatus::isLocked(LinkStatus::ENDED));
        $this->assertTrue(LinkStatus::isLocked(LinkStatus::LIVE));
        $this->assertFalse(LinkStatus::isLocked(LinkStatus::DRAFT));
    }

    public function test_aGeneratedLinkIdIsTheLinksOwn(): void
    {
        $this->assertTrue(LinkStatus::liveByVisits(LinkBasis::LINK_ID, 1, 9, 1, true), 'generated: earlier visits do not matter');
        $this->assertFalse(LinkStatus::liveByVisits(LinkBasis::LINK_ID, 1, 0, 0, true));
    }

    public function test_aTypedOrSharedLinkIdNeedsTheQuietDays(): void
    {
        $this->assertFalse(LinkStatus::liveByVisits(LinkBasis::LINK_ID, 2, 0, 5, true), 'another saved link carries the ID');
        $this->assertFalse(LinkStatus::liveByVisits(LinkBasis::LINK_ID, 1, 3, 5, false), 'a typed ID used before');
        $this->assertTrue(LinkStatus::liveByVisits(LinkBasis::LINK_ID, 1, 0, 5, false), 'a typed ID new with this link');
    }

    public function test_aSharedOrBusyCampaignRowDoesNotMakeADraftLive(): void
    {
        $this->assertTrue(LinkStatus::liveByVisits(LinkBasis::CAMPAIGN, 1, 0, 2), 'a new campaign only this link uses');
        $this->assertTrue(LinkStatus::liveByVisits(LinkBasis::CAMPAIGN_KEYWORD, 1, 0, 1));
        $this->assertFalse(LinkStatus::liveByVisits(LinkBasis::CAMPAIGN, 2, 0, 5), 'another saved link shares the row');
        $this->assertFalse(LinkStatus::liveByVisits(LinkBasis::CAMPAIGN, 1, 4, 5), 'the campaign ran before the link existed');
    }
}
