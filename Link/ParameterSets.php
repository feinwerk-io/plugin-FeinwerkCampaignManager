<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * The parameter sets a link can use on this Matomo instance, and which parameter names Matomo reads per field.
 *
 * utm and mtm are always offered; "own" only when the instance's configuration lists a name first that differs from
 * Matomo's defaults. Core Matomo reads only the campaign name ([Tracker] campaign_var_name) and the keyword
 * (campaign_keyword_var_name); Marketing Campaigns Reporting reads every field from its own lists.
 */
final class ParameterSets
{
    public const UTM = 'utm';
    public const MTM = 'mtm';
    public const OWN = 'own';

    /** [Tracker] campaign_var_name of Matomo 5.0 to 6 */
    public const CORE_CAMPAIGN_DEFAULT = ['pk_cpn', 'pk_campaign', 'piwik_campaign', 'mtm_campaign', 'matomo_campaign', 'utm_campaign', 'utm_source', 'utm_medium'];

    /** [Tracker] campaign_keyword_var_name of Matomo 5.0 to 6 */
    public const CORE_KEYWORD_DEFAULT = ['pk_kwd', 'pk_keyword', 'piwik_kwd', 'mtm_kwd', 'mtm_keyword', 'matomo_kwd', 'utm_term'];

    /** the default lists of Marketing Campaigns Reporting ([MarketingCampaignsReporting] campaign_<field>) */
    public const MCR_DEFAULT = [
        Fields::CAMPAIGN => ['mtm_campaign', 'matomo_campaign', 'mtm_cpn', 'pk_campaign', 'piwik_campaign', 'pk_cpn', 'utm_campaign'],
        Fields::KEYWORD => ['mtm_keyword', 'matomo_kwd', 'mtm_kwd', 'pk_keyword', 'piwik_kwd', 'pk_kwd', 'utm_term'],
        Fields::SOURCE => ['mtm_source', 'pk_source', 'utm_source'],
        Fields::MEDIUM => ['mtm_medium', 'pk_medium', 'utm_medium'],
        Fields::CONTENT => ['mtm_content', 'pk_content', 'utm_content'],
        Fields::ID => ['mtm_cid', 'pk_cid', 'utm_id', 'mtm_clid'],
        Fields::GROUP => ['mtm_group', 'pk_group'],
        Fields::PLACEMENT => ['mtm_placement', 'pk_placement'],
    ];

    private const UTM_NAMES = [
        Fields::CAMPAIGN => 'utm_campaign', Fields::SOURCE => 'utm_source', Fields::MEDIUM => 'utm_medium',
        Fields::KEYWORD => 'utm_term', Fields::CONTENT => 'utm_content', Fields::ID => 'utm_id',
        // utm has no names for these two; Marketing Campaigns Reporting reads only mtm_ and pk_ names for them
        Fields::GROUP => 'mtm_group', Fields::PLACEMENT => 'mtm_placement',
    ];

    private const MTM_NAMES = [
        Fields::CAMPAIGN => 'mtm_campaign', Fields::SOURCE => 'mtm_source', Fields::MEDIUM => 'mtm_medium',
        Fields::KEYWORD => 'mtm_keyword', Fields::CONTENT => 'mtm_content', Fields::ID => 'mtm_cid',
        Fields::GROUP => 'mtm_group', Fields::PLACEMENT => 'mtm_placement',
    ];

    /** @var array<string, ParameterSet> */
    private array $available;

    /**
     * @param array<string, string[]> $readNames field => the names Matomo reads for it, in Matomo's order
     * @param array<string, string[]> $configuredLists field => the list as configured, only where it differs from the default
     */
    private function __construct(private array $readNames, array $configuredLists, private bool $mcrActive)
    {
        $this->available = [self::UTM => self::utm(), self::MTM => self::mtm()];

        $own = self::UTM_NAMES;
        $differs = false;
        foreach ($configuredLists as $field => $list) {
            $first = $list[0] ?? '';
            if ($first !== '' && !in_array($first, self::UTM_NAMES, true) && !in_array($first, self::MTM_NAMES, true)) {
                $own[$field] = $first;
                $differs = true;
            }
        }
        if ($differs) {
            $this->available[self::OWN] = new ParameterSet(self::OWN, $own);
        }
    }

    public static function utm(): ParameterSet
    {
        return new ParameterSet(self::UTM, self::UTM_NAMES);
    }

    public static function mtm(): ParameterSet
    {
        return new ParameterSet(self::MTM, self::MTM_NAMES);
    }

    /**
     * @param string[] $coreCampaignNames [Tracker] campaign_var_name as a list
     * @param string[] $coreKeywordNames [Tracker] campaign_keyword_var_name as a list
     * @param array<string, string[]>|null $mcrNames field => names of Marketing Campaigns Reporting, null when it is not active
     * @param string[]|null $coreCampaignDefault the campaign list of Matomo's global.ini.php (the constant when null)
     * @param string[]|null $coreKeywordDefault the keyword list of Matomo's global.ini.php (the constant when null)
     */
    public static function forInstance(array $coreCampaignNames, array $coreKeywordNames, ?array $mcrNames, ?array $coreCampaignDefault = null, ?array $coreKeywordDefault = null): self
    {
        $coreCampaignNames = self::clean($coreCampaignNames);
        $coreKeywordNames = self::clean($coreKeywordNames);
        $coreCampaignDefault = $coreCampaignDefault === null ? self::CORE_CAMPAIGN_DEFAULT : self::clean($coreCampaignDefault);
        $coreKeywordDefault = $coreKeywordDefault === null ? self::CORE_KEYWORD_DEFAULT : self::clean($coreKeywordDefault);

        $read = array_fill_keys(Fields::ALL, []);
        $configured = [];
        if ($coreCampaignNames !== $coreCampaignDefault) {
            $configured[Fields::CAMPAIGN] = $coreCampaignNames;
        }
        if ($coreKeywordNames !== $coreKeywordDefault) {
            $configured[Fields::KEYWORD] = $coreKeywordNames;
        }

        if ($mcrNames !== null) {
            foreach (Fields::ALL as $field) {
                $list = self::clean($mcrNames[$field] ?? self::MCR_DEFAULT[$field]);
                $read[$field] = $list;
                if ($list !== self::MCR_DEFAULT[$field] && !isset($configured[$field])) {
                    $configured[$field] = $list;
                }
            }
        }

        // core detection runs with or without Marketing Campaigns Reporting; utm_source and utm_medium in the core list
        // are only fallbacks for the campaign name, so they count as read for the name only
        $read[Fields::CAMPAIGN] = array_values(array_unique(array_merge($read[Fields::CAMPAIGN], $coreCampaignNames)));
        $read[Fields::KEYWORD] = array_values(array_unique(array_merge($read[Fields::KEYWORD], $coreKeywordNames)));

        return new self($read, $configured, $mcrNames !== null);
    }

    /** @return array<string, ParameterSet> key => set, utm first */
    public function available(): array
    {
        return $this->available;
    }

    /**
     * @throws \InvalidArgumentException for a key that is not available here, naming the allowed keys
     */
    public function get(string $key): ParameterSet
    {
        if (!isset($this->available[$key])) {
            throw new \InvalidArgumentException(sprintf(
                'unknown parameter set "%s", allowed: %s',
                $key,
                implode(', ', array_keys($this->available))
            ));
        }
        return $this->available[$key];
    }

    public function isMcrActive(): bool
    {
        return $this->mcrActive;
    }

    /** whether Matomo stores the value of this parameter name for the field */
    public function isRead(string $field, string $name): bool
    {
        return in_array(strtolower($name), array_map('strtolower', $this->readNames[$field] ?? []), true);
    }

    /** @return string[] the names Matomo reads for the field, in its order */
    public function readNames(string $field): array
    {
        return $this->readNames[$field] ?? [];
    }

    /**
     * Every name that marks a campaign parameter here: the names of every offered set and every name Matomo reads.
     *
     * @return string[]
     */
    public function allCampaignParameterNames(): array
    {
        $names = [];
        foreach ($this->available as $set) {
            $names = array_merge($names, array_values($set->names()));
        }
        foreach ($this->readNames as $list) {
            $names = array_merge($names, $list);
        }
        // the utm and mtm names Matomo does not read here are still campaign parameters (GA4, other tools)
        $names = array_merge($names, array_values(self::UTM_NAMES), array_values(self::MTM_NAMES));
        foreach (self::MCR_DEFAULT as $list) {
            $names = array_merge($names, $list);
        }
        return array_values(array_unique(array_map('strtolower', $names)));
    }

    /** @param string[] $names */
    private static function clean(array $names): array
    {
        $clean = [];
        foreach ($names as $name) {
            $name = trim((string) $name);
            if ($name !== '') {
                $clean[] = $name;
            }
        }
        return $clean;
    }
}
