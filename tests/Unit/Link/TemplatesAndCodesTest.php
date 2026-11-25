<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fingerprint;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkCode;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Templates;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ValueNormalizer;

/**
 * @group FeinwerkCampaignManager
 */
class TemplatesAndCodesTest extends TestCase
{
    public function test_defaultTemplates_haveUniqueKeysAndCleanValues(): void
    {
        $templates = Templates::defaults();
        $keys = array_column($templates, 'key');

        $this->assertSame(array_values(array_unique($keys)), $keys);
        $this->assertContains('newsletter', $keys);
        foreach ($templates as $template) {
            $this->assertMatchesRegularExpression('/^[a-z_]+$/', $template['key']);
            $this->assertNotSame('', $template['medium'], $template['key']);
            foreach (array_merge([$template['source'], $template['medium']], $template['sources']) as $value) {
                $this->assertSame(ValueNormalizer::normalize($value, true), $value, $template['key']);
            }
        }
    }

    public function test_linkCode_isShortAndUnambiguous(): void
    {
        $codes = [];
        for ($i = 0; $i < 200; $i++) {
            $code = LinkCode::generate();
            $this->assertMatchesRegularExpression('/^[' . LinkCode::ALPHABET . ']{8}$/', $code);
            $codes[$code] = true;
        }
        $this->assertCount(200, $codes);
        $this->assertDoesNotMatchRegularExpression('/[01lo]/', LinkCode::ALPHABET);
    }

    public function test_fingerprint_dependsOnSiteAndUrlButNotOnHostCase(): void
    {
        $a = Fingerprint::of(1, 'https://Shop.Example/p?utm_campaign=x');

        $this->assertSame(40, strlen($a));
        $this->assertSame($a, Fingerprint::of(1, 'HTTPS://shop.example/p?utm_campaign=x'));
        $this->assertNotSame($a, Fingerprint::of(2, 'https://shop.example/p?utm_campaign=x'));
        $this->assertNotSame($a, Fingerprint::of(1, 'https://shop.example/P?utm_campaign=x'), 'paths are case sensitive');
    }
}
