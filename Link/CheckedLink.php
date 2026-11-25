<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * The result of checking a link draft: the cleaned values, the built URL and what is wrong or worth a look.
 *
 * Errors and warnings are lists of ['field' => targetUrl|<field key>, 'code' => <stable code>, 'details' => array].
 * Error codes: required, too_long, invalid_url, unsupported_scheme, has_campaign_parameters (details names).
 * Warning codes: host_not_in_site (details host), near_duplicate (details value, known), not_read (details name,
 * needs: the plugin Matomo needs to store the value, or null), id_in_use (details value, links: other active saved links
 * with this link ID, so their visits cannot be told apart).
 */
final class CheckedLink
{
    /**
     * @param array<string, string> $values field => cleaned value, every field of Fields::ALL ('' when empty)
     * @param list<array{field: string, code: string, details: array}> $errors
     * @param list<array{field: string, code: string, details: array}> $warnings
     */
    public function __construct(
        public readonly string $targetUrl,
        public readonly ParameterSet $set,
        public readonly array $values,
        public readonly ?string $url,
        public readonly array $errors,
        public readonly array $warnings
    ) {
    }

    public function isValid(): bool
    {
        return $this->errors === [];
    }

    /**
     * @return list<array{field: string, name: string, value: string}> the parameters of the link, in URL order
     */
    public function params(): array
    {
        $params = [];
        foreach (Fields::URL_ORDER as $field) {
            if ($this->values[$field] !== '') {
                $params[] = ['field' => $field, 'name' => $this->set->nameOf($field), 'value' => $this->values[$field]];
            }
        }
        return $params;
    }

    /** the same link with one more warning */
    public function withWarning(string $field, string $code, array $details): self
    {
        $warnings = $this->warnings;
        $warnings[] = ['field' => $field, 'code' => $code, 'details' => $details];
        return new self($this->targetUrl, $this->set, $this->values, $this->url, $this->errors, $warnings);
    }

    /** the same link with one value replaced (for example a generated link ID), checked values otherwise kept */
    public function withValue(string $field, string $value): self
    {
        if (!Fields::isField($field)) {
            throw new \InvalidArgumentException("unknown field $field");
        }
        $values = $this->values;
        $values[$field] = $value;
        $url = $this->url === null ? null : LinkUrl::build($this->targetUrl, $this->set, $values);
        return new self($this->targetUrl, $this->set, $values, $url, $this->errors, $this->warnings);
    }
}
