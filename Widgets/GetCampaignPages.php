<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Widgets;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Piwik;
use Piwik\Plugins\FeinwerkCampaignManager\Categories\CampaignsCategory;
use Piwik\Plugins\FeinwerkCampaignManager\Categories\CampaignPagesSubcategory;
use Piwik\Plugins\FeinwerkCampaignManager\Feedback\FeedbackSettings;
use Piwik\Plugins\FeinwerkCampaignManager\Model\InstanceContext;
use Piwik\Widget\Widget;
use Piwik\Widget\WidgetConfig;

/**
 * Campaigns > All campaigns: the table of campaigns and one page per campaign (Vue CampaignPages, API
 * FeinwerkCampaignManager.getCampaigns and getCampaignResults).
 */
class GetCampaignPages extends Widget
{
    public static function configure(WidgetConfig $config)
    {
        $config->setCategoryId(CampaignsCategory::ID);
        $config->setSubcategoryId(CampaignPagesSubcategory::ID);
        $config->setName('FeinwerkCampaignManager_AllCampaigns');
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
        return $this->renderTemplate('campaignPages', [
            'idSite' => $idSite,
            'canWrite' => Piwik::isUserHasWriteAccess($idSite),
            'currency' => (string) \Piwik\Site::getCurrencyFor($idSite),
            // Matomo stores site names HTML-escaped; Vue escapes again when it renders
            'siteName' => Common::unsanitizeInputValue((string) \Piwik\Site::getNameFor($idSite)),
            // the report of the campaign's evolution graph (Marketing Campaigns Reporting replaces Matomo's own)
            'evolutionApiMethod' => StaticContainer::get(InstanceContext::class)->evolutionApiMethod(),
            // segmented reports (devices, pages, goals) only where Matomo archives a segment on request
            'segmentReports' => StaticContainer::get(InstanceContext::class)->segmentReportsOnRequest(),
            'feedback' => FeedbackSettings::forPage(),
            // the kit's tip line after the feedback row (admins and super users, never in embeds)
            'promo' => WidgetProps::promo($idSite),
        ]);
    }
}
