<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Campaign;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\SpellingGroups;

class SpellingGroupsTest extends TestCase
{
    private static function n(int $visits, int $savedLinks = 0, int $conversions = 0, bool $details = false): array
    {
        return ['visits' => $visits, 'conversions' => $conversions, 'savedLinks' => $savedLinks, 'hasDetails' => $details];
    }

    public function test_separatorsCaseAndOneTypoMakeOneGroup(): void
    {
        $groups = SpellingGroups::of([
            'newsletter-november' => self::n(40, 2),
            'newsletter_november' => self::n(12),
            'newsleter-november' => self::n(3),
            'black friday 2026' => self::n(2),
            'black-friday-2026' => self::n(13, 1),
            'partner' => self::n(9),
        ]);
        $this->assertCount(2, $groups);
        $this->assertSame('newsletter-november', $groups[0]['suggested']);
        $this->assertSame(55, $groups[0]['visits']);
        $this->assertSame(['newsletter-november', 'newsletter_november', 'newsleter-november'], array_column($groups[0]['values'], 'value'));
        $this->assertSame('black-friday-2026', $groups[1]['suggested']);
    }

    /** a value of digits only is an int array key in PHP; the rows carry it as text (the UI calls string methods) */
    public function test_valuesOfDigitsOnlyStayText(): void
    {
        $groups = SpellingGroups::of(['2025' => self::n(5, 1), '20-25' => self::n(2)]);
        $this->assertCount(1, $groups);
        $this->assertSame('2025', $groups[0]['suggested']);
        $this->assertSame(['2025', '20-25'], array_column($groups[0]['values'], 'value'));
    }

    public function test_savedLinksDecideBeforeVisits(): void
    {
        $groups = SpellingGroups::of(['Herbst-Aktion' => self::n(50), 'herbst aktion' => self::n(5, 3)]);
        $this->assertSame('herbst aktion', $groups[0]['suggested']);
    }

    public function test_groupsJoinTransitively(): void
    {
        // a-b one edit, b-c one edit, a-c two: still one campaign
        $groups = SpellingGroups::of(['sommerfest' => self::n(5), 'sommerfst' => self::n(1), 'somerfst' => self::n(1)]);
        $this->assertCount(1, $groups);
        $this->assertCount(3, $groups[0]['values']);
    }

    public function test_shortValuesNeedTheSameFold(): void
    {
        $this->assertSame([], SpellingGroups::of(['ads' => self::n(1), 'abs' => self::n(1)]));
        $this->assertCount(1, SpellingGroups::of(['A.D.S' => self::n(1), 'ads' => self::n(1)]));
    }

    public function test_digitsAreDifferentCampaignsNotTypos(): void
    {
        $this->assertSame([], SpellingGroups::of(['black-friday-2025' => self::n(9), 'black-friday-2026' => self::n(4)]));
        $this->assertSame([], SpellingGroups::of(['sommerfest1' => self::n(1), 'sommerfest12' => self::n(1)]));
        // a separator or the case still group them
        $this->assertCount(1, SpellingGroups::of(['black friday 2026' => self::n(1), 'black-friday-2026' => self::n(1)]));
    }

    public function test_tenThousandValuesStayFast(): void
    {
        $values = [];
        mt_srand(7);
        for ($i = 0; $i < 10000; $i++) {
            $values['campaign-' . substr(md5((string) mt_rand()), 0, 10) . '-' . $i] = self::n(mt_rand(0, 50));
        }
        $values['newsletter-november'] = self::n(5);
        $values['newsleter-november'] = self::n(1);
        $start = microtime(true);
        $groups = SpellingGroups::of($values);
        $this->assertLessThan(5.0, microtime(true) - $start, 'grouping 10,000 values');
        $this->assertContains('newsletter-november', array_column($groups, 'suggested'));
    }

    public function test_noGroupOfOne(): void
    {
        $this->assertSame([], SpellingGroups::of(['winter' => self::n(3)]));
        $this->assertSame([], SpellingGroups::of([]));
    }
}
