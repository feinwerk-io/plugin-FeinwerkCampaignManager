<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager;

use Piwik\Menu\MenuAdmin;
use Piwik\Piwik;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformConfig;
use Piwik\Plugins\FeinwerkCampaignManager\ConnectorInstaller\ConnectorInstaller;

/**
 * The admin entries: the connection to Feinwerk Campaigns and the Feinwerk kit's Connector installer; the plugin's
 * campaign pages are report pages (Categories/).
 */
class Menu extends \Piwik\Plugin\Menu
{
    public function configureAdminMenu(MenuAdmin $menu)
    {
        $this->addConnectorInstaller($menu);
        $this->addPlatform($menu);
    }

    /**
     * Administration > Platform > Feinwerk Campaigns: the connection, for super users (Peter's decision 1 of 2026-11-23:
     * product, not promotion; platform = 0 hides it).
     */
    private function addPlatform(MenuAdmin $menu): void
    {
        try {
            if (Piwik::hasUserSuperUserAccess() && PlatformConfig::enabled()) {
                $menu->addPlatformItem('FeinwerkCampaignManager_PlatformMenu', $this->urlForAction('platform'), 40);
            }
        } catch (\Throwable $e) {
            // never breaks Matomo's menu
        }
    }

    /**
     * Kit: "Feinwerk Plugins" > "Feinwerk Connector installieren" (or "aktivieren") for super users while the connector
     * is not active, once across all Feinwerk plugins (ConnectorInstaller::claim()). The connector's own entries take the
     * same section once it is active. Never breaks the menu.
     */
    private function addConnectorInstaller(MenuAdmin $menu): void
    {
        try {
            $env = ConnectorInstaller::environment();
            if (ConnectorInstaller::decide($env) === ConnectorInstaller::HIDDEN || !ConnectorInstaller::claim()) {
                return;
            }
            if (method_exists($menu, 'registerMenuIcon')) {
                // the icon of the connector's own section. Matomo applies a section icon only when the section itself is
                // added as an entry (as PrivacyManager does): without it the left menu shows its default arrow.
                $menu->registerMenuIcon('FeinwerkCampaignManager_ConnectorInstallerSection', 'icon-marketplace');
                $menu->addItem('FeinwerkCampaignManager_ConnectorInstallerSection', null, [], 1);
            }
            $menu->addItem(
                'FeinwerkCampaignManager_ConnectorInstallerSection',
                ConnectorInstaller::usableFiles($env)
                    ? 'FeinwerkCampaignManager_ConnectorInstallerMenuActivate'
                    : 'FeinwerkCampaignManager_ConnectorInstallerMenu',
                $this->urlForAction('connectorInstaller'),
                1
            );
        } catch (\Throwable $e) {
            // an installer entry never breaks Matomo's menu
        }
    }
}
