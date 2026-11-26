/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

/**
 * The reasons a connection to Feinwerk Campaigns does not work now (getConnectionStatus.reason),
 * one meaning in every place that shows them (UI review F2, 2026-11-26): the header status line,
 * the admin page, the builder and the connected panel.
 */

/** the admin page's sentence for a reason (translation key without the plugin prefix) */
export const REASON_TEXT: Record<string, string> = {
  trial_ended: 'PlatformExpired',
  connection_lost: 'PlatformLost',
  access_lost: 'PlatformLost',
  blocked: 'PlatformBlocked',
  unreachable: 'PlatformUnreachable',
  internet_disabled: 'PlatformInternetDisabled',
};

/** the header status line's few words for a reason */
export const REASON_SHORT: Record<string, string> = {
  trial_ended: 'PlatformStatusTrialEnded',
  connection_lost: 'PlatformStatusLost',
  access_lost: 'PlatformStatusLost',
  blocked: 'PlatformStatusBlocked',
  unreachable: 'PlatformStatusUnreachable',
  internet_disabled: 'PlatformStatusUnreachable',
};

/** only a revoked or lost connection is mended by connecting again */
export function canReconnect(reason: string): boolean {
  return reason === 'connection_lost' || reason === 'access_lost';
}

/**
 * The API's platform errors lead with their code word ("no_website: ..."), for scripts and AI
 * clients; the pages show the sentence and decide by the code word.
 */
export function splitPlatformError(message: string): { reason: string; text: string } {
  const m = /^([a-z_]+): ([\s\S]*)$/.exec(message);
  return m ? { reason: m[1], text: m[2] } : { reason: '', text: message };
}

/** errors a second try can mend (the platform was busy or did not answer) */
export function isPassing(reason: string): boolean {
  return ['', 'unreachable', 'rate_limited', 'server_error', 'unavailable', 'bad_answer']
    .includes(reason);
}
