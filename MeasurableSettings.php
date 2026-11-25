<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager;

use Piwik\Piwik;
use Piwik\Settings\FieldConfig;
use Piwik\Settings\Setting;

/**
 * Website options of Feinwerk Campaign Manager (Administration, Websites, Manage, in the website's form). Written through
 * Matomo's own SitesManager.updateSite, read by the builder through FeinwerkCampaignManager.getParameterSets.
 */
class MeasurableSettings extends \Piwik\Settings\Measurable\MeasurableSettings
{
    /** @var Setting */
    public $lowercaseValues;

    protected function init()
    {
        // the plugin's name, the same in every language (house rule)
        $this->title = 'Feinwerk Campaign Manager';

        $this->lowercaseValues = $this->makeSetting('lowercase_values', true, FieldConfig::TYPE_BOOL, function (FieldConfig $field) {
            $field->title = Piwik::translate('FeinwerkCampaignManager_SettingLowercaseTitle');
            $field->description = Piwik::translate('FeinwerkCampaignManager_SettingLowercaseHelp');
            $field->uiControl = FieldConfig::UI_CONTROL_CHECKBOX;
        });
    }
}
