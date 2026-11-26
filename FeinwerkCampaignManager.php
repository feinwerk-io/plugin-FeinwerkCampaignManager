<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager;

use Piwik\Option;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\CampaignDao;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Feedback\PluginFeedback;

class FeinwerkCampaignManager extends \Piwik\Plugin
{
    public function registerEvents()
    {
        return [
            'Db.getTablesInstalled' => 'getTablesInstalled',
            'SitesManager.deleteSite.end' => 'onSiteDeleted',
            'AssetManager.getStylesheetFiles' => 'getStylesheetFiles',
            'AssetManager.getJavaScriptFiles' => 'getJsFiles',
            'Translate.getClientSideTranslationKeys' => 'getClientSideTranslationKeys',
            'UsersManager.deleteUser' => 'deleteUserFeedback',
        ];
    }

    public function install()
    {
        (new LinkDao())->install();
        (new CampaignDao())->install();
    }

    public function uninstall()
    {
        // the platform connection goes too: revoked there (best effort), token and pending start removed here
        try {
            \Piwik\Container\StaticContainer::get(\Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService::class)->disconnect();
        } catch (\Throwable $e) {
            // the local token is removed below anyway
        }
        Option::delete(\Piwik\Plugins\FeinwerkCampaignManager\Platform\Store::CONNECTION);
        Option::delete(\Piwik\Plugins\FeinwerkCampaignManager\Platform\Store::PENDING);
        (new LinkDao())->uninstall();
        (new CampaignDao())->uninstall();
        Option::deleteLike(PluginFeedback::THROTTLE_OPTION_PREFIX . '%');
    }

    /** A deleted user's feedback throttles go with them. */
    public function deleteUserFeedback($login): void
    {
        Option::deleteLike(PluginFeedback::userOptionPattern((string) $login));
    }

    /** the saved links and campaign details of a deleted website go with it */
    public function onSiteDeleted($idSite): void
    {
        (new LinkDao())->deleteSite((int) $idSite);
        (new CampaignDao())->deleteSite((int) $idSite);
    }

    public function getStylesheetFiles(&$files): void
    {
        $files[] = 'plugins/FeinwerkCampaignManager/stylesheets/campaigns.less';
        $files[] = 'plugins/FeinwerkCampaignManager/stylesheets/feedback.less';
        $files[] = 'plugins/FeinwerkCampaignManager/stylesheets/fwcmp-ui.css';
        // Feinwerk kit: the connector installer page (steps, password note)
        $files[] = 'plugins/FeinwerkCampaignManager/stylesheets/connectorinstaller.css';
        // Feinwerk kit: the tip line after the feedback row and its Feinwerk Plugins logo (plain CSS, light and dark)
        $files[] = 'plugins/FeinwerkCampaignManager/stylesheets/promo.css';
        $files[] = 'plugins/FeinwerkCampaignManager/stylesheets/feinwerklogo.css';
    }

    /**
     * Feinwerk kit: the connector installer's button takes one click and says what it does; promo.js shows the tip line
     * once it has checked the 30-day hiding and the one-line-per-page rule
     */
    public function getJsFiles(&$files): void
    {
        $files[] = 'plugins/FeinwerkCampaignManager/javascripts/connectorinstaller.js';
        $files[] = 'plugins/FeinwerkCampaignManager/javascripts/promo.js';
    }

    /** every key of the plugin: the Vue pages translate in the browser */
    public function getClientSideTranslationKeys(&$translationKeys): void
    {
        $translations = json_decode((string) file_get_contents(__DIR__ . '/lang/en.json'), true);
        foreach (array_keys($translations['FeinwerkCampaignManager'] ?? []) as $key) {
            $translationKeys[] = 'FeinwerkCampaignManager_' . $key;
        }
    }

    public function getTablesInstalled(&$allTablesInstalled): void
    {
        $allTablesInstalled[] = LinkDao::tableName();
        $allTablesInstalled[] = CampaignDao::tableName();
    }
}
