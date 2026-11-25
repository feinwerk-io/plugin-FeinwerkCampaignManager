/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { MatomoUrl, Periods } from 'CoreHome';

function shortDate(day: string): string {
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(document.documentElement.lang || undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
  });
}

/** "Numbers for <the period selected above>", with Matomo's own wording of the period */
export default function scopeText(tr: (key: string, ...args: string[]) => string): string {
  const url = MatomoUrl.parsed.value;
  let period = `${url.date || ''}`;
  try {
    if (`${url.period}` === 'range' && /^\d{4}-\d{2}-\d{2},\d{4}-\d{2}-\d{2}$/.test(period)) {
      // Matomo's range string starts with "From": the sentence names the two days itself
      const [from, to] = period.split(',');
      period = tr('PeriodRange', shortDate(from), shortDate(to));
    } else {
      period = Periods.parse(`${url.period || 'day'}`, `${url.date || 'today'}`).getPrettyString();
    }
  } catch (e) {
    // the raw date then
  }
  return url.segment ? tr('NumbersForSegment', period) : tr('NumbersFor', period);
}
