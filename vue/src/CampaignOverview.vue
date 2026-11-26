<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  Campaigns > Overview: the setup checklist, the campaigns of the website by phase with the numbers
  of the selected period (FeinwerkCampaignManager.getCampaigns), goal progress and warnings;
  campaign details are created and changed in a side panel (addCampaign, updateCampaign).
-->
<template>
  <div class="fwcmp-overview">
    <div class="fwcmp-overview__bar">
      <div class="fwcmp-hint fwcmp-overview__scope">{{ scopeText }}</div>
      <div v-if="rows.length > 0 || showArchived" class="fwcmp-overview__actions">
        <button
          v-if="canWrite"
          type="button"
          class="btn"
          @click="openPanel(null)"
        >{{ tr('NewCampaign') }}</button>
        <button type="button" class="btn-flat" @click="openBuilder('')">{{ tr('NewLink') }}</button>
      </div>
    </div>

    <section
      v-if="checklistItems.length > 0"
      class="fwcmp-checklist"
      :class="{ 'fwcmp-checklist--compact': checklist && checklist.complete }"
      :aria-label="tr('ChecklistTitle')"
    >
      <h3 v-if="checklist && !checklist.complete" class="fwcmp-step__title">
        {{ tr('ChecklistTitle') }}
      </h3>
      <ul class="fwcmp-checklist__items">
        <li
          v-for="item in checklistItems"
          :key="item.key"
          :class="{ 'is-done': item.done }"
        >
          <span class="fwcmp-checklist__mark" aria-hidden="true">{{ item.done ? '✓' : '○' }}</span>
          <span class="fwcmp-sr-only">{{ item.done ? tr('Done') : tr('Open') }}</span>
          <span class="fwcmp-checklist__text">
            <span
              v-if="!item.required && !item.done"
              class="fwcmp-badge"
            >{{ tr('Recommended') }}</span>
            {{ item.done ? tr(`Checklist_${item.key}`) : tr(`ChecklistTodo_${item.key}`) }}
            <a
              v-if="!item.done && item.key === 'goals'"
              :href="goalsUrl"
            >{{ tr('ChecklistGoalsAction') }}</a>
            <a
              v-if="!item.done && item.key === 'marketing_campaigns_reporting' && marketplaceUrl"
              :href="marketplaceUrl"
            >{{ tr('ChecklistMcrAction') }}</a>
            <template v-if="!item.done && item.key === 'marketing_campaigns_reporting'
              && !marketplaceUrl">{{ tr('ChecklistMcrAskSuperUser') }}</template>
          <button
            v-if="!item.done && item.key === 'saved_link'"
            type="button"
            class="fwcmp-linkbutton"
            @click="openBuilder('')"
          >{{ tr('OpenBuilder') }}</button>
          <button
            v-if="!item.done && item.key === 'campaign_details' && canWrite"
            type="button"
            class="fwcmp-linkbutton"
            @click="openPanel(null)"
          >{{ tr('NewCampaign') }}</button>
          </span>
        </li>
      </ul>
    </section>

    <ActivityIndicator :loading="loading" />
    <Alert v-if="error" severity="danger">
      {{ error }}
      <button type="button" class="btn-flat fwcmp-retry" @click="load">{{ tr('Retry') }}</button>
    </Alert>
    <Alert v-if="actionError" severity="danger">{{ actionError }}</Alert>
    <div v-if="notice" class="fwcmp-notice" role="status">
      {{ notice.text }}
      <button
        ref="undo"
        type="button"
        class="fwcmp-linkbutton"
        @click="undoArchive"
      >{{ tr('Undo') }}</button>
    </div>

    <div v-if="!loading && !error && rows.length === 0" class="fwcmp-empty">
      <p>{{ emptyText }}</p>
      <div v-if="!showArchived" class="fwcmp-empty__actions">
        <button type="button" class="btn" @click="openBuilder('')">{{ tr('OpenBuilder') }}</button>
        <button
          v-if="canWrite"
          type="button"
          class="btn btn-outline"
          @click="openPanel(null)"
        >{{ tr('NewCampaign') }}</button>
      </div>
    </div>

    <section
      v-for="group in groups"
      :key="group.phase"
      class="fwcmp-phase"
      :class="{ 'fwcmp-phase--reportonly': group.phase === 'report' }"
    >
      <h3 v-if="group.phase !== 'report'" class="fwcmp-step__title">
        {{ tr(`Phase_${group.phase}`) }} ({{ group.rows.length }})
      </h3>
      <template v-else>
        <h3 class="fwcmp-step__title">
          <button
            type="button"
            class="fwcmp-disclosure"
            :aria-expanded="reportOnlyOpen ? 'true' : 'false'"
            aria-controls="fwcmp-reportonly-cards"
            @click="reportOnlyToggled = !reportOnlyOpen"
          >
            <span
              class="fwcmp-disclosure__mark"
              aria-hidden="true"
            >{{ reportOnlyOpen ? '▾' : '▸' }}</span>
            {{ tr('OnlyCountedGroup') }} ({{ group.rows.length }})
          </button>
        </h3>
        <div class="fwcmp-hint">{{ tr('OnlyCountedHelp') }}</div>
      </template>
      <ul
        v-show="group.phase !== 'report' || reportOnlyOpen"
        :id="group.phase === 'report' ? 'fwcmp-reportonly-cards' : undefined"
        class="fwcmp-cards"
      >
        <li
          v-for="row in group.rows"
          :key="row.campaign"
          class="fwcmp-card"
        >
          <div class="fwcmp-card__head">
            <h4 class="fwcmp-card__name">
              <a :href="campaignPageUrl(row.campaign)">{{ row.name || row.campaign }}</a>
            </h4>
            <code v-if="row.name" class="fwcmp-card__value">{{ row.campaign }}</code>
            <!-- a campaign of the connected workspace: open it there (Peter, 2026-11-26) -->
            <a
              v-if="row.platform && row.platform.appUrl"
              class="fwcmp-applink"
              :href="row.platform.appUrl"
              target="_blank"
              rel="noopener noreferrer"
              :title="tr('PlatformOpenCampaignTooltip')"
              :aria-label="tr('PlatformOpenCampaignOf', label(row))"
            >Feinwerk Campaigns<span class="icon-outlink" aria-hidden="true" /></a>
          </div>
          <div class="fwcmp-card__meta">
            {{ cardMeta(row) }}<template
              v-if="row.activeLinks > 0"
            >,
              {{ linksText(row) }}
            </template>
          </div>
          <dl class="fwcmp-card__numbers">
            <div>
              <dt>{{ tr('Visits') }}</dt>
              <dd>{{ number(row.period.visits) }}</dd>
            </div>
            <div>
              <dt>{{ tr('Conversions') }}</dt>
              <dd>{{ number(row.period.conversions) }}</dd>
            </div>
            <div>
              <dt>{{ tr('Revenue') }}</dt>
              <dd>{{ money(row.period.revenue) }}</dd>
            </div>
          </dl>
          <div v-if="row.goal" class="fwcmp-goal">
            <div class="fwcmp-goal__label">
              {{ goalText(row) }}
            </div>
            <div
              class="fwcmp-goal__bar"
              role="progressbar"
              :aria-valuenow="Math.min(100, percent(row))"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-label="goalText(row)"
            >
              <span
                class="fwcmp-goal__fill"
                :style="{ width: `${Math.min(100, percent(row))}%` }"
              />
            </div>
            <div v-if="!row.goal.complete" class="fwcmp-hint">
              {{ tr('GoalPartial', day(row.goal.from)) }}
            </div>
          </div>
          <div
            v-for="w in row.warnings"
            :key="w"
            class="fwcmp-msg fwcmp-msg--warning"
          >{{ tr(`Warning_${w}`) }}</div>
          <div v-if="row.notes" class="fwcmp-card__notes" :title="row.notes">{{ row.notes }}</div>
          <div class="fwcmp-card__actions">
            <button
              v-if="canWrite"
              type="button"
              class="fwcmp-action"
              :aria-label="tr(row.hasDetails ? 'EditDetailsOf' : 'AddDetailsOf', label(row))"
              @click="openPanel(row)"
            >{{ row.hasDetails ? tr('EditDetails') : tr('AddDetails') }}</button>
            <button
              type="button"
              class="fwcmp-action"
              :aria-label="tr('NewLinkFor', label(row))"
              @click="openBuilder(row.campaign)"
            >{{ tr('NewLink') }}</button>
            <a
              class="fwcmp-action"
              :href="analyseUrl(row)"
              :aria-label="tr('AnalyseInMatomoOf', label(row))"
            >{{ tr('AnalyseInMatomo') }}</a>
            <button
              v-if="canWrite && row.hasDetails"
              type="button"
              class="fwcmp-action"
              :disabled="busy === row.campaign"
              :aria-label="archiveLabel(row)"
              @click="toggleArchived(row)"
            >{{ row.phase === 'archived' ? tr('Restore') : tr('Archive') }}</button>
          </div>
        </li>
      </ul>
    </section>

    <p class="fwcmp-overview__archived">
      <button type="button" class="fwcmp-linkbutton" @click="toggleShowArchived">
        {{ showArchived ? tr('ShowActiveCampaigns') : tr('ShowArchivedCampaigns') }}
      </button>
    </p>

    <CampaignDetailsPanel
      :open="panelOpen"
      :id-site="idSite"
      :row="panelRow"
      :rows="rows"
      :currency="currency"
      scope-class="fwcmp-overview"
      @update:open="panelOpen = $event"
      @changed="load"
    />

    <FeedbackBar
      v-if="feedback"
      class="fwcmp-page-feedback"
      :id-site="idSite"
      topic="overview"
      :question="tr('FeedbackQuestion_overview')"
      :feedback="feedback"
    />
    <PromoLine
      :promo="promo"
      :dismiss-label="tr('PromoDismiss')"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {
  ActivityIndicator,
  Alert,
  MatomoUrl,
  translate,
} from 'CoreHome';
import {
  archiveCampaign,
  CampaignRow,
  ChecklistItem,
  fetchCampaigns,
  fetchChecklist,
  Phase,
} from './api';
import CampaignDetailsPanel from './CampaignDetailsPanel.vue';
import FeedbackBar, { FeedbackSettings } from './FeedbackBar.vue';
import PromoLine, { PromoVariables } from './PromoLine.vue';
import plainText from './plainText';
import scopeText from './scope';

const PREFIX = 'FeinwerkCampaignManager_';
const CATEGORY = 'FeinwerkCampaignManager_Campaigns';
const PHASES: Phase[] = ['running', 'preparing', 'ended', 'archived'];

/** a newer load wins over a slower older one (switching to archived and back) */
let overviewLoads = 0;

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

interface State {
  rows: CampaignRow[];
  checklist: { complete: boolean, items: ChecklistItem[] } | null;
  loading: boolean;
  error: string;
  actionError: string;
  busy: string;
  showArchived: boolean;
  panelOpen: boolean;
  /** the campaign the details panel edits or starts from; null for a new one */
  panelRow: CampaignRow | null;
  notice: { text: string, campaign: string, label: string, archived: boolean } | null;
  /** the user's choice for the report-only group; null: collapsed while planned campaigns exist */
  reportOnlyToggled: boolean | null;
}

export default defineComponent({
  props: {
    idSite: { type: Number, required: true },
    canWrite: { type: Boolean, default: false },
    /** the website's currency code (ISO 4217), for revenue */
    currency: { type: String, default: '' },
    /** Matomo's Marketplace for super users ('' for everyone else or when it is off) */
    marketplaceUrl: { type: String, default: '' },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: { type: Object as PropType<FeedbackSettings | null>, default: null },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: { type: Object as PropType<PromoVariables | null>, default: null },
  },
  components: {
    ActivityIndicator,
    Alert,
    FeedbackBar,
    PromoLine,
    CampaignDetailsPanel,
  },
  data(): State {
    return {
      rows: [],
      checklist: null,
      loading: false,
      error: '',
      actionError: '',
      busy: '',
      showArchived: false,
      panelOpen: false,
      panelRow: null,
      notice: null,
      reportOnlyToggled: null,
    };
  },
  created() {
    this.load();
  },
  computed: {
    period(): string {
      return `${MatomoUrl.parsed.value.period || 'day'}`;
    },
    date(): string {
      return `${MatomoUrl.parsed.value.date || 'today'}`;
    },
    segment(): string {
      return `${MatomoUrl.parsed.value.segment || ''}`;
    },
    scopeText(): string {
      return scopeText(this.tr);
    },
    /** planned campaigns by phase, then the values only Matomo counted (no details, no link) */
    groups(): { phase: Phase | 'report', rows: CampaignRow[] }[] {
      const planned = this.rows.filter((r) => r.source !== 'report');
      const groups: { phase: Phase | 'report', rows: CampaignRow[] }[] = PHASES.map((phase) => ({
        phase,
        rows: planned.filter((r) => r.phase === phase),
      }));
      groups.push({ phase: 'report', rows: this.rows.filter((r) => r.source === 'report') });
      return groups.filter((g) => g.rows.length > 0);
    },
    /** the report-only group is collapsed while planned campaigns exist, until the user opens it */
    reportOnlyOpen(): boolean {
      if (this.reportOnlyToggled !== null) {
        return this.reportOnlyToggled;
      }
      return !this.rows.some((r) => r.source !== 'report');
    },
    /** every step while a required one is open; then only the open recommended ones, one line */
    checklistItems(): ChecklistItem[] {
      if (!this.checklist) {
        return [];
      }
      return this.checklist.complete
        ? this.checklist.items.filter((i) => !i.done)
        : this.checklist.items;
    },
    emptyText(): string {
      if (this.showArchived) {
        return this.tr('NoArchivedCampaigns');
      }
      // links or details exist, only not in this period
      const used = this.checklist
        && this.checklist.items.some((i) => (i.key === 'saved_link' || i.key === 'campaign_details') && i.done);
      return used ? this.tr('NoCampaignsInPeriod') : this.tr('NoCampaignsYet');
    },
    goalsUrl(): string {
      return `?module=Goals&action=manage&idSite=${this.idSite}&period=${encodeURIComponent(this.period)}`
        + `&date=${encodeURIComponent(this.date)}`;
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    label(row: CampaignRow): string {
      return row.name || row.campaign;
    },
    /** "2 saved links: 1 live, 1 draft" (Peter, 2026-11-25: the card counts the link states) */
    linksText(row: CampaignRow): string {
      const count = row.activeLinks === 1
        ? this.tr('OneSavedLink')
        : this.tr('SavedLinksCount', `${row.activeLinks}`);
      const states = row.linkStates || { draft: 0, live: 0, ended: 0 };
      const parts: string[] = [];
      ([['live', 'Live'], ['draft', 'Draft'], ['ended', 'Ended']] as const).forEach(([key, name]) => {
        const n = states[key];
        if (n > 0) {
          parts.push(n === 1 ? this.tr(`LinkState${name}One`) : this.tr(`LinkState${name}Many`, `${n}`));
        }
      });
      return parts.length ? this.tr('LinkStatesSummary', count, parts.join(', ')) : count;
    },
    archiveLabel(row: CampaignRow): string {
      return this.tr(row.phase === 'archived' ? 'RestoreCampaignOf' : 'ArchiveCampaignOf', this.label(row));
    },
    load() {
      overviewLoads += 1;
      const current = overviewLoads;
      this.loading = true;
      this.error = '';
      Promise.all([
        fetchCampaigns(
          this.idSite,
          this.period,
          this.date,
          this.segment,
          this.showArchived ? 'archived' : 'active',
        ),
        fetchChecklist(this.idSite),
      ]).then(([rows, checklist]) => {
        if (current === overviewLoads) {
          this.rows = rows;
          this.checklist = checklist;
        }
      }).catch((e: Error) => {
        if (current === overviewLoads) {
          this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
        }
      }).finally(() => {
        if (current === overviewLoads) {
          this.loading = false;
        }
      });
    },
    toggleShowArchived() {
      this.showArchived = !this.showArchived;
      this.notice = null;
      this.load();
    },
    number(value: number): string {
      return new Intl.NumberFormat(lang()).format(value);
    },
    /** as Matomo shows money: no decimals for whole amounts, exactly two otherwise ("206,10 €") */
    money(value: number): string {
      const digits = Number.isInteger(Math.round(value * 100) / 100) ? 0 : 2;
      if (this.currency) {
        try {
          return new Intl.NumberFormat(lang(), {
            style: 'currency',
            currency: this.currency,
            minimumFractionDigits: digits,
            maximumFractionDigits: digits,
          }).format(value);
        } catch (e) {
          // an unknown currency code: the number alone
        }
      }
      return new Intl.NumberFormat(lang(), {
        minimumFractionDigits: digits, maximumFractionDigits: digits,
      }).format(value);
    },
    day(iso: string): string {
      const parsed = new Date(`${iso}T00:00:00Z`);
      return Number.isNaN(parsed.getTime()) ? iso : parsed.toLocaleDateString(lang(), {
        year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC',
      });
    },
    /** a campaign value only Matomo counted has no dates: its phase instead */
    cardMeta(row: CampaignRow): string {
      return row.source === 'report' ? this.tr(`CampaignPhase_${row.phase}`) : this.periodText(row);
    },
    periodText(row: CampaignRow): string {
      if (row.startDate && row.endDate) {
        return this.tr('FromTo', this.day(row.startDate), this.day(row.endDate));
      }
      if (row.startDate) {
        return this.tr('Since', this.day(row.startDate));
      }
      if (row.endDate) {
        return this.tr('Until', this.day(row.endDate));
      }
      return this.tr('NoDates');
    },
    percent(row: CampaignRow): number {
      return row.goal && row.goal.progress !== null ? Math.round(row.goal.progress * 100) : 0;
    },
    goalText(row: CampaignRow): string {
      if (!row.goal) {
        return '';
      }
      const value = row.goal.metric === 'revenue' ? this.money(row.goal.value) : this.number(row.goal.value);
      const target = row.goal.metric === 'revenue'
        ? this.money(row.goal.target)
        : this.number(row.goal.target);
      return this.tr(
        `GoalProgress_${row.goal.metric}`,
        value,
        target,
        `${this.percent(row)}`,
        this.day(row.goal.from),
      );
    },
    /**
     * Matomo's visitor log with the campaign as segment: it reads the visits themselves, so it
     * works where Matomo does not archive segments on request (most instances; a segmented
     * report would stay empty there)
     */
    analyseUrl(row: CampaignRow): string {
      // with the campaign referrer type: a website or search engine could carry the same name
      const segment = `referrerType==campaign;referrerName==${encodeURIComponent(row.campaign)}`;
      const base = `idSite=${this.idSite}&period=${encodeURIComponent(this.period)}`
        + `&date=${encodeURIComponent(this.date)}`;
      return `?module=CoreHome&action=index&${base}#?${base}`
        + `&category=General_Visitors&subcategory=Live_VisitorLog&segment=${encodeURIComponent(segment)}`;
    },
    /** the campaign's page under All campaigns */
    campaignPageUrl(campaign: string): string {
      return `#?${MatomoUrl.stringify({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_AllCampaigns',
        campaignPage: campaign,
        campaignTab: null,
      })}`;
    },
    openBuilder(campaign: string) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: null,
        campaign: campaign || null,
      });
    },
    openPanel(row: CampaignRow | null) {
      this.panelRow = row;
      this.panelOpen = true;
    },
    toggleArchived(row: CampaignRow) {
      this.setArchived(row.campaign, this.label(row), row.phase !== 'archived');
    },
    undoArchive() {
      if (this.notice) {
        const { campaign, archived, label } = this.notice;
        this.setArchived(campaign, label, !archived);
      }
    },
    /** archives or restores, then says so with an Undo that takes the focus (the card is gone) */
    setArchived(campaign: string, label: string, archived: boolean) {
      this.busy = campaign;
      this.actionError = '';
      this.notice = null;
      archiveCampaign(this.idSite, campaign, archived).then(() => {
        this.notice = {
          text: this.tr(archived ? 'CampaignArchived' : 'CampaignRestored', label),
          campaign,
          label,
          archived,
        };
        this.load();
        this.$nextTick(() => {
          const undo = this.$refs.undo as HTMLElement | undefined;
          if (undo) {
            undo.focus();
          }
        });
      }).catch((e: Error) => {
        this.actionError = e && e.message
          ? plainText(e.message)
          : this.tr(archived ? 'CampaignArchiveFailed' : 'CampaignRestoreFailed');
      }).finally(() => {
        this.busy = '';
      });
    },
  },
});
</script>
