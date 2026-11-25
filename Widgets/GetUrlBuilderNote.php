<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Widgets;

use Piwik\Common;
use Piwik\Piwik;
use Piwik\Plugins\FeinwerkCampaignManager\Categories\CampaignsCategory;
use Piwik\Plugins\FeinwerkCampaignManager\Categories\LinkBuilderSubcategory;
use Piwik\Widget\Widget;
use Piwik\Widget\WidgetConfig;

/**
 * One line under Matomo's own Campaign URL Builder that leads to this plugin's link builder (Peter's decision 7 of
 * 2026-11-23: Matomo's builder stays and is linked, not hidden). Wide and ordered after Matomo's widget, so Matomo's
 * builder keeps the full width.
 */
class GetUrlBuilderNote extends Widget
{
    public const CATEGORY = 'Referrers_Referrers';
    public const SUBCATEGORY = 'Referrers_URLCampaignBuilder';

    public static function configure(WidgetConfig $config)
    {
        $config->setCategoryId(self::CATEGORY);
        $config->setSubcategoryId(self::SUBCATEGORY);
        $config->setName('Feinwerk Campaign Manager');
        $config->setOrder(150);
        $config->setIsWide();
        $config->setIsNotWidgetizable();
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        $config->setIsEnabled($idSite > 0 && Piwik::isUserHasViewAccess($idSite));
    }

    public function render()
    {
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        Piwik::checkUserHasViewAccess($idSite);
        return $this->renderTemplate('urlBuilderNote', [
            'builderUrl' => self::builderUrl($idSite, Common::getRequestVar('period', 'day', 'string'), Common::getRequestVar('date', 'today', 'string')),
        ]);
    }

    /** The link builder page for the website and period the user is looking at */
    public static function builderUrl(int $idSite, string $period, string $date): string
    {
        $params = http_build_query(['idSite' => $idSite, 'period' => $period, 'date' => $date], '', '&', PHP_QUERY_RFC3986);
        $hash = http_build_query(
            ['idSite' => $idSite, 'period' => $period, 'date' => $date, 'category' => CampaignsCategory::ID, 'subcategory' => LinkBuilderSubcategory::ID],
            '',
            '&',
            PHP_QUERY_RFC3986
        );
        return 'index.php?module=CoreHome&action=index&' . $params . '#?' . $hash;
    }
}
