<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  The connected link builder (Campaigns > Link builder while this Matomo is connected to
  Feinwerk Campaigns, for users with write access): the workspace's campaign for the link, the
  link type (link only, short link, short link and QR code) and "Create in Feinwerk Campaigns"
  (FeinwerkCampaignManager.addPlatformLink). The builder's own fields carry target and values;
  source and medium are checked against the workspace's lists. While a campaign is chosen the
  platform's preview (previewPlatformLink, after a pause) goes to the builder's "Your link", so
  the link shown is the link that gets created. The result shows the short link and the QR code
  downloads (through this Matomo).
-->
<template>
  <section class="fwcmp-step fwcmp-platformlink">
    <h3 class="fwcmp-step__title">{{ tr('PlatformLinkTitle') }}</h3>
    <ActivityIndicator :loading="loading" />
    <!-- a website the workspace does not have: a lasting state, not an error (UI review F1) -->
    <div v-if="reason === 'no_website'" class="fwcmp-hint fwcmp-platformlink__off">
      {{ error }}
      <a
        v-if="appUrl"
        :href="appUrl"
        target="_blank"
        rel="noopener noreferrer"
      >{{ tr('PlatformOpen') }}</a>
    </div>
    <Alert v-else-if="error" severity="danger">
      {{ error }}
      <button
        v-if="!convention && passing"
        type="button"
        class="btn-flat fwcmp-retry"
        @click="load"
      >{{ tr('Retry') }}</button>
    </Alert>
    <template v-if="convention">
      <div v-if="website" class="fwcmp-hint">
        {{ tr('PlatformLinkWebsite', website.name) }}
      </div>
      <!-- the workspace's campaign: every platform link belongs to one -->
      <div class="fwcmp-platformlink__campaign">
        <label
          :id="`fwcmp-pcampaign-label-${idSite}`"
          class="fwcmp-label"
          :for="`fwcmp-pcampaign-${idSite}`"
        >{{ tr('PlatformLinkCampaign') }}</label>
        <input
          :id="`fwcmp-pcampaign-${idSite}`"
          v-model="query"
          class="fwcmp-input"
          type="text"
          autocomplete="off"
          :placeholder="tr('PlatformLinkCampaignSearch')"
          @input="searchSoon"
        >
        <div
          v-if="campaigns.length"
          class="fwcmp-platformlink__matches"
          role="group"
          :aria-labelledby="`fwcmp-pcampaign-label-${idSite}`"
        >
          <button
            v-for="c in campaigns"
            :key="c.id"
            type="button"
            class="fwcmp-chip"
            :aria-pressed="chosen && chosen.id === c.id ? 'true' : 'false'"
            @click="choose(c)"
          >{{ c.name }} <span class="fwcmp-chip__hint">{{ c.parameter }}</span></button>
        </div>
        <button
          v-if="query.trim() && !exactMatch"
          type="button"
          class="fwcmp-linkbutton"
          :disabled="busy"
          @click="createCampaign"
        >{{ tr('PlatformLinkNewCampaign', query.trim()) }}</button>
        <div v-if="chosen" class="fwcmp-hint">
          {{ tr('PlatformLinkChosen', chosen.name, chosen.parameter) }}
        </div>
      </div>
      <!-- source and medium from the workspace's lists -->
      <div
        v-for="f in listFields"
        :key="f.key"
        class="fwcmp-msg fwcmp-msg--warning"
      >
        {{ tr('PlatformLinkNotInList', f.label, value(f.key)) }}
        <span class="fwcmp-chips">
          <button
            v-for="v in f.values.slice(0, 10)"
            :key="v.value"
            type="button"
            class="fwcmp-chip"
            @click="$emit('set-field', { field: f.key, value: v.value })"
          >{{ v.value }}</button>
        </span>
      </div>
      <!-- the link type: one choice instead of two dependent checkboxes (UI review F5) -->
      <div v-if="types.length > 1" class="fwcmp-platformlink__types">
        <span class="fwcmp-label" aria-hidden="true">{{ tr('PlatformLinkType') }}</span>
        <SegmentedSwitch
          v-model="linkType"
          :options="typeOptions"
          :label="tr('PlatformLinkType')"
        />
      </div>
      <ul v-if="previewErrors.length" class="fwcmp-msgs">
        <li
          v-for="m in previewErrors"
          :key="m"
          class="fwcmp-msg fwcmp-msg--warning"
        >{{ m }}</li>
      </ul>
      <div class="fwcmp-actions">
        <!-- the page's one filled button while connected: the builder hides its own Save then -->
        <button
          v-if="!confirming"
          ref="createButton"
          type="button"
          class="btn"
          :disabled="!canCreate || busy"
          @click="askCreate"
        >{{ tr('PlatformLinkCreate') }}</button>
        <span v-if="missing" class="fwcmp-hint">{{ missing }}</span>
      </div>
      <!-- a failed create next to its button (UI review F7) -->
      <div
        v-if="createError"
        ref="createError"
        class="fwcmp-msg fwcmp-msg--error"
        role="alert"
        tabindex="-1"
      >{{ createError }}</div>
      <!-- the link is live and locked at once: ask first (Peter, 2026-11-26: "ja") -->
      <div
        v-if="confirming"
        class="fwcmp-confirm"
        role="group"
        :aria-label="tr('PlatformLinkCreate')"
      >
        <span>{{ tr(`PlatformLinkConfirm_${linkType}`) }}</span>
        <button
          ref="confirmButton"
          type="button"
          class="btn"
          :disabled="busy"
          @click="create"
        >{{ tr('PlatformLinkConfirmYes') }}</button>
        <button type="button" class="btn-flat" @click="cancelCreate">{{ tr('Cancel') }}</button>
      </div>
      <!-- the result: short link, QR code, the link in the app -->
      <div
        v-if="created"
        ref="result"
        class="fwcmp-platformlink__result"
        role="status"
        tabindex="-1"
      >
        <Alert severity="success">
          {{ createdExisted ? tr('PlatformLinkExisted') : tr('PlatformLinkCreated') }}
        </Alert>
        <pre class="fwcmp-url">{{ created.url }}</pre>
        <div class="fwcmp-platformlink__short">
          <button type="button" class="btn btn-outline" @click="copy(created.url, 'full')">
            {{ copied === 'full' ? tr('Copied') : tr('CopyLink') }}
          </button>
        </div>
        <div v-if="created.platform && created.platform.shortUrl" class="fwcmp-platformlink__short">
          <span>{{ tr('PlatformLinkShortUrl') }}</span>
          <code>{{ created.platform.shortUrl }}</code>
          <button type="button" class="btn-flat" @click="copy(created.platform.shortUrl, 'short')">
            {{ copied === 'short' ? tr('Copied') : tr('PlatformLinkCopyShort') }}
          </button>
        </div>
        <div v-if="created.platform && created.platform.qrUrl" class="fwcmp-platformlink__qr">
          <span>{{ tr('PlatformLinkQrDownload') }}</span>
          <a
            v-for="f in ['svg', 'png', 'pdf', 'eps']"
            :key="f"
            :href="`${created.platform.qrUrl}&format=${f}`"
            download
          >{{ f.toUpperCase() }}</a>
        </div>
        <a
          v-if="created.platform && created.platform.appUrl"
          :href="created.platform.appUrl"
          target="_blank"
          rel="noopener noreferrer"
        >{{ tr('PlatformOpenLink') }}</a>
      </div>
    </template>
  </section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ActivityIndicator, Alert, translate } from 'CoreHome';
import {
  addPlatformCampaign, addPlatformLink, fetchPlatformCampaigns, fetchPlatformConvention, Link,
  LinkForm, PlatformCampaign, PlatformConvention, PlatformField, previewPlatformLink,
} from './api';
import copyText from './clipboard';
import plainText from './plainText';
import SegmentedSwitch, { SegmentedOption } from './SegmentedSwitch.vue';
import { isPassing, splitPlatformError } from './platformReason';

const PREFIX = 'FeinwerkCampaignManager_';

type LinkType = 'link' | 'short' | 'qr';

interface State {
  convention: PlatformConvention['convention'] | null;
  website: PlatformConvention['website'] | null;
  loading: boolean;
  error: string;
  /** the code word of the error (no_website, lost, ...), '' for other errors */
  reason: string;
  /** a failed create, shown next to its button */
  createError: string;
  query: string;
  campaigns: PlatformCampaign[];
  chosen: PlatformCampaign | null;
  linkType: LinkType;
  busy: boolean;
  created: Link | null;
  createdExisted: boolean;
  /** which link was copied last: full, short or '' */
  copied: string;
  previewErrors: string[];
  /** the inline confirmation before creating */
  confirming: boolean;
  timer: number | null;
  searchSeq: number;
  previewTimer: number | null;
  previewCount: number;
}

export default defineComponent({
  components: { ActivityIndicator, Alert, SegmentedSwitch },
  props: {
    idSite: { type: Number, required: true },
    form: { type: Object as PropType<LinkForm>, required: true },
    /** the builder's channel tile, sent when the workspace has a channel of that key */
    channelKey: { type: String, default: '' },
    /** what the workspace allows (getConnectionStatus features) */
    features: {
      type: Object as PropType<{ shortLinks: boolean; qrCodes: boolean }>,
      default: () => ({ shortLinks: false, qrCodes: false }),
    },
    /** the workspace in the app (status links.app): a website gets its address there */
    appUrl: { type: String, default: '' },
  },
  emits: ['set-field', 'ready', 'preview'],
  data(): State {
    return {
      convention: null,
      website: null,
      loading: false,
      error: '',
      reason: '',
      createError: '',
      query: '',
      campaigns: [],
      chosen: null,
      linkType: 'short',
      busy: false,
      created: null,
      createdExisted: false,
      copied: '',
      previewErrors: [],
      confirming: false,
      timer: null,
      searchSeq: 0,
      previewTimer: null,
      previewCount: 0,
    };
  },
  created() {
    this.query = this.form.campaign || '';
    if (!this.types.includes(this.linkType)) {
      this.linkType = 'link';
    }
    this.load();
  },
  beforeUnmount() {
    [this.timer, this.previewTimer].forEach((t) => {
      if (t) {
        window.clearTimeout(t);
      }
    });
    this.$emit('ready', false);
  },
  watch: {
    /** step 3's value and the chosen campaign never disagree (UI review F1) */
    'form.campaign': function campaignChanged(value: string) {
      const typed = `${value || ''}`.trim();
      if (this.chosen && this.chosen.parameter !== typed) {
        this.chosen = null;
      }
      if (!this.chosen && typed) {
        const same = this.campaigns.filter((c) => c.parameter === typed);
        if (same.length === 1) {
          [this.chosen] = same;
        }
      }
    },
    previewKey() {
      this.created = null;
      this.createError = '';
      this.confirming = false;
      this.previewSoon();
    },
  },
  computed: {
    types(): LinkType[] {
      const out: LinkType[] = ['link'];
      if (this.features.shortLinks) {
        out.push('short');
        if (this.features.qrCodes) {
          out.push('qr');
        }
      }
      return out;
    },
    typeOptions(): SegmentedOption[] {
      return this.types.map((t) => ({ value: t, label: this.tr(`PlatformLinkType_${t}`) }));
    },
    passing(): boolean {
      return isPassing(this.reason);
    },
    exactMatch(): boolean {
      const q = this.query.trim().toLowerCase();
      return this.campaigns.some(
        (c) => c.name.toLowerCase() === q || c.parameter.toLowerCase() === q,
      );
    },
    /** list fields whose current value is not in the workspace's list */
    listFields(): PlatformField[] {
      if (!this.convention) {
        return [];
      }
      return this.convention.fields.filter((f) => f.type === 'list' && f.values.length
        && ['source', 'medium'].includes(f.key) && this.value(f.key) !== ''
        && !f.values.some((v) => v.value === this.value(f.key)));
    },
    targetOk(): boolean {
      return /^https?:\/\//i.test(this.form.targetUrl.trim());
    },
    canCreate(): boolean {
      return !!this.chosen && this.targetOk && this.form.source.trim() !== ''
        && this.form.medium.trim() !== '';
    },
    /** why Create is not possible yet, one reason at a time */
    missing(): string {
      if (!this.targetOk) {
        return this.tr('PlatformLinkMissingTarget');
      }
      if (!this.chosen) {
        return this.tr('PlatformLinkMissingCampaign');
      }
      if (this.form.source.trim() === '' || this.form.medium.trim() === '') {
        return this.tr('PlatformLinkMissingSource');
      }
      return '';
    },
    channel(): string {
      const conv = this.convention;
      return conv && conv.channels.some((c) => c.key === this.channelKey) ? this.channelKey : '';
    },
    /** what the platform's preview depends on */
    previewKey(): string {
      const f = this.form;
      return JSON.stringify([f.targetUrl, f.source, f.medium, f.content, f.keyword, f.placement,
        this.chosen ? this.chosen.id : '', this.linkType, this.channel]);
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    value(key: string): string {
      const map: Record<string, keyof LinkForm> = {
        source: 'source', medium: 'medium', content: 'content', term: 'keyword',
      };
      const field = map[key];
      return field ? `${this.form[field] || ''}`.trim() : '';
    },
    /** the sentence of an error, its code word kept apart (platformReason) */
    showError(e: Error, fallback: string) {
      const { reason, text } = splitPlatformError(e && e.message ? plainText(e.message) : '');
      this.reason = reason;
      this.error = text || this.tr(fallback);
    },
    load() {
      this.loading = true;
      this.error = '';
      this.reason = '';
      fetchPlatformConvention(this.idSite).then((answer) => {
        this.website = answer.website;
        this.convention = answer.convention;
        // the builder's own Save gives way: a link of this website is made in the workspace
        this.$emit('ready', true);
        this.search();
      }).catch((e: Error) => {
        this.showError(e, 'LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    searchSoon() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      // a pause in typing, not every keystroke: the connection shares 120 requests per minute
      this.timer = window.setTimeout(() => this.search(), 500);
    },
    search() {
      // a slower earlier search never overwrites a newer one
      this.searchSeq += 1;
      const seq = this.searchSeq;
      fetchPlatformCampaigns(this.idSite, this.query.trim()).then((rows) => {
        if (seq !== this.searchSeq) {
          return;
        }
        this.campaigns = rows;
        this.error = '';
        this.reason = '';
        const typed = `${this.form.campaign || ''}`.trim();
        if (!this.chosen && typed) {
          const same = rows.filter((c) => c.parameter === typed);
          if (same.length === 1) {
            [this.chosen] = same;
          }
        }
      }).catch((e: Error) => {
        if (seq !== this.searchSeq) {
          return;
        }
        this.showError(e, 'LoadFailed');
      });
    },
    choose(c: PlatformCampaign) {
      this.chosen = c;
      this.$emit('set-field', { field: 'campaign', value: c.parameter });
    },
    createCampaign() {
      this.busy = true;
      this.error = '';
      addPlatformCampaign(this.idSite, this.query.trim()).then((answer) => {
        const others = this.campaigns.filter((c) => c.id !== answer.campaign.id);
        this.campaigns = [answer.campaign, ...others];
        this.choose(answer.campaign);
      }).catch((e: Error) => {
        this.showError(e, 'SaveFailed');
      }).finally(() => {
        this.busy = false;
      });
    },
    input() {
      return {
        targetUrl: this.form.targetUrl.trim(),
        platformCampaignId: this.chosen ? this.chosen.id : '',
        source: this.form.source,
        medium: this.form.medium,
        content: this.form.content,
        keyword: this.form.keyword,
        channel: this.channel,
        placement: this.form.placement,
        shortLink: this.linkType !== 'link',
        dynamicQr: this.linkType === 'qr',
        note: this.form.note,
        startDate: this.form.startDate,
        endDate: this.form.endDate,
      };
    },
    /** the platform's preview after a pause, so "Your link" shows the link that gets created */
    previewSoon() {
      if (this.previewTimer) {
        window.clearTimeout(this.previewTimer);
      }
      this.previewErrors = [];
      if (!this.canCreate) {
        this.$emit('preview', '');
        return;
      }
      this.previewTimer = window.setTimeout(() => {
        this.previewCount += 1;
        const current = this.previewCount;
        previewPlatformLink(this.idSite, this.input()).then((answer) => {
          if (current !== this.previewCount) {
            return;
          }
          this.$emit('preview', answer.url || '');
          const errors = answer.errors || {};
          this.previewErrors = Object.keys(errors).map((k) => `${k}: ${([] as string[])
            .concat(errors[k] as string[]).join(' ')}`).concat(answer.warnings || []);
        }).catch((e: Error) => {
          if (current === this.previewCount) {
            this.$emit('preview', '');
            const { text } = splitPlatformError(e && e.message ? plainText(e.message) : '');
            this.previewErrors = [text || this.tr('PreviewFailed')];
          }
        });
      }, 800);
    },
    askCreate() {
      this.confirming = true;
      this.$nextTick(() => {
        const button = this.$refs.confirmButton as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    cancelCreate() {
      this.confirming = false;
      this.$nextTick(() => {
        const button = this.$refs.createButton as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    create() {
      if (!this.chosen) {
        return;
      }
      this.confirming = false;
      this.busy = true;
      this.createError = '';
      this.created = null;
      addPlatformLink(this.idSite, this.input()).then((answer) => {
        this.created = answer.link;
        this.createdExisted = answer.existed;
        // "Your link" shows the link that was created, not the preview with its placeholder id
        this.$emit('preview', answer.link.url);
        this.focusRef('result');
      }).catch((e: Error) => {
        const { text } = splitPlatformError(e && e.message ? plainText(e.message) : '');
        this.createError = text || this.tr('SaveFailed');
        this.focusRef('createError');
      }).finally(() => {
        this.busy = false;
        if (!this.created && !this.createError) {
          this.focusRef('createButton');
        }
      });
    },
    focusRef(name: string) {
      this.$nextTick(() => {
        const el = this.$refs[name] as HTMLElement | undefined;
        if (el) {
          el.focus();
        }
      });
    },
    copy(text: string, which: string) {
      copyText(text).then(() => {
        this.copied = which;
        window.setTimeout(() => {
          this.copied = '';
        }, 2000);
      }).catch(() => {
        this.copied = '';
      });
    },
  },
});
</script>
