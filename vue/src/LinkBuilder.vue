<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  Campaigns > Link builder: target, channel, campaign and the rest of the values; the link is
  built and checked by FeinwerkCampaignManager.previewLink while typing, saved by addLink, or by
  updateLink when the page is opened with idLink in the hash (the list's "Edit").
-->
<template>
  <div class="fwcmp-builder">
    <ActivityIndicator :loading="loading" />
    <Alert v-if="loadError" severity="danger">
      {{ loadError }}
      <button type="button" class="btn-flat fwcmp-retry" @click="load">{{ tr('Retry') }}</button>
    </Alert>
    <Alert v-if="missingLink" severity="warning">
      {{ tr('LinkNotFound') }}
      <button type="button" class="btn-flat fwcmp-retry" @click="openList">
        {{ tr('ToTheLinks') }}
      </button>
    </Alert>
    <template v-if="ready">
      <div v-if="editing" class="fwcmp-editing">
        <p class="fwcmp-editing__title">
          <strong>{{ tr('EditingLink', editingLabel) }}</strong>
          <span
            :class="`fwcmp-badge fwcmp-badge--${editingStatus}`"
          >{{ tr(`LinkStatus_${editingStatus}`) }}</span>
          <span v-if="liveSinceText" class="fwcmp-editing__since">{{ liveSinceText }}</span>
          <button
            type="button"
            class="btn-flat fwcmp-editing__new"
            @click="startNew"
          >{{ tr('NewLink') }}</button>
        </p>
        <div v-if="!locked" class="fwcmp-hint">
          {{ tr('EditHint') }}
          <template v-if="canWrite">
            <button
              type="button"
              class="fwcmp-linkbutton fwcmp-editing__live"
              :disabled="dirty || markingLive"
              :aria-describedby="dirty ? 'fwcmp-live-first' : undefined"
              @click="askLive('header')"
            >{{ tr('MarkLive') }}</button>
            <span v-if="dirty" id="fwcmp-live-first">({{ tr('MarkLiveSaveFirst') }})</span>
          </template>
        </div>
        <div v-if="!locked && confirmLiveAt === 'header'" class="fwcmp-confirm" role="group">
          <span>{{ tr('MarkLiveConfirm') }}</span>
          <button
            ref="confirmHeader"
            type="button"
            class="btn"
            :disabled="markingLive"
            @click="markLive"
          >{{ tr('MarkLiveYes') }}</button>
          <button
            type="button"
            class="btn-flat"
            @click="confirmLiveAt = ''"
          >{{ tr('Cancel') }}</button>
        </div>
        <div
          v-if="locked"
          :class="wentLive ? 'fwcmp-msg fwcmp-msg--warning' : 'fwcmp-hint'"
          class="fwcmp-editing__lock"
          role="status"
        >
          {{ wentLive ? tr('LinkWentLive') : tr('LinkIsLive') }}
          <button
            v-if="canWrite"
            type="button"
            class="fwcmp-linkbutton"
            @click="saveAsNew"
          >{{ tr('SaveAsNewLink') }}</button>
        </div>
      </div>
      <div v-else-if="fromLive" class="fwcmp-hint fwcmp-editing__from">
        {{ tr('NewFromLive', fromLive) }}
      </div>

      <!-- a live link: its saved values as a card, only the note and the days of use change -->
      <section v-if="locked" class="fwcmp-step fwcmp-livecard">
        <dl class="fwcmp-livecard__values">
          <div v-for="line in liveLines" :key="line.label">
            <dt>{{ line.label }}</dt>
            <dd>{{ line.value }}</dd>
          </div>
        </dl>
        <div class="fwcmp-row">
          <div class="fwcmp-col">
            <label class="fwcmp-label" for="fwcmp-start">{{ tr('StartDate') }}</label>
            <input id="fwcmp-start" v-model="form.startDate" class="fwcmp-input" type="date" />
          </div>
          <div class="fwcmp-col">
            <label class="fwcmp-label" for="fwcmp-end">{{ tr('EndDate') }}</label>
            <input
              id="fwcmp-end"
              v-model="form.endDate"
              class="fwcmp-input"
              type="date"
              :aria-invalid="datesWrong ? 'true' : 'false'"
              aria-describedby="fwcmp-end-msg"
            />
            <ul id="fwcmp-end-msg" class="fwcmp-msgs">
              <li v-if="datesWrong" class="fwcmp-msg fwcmp-msg--error">
                {{ tr('EndBeforeStart') }}
              </li>
            </ul>
          </div>
        </div>
        <label class="fwcmp-label" for="fwcmp-note">{{ tr('Note') }}</label>
        <textarea
          id="fwcmp-note"
          v-model="form.note"
          class="fwcmp-input fwcmp-note browser-default"
          rows="2"
          maxlength="1000"
        />
      </section>

      <template v-else>

      <section class="fwcmp-step">
        <h3 class="fwcmp-step__title">
          <span class="fwcmp-step__no" aria-hidden="true">1</span>{{ tr('StepTarget') }}
        </h3>
        <label class="fwcmp-label" for="fwcmp-targetUrl">{{ tr('FieldTargetUrl') }}</label>
        <input
          id="fwcmp-targetUrl"
          v-model="form.targetUrl"
          class="fwcmp-input"
          type="url"
          inputmode="url"
          autocomplete="off"
          spellcheck="false"
          :placeholder="targetPlaceholder"
          :aria-invalid="hasError('targetUrl') ? 'true' : 'false'"
          aria-describedby="fwcmp-targetUrl-msg"
        />
        <ul id="fwcmp-targetUrl-msg" class="fwcmp-msgs">
          <li
            v-for="m in messagesFor('targetUrl')"
            :key="m.code"
            :class="`fwcmp-msg fwcmp-msg--${m.kind}`"
          >{{ m.message }}</li>
        </ul>
      </section>

      <section class="fwcmp-step">
        <h3 class="fwcmp-step__title">
          <span class="fwcmp-step__no" aria-hidden="true">2</span>{{ tr('StepChannel') }}
        </h3>
        <div class="fwcmp-tiles" role="group" :aria-label="tr('StepChannel')">
          <button
            v-for="t in templates"
            :key="t.key"
            type="button"
            class="fwcmp-tile"
            :aria-pressed="activeTemplate && activeTemplate.key === t.key ? 'true' : 'false'"
            @click="applyTemplate(t)"
          >
            <span class="fwcmp-tile__label">{{ t.label }}</span>
            <span class="fwcmp-tile__hint">{{ templateHint(t) }}</span>
          </button>
        </div>
        <div class="fwcmp-row">
          <div v-for="field in ['source', 'medium']" :key="field" class="fwcmp-col">
            <label class="fwcmp-label" :for="`fwcmp-${field}`">{{ label(field) }}</label>
            <input
              :id="`fwcmp-${field}`"
              v-model="form[field]"
              class="fwcmp-input"
              type="text"
              autocomplete="off"
              :aria-invalid="hasError(field) ? 'true' : 'false'"
              :aria-describedby="`fwcmp-${field}-msg`"
            />
            <div v-if="chips(field).length" class="fwcmp-chips">
              <span class="fwcmp-chips__label">{{ tr('Suggestions') }}</span>
              <button
                v-for="value in chips(field)"
                :key="value"
                type="button"
                class="fwcmp-chip"
                @click="form[field] = value"
              >{{ value }}</button>
            </div>
            <ul :id="`fwcmp-${field}-msg`" class="fwcmp-msgs">
              <li
                v-for="m in messagesFor(field)"
                :key="m.code"
                :class="`fwcmp-msg fwcmp-msg--${m.kind}`"
              >{{ m.message }}<button
                v-if="m.known"
                type="button"
                class="fwcmp-msg__fix"
                @click="form[field] = m.known"
              >{{ tr('UseValue', m.known) }}</button></li>
            </ul>
          </div>
        </div>
        <div v-if="!parameterSets.mcrActive" class="fwcmp-hint">{{ tr('McrHintShort') }}</div>
      </section>

      <section class="fwcmp-step">
        <h3 class="fwcmp-step__title">
          <span class="fwcmp-step__no" aria-hidden="true">3</span>{{ tr('StepCampaign') }}
        </h3>
        <label class="fwcmp-label" for="fwcmp-campaign">{{ tr('FieldCampaign') }}</label>
        <input
          id="fwcmp-campaign"
          v-model="form.campaign"
          class="fwcmp-input"
          type="text"
          autocomplete="off"
          :placeholder="tr('CampaignPlaceholder')"
          :aria-invalid="hasError('campaign') ? 'true' : 'false'"
          aria-describedby="fwcmp-campaign-msg"
        />
        <div v-if="chips('campaign').length" class="fwcmp-chips">
          <span class="fwcmp-chips__label">{{ tr('AlreadyUsed') }}</span>
          <button
            v-for="value in chips('campaign')"
            :key="value"
            type="button"
            class="fwcmp-chip"
            :class="{ 'fwcmp-chip--counted': counted.includes(value) }"
            :title="counted.includes(value) ? tr('SuggestionCounted') : ''"
            @click="form.campaign = value"
          >{{ value }}<span
            v-if="counted.includes(value)"
            class="fwcmp-sr-only"
          > ({{ tr('SuggestionCounted') }})</span></button>
        </div>
        <ul id="fwcmp-campaign-msg" class="fwcmp-msgs">
          <li
            v-for="m in messagesFor('campaign')"
            :key="m.code"
            :class="`fwcmp-msg fwcmp-msg--${m.kind}`"
          >{{ m.message }}<button
            v-if="m.known"
            type="button"
            class="fwcmp-msg__fix"
            @click="form.campaign = m.known"
          >{{ tr('UseValue', m.known) }}</button></li>
        </ul>
      </section>

      <details class="fwcmp-more" :open="moreOpen" @toggle="onToggleMore">
        <summary>{{ tr('MoreFields') }}</summary>
        <div class="fwcmp-row">
          <div v-for="field in moreFields" :key="field" class="fwcmp-col">
            <label class="fwcmp-label" :for="`fwcmp-${field}`">{{ label(field) }}</label>
            <input
              :id="`fwcmp-${field}`"
              v-model="form[field]"
              class="fwcmp-input"
              type="text"
              autocomplete="off"
              :aria-invalid="hasError(field) ? 'true' : 'false'"
              :aria-describedby="`fwcmp-${field}-msg`"
            />
            <ul :id="`fwcmp-${field}-msg`" class="fwcmp-msgs">
              <li
                v-for="m in messagesFor(field)"
                :key="m.code"
                :class="`fwcmp-msg fwcmp-msg--${m.kind}`"
              >{{ m.message }}</li>
            </ul>
          </div>
          <div class="fwcmp-col">
            <label class="fwcmp-label" for="fwcmp-set">{{ tr('ParameterSet') }}</label>
            <select
              id="fwcmp-set"
              v-model="form.parameterSet"
              class="fwcmp-input fwcmp-select browser-default"
            >
              <option v-for="set in parameterSets.sets" :key="set.key" :value="set.key">
                {{ setLabel(set.key) }}
              </option>
            </select>
          </div>
        </div>
        <div class="fwcmp-row">
          <div class="fwcmp-col">
            <label class="fwcmp-label" for="fwcmp-start">{{ tr('StartDate') }}</label>
            <input id="fwcmp-start" v-model="form.startDate" class="fwcmp-input" type="date" />
          </div>
          <div class="fwcmp-col">
            <label class="fwcmp-label" for="fwcmp-end">{{ tr('EndDate') }}</label>
            <input
              id="fwcmp-end"
              v-model="form.endDate"
              class="fwcmp-input"
              type="date"
              :aria-invalid="datesWrong ? 'true' : 'false'"
              aria-describedby="fwcmp-end-msg"
            />
            <ul id="fwcmp-end-msg" class="fwcmp-msgs">
              <li v-if="datesWrong" class="fwcmp-msg fwcmp-msg--error">
                {{ tr('EndBeforeStart') }}
              </li>
            </ul>
          </div>
        </div>
        <label class="fwcmp-label" for="fwcmp-note">{{ tr('Note') }}</label>
        <textarea
          id="fwcmp-note"
          v-model="form.note"
          class="fwcmp-input fwcmp-note browser-default"
          rows="2"
          maxlength="1000"
        />
      </details>
      </template>

      <section class="fwcmp-result">
        <h3 class="fwcmp-step__title">{{ tr('YourLink') }}</h3>
        <p class="fwcmp-sr-only" role="status">{{ statusText }}</p>
        <Alert v-if="previewError" severity="warning">
          {{ tr('PreviewFailed') }}
          <button type="button" class="btn-flat fwcmp-retry" @click="runPreview">
            {{ tr('Retry') }}
          </button>
        </Alert>
        <pre v-if="shownUrl" class="fwcmp-url">{{ shownUrl }}</pre>
        <div v-else class="fwcmp-placeholder">
          {{ platformReady && !editing ? tr('PlatformLinkAppearsHere') : tr('LinkAppearsHere') }}
        </div>
        <ul v-if="otherWarnings.length" class="fwcmp-msgs">
          <li
            v-for="m in otherWarnings"
            :key="`${m.field}-${m.code}`"
            class="fwcmp-msg fwcmp-msg--warning"
          >{{ m.message }}</li>
        </ul>
        <div v-if="result && result.campaignIdOnSave" class="fwcmp-hint">
          {{ tr('LinkIdHint') }}
        </div>
        <div v-if="sameLink" class="fwcmp-hint">
          {{ tr('SameLinkSaved') }}
          <a href="" @click.prevent="openList">{{ tr('ToTheLinks') }}</a>
        </div>
        <div class="fwcmp-actions">
          <!-- one filled button per screen: Save for writers, Copy for view-only users -->
          <!-- connected: the preview carries the platform's placeholder link ID, so only the
               created link is copied (in the panel below) -->
          <button
            v-if="!(platformReady && !editing)"
            type="button"
            :class="canWrite ? 'btn btn-outline' : 'btn'"
            :disabled="!shownUrl"
            @click="copyLink"
          >{{ copyLabel }}</button>
          <SaveButton
            v-if="canWrite && !(platformReady && !editing)"
            :value="editing ? tr('SaveChanges') : tr('SaveLink')"
            :disabled="!canSave"
            :saving="saving"
            @confirm="save"
          />
        </div>
        <div v-if="copyFailed" class="fwcmp-msg fwcmp-msg--warning">{{ tr('CopyFailed') }}</div>
        <!-- after copying a saved draft: a quiet offer to mark it live (Peter, 2026-11-25) -->
        <div
          v-if="sentHint && !locked && confirmLiveAt !== 'result'"
          class="fwcmp-hint fwcmp-sent"
        >
          {{ tr('SentHint') }}
          <button
            type="button"
            class="fwcmp-linkbutton"
            @click="askLive('result')"
          >{{ tr('MarkLive') }}</button>
        </div>
        <div v-if="confirmLiveAt === 'result'" class="fwcmp-confirm" role="group">
          <span>{{ tr('MarkLiveConfirm') }}</span>
          <button
            ref="confirmResult"
            type="button"
            class="btn"
            :disabled="markingLive"
            @click="markLive"
          >{{ tr('MarkLiveYes') }}</button>
          <button
            type="button"
            class="btn-flat"
            @click="confirmLiveAt = ''"
          >{{ tr('Cancel') }}</button>
        </div>
        <div v-if="!canWrite" class="fwcmp-hint">{{ tr('NeedWriteAccess') }}</div>
        <Alert v-if="saved" severity="success">
          {{ saved }}
          <a href="" @click.prevent="openList">{{ tr('ToTheLinks') }}</a>
        </Alert>
        <Alert v-if="saveError" severity="danger">{{ saveError }}</Alert>
      </section>
      <!-- connected to Feinwerk Campaigns: the same values as a platform link -->
      <PlatformLinkPanel
        v-if="platform && platform.connected && canWrite && !editing"
        :id-site="idSite"
        :form="form"
        :features="platform.features"
        :app-url="platform.links.app || ''"
        :channel-key="activeTemplate ? activeTemplate.key : ''"
        @set-field="setField"
        @ready="platformReady = $event"
        @preview="platformPreview = $event"
      />
      <!-- not connected: short link and QR code locked, with the neutral line (decision 1 of
           2026-11-23, in 5.1.0 by Peter's "ja" of 2026-11-26); no benefit copy, not promotion -->
      <section
        v-else-if="platform && platform.mode === 'standalone' && canWrite && !editing"
        class="fwcmp-step fwcmp-platformlink fwcmp-platformlink--locked"
      >
        <div class="fwcmp-platformlink__types">
          <span class="fwcmp-label" aria-hidden="true">{{ tr('PlatformLinkType') }}</span>
          <SegmentedSwitch
            model-value="link"
            :options="lockedTypes"
            :label="tr('PlatformLinkType')"
          />
        </div>
        <div class="fwcmp-hint">
          {{ tr('PlatformNeedsConnection') }}
          <a
            v-if="platform.canConnect && platform.connectUrl"
            class="fwcmp-platformlink__connect"
            :href="platform.connectUrl"
          >{{ tr('PlatformConnectShort') }}</a>
          <template v-else-if="platform.connectUrl">{{ tr('PlatformWordPress') }}</template>
          <template v-else>{{ tr('PlatformSuperUserConnects') }}</template>
        </div>
      </section>
      <!-- connected, but the platform cannot be used now (lost, blocked, trial ended) -->
      <div
        v-else-if="platform && platform.mode === 'connected' && !platform.connected && !editing"
        class="fwcmp-hint fwcmp-platformlink__off"
      >
        {{ platformReasonText }}
        <a
          v-if="platform.connectUrl"
          :href="platform.connectUrl"
        >{{ tr(canReconnect(platform.reason) ? 'PlatformReconnect' : 'PlatformDetails') }}</a>
      </div>
      <FeedbackBar
        v-if="feedback"
        class="fwcmp-page-feedback"
        :id-site="idSite"
        topic="link_builder"
        :question="tr('FeedbackQuestion_link_builder')"
        :feedback="feedback"
      />
      <PromoLine
        :promo="promo"
        :dismiss-label="tr('PromoDismiss')"
      />
    </template>
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
import { SaveButton } from 'CorePluginsAdmin';
import {
  addLink,
  CheckMessage,
  ConnectionStatus,
  fetchConnectionStatus,
  fetchLink,
  fetchParameterSets,
  fetchSuggestions,
  fetchTemplates,
  FieldKey,
  FIELDS,
  Link,
  LinkForm,
  markLinkLive,
  ParameterSets,
  preview,
  Preview,
  Template,
  updateLink,
  updateLinkDetails,
} from './api';
import copyText from './clipboard';
import PlatformLinkPanel from './PlatformLinkPanel.vue';
import SegmentedSwitch, { SegmentedOption } from './SegmentedSwitch.vue';
import { canReconnect, REASON_TEXT } from './platformReason';
import FeedbackBar, { FeedbackSettings } from './FeedbackBar.vue';
import PromoLine, { PromoVariables } from './PromoLine.vue';
import plainText from './plainText';
import shortDay from './shortDay';

const PREFIX = 'FeinwerkCampaignManager_';
const CATEGORY = 'FeinwerkCampaignManager_Campaigns';

const FIELD_LABELS: Record<FieldKey, string> = {
  campaign: 'FieldCampaign',
  source: 'FieldSource',
  medium: 'FieldMedium',
  keyword: 'FieldKeyword',
  content: 'FieldContent',
  campaignId: 'FieldCampaignId',
  group: 'FieldGroup',
  placement: 'FieldPlacement',
};

/** a message next to a field: an error blocks saving, a warning does not */
interface FieldMessage {
  code: string;
  kind: 'error' | 'warning';
  message: string;
  known: string;
}

function emptyForm(parameterSet: string): LinkForm {
  return {
    targetUrl: '',
    campaign: '',
    source: '',
    medium: '',
    keyword: '',
    content: '',
    campaignId: '',
    group: '',
    placement: '',
    parameterSet,
    startDate: '',
    endDate: '',
    note: '',
  };
}

function formOf(link: Link): LinkForm {
  return {
    // a generated link ID stays in the field, so the link shown is the saved one; sent back
    // unchanged it stays the generated ID (updateLink)
    ...link.values,
    targetUrl: link.targetUrl,
    parameterSet: link.parameterSet,
    startDate: link.startDate || '',
    endDate: link.endDate || '',
    note: link.note || '',
  };
}

function idLinkInHash(): number {
  const value = Number(MatomoUrl.hashParsed.value.idLink || 0);
  return Number.isInteger(value) && value > 0 ? value : 0;
}

interface State {
  loading: boolean;
  loadError: string;
  missingLink: boolean;
  /** the connection to Feinwerk Campaigns (getConnectionStatus), null until read or on failure */
  platform: ConnectionStatus | null;
  /** the connected panel can create links for this website: it replaces the local Save */
  platformReady: boolean;
  /** the platform's preview of the link the panel would create */
  platformPreview: string;
  ready: boolean;
  parameterSets: ParameterSets;
  templates: Template[];
  suggestions: Record<string, string[]>;
  /** campaign values only Matomo counted lately, offered after the saved ones */
  counted: string[];
  form: LinkForm;
  savedForm: string;
  editing: number;
  editingLabel: string;
  /** the edited link's status ('' for a new link) and its saved URL (shown while it is locked) */
  editingStatus: string;
  editingUrl: string;
  editingGenerated: boolean;
  /** the link went live while it was edited here */
  wentLive: boolean;
  /** the live link whose values a new draft took ('' otherwise) */
  fromLive: string;
  markingLive: boolean;
  /** where the confirmation to mark live is open: header, result (after copying) or '' */
  confirmLiveAt: string;
  /** a saved draft was copied: offer to mark it live */
  sentHint: boolean;
  editingLiveSince: string;
  editingLiveReason: string;
  result: Preview | null;
  previewError: boolean;
  abort: AbortController | null;
  timer: number | null;
  moreOpen: boolean;
  saving: boolean;
  saved: string;
  saveError: string;
  copied: boolean;
  copyFailed: boolean;
}

export default defineComponent({
  props: {
    idSite: { type: Number, required: true },
    canWrite: { type: Boolean, default: false },
    siteUrl: { type: String, default: '' },
    /** the feedback row at the end of the page (Feinwerk kit); null in Widgetize embeds */
    feedback: { type: Object as PropType<FeedbackSettings | null>, default: null },
    /** the kit's tip line after the feedback row (Promo\PromoLine); null: none */
    promo: { type: Object as PropType<PromoVariables | null>, default: null },
  },
  components: {
    PlatformLinkPanel,
    ActivityIndicator,
    Alert,
    FeedbackBar,
    PromoLine,
    SaveButton,
    SegmentedSwitch,
  },
  data(): State {
    return {
      loading: true,
      loadError: '',
      missingLink: false,
      platform: null,
      platformReady: false,
      platformPreview: '',
      ready: false,
      parameterSets: {
        sets: [],
        defaultSet: 'utm',
        fields: FIELDS,
        mcrOnlyFields: [],
        mcrActive: false,
        lowercaseValues: true,
      },
      templates: [],
      suggestions: {},
      counted: [],
      form: emptyForm('utm'),
      savedForm: '',
      editing: 0,
      editingLabel: '',
      editingStatus: '',
      editingUrl: '',
      editingGenerated: false,
      wentLive: false,
      fromLive: '',
      markingLive: false,
      confirmLiveAt: '',
      sentHint: false,
      editingLiveSince: '',
      editingLiveReason: '',
      result: null,
      previewError: false,
      abort: null,
      timer: null,
      moreOpen: false,
      saving: false,
      saved: '',
      saveError: '',
      copied: false,
      copyFailed: false,
    };
  },
  created() {
    this.load();
    // makes no outbound call while not connected; a failed read leaves the builder as it is
    fetchConnectionStatus().then((status) => {
      this.platform = status;
    }).catch(() => {
      this.platform = null;
    });
  },
  beforeUnmount() {
    if (this.timer) {
      window.clearTimeout(this.timer);
    }
    if (this.abort) {
      this.abort.abort();
    }
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.saved = '';
        this.saveError = '';
        this.copied = false;
        this.copyFailed = false;
        this.schedulePreview();
      },
    },
  },
  computed: {
    /** not connected: the link types shown locked (decision 1) */
    lockedTypes(): SegmentedOption[] {
      return ['link', 'short', 'qr'].map((t) => ({
        value: t,
        label: this.tr(`PlatformLinkType_${t}`),
        disabled: t !== 'link',
        title: t !== 'link' ? this.tr('PlatformNeedsConnection') : undefined,
      }));
    },
    /** connected but not usable now: the admin page's sentence for the reason (UI review F2) */
    platformReasonText(): string {
      const key = this.platform ? REASON_TEXT[this.platform.reason] : '';
      return this.tr(key || 'PlatformUnavailableHere');
    },
    targetPlaceholder(): string {
      return this.siteUrl ? `${this.siteUrl.replace(/\/+$/, '')}/` : '';
    },
    moreFields(): FieldKey[] {
      const fields: FieldKey[] = ['keyword', 'content'];
      if (this.parameterSets.mcrActive) {
        fields.push('campaignId', 'group', 'placement');
      }
      return fields;
    },
    /** the channel whose values the form carries, so the tile follows the fields */
    activeTemplate(): Template | null {
      const medium = this.form.medium.trim().toLowerCase();
      const source = this.form.source.trim().toLowerCase();
      if (medium === '') {
        return null;
      }
      const exact = this.templates.find((t) => t.medium === medium && t.source === source);
      return exact || this.templates.find((t) => t.medium === medium && t.source === '') || null;
    },
    /** warnings without a place of their own (not_read of hidden fields) */
    otherWarnings(): CheckMessage[] {
      const shown: string[] = ['targetUrl', 'campaign', 'source', 'medium', ...this.moreFields];
      return (this.result ? this.result.warnings : []).filter(
        (m) => !shown.includes(m.field) && !this.isMcrNotice(m),
      );
    },
    dirty(): boolean {
      return JSON.stringify(this.form) !== this.savedForm;
    },
    /** the API refuses it too; checked here so the person sees it at the field */
    datesWrong(): boolean {
      return this.form.startDate !== '' && this.form.endDate !== ''
        && this.form.endDate < this.form.startDate;
    },
    /** a live or ended link: target and values stay, note and dates change (decision 6) */
    locked(): boolean {
      return this.editing > 0 && this.editingStatus !== '' && this.editingStatus !== 'draft';
    },
    /** the link as it is: the saved one while locked, else the preview */
    shownUrl(): string {
      if (this.locked) {
        return this.editingUrl;
      }
      // connected: the link the workspace would create, never a local one nobody saves
      if (this.platformReady && !this.editing) {
        return this.platformPreview;
      }
      return this.result && this.result.url ? this.result.url : '';
    },
    /** "since 12.11., first visit counted" for a live or ended link */
    liveSinceText(): string {
      if (!this.locked || !this.editingLiveSince || !this.editingLiveReason) {
        return '';
      }
      return this.tr('LiveSince', shortDay(this.editingLiveSince), this.tr(`LiveReason_${this.editingLiveReason}`));
    },
    /** the saved values of a locked link, as label and value lines */
    liveLines(): { label: string, value: string }[] {
      if (!this.savedForm) {
        return [];
      }
      const saved = JSON.parse(this.savedForm) as LinkForm;
      const lines = [
        { label: this.tr('FieldTargetUrl'), value: saved.targetUrl },
        { label: this.tr('SourceMedium'), value: [saved.source, saved.medium].filter((v) => v).join(' / ') },
        { label: this.tr('FieldCampaign'), value: saved.campaign },
      ];
      this.moreFields.forEach((field) => {
        if (saved[field]) {
          lines.push({ label: this.label(field), value: saved[field] });
        }
      });
      lines.push({ label: this.tr('ParameterSet'), value: this.setLabel(saved.parameterSet) });
      return lines.filter((l) => l.value !== '');
    },
    /** target, parameter set or a value differs from the saved link */
    valuesChanged(): boolean {
      if (!this.savedForm) {
        return false;
      }
      const saved = JSON.parse(this.savedForm) as LinkForm;
      const keys: (keyof LinkForm)[] = ['targetUrl', 'parameterSet', ...FIELDS];
      return keys.some((k) => saved[k] !== this.form[k]);
    },
    canSave(): boolean {
      if (this.locked) {
        return !this.saving && this.dirty && !this.valuesChanged && !this.datesWrong;
      }
      return !!this.result && this.result.valid && !this.saving && !this.sameLink
        && !this.previewError && this.dirty && !this.datesWrong;
    },
    sameLink(): number {
      if (!this.result || !this.result.existingIdLink) {
        return 0;
      }
      return this.result.existingIdLink === this.editing ? 0 : this.result.existingIdLink;
    },
    statusText(): string {
      if (!this.result) {
        return '';
      }
      return this.result.valid ? this.tr('LinkReady') : this.tr('LinkHasErrors');
    },
    copyLabel(): string {
      return this.copied ? this.tr('Copied') : this.tr('CopyLinkShort');
    },
  },
  methods: {
    canReconnect,
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    label(field: FieldKey): string {
      return this.tr(FIELD_LABELS[field]);
    },
    setLabel(key: string): string {
      if (key === 'own') {
        return this.tr('ParameterSetOwn');
      }
      return this.tr('ParameterSetNamed', key);
    },
    templateHint(t: Template): string {
      return [t.source, t.medium].filter((v) => v !== '').join(' / ');
    },
    /** a value from the connected panel (a campaign's parameter, a value of a workspace list) */
    setField(change: { field: string; value: string }) {
      const allowed = ['campaign', 'source', 'medium', 'content', 'keyword'];
      if (allowed.includes(change.field)) {
        (this.form as unknown as Record<string, string>)[change.field] = change.value;
      }
    },
    load() {
      this.loading = true;
      this.loadError = '';
      this.missingLink = false;
      const idLink = idLinkInHash();
      Promise.all([
        fetchParameterSets(this.idSite),
        fetchTemplates(this.idSite),
        // suggestions are a help: without them the form still works
        Promise.all((['campaign', 'source', 'medium'] as FieldKey[]).map(
          (field) => fetchSuggestions(this.idSite, field).catch(() => []),
        )),
        // a link that is not there (another website, an old bookmark) is no reason to fail
        idLink ? fetchLink(this.idSite, idLink) : Promise.resolve(null),
      ]).then(([sets, templates, suggestions, link]) => {
        this.parameterSets = sets;
        this.templates = templates;
        this.counted = suggestions[0].filter((s) => s.source === 'report').map((s) => s.value);
        this.suggestions = {
          campaign: suggestions[0].map((s) => s.value),
          source: suggestions[1].map((s) => s.value),
          medium: suggestions[2].map((s) => s.value),
        };
        if (link) {
          this.edit(link);
          this.moreOpen = true;
        } else {
          this.missingLink = idLink > 0;
          this.form = emptyForm(sets.defaultSet);
          // "New link" of a campaign in the overview
          const { campaign } = MatomoUrl.hashParsed.value;
          if (typeof campaign === 'string') {
            this.form.campaign = campaign;
          }
          this.savedForm = '';
        }
        this.ready = true;
      }).catch((e: Error) => {
        this.loadError = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    edit(link: Link) {
      this.editing = link.idLink;
      this.fromLive = '';
      this.editingStatus = link.status || 'draft';
      this.editingUrl = link.url;
      this.editingLiveSince = link.liveSince || '';
      this.editingLiveReason = link.liveReason || '';
      this.confirmLiveAt = '';
      this.sentHint = false;
      this.editingGenerated = link.campaignIdGenerated;
      const sourceMedium = [link.values.source, link.values.medium].filter((v) => v !== '');
      this.editingLabel = sourceMedium.length
        ? `${link.values.campaign} (${sourceMedium.join(' / ')})`
        : link.values.campaign;
      this.form = formOf(link);
      this.savedForm = JSON.stringify(this.form);
    },
    startNew() {
      // the browser's own dialog: accessible, and Matomo 5.0 has no confirm component to reuse
      // eslint-disable-next-line no-alert
      if (this.editing && this.dirty && !window.confirm(this.tr('DiscardChanges'))) {
        return;
      }
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        idLink: null,
        campaign: null,
      });
      this.missingLink = false;
      this.editing = 0;
      this.editingLabel = '';
      this.editingStatus = '';
      this.editingUrl = '';
      this.wentLive = false;
      this.fromLive = '';
      this.form = emptyForm(this.parameterSets.defaultSet);
      this.savedForm = '';
      this.result = null;
    },
    applyTemplate(t: Template) {
      this.form.medium = t.medium;
      this.form.source = t.source;
      window.setTimeout(() => {
        const next = document.getElementById(t.source === '' ? 'fwcmp-source' : 'fwcmp-campaign');
        if (next) {
          next.focus();
        }
      }, 0);
    },
    /** values worth one click: the channel's sources first, then what the website uses */
    chips(field: FieldKey): string[] {
      const typed = this.form[field].trim().toLowerCase();
      let values: string[] = [];
      if (field === 'source' && this.activeTemplate) {
        values = [...this.activeTemplate.sources];
      }
      values = values.concat(this.suggestions[field] || []);
      const unique = values.filter((v, i) => values.indexOf(v) === i);
      return unique.filter(
        (v) => v.toLowerCase() !== typed && (typed === '' || v.toLowerCase().includes(typed)),
      ).slice(0, 6);
    },
    isMcrNotice(m: CheckMessage): boolean {
      return m.code === 'not_read' && m.details.needs === 'MarketingCampaignsReporting';
    },
    hasError(field: string): boolean {
      return !!this.result && this.result.errors.some((m) => m.field === field);
    },
    messagesFor(field: string): FieldMessage[] {
      if (!this.result) {
        return [];
      }
      // before a value is typed, "required" would only scold
      const typed = field === 'targetUrl' ? this.form.targetUrl : this.form[field as FieldKey];
      const out: FieldMessage[] = [];
      this.result.errors.forEach((m) => {
        if (m.field === field && !(m.code === 'required' && !typed)) {
          out.push({
            code: m.code, kind: 'error', message: m.message, known: '',
          });
        }
      });
      // connected, the campaign value comes from the workspace: no "did you mean" to drop it
      const fromWorkspace = field === 'campaign' && this.platformReady && !this.editing;
      this.result.warnings.forEach((m) => {
        if (fromWorkspace && typeof m.details.known === 'string' && m.details.known !== '') {
          return;
        }
        if (m.field === field && !this.isMcrNotice(m)) {
          out.push({
            code: m.code,
            kind: 'warning',
            message: m.message,
            known: typeof m.details.known === 'string' ? m.details.known : '',
          });
        }
      });
      return out;
    },
    schedulePreview() {
      if (this.timer) {
        window.clearTimeout(this.timer);
      }
      this.timer = window.setTimeout(() => this.runPreview(), 300);
    },
    runPreview() {
      if (this.locked) {
        // nothing to build: the saved link stays as it is
        this.result = null;
        this.previewError = false;
        return;
      }
      if (this.form.targetUrl.trim() === '' && this.form.campaign.trim() === '') {
        this.result = null;
        this.previewError = false;
        return;
      }
      if (this.abort) {
        this.abort.abort();
      }
      const abort = new AbortController();
      this.abort = abort;
      preview(this.idSite, this.form, abort, this.editing).then((result) => {
        if (this.abort === abort) {
          this.result = result;
          this.previewError = false;
        }
      }).catch(() => {
        // a newer preview replaced this one: nothing to say; otherwise the shown link is outdated
        if (this.abort === abort) {
          this.result = null;
          this.previewError = true;
        }
      });
    },
    copyLink() {
      if (!this.shownUrl) {
        return;
      }
      copyText(this.shownUrl).then(() => {
        this.copied = true;
        this.copyFailed = false;
        this.sentHint = this.canWrite && this.editing > 0 && this.editingStatus === 'draft' && !this.dirty;
        window.setTimeout(() => {
          this.copied = false;
        }, 2000);
      }).catch(() => {
        this.copyFailed = true;
      });
    },
    save() {
      if (!this.canSave) {
        return;
      }
      this.saving = true;
      this.saveError = '';
      let request: Promise<{ link: Link, existed: boolean }>;
      if (this.locked) {
        request = updateLinkDetails(this.idSite, this.editing, this.form)
          .then((r) => ({ ...r, existed: false }));
      } else if (this.editing) {
        request = updateLink(this.idSite, this.editing, this.form)
          .then((r) => ({ ...r, existed: false }));
      } else {
        request = addLink(this.idSite, this.form);
      }
      request.then((r) => {
        const message = r.existed ? this.tr('LinkExisted') : this.tr('LinkSaved');
        this.suggest(r.link);
        if (!this.editing) {
          MatomoUrl.updateHash({ ...MatomoUrl.hashParsed.value, idLink: r.link.idLink });
        }
        this.edit(r.link);
        if (this.result) {
          this.result = {
            ...this.result,
            url: r.link.url,
            existingIdLink: r.link.idLink,
            campaignIdOnSave: false,
          };
        }
        // after the form watcher has run for the reloaded values
        this.$nextTick(() => {
          this.saved = message;
        });
      }).catch((e: Error) => {
        this.saveError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
        this.checkWentLive();
      }).finally(() => {
        this.saving = false;
      });
    },
    /** a draft refused as it went live meanwhile: lock it, keep the typed values for a new link */
    checkWentLive() {
      if (!this.editing || this.locked) {
        return;
      }
      const idLink = this.editing;
      fetchLink(this.idSite, idLink).then((link) => {
        if (link && link.idLink === this.editing && link.status !== 'draft') {
          this.editingStatus = link.status;
          this.editingUrl = link.url;
          this.wentLive = true;
          this.saveError = '';
        }
      }).catch(() => {
        // the save error stays as it is
      });
    },
    /** "Als live markieren" asks first: it cannot be undone (Peter, 2026-11-25) */
    askLive(at: string) {
      if (!this.editing || this.dirty) {
        return;
      }
      this.confirmLiveAt = at;
      this.$nextTick(() => {
        const button = this.$refs[at === 'header' ? 'confirmHeader' : 'confirmResult'] as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    markLive() {
      if (!this.editing || this.dirty) {
        return;
      }
      this.markingLive = true;
      markLinkLive(this.idSite, this.editing).then((link) => {
        this.edit(link);
        this.result = null;
      }).catch((e: Error) => {
        this.saveError = e && e.message ? plainText(e.message) : this.tr('SaveFailed');
      }).finally(() => {
        this.markingLive = false;
      });
    },
    /** the live link's values as a new draft; a generated link ID goes, the new one gets its own */
    saveAsNew() {
      const form = { ...this.form };
      if (this.editingGenerated) {
        form.campaignId = '';
      }
      const from = this.editingLabel;
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        idLink: null,
        campaign: null,
      });
      this.editing = 0;
      this.editingLabel = '';
      this.editingStatus = '';
      this.editingUrl = '';
      this.editingGenerated = false;
      this.wentLive = false;
      this.fromLive = from;
      this.saved = '';
      this.saveError = '';
      this.form = form;
      this.savedForm = '';
      this.result = null;
      this.runPreview();
      this.$nextTick(() => {
        const target = document.getElementById('fwcmp-campaign');
        if (target) {
          target.focus();
        }
      });
    },
    suggest(link: Link) {
      (['campaign', 'source', 'medium'] as FieldKey[]).forEach((field) => {
        const value = link.values[field];
        const list = this.suggestions[field] || [];
        if (value && !list.includes(value)) {
          this.suggestions[field] = [value, ...list];
        }
      });
    },
    openList() {
      MatomoUrl.updateHash({
        ...MatomoUrl.hashParsed.value,
        category: CATEGORY,
        subcategory: 'FeinwerkCampaignManager_Links',
        idLink: null,
      });
    },
    onToggleMore(event: Event) {
      this.moreOpen = (event.target as HTMLDetailsElement).open;
    },
  },
});
</script>
