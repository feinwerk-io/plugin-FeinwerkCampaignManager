/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/** a website day (YYYY-MM-DD) as day and month in the page's language: "12.11.", "11/12" */
export default function shortDay(day: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(day);
  if (!m) {
    return day;
  }
  const date = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return date.toLocaleDateString(document.documentElement.lang || undefined, { day: 'numeric', month: 'numeric' });
}
