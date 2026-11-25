<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  Campaigns > All campaigns: a table of the campaigns (getCampaigns) and, with campaignPage in the
  hash, one campaign page (getCampaignResults) with the tabs Vorbereitung, Verlauf and Auswertung
  and a print summary for decision makers. The chart is Matomo's own row evolution graph of the
  campaign row, so cron archiving is enough.
-->
<template>
  <div class="fwcmp-pages" :class="{ 'is-summary': summary }">
    <ActivityIndicator :loading="loading" />
    <Alert v-if="error" severity="danger">
      {{ error }}
      <button type="button" class="btn-flat fwcmp-retry" @click="load">{{ tr('Retry') }}</button>
    </Alert>

    <!-- the table of all campaigns -->
    <template v-if="!campaign && rows">
      <div class="fwcmp-hint fwcmp-pages__scope">{{ scopeText }}</div>
      <div v-if="!rows.length" class="fwcmp-empty">{{ tr('NoCampaignsTable') }}</div>
      <div v-else class="fwcmp-tablewrap">
        <div class="fwcmp-tablewrap">
          <table v-content-table class="entityTable dataTable fwcmp-table fwcmp-pages__table">
            <thead>
              <tr>
                <th>{{ tr('FieldCampaign') }}</th>
                <th>{{ tr('LinkStatusHead') }}</th>
                <th>{{ tr('CampaignPeriod') }}</th>
                <th class="fwcmp-table__num">{{ tr('Visits') }}</th>
                <th class="fwcmp-table__num">{{ tr('Conversions') }}</th>
                <th>{{ tr('GoalMetric') }}</th>
                <th>{{ tr('Links') }}</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in rows" :key="row.campaign">
                <td class="fwcmp-table__main" :data-label="tr('FieldCampaign')">
                  <a
                    :href="pageUrl(row.campaign)"
                    class="fwcmp-table__campaign"
                    :aria-label="tr('OpenCampaign', label(row))"
                  >{{ label(row) }}</a>
                  <code v-if="row.name" class="fwcmp-card__value">{{ row.campaign }}</code>
                </td>
                <td :data-label="tr('LinkStatusHead')">{{ tr(`CampaignPhase_${row.phase}`) }}</td>
                <td :data-label="tr('CampaignPeriod')">{{ tablePeriodText(row) }}</td>
                <td class="fwcmp-table__num" :data-label="tr('Visits')">
                  {{ number(row.period.visits) }}
                </td>
                <td class="fwcmp-table__num" :data-label="tr('Conversions')">
                  {{ number(row.period.conversions) }}
                </td>
                <td class="fwcmp-nowrap" :data-label="tr('GoalMetric')">
                  {{ row.goal ? `${percent(row)} %` : '' }}
                </td>
                <td :data-label="tr('Links')">{{ statesText(row) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>

    <!-- one campaign; the way back also when it could not be loaded -->
    <nav v-if="campaign" class="fwcmp-crumbs" :aria-label="tr('AllCampaigns')">
      <!-- Matomo styles nav links for its menu: the colour is set in campaigns.less -->
      <a :href="pageUrl('')">{{ tr('AllCampaigns') }}</a>
      <span aria-hidden="true"> › </span>
      <span>{{ results ? label(results.campaign) : campaign }}</span>
    </nav>
    <template v-if="campaign && results">
      <div class="fwcmp-campaign__head">
        <h3 class="fwcmp-campaign__name">{{ label(results.campaign) }}</h3>
        <code
          v-if="results.campaign.name"
          class="fwcmp-card__value"
        >{{ results.campaign.campaign }}</code>
        <span class="fwcmp-badge">{{ tr(`CampaignPhase_${results.campaign.phase}`) }}</span>
        <span class="fwcmp-campaign__when">
          {{ periodText(results.campaign) }}<template v-if="dayOf">, {{ dayOf }}</template>
        </span>
      </div>
      <div class="fwcmp-card__actions fwcmp-campaign__actions">
        <button
          v-if="canWrite"
          type="button"
          class="fwcmp-action"
          @click="openBuilder(results.campaign.campaign)"
        >{{ tr('NewLink') }}</button>
        <button
          v-if="canWrite"
          type="button"
          class="fwcmp-action"
          @click="panelOpen = true"
        >{{ results.campaign.hasDetails ? tr('EditDetails') : tr('AddDetails') }}</button>
        <a class="fwcmp-action" :href="analyseUrl('General_Visitors', 'General_Overview')">
          {{ tr('AnalyseInMatomo') }}
        </a>
        <button
          ref="summaryButton"
          type="button"
          class="fwcmp-action"
          @click="openSummary"
        >{{ tr('Summary') }}</button>
      </div>

      <div class="fwcmp-tabs" role="tablist" :aria-label="label(results.campaign)">
        <button
          v-for="t in tabs"
          :id="`fwcmp-tab-${t}`"
          :key="t"
          type="button"
          role="tab"
          class="fwcmp-tab"
          :aria-selected="tab === t ? 'true' : 'false'"
          :aria-controls="`fwcmp-panel-${t}`"
          :tabindex="tab === t ? 0 : -1"
          @click="selectTab(t)"
          @keydown.right.prevent="moveTab(1)"
          @keydown.left.prevent="moveTab(-1)"
        >{{ tr(`Tab_${t}`) }}</button>
      </div>

      <!-- Vorbereitung -->
      <section
        v-show="tab === 'prepare'"
        id="fwcmp-panel-prepare"
        role="tabpanel"
        aria-labelledby="fwcmp-tab-prepare"
        class="fwcmp-tabpanel"
      >
        <h4 class="fwcmp-step__title">{{ tr('KeyData') }}</h4>
        <dl class="fwcmp-livecard__values">
          <div>
            <dt>{{ tr('CampaignPeriod') }}</dt>
            <dd>{{ periodText(results.campaign) }}</dd>
          </div>
          <div>
            <dt>{{ tr('CampaignValue') }}</dt>
            <dd>{{ results.campaign.campaign }}</dd>
          </div>
          <div>
            <dt>{{ tr('GoalMetric') }}</dt>
            <dd>{{ goalTargetText }}</dd>
          </div>
          <div v-if="results.campaign.notes">
            <dt>{{ tr('Note') }}</dt>
            <dd>{{ results.campaign.notes }}</dd>
          </div>
        </dl>
        <h4 class="fwcmp-step__title">{{ tr('StartChecklist') }}</h4>
        <ul class="fwcmp-checklist__items fwcmp-campaign__checks">
          <li v-for="c in checks" :key="c.key" :class="{ 'is-done': c.done }">
            <span class="fwcmp-checklist__mark" aria-hidden="true">{{ c.done ? '✓' : '○' }}</span>
            <span class="fwcmp-sr-only">{{ c.done ? tr('Done') : tr('Open') }}</span>
            <span class="fwcmp-checklist__text">
              {{ c.done ? tr(`Check_${c.key}`) : tr(`Check_${c.key}_todo`) }}
            </span>
          </li>
        </ul>
        <h4 class="fwcmp-step__title">{{ tr('CampaignLinks') }} ({{ results.links.length }})</h4>
        <div v-if="!results.links.length" class="fwcmp-quality__none">
          {{ tr('NoCampaignLinks') }}
        </div>
        <div v-else class="fwcmp-tablewrap">
          <div class="fwcmp-tablewrap">
            <table v-content-table class="entityTable dataTable fwcmp-table">
              <thead>
                <tr>
                  <th>{{ tr('Channel') }}</th>
                  <th>{{ tr('FieldContent') }}</th>
                  <th>{{ tr('FieldTargetUrl') }}</th>
                  <th>{{ tr('StartDate') }}</th>
                  <th>{{ tr('LinkStatusHead') }}</th>
                  <th class="fwcmp-table__actions">{{ tr('Actions') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in results.links" :key="item.link.idLink">
                  <td :data-label="tr('Channel')">{{ channel(item.link) }}</td>
                  <td :data-label="tr('FieldContent')">{{ detail(item.link) }}</td>
                  <td class="fwcmp-table__target" :data-label="tr('FieldTargetUrl')">
                    <span :title="item.link.url">{{ shortTarget(item.link.targetUrl) }}</span>
                  </td>
                  <td :data-label="tr('StartDate')">
                    {{ item.link.startDate ? day(item.link.startDate) : '' }}
                  </td>
                  <td :data-label="tr('LinkStatusHead')">
                    <span :class="`fwcmp-badge fwcmp-badge--${item.link.status}`">
                      {{ tr(`LinkStatus_${item.link.status}`) }}
                    </span>
                  </td>
                  <td class="fwcmp-table__actions" :data-label="tr('Actions')">
                    <button
                      v-if="canWrite"
                      type="button"
                      class="fwcmp-action"
                      :aria-label="tr('EditLinkOf', item.link.values.campaign)"
                      @click="openLink(item.link.idLink)"
                    >{{ tr('Edit') }}</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Verlauf -->
      <section
        v-show="tab === 'progress'"
        id="fwcmp-panel-progress"
        role="tabpanel"
        aria-labelledby="fwcmp-tab-progress"
        class="fwcmp-tabpanel"
      >
        <div class="fwcmp-hint">{{ windowText }}</div>
        <dl class="fwcmp-quality__tiles fwcmp-campaign__tiles">
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Visits') }}</dt>
            <dd class="fwcmp-quality__big">{{ number(results.totals.visits) }}</dd>
            <dd>{{ goalOf('visits') }}</dd>
          </div>
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Conversions') }}</dt>
            <dd class="fwcmp-quality__big">{{ number(results.totals.conversions) }}</dd>
            <dd>{{ goalOf('conversions') }}</dd>
          </div>
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Revenue') }}</dt>
            <dd class="fwcmp-quality__big">{{ money(results.totals.revenue) }}</dd>
            <dd>{{ goalOf('revenue') }}</dd>
          </div>
        </dl>
        <div v-if="results.campaign.goal" class="fwcmp-goal">
          <div class="fwcmp-goal__label">
            {{ goalText }}<template
              v-if="timeShare !== null"
            >, {{ tr('TimePassed', `${timeShare} %`) }}</template>
          </div>
          <div
            class="fwcmp-goal__bar"
            role="progressbar"
            :aria-valuenow="Math.min(100, percent(results.campaign))"
            aria-valuemin="0"
            aria-valuemax="100"
            :aria-label="goalText"
          >
            <span
              class="fwcmp-goal__fill"
              :style="{ width: `${Math.min(100, percent(results.campaign))}%` }"
            />
          </div>
        </div>
        <div
          v-for="w in warnings"
          :key="w"
          class="fwcmp-msg fwcmp-msg--warning"
        >{{ w }}</div>
        <!-- Matomo's graph brings its own title -->
        <div v-if="tab === 'progress' && chartParams" class="fwcmp-campaign__chart">
          <WidgetLoader :widget-params="chartParams" :widget-name="tr('VisitsPerDay')" />
        </div>
        <h4 class="fwcmp-step__title">{{ tr('PerLink') }}</h4>
        <div v-if="!results.links.length" class="fwcmp-quality__none">
          {{ tr('NoCampaignLinks') }}
        </div>
        <div v-else class="fwcmp-tablewrap">
          <div class="fwcmp-tablewrap">
            <table v-content-table class="entityTable dataTable fwcmp-table">
              <thead>
                <tr>
                  <th>{{ tr('Channel') }}</th>
                  <th>{{ tr('LinkStatusHead') }}</th>
                  <th class="fwcmp-table__num">{{ tr('Visits') }}</th>
                  <th class="fwcmp-table__num">{{ tr('Conversions') }}</th>
                  <th>{{ tr('LastVisit') }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in results.links" :key="item.link.idLink">
                  <td :data-label="tr('Channel')">
                    {{ channel(item.link) }}
                    <span
                      v-if="detail(item.link)"
                      class="fwcmp-table__note"
                    >{{ detail(item.link) }}</span>
                  </td>
                  <td :data-label="tr('LinkStatusHead')">
                    <span :class="`fwcmp-badge fwcmp-badge--${item.link.status}`">
                      {{ tr(`LinkStatus_${item.link.status}`) }}
                    </span>
                  </td>
                  <td class="fwcmp-table__num" :data-label="tr('Visits')">
                    <span class="fwcmp-table__value">
                      {{ item.results ? number(item.results.visits) : '-' }}
                      <span
                        v-if="item.results
                          && (item.results.basis !== 'link_id' || item.results.sharedWith > 1)"
                        class="fwcmp-table__basis"
                      >{{ tr(`ResultsBasisShort_${item.results.basis}`) }}</span>
                    </span>
                  </td>
                  <td class="fwcmp-table__num" :data-label="tr('Conversions')">
                    {{ item.results ? number(item.results.conversions) : '-' }}
                  </td>
                  <td :data-label="tr('LastVisit')">
                    {{ item.lastVisitDay ? day(item.lastVisitDay) : '' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- Auswertung -->
      <section
        v-show="tab === 'result'"
        id="fwcmp-panel-result"
        role="tabpanel"
        aria-labelledby="fwcmp-tab-result"
        class="fwcmp-tabpanel"
      >
        <h4 class="fwcmp-campaign__verdict">{{ verdict }}</h4>
        <div v-if="results.campaign.goal" class="fwcmp-hint">{{ goalText }}</div>
        <dl class="fwcmp-quality__tiles fwcmp-campaign__tiles">
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Visits') }}</dt>
            <dd class="fwcmp-quality__big">{{ number(results.totals.visits) }}</dd>
          </div>
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Conversions') }}</dt>
            <dd class="fwcmp-quality__big">{{ number(results.totals.conversions) }}</dd>
          </div>
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Revenue') }}</dt>
            <dd class="fwcmp-quality__big">{{ money(results.totals.revenue) }}</dd>
          </div>
        </dl>
        <template v-if="ownLinks.length > 1">
          <div class="fwcmp-campaign__best">{{ tr('BestLink', linkSummary(ownLinks[0])) }}</div>
          <div class="fwcmp-campaign__best">
            {{ tr('WeakestLink', linkSummary(ownLinks[ownLinks.length - 1])) }}
          </div>
        </template>
        <div v-else-if="results.links.length > 1" class="fwcmp-hint">
          {{ tr('PerLinkNeedsMcr') }}
        </div>
        <h4 class="fwcmp-step__title">{{ tr('NotesAndLearnings') }}</h4>
        <div v-if="results.campaign.notes" class="fwcmp-campaign__notes">
          {{ results.campaign.notes }}
        </div>
        <div v-else class="fwcmp-quality__none">{{ tr('NoNotes') }}</div>
        <h4 class="fwcmp-step__title">{{ tr('AnalyseInMatomo') }}</h4>
        <ul class="fwcmp-campaign__analyse">
          <li v-for="a in analyseLinks" :key="a.text">
            <a :href="analyseUrl(a.category, a.subcategory)">{{ tr(a.text) }}</a>
          </li>
        </ul>
      </section>

      <!-- the summary for decision makers: printed alone, only while it is open -->
      <section
        v-if="summary"
        ref="summary"
        class="fwcmp-summary"
        :aria-label="tr('Summary')"
      >
        <div class="fwcmp-summary__bar">
          <button
            ref="printButton"
            type="button"
            class="btn"
            @click="print"
          >{{ tr('PrintOrPdf') }}</button>
          <button type="button" class="btn-flat" @click="closeSummary">{{ tr('Close') }}</button>
        </div>
        <div class="fwcmp-summary__kicker">
          {{ tr('SummaryTitle', periodText(results.campaign)) }}<template
            v-if="siteName"
          >, {{ siteName }}</template>
        </div>
        <h3 class="fwcmp-summary__title">{{ label(results.campaign) }}: {{ verdict }}</h3>
        <div class="fwcmp-summary__lead">{{ summaryLead }}</div>
        <dl class="fwcmp-quality__tiles">
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Visits') }}</dt>
            <dd class="fwcmp-quality__big">{{ number(results.totals.visits) }}</dd>
            <dd>{{ goalOf('visits') }}</dd>
          </div>
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Conversions') }}</dt>
            <dd class="fwcmp-quality__big">{{ number(results.totals.conversions) }}</dd>
            <dd>{{ goalOf('conversions') }}</dd>
          </div>
          <div class="fwcmp-quality__tile">
            <dt>{{ tr('Revenue') }}</dt>
            <dd class="fwcmp-quality__big">{{ money(results.totals.revenue) }}</dd>
            <dd>{{ goalOf('revenue') }}</dd>
          </div>
        </dl>
        <template v-if="ownLinks.length > 1">
          <div>{{ tr('BestLink', linkSummary(ownLinks[0])) }}</div>
          <div>{{ tr('WeakestLink', linkSummary(ownLinks[ownLinks.length - 1])) }}</div>
        </template>
        <h4 class="fwcmp-step__title">{{ tr('NotesAndLearnings') }}</h4>
        <div class="fwcmp-campaign__notes">{{ results.campaign.notes || tr('NoNotes') }}</div>
        <div class="fwcmp-summary__footer">{{ tr('SummaryFooter', today) }}</div>
      </section>

      <CampaignDetailsPanel
        :open="panelOpen"
        :id-site="idSite"
        :row="results.campaign"
        :currency="currency"
        scope-class="fwcmp-pages"
        @update:open="panelOpen = $event"
        @changed="load"
      />
    </template>

    <FeedbackBar
      v-if="feedback"
      class="fwcmp-page-feedback"
      :id-site="idSite"
      topic="campaign_pages"
      :question="tr('FeedbackQuestion_campaign_pages')"
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
  ContentTable,
  MatomoUrl,
  translate,
  WidgetLoader,
} from 'CoreHome';
import {
  CampaignResults,
  CampaignRow,
  fetchCampaignResults,
  fetchCampaigns,
  Link,
} from './api';
import CampaignDetailsPanel from './CampaignDetailsPanel.vue';
import FeedbackBar, { FeedbackSettings } from './FeedbackBar.vue';
import PromoLine, { PromoVariables } from './PromoLine.vue';
import plainText from './plainText';
import scopeText from './scope';
import shortDay from './shortDay';

const PREFIX = 'FeinwerkCampaignManager_';
const CATEGORY = 'FeinwerkCampaignManager_Campaigns';
const SUBCATEGORY = 'FeinwerkCampaignManager_AllCampaigns';
const TABS = ['prepare', 'progress', 'result'];
/** the class on <html> while the summary is open: only then the print rules apply */
const PRINT_CLASS = 'fwcmp-printing';
/** the top-level copy of the summary that is printed */
const PRINT_ROOT = 'fwcmp-print-root';

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

function utcDay(day: string): number {
  return Date.UTC(Number(day.slice(0, 4)), Number(day.slice(5, 7)) - 1, Number(day.slice(8, 10)));
}

function daysBetween(from: string, to: string): number {
  return Math.round((utcDay(to) - utcDay(from)) / 86400000);
}

const ANALYSE_LINKS = [
  { category: 'General_Visitors', subcategory: 'Live_VisitorLog', text: 'AnalyseVisitorLog' },
  { category: 'General_Visitors', subcategory: 'DevicesDetection_Devices', text: 'AnalyseDevices' },
  { category: 'General_Actions', subcategory: 'General_Pages', text: 'AnalysePages' },
  { category: 'Goals_Goals', subcategory: 'General_Overview', text: 'AnalyseGoals' },
];

/** a newer load wins over a slower older one */
let loadCount = 0;

interface State {
  rows: CampaignRow[] | null;
  results: CampaignResults | null;
  loading: boolean;
  error: string;
  panelOpen: boolean;
  summary: boolean;
}

export default defineComponent({
  props: {
    idSite: { type: Number, required: true },
    canWrite: { type: Boolean, default: false },
    /** the website's currency code (ISO 4217), for revenue */
    currency: { type: String, default: '' },
    siteName: { type: String, default: '' },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: { type: Object as PropType<FeedbackSettings | null>, default: null },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: { type: Object as PropType<PromoVariables | null>, default: null },
  },
  components: {
    ActivityIndicator,
    Alert,
    CampaignDetailsPanel,
    FeedbackBar,
    PromoLine,
    WidgetLoader,
  },
  directives: {
    ContentTable,
  },
  data(): State {
    return {
      rows: null,
      results: null,
      loading: false,
      error: '',
      panelOpen: false,
      summary: false,
    };
  },
  created() {
    this.load();
  },
  beforeUnmount() {
    this.closeSummary();
  },
  watch: {
    campaign() {
      this.closeSummary();
      // another campaign (or the table): the old page goes; a reload of the same one keeps it
      // until the answer comes
      this.results = null;
      this.load();
    },
  },
  computed: {
    /** the campaign value of the open page ('' for the table) */
    campaign(): string {
      const value = MatomoUrl.hashParsed.value.campaignPage;
      return typeof value === 'string' ? value : '';
    },
    tabs(): string[] {
      return TABS;
    },
    analyseLinks(): typeof ANALYSE_LINKS {
      return ANALYSE_LINKS;
    },
    checks(): { key: string, done: boolean }[] {
      return this.results ? this.checksFor(this.results) : [];
    },
    /** the tab in the hash, else by phase: preparing, running, ended or archived */
    tab(): string {
      const value = `${MatomoUrl.hashParsed.value.campaignTab || ''}`;
      if (TABS.includes(value)) {
        return value;
      }
      const phase = this.results ? this.results.campaign.phase : 'running';
      if (phase === 'preparing') {
        return 'prepare';
      }
      return phase === 'running' ? 'progress' : 'result';
    },
    scopeText(): string {
      return scopeText(this.tr);
    },
    today(): string {
      return new Date().toLocaleDateString(lang());
    },
    dayOf(): string {
      const c = this.results ? this.results.campaign : null;
      if (!c || c.phase !== 'running' || !c.startDate || !c.endDate) {
        return '';
      }
      const total = daysBetween(c.startDate, c.endDate) + 1;
      const done = Math.min(total, daysBetween(c.startDate, this.results!.window.to) + 1);
      return this.tr('DayOf', `${done}`, `${total}`);
    },
    /** the share of the campaign's days passed, for the goal line */
    timeShare(): number | null {
      const c = this.results ? this.results.campaign : null;
      if (!c || !c.startDate || !c.endDate || c.phase !== 'running') {
        return null;
      }
      const total = daysBetween(c.startDate, c.endDate) + 1;
      const done = daysBetween(c.startDate, this.results!.window.to) + 1;
      return Math.max(0, Math.min(100, Math.round((done / total) * 100)));
    },
    windowText(): string {
      if (!this.results) {
        return '';
      }
      const { from, to, complete } = this.results.window;
      const c = this.results.campaign;
      if (c.phase === 'preparing' && c.startDate && c.startDate === from && from === to
        && this.results.series.length === 0) {
        return this.tr('NotStarted', this.day(from));
      }
      const text = this.tr('DaysOfCampaign', this.day(from), this.day(to));
      return complete ? text : `${text} ${this.tr('WindowIncomplete', this.day(from))}`;
    },
    summaryLead(): string {
      const goal = this.results && this.results.campaign.goal ? ` ${this.goalText}` : '';
      return `${this.summaryDaysText}${goal}`;
    },
    /** the summary is read without the period selector: only the days it counts */
    summaryDaysText(): string {
      if (!this.results) {
        return '';
      }
      const { from, to, complete } = this.results.window;
      const c = this.results.campaign;
      if (c.phase === 'preparing' && c.startDate && c.startDate === from && from === to
        && this.results.series.length === 0) {
        return this.tr('NotStarted', this.day(from));
      }
      const text = this.tr('SummaryDays', this.day(from), this.day(to));
      return complete ? text : `${text} ${this.tr('WindowIncomplete', this.day(from))}`;
    },
    goalTargetText(): string {
      const goal = this.results ? this.results.campaign.goal : null;
      if (!goal) {
        return this.tr('GoalMetric_none');
      }
      const target = goal.metric === 'revenue' ? this.money(goal.target) : this.number(goal.target);
      return `${this.tr(`GoalMetric_${goal.metric}`)}: ${target}`;
    },
    goalText(): string {
      const c = this.results ? this.results.campaign : null;
      if (!c || !c.goal) {
        return '';
      }
      const { metric } = c.goal;
      const value = metric === 'revenue' ? this.money(c.goal.value) : this.number(c.goal.value);
      const target = metric === 'revenue' ? this.money(c.goal.target) : this.number(c.goal.target);
      const share = `${this.percent(c)}`;
      return this.tr(`GoalProgress_${metric}`, value, target, share, this.day(c.goal.from));
    },
    /** reached, exceeded, missed, still running, or no goal */
    verdict(): string {
      const c = this.results ? this.results.campaign : null;
      if (!c || !c.goal) {
        return this.tr('Result_nogoal');
      }
      const p = this.percent(c);
      if (p > 100) {
        return this.tr('Result_exceeded');
      }
      if (p === 100) {
        return this.tr('Result_reached');
      }
      return c.phase === 'ended' || c.phase === 'archived'
        ? this.tr('Result_missed')
        : this.tr('Result_interim');
    },
    warnings(): string[] {
      if (!this.results) {
        return [];
      }
      const out = this.results.campaign.warnings.map((w) => this.tr(`Warning_${w}`));
      this.results.warnings.forEach((w) => {
        const item = this.results!.links.find((l) => l.link.idLink === w.idLink);
        if (item) {
          const name = this.channel(item.link);
          out.push(this.tr('Warning_link_quiet', name, this.day(w.lastVisitDay)));
        }
      });
      return out;
    },
    /** links counted by their own link ID, most conversions (then visits) first */
    ownLinks(): CampaignResults['links'] {
      if (!this.results) {
        return [];
      }
      return this.results.links
        .filter((l) => l.results && l.results.basis === 'link_id' && l.results.sharedWith === 1)
        .sort((a, b) => (b.results!.conversions - a.results!.conversions)
          || (b.results!.visits - a.results!.visits));
    },
    /** Matomo's own evolution graph of the campaign row (Referrers.getCampaigns, label) */
    chartParams(): Record<string, string | number> | null {
      if (!this.results || this.results.series.length === 0) {
        return null;
      }
      return {
        module: 'CoreHome',
        action: 'getRowEvolutionGraph',
        apiMethod: 'Referrers.getCampaigns',
        label: this.results.campaign.campaign,
        idSite: this.idSite,
        period: 'day',
        date: this.results.window.to,
        // the same days as the numbers above (Matomo's graph reads it, also at 5.0)
        evolution_day_last_n: Math.max(
          2,
          daysBetween(this.results.window.from, this.results.window.to) + 1,
        ),
        column: 'nb_visits',
        widget: 1,
      };
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    load() {
      loadCount += 1;
      const current = loadCount;
      this.loading = true;
      this.error = '';
      const url = MatomoUrl.parsed.value;
      const segment = `${url.segment || ''}`;
      const request = this.campaign
        ? fetchCampaignResults(this.idSite, this.campaign, segment).then((r) => {
          if (current === loadCount) {
            this.results = r;
          }
        })
        : fetchCampaigns(
          this.idSite,
          `${url.period || 'day'}`,
          `${url.date || 'today'}`,
          segment,
          'active',
        ).then((rows) => {
          if (current === loadCount) {
            this.rows = rows.filter((r) => r.source !== 'report' || r.period.visits > 0);
          }
        });
      request.catch((e: Error) => {
        if (current === loadCount) {
          this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
        }
      }).finally(() => {
        if (current === loadCount) {
          this.loading = false;
        }
      });
    },
    label(row: CampaignRow): string {
      return row.name || row.campaign;
    },
    number(value: number): string {
      return new Intl.NumberFormat(lang()).format(value);
    },
    /** as Matomo shows money: no decimals for whole amounts, exactly two otherwise */
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
      return shortDay(iso);
    },
    /** in the table, no dates leave the cell empty (the phrase would repeat on most rows) */
    tablePeriodText(row: CampaignRow): string {
      return row.startDate || row.endDate ? this.periodText(row) : '';
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
    goalOf(metric: string): string {
      const goal = this.results ? this.results.campaign.goal : null;
      if (!goal || goal.metric !== metric) {
        return '';
      }
      const target = metric === 'revenue' ? this.money(goal.target) : this.number(goal.target);
      return this.tr('OfGoal', target);
    },
    statesText(row: CampaignRow): string {
      const states = row.linkStates || { draft: 0, live: 0, ended: 0 };
      const parts: string[] = [];
      const names = [['live', 'Live'], ['draft', 'Draft'], ['ended', 'Ended']] as const;
      names.forEach(([key, name]) => {
        const n = states[key];
        if (n > 0) {
          parts.push(n === 1
            ? this.tr(`LinkState${name}One`)
            : this.tr(`LinkState${name}Many`, `${n}`));
        }
      });
      return parts.join(', ');
    },
    channel(link: Link): string {
      return [link.values.source, link.values.medium].filter((v) => v !== '').join(' / ')
        || link.values.campaign;
    },
    detail(link: Link): string {
      return [link.values.content, link.values.placement, link.values.keyword]
        .filter((v) => v !== '').join(', ');
    },
    shortTarget(url: string): string {
      return url.replace(/^https?:\/\//, '');
    },
    linkSummary(item: CampaignResults['links'][number]): string {
      const r = item.results!;
      const visits = r.visits === 1 ? this.tr('OneVisit') : this.tr('VisitsCount', this.number(r.visits));
      const conversions = r.conversions === 1
        ? this.tr('OneConversion')
        : this.tr('ConversionsCount', this.number(r.conversions));
      return `${this.channel(item.link)} (${visits}, ${conversions})`;
    },
    checksFor(r: CampaignResults): { key: string, done: boolean }[] {
      const c = r.campaign;
      return [
        { key: 'period', done: !!(c.startDate && c.endDate) },
        { key: 'goal', done: !!c.goal },
        { key: 'links', done: r.links.length > 0 },
      ];
    },
    pageUrl(campaign: string): string {
      return `#?${MatomoUrl.stringify({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: SUBCATEGORY,
        campaignPage: campaign || null,
        campaignTab: null,
      })}`;
    },
    selectTab(t: string) {
      MatomoUrl.updateHash({ ...MatomoUrl.hashParsed.value, campaignTab: t });
    },
    moveTab(step: number) {
      const next = TABS[(TABS.indexOf(this.tab) + step + TABS.length) % TABS.length];
      this.selectTab(next);
      this.$nextTick(() => {
        const button = document.getElementById(`fwcmp-tab-${next}`);
        if (button) {
          button.focus();
        }
      });
    },
    /** a Matomo report page with the campaign as segment (with the campaign referrer type) */
    analyseUrl(category: string, subcategory: string): string {
      const value = this.results ? this.results.campaign.campaign : '';
      const segment = `referrerType==campaign;referrerName==${encodeURIComponent(value)}`;
      const url = MatomoUrl.parsed.value;
      const base = `idSite=${this.idSite}&period=${encodeURIComponent(`${url.period || 'day'}`)}`
        + `&date=${encodeURIComponent(`${url.date || 'today'}`)}`;
      return `?module=CoreHome&action=index&${base}#?${base}&category=${category}`
        + `&subcategory=${subcategory}&segment=${encodeURIComponent(segment)}`;
    },
    openBuilder(campaign: string) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: null,
        campaign,
        campaignPage: null,
        campaignTab: null,
      });
    },
    openLink(idLink: number) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink,
        campaign: null,
        campaignPage: null,
        campaignTab: null,
      });
    },
    openSummary() {
      this.summary = true;
      document.documentElement.classList.add(PRINT_CLASS);
      window.addEventListener('beforeprint', this.beforePrint);
      window.addEventListener('afterprint', this.afterPrint);
      window.addEventListener('keydown', this.closeOnEscape);
      this.$nextTick(() => {
        const button = this.$refs.printButton as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    closeSummary() {
      const wasOpen = this.summary;
      this.summary = false;
      document.documentElement.classList.remove(PRINT_CLASS);
      window.removeEventListener('beforeprint', this.beforePrint);
      window.removeEventListener('afterprint', this.afterPrint);
      window.removeEventListener('keydown', this.closeOnEscape);
      this.afterPrint();
      if (wasOpen) {
        this.$nextTick(() => {
          const button = this.$refs.summaryButton as HTMLElement | undefined;
          if (button) {
            button.focus();
          }
        });
      }
    },
    /** Escape closes the summary wherever the focus is */
    closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.closeSummary();
      }
    },
    /** prints a copy of the summary at the page's top level, so Matomo's layout takes no pages */
    beforePrint() {
      this.afterPrint();
      const summary = this.$refs.summary as HTMLElement | undefined;
      if (!summary) {
        return;
      }
      const root = document.createElement('div');
      root.className = `${PRINT_ROOT} fwcmp-pages`;
      root.appendChild(summary.cloneNode(true));
      document.body.appendChild(root);
    },
    afterPrint() {
      document.querySelectorAll(`.${PRINT_ROOT}`).forEach((node) => node.remove());
    },
    print() {
      window.print();
    },
  },
});
</script>
