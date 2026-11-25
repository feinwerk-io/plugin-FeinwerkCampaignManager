<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Fixtures;

use Piwik\Plugins\PrivacyManager\IPAnonymizer;
use Piwik\Tests\Framework\Fixture;

/**
 * Campaign visits in November 2026 with spelling variants. Hand count:
 *
 * | campaign value as tracked | visits |
 * |---------------------------|--------|
 * | Newsletter-November       | 2      |
 * | newsletter_november       | 1      |
 * | newsleter-november        | 1      |
 * | partner                   | 1      |
 * | winter                    | 1      |
 */
class VariantTrafficFixture extends Fixture
{
    public const SITE = 1;
    public const BASE = 'https://www.lindenholz.example';

    public $dateTime = '2026-10-01 00:00:00';

    public function setUp(): void
    {
        self::createSuperUser(false);
        IPAnonymizer::deactivate();
        if (!self::siteCreated(self::SITE)) {
            self::createWebsite('2026-01-01 00:00:00', 1, 'Lindenholz', self::BASE, 1, null, null, 'UTC');
        }
        $visits = [
            ['2026-11-03 10:00:00', 'Newsletter-November'], ['2026-11-04 10:00:00', 'Newsletter-November'],
            ['2026-11-05 10:00:00', 'newsletter_november'], ['2026-11-06 10:00:00', 'newsleter-november'],
            ['2026-11-07 10:00:00', 'partner'], ['2026-11-08 10:00:00', 'winter'],
        ];
        foreach ($visits as $n => [$time, $campaign]) {
            $t = self::getTracker(self::SITE, $time, true, true);
            $t->setIp('198.51.100.' . ($n + 1));
            $t->setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
            $t->setUrl(self::BASE . '/?utm_campaign=' . rawurlencode($campaign));
            self::checkResponse($t->doTrackPageView('Page'));
        }
    }
}
