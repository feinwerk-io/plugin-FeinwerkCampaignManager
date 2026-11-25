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
 * Campaign visits in November 2026 (fixed dates), tracked through the same link URLs the builder makes. Hand count:
 *
 * | day        | campaign value as in the link    | key                 | visits | conversions (goal 1) | revenue |
 * |------------|----------------------------------|---------------------|--------|----------------------|---------|
 * | 2026-11-05 | Herbst & "Küche" (utm)           | herbst & "küche"    | 1      | 0                    | 0       |
 * | 2026-11-12 | herbst & "küche" (mtm)           | herbst & "küche"    | 1      | 1                    | 12.5    |
 * | 2026-11-15 | Partner Aktion (utm)             | partner aktion      | 1      | 0                    | 0       |
 * | 2026-10-10 | herbst & "küche" (utm)           | herbst & "küche"    | 1      | 0                    | 0       |
 */
class CampaignTrafficFixture extends Fixture
{
    public const SITE = 1;
    public const TODAY = '2026-11-20';
    public const BASE = 'https://www.lindenholz.example';
    public const HERBST = 'herbst & "küche"';

    public $dateTime = '2026-10-01 00:00:00';

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

        $this->visit('2026-10-10 09:00:00', '198.51.100.9', '/?utm_campaign=herbst%20%26%20%22k%C3%BCche%22&utm_source=print');
        $this->visit('2026-11-05 10:00:00', '198.51.100.1', '/herbst?utm_source=newsletter&utm_medium=email&utm_campaign=Herbst%20%26%20%22K%C3%BCche%22');
        $t = $this->visit('2026-11-12 11:00:00', '198.51.100.2', '/?mtm_campaign=herbst%20%26%20%22k%C3%BCche%22');
        $t->setForceVisitDateTime('2026-11-12 11:01:00');
        self::checkResponse($t->doTrackGoal(1, 12.5));
        $this->visit('2026-11-15 12:00:00', '198.51.100.3', '/?utm_campaign=Partner%20Aktion');
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
