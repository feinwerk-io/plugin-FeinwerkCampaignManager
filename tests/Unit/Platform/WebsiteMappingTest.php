<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Platform;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\PlatformService;

/** Which workspace website a Matomo site maps to (CampaignsApp's rule, row shapes of its /websites code, 2026-11-26) */
class WebsiteMappingTest extends TestCase
{
    private static function w(string $id, string $domain, ?int $siteId, bool $thisMatomo): array
    {
        return ['id' => $id, 'name' => $id, 'url' => "https://$domain", 'domains' => [$domain],
            'source' => $siteId === null ? null : 'matomo', 'matomo_site_id' => $siteId, 'this_matomo' => $thisMatomo];
    }

    public function test_theWebsiteReadingFromThisMatomoWins(): void
    {
        $map = PlatformService::mapWebsite([self::w('A', 'shop.example', 3, true), self::w('B', 'shop.example', null, false)], 3, ['https://shop.example']);
        $this->assertSame(['A', 'site'], [$map['id'], $map['match']]);
    }

    public function test_aWebsiteCreatedAtConsentMapsByDomainWithItsSiteIdAsTieBreaker(): void
    {
        // the live case: consent-created websites carry the site id with this_matomo false
        $websites = [self::w('X', 'www.shop.example', 9, false), self::w('C', 'www.shop.example', 3, false)];
        $this->assertSame('C', PlatformService::mapWebsite($websites, 3, ['https://www.shop.example'])['id']);
        $this->assertSame('X', PlatformService::mapWebsite($websites, 4, ['https://www.shop.example'])['id'], 'no tie: the first domain match');
    }

    public function test_aWebsiteTiedToAnotherSiteHereIsNeverTaken(): void
    {
        $this->assertNull(PlatformService::mapWebsite([self::w('A', 'shop.example', 3, true)], 4, ['https://www.shop.example']));
    }

    public function test_noMatchingHostMapsToNothing(): void
    {
        $this->assertNull(PlatformService::mapWebsite([self::w('A', 'shop.example', null, false)], 1, ['https://other.example']));
    }
}
