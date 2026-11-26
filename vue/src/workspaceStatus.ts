/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { CampaignRow } from './api';

/**
 * A workspace campaign shows its real status in Feinwerk Campaigns, and while it is not live a
 * way to start it there (Peter, 2026-11-26, relayed by CampaignsApp and CampaignsWeb: "ja, b mit
 * ergänzung gilt"). Starting stays in the app, with its start checklist.
 */
export const WORKSPACE_STATUSES = ['draft', 'preparing', 'ready', 'live', 'paused', 'ended', 'archived'];

const STARTABLE = ['draft', 'preparing', 'ready', 'paused'];

/** the translation key of the row's status: the workspace's, else the phase */
export function statusKey(row: CampaignRow): string {
  const status = row.platform ? row.platform.status : '';
  return WORKSPACE_STATUSES.includes(status) ? `WorkspaceStatus_${status}` : `CampaignPhase_${row.phase}`;
}

/** the app link where the campaign is started, '' when it is live, ended or not in the workspace */
export function startUrl(row: CampaignRow): string {
  const p = row.platform;
  return p && p.appUrl && STARTABLE.includes(p.status) ? p.appUrl : '';
}
