/*!
 * Matomo - free/libre analytics platform
 *
 * @link    https://matomo.org
 * @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later
 */

import { AjaxHelper } from 'CoreHome';

/** the API module; every screen uses only these methods (docs: API.php) */
const MODULE = 'FeinwerkCampaignManager';

export type FieldKey = 'campaign' | 'source' | 'medium' | 'keyword' | 'content'
  | 'campaignId' | 'group' | 'placement';

export const FIELDS: FieldKey[] = [
  'campaign', 'source', 'medium', 'keyword', 'content', 'campaignId', 'group', 'placement',
];

export type Values = Record<FieldKey, string>;

export interface CheckMessage {
  field: string;
  code: string;
  message: string;
  details: Record<string, unknown>;
}

export interface ParameterSet {
  key: string;
  names: Record<FieldKey, string>;
  read: Record<FieldKey, boolean>;
}

export interface ParameterSets {
  sets: ParameterSet[];
  defaultSet: string;
  fields: FieldKey[];
  mcrOnlyFields: FieldKey[];
  mcrActive: boolean;
  lowercaseValues: boolean;
}

export interface Template {
  key: string;
  label: string;
  source: string;
  medium: string;
  sources: string[];
}

export interface Preview {
  valid: boolean;
  url: string | null;
  parameterSet: string;
  params: { field: FieldKey, name: string, value: string }[];
  values: Values;
  errors: CheckMessage[];
  warnings: CheckMessage[];
  existingIdLink: number | null;
  campaignIdOnSave: boolean;
}

export interface Link {
  idLink: number;
  idSite: number;
  url: string;
  targetUrl: string;
  parameterSet: string;
  values: Values;
  campaignIdGenerated: boolean;
  startDate: string | null;
  endDate: string | null;
  note: string | null;
  archived: boolean;
  /** draft: changes freely; live and ended: target and values are locked (updateLink) */
  status: 'draft' | 'live' | 'ended';
  liveAt: string | null;
  /** the website's day it went live (YYYY-MM-DD) */
  liveSince: string | null;
  /**
   * manual (marked live), start (first day of use reached), visit (first visit counted) or platform
   * (made live in Feinwerk Campaigns)
   */
  liveReason: 'manual' | 'start' | 'visit' | 'platform' | null;
  createdBy: string;
  createdAt: string;
  updatedBy: string;
  updatedAt: string;
  archivedAt: string | null;
  /** the link in Feinwerk Campaigns (connected mode), null for links made here */
  platform: {
    id: string;
    campaignId: string | null;
    shortUrl: string | null;
    qr: boolean;
    qrUrl: string | null;
    appUrl: string | null;
  } | null;
}

export interface LinkPage {
  total: number;
  limit: number;
  offset: number;
  links: Link[];
}

export interface Suggestion {
  value: string;
  links: number;
  /** links: a saved link uses it; report: counted by Matomo in the last 30 days (campaign only) */
  source: 'links' | 'report';
  visits: number;
}

export interface LinkForm extends Values {
  targetUrl: string;
  parameterSet: string;
  startDate: string;
  endDate: string;
  note: string;
}

/** the pages show their own error, so no Matomo error notification on top */
const QUIET = { createErrorNotification: false };

function linkParams(form: LinkForm): Record<string, string> {
  const params: Record<string, string> = {
    targetUrl: form.targetUrl,
    parameterSet: form.parameterSet,
  };
  FIELDS.forEach((field) => {
    params[field] = form[field];
  });
  return params;
}

export function fetchParameterSets(idSite: number): Promise<ParameterSets> {
  return AjaxHelper.fetch({ method: `${MODULE}.getParameterSets`, idSite }, QUIET);
}

export function fetchTemplates(idSite: number): Promise<Template[]> {
  return AjaxHelper.fetch({ method: `${MODULE}.getTemplates`, idSite }, QUIET);
}

export function fetchSuggestions(idSite: number, field: FieldKey): Promise<Suggestion[]> {
  return AjaxHelper.fetch<Suggestion[]>({
    method: `${MODULE}.getSuggestions`, idSite, field, limit: 100,
  }, QUIET).then((rows) => (rows || []).map((s) => ({ ...s, value: `${s.value}` })));
}

/**
 * the dry run of addLink (of updateLink with the edited link's idLink); errors come back in the
 * answer, so no Matomo error notification
 */
export function preview(
  idSite: number,
  form: LinkForm,
  abort: AbortController,
  idLink = 0,
): Promise<Preview> {
  return AjaxHelper.post(
    { method: `${MODULE}.previewLink`, idSite, ...(idLink > 0 ? { idLink } : {}) },
    linkParams(form),
    { createErrorNotification: false, abortController: abort },
  );
}

export function addLink(
  idSite: number,
  form: LinkForm,
): Promise<{ link: Link, existed: boolean, warnings: CheckMessage[] }> {
  return AjaxHelper.post(
    { method: `${MODULE}.addLink`, idSite },
    {
      ...linkParams(form), startDate: form.startDate, endDate: form.endDate, note: form.note,
    },
    QUIET,
  );
}

/** every field is sent: '' clears it, which is what the form shows */
export function updateLink(
  idSite: number,
  idLink: number,
  form: LinkForm,
): Promise<{ link: Link, warnings: CheckMessage[] }> {
  return AjaxHelper.post(
    { method: `${MODULE}.updateLink`, idSite, idLink },
    {
      ...linkParams(form), startDate: form.startDate, endDate: form.endDate, note: form.note,
    },
    QUIET,
  );
}

/** a live link: only its note and dates change (sending the values back is fine, but not needed) */
export function updateLinkDetails(
  idSite: number,
  idLink: number,
  form: LinkForm,
): Promise<{ link: Link, warnings: CheckMessage[] }> {
  return AjaxHelper.post(
    { method: `${MODULE}.updateLink`, idSite, idLink },
    { startDate: form.startDate, endDate: form.endDate, note: form.note },
    QUIET,
  );
}

export function markLinkLive(idSite: number, idLink: number): Promise<Link> {
  return AjaxHelper.post({ method: `${MODULE}.markLinkLive`, idSite, idLink }, {}, QUIET);
}

/** one saved link, or null when it is not there (getLinks answers an empty list, not a 404) */
export function fetchLink(idSite: number, idLink: number): Promise<Link | null> {
  return AjaxHelper.fetch<LinkPage>({
    method: `${MODULE}.getLinks`, idSite, idLink, status: 'all', limit: 1,
  }, QUIET).then((page) => (page.links.length ? page.links[0] : null));
}

export function fetchLinks(
  idSite: number,
  status: string,
  search: string,
  limit: number,
  offset: number,
): Promise<LinkPage> {
  return AjaxHelper.fetch({
    method: `${MODULE}.getLinks`, idSite, status, search, limit, offset,
  }, QUIET);
}

export interface LinkResult {
  idLink: number;
  /** link_id (exact), campaign_keyword or campaign (a row of Matomo's campaign report) */
  basis: 'link_id' | 'campaign_keyword' | 'campaign';
  /** how many saved links that row counts (1: only this link) */
  sharedWith: number;
  visits: number;
  conversions: number;
  revenue: number;
}

/** the numbers of exactly the links of one list page (same filters and paging as fetchLinks) */
export function fetchLinkResults(
  idSite: number,
  period: string,
  date: string,
  segment: string,
  status: string,
  search: string,
  limit: number,
  offset: number,
): Promise<LinkResult[]> {
  return AjaxHelper.fetch({
    method: `${MODULE}.getLinkResults`, idSite, period, date, segment, status, search, limit, offset,
  }, QUIET);
}

export function archiveLink(idSite: number, idLink: number, archived: boolean): Promise<Link> {
  return AjaxHelper.post({
    method: `${MODULE}.${archived ? 'archiveLink' : 'restoreLink'}`, idSite, idLink,
  }, {}, QUIET);
}

export type Phase = 'preparing' | 'running' | 'ended' | 'archived';
export type GoalMetric = 'none' | 'visits' | 'conversions' | 'revenue';

export interface CampaignGoal {
  metric: GoalMetric;
  target: number;
  idGoal: number | null;
  value: number;
  progress: number | null;
  from: string;
  to: string;
  complete: boolean;
}

export interface CampaignRow {
  campaign: string;
  name: string | null;
  phase: Phase;
  source: 'details' | 'workspace' | 'links' | 'report';
  hasDetails: boolean;
  activeLinks: number;
  linkStates: { draft: number, live: number, ended: number };
  startDate: string | null;
  endDate: string | null;
  notes: string | null;
  period: { visits: number, conversions: number, revenue: number };
  recentVisits: number;
  goal: CampaignGoal | null;
  warnings: string[];
  /** while connected: the workspace campaign with this value */
  platform: { id: string, name: string, status: string, appUrl: string | null } | null;
}

export interface CampaignDetails {
  campaign: string;
  name: string | null;
  startDate: string | null;
  endDate: string | null;
  goal: { metric: GoalMetric, target: number | null, idGoal: number | null } | null;
  notes: string | null;
  archived: boolean;
}

export interface ChecklistItem {
  key: string;
  done: boolean;
  count: number;
  /** false for a recommended step (Marketing Campaigns Reporting): complete without it */
  required: boolean;
}

export interface MatomoGoal {
  idgoal: string | number;
  name: string;
}

export interface DetailsForm {
  campaign: string;
  name: string;
  startDate: string;
  endDate: string;
  goalMetric: GoalMetric;
  goalTarget: string;
  idGoal: string;
  notes: string;
}

export function fetchCampaigns(
  idSite: number,
  period: string,
  date: string,
  segment: string,
  status: string,
): Promise<CampaignRow[]> {
  return AjaxHelper.fetch({
    method: `${MODULE}.getCampaigns`, idSite, period, date, segment, status,
  }, QUIET);
}

export function fetchChecklist(
  idSite: number,
): Promise<{ complete: boolean, items: ChecklistItem[] }> {
  return AjaxHelper.fetch({ method: `${MODULE}.getSetupChecklist`, idSite }, QUIET);
}

export function fetchGoals(idSite: number): Promise<MatomoGoal[]> {
  return AjaxHelper.fetch({ method: 'Goals.getGoals', idSite }, QUIET)
    .then((goals: MatomoGoal[] | Record<string, MatomoGoal>) => Object.values(goals || {}));
}

function detailsParams(form: DetailsForm): Record<string, string> {
  return {
    name: form.name,
    startDate: form.startDate,
    endDate: form.endDate,
    goalMetric: form.goalMetric,
    goalTarget: form.goalTarget,
    idGoal: form.idGoal,
    notes: form.notes,
  };
}

export function addCampaign(
  idSite: number,
  form: DetailsForm,
): Promise<{ campaign: CampaignDetails, existed: boolean }> {
  return AjaxHelper.post(
    { method: `${MODULE}.addCampaign`, idSite },
    { campaign: form.campaign, ...detailsParams(form) },
    QUIET,
  );
}

/** every field is sent: '' clears it, which is what the form shows */
export function updateCampaign(idSite: number, form: DetailsForm): Promise<CampaignDetails> {
  return AjaxHelper.post(
    { method: `${MODULE}.updateCampaign`, idSite },
    { campaign: form.campaign, ...detailsParams(form) },
    QUIET,
  );
}

export function archiveCampaign(
  idSite: number,
  campaign: string,
  archived: boolean,
): Promise<CampaignDetails> {
  return AjaxHelper.post(
    { method: `${MODULE}.${archived ? 'archiveCampaign' : 'restoreCampaign'}`, idSite },
    { campaign },
    QUIET,
  );
}

export interface QualityValue {
  value: string;
  visits: number;
  conversions: number;
  savedLinks: number;
  hasDetails: boolean;
}

export interface QualityIssues {
  /** values Matomo counts apart although they mean one campaign; suggested first in values */
  variants: { suggested: string, visits: number, values: QualityValue[] }[];
  /** counted values without a saved link or details, most visits first (at most 50) */
  unexplained: { value: string, visits: number, conversions: number }[];
  counts: {
    variants: number, unexplained: number, unexplainedVisits: number, campaignVisits: number,
  };
}

export function fetchQualityIssues(
  idSite: number,
  period: string,
  date: string,
  segment: string,
): Promise<QualityIssues> {
  return AjaxHelper.fetch({
    method: `${MODULE}.getQualityIssues`, idSite, period, date, segment,
  }, QUIET);
}

export interface CampaignResults {
  /** the campaign as getCampaigns lists it */
  campaign: CampaignRow;
  /** its own days: start (or first visit) to end or today, 92 days at most */
  window: { from: string, to: string, complete: boolean };
  totals: { visits: number, conversions: number, revenue: number };
  series: { day: string, visits: number, conversions: number, revenue: number }[];
  links: { link: Link, results: LinkResult | null, lastVisitDay: string | null }[];
  warnings: { code: string, idLink: number, lastVisitDay: string }[];
}

export function fetchCampaignResults(
  idSite: number,
  campaign: string,
  segment: string,
): Promise<CampaignResults> {
  return AjaxHelper.fetch({
    method: `${MODULE}.getCampaignResults`, idSite, campaign, segment,
  }, QUIET);
}

/** the connection to Feinwerk Campaigns (API getConnectionStatus); never carries the token */
export interface ConnectionStatus {
  mode: 'disabled' | 'standalone' | 'connected';
  connected: boolean;
  state: string;
  reason: string;
  workspace: { id: string; name: string } | null;
  person: { name: string; role: string } | null;
  trial: { endsAt: string; daysLeft: number } | null;
  canBuy: boolean;
  links: { app: string | null; buy: string | null };
  features: { shortLinks: boolean; qrCodes: boolean };
  canConnect: boolean;
  connectUrl: string | null;
  checkedAt: string;
}

let statusOnce: Promise<ConnectionStatus> | null = null;

/** read once per page load: the status line and the builder share it */
export function fetchConnectionStatus(fresh = false): Promise<ConnectionStatus> {
  if (!statusOnce || fresh) {
    statusOnce = AjaxHelper.fetch<ConnectionStatus>({ method: `${MODULE}.getConnectionStatus` }, QUIET);
    statusOnce.catch(() => {
      statusOnce = null;
    });
  }
  return statusOnce;
}

export function disconnectPlatform(): Promise<ConnectionStatus> {
  return AjaxHelper.post<ConnectionStatus>({ method: `${MODULE}.disconnectPlatform` }, {}, QUIET);
}

export interface PlatformField {
  key: string;
  label: string;
  type: string;
  required: boolean;
  values: { value: string; label: string }[];
}

export interface PlatformConvention {
  website: { id: string; name: string; url: string; match: string };
  convention: {
    parameters: { style: string; names: Record<string, string> };
    fields: PlatformField[];
    channels: { key: string; label: string; source: string | null; medium: string }[];
    networks: { key: string; label: string; values: Record<string, string> }[];
  };
}

export interface PlatformCampaign {
  id: string;
  name: string;
  parameter: string;
  status: string;
  startsOn: string | null;
  endsOn: string | null;
  appUrl: string | null;
}

export function fetchPlatformConvention(idSite: number): Promise<PlatformConvention> {
  return AjaxHelper.fetch<PlatformConvention>({
    method: `${MODULE}.getPlatformConvention`, idSite,
  }, QUIET);
}

export function fetchPlatformCampaigns(idSite: number, query: string): Promise<PlatformCampaign[]> {
  return AjaxHelper.fetch<PlatformCampaign[]>({
    method: `${MODULE}.getPlatformCampaigns`, idSite, query, limit: 8,
  }, QUIET);
}

export function addPlatformCampaign(
  idSite: number,
  name: string,
  parameter = '',
  startDate = '',
  endDate = '',
): Promise<{ campaign: PlatformCampaign; existed: boolean }> {
  return AjaxHelper.post({ method: `${MODULE}.addPlatformCampaign`, idSite }, {
    name, parameter, startDate, endDate,
  }, QUIET);
}

export interface PlatformLinkInput {
  targetUrl: string;
  platformCampaignId: string;
  source: string;
  medium: string;
  content: string;
  keyword: string;
  channel: string;
  placement: string;
  shortLink: boolean;
  dynamicQr: boolean;
  note: string;
  startDate: string;
  endDate: string;
}

export interface PlatformPreview {
  url: string;
  params: { key: string; name: string; value: string }[];
  errors: Record<string, string[] | string>;
  warnings: string[];
}

export function previewPlatformLink(
  idSite: number,
  input: PlatformLinkInput,
): Promise<PlatformPreview> {
  return AjaxHelper.post({ method: `${MODULE}.previewPlatformLink`, idSite }, {
    targetUrl: input.targetUrl,
    platformCampaignId: input.platformCampaignId,
    source: input.source,
    medium: input.medium,
    content: input.content,
    keyword: input.keyword,
    channel: input.channel,
    placement: input.placement,
    shortLink: input.shortLink ? '1' : '0',
    dynamicQr: input.dynamicQr ? '1' : '0',
  }, QUIET);
}

export function addPlatformLink(
  idSite: number,
  input: PlatformLinkInput,
): Promise<{ link: Link; existed: boolean }> {
  return AjaxHelper.post({ method: `${MODULE}.addPlatformLink`, idSite }, {
    ...input,
    shortLink: input.shortLink ? '1' : '0',
    dynamicQr: input.dynamicQr ? '1' : '0',
  }, QUIET);
}
