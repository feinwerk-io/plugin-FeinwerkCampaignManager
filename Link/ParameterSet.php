<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * One set of URL parameter names, one name per field (for example utm: campaign => utm_campaign).
 */
final class ParameterSet
{
    /**
     * @param string $key utm, mtm or own
     * @param array<string, string> $names field => parameter name, for every field of Fields::ALL
     */
    public function __construct(private string $key, private array $names)
    {
        foreach (Fields::ALL as $field) {
            if (!isset($names[$field]) || $names[$field] === '') {
                throw new \InvalidArgumentException("parameter set $key has no name for $field");
            }
        }
    }

    public function key(): string
    {
        return $this->key;
    }

    public function nameOf(string $field): string
    {
        if (!isset($this->names[$field])) {
            throw new \InvalidArgumentException("unknown field $field");
        }
        return $this->names[$field];
    }

    /** @return array<string, string> field => parameter name, in the order of Fields::ALL */
    public function names(): array
    {
        $names = [];
        foreach (Fields::ALL as $field) {
            $names[$field] = $this->names[$field];
        }
        return $names;
    }
}
