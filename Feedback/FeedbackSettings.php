<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Feedback;

use Piwik\Common;
use Piwik\Container\StaticContainer;
use Piwik\Plugin\Manager as PluginManager;
use Piwik\Translation\Translator;

/**
 * What the feedback row at the end of a page needs (Vue FeedbackBar): switch, support URL, plugin version. Nothing in
 * Widgetize embeds (footer rule); never breaks the page.
 */
final class FeedbackSettings
{
    /** @return array{enabled: bool, supportUrl: string, version: string}|null */
    public static function forPage(): ?array
    {
        try {
            if (Common::getRequestVar('module', '', 'string') === 'Widgetize') {
                return null;
            }
            return [
                'enabled' => PluginFeedback::enabled(),
                'supportUrl' => PluginFeedback::supportUrl((string) StaticContainer::get(Translator::class)->getCurrentLanguage()),
                'version' => (string) PluginManager::getInstance()->getLoadedPlugin(PluginFeedback::PLUGIN)->getVersion(),
            ];
        } catch (\Throwable $e) {
            return null;
        }
    }
}
