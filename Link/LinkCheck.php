<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * Turns a link draft into a CheckedLink: cleans the values, builds the URL and collects errors and warnings.
 * Knows nothing of Matomo; the caller passes in what it read from the instance.
 */
final class LinkCheck
{
    /**
     * @param string[] $siteUrls the website's main and alias URLs
     * @param array<string, string[]> $knownValues field => values already in use on the website, most used first
     * @param bool $lowercase whether values are stored in lower case (the website's option)
     */
    public function __construct(
        private ParameterSets $sets,
        private array $siteUrls,
        private array $knownValues,
        private bool $lowercase
    ) {
    }

    /**
     * @param array<string, string> $values field => value as typed; fields missing here are empty
     * @throws \InvalidArgumentException for an unknown parameter set (naming the allowed ones) or an unknown field
     */
    public function check(string $targetUrl, string $setKey, array $values): CheckedLink
    {
        $set = $this->sets->get(trim($setKey));
        foreach (array_keys($values) as $field) {
            if (!Fields::isField((string) $field)) {
                throw new \InvalidArgumentException(sprintf('unknown field "%s", allowed: %s', $field, implode(', ', Fields::ALL)));
            }
        }

        $targetUrl = trim($targetUrl);
        $errors = [];
        $warnings = [];

        $problem = LinkUrl::problemOf($targetUrl);
        if ($problem !== null) {
            $errors[] = self::message('targetUrl', $problem, $problem === 'too_long' ? ['max' => LinkUrl::MAX_LENGTH] : []);
        } else {
            $present = LinkUrl::campaignParametersIn($targetUrl, $this->sets->allCampaignParameterNames());
            if ($present !== []) {
                sort($present);
                $errors[] = self::message('targetUrl', 'has_campaign_parameters', ['names' => $present]);
            }
            if (!SiteHosts::belongs($targetUrl, $this->siteUrls)) {
                $warnings[] = self::message('targetUrl', 'host_not_in_site', ['host' => mb_strtolower((string) parse_url($targetUrl, PHP_URL_HOST), 'UTF-8')]);
            }
        }

        $clean = [];
        foreach (Fields::ALL as $field) {
            $value = ValueNormalizer::normalize((string) ($values[$field] ?? ''), $this->lowercase);
            $clean[$field] = $value;

            if ($value === '') {
                if ($field === Fields::CAMPAIGN) {
                    $errors[] = self::message($field, 'required');
                }
                continue;
            }
            if (mb_strlen($value, 'UTF-8') > Fields::MAX_LENGTH) {
                $errors[] = self::message($field, 'too_long', ['max' => Fields::MAX_LENGTH]);
                continue;
            }

            if ($field !== Fields::ID) {
                $known = NearDuplicates::find($value, $this->knownValues[$field] ?? []);
                if ($known !== null) {
                    $warnings[] = self::message($field, 'near_duplicate', ['value' => $value, 'known' => $known]);
                }
            }

            $name = $set->nameOf($field);
            if (!$this->sets->isRead($field, $name)) {
                $needs = !$this->sets->isMcrActive() && in_array($name, ParameterSets::MCR_DEFAULT[$field], true)
                    ? 'MarketingCampaignsReporting'
                    : null;
                $warnings[] = self::message($field, 'not_read', ['name' => $name, 'needs' => $needs]);
            }
        }

        $url = $errors === [] ? LinkUrl::build($targetUrl, $set, $clean) : null;
        return new CheckedLink($targetUrl, $set, $clean, $url, $errors, $warnings);
    }

    private static function message(string $field, string $code, array $details = []): array
    {
        return ['field' => $field, 'code' => $code, 'details' => $details];
    }
}
