<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Model;

use Piwik\Db;
use Piwik\Plugins\FeinwerkCampaignManager\Dao\LinkDao;
use Piwik\Plugins\FeinwerkCampaignManager\Http\InvalidInputException;
use Piwik\Plugins\FeinwerkCampaignManager\Http\NotFoundException;
use Piwik\Plugins\FeinwerkCampaignManager\Link\CheckedLink;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fields;
use Piwik\Plugins\FeinwerkCampaignManager\Link\Fingerprint;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkCheck;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkCode;
use Piwik\Plugins\FeinwerkCampaignManager\Link\LinkStatus;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ValueNormalizer;

/**
 * Checks, saves, changes and archives the saved links of a website. Access is checked by the API before any call.
 */
class LinkService
{
    public const STATUSES = ['active', 'archived', 'all'];
    public const NOTE_MAX_LENGTH = 1000;

    public function __construct(
        private LinkDao $dao,
        private InstanceContext $context,
        private Messages $messages,
        private LinkLiveDetector $detector,
        private Today $today
    ) {
    }

    /**
     * @param array<string, string> $values field => value as typed
     * @param int $exceptIdLink the saved link being changed (its own link ID is no conflict), 0 for a new link
     * @throws InvalidInputException for an unknown parameter set
     */
    public function check(int $idSite, string $targetUrl, string $setKey, array $values, int $exceptIdLink = 0): CheckedLink
    {
        $known = [];
        foreach ($this->dao->knownValues($idSite) as $field => $counts) {
            $known[$field] = array_map('strval', array_keys($counts));
        }
        $check = new LinkCheck(
            $this->context->parameterSets(),
            $this->context->siteUrls($idSite),
            $known,
            $this->context->lowercaseValues($idSite)
        );
        try {
            $checked = $check->check($targetUrl, $setKey, $values);
        } catch (\InvalidArgumentException $e) {
            throw new InvalidInputException($this->messages->invalidParameterSet($setKey, array_keys($this->context->parameterSets()->available())));
        }
        // a typed link ID another saved link already carries: Matomo counts both links' visits under one ID
        $id = $checked->values[Fields::ID];
        if ($id !== '' && $checked->url !== null) {
            $others = $this->dao->countOthersWithId($idSite, $id, $exceptIdLink, Fingerprint::of($idSite, $checked->url));
            if ($others > 0) {
                $checked = $checked->withWarning(Fields::ID, 'id_in_use', ['value' => $id, 'links' => $others]);
            }
        }
        return $checked;
    }

    /** the saved link with the same URL on this website, if any */
    public function findSame(int $idSite, CheckedLink $link): ?array
    {
        return $link->url === null ? null : $this->dao->findByFingerprint($idSite, Fingerprint::of($idSite, $link->url));
    }

    /**
     * Saves a link, or returns the saved link with the same URL.
     *
     * @return array{row: array, existed: bool, checked: CheckedLink}
     * @throws InvalidInputException when the link has errors or the dates or the note are invalid
     */
    public function add(int $idSite, string $targetUrl, string $setKey, array $values, string $startDate, string $endDate, string $note, string $login, string $now): array
    {
        $checked = $this->check($idSite, $targetUrl, $setKey, $values);
        $this->assertValid($checked);
        [$startDate, $endDate] = $this->dates($startDate, $endDate);
        $note = $this->note($note);

        $fingerprint = Fingerprint::of($idSite, (string) $checked->url);
        $same = $this->dao->findByFingerprint($idSite, $fingerprint);
        if ($same !== null) {
            return ['row' => $same, 'existed' => true, 'checked' => $checked];
        }

        $generated = false;
        if ($checked->values[Fields::ID] === '' && $this->context->isMcrActive()) {
            $checked = $checked->withValue(Fields::ID, LinkCode::generate());
            $generated = true;
        }

        $row = $this->row($checked, $generated) + [
            'idsite' => $idSite,
            'fingerprint' => $fingerprint,
            'start_date' => $startDate,
            'end_date' => $endDate,
            'note' => $note,
            'created_by' => $login,
            'created_at' => $now,
            'updated_by' => $login,
            'updated_at' => $now,
            'archived_at' => null,
        ];
        try {
            $idLink = $this->dao->insert($row);
        } catch (\Exception $e) {
            // two requests saving the same link at once: the unique key keeps one, the other returns it
            $same = Db::get()->isErrNo($e, '1062') ? $this->dao->findByFingerprint($idSite, $fingerprint) : null;
            if ($same === null) {
                throw $e;
            }
            return ['row' => $same, 'existed' => true, 'checked' => $checked];
        }
        return ['row' => $this->get($idSite, $idLink), 'existed' => false, 'checked' => $checked];
    }

    /**
     * Changes a saved link; null keeps a value, '' clears it (campaign and target URL cannot be cleared). A live or
     * ended link (LinkStatus) keeps its target, parameter set and values: a changed one is refused, and only note and
     * dates are written, without building the link again (a changed instance setting must not touch a live URL).
     *
     * @param array<string, string|null> $values field => new value or null
     * @return array{row: array, checked: ?CheckedLink} checked: null for a live link (nothing was built)
     */
    public function update(int $idSite, int $idLink, ?string $targetUrl, ?string $setKey, array $values, ?string $startDate, ?string $endDate, ?string $note, string $login, string $now): array
    {
        $current = $this->detector->refresh($idSite, [$this->get($idSite, $idLink)], $now)[0];
        if (LinkStatus::isLocked(LinkLiveDetector::status($current, $this->today->forSite($idSite)))) {
            $changed = $this->lockedChanges($idSite, $current, $targetUrl, $setKey, $values);
            if ($changed !== []) {
                throw new InvalidInputException($this->messages->linkIsLive($idLink, $changed));
            }
            [$start, $end] = $this->dates(
                $startDate ?? (string) ($current['start_date'] ?? ''),
                $endDate ?? (string) ($current['end_date'] ?? '')
            );
            $this->dao->update($idSite, $idLink, [
                'start_date' => $start,
                'end_date' => $end,
                'note' => $note === null ? $current['note'] : $this->note($note),
                'updated_by' => $login,
                'updated_at' => $now,
            ] + (($current['live_at'] ?? null) === null ? [
                // live by its start date so far: written now, so it stays live when the dates change
                'live_at' => $now,
                'live_since' => (string) $current['start_date'],
                'live_reason' => LinkStatus::REASON_START,
            ] : []));
            return ['row' => $this->get($idSite, $idLink), 'checked' => null];
        }

        $merged = [];
        foreach (LinkDao::VALUE_COLUMNS as $field => $column) {
            $merged[$field] = array_key_exists($field, $values) && $values[$field] !== null ? $values[$field] : (string) $current[$column];
        }
        $generated = (bool) $current['campaign_id_generated'];
        $givenId = $values[Fields::ID] ?? null;
        // a given ID replaces a generated one, unless it is that generated ID sent back unchanged (the builder sends
        // every field); '' clears it
        if ($givenId !== null && !($generated && trim($givenId) === (string) $current['campaign_id'])) {
            $generated = false;
        }
        $generatedId = $generated ? $merged[Fields::ID] : '';
        if ($generated) {
            $merged[Fields::ID] = '';
        }

        $checked = $this->check($idSite, $targetUrl ?? (string) $current['target_url'], $setKey ?? (string) $current['parameter_set'], $merged, $idLink);
        $this->assertValid($checked);
        [$start, $end] = $this->dates(
            $startDate ?? (string) ($current['start_date'] ?? ''),
            $endDate ?? (string) ($current['end_date'] ?? '')
        );

        $fingerprint = Fingerprint::of($idSite, (string) $checked->url);
        $same = $this->dao->findByFingerprint($idSite, $fingerprint);
        if ($same !== null && (int) $same['idlink'] !== $idLink) {
            throw new InvalidInputException($this->messages->sameLinkExists((int) $same['idlink']));
        }
        if ($generated) {
            $checked = $checked->withValue(Fields::ID, $generatedId);
        }

        $this->dao->update($idSite, $idLink, $this->row($checked, $generated) + [
            'fingerprint' => $fingerprint,
            'start_date' => $start,
            'end_date' => $end,
            'note' => $note === null ? $current['note'] : $this->note($note),
            'updated_by' => $login,
            'updated_at' => $now,
        ]);
        return ['row' => $this->get($idSite, $idLink), 'checked' => $checked];
    }

    /** Marks a saved link live by hand; a live link stays as it is */
    public function markLive(int $idSite, int $idLink, string $login, string $now): array
    {
        $current = $this->get($idSite, $idLink);
        if (($current['live_at'] ?? null) === null) {
            $this->dao->update($idSite, $idLink, [
                'live_at' => $now,
                'live_since' => $this->today->forSite($idSite),
                'live_reason' => LinkStatus::REASON_MANUAL,
                'updated_by' => $login,
                'updated_at' => $now,
            ]);
        }
        return $this->get($idSite, $idLink);
    }

    /**
     * The parameters a change of a live link would alter, compared with the stored values after cleaning (a value
     * sent back unchanged is no change; with lower case values on, neither is a different case).
     *
     * @return list<string> API parameter names
     */
    private function lockedChanges(int $idSite, array $current, ?string $targetUrl, ?string $setKey, array $values): array
    {
        $changed = [];
        if ($targetUrl !== null && trim($targetUrl) !== (string) $current['target_url']) {
            $changed[] = 'targetUrl';
        }
        if ($setKey !== null && trim($setKey) !== (string) $current['parameter_set']) {
            $changed[] = 'parameterSet';
        }
        $lowercase = $this->context->lowercaseValues($idSite);
        foreach (LinkDao::VALUE_COLUMNS as $field => $column) {
            if (!array_key_exists($field, $values) || $values[$field] === null) {
                continue;
            }
            $given = ValueNormalizer::normalize($values[$field], false);
            $stored = (string) $current[$column];
            if ($given === $stored || ($lowercase && mb_strtolower($given, 'UTF-8') === $stored)) {
                continue;
            }
            $changed[] = $field;
        }
        return $changed;
    }

    public function setArchived(int $idSite, int $idLink, bool $archived, string $login, string $now): array
    {
        $current = $this->get($idSite, $idLink);
        if (($current['archived_at'] !== null) !== $archived) {
            $this->dao->update($idSite, $idLink, [
                'archived_at' => $archived ? $now : null,
                'updated_by' => $login,
                'updated_at' => $now,
            ]);
        }
        return $this->get($idSite, $idLink);
    }

    /** @throws NotFoundException */
    public function get(int $idSite, int $idLink): array
    {
        $row = $this->dao->get($idSite, $idLink);
        if ($row === null) {
            throw new NotFoundException($this->messages->linkNotFound($idLink, $idSite));
        }
        return $row;
    }

    /** @return array{rows: list<array>, total: int} */
    public function find(int $idSite, string $status, string $search, int $limit, int $offset, ?int $idLink = null): array
    {
        return $this->dao->find($idSite, $status, trim($search), $limit, $offset, $idLink);
    }

    /** @return array<string, array<string, int>> field => [value => links], most used first */
    public function knownValues(int $idSite): array
    {
        return $this->dao->knownValues($idSite);
    }

    private function assertValid(CheckedLink $checked): void
    {
        if (!$checked->isValid()) {
            throw new InvalidInputException($this->messages->errorsAsText($checked->errors, $checked));
        }
    }

    private function row(CheckedLink $checked, bool $generated): array
    {
        $row = [
            'target_url' => $checked->targetUrl,
            'url' => (string) $checked->url,
            'parameter_set' => $checked->set->key(),
            'campaign_id_generated' => $generated ? 1 : 0,
        ];
        foreach (LinkDao::VALUE_COLUMNS as $field => $column) {
            $row[$column] = $checked->values[$field];
        }
        return $row;
    }

    /** @return array{0: ?string, 1: ?string} */
    private function dates(string $start, string $end): array
    {
        $start = trim($start);
        $end = trim($end);
        foreach (['startDate' => $start, 'endDate' => $end] as $param => $date) {
            if ($date !== '' && !self::isDate($date)) {
                throw new InvalidInputException($this->messages->invalidDate($param, $date));
            }
        }
        if ($start !== '' && $end !== '' && $end < $start) {
            throw new InvalidInputException($this->messages->endBeforeStart($start, $end));
        }
        return [$start === '' ? null : $start, $end === '' ? null : $end];
    }

    private static function isDate(string $date): bool
    {
        $parsed = \DateTime::createFromFormat('!Y-m-d', $date, new \DateTimeZone('UTC'));
        return $parsed !== false && $parsed->format('Y-m-d') === $date;
    }

    private function note(string $note): ?string
    {
        $note = trim($note);
        if (mb_strlen($note, 'UTF-8') > self::NOTE_MAX_LENGTH) {
            throw new InvalidInputException($this->messages->noteTooLong(self::NOTE_MAX_LENGTH));
        }
        return $note === '' ? null : $note;
    }
}
