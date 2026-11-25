<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Model\Suggestions;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * Campaign values of digits only ("2025") are int array keys in PHP. getSuggestions answered them as numbers and the link
 * builder stopped with "e.toLowerCase is not a function" (found on a customer's Matomo). Every value is text.
 *
 * @group FeinwerkCampaignManager
 */
class SuggestionsTextTest extends IntegrationTestCase
{
    public function provideContainerConfig()
    {
        return [
            'Piwik\\Access' => new FakeAccess(),
            // the campaign values Matomo counted, as the report gives them: a numeric value becomes an int key
            Suggestions::class => new class extends Suggestions {
                public function __construct()
                {
                }

                public function countedCampaigns(int $idSite, array $saved): array
                {
                    return ['2025' => 7, 'herbst' => 3];
                }
            },
        ];
    }

    public function setUp(): void
    {
        parent::setUp();
        FakeAccess::$superUser = true;
        Fixture::createWebsite('2026-01-01 00:00:00', 0, 'Lindenholz', 'https://www.lindenholz.example');
        (new FeinwerkCampaignManager())->install();
        Db::query('TRUNCATE TABLE ' . LinkDao::tableName());
    }

    public function test_numericCampaignValuesAreText(): void
    {
        API::getInstance()->addLink(1, 'https://www.lindenholz.example/', '2024', 'utm', 'newsletter', 'email');

        $values = array_column(API::getInstance()->getSuggestions(1, 'campaign'), 'value');
        $this->assertSame(['2024', '2025', 'herbst'], $values);
        foreach (['source', 'medium'] as $field) {
            foreach (API::getInstance()->getSuggestions(1, $field) as $row) {
                $this->assertIsString($row['value'], $field);
            }
        }
    }
}
