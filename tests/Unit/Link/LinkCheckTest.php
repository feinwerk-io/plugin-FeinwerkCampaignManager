<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Unit\Link;

use PHPUnit\Framework\TestCase;
use Piwik\Plugins\FeinwerkCampaignManager\Link\CheckedLink;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fields;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkCheck;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ParameterSets;

/**
 * @group FeinwerkCampaignManager
 */
class LinkCheckTest extends TestCase
{
    private const SITE_URLS = ['https://www.lindenholz.example'];

    private static function check(array $values, string $target = 'https://www.lindenholz.example/herbst', string $set = 'utm', bool $mcr = false, array $known = [], bool $lowercase = true): CheckedLink
    {
        $sets = ParameterSets::forInstance(ParameterSets::CORE_CAMPAIGN_DEFAULT, ParameterSets::CORE_KEYWORD_DEFAULT, $mcr ? ParameterSets::MCR_DEFAULT : null);
        return (new LinkCheck($sets, self::SITE_URLS, $known, $lowercase))->check($target, $set, $values);
    }

    private static function codes(array $messages): array
    {
        return array_map(static fn(array $m): string => $m['field'] . ':' . $m['code'], $messages);
    }

    public function test_aGoodLink_hasItsUrlAndParameters(): void
    {
        $link = self::check(['campaign' => ' Herbst  Aktion ', 'source' => 'newsletter', 'medium' => 'email'], mcr: true);

        $this->assertTrue($link->isValid());
        $this->assertSame([], $link->errors);
        $this->assertSame([], $link->warnings);
        $this->assertSame('https://www.lindenholz.example/herbst?utm_source=newsletter&utm_medium=email&utm_campaign=herbst%20aktion', $link->url);
        $this->assertSame('herbst aktion', $link->values[Fields::CAMPAIGN]);
        $this->assertSame('', $link->values[Fields::CONTENT], 'every field is present');
        $this->assertSame(
            [
                ['field' => 'source', 'name' => 'utm_source', 'value' => 'newsletter'],
                ['field' => 'medium', 'name' => 'utm_medium', 'value' => 'email'],
                ['field' => 'campaign', 'name' => 'utm_campaign', 'value' => 'herbst aktion'],
            ],
            $link->params()
        );
    }

    public function test_lowercaseOff_keepsTheCase(): void
    {
        $this->assertSame('Herbst', self::check(['campaign' => 'Herbst'], lowercase: false)->values[Fields::CAMPAIGN]);
    }

    public function test_missingCampaignAndBadTarget_areErrorsWithoutUrl(): void
    {
        $link = self::check(['campaign' => '  '], target: 'shop.example/herbst');

        $this->assertFalse($link->isValid());
        $this->assertNull($link->url);
        $this->assertSame(['targetUrl:invalid_url', 'campaign:required'], self::codes($link->errors));
    }

    public function test_targetWithCampaignParameters_isAnErrorNamingThem(): void
    {
        $link = self::check(['campaign' => 'x'], target: 'https://www.lindenholz.example/?utm_source=old&mtm_campaign=y');

        $this->assertSame(['targetUrl:has_campaign_parameters'], self::codes($link->errors));
        $this->assertSame(['names' => ['mtm_campaign', 'utm_source']], $link->errors[0]['details']);
    }

    public function test_tooLongValue_isAnError(): void
    {
        $link = self::check(['campaign' => str_repeat('ä', Fields::MAX_LENGTH + 1)]);

        $this->assertSame(['campaign:too_long'], self::codes($link->errors));
        $this->assertSame(['max' => Fields::MAX_LENGTH], $link->errors[0]['details']);
    }

    public function test_otherHost_isAWarning(): void
    {
        $link = self::check(['campaign' => 'x'], target: 'https://partner.example/');

        $this->assertTrue($link->isValid());
        $this->assertSame(['targetUrl:host_not_in_site'], self::codes($link->warnings));
        $this->assertSame(['host' => 'partner.example'], $link->warnings[0]['details']);
    }

    public function test_nearDuplicate_isAWarningWithTheKnownValue(): void
    {
        $link = self::check(['campaign' => 'herbst_aktion', 'source' => 'newsleter'], mcr: true, known: [
            Fields::CAMPAIGN => ['herbst-aktion'], Fields::SOURCE => ['newsletter', 'facebook'],
        ]);

        $this->assertTrue($link->isValid());
        $this->assertSame(['campaign:near_duplicate', 'source:near_duplicate'], self::codes($link->warnings));
        $this->assertSame(['value' => 'newsleter', 'known' => 'newsletter'], $link->warnings[1]['details']);
    }

    public function test_valuesMatomoDoesNotStore_areWarnings(): void
    {
        $link = self::check(['campaign' => 'x', 'source' => 'newsletter', 'group' => 'herbst'], set: 'mtm');

        $this->assertSame(['source:not_read', 'group:not_read'], self::codes($link->warnings));
        $this->assertSame(['name' => 'mtm_source', 'needs' => 'MarketingCampaignsReporting'], $link->warnings[0]['details']);
    }

    public function test_unknownSet_throwsWithTheAllowedKeys(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('allowed: utm, mtm');
        self::check(['campaign' => 'x'], set: 'ga4');
    }

    public function test_unknownField_throws(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        self::check(['campaign' => 'x', 'utm_source' => 'y']);
    }
}
