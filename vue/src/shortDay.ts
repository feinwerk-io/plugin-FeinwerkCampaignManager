/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * a website day (YYYY-MM-DD) as day and month in the page's language: "12.11.", "11/12"; with the
 * year when it is not this year ("15.1.2027"), so a future start never reads like a past one
 */
export default function shortDay(day: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!m) {
    return day;
  }
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const otherYear = date.getFullYear() !== new Date().getFullYear();
  return date.toLocaleDateString(document.documentElement.lang || undefined, otherYear
    ? { day: 'numeric', month: 'numeric', year: 'numeric' }
    : { day: 'numeric', month: 'numeric' });
}
