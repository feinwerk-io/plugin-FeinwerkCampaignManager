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
use Piwik\Plugins\FeinwerkCampaignManager\Categories\LinksSubcategory;
use Piwik\Widget\Widget;
use Piwik\Widget\WidgetConfig;

/**
 * Campaigns > Links: every saved link of the website (Vue LinkList, API FeinwerkCampaignManager.getLinks).
 */
class GetLinkList extends Widget
{
    public static function configure(WidgetConfig $config)
    {
        $config->setCategoryId(CampaignsCategory::ID);
        $config->setSubcategoryId(LinksSubcategory::ID);
        $config->setName('FeinwerkCampaignManager_SavedLinks');
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
        return $this->renderTemplate('linkList', [
            'idSite' => $idSite,
            'canWrite' => Piwik::isUserHasWriteAccess($idSite),
            'feedback' => FeedbackSettings::forPage(),
            // the kit's tip line after the feedback row (admins and super users, never in embeds)
            'promo' => WidgetProps::promo($idSite),
        ]);
    }
}
