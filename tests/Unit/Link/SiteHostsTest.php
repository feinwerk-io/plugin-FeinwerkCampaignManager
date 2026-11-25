<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\SiteHosts;

/**
 * @group FeinwerkCampaignManager
 */
class SiteHostsTest extends TestCase
{
    /**
     * @dataProvider targets
     */
    public function test_belongs(string $target, bool $expected): void
    {
        $siteUrls = ['https://www.lindenholz.example', 'http://shop.lindenholz.example', '*.kuechen.example', 'kampagne.example'];

        $this->assertSame($expected, SiteHosts::belongs($target, $siteUrls));
    }

    public static function targets(): array
    {
        return [
            'main url' => ['https://www.lindenholz.example/herbst', true],
            'without www' => ['https://lindenholz.example/herbst', true],
            'alias, other scheme' => ['https://shop.lindenholz.example/', true],
            'case' => ['https://WWW.Lindenholz.Example/', true],
            'wildcard subdomain' => ['https://a.b.kuechen.example/', true],
            'wildcard apex' => ['https://kuechen.example/', true],
            'stored without scheme' => ['https://kampagne.example/x', true],
            'other subdomain' => ['https://blog.lindenholz.example/', false],
            'suffix trick' => ['https://evil-lindenholz.example/', false],
            'other site' => ['https://example.org/', false],
            'invalid' => ['not a url', false],
        ];
    }

    public function test_noSiteUrls_belongsNowhere(): void
    {
        $this->assertFalse(SiteHosts::belongs('https://a.example/', []));
    }
}
