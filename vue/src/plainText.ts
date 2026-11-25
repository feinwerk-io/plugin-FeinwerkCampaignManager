/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * An API error message as plain text: Matomo's JSON answers carry messages HTML-escaped
 * (&quot; for "), and the pages show them as text. A textarea decodes entities without running
 * anything.
 */
export default function plainText(message: string): string {
  const area = document.createElement('textarea');
  area.innerHTML = message;
  return area.value;
}
