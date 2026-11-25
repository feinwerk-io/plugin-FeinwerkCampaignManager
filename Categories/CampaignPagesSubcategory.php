<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Categories;

use Piwik\Category\Subcategory;
use Piwik\Piwik;

/** Campaigns > All campaigns: the table of campaigns and, with campaignPage in the hash, one campaign page */
class CampaignPagesSubcategory extends Subcategory
{
    public const ID = 'FeinwerkCampaignManager_AllCampaigns';

    protected $categoryId = CampaignsCategory::ID;
    protected $id = self::ID;
    protected $order = 7;

    public function getHelp()
    {
        return '<p>' . Piwik::translate('FeinwerkCampaignManager_AllCampaignsHelp') . '</p>';
    }
}
