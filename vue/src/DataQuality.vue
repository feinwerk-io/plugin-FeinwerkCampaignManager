<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  Campaigns > Data quality: spelling variants Matomo counts apart and campaign values without a
  saved link, for the selected period (FeinwerkCampaignManager.getQualityIssues).
-->
<template>
  <div class="fwcmp-quality">
    <div class="fwcmp-hint fwcmp-quality__scope">{{ scopeText }}</div>
    <ActivityIndicator :loading="loading" />
    <Alert v-if="error" severity="danger">
      {{ error }}
      <button type="button" class="btn-flat fwcmp-retry" @click="load">{{ tr('Retry') }}</button>
    </Alert>

    <template v-if="issues">
      <dl class="fwcmp-quality__tiles">
        <div class="fwcmp-quality__tile">
          <dt>{{ tr('ExplainedShare') }}</dt>
          <dd class="fwcmp-quality__big">{{ explainedPercent }}</dd>
          <dd>{{ explainedText }}</dd>
        </div>
        <div class="fwcmp-quality__tile">
          <dt>{{ tr('UnexplainedTitle') }}</dt>
          <dd class="fwcmp-quality__big">{{ number(issues.counts.unexplained) }}</dd>
          <dd>{{ countText(issues.counts.unexplainedVisits, 'OneVisit', 'VisitsCount') }}</dd>
        </div>
        <div class="fwcmp-quality__tile">
          <dt>{{ tr('VariantsTitle') }}</dt>
          <dd class="fwcmp-quality__big">{{ number(issues.counts.variants) }}</dd>
          <dd>{{ tr('CountedApart') }}</dd>
        </div>
      </dl>

      <section class="fwcmp-phase" :aria-label="tr('VariantsTitle')">
        <h3 class="fwcmp-step__title">
          {{ tr('VariantsTitle') }} ({{ issues.counts.variants }})
        </h3>
        <div class="fwcmp-hint fwcmp-quality__intro">{{ tr('VariantsIntro') }}</div>
        <!-- at the moment of need, once and dismissible: promotion, so admins only (block G3) -->
        <div
          v-if="issues.variants.length && promoteUrl && !hintHidden"
          class="fwcmp-notice fwcmp-quality__hint"
        >
          {{ tr('HintQualityConvention') }}
          <a :href="promoteUrl">{{ tr('BenefitsOpen') }}</a>
          <button
            type="button"
            class="fwcmp-linkbutton"
            @click="hideHint"
          >{{ tr('HintDismiss') }}</button>
        </div>
        <div v-if="!issues.variants.length" class="fwcmp-quality__none">
          {{ tr('VariantsNone') }}
        </div>
        <ul v-else class="fwcmp-cards">
          <li v-for="group in issues.variants" :key="group.suggested" class="fwcmp-card">
            <ul class="fwcmp-variants">
              <li
                v-for="v in group.values"
                :key="v.value"
                :class="{ 'is-suggested': v.value === group.suggested }"
              >
                <code class="fwcmp-variants__value">{{ v.value }}</code>
                <span
                  v-if="v.value === group.suggested && !group.maybeDistinct"
                  class="fwcmp-badge fwcmp-badge--live"
                >{{ tr('Recommended') }}</span>
                <span class="fwcmp-variants__numbers">
                  {{ countText(v.visits, 'OneVisit', 'VisitsCount') }}<template
                    v-if="v.savedLinks > 0"
                  >, <a :href="listUrl(v.value)">{{ linksText(v.savedLinks) }}</a></template>
                </span>
              </li>
            </ul>
            <!-- why this spelling (R50 D3) -->
            <div class="fwcmp-hint fwcmp-variants__why">{{ whyRecommended(group) }}</div>
            <div class="fwcmp-card__actions">
              <button
                v-if="canWrite"
                type="button"
                class="fwcmp-action"
                :aria-label="tr('NewLinkFor', group.suggested)"
                @click="openBuilder(group.suggested)"
              >{{ tr('NewLink') }}</button>
            </div>
          </li>
        </ul>
      </section>

      <section class="fwcmp-phase" :aria-label="tr('UnexplainedTitle')">
        <h3 class="fwcmp-step__title">
          {{ tr('UnexplainedTitle') }} ({{ issues.counts.unexplained - inGroupsCount }})
        </h3>
        <div class="fwcmp-hint fwcmp-quality__intro">{{ tr('UnexplainedIntro') }}</div>
        <div v-if="!unexplainedRows.length" class="fwcmp-quality__none">
          {{ tr('UnexplainedNone') }}
        </div>
        <!-- values of a variant group stand in their group above, not again here (R50 D3) -->
        <ul v-else class="fwcmp-cards">
          <li v-for="row in unexplainedRows" :key="row.value" class="fwcmp-card">
            <div class="fwcmp-card__head">
              <code class="fwcmp-variants__value">{{ row.value }}</code>
            </div>
            <div class="fwcmp-card__meta">
              {{ countText(row.visits, 'OneVisit', 'VisitsCount') }},
              {{ countText(row.conversions, 'OneConversion', 'ConversionsCount') }}
            </div>
            <div class="fwcmp-card__actions">
              <button
                v-if="canWrite"
                type="button"
                class="fwcmp-action"
                :aria-label="tr('NewLinkFor', row.value)"
                @click="openBuilder(row.value)"
              >{{ tr('NewLink') }}</button>
              <a
                class="fwcmp-action"
                :href="analyseUrl(row.value)"
                :aria-label="tr('AnalyseInMatomoOf', row.value)"
              >{{ tr('AnalyseInMatomo') }}</a>
            </div>
          </li>
        </ul>
        <div v-if="hiddenUnexplained > 0" class="fwcmp-hint">
          {{ tr('UnexplainedMore', `${hiddenUnexplained}`, number(hiddenVisits)) }}
        </div>
      </section>
    </template>

    <FeedbackBar
      v-if="feedback"
      class="fwcmp-page-feedback"
      :id-site="idSite"
      topic="data_quality"
      :question="tr('FeedbackQuestion_data_quality')"
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
import { fetchConnectionStatus, fetchQualityIssues, QualityIssues } from './api';
import FeedbackBar, { FeedbackSettings } from './FeedbackBar.vue';
import PromoLine, { PromoVariables } from './PromoLine.vue';
import plainText from './plainText';
import scopeText from './scope';

const PREFIX = 'FeinwerkCampaignManager_';
const CATEGORY = 'FeinwerkCampaignManager_Campaigns';

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}

interface State {
  issues: QualityIssues | null;
  loading: boolean;
  error: string;
  /** where "What does the connection add?" leads: the admin page or the platform's page */
  promoteUrl: string;
  hintHidden: boolean;
}

/** the hint's dismissal, per browser (a convenience, never needed for the page to work) */
const HINT_KEY = 'fwcmp-hint-quality-convention';

function hintDismissed(): boolean {
  try {
    return window.localStorage.getItem(HINT_KEY) === '1';
  } catch (e) {
    return false;
  }
}

export default defineComponent({
  props: {
    idSite: { type: Number, required: true },
    canWrite: { type: Boolean, default: false },
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
  },
  data(): State {
    return {
      issues: null,
      loading: false,
      error: '',
      promoteUrl: '',
      hintHidden: hintDismissed(),
    };
  },
  created() {
    this.load();
    fetchConnectionStatus().then((status) => {
      if (status.promote) {
        this.promoteUrl = status.connectUrl || status.moreUrl || '';
      }
    }).catch(() => undefined);
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
    /** share of the period's campaign visits whose value has a saved link or campaign details */
    explainedPercent(): string {
      if (!this.issues || this.issues.counts.campaignVisits === 0) {
        return '-';
      }
      const { campaignVisits, unexplainedVisits } = this.issues.counts;
      return new Intl.NumberFormat(lang(), { style: 'percent', maximumFractionDigits: 0 })
        .format((campaignVisits - unexplainedVisits) / campaignVisits);
    },
    explainedText(): string {
      if (!this.issues) {
        return '';
      }
      const { campaignVisits, unexplainedVisits } = this.issues.counts;
      return this.tr(
        'ExplainedShareDetail',
        this.number(campaignVisits),
        this.number(campaignVisits - unexplainedVisits),
      );
    },
    /** value => the recommended spelling of its group, for values that are a variant of another */
    /** the unexplained values that are no spelling variant (those stand in their group) */
    unexplainedRows(): QualityIssues['unexplained'] {
      return this.issues ? this.issues.unexplained.filter((r) => !this.inGroups[r.value]) : [];
    },
    inGroups(): Record<string, boolean> {
      const out: Record<string, boolean> = {};
      (this.issues ? this.issues.variants : []).forEach((g) => g.values.forEach((v) => {
        out[v.value] = true;
      }));
      return out;
    },
    /** unexplained values left out above because their group shows them */
    inGroupsCount(): number {
      return this.issues ? this.issues.unexplained.length - this.unexplainedRows.length : 0;
    },
    hiddenUnexplained(): number {
      return this.issues ? this.issues.counts.unexplained - this.issues.unexplained.length : 0;
    },
    hiddenVisits(): number {
      if (!this.issues) {
        return 0;
      }
      const shown = this.issues.unexplained.reduce((sum, r) => sum + r.visits, 0);
      return this.issues.counts.unexplainedVisits - shown;
    },
  },
  methods: {
    /** the rule of getQualityIssues: most saved links, then most visits */
    whyRecommended(group: QualityIssues['variants'][number]): string {
      // every value with its own saved links: maybe distinct campaigns, none recommended (F3)
      if (group.maybeDistinct) {
        return this.tr('VariantsMaybeDistinct');
      }
      const best = group.values.find((v) => v.value === group.suggested);
      return best && best.savedLinks > 0
        ? this.tr('RecommendedWhyLinks')
        : this.tr('RecommendedWhyVisits');
    },
    hideHint() {
      this.hintHidden = true;
      try {
        window.localStorage.setItem(HINT_KEY, '1');
      } catch (e) {
        // hidden for this page view only
      }
    },
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    load() {
      this.loading = true;
      this.error = '';
      fetchQualityIssues(this.idSite, this.period, this.date, this.segment).then((issues) => {
        this.issues = issues;
      }).catch((e: Error) => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    number(value: number): string {
      return new Intl.NumberFormat(lang()).format(value);
    },
    countText(n: number, one: string, many: string): string {
      return n === 1 ? this.tr(one) : this.tr(many, this.number(n));
    },
    linksText(n: number): string {
      return n === 1 ? this.tr('OneSavedLink') : this.tr('SavedLinksCount', this.number(n));
    },
    /** the saved links page, searched for the value */
    listUrl(value: string): string {
      return `#?${MatomoUrl.stringify({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_Links',
        search: value,
      })}`;
    },
    /** Matomo's visitor log with the campaign value as segment (works without segment archiving) */
    analyseUrl(value: string): string {
      // with the campaign referrer type: a website or search engine could carry the same name
      const segment = `referrerType==campaign;referrerName==${encodeURIComponent(value)}`;
      const base = `idSite=${this.idSite}&period=${encodeURIComponent(this.period)}`
        + `&date=${encodeURIComponent(this.date)}`;
      return `?module=CoreHome&action=index&${base}#?${base}`
        + `&category=General_Visitors&subcategory=Live_VisitorLog&segment=${encodeURIComponent(segment)}`;
    },
    openBuilder(campaign: string) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: null,
        campaign,
      });
    },
  },
});
</script>
