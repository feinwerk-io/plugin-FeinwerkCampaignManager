<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Widgets;

use Piwik\Common;
use Piwik\Plugins\FeinwerkCampaignManager\Feedback\FeedbackSettings;
use Piwik\Piwik;
use Piwik\Plugins\FeinwerkCampaignManager\Categories\CampaignsCategory;
use Piwik\Plugins\FeinwerkCampaignManager\Categories\LinkBuilderSubcategory;
use Piwik\Site;
use Piwik\Widget\Widget;
use Piwik\Widget\WidgetConfig;

/**
 * Campaigns > Link builder: build, check, copy and save a campaign link (Vue LinkBuilder, API FeinwerkCampaignManager).
 */
class GetLinkBuilder extends Widget
{
    public static function configure(WidgetConfig $config)
    {
        $config->setCategoryId(CampaignsCategory::ID);
        $config->setSubcategoryId(LinkBuilderSubcategory::ID);
        $config->setName('FeinwerkCampaignManager_LinkBuilder');
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
        return $this->renderTemplate('linkBuilder', [
            'idSite' => $idSite,
            'canWrite' => Piwik::isUserHasWriteAccess($idSite),
            'feedback' => FeedbackSettings::forPage(),
            // the kit's tip line after the feedback row (admins and super users, never in embeds)
            'promo' => WidgetProps::promo($idSite),
            // the example in the empty target field: this website's own address
            'siteUrl' => (string) Site::getMainUrlFor($idSite),
        ]);
    }
}
