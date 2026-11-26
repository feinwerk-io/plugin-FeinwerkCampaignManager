<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager;

use Piwik\Common;
use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Updater;
use Piwik\Updater\Migration\Factory as MigrationFactory;
use Piwik\Updates as PiwikUpdates;

/**
 * 5.1.0 (connected mode): the saved links get the columns of a link made in Feinwerk Campaigns (LinkDao::
 * PLATFORM_COLUMNS). Only the plugin's own table, no log table. Idempotent: only the columns still missing are added,
 * nothing when all exist (a fresh install creates them in LinkDao::install()).
 */
class Updates_5_1_0 extends PiwikUpdates
{
    public function __construct(private readonly MigrationFactory $migration)
    {
    }

    public function getMigrations(Updater $updater): array
    {
        $table = Common::prefixTable(LinkDao::TABLE);
        $existing = array_column(Db::fetchAll("SHOW COLUMNS FROM $table"), 'Field');
        $missing = array_diff_key(LinkDao::PLATFORM_COLUMNS, array_flip($existing));
        if ($missing === []) {
            return [];
        }
        return [$this->migration->db->addColumns(LinkDao::TABLE, $missing, 'live_reason')];
    }

    public function doUpdate(Updater $updater): void
    {
        $updater->executeMigrations(__FILE__, $this->getMigrations($updater));
    }
}
