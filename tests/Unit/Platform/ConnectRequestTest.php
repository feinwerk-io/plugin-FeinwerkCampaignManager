<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Platform;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\ConnectRequest;
use Piwik\Plugins\FeinwerkCampaignManager\Platform\Pkce;

/** The connect start of the contract (§1.1 with §11 and §12): exact return address, PKCE, prefill limits */
class ConnectRequestTest extends TestCase
{
    public function test_theMatomoUrlIsNormalised(): void
    {
        $this->assertSame('https://stats.example.com', ConnectRequest::normaliseMatomoUrl('https://Stats.Example.com/'));
        $this->assertSame('https://example.com/matomo', ConnectRequest::normaliseMatomoUrl('https://example.com/matomo/index.php?x=1#y'));
        $this->assertSame('http://10.0.0.3:18001', ConnectRequest::normaliseMatomoUrl('http://10.0.0.3:18001/'));
        $this->assertNull(ConnectRequest::normaliseMatomoUrl('ftp://example.com'));
        $this->assertNull(ConnectRequest::normaliseMatomoUrl('not a url'));
    }

    public function test_theReturnAddressIsExactlyTheContractsOne(): void
    {
        $this->assertSame(
            'https://example.com/matomo/index.php?module=FeinwerkCampaignManager&action=connectReturn',
            ConnectRequest::redirectUri('https://example.com/matomo')
        );
    }

    public function test_pkceS256(): void
    {
        $verifier = Pkce::verifier();
        $this->assertSame(1, preg_match('/^[A-Za-z0-9_-]{43,128}$/', $verifier));
        // RFC 7636 appendix B
        $this->assertSame('E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM', Pkce::challenge('dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk'));
        $state = Pkce::state();
        $this->assertGreaterThanOrEqual(16, strlen($state));
        $this->assertNotSame($state, Pkce::state());
    }

    public function test_theFieldsCarryTheRequestAndThePrefill(): void
    {
        $fields = ConnectRequest::fields('https://example.com', 'st4te-0123456789abc', 'ch', 'de', 'Lena Lindner', 'lena@example.com', [
            ['idsite' => 3, 'name' => 'Lindenholz', 'urls' => ['https://www.lindenholz.example', 'https://lindenholz.example']],
        ]);
        $map = [];
        foreach ($fields as [$name, $value]) {
            $map[$name][] = $value;
        }
        $this->assertSame(['https://example.com/index.php?module=FeinwerkCampaignManager&action=connectReturn'], $map['redirect_uri']);
        $this->assertSame(['S256'], $map['code_challenge_method']);
        $this->assertSame(['https://example.com'], $map['matomo_url']);
        $this->assertSame(['de'], $map['lang']);
        $this->assertSame(['lena@example.com'], $map['email']);
        $this->assertSame(['3'], $map['sites[0][idsite]']);
        $this->assertSame(['https://www.lindenholz.example', 'https://lindenholz.example'], $map['sites[0][urls][]']);
    }

    public function test_thePrefillKeepsTheLimits(): void
    {
        $urls = [];
        for ($i = 0; $i < 25; $i++) {
            $urls[] = "https://s$i.example";
        }
        $sites = [];
        for ($i = 1; $i <= 120; $i++) {
            $sites[] = ['idsite' => $i, 'name' => str_repeat('ä', 200), 'urls' => array_merge($urls, ['https://bad url.example', 'https://' . str_repeat('a', 260) . '.example'])];
        }
        $fields = ConnectRequest::fields('https://example.com', 'st4te-0123456789abc', 'ch', 'fr', '', 'no address', $sites);
        $names = array_column($fields, 0);
        $this->assertNotContains('lang', $names, 'only de or en');
        $this->assertNotContains('email', $names, 'an invalid address is left out');
        $this->assertContains('sites[99][idsite]', $names);
        $this->assertNotContains('sites[100][idsite]', $names, 'at most 100 websites');
        $this->assertSame(20, count(array_keys($names, 'sites[0][urls][]')), 'at most 20 URLs per website');
        foreach ($fields as [$name, $value]) {
            $this->assertLessThanOrEqual(255, strlen($value), $name);
        }
        $this->assertLessThanOrEqual(262144, strlen((string) json_encode($fields, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)));
    }

    public function test_internationalDomainsGoAsPunycode(): void
    {
        if (!function_exists('idn_to_ascii')) {
            $this->assertNull(ConnectRequest::asciiUrl('https://bäckerei.example/'));
            return;
        }
        $this->assertSame('https://xn--bckerei-5wa.example/', ConnectRequest::asciiUrl('https://bäckerei.example/'));
    }
}
