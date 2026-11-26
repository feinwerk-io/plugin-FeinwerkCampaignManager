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

/**
 * The saved links, table fw_campaigns_link: one row per link and website, unique by (idsite, fingerprint). Links are
 * archived, never deleted, except when their website is deleted or the plugin is uninstalled.
 */
class LinkDao
{
    public const TABLE = 'fw_campaigns_link';

    /** field key (Link\Fields) => column */
    public const VALUE_COLUMNS = [
        'campaign' => 'campaign',
        'source' => 'source',
        'medium' => 'medium',
        'keyword' => 'keyword',
        'content' => 'content',
        'campaignId' => 'campaign_id',
        'group' => 'campaign_group',
        'placement' => 'placement',
    ];

    /** how many rows the known values are read from at most (the newest) */
    public const KNOWN_VALUES_ROWS = 5000;

    public static function tableName(): string
    {
        return Common::prefixTable(self::TABLE);
    }

    /**
     * The columns of a link made in Feinwerk Campaigns (connected mode, Updates/5.1.0.php): its id there, its campaign
     * there, the short link, whether it has a dynamic QR code, and its page in the app. All empty for local links.
     */
    public const PLATFORM_COLUMNS = [
        'platform_link_id' => 'VARCHAR(40) NULL',
        'platform_campaign_id' => 'VARCHAR(40) NULL',
        'short_url' => 'VARCHAR(255) NULL',
        'platform_qr' => 'TINYINT(1) NOT NULL DEFAULT 0',
        'platform_app_url' => 'VARCHAR(255) NULL',
    ];

    public function install(): void
    {
        // createTable ignores "table exists", so install() can run again
        DbHelper::createTable(self::TABLE, "
            `idlink` INT UNSIGNED NOT NULL AUTO_INCREMENT,
            `idsite` INT UNSIGNED NOT NULL,
            `fingerprint` CHAR(40) NOT NULL,
            `target_url` TEXT NOT NULL,
            `url` TEXT NOT NULL,
            `parameter_set` VARCHAR(10) NOT NULL,
            `campaign` VARCHAR(255) NOT NULL,
            `source` VARCHAR(255) NOT NULL DEFAULT '',
            `medium` VARCHAR(255) NOT NULL DEFAULT '',
            `keyword` VARCHAR(255) NOT NULL DEFAULT '',
            `content` VARCHAR(255) NOT NULL DEFAULT '',
            `campaign_id` VARCHAR(255) NOT NULL DEFAULT '',
            `campaign_group` VARCHAR(255) NOT NULL DEFAULT '',
            `placement` VARCHAR(255) NOT NULL DEFAULT '',
            `campaign_id_generated` TINYINT(1) NOT NULL DEFAULT 0,
            `start_date` DATE NULL,
            `end_date` DATE NULL,
            `note` TEXT NULL,
            `created_by` VARCHAR(100) NOT NULL,
            `created_at` DATETIME NOT NULL,
            `updated_by` VARCHAR(100) NOT NULL,
            `updated_at` DATETIME NOT NULL,
            `archived_at` DATETIME NULL,
            `live_at` DATETIME NULL,
            `live_since` DATE NULL,
            `live_reason` VARCHAR(10) NULL,
            `platform_link_id` VARCHAR(40) NULL,
            `platform_campaign_id` VARCHAR(40) NULL,
            `short_url` VARCHAR(255) NULL,
            `platform_qr` TINYINT(1) NOT NULL DEFAULT 0,
            `platform_app_url` VARCHAR(255) NULL,
            PRIMARY KEY (`idlink`),
            UNIQUE KEY `fw_site_fingerprint` (`idsite`, `fingerprint`),
            KEY `fw_site_campaign` (`idsite`, `campaign`(150))
        ");
    }

    public function uninstall(): void
    {
        Db::dropTables([self::tableName()]);
    }

    /**
     * @param array<string, mixed> $row column => value, without idlink
     * @return int the new idlink
     */
    public function insert(array $row): int
    {
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
    public function update(int $idSite, int $idLink, array $row): void
    {
        if ($row === []) {
            return;
        }
        $set = implode(', ', array_map(static fn(string $c): string => "`$c` = ?", array_keys($row)));
        Db::query(
            sprintf('UPDATE %s SET %s WHERE idsite = ? AND idlink = ?', self::tableName(), $set),
            array_merge(array_values($row), [$idSite, $idLink])
        );
    }

    public function get(int $idSite, int $idLink): ?array
    {
        $row = Db::fetchRow('SELECT * FROM ' . self::tableName() . ' WHERE idsite = ? AND idlink = ?', [$idSite, $idLink]);
        return $row ?: null;
    }

    public function findByFingerprint(int $idSite, string $fingerprint): ?array
    {
        $row = Db::fetchRow(
            'SELECT * FROM ' . self::tableName() . ' WHERE idsite = ? AND fingerprint = ?',
            [$idSite, $fingerprint]
        );
        return $row ?: null;
    }

    /**
     * @param string $status active, archived or all
     * @param string $search matched against target URL and every value (case-insensitive, substring)
     * @param int|null $idLink only this link (none when it does not exist)
     * @return array{rows: list<array>, total: int} newest first
     */
    public function find(int $idSite, string $status, string $search, int $limit, int $offset, ?int $idLink = null): array
    {
        [$where, $bind] = $this->filter($idSite, $status, $search);
        if ($idLink !== null) {
            $where .= ' AND idlink = ?';
            $bind[] = $idLink;
        }
        $total = (int) Db::fetchOne('SELECT COUNT(*) FROM ' . self::tableName() . ' WHERE ' . $where, $bind);
        $rows = Db::fetchAll(
            sprintf(
                'SELECT * FROM %s WHERE %s ORDER BY updated_at DESC, idlink DESC LIMIT %d OFFSET %d',
                self::tableName(),
                $where,
                max(0, $limit),
                max(0, $offset)
            ),
            $bind
        );
        return ['rows' => $rows, 'total' => $total];
    }

    /**
     * The values the website's active links use, per field, with how many links use each.
     *
     * @return array<string, array<string, int>> field key => [value => links], most used first
     */
    /**
     * Active saved links with this link ID, other than the given link and the link with the given fingerprint (the same
     * link saved again).
     */
    public function countOthersWithId(int $idSite, string $campaignId, int $exceptIdLink, string $exceptFingerprint): int
    {
        return (int) Db::fetchOne(
            'SELECT COUNT(*) FROM ' . self::tableName()
            . ' WHERE idsite = ? AND campaign_id = ? AND archived_at IS NULL AND idlink <> ? AND fingerprint <> ?',
            [$idSite, $campaignId, $exceptIdLink, $exceptFingerprint]
        );
    }

    public function knownValues(int $idSite): array
    {
        $rows = Db::fetchAll(
            sprintf(
                'SELECT %s FROM %s WHERE idsite = ? AND archived_at IS NULL ORDER BY updated_at DESC LIMIT %d',
                implode(', ', array_map(static fn(string $c): string => "`$c`", self::VALUE_COLUMNS)),
                self::tableName(),
                self::KNOWN_VALUES_ROWS
            ),
            [$idSite]
        );
        $known = array_fill_keys(array_keys(self::VALUE_COLUMNS), []);
        foreach ($rows as $row) {
            foreach (self::VALUE_COLUMNS as $field => $column) {
                $value = (string) $row[$column];
                if ($value !== '') {
                    $known[$field][$value] = ($known[$field][$value] ?? 0) + 1;
                }
            }
        }
        foreach ($known as &$values) {
            arsort($values);
        }
        return $known;
    }

    /**
     * Campaign, keyword and link ID of the website's active links (the newest KNOWN_VALUES_ROWS), to count how many
     * links share one report row.
     *
     * @return list<array{campaign: string, keyword: string, campaign_id: string}>
     */
    public function basisValues(int $idSite): array
    {
        return Db::fetchAll(
            sprintf(
                'SELECT campaign, keyword, campaign_id FROM %s WHERE idsite = ? AND archived_at IS NULL ORDER BY updated_at DESC LIMIT %d',
                self::tableName(),
                self::KNOWN_VALUES_ROWS
            ),
            [$idSite]
        );
    }

    /**
     * The active links whose campaign value is the given key (CampaignKey): the index finds the candidates, the key
     * decides (the column's collation may also match other accents).
     *
     * @return list<array> newest change first
     */
    public function activeByCampaign(int $idSite, string $key): array
    {
        $rows = Db::fetchAll(
            'SELECT * FROM ' . self::tableName() . ' WHERE idsite = ? AND campaign = ? AND archived_at IS NULL ORDER BY updated_at DESC, idlink DESC',
            [$idSite, $key]
        );
        return array_values(array_filter(
            $rows,
            static fn(array $row): bool => \Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey::of((string) $row['campaign']) === $key
        ));
    }

    /**
     * Marks links live in one statement, each since its own day; links already live keep theirs.
     *
     * @param array<int, string> $since idLink => YYYY-MM-DD (the website's day it went live)
     * @param string $reason manual, start or visit (LinkStatus::REASONS)
     */
    public function markLive(int $idSite, array $since, string $reason, string $now): void
    {
        if ($since === []) {
            return;
        }
        $case = [];
        $bind = [$now, $reason];
        foreach ($since as $idLink => $day) {
            $case[] = 'WHEN ? THEN ?';
            $bind[] = (int) $idLink;
            $bind[] = $day;
        }
        $bind[] = $idSite;
        foreach (array_keys($since) as $idLink) {
            $bind[] = (int) $idLink;
        }
        Db::query(
            sprintf(
                'UPDATE %s SET live_at = ?, live_reason = ?, live_since = CASE idlink %s END WHERE idsite = ? AND live_at IS NULL AND idlink IN (%s)',
                self::tableName(),
                implode(' ', $case),
                implode(', ', array_fill(0, count($since), '?'))
            ),
            $bind
        );
    }

    /**
     * Campaign and status columns of the website's active links (the newest KNOWN_VALUES_ROWS), to count link states per
     * campaign.
     *
     * @return list<array{campaign: string, live_at: ?string, start_date: ?string, end_date: ?string}>
     */
    public function statusValues(int $idSite): array
    {
        return Db::fetchAll(
            sprintf(
                'SELECT campaign, live_at, start_date, end_date FROM %s WHERE idsite = ? AND archived_at IS NULL ORDER BY updated_at DESC LIMIT %d',
                self::tableName(),
                self::KNOWN_VALUES_ROWS
            ),
            [$idSite]
        );
    }

    public function deleteSite(int $idSite): void
    {
        Db::query('DELETE FROM ' . self::tableName() . ' WHERE idsite = ?', [$idSite]);
    }

    private function filter(int $idSite, string $status, string $search): array
    {
        $where = 'idsite = ?';
        $bind = [$idSite];
        if ($status === 'active') {
            $where .= ' AND archived_at IS NULL';
        } elseif ($status === 'archived') {
            $where .= ' AND archived_at IS NOT NULL';
        }
        if ($search !== '') {
            $like = '%' . addcslashes($search, '%_\\') . '%';
            $columns = array_merge(['target_url', 'note'], array_values(self::VALUE_COLUMNS));
            $where .= ' AND (' . implode(' OR ', array_map(static fn(string $c): string => "`$c` LIKE ?", $columns)) . ')';
            $bind = array_merge($bind, array_fill(0, count($columns), $like));
        }
        return [$where, $bind];
    }
}
