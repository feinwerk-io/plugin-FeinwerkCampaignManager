<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * The campaign fields of a link. The keys are stable machine values used in the API, the database and the UI.
 */
final class Fields
{
    public const CAMPAIGN = 'campaign';
    public const SOURCE = 'source';
    public const MEDIUM = 'medium';
    public const KEYWORD = 'keyword';
    public const CONTENT = 'content';
    public const ID = 'campaignId';
    public const GROUP = 'group';
    public const PLACEMENT = 'placement';

    /** every field, in the order of the builder form */
    public const ALL = [self::CAMPAIGN, self::SOURCE, self::MEDIUM, self::KEYWORD, self::CONTENT, self::ID, self::GROUP, self::PLACEMENT];

    /** the order of the parameters in a built URL (the usual order of campaign URL builders) */
    public const URL_ORDER = [self::SOURCE, self::MEDIUM, self::CAMPAIGN, self::ID, self::KEYWORD, self::CONTENT, self::GROUP, self::PLACEMENT];

    /** fields only Marketing Campaigns Reporting reads (the builder shows them only when it is active) */
    public const MCR_ONLY = [self::ID, self::GROUP, self::PLACEMENT];

    /** longest value of a field, in characters (the column size of the saved links) */
    public const MAX_LENGTH = 255;

    public static function isField(string $field): bool
    {
        return in_array($field, self::ALL, true);
    }
}
