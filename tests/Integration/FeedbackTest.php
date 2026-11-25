<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\NoAccessException;
use Piwik\Option;
use Piwik\Plugins\FeinwerkCampaignManager\API;
use Piwik\Plugins\FeinwerkCampaignManager\Feedback\PluginFeedback;
use Piwik\Plugins\FeinwerkCampaignManager\FeinwerkCampaignManager;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetLinkBuilder;
use Piwik\Plugins\FeinwerkCampaignManager\Widgets\GetLinkList;
use Piwik\Tests\Framework\Fixture;
use Piwik\Tests\Framework\Mock\FakeAccess;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * The feedback row at the end of the link builder and of the list: the API's access rules and input checks, nothing sent
 * in test mode, the user's throttles removed with the user, the settings on both pages and none in Widgetize embeds.
 *
 * @group FeinwerkCampaignManager
 */
class FeedbackTest extends IntegrationTestCase
{
    public function provideContainerConfig()
    {
        return ['Piwik\\Access' => new FakeAccess()];
    }

    public function setUp(): void
    {
        parent::setUp();
        Fixture::loadAllTranslations();
        FakeAccess::$superUser = true;
        Fixture::createWebsite('2026-01-01 00:00:00', 1, 'Shop', 'https://example.com');
        FakeAccess::clearAccess(false, [], [1], 'viewer');
        $_GET['idSite'] = 1;
    }

    public function tearDown(): void
    {
        unset($_GET['idSite'], $_GET['module']);
        Fixture::resetTranslations();
        parent::tearDown();
    }

    public function test_aViewer_canVote_butNothingLeavesInTestMode(): void
    {
        $this->assertSame(['sent' => false], API::getInstance()->sendFeedback(1, 'link_builder', 'up'));
        $this->assertSame(['sent' => false], API::getInstance()->sendFeedback(1, ' saved_links ', 'down'));
    }

    /**
     * @dataProvider badVotes
     */
    public function test_anUnknownQuestionOrVote_isA400NamingTheAllowedValues(string $topic, string $vote, string $allowed): void
    {
        try {
            API::getInstance()->sendFeedback(1, $topic, $vote);
            $this->fail('400 expected');
        } catch (InvalidInputException $e) {
            $this->assertSame(400, $e->getCode());
            $this->assertStringContainsString($allowed, $e->getMessage());
        }
    }

    public static function badVotes(): array
    {
        return [
            'topic' => ['board', 'up', 'overview, link_builder, saved_links'],
            'vote' => ['link_builder', 'maybe', 'up, down'],
        ];
    }

    public function test_withoutAccessToTheSite_noVote(): void
    {
        FakeAccess::clearAccess(false, [], [], 'stranger');
        $this->expectException(NoAccessException::class);
        API::getInstance()->sendFeedback(1, 'link_builder', 'up');
    }

    public function test_anonymous_noVote(): void
    {
        FakeAccess::clearAccess(false, [], [1], 'anonymous');
        $this->expectException(NoAccessException::class);
        API::getInstance()->sendFeedback(1, 'link_builder', 'up');
    }

    public function test_deletingAUser_removesItsThrottles(): void
    {
        Option::set(PluginFeedback::throttleOption('anna', 'link_builder'), '123');
        Option::set(PluginFeedback::throttleOption('bert', 'link_builder'), '456');

        (new FeinwerkCampaignManager())->deleteUserFeedback('anna');

        $this->assertFalse(Option::get(PluginFeedback::throttleOption('anna', 'link_builder')));
        $this->assertSame('456', Option::get(PluginFeedback::throttleOption('bert', 'link_builder')));
    }

    public function test_bothPages_carryTheFeedbackSettings_butNotInWidgetize(): void
    {
        foreach ([new GetLinkBuilder(), new GetLinkList()] as $widget) {
            $page = html_entity_decode($widget->render());
            $this->assertStringContainsString('feedback="{', $page);
            $this->assertStringContainsString('mtm_source=FeinwerkCampaignManager', $page);
        }

        $_GET['module'] = 'Widgetize';
        try {
            $this->assertStringNotContainsString('feedback="{', html_entity_decode((new GetLinkBuilder())->render()), 'not in Widgetize embeds');
        } finally {
            unset($_GET['module']);
        }
    }
}
