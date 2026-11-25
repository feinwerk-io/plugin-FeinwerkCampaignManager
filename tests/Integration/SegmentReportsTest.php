<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\tests\Integration;

use Piwik\ArchiveProcessor\Rules;
use Piwik\Config;
use Piwik\Option;
use Piwik\Plugins\FeinwerkCampaignManager\Model\InstanceContext;
use Piwik\Tests\Framework\TestCase\IntegrationTestCase;

/**
 * Campaign pages link segmented reports (devices, pages, goals) only where Matomo archives an ad-hoc segment on request;
 * most instances archive by cron only, and there the segmented report stays empty (Peter, 2026-11-25). The visitor log
 * is linked always.
 *
 * @group FeinwerkCampaignManager
 */
class SegmentReportsTest extends IntegrationTestCase
{
    private static function set(bool $browserTrigger, bool $enforce): void
    {
        Option::set(Rules::OPTION_BROWSER_TRIGGER_ARCHIVING, $browserTrigger ? 1 : 0);
        $general = Config::getInstance()->General;
        $general['enable_browser_archiving_triggering'] = $browserTrigger ? 1 : 0;
        $general['browser_archiving_disabled_enforce'] = $enforce ? 1 : 0;
        Config::getInstance()->General = $general;
    }

    public function test_cronOnlyWithEnforcedSegmentArchivingMeansNoSegmentedReports(): void
    {
        self::set(false, true);
        $this->assertFalse((new InstanceContext())->segmentReportsOnRequest());
    }

    public function test_segmentsArchivedOnRequestAllowSegmentedReports(): void
    {
        self::set(false, false);
        $this->assertTrue((new InstanceContext())->segmentReportsOnRequest(), 'browser_archiving_disabled_enforce = 0');
        self::set(true, true);
        $this->assertTrue((new InstanceContext())->segmentReportsOnRequest(), 'browser archiving on');
    }
}
