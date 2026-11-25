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

class DataQualitySubcategory extends Subcategory
{
    public const ID = 'FeinwerkCampaignManager_DataQuality';

    protected $categoryId = CampaignsCategory::ID;
    protected $id = self::ID;
    protected $order = 30;

    public function getHelp()
    {
        return '<p>' . Piwik::translate('FeinwerkCampaignManager_DataQualityHelp') . '</p>';
    }
}
