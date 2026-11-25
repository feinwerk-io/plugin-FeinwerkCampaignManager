<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Dao;

use Piwik\Common;
use Piwik\Db;
use Piwik\DbHelper;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;

/**
 * Campaign details, table fw_campaigns_campaign: one row per website and campaign value (unique by the hash of the
 * key, see CampaignKey). Archived, never deleted, except with their website or on uninstall.
 */
class CampaignDao
{
    public const TABLE = 'fw_campaigns_campaign';

    public static function tableName(): string
    {
        return Common::prefixTable(self::TABLE);
    }

    public function install(): void
    {
        DbHelper::createTable(self::TABLE, "
            `idcampaign` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            `idsite` INT UNSIGNED NOT NULL,
            `campaign_hash` CHAR(40) NOT NULL,
            `campaign` VARCHAR(255) NOT NULL,
            `name` VARCHAR(255) NULL,
            `start_date` DATE NULL,
            `end_date` DATE NULL,
            `goal_metric` VARCHAR(20) NOT NULL DEFAULT 'none',
            `goal_target` DECIMAL(18,2) NULL,
            `idgoal` INT UNSIGNED NULL,
            `notes` TEXT NULL,
            `created_by` VARCHAR(100) NOT NULL,
            `created_at` DATETIME NOT NULL,
            `updated_by` VARCHAR(100) NOT NULL,
            `updated_at` DATETIME NOT NULL,
            `archived_at` DATETIME NULL,
            PRIMARY KEY (`idcampaign`),
            UNIQUE KEY `fw_site_campaign` (`idsite`, `campaign_hash`)
        ");
    }

    public function uninstall(): void
    {
        Db::dropTables([self::tableName()]);
    }

    public function get(int $idSite, string $key): ?array
    {
        $row = Db::fetchRow(
            'SELECT * FROM ' . self::tableName() . ' WHERE idsite = ? AND campaign_hash = ?',
            [$idSite, CampaignKey::hash($key)]
        );
        return $row ?: null;
    }

    /** @return list<array> every campaign of the website, archived ones too */
    public function all(int $idSite): array
    {
        return Db::fetchAll('SELECT * FROM ' . self::tableName() . ' WHERE idsite = ? ORDER BY campaign', [$idSite]);
    }

    /** @param array<string, mixed> $row column => value, without idcampaign and campaign_hash */
    public function insert(array $row): int
    {
        $row['campaign_hash'] = CampaignKey::hash((string) $row['campaign']);
        $columns = array_keys($row);
        Db::query(
            sprintf(
                'INSERT INTO %s (%s) VALUES (%s)',
                self::tableName(),
                implode(', ', array_map(static fn(string $c): string => "`$c`", $columns)),
                implode(', ', array_fill(0, count($columns), '?'))
            ),
            array_values($row)
        );
        return (int) Db::get()->lastInsertId();
    }

    /** @param array<string, mixed> $row column => new value */
    public function update(int $idSite, string $key, array $row): void
    {
        if ($row === []) {
            return;
        }
        $set = implode(', ', array_map(static fn(string $c): string => "`$c` = ?", array_keys($row)));
        Db::query(
            sprintf('UPDATE %s SET %s WHERE idsite = ? AND campaign_hash = ?', self::tableName(), $set),
            array_merge(array_values($row), [$idSite, CampaignKey::hash($key)])
        );
    }

    public function deleteSite(int $idSite): void
    {
        Db::query('DELETE FROM ' . self::tableName() . ' WHERE idsite = ?', [$idSite]);
    }
}
