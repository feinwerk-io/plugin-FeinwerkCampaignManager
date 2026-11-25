<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\NearDuplicates;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ValueNormalizer;

/**
 * Normalising and the near duplicate warning of the spelling guard.
 *
 * @group FeinwerkCampaignManager
 */
class SpellingTest extends TestCase
{
    public function test_normalize_trimsCollapsesAndDropsControlCharacters(): void
    {
        $this->assertSame('Herbst Aktion', ValueNormalizer::normalize("  Herbst \t\u{00A0} Aktion\u{0007} ", false));
        $this->assertSame('herbst aktion', ValueNormalizer::normalize(' Herbst  Aktion ', true));
        $this->assertSame('küche', ValueNormalizer::normalize('KÜCHE', true));
    }

    public function test_fold_ignoresCaseAndSeparators(): void
    {
        $this->assertSame(ValueNormalizer::fold('news-letter'), ValueNormalizer::fold('News Letter'));
        $this->assertSame(ValueNormalizer::fold('herbst_aktion.2026'), ValueNormalizer::fold('HerbstAktion2026'));
    }

    public function test_find_returnsTheKnownSpelling(): void
    {
        $known = ['newsletter', 'facebook', 'herbstaktion-2026'];

        $this->assertSame('newsletter', NearDuplicates::find('Newsletter', $known));
        $this->assertSame('newsletter', NearDuplicates::find('news-letter', $known));
        $this->assertSame('newsletter', NearDuplicates::find('newsleter', $known), 'one edit away');
        $this->assertSame('herbstaktion-2026', NearDuplicates::find('herbstaktion_2026', $known));
    }

    public function test_find_aChangedDigitIsAnotherCampaign(): void
    {
        $this->assertNull(NearDuplicates::find('newsletter_2026_12', ['newsletter_2026_11']));
        $this->assertNull(NearDuplicates::find('herbst-2027', ['herbst-2026']));
        $this->assertSame('herbst-2026', NearDuplicates::find('herbs-2026', ['herbst-2026']), 'a letter typo still is one');
    }

    public function test_find_staysQuietForExactAndUnrelatedValues(): void
    {
        $known = ['newsletter', 'print', 'email'];

        $this->assertNull(NearDuplicates::find('newsletter', $known));
        $this->assertNull(NearDuplicates::find('instagram', $known));
        $this->assertNull(NearDuplicates::find('mail', $known), 'short values need an exact fold match');
        $this->assertNull(NearDuplicates::find('', $known));
    }

    public function test_find_pointsAKnownButRarerSpellingToTheMoreUsedOne(): void
    {
        // a typo that is already saved once must not silence the warning
        $known = ['autumn-deals', 'newsletter', 'autumn-deal'];

        $this->assertSame('autumn-deals', NearDuplicates::find('autumn-deal', $known));
        $this->assertNull(NearDuplicates::find('autumn-deals', $known), 'the most used spelling is fine');
    }

    public function test_find_prefersTheFirstKnownValue(): void
    {
        // the caller orders known values by use, most used first
        $this->assertSame('Newsletter', NearDuplicates::find('NEWSLETTER', ['Newsletter', 'newsletter']));
    }
}
