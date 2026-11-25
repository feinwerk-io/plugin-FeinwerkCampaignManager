<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fields;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ParameterSets;

/**
 * @group FeinwerkCampaignManager
 */
class ParameterSetsTest extends TestCase
{
    private static function core(): ParameterSets
    {
        return ParameterSets::forInstance(ParameterSets::CORE_CAMPAIGN_DEFAULT, ParameterSets::CORE_KEYWORD_DEFAULT, null);
    }

    public function test_defaultInstance_offersUtmAndMtmOnly(): void
    {
        $sets = self::core();

        $this->assertSame(['utm', 'mtm'], array_keys($sets->available()));
        $this->assertSame('utm_campaign', $sets->get('utm')->nameOf(Fields::CAMPAIGN));
        $this->assertSame('utm_term', $sets->get('utm')->nameOf(Fields::KEYWORD));
        $this->assertSame('mtm_group', $sets->get('utm')->nameOf(Fields::GROUP), 'MCR reads no utm name for group');
        $this->assertSame('mtm_cid', $sets->get('mtm')->nameOf(Fields::ID));
    }

    public function test_unknownSet_isRefusedWithTheAllowedKeys(): void
    {
        try {
            self::core()->get('own');
            $this->fail('own is not available on a default instance');
        } catch (\InvalidArgumentException $e) {
            $this->assertStringContainsString('utm, mtm', $e->getMessage());
        }
    }

    public function test_coreWithoutMcr_readsOnlyCampaignAndKeyword(): void
    {
        $sets = self::core();

        $this->assertTrue($sets->isRead(Fields::CAMPAIGN, 'utm_campaign'));
        $this->assertTrue($sets->isRead(Fields::CAMPAIGN, 'mtm_campaign'));
        $this->assertTrue($sets->isRead(Fields::KEYWORD, 'mtm_keyword'));
        $this->assertFalse($sets->isRead(Fields::SOURCE, 'utm_source'), 'core keeps source only as a campaign name fallback');
        $this->assertFalse($sets->isRead(Fields::ID, 'utm_id'));
        $this->assertFalse($sets->isMcrActive());
    }

    public function test_withMcr_readsEveryFieldFromItsLists(): void
    {
        $sets = ParameterSets::forInstance(ParameterSets::CORE_CAMPAIGN_DEFAULT, ParameterSets::CORE_KEYWORD_DEFAULT, ParameterSets::MCR_DEFAULT);

        $this->assertTrue($sets->isMcrActive());
        $this->assertTrue($sets->isRead(Fields::SOURCE, 'utm_source'));
        $this->assertTrue($sets->isRead(Fields::ID, 'utm_id'));
        $this->assertTrue($sets->isRead(Fields::GROUP, 'mtm_group'));
        $this->assertFalse($sets->isRead(Fields::GROUP, 'utm_group'));
        $this->assertSame(['utm', 'mtm'], array_keys($sets->available()));
    }

    public function test_ownNamesInTheConfiguration_addTheOwnSet(): void
    {
        $mcr = ParameterSets::MCR_DEFAULT;
        $mcr[Fields::SOURCE] = ['src', 'utm_source'];
        $sets = ParameterSets::forInstance(['cpn', 'utm_campaign'], ParameterSets::CORE_KEYWORD_DEFAULT, $mcr);

        $own = $sets->get('own');
        $this->assertSame(['utm', 'mtm', 'own'], array_keys($sets->available()));
        $this->assertSame('cpn', $own->nameOf(Fields::CAMPAIGN));
        $this->assertSame('src', $own->nameOf(Fields::SOURCE));
        $this->assertSame('utm_medium', $own->nameOf(Fields::MEDIUM), 'unchanged lists keep the utm name');
        $this->assertTrue($sets->isRead(Fields::CAMPAIGN, 'cpn'));
    }

    public function test_ownSet_isMeasuredAgainstTheInstancesGlobalDefaults(): void
    {
        // a later Matomo with another default list: an unchanged configuration still has no own set
        $global = ['mtm_campaign', 'utm_campaign'];
        $sets = ParameterSets::forInstance($global, ParameterSets::CORE_KEYWORD_DEFAULT, null, $global, ParameterSets::CORE_KEYWORD_DEFAULT);

        $this->assertSame(['utm', 'mtm'], array_keys($sets->available()));
        $this->assertTrue($sets->isRead(Fields::CAMPAIGN, 'mtm_campaign'));
    }

    public function test_allCampaignParameterNames_coversEverySetAndEveryReadName(): void
    {
        $names = ParameterSets::forInstance(['cpn'], ParameterSets::CORE_KEYWORD_DEFAULT, null)->allCampaignParameterNames();

        foreach (['cpn', 'utm_campaign', 'utm_source', 'mtm_cid', 'pk_kwd', 'mtm_placement', 'utm_id'] as $name) {
            $this->assertContains($name, $names);
        }
    }
}
