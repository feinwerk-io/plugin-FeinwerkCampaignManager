<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures;

use Piwik\Plugins\Goals\API as GoalsApi;
use Piwik\Plugins\PrivacyManager\IPAnonymizer;
use Piwik\Tests\Framework\Fixture;

/**
 * Campaign visits in November 2026 with Marketing Campaigns Reporting active, so link IDs (utm_id) are counted per
 * link. Hand count:
 *
 * | day        | campaign | keyword | link ID | visits | conversions (goal 1) | revenue |
 * |------------|----------|---------|---------|--------|----------------------|---------|
 * | 2026-11-05 | herbst   | banner  | nl-1    | 1      | 0                    | 0       |
 * | 2026-11-06 | herbst   |         | so-2    | 1      | 0                    | 0       |
 * | 2026-11-07 | herbst   |         | so-2    | 1      | 1                    | 12.5    |
 * | 2026-11-08 | partner  |         |         | 1      | 0                    | 0       |
 *
 * So for November: campaign herbst 3 visits (1 conversion, 12.5), herbst with keyword banner 1, partner 1; link IDs
 * nl-1 1 and so-2 2 (1 conversion, 12.5).
 */
class LinkTrafficFixture extends Fixture
{
    public const SITE = 1;
    public const TODAY = '2026-11-20';
    public const BASE = 'https://www.lindenholz.example';

    public $dateTime = '2026-10-01 00:00:00';

    public $extraPluginsToLoad = ['MarketingCampaignsReporting'];

    public function setUp(): void
    {
        self::createSuperUser(false);
        IPAnonymizer::deactivate();
        if (!self::siteCreated(self::SITE)) {
            self::createWebsite('2026-01-01 00:00:00', 1, 'Lindenholz', self::BASE, 1, null, null, 'UTC');
        }
        if (!self::goalExists(self::SITE, 1)) {
            GoalsApi::getInstance()->addGoal(self::SITE, 'Contact', 'manually', '', 'contains', false, 12.5);
        }

        $this->visit('2026-11-05 10:00:00', '198.51.100.1', '/?utm_campaign=Herbst&utm_source=newsletter&utm_medium=email&utm_term=Banner&utm_id=NL-1');
        $this->visit('2026-11-06 10:00:00', '198.51.100.2', '/?utm_campaign=herbst&utm_source=social&utm_id=so-2');
        $t = $this->visit('2026-11-07 10:00:00', '198.51.100.3', '/?utm_campaign=herbst&utm_source=social&utm_id=so-2');
        $t->setForceVisitDateTime('2026-11-07 10:01:00');
        self::checkResponse($t->doTrackGoal(1, 12.5));
        $this->visit('2026-11-08 10:00:00', '198.51.100.4', '/?utm_campaign=Partner');
    }

    private function visit(string $time, string $ip, string $pathAndQuery)
    {
        $t = self::getTracker(self::SITE, $time, true, true);
        $t->setIp($ip);
        $t->setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
        $t->setUrl(self::BASE . $pathAndQuery);
        self::checkResponse($t->doTrackPageView('Page'));
        return $t;
    }
}
