<?php

/**
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

namespace Piwik\Plugins\FeinwerkCampaignManager\Link;

/**
 * Finds a known value that a new value is probably meant to be ("Newsletter" when "newsletter" exists).
 */
final class NearDuplicates
{
    /** folded values shorter than this need an exact fold match; longer ones may be one edit away */
    public const MIN_LENGTH_FOR_TYPOS = 6;

    /**
     * @param string[] $known the values already in use, most used first
     * @return string|null the known spelling, or null when the value is the most used of its spellings or close to
     *                     nothing; a value that is known but rarer than a close spelling gets that spelling
     */
    public static function find(string $value, array $known): ?string
    {
        if ($value === '') {
            return null;
        }
        $known = array_values(array_map('strval', $known));
        $position = array_search($value, $known, true);
        if ($position !== false) {
            // only spellings used more often than this one count
            $known = array_slice($known, 0, (int) $position);
        }
        $folded = ValueNormalizer::fold($value);
        if ($folded === '') {
            return null;
        }

        foreach ($known as $candidate) {
            if (ValueNormalizer::fold((string) $candidate) === $folded) {
                return (string) $candidate;
            }
        }

        if (mb_strlen($folded, 'UTF-8') < self::MIN_LENGTH_FOR_TYPOS) {
            return null;
        }
        foreach ($known as $candidate) {
            $other = ValueNormalizer::fold((string) $candidate);
            if (mb_strlen($other, 'UTF-8') >= self::MIN_LENGTH_FOR_TYPOS && self::oneEditApart($folded, $other)) {
                return (string) $candidate;
            }
        }
        return null;
    }

    /** whether one insertion, deletion or substitution turns one string into the other (multibyte safe) */
    private static function oneEditApart(string $a, string $b): bool
    {
        $a = preg_split('//u', $a, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $b = preg_split('//u', $b, -1, PREG_SPLIT_NO_EMPTY) ?: [];
        $la = count($a);
        $lb = count($b);
        if (abs($la - $lb) > 1 || $a === $b) {
            return false;
        }
        if ($la > $lb) {
            [$a, $b, $la, $lb] = [$b, $a, $lb, $la];
        }
        $i = 0;
        while ($i < $la && $a[$i] === $b[$i]) {
            $i++;
        }
        // a changed digit is another campaign (newsletter_2026_11, newsletter_2026_12), not a typing error
        if ($la === $lb) {
            return array_slice($a, $i + 1) === array_slice($b, $i + 1) && !ctype_digit($a[$i]) && !ctype_digit($b[$i]);
        }
        return array_slice($a, $i) === array_slice($b, $i + 1) && !ctype_digit($b[$i]);
    }
}
