<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Piwik;
use Piwik\Plugins\FeinwerkCampaignManager\Link\CheckedLink;

/**
 * The readable texts for the check codes and the API errors, in the user's language. API errors name the parameter,
 * the value and what is allowed (house rule for AI clients).
 */
class Messages
{
    private const FIELD_LABELS = [
        'targetUrl' => 'FeinwerkCampaignManager_FieldTargetUrl',
        'campaign' => 'FeinwerkCampaignManager_FieldCampaign',
        'source' => 'FeinwerkCampaignManager_FieldSource',
        'medium' => 'FeinwerkCampaignManager_FieldMedium',
        'keyword' => 'FeinwerkCampaignManager_FieldKeyword',
        'content' => 'FeinwerkCampaignManager_FieldContent',
        'campaignId' => 'FeinwerkCampaignManager_FieldCampaignId',
        'group' => 'FeinwerkCampaignManager_FieldGroup',
        'placement' => 'FeinwerkCampaignManager_FieldPlacement',
    ];

    public function fieldLabel(string $field): string
    {
        return isset(self::FIELD_LABELS[$field]) ? Piwik::translate(self::FIELD_LABELS[$field]) : $field;
    }

    /**
     * @param array{field: string, code: string, details: array} $message
     */
    public function describe(array $message): string
    {
        $label = $this->fieldLabel($message['field']);
        $d = $message['details'];
        switch ($message['code']) {
            case 'required':
                return Piwik::translate('FeinwerkCampaignManager_ErrorRequired', [$label]);
            case 'too_long':
                return Piwik::translate('FeinwerkCampaignManager_ErrorTooLong', [$label, $d['max'] ?? '']);
            case 'invalid_url':
                return Piwik::translate('FeinwerkCampaignManager_ErrorInvalidUrl', [$label, 'https://', 'http://']);
            case 'unsupported_scheme':
                return Piwik::translate('FeinwerkCampaignManager_ErrorUnsupportedScheme', [$label, 'https://', 'http://']);
            case 'has_campaign_parameters':
                return Piwik::translate('FeinwerkCampaignManager_ErrorHasCampaignParameters', [implode(', ', $d['names'] ?? [])]);
            case 'host_not_in_site':
                return Piwik::translate('FeinwerkCampaignManager_WarningHostNotInSite', [$d['host'] ?? '']);
            case 'near_duplicate':
                return Piwik::translate('FeinwerkCampaignManager_WarningNearDuplicate', [$d['value'] ?? '', $d['known'] ?? '']);
            case 'id_in_use':
                return Piwik::translate('FeinwerkCampaignManager_WarningIdInUse', [$d['value'] ?? '', (string) ($d['links'] ?? 1)]);
            case 'not_read':
                return ($d['needs'] ?? null) !== null
                    ? Piwik::translate('FeinwerkCampaignManager_WarningNeedsMcr', [$label, $d['name'] ?? ''])
                    : Piwik::translate('FeinwerkCampaignManager_WarningNotRead', [$label, $d['name'] ?? '']);
        }
        return $message['code'];
    }

    /**
     * @param list<array{field: string, code: string, details: array}> $messages
     * @return list<array{field: string, code: string, message: string, details: array}>
     */
    public function describeAll(array $messages): array
    {
        $out = [];
        foreach ($messages as $message) {
            $out[] = [
                'field' => $message['field'],
                'code' => $message['code'],
                'message' => $this->describe($message),
                'details' => $message['details'],
            ];
        }
        return $out;
    }

    /** the errors of a link as one API error text: each with its parameter and the value given */
    public function errorsAsText(array $errors, CheckedLink $link): string
    {
        $parts = [];
        foreach ($errors as $error) {
            $field = $error['field'];
            $value = $field === 'targetUrl' ? $link->targetUrl : (string) ($link->values[$field] ?? '');
            $parts[] = Piwik::translate('FeinwerkCampaignManager_ApiErrorParameter', [$field, self::shorten($value), $this->describe($error)]);
        }
        return implode(' ', $parts);
    }

    /** @param string[] $allowed */
    public function invalidParameterSet(string $value, array $allowed): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorAllowedValues', ['parameterSet', self::shorten($value), implode(', ', $allowed)]);
    }

    /** @param string[] $allowed */
    public function invalidValue(string $param, string $value, array $allowed): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorAllowedValues', [$param, self::shorten($value), implode(', ', $allowed)]);
    }

    public function invalidDate(string $param, string $value): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorDate', [$param, self::shorten($value)]);
    }

    public function endBeforeStart(string $start, string $end): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorEndBeforeStart', [$end, $start]);
    }

    public function noteTooLong(int $max): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorNoteTooLong', [$max]);
    }

    public function sameLinkExists(int $idLink): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorSameLinkExists', [$idLink]);
    }

    /** @param list<string> $params the API parameters that would change */
    public function linkIsLive(int $idLink, array $params): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorLinkIsLive', [$idLink, implode(', ', $params)]);
    }

    public function linkNotFound(int $idLink, int $idSite): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorLinkNotFound', [$idLink, $idSite]);
    }

    public function notANumber(string $param, string $value): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorNotANumber', [$param, self::shorten($value)]);
    }

    public function campaignNotFound(string $campaign, int $idSite): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorCampaignNotFound', [self::shorten($campaign), $idSite]);
    }

    public function campaignNoData(string $campaign, int $idSite): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorCampaignNoData', [$campaign, $idSite]);
    }

    public function campaignRequired(): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorCampaignRequired');
    }

    public function textTooLong(string $param, int $max): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorTextTooLong', [$param, $max]);
    }

    public function notANumberAtLeastZero(string $param, string $value): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorNotANumberAtLeastZero', [$param, self::shorten($value)]);
    }

    public function invalidPeriodDate(string $period, string $date): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorPeriodDate', [self::shorten($period), self::shorten($date)]);
    }

    public function outOfRange(string $param, int $value, int $min, int $max): string
    {
        return Piwik::translate('FeinwerkCampaignManager_ApiErrorRange', [$param, $value, $min, $max]);
    }

    private static function shorten(string $value): string
    {
        return mb_strlen($value, 'UTF-8') > 80 ? mb_substr($value, 0, 80, 'UTF-8') . '...' : $value;
    }

    /** a PlatformError as the API's exception, with a message people can act on */
    public function platform(\Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformError $e, string $workspace = ''): \Piwik\Plugins\FeinwerkCampaignManager\Http\PlatformException
    {
        $reason = $e->error;
        [$key, $status] = match ($reason) {
            'not_connected' => ['FeinwerkCampaignManager_PlatformNotConnectedApi', 409],
            'platform_disabled' => ['FeinwerkCampaignManager_PlatformDisabled', 409],
            'trial_ended', 'expired' => ['FeinwerkCampaignManager_PlatformExpired', 409],
            'lost', 'unauthorized', 'access_lost' => ['FeinwerkCampaignManager_PlatformLost', 409],
            'blocked' => ['FeinwerkCampaignManager_PlatformBlocked', 409],
            'workspace_ended' => ['FeinwerkCampaignManager_PlatformWorkspaceEnded', 409],
            'no_website' => ['FeinwerkCampaignManager_PlatformNoWebsite', 409],
            'internet_disabled' => ['FeinwerkCampaignManager_PlatformInternetDisabled', 502],
            'unreachable', 'bad_answer', 'server_error', 'unavailable' => ['FeinwerkCampaignManager_PlatformUnreachable', 502],
            'rate_limited' => ['FeinwerkCampaignManager_PlatformRateLimited', 429],
            default => ['', 400],
        };
        if ($key === '') {
            $text = $e->getMessage();
            foreach ($e->fields as $field => $messages) {
                $text .= ' ' . $field . ': ' . implode(' ', $messages);
            }
            return new \Piwik\Plugins\FeinwerkCampaignManager\Http\PlatformException($reason, Piwik::translate('FeinwerkCampaignManager_ApiErrorPlatform', [$reason, trim($text)]), $e->status >= 400 && $e->status < 500 ? 400 : 502);
        }
        $message = match ($reason) {
            'no_website' => Piwik::translate($key, [$workspace]),
            'rate_limited' => Piwik::translate($key, [(string) max(1, $e->retryAfter)]),
            default => Piwik::translate($key),
        };
        return new \Piwik\Plugins\FeinwerkCampaignManager\Http\PlatformException($reason, $reason . ': ' . $message, $status);
    }
}
