<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Campaign;

use Piwik\Plugins\FeinwerkCampaignManager\Link\NearDuplicates;
use Piwik\Plugins\FeinwerkCampaignManager\Link\ValueNormalizer;

/**
 * Groups campaign values that Matomo counts apart although they probably mean one campaign: the same after folding case
 * and separators, or one typing error apart (only for values long enough, NearDuplicates::MIN_LENGTH_FOR_TYPOS), joined
 * transitively. Pure: the caller brings the values with their visits and saved links.
 */
final class SpellingGroups
{
    /**
     * @param array<string, array{visits: int, conversions: int, savedLinks: int, hasDetails: bool}> $values value =>
     *        numbers (values as Matomo and the links carry them, already cleaned)
     * @return list<array{suggested: string, visits: int, values: list<array{value: string, visits: int,
     *         conversions: int, savedLinks: int, hasDetails: bool}>}> groups of two or more values, most visits first;
     *         values in a group: the suggested spelling first, then by visits
     */
    public static function of(array $values): array
    {
        $keys = array_map('strval', array_keys($values));
        $folded = [];
        foreach ($keys as $value) {
            $folded[$value] = ValueNormalizer::fold($value);
        }
        $parent = array_combine($keys, $keys) ?: [];
        $find = static function (string $v) use (&$parent): string {
            while ($parent[$v] !== $v) {
                $parent[$v] = $parent[$parent[$v]];
                $v = $parent[$v];
            }
            return $v;
        };

        // the same fold: one pass by key
        $byFold = [];
        foreach ($folded as $value => $fold) {
            if ($fold === '') {
                continue;
            }
            if (isset($byFold[$fold])) {
                $parent[$find($value)] = $find($byFold[$fold]);
            } else {
                $byFold[$fold] = $value;
            }
        }
        // one edit apart: only between distinct folds long enough; candidates from a deletion index (two strings one
        // edit apart share a string with one character left out), so the work grows with the values, not their pairs
        $index = [];
        foreach (array_keys($byFold) as $fold) {
            $fold = (string) $fold;
            $chars = preg_split('//u', $fold, -1, PREG_SPLIT_NO_EMPTY) ?: [];
            if (count($chars) < NearDuplicates::MIN_LENGTH_FOR_TYPOS) {
                continue;
            }
            $index[$fold][] = $fold;
            foreach (array_keys($chars) as $i) {
                $deleted = $chars;
                unset($deleted[$i]);
                $index[implode('', $deleted)][] = $fold;
            }
        }
        foreach ($index as $bucket) {
            $bucket = array_values(array_unique($bucket));
            $size = count($bucket);
            for ($i = 0; $i < $size; $i++) {
                for ($j = $i + 1; $j < $size; $j++) {
                    if (self::oneTypoApart($bucket[$i], $bucket[$j])) {
                        $parent[$find($byFold[$bucket[$i]])] = $find($byFold[$bucket[$j]]);
                    }
                }
            }
        }

        $groups = [];
        foreach ($keys as $value) {
            $groups[$find($value)][] = $value;
        }
        $out = [];
        foreach ($groups as $members) {
            if (count($members) < 2) {
                continue;
            }
            $rows = [];
            foreach ($members as $value) {
                $n = $values[$value];
                $rows[] = [
                    // a value of digits only is an int key in PHP: the API answers text, always
                    'value' => (string) $value,
                    'visits' => (int) $n['visits'],
                    'conversions' => (int) $n['conversions'],
                    'savedLinks' => (int) $n['savedLinks'],
                    'hasDetails' => (bool) $n['hasDetails'],
                ];
            }
            usort($rows, static function (array $a, array $b): int {
                return [$b['savedLinks'], $b['visits'], mb_strlen($a['value'], 'UTF-8'), $a['value']]
                    <=> [$a['savedLinks'], $a['visits'], mb_strlen($b['value'], 'UTF-8'), $b['value']];
            });
            $out[] = [
                'suggested' => $rows[0]['value'],
                'visits' => array_sum(array_column($rows, 'visits')),
                'values' => $rows,
            ];
        }
        usort($out, static fn(array $a, array $b): int => [$b['visits'], $a['suggested']] <=> [$a['visits'], $b['suggested']]);
        return $out;
    }

    /**
     * One insertion, deletion or substitution apart, where the differing characters are no digits: "2025" and "2026"
     * or "sommer1" and "sommer2" are different campaigns, not typing errors.
     */
    private static function oneTypoApart(string $a, string $b): bool
    {
        $a = preg_split('//u', $a, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $b = preg_split('//u', $b, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        if (count($a) > count($b)) {
            [$a, $b] = [$b, $a];
        }
        $la = count($a);
        $lb = count($b);
        if ($lb - $la > 1 || $a === $b) {
            return false;
        }
        $i = 0;
        while ($i < $la && $a[$i] === $b[$i]) {
            $i++;
        }
        if ($la === $lb) {
            return array_slice($a, $i + 1) === array_slice($b, $i + 1) && !ctype_digit($a[$i]) && !ctype_digit($b[$i]);
        }
        return array_slice($a, $i) === array_slice($b, $i + 1) && !ctype_digit($b[$i]);
    }
}
