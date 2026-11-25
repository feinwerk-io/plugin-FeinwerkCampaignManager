<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\ArchiveProcessor\Rules;
use Piwik\Config;
use Piwik\Plugin\Manager;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fields;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ParameterSets;
use Piwik\Plugins\FeinwerkCampaignManager\MeasurableSettings;
use Piwik\Plugins\SitesManager\API as SitesManagerApi;

/**
 * What the link builder reads from this Matomo instance: the campaign parameter names it is configured for, whether
 * Marketing Campaigns Reporting is active, a website's URLs and its options. Callers check access first.
 */
class InstanceContext
{
    public const MCR = 'MarketingCampaignsReporting';

    /** [MarketingCampaignsReporting] keys, field => config key */
    private const MCR_KEYS = [
        Fields::CAMPAIGN => 'campaign_name', Fields::KEYWORD => 'campaign_keyword', Fields::SOURCE => 'campaign_source',
        Fields::MEDIUM => 'campaign_medium', Fields::CONTENT => 'campaign_content', Fields::ID => 'campaign_id',
        Fields::GROUP => 'campaign_group', Fields::PLACEMENT => 'campaign_placement',
    ];

    private ?ParameterSets $sets = null;

    public function isMcrActive(): bool
    {
        return Manager::getInstance()->isPluginActivated(self::MCR);
    }

    /**
     * The report whose row evolution graph shows a campaign: Matomo's own campaign report, or with Marketing Campaigns
     * Reporting active its campaign name report, because that plugin takes Referrers.getCampaigns out of Matomo's report
     * list (event Report.filterReports) and the graph then fails ("not found in the list of available reports"). The API
     * method Referrers.getCampaigns itself keeps working, so the numbers still come from it.
     */
    /**
     * Whether Matomo archives an ad-hoc segment (one in the URL, not saved as pre-processed) when a report asks for it:
     * with browser archiving on, or with browser_archiving_disabled_enforce = 0. Most instances archive by cron only;
     * there a segmented report stays empty, while the visitor log (raw visits) always works. False on any doubt.
     */
    public function segmentReportsOnRequest(): bool
    {
        try {
            return Rules::isRequestAuthorizedToArchive() || Rules::isBrowserArchivingAvailableForSegments();
        } catch (\Throwable $e) {
            return false;
        }
    }

    public function evolutionApiMethod(): string
    {
        return $this->isMcrActive() ? 'MarketingCampaignsReporting.getName' : 'Referrers.getCampaigns';
    }

    public function parameterSets(): ParameterSets
    {
        if ($this->sets === null) {
            $tracker = Config::getInstance()->Tracker;
            $mcr = null;
            if ($this->isMcrActive()) {
                $section = Config::getInstance()->MarketingCampaignsReporting;
                $mcr = [];
                foreach (self::MCR_KEYS as $field => $key) {
                    $mcr[$field] = is_array($section) && isset($section[$key]) && is_string($section[$key])
                        ? self::split($section[$key])
                        : ParameterSets::MCR_DEFAULT[$field];
                }
            }
            // "own" names are measured against this Matomo's own global.ini.php, not against a copy of its defaults
            $global = Config::getInstance()->getFromGlobalConfig('Tracker');
            $global = is_array($global) ? $global : [];
            $this->sets = ParameterSets::forInstance(
                self::split((string) ($tracker['campaign_var_name'] ?? '')),
                self::split((string) ($tracker['campaign_keyword_var_name'] ?? '')),
                $mcr,
                isset($global['campaign_var_name']) ? self::split((string) $global['campaign_var_name']) : null,
                isset($global['campaign_keyword_var_name']) ? self::split((string) $global['campaign_keyword_var_name']) : null
            );
        }
        return $this->sets;
    }

    /** @return string[] the website's main and alias URLs */
    public function siteUrls(int $idSite): array
    {
        return array_values(array_map('strval', (array) SitesManagerApi::getInstance()->getSiteUrlsFromId($idSite)));
    }

    /** whether the website stores campaign values in lower case (website option, default on) */
    public function lowercaseValues(int $idSite): bool
    {
        return (bool) (new MeasurableSettings($idSite))->lowercaseValues->getValue();
    }

    /** @return string[] */
    private static function split(string $list): array
    {
        return array_values(array_filter(array_map('trim', explode(',', $list)), static fn(string $n): bool => $n !== ''));
    }
}
