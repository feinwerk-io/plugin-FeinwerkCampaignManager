<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Widgets;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\WidgetProps;

/**
 * The tip line prop of the pages (docs/promotions.md): nothing in embeds, and a failing promotion empties only its own
 * prop instead of breaking the page.
 */
class WidgetPropsTest extends TestCase
{
    private const LINE = ['id' => 'campaigns'];

    public function test_the_tip_line_is_null_in_embeds_and_when_it_fails(): void
    {
        $asked = 0;
        $line = static function () use (&$asked): array {
            $asked++;
            return self::LINE;
        };
        $none = static function (): ?array {
            return null;
        };
        $throws = static function (): array {
            throw new \RuntimeException('connector broken');
        };

        self::assertNull(WidgetProps::promoFor(true, $line), 'embedded');
        self::assertSame(0, $asked, 'nothing is asked in an embed');

        self::assertSame(self::LINE, WidgetProps::promoFor(false, $line));
        self::assertSame(1, $asked);
        self::assertNull(WidgetProps::promoFor(false, $none));
        self::assertNull(WidgetProps::promoFor(false, $throws));
    }
}
