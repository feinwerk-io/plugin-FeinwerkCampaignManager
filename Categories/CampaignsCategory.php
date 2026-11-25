<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Categories;

use Piwik\Category\Category;

/**
 * The plugin's own reporting category "Campaigns" (design 5a), after Goals. Matomo's Acquisition > Campaigns stays as
 * it is.
 */
class CampaignsCategory extends Category
{
    public const ID = 'FeinwerkCampaignManager_Campaigns';

    protected $id = self::ID;
    protected $order = 26;
    protected $icon = 'icon-reporting-referer';
}
