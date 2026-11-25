<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Widgets;

use Piwik\Common;
use Piwik\Plugins\FeinwerkCampaignManager\Promo\PromoLine;

/**
 * The Feinwerk notice the plugin's pages get from PHP (promotion kit, docs/promotions.md, as in Data Exploration's
 * WidgetProps): the tip line after the feedback row at the end of the page (Vue PromoLine).
 */
final class WidgetProps
{
    /**
     * The tip line of this page for the current user and website (Promo\PromoLine::current()): null for users without
     * admin access, when promotions are switched off and in embeds.
     */
    public static function promo(int $idSite): ?array
    {
        return self::promoFor(self::isEmbedded(), static function () use ($idSite): ?array {
            return PromoLine::current($idSite);
        });
    }

    /**
     * Null in embeds; a failing promotion empties only its own prop and never breaks the page. Pure.
     *
     * @param callable(): ?array $line
     */
    public static function promoFor(bool $embedded, callable $line): ?array
    {
        if ($embedded) {
            return null;
        }

        return self::guarded($line);
    }

    /** @param callable(): ?array $promotion */
    private static function guarded(callable $promotion): ?array
    {
        try {
            return $promotion();
        } catch (\Throwable $e) {
            return null;
        }
    }

    /**
     * Widgetize and other embeds (module=Widgetize or disableLink=1) show no notice; a failing check counts as embedded.
     */
    public static function isEmbedded(): bool
    {
        try {
            $module = trim(Common::getRequestVar('module', '', 'string')); // Matomo 6 does not trim
            $disableLink = Common::getRequestVar('disableLink', 0, 'int');

            return PromoLine::isEmbedded($module, $disableLink);
        } catch (\Throwable $e) {
            return true;
        }
    }
}
