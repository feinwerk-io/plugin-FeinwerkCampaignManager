<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Campaign;

/**
 * Where a campaign stands. Explicit dates win; without a start date the phase follows Matomo's numbers and the saved
 * links (rules in Phase::of).
 */
final class Phase
{
    public const PREPARING = 'preparing';
    public const RUNNING = 'running';
    public const ENDED = 'ended';
    public const ARCHIVED = 'archived';

    /** display and sort order */
    public const ORDER = [self::RUNNING, self::PREPARING, self::ENDED, self::ARCHIVED];

    /**
     * 1. archived details: archived; 2. start after today: preparing; 3. end before today: ended; 4. start set:
     * running; 5. no start: running with visits in the last 30 days, preparing with active saved links, else ended.
     *
     * @param array{startDate: ?string, endDate: ?string, archived: bool}|null $details null when the campaign has none
     * @param string $today YYYY-MM-DD in the website's time zone
     * @param int $recentVisits visits Matomo counted in the last 30 days
     * @param int $activeLinks active saved links with this campaign value
     */
    public static function of(?array $details, string $today, int $recentVisits, int $activeLinks): string
    {
        if ($details !== null) {
            if (!empty($details['archived'])) {
                return self::ARCHIVED;
            }
            $start = $details['startDate'] ?? null;
            $end = $details['endDate'] ?? null;
            if ($start !== null && $start > $today) {
                return self::PREPARING;
            }
            if ($end !== null && $end < $today) {
                return self::ENDED;
            }
            if ($start !== null) {
                return self::RUNNING;
            }
        }
        if ($recentVisits > 0) {
            return self::RUNNING;
        }
        return $activeLinks > 0 ? self::PREPARING : self::ENDED;
    }
}
