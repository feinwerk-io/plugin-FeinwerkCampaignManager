<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Db;
use Piwik\Plugin\Manager as PluginManager;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\CampaignKey;
use Piwik\Plugins\FeinwerkCampaignManager\Campaign\Overview;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\CampaignDao;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\NotFoundException;
use Piwik\Plugins\Goals\API as GoalsApi;

/**
 * Campaign details (period, goal, notes per campaign value) and the campaign overview. Access is checked by the API
 * before any call.
 */
class CampaignService
{
    public const GOAL_METRICS = ['none', 'visits', 'conversions', 'revenue'];
    public const TEXT_MAX = 255;
    public const NOTES_MAX = 2000;

    public function __construct(
        private CampaignDao $dao,
        private LinkDao $links,
        private CampaignReports $reports,
        private Today $today,
        private Messages $messages,
        private WorkspaceCampaigns $workspace
    ) {
    }

    /**
     * @param string $status active, archived or all
     * @return list<array> rows of Overview::build
     */
    public function overview(int $idSite, string $period, string $date, string $segment, string $status): array
    {
        $details = $this->domainDetails($idSite);
        $today = $this->today->forSite($idSite);
        [$from, $to] = Overview::window($details, $today);
        return Overview::build(
            $details,
            $this->linkCounts($idSite),
            $this->reports->forPeriod($idSite, $period, $date, $segment),
            $this->reports->daily($idSite, $from, $to, $segment),
            $today,
            $status,
            $this->linkStates($idSite, $today),
            $this->workspace->forSite($idSite)
        );
    }

    /**
     * @throws NotFoundException when the value has no details, no workspace campaign, no active saved link and no visits
     *         in the period
     */
    public function one(int $idSite, string $campaign, string $period, string $date, string $segment): array
    {
        $key = $this->key($campaign);
        $details = array_intersect_key($this->domainDetails($idSite), [$key => true]);
        $links = array_intersect_key($this->linkCounts($idSite), [$key => true]);
        $numbers = array_intersect_key($this->reports->forPeriod($idSite, $period, $date, $segment), [$key => true]);
        $today = $this->today->forSite($idSite);
        [$from, $to] = Overview::window($details, $today);
        $daily = $this->reports->daily($idSite, $from, $to, $segment);
        $states = array_intersect_key($this->linkStates($idSite, $today), [$key => true]);
        $workspace = array_intersect_key($this->workspace->forSite($idSite), [$key => true]);
        foreach (Overview::build($details, $links, $numbers, $daily, $today, 'all', $states, $workspace) as $row) {
            if ($row['campaign'] === $key) {
                return $row;
            }
        }
        throw new NotFoundException($this->messages->campaignNotFound($key, $idSite));
    }

    /** @throws NotFoundException */
    public function details(int $idSite, string $campaign): array
    {
        $key = $this->key($campaign);
        $row = $this->dao->get($idSite, $key);
        if ($row === null) {
            throw new NotFoundException($this->messages->campaignNotFound($key, $idSite));
        }
        return $row;
    }

    /**
     * Saves details for a campaign value, or returns the saved ones (existed: true) when it has them already.
     *
     * @return array{row: array, existed: bool}
     */
    public function add(int $idSite, string $campaign, string $name, string $startDate, string $endDate, string $goalMetric, $goalTarget, $idGoal, string $notes, string $login, string $now): array
    {
        $key = $this->key($campaign);
        $values = $this->validated($idSite, [
            'name' => $name, 'start_date' => $startDate, 'end_date' => $endDate, 'goal_metric' => $goalMetric,
            'goal_target' => $goalTarget, 'idgoal' => $idGoal, 'notes' => $notes,
        ], null);
        $existing = $this->dao->get($idSite, $key);
        if ($existing !== null) {
            return ['row' => $existing, 'existed' => true];
        }
        try {
            $this->dao->insert($values + [
                'idsite' => $idSite, 'campaign' => $key, 'created_by' => $login, 'created_at' => $now,
                'updated_by' => $login, 'updated_at' => $now, 'archived_at' => null,
            ]);
        } catch (\Exception $e) {
            $existing = Db::get()->isErrNo($e, '1062') ? $this->dao->get($idSite, $key) : null;
            if ($existing === null) {
                throw $e;
            }
            return ['row' => $existing, 'existed' => true];
        }
        return ['row' => $this->details($idSite, $key), 'existed' => false];
    }

    /**
     * Changes the details of a campaign: null keeps a value, '' clears it.
     *
     * @param array<string, mixed> $changes name, start_date, end_date, goal_metric, goal_target, idgoal, notes => value or null
     */
    public function update(int $idSite, string $campaign, array $changes, string $login, string $now): array
    {
        $current = $this->details($idSite, $campaign);
        $merged = [];
        foreach (['name', 'start_date', 'end_date', 'goal_metric', 'goal_target', 'idgoal', 'notes'] as $column) {
            $merged[$column] = array_key_exists($column, $changes) && $changes[$column] !== null
                ? $changes[$column]
                : $current[$column];
        }
        $values = $this->validated($idSite, $merged, $current);
        $this->dao->update($idSite, (string) $current['campaign'], $values + ['updated_by' => $login, 'updated_at' => $now]);
        return $this->details($idSite, (string) $current['campaign']);
    }

    public function setArchived(int $idSite, string $campaign, bool $archived, string $login, string $now): array
    {
        $current = $this->details($idSite, $campaign);
        if (($current['archived_at'] !== null) !== $archived) {
            $this->dao->update($idSite, (string) $current['campaign'], [
                'archived_at' => $archived ? $now : null, 'updated_by' => $login, 'updated_at' => $now,
            ]);
        }
        return $this->details($idSite, (string) $current['campaign']);
    }

    /**
     * What a new website still lacks for campaign work.
     *
     * @return array{complete: bool, items: list<array{key: string, done: bool, count: int}>}
     */
    public function checklist(int $idSite): array
    {
        $goals = 0;
        try {
            $goals = count((array) GoalsApi::getInstance()->getGoals($idSite));
        } catch (\Throwable $e) {
            $goals = 0;
        }
        $links = array_sum($this->linkCounts($idSite));
        $details = 0;
        foreach ($this->dao->all($idSite) as $row) {
            if ($row['archived_at'] === null) {
                $details++;
            }
        }
        $mcr = PluginManager::getInstance()->isPluginActivated(InstanceContext::MCR) ? 1 : 0;
        // Marketing Campaigns Reporting is recommended, not required (Peter, 2026-11-24): the checklist is complete without it
        $items = [
            ['key' => 'goals', 'done' => $goals > 0, 'count' => $goals, 'required' => true],
            ['key' => 'marketing_campaigns_reporting', 'done' => $mcr === 1, 'count' => $mcr, 'required' => false],
            ['key' => 'saved_link', 'done' => $links > 0, 'count' => $links, 'required' => true],
            ['key' => 'campaign_details', 'done' => $details > 0, 'count' => $details, 'required' => true],
        ];
        $complete = true;
        foreach ($items as $item) {
            if ($item['required'] && !$item['done']) {
                $complete = false;
            }
        }
        return ['complete' => $complete, 'items' => $items];
    }

    /** @return array<string, array> key => the details as Overview reads them */
    private function domainDetails(int $idSite): array
    {
        $out = [];
        foreach ($this->dao->all($idSite) as $row) {
            $out[(string) $row['campaign']] = [
                'name' => $row['name'] === null ? null : (string) $row['name'],
                'startDate' => $row['start_date'] === null ? null : (string) $row['start_date'],
                'endDate' => $row['end_date'] === null ? null : (string) $row['end_date'],
                'goalMetric' => (string) $row['goal_metric'],
                'goalTarget' => $row['goal_target'] === null ? null : (float) $row['goal_target'],
                'idGoal' => $row['idgoal'] === null ? null : (int) $row['idgoal'],
                'notes' => $row['notes'] === null ? null : (string) $row['notes'],
                'archived' => $row['archived_at'] !== null,
            ];
        }
        return $out;
    }

    /** @return array<string, int> key => active saved links */
    private function linkCounts(int $idSite): array
    {
        $out = [];
        foreach ($this->links->knownValues($idSite)['campaign'] ?? [] as $value => $count) {
            $key = CampaignKey::of((string) $value);
            if ($key !== '') {
                $out[$key] = ($out[$key] ?? 0) + (int) $count;
            }
        }
        return $out;
    }

    /** @return array<string, array{draft: int, live: int, ended: int}> key => active saved links per status */
    private function linkStates(int $idSite, string $today): array
    {
        $out = [];
        foreach ($this->links->statusValues($idSite) as $row) {
            $key = CampaignKey::of((string) $row['campaign']);
            if ($key === '') {
                continue;
            }
            $out[$key] = $out[$key] ?? ['draft' => 0, 'live' => 0, 'ended' => 0];
            $out[$key][LinkLiveDetector::status($row, $today)]++;
        }
        return $out;
    }

    private function key(string $campaign): string
    {
        $key = CampaignKey::of($campaign);
        if ($key === '') {
            throw new InvalidInputException($this->messages->campaignRequired());
        }
        if (mb_strlen($key, 'UTF-8') > self::TEXT_MAX) {
            throw new InvalidInputException($this->messages->textTooLong('campaign', self::TEXT_MAX));
        }
        return $key;
    }

    /**
     * @param array<string, mixed> $v name, start_date, end_date, goal_metric, goal_target, idgoal, notes
     * @return array<string, mixed> the columns to store
     */
    private function validated(int $idSite, array $v, ?array $current): array
    {
        $name = trim((string) $v['name']);
        if (mb_strlen($name, 'UTF-8') > self::TEXT_MAX) {
            throw new InvalidInputException($this->messages->textTooLong('name', self::TEXT_MAX));
        }
        $notes = trim((string) $v['notes']);
        if (mb_strlen($notes, 'UTF-8') > self::NOTES_MAX) {
            throw new InvalidInputException($this->messages->textTooLong('notes', self::NOTES_MAX));
        }
        $start = trim((string) $v['start_date']);
        $end = trim((string) $v['end_date']);
        foreach (['startDate' => $start, 'endDate' => $end] as $param => $date) {
            if ($date !== '' && !self::isDate($date)) {
                throw new InvalidInputException($this->messages->invalidDate($param, $date));
            }
        }
        if ($start !== '' && $end !== '' && $end < $start) {
            throw new InvalidInputException($this->messages->endBeforeStart($start, $end));
        }
        $metric = trim((string) $v['goal_metric']);
        $metric = $metric === '' ? 'none' : $metric;
        if (!in_array($metric, self::GOAL_METRICS, true)) {
            throw new InvalidInputException($this->messages->invalidValue('goalMetric', $metric, self::GOAL_METRICS));
        }
        $target = $v['goal_target'];
        $target = $target === null || trim((string) $target) === '' ? null : trim((string) $target);
        if ($target !== null && (!is_numeric($target) || (float) $target < 0 || (float) $target > 1e15)) {
            throw new InvalidInputException($this->messages->notANumberAtLeastZero('goalTarget', (string) $target));
        }
        $idGoal = $v['idgoal'];
        $idGoal = $idGoal === null || trim((string) $idGoal) === '' ? null : trim((string) $idGoal);
        if ($idGoal !== null) {
            if (!preg_match('/^\d{1,9}$/', $idGoal) || !in_array((int) $idGoal, $this->goalIds($idSite), true)) {
                throw new InvalidInputException($this->messages->invalidValue('idGoal', $idGoal, array_map('strval', $this->goalIds($idSite))));
            }
        }
        if ($metric === 'none') {
            $target = null;
            $idGoal = null;
        } elseif ($metric === 'visits') {
            $idGoal = null;
        }
        return [
            'name' => $name === '' ? null : $name,
            'start_date' => $start === '' ? null : $start,
            'end_date' => $end === '' ? null : $end,
            'goal_metric' => $metric,
            'goal_target' => $target === null ? null : round((float) $target, 2),
            'idgoal' => $idGoal === null ? null : (int) $idGoal,
            'notes' => $notes === '' ? null : $notes,
        ];
    }

    /** @return int[] */
    private function goalIds(int $idSite): array
    {
        try {
            return array_map('intval', array_column((array) GoalsApi::getInstance()->getGoals($idSite), 'idgoal'));
        } catch (\Throwable $e) {
            return [];
        }
    }

    private static function isDate(string $date): bool
    {
        $parsed = \DateTime::createFromFormat('!Y-m-d', $date, new \DateTimeZone('UTC'));
        return $parsed !== false && $parsed->format('Y-m-d') === $date;
    }
}
