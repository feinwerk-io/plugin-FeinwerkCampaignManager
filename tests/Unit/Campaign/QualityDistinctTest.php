<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Campaign;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Model\QualityIssues;

/**
 * Spelling groups that are distinct campaigns (UI review 2026-11-26 F3): workspace campaigns such as
 * 2026_plugin_test_u6a and _u6e are one letter apart but never variants of one another.
 */
class QualityDistinctTest extends TestCase
{
    private static function group(array $values): array
    {
        return ['suggested' => $values[0][0], 'visits' => 0, 'values' => array_map(
            static fn(array $v): array => ['value' => $v[0], 'visits' => 0, 'conversions' => 0, 'savedLinks' => $v[1], 'hasDetails' => false],
            $values
        )];
    }

    public function test_twoKnownCampaignsAreNoVariants(): void
    {
        $groups = [
            self::group([['2026_plugin_test_u6a', 1], ['2026_plugin_test_u6e', 1], ['2026_plugin_test_u6f', 1]]),
            self::group([['newsletter_november', 2], ['newsleter-november', 0]]),
        ];
        $known = ['2026_plugin_test_u6a' => true, '2026_plugin_test_u6e' => true, '2026_plugin_test_u6f' => true, 'newsletter_november' => true];
        $out = QualityIssues::sortOutDistinct($groups, $known);
        $this->assertSame(['newsletter_november'], array_column($out, 'suggested'), 'one known campaign and its typo stay');
        $this->assertFalse($out[0]['maybeDistinct']);
    }

    public function test_everyValueWithOwnLinksRecommendsNone(): void
    {
        $out = QualityIssues::sortOutDistinct([self::group([['sale_uk', 3], ['sale_us', 2]])], []);
        $this->assertCount(1, $out);
        $this->assertTrue($out[0]['maybeDistinct'], 'both have links: maybe two campaigns');
        $this->assertFalse(QualityIssues::sortOutDistinct([self::group([['sale_uk', 3], ['sale-uk', 0]])], [])[0]['maybeDistinct']);
    }
}
