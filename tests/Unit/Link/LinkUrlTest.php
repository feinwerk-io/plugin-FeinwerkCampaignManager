<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkUrl;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ParameterSets;

/**
 * @group FeinwerkCampaignManager
 */
class LinkUrlTest extends TestCase
{
    public function test_build_appendsTheParametersInTheUsualOrder(): void
    {
        $url = LinkUrl::build('https://shop.example/herbst', ParameterSets::utm(), [
            'campaign' => 'herbstaktion-2026', 'source' => 'newsletter', 'medium' => 'email', 'content' => '',
        ]);

        $this->assertSame('https://shop.example/herbst?utm_source=newsletter&utm_medium=email&utm_campaign=herbstaktion-2026', $url);
    }

    public function test_build_keepsQueryAndFragment(): void
    {
        $url = LinkUrl::build('https://shop.example/p?id=7&x=1#offer', ParameterSets::mtm(), ['campaign' => 'herbst']);

        $this->assertSame('https://shop.example/p?id=7&x=1&mtm_campaign=herbst#offer', $url);
    }

    public function test_build_doesNotDoubleTheSeparator(): void
    {
        $this->assertSame('https://a.example/?mtm_campaign=x', LinkUrl::build('https://a.example/?', ParameterSets::mtm(), ['campaign' => 'x']));
        $this->assertSame('https://a.example/?a=1&mtm_campaign=x', LinkUrl::build('https://a.example/?a=1&', ParameterSets::mtm(), ['campaign' => 'x']));
    }

    public function test_build_percentEncodesValues(): void
    {
        $url = LinkUrl::build('https://a.example/', ParameterSets::utm(), ['campaign' => 'Küche & Bad 50%', 'keyword' => 'a+b']);

        $this->assertSame('https://a.example/?utm_campaign=K%C3%BCche%20%26%20Bad%2050%25&utm_term=a%2Bb', $url);
    }

    public function test_campaignParametersIn_findsNamesCaseInsensitively(): void
    {
        $found = LinkUrl::campaignParametersIn('https://a.example/?UTM_Source=x&page=2&mtm_cid=1', ['utm_source', 'mtm_cid', 'utm_medium']);

        $this->assertSame(['utm_source', 'mtm_cid'], $found);
    }

    /**
     * @dataProvider invalidTargets
     */
    public function test_problemOf_namesTheReason(string $target, ?string $expected): void
    {
        $this->assertSame($expected, LinkUrl::problemOf($target));
    }

    public static function invalidTargets(): array
    {
        return [
            'empty' => ['', 'required'],
            'no scheme' => ['shop.example/herbst', 'invalid_url'],
            'ftp' => ['ftp://shop.example/', 'unsupported_scheme'],
            'javascript' => ['javascript:alert(1)', 'unsupported_scheme'],
            'no host' => ['https:///path', 'invalid_url'],
            'spaces' => ['https://shop example/', 'invalid_url'],
            'fine' => ['https://shop.example/herbst?x=1', null],
            'fine http' => ['http://intranet.local:8080/', null],
            'idn' => ['https://küche.example/', null],
        ];
    }
}
