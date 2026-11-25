<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  Campaigns > Links: the saved links of the website (FeinwerkCampaignManager.getLinks), with search,
  active and archived links, copy, edit (opens the builder with idLink) and archive or restore.
-->
<template>
  <div class="fwcmp-list">
    <div>
      <div v-if="!nothingYet" class="fwcmp-toolbar">
        <div class="fwcmp-col">
          <label class="fwcmp-label" for="fwcmp-search">{{ tr('Search') }}</label>
          <input
            id="fwcmp-search"
            v-model="search"
            class="fwcmp-input"
            type="search"
            autocomplete="off"
            :placeholder="tr('SearchPlaceholder')"
          />
        </div>
        <div class="fwcmp-col fwcmp-col--narrow">
          <label class="fwcmp-label" for="fwcmp-status">{{ tr('Show') }}</label>
          <select id="fwcmp-status" v-model="status" class="fwcmp-input browser-default">
            <option value="active">{{ tr('StatusActive') }}</option>
            <option value="archived">{{ tr('StatusArchived') }}</option>
            <option value="all">{{ tr('StatusAll') }}</option>
          </select>
        </div>
        <div class="fwcmp-toolbar__new">
          <button type="button" class="btn" @click="openBuilder(0)">{{ tr('NewLink') }}</button>
        </div>
      </div>

      <ActivityIndicator :loading="loading" />
      <Alert v-if="actionError" severity="danger">{{ actionError }}</Alert>
      <!-- after copying a draft: a quiet offer to mark it live, confirmed (Peter, 2026-11-25) -->
      <div v-if="sent" class="fwcmp-notice" role="status">
        <template v-if="!sent.confirming">
          {{ tr('SentHint') }} <strong>{{ sent.label }}</strong>
          <button
            type="button"
            class="fwcmp-linkbutton"
            @click="confirmSent"
          >{{ tr('MarkLive') }}</button>
          <button
            type="button"
            class="fwcmp-linkbutton"
            @click="sent = null"
          >{{ tr('Close') }}</button>
        </template>
        <template v-else>
          {{ tr('MarkLiveConfirm') }}
          <button
            ref="sentYes"
            type="button"
            class="btn"
            :disabled="busy === sent.idLink"
            @click="markLive(sent.idLink)"
          >{{ tr('MarkLiveYes') }}</button>
          <button type="button" class="btn-flat" @click="sent = null">{{ tr('Cancel') }}</button>
        </template>
      </div>
      <div v-if="notice" class="fwcmp-notice" role="status">
        {{ notice.text }}
        <button
          ref="undo"
          type="button"
          class="fwcmp-linkbutton"
          @click="undoArchive"
        >{{ tr('Undo') }}</button>
      </div>
      <Alert v-if="error" severity="danger">
        {{ error }}
        <button type="button" class="btn-flat fwcmp-retry" @click="load()">
          {{ tr('Retry') }}
        </button>
      </Alert>

      <div v-else-if="!loading && page && page.total === 0" class="fwcmp-empty">
        <p v-if="search || status !== 'active'">{{ tr('NoLinksFound') }}</p>
        <template v-else>
          <p>{{ tr('NoLinksYet') }}</p>
          <button type="button" class="btn" @click="openBuilder(0)">{{ tr('OpenBuilder') }}</button>
        </template>
      </div>

      <div v-else-if="page" class="fwcmp-tablewrap">
        <div class="fwcmp-hint fwcmp-list__scope">{{ scopeText }}</div>
        <table v-content-table class="entityTable dataTable fwcmp-table">
          <thead>
            <tr>
              <th>{{ tr('FieldCampaign') }}</th>
              <th>{{ tr('SourceMedium') }}</th>
              <th>{{ tr('FieldTargetUrl') }}</th>
              <th class="fwcmp-table__num">{{ tr('Visits') }}</th>
              <th class="fwcmp-table__num">{{ tr('Conversions') }}</th>
              <th class="fwcmp-table__actions">{{ tr('Actions') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="link in page.links"
              :key="link.idLink"
              :class="{ 'is-archived': link.archived }"
            >
              <td class="fwcmp-table__main">
                <span class="fwcmp-table__campaign">{{ link.values.campaign }}</span>
                <span v-if="link.archived" class="fwcmp-badge">{{ tr('StatusArchivedOne') }}</span>
                <span
                  v-else
                  :class="`fwcmp-badge fwcmp-badge--${link.status}`"
                  :title="link.liveReason ? tr(`LiveReason_${link.liveReason}`) : ''"
                >{{ statusText(link) }}<span
                  v-if="link.liveReason"
                  class="fwcmp-sr-only"
                >, {{ tr(`LiveReason_${link.liveReason}`) }}</span></span>
                <span
                  v-if="details(link)"
                  class="fwcmp-table__note"
                  :title="details(link)"
                >{{ details(link) }}</span>
                <span
                  v-if="link.note"
                  class="fwcmp-table__note"
                  :title="link.note"
                >{{ link.note }}</span>
                <span class="fwcmp-table__by" :title="dateTime(link.updatedAt)">
                  {{ date(link.updatedAt) }} · {{ link.updatedBy }}
                </span>
              </td>
              <td class="fwcmp-table__sm">{{ sourceMedium(link) }}</td>
              <td class="fwcmp-table__target">
                <span :title="link.url">{{ shortTarget(link.targetUrl) }}</span>
              </td>
              <td class="fwcmp-table__num">
                <span class="fwcmp-table__numlabel">{{ tr('Visits') }}</span>
                <template v-if="resultOf(link)">
                  <span class="fwcmp-table__count">{{ number(resultOf(link).visits) }}</span>
                  <span
                    v-if="basisShort(link)"
                    class="fwcmp-table__basis"
                    :title="basisText(link)"
                  >{{ basisShort(link) }}<span
                    class="fwcmp-sr-only"
                  >: {{ basisText(link) }}</span></span>
                </template>
                <span
                  v-else-if="resultsFailed"
                  :title="tr('ResultsUnavailable')"
                >-<span class="fwcmp-sr-only">{{ tr('ResultsUnavailable') }}</span></span>
                <span v-else class="fwcmp-table__loading" aria-hidden="true">…</span>
              </td>
              <td class="fwcmp-table__num">
                <span class="fwcmp-table__numlabel">{{ tr('Conversions') }}</span>
                <span v-if="resultOf(link)" class="fwcmp-table__count">
                  {{ number(resultOf(link).conversions) }}
                </span>
                <span v-else-if="resultsFailed">-</span>
                <span v-else class="fwcmp-table__loading" aria-hidden="true">…</span>
              </td>
              <td class="fwcmp-table__actions">
                <button
                  type="button"
                  class="fwcmp-action"
                  :title="copyFailed === link.idLink ? tr('CopyFailed') : tr('CopyLink')"
                  :aria-label="tr('CopyLinkOf', link.values.campaign)"
                  @click="copy(link)"
                >{{ copyLabel(link) }}</button>
                <button
                  v-if="canWrite"
                  type="button"
                  class="fwcmp-action"
                  :aria-label="tr('EditLinkOf', link.values.campaign)"
                  @click="openBuilder(link.idLink)"
                >{{ tr('Edit') }}</button>
                <button
                  v-if="canWrite"
                  type="button"
                  class="fwcmp-action"
                  :disabled="busy === link.idLink"
                  :aria-label="archiveLabel(link)"
                  @click="toggleArchived(link)"
                >{{ link.archived ? tr('Restore') : tr('Archive') }}</button>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="page.total > limit" class="fwcmp-pager">
          <span>{{ tr('Showing', `${page.offset + 1}`, `${lastShown}`, `${page.total}`) }}</span>
          <button
            type="button"
            class="btn-flat"
            :disabled="page.offset === 0"
            @click="goTo(page.offset - limit)"
          >{{ tr('Previous') }}</button>
          <button
            type="button"
            class="btn-flat"
            :disabled="lastShown >= page.total"
            @click="goTo(page.offset + limit)"
          >{{ tr('Next') }}</button>
        </div>
        <div class="fwcmp-hint">
          {{ tr('ResultsWhere') }}
          <a :href="overviewUrl">{{ tr('CampaignsOverview') }}</a>,
          <a :href="campaignReportUrl">{{ tr('MatomoCampaignReport') }}</a>
        </div>
      </div>
      <FeedbackBar
        v-if="feedback"
        class="fwcmp-page-feedback"
        :id-site="idSite"
        topic="saved_links"
        :question="tr('FeedbackQuestion_saved_links')"
        :feedback="feedback"
      />
      <PromoLine
        :promo="promo"
        :dismiss-label="tr('PromoDismiss')"
      />
    </div>
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
} from 'CoreHome';
import {
  archiveLink,
  fetchLinkResults,
  markLinkLive,
  fetchLinks,
  Link,
  LinkPage,
  LinkResult,
} from './api';
import copyText from './clipboard';
import FeedbackBar, { FeedbackSettings } from './FeedbackBar.vue';
import PromoLine, { PromoVariables } from './PromoLine.vue';
import plainText from './plainText';
import scopeText from './scope';
import shortDay from './shortDay';

const PREFIX = 'FeinwerkCampaignManager_';

function lang(): string | undefined {
  return document.documentElement.lang || undefined;
}
const LIMIT = 50;

interface State {
  search: string;
  status: string;
  page: LinkPage | null;
  loading: boolean;
  error: string;
  busy: number;
  copied: number;
  copyFailed: number;
  actionError: string;
  notice: { text: string, idLink: number, archived: boolean } | null;
  /** a draft was copied: "Link verschickt? Als live markieren" */
  sent: { idLink: number, label: string, confirming: boolean } | null;
  timer: number | null;
  /** numbers of the shown page by idLink; null while loading or after a failure */
  results: Record<number, LinkResult> | null;
  resultsFailed: boolean;
}

/** a newer load wins over a slower older one */
let loadCount = 0;

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
  directives: {
    ContentTable,
  },
  data(): State {
    const hash = MatomoUrl.hashParsed.value;
    const status = `${hash.status || ''}`;
    return {
      // kept in the hash, so a link (data quality page) or a reload opens the same list
      search: typeof hash.search === 'string' ? hash.search : '',
      status: ['active', 'archived', 'all'].includes(status) ? status : 'active',
      page: null,
      loading: false,
      error: '',
      busy: 0,
      copied: 0,
      copyFailed: 0,
      actionError: '',
      notice: null,
      sent: null,
      timer: null,
      results: null,
      resultsFailed: false,
    };
  },
  created() {
    this.load();
  },
  beforeUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
  },
  watch: {
    search() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => {
        this.keepFilters();
        this.load(0);
      }, 300);
    },
    status() {
      this.notice = null;
      this.keepFilters();
      this.load(0);
    },
  },
  computed: {
    overviewUrl(): string {
      return this.pageUrl('FeinwerkCampaignManager_Campaigns', 'FeinwerkCampaignManager_Overview');
    },
    /** Matomo's campaign report (Marketing Campaigns Reporting uses the same page) */
    campaignReportUrl(): string {
      return this.pageUrl('Referrers_Referrers', 'Referrers_Campaigns');
    },
    limit(): number {
      return LIMIT;
    },
    scopeText(): string {
      return scopeText(this.tr);
    },
    /** no link at all yet (not a search without hits): the empty state alone, no toolbar */
    nothingYet(): boolean {
      return !!this.page && this.page.total === 0 && this.search === '' && this.status === 'active'
        && !this.loading;
    },
    lastShown(): number {
      return this.page ? this.page.offset + this.page.links.length : 0;
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    load(offset?: number) {
      this.loading = true;
      this.error = '';
      this.actionError = '';
      let from = this.page ? this.page.offset : 0;
      if (typeof offset === 'number') {
        from = offset;
      }
      loadCount += 1;
      const current = loadCount;
      this.results = null;
      this.resultsFailed = false;
      fetchLinks(this.idSite, this.status, this.search, LIMIT, Math.max(0, from)).then((page) => {
        if (current !== loadCount) {
          return;
        }
        this.page = page;
        this.loadResults(current, page);
      }).catch((e: Error) => {
        if (current === loadCount) {
          this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
        }
      }).finally(() => {
        if (current === loadCount) {
          this.loading = false;
        }
      });
    },
    /** the numbers come after the rows and fail soft: a dash, no error box */
    loadResults(current: number, page: LinkPage) {
      if (page.links.length === 0) {
        return;
      }
      const url = MatomoUrl.parsed.value;
      fetchLinkResults(
        this.idSite,
        `${url.period || 'day'}`,
        `${url.date || 'today'}`,
        `${url.segment || ''}`,
        this.status,
        this.search,
        LIMIT,
        page.offset,
      ).then((rows) => {
        if (current !== loadCount) {
          return;
        }
        const byLink: Record<number, LinkResult> = {};
        rows.forEach((r) => { byLink[r.idLink] = r; });
        this.results = byLink;
      }).catch(() => {
        if (current === loadCount) {
          this.resultsFailed = true;
        }
      });
    },
    resultOf(link: Link): LinkResult | null {
      return this.results ? this.results[link.idLink] || null : null;
    },
    basisText(link: Link): string {
      const result = this.resultOf(link);
      if (!result) {
        return '';
      }
      if (result.basis === 'link_id') {
        return this.tr(result.sharedWith > 1 ? 'ResultsBasis_link_id_shared' : 'ResultsBasis_link_id');
      }
      const text = this.tr(`ResultsBasis_${result.basis}`);
      return result.sharedWith > 1 ? `${text} ${this.tr('ResultsSharedHelp')}` : text;
    },
    /** visible under the visits unless the link is counted by a link ID it has alone */
    basisShort(link: Link): string {
      const result = this.resultOf(link);
      if (!result || (result.basis === 'link_id' && result.sharedWith <= 1)) {
        return '';
      }
      const short = this.tr(`ResultsBasisShort_${result.basis}`);
      return result.sharedWith > 1
        ? `${short}, ${this.tr('ResultsShared', this.number(result.sharedWith))}`
        : short;
    },
    number(n: number): string {
      return new Intl.NumberFormat(lang()).format(n);
    },
    /** search and status in the hash; empty or default values leave it */
    keepFilters() {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        search: this.search.trim() === '' ? null : this.search,
        status: this.status === 'active' ? null : this.status,
      });
    },
    goTo(offset: number) {
      this.load(offset);
    },
    sourceMedium(link: Link): string {
      return [link.values.source, link.values.medium].filter((v) => v !== '').join(' / ');
    },
    shortTarget(url: string): string {
      return url.replace(/^https?:\/\//, '');
    },
    /** keyword and content: they tell links of the same campaign and channel apart */
    details(link: Link): string {
      const parts: string[] = [];
      if (link.values.keyword) {
        parts.push(`${this.tr('FieldKeyword')}: ${link.values.keyword}`);
      }
      if (link.values.content) {
        parts.push(`${this.tr('FieldContent')}: ${link.values.content}`);
      }
      return parts.join(', ');
    },
    date(iso: string): string {
      const parsed = new Date(iso);
      if (Number.isNaN(parsed.getTime())) {
        return iso;
      }
      // the page's language (Matomo sets it on <html>), so dates read as elsewhere in Matomo
      return parsed.toLocaleDateString(document.documentElement.lang || undefined, {
        year: 'numeric', month: 'short', day: 'numeric',
      });
    },
    dateTime(iso: string): string {
      const parsed = new Date(iso);
      return Number.isNaN(parsed.getTime())
        ? iso
        : parsed.toLocaleString(document.documentElement.lang || undefined);
    },
    archiveLabel(link: Link): string {
      return this.tr(link.archived ? 'RestoreLinkOf' : 'ArchiveLinkOf', link.values.campaign);
    },
    copyLabel(link: Link): string {
      if (this.copied === link.idLink) {
        return this.tr('Copied');
      }
      return this.copyFailed === link.idLink ? this.tr('CopyFailedShort') : this.tr('Copy');
    },
    copy(link: Link) {
      copyText(link.url).then(() => {
        this.copied = link.idLink;
        this.copyFailed = 0;
        this.sent = this.canWrite && !link.archived && link.status === 'draft'
          ? { idLink: link.idLink, label: link.values.campaign, confirming: false }
          : null;
        window.setTimeout(() => {
          if (this.copied === link.idLink) {
            this.copied = 0;
          }
        }, 2000);
      }).catch(() => {
        // said at the row: the button reads "Not copied", its title the way out
        this.copyFailed = link.idLink;
      });
    },
    confirmSent() {
      if (!this.sent) {
        return;
      }
      this.sent.confirming = true;
      this.$nextTick(() => {
        const button = this.$refs.sentYes as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    markLive(idLink: number) {
      this.busy = idLink;
      this.actionError = '';
      markLinkLive(this.idSite, idLink).then(() => {
        this.sent = null;
        this.load();
      }).catch((e: Error) => {
        this.actionError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
      }).finally(() => {
        this.busy = 0;
      });
    },
    /** draft, "live since 12.11." or ended */
    statusText(link: Link): string {
      if (link.status === 'live' && link.liveSince) {
        return this.tr('LiveSinceBadge', shortDay(link.liveSince));
      }
      return this.tr(`LinkStatus_${link.status}`);
    },
    toggleArchived(link: Link) {
      this.setArchived(link.idLink, link.values.campaign, !link.archived);
    },
    undoArchive() {
      if (this.notice) {
        const { idLink, archived } = this.notice;
        this.setArchived(idLink, '', !archived, true);
      }
    },
    /** archives or restores, then says so with an Undo that takes the focus (the row is gone) */
    setArchived(idLink: number, label: string, archived: boolean, isUndo = false) {
      this.busy = idLink;
      this.actionError = '';
      this.notice = null;
      archiveLink(this.idSite, idLink, archived).then(() => {
        if (!isUndo) {
          this.notice = {
            text: this.tr(archived ? 'LinkArchived' : 'LinkRestored', label),
            idLink,
            archived,
          };
        }
        this.load();
        this.$nextTick(() => {
          const undo = this.$refs.undo as HTMLElement | undefined;
          if (undo) {
            undo.focus();
          }
        });
      }).catch((e: Error) => {
        this.actionError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
      }).finally(() => {
        this.busy = 0;
      });
    },
    /** a reporting page of this website and period (the overview, Matomo's campaign report) */
    pageUrl(category: string, subcategory: string): string {
      const hash = {
        ...MatomoUrl.hashParsed.value,
        category,
        subcategory,
        idLink: null,
        campaign: null,
      };
      return `#?${MatomoUrl.stringify(hash)}`;
    },
    openBuilder(idLink: number) {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: 'FeinwerkCampaignManager_Campaigns',
        subcategory: 'FeinwerkCampaignManager_LinkBuilder',
        idLink: idLink || null,
      });
    },
  },
});
</script>
