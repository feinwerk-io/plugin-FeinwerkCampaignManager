<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * The shipped channel templates: they prefill source and medium of the builder. Labels are translated in the UI
 * (translation key FeinwerkCampaignManager_Template_<key>); the values are the same in every language.
 */
final class Templates
{
    /**
     * @return list<array{key: string, source: string, medium: string, sources: string[]}> source '' = the person picks
     *         one, sources = suggestions for it
     */
    public static function defaults(): array
    {
        return [
            ['key' => 'newsletter', 'source' => 'newsletter', 'medium' => 'email', 'sources' => []],
            ['key' => 'social', 'source' => '', 'medium' => 'social', 'sources' => ['facebook', 'instagram', 'linkedin', 'xing', 'youtube', 'tiktok']],
            ['key' => 'paid_social', 'source' => '', 'medium' => 'paid_social', 'sources' => ['facebook', 'instagram', 'linkedin', 'tiktok']],
            ['key' => 'paid_search', 'source' => 'google', 'medium' => 'cpc', 'sources' => ['google', 'bing']],
            ['key' => 'display', 'source' => '', 'medium' => 'display', 'sources' => []],
            ['key' => 'partner', 'source' => '', 'medium' => 'referral', 'sources' => []],
            ['key' => 'print', 'source' => '', 'medium' => 'print', 'sources' => ['flyer', 'poster', 'brochure', 'advert']],
            ['key' => 'event', 'source' => '', 'medium' => 'event', 'sources' => []],
        ];
    }
}
