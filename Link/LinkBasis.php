<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * Which report row counts a saved link's visits. Exact with a link ID while Marketing Campaigns Reporting counts link
 * IDs; otherwise the row of its campaign and keyword, or of its campaign alone, in Matomo's campaign report. Such a row
 * also counts every other link with the same values, so callers say with how many links it is shared.
 */
final class LinkBasis
{
    public const LINK_ID = 'link_id';
    public const CAMPAIGN_KEYWORD = 'campaign_keyword';
    public const CAMPAIGN = 'campaign';

    /** @var string one of the constants */
    public $type;

    /** @var string the folded report label(s) the row is found by; unique per type */
    public $key;

    private function __construct(string $type, string $key)
    {
        $this->type = $type;
        $this->key = $key;
    }

    /**
     * @param bool $linkIdsCounted Marketing Campaigns Reporting is active (it reports per link ID)
     */
    public static function of(string $campaign, string $keyword, string $linkId, bool $linkIdsCounted): self
    {
        if ($linkIdsCounted && self::label($linkId) !== '') {
            return new self(self::LINK_ID, self::label($linkId));
        }
        if (self::label($keyword) !== '') {
            return new self(self::CAMPAIGN_KEYWORD, self::pair(self::label($campaign), self::label($keyword)));
        }
        return new self(self::CAMPAIGN, self::label($campaign));
    }

    /** A report label as links and reports are matched: cleaned and lower case (Matomo stores campaign values so) */
    public static function label(string $value): string
    {
        return ValueNormalizer::normalize($value, true);
    }

    /** The key of a keyword row under its campaign row */
    public static function pair(string $campaignLabel, string $keywordLabel): string
    {
        return $campaignLabel . "\x1f" . $keywordLabel;
    }

    /** type and key in one string, for counting links per basis */
    public function id(): string
    {
        return $this->type . ':' . $this->key;
    }
}
