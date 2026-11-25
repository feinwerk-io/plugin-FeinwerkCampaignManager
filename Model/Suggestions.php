<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Container\StaticContainer;
use Piwik\Log\LoggerInterface;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;
use Piwik\Plugins\FeinwerkCampaignManager\Link\NearDuplicates;

/**
 * Suggestions from Matomo's reports for the link builder: campaign values counted in the last 30 days that no saved
 * link uses yet. Day archives only (cron archiving is enough); fails soft to no suggestions.
 */
class Suggestions
{
    public const DAYS = 30;

    public function __construct(private CampaignReports $reports, private Today $today)
    {
    }

    /**
     * @param list<string> $saved the campaign values of the saved links, most used first
     * @return array<string, int> value => visits, most visits first; values a saved link uses, and spelling variants of
     *         them (NearDuplicates), left out
     */
    public function countedCampaigns(int $idSite, array $saved): array
    {
        $to = $this->today->forSite($idSite);
        $from = (new \DateTimeImmutable($to . ' 00:00:00', new \DateTimeZone('UTC')))->modify('-' . (self::DAYS - 1) . ' days')->format('Y-m-d');
        try {
            $counted = $this->reports->forPeriod($idSite, 'day', $from . ',' . $to, '');
        } catch (\Throwable $e) {
            StaticContainer::get(LoggerInterface::class)->warning('FeinwerkCampaignManager: campaign suggestions not read: {message}', ['message' => $e->getMessage()]);
            return [];
        }
        $savedKeys = array_flip(array_map([CampaignKey::class, 'of'], $saved));
        $out = [];
        foreach ($counted as $key => $numbers) {
            $key = (string) $key;
            if ((int) $numbers['visits'] <= 0 || isset($savedKeys[$key]) || NearDuplicates::find($key, $saved) !== null) {
                continue;
            }
            $out[$key] = (int) $numbers['visits'];
        }
        arsort($out);
        return $out;
    }
}
