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
use Piwik\Plugins\FeinwerkCampaignManager\Categories\OverviewSubcategory;
use Piwik\Plugins\FeinwerkCampaignManager\Feedback\FeedbackSettings;
use Piwik\Site;
use Piwik\Widget\Widget;
use Piwik\Widget\WidgetConfig;

/**
 * Campaigns > Overview: the campaigns of the website by phase with their numbers, goals and warnings (Vue
 * CampaignOverview, API FeinwerkCampaignManager.getCampaigns).
 */
class GetCampaignOverview extends Widget
{
    public static function configure(WidgetConfig $config)
    {
        $config->setCategoryId(CampaignsCategory::ID);
        $config->setSubcategoryId(OverviewSubcategory::ID);
        $config->setName('FeinwerkCampaignManager_CampaignsOverview');
        $config->setOrder(1);
        $config->setIsWide();
        // a page of its own, not a dashboard widget: its buttons move between the Campaigns pages
        $config->setIsNotWidgetizable();
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        $config->setIsEnabled($idSite > 0 && Piwik::isUserHasViewAccess($idSite));
    }

    public function render()
    {
        $idSite = Common::getRequestVar('idSite', 0, 'int');
        Piwik::checkUserHasViewAccess($idSite);
        return $this->renderTemplate('campaignOverview', [
            'idSite' => $idSite,
            'canWrite' => Piwik::isUserHasWriteAccess($idSite),
            'currency' => (string) Site::getCurrencyFor($idSite),
            'marketplaceUrl' => self::marketplaceUrl(),
            'feedback' => FeedbackSettings::forPage(),
            // the kit's tip line after the feedback row (admins and super users, never in embeds)
            'promo' => WidgetProps::promo($idSite),
        ]);
    }

    /**
     * Marketing Campaigns Reporting's page in Matomo's Marketplace (where it is installed), for super users while the
     * Marketplace is active
     */
    private static function marketplaceUrl(): string
    {
        try {
            if (Piwik::hasUserSuperUserAccess() && \Piwik\Plugin\Manager::getInstance()->isPluginActivated('Marketplace')) {
                return 'index.php?module=Marketplace&action=overview#?popover=browsePluginDetail%243AMarketingCampaignsReporting';
            }
        } catch (\Throwable $e) {
            // no link then
        }
        return '';
    }
}
