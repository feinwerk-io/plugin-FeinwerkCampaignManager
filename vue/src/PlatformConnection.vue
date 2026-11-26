<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  Administration > Platform > Feinwerk Campaigns: the connection (Controller::platform).
  Reads the status through FeinwerkCampaignManager.getConnectionStatus; connecting is a POST
  to connectStart with the page's nonce (a person in a browser, never through the API);
  disconnecting asks first. Neutral product text only (Peter's decision 1 of 2026-11-23:
  benefit copy is promotion). Super users only.
-->
<template>
  <div class="fwcmp-platform">
    <div class="card">
      <div class="card-content">
        <h2 class="card-title">{{ tr('PlatformTitle') }}</h2>
        <ActivityIndicator :loading="loading" />
        <Alert v-if="error" severity="danger">
          {{ error }}
          <button type="button" class="btn-flat fwcmp-retry" @click="load">
            {{ tr('Retry') }}
          </button>
        </Alert>
        <template v-if="status">
          <!-- connected: workspace, who confirmed, trial, links -->
          <template v-if="status.mode === 'connected'">
            <div
              v-if="stateMessage"
              :class="`fwcmp-msg fwcmp-msg--${stateKind}`"
              role="status"
            >{{ stateMessage }}</div>
            <p class="fwcmp-platform__line">
              {{ tr('PlatformConnectedTo', workspaceName) }}
              <template v-if="status.person && status.person.name">
                {{ tr('PlatformApprovedBy', status.person.name) }}
              </template>
            </p>
            <!-- Buy during the trial and after it ended (UI review F2) -->
            <p
              v-if="trialText || (status.canBuy && status.links.buy)"
              class="fwcmp-platform__line"
            >
              {{ trialText }}
              <!-- near the end of the trial: what is in use next to Buy (block G6) -->
              <template v-if="inUseText">{{ inUseText }}</template>
              <a
                v-if="status.canBuy && status.links.buy"
                :href="status.links.buy"
                target="_blank"
                rel="noopener noreferrer"
              >{{ tr('PlatformBuy') }}</a>
            </p>
            <!-- right after connecting: the next step (block G6) -->
            <div
              v-if="status.connected && status.inUse && status.inUse.shortLinks === 0"
              class="fwcmp-notice"
              role="status"
            >
              {{ tr('PlatformFirstShortLink') }}
              <a :href="builderUrl(currentSite)">{{ tr('OpenBuilder') }}</a>
            </div>
            <div class="fwcmp-platform__actions">
              <a
                v-if="status.links.app && !confirming"
                class="btn"
                :href="status.links.app"
                target="_blank"
                rel="noopener noreferrer"
                :title="tr('PlatformOpenTooltip')"
              >{{ tr('PlatformOpen') }}</a>
              <form
                v-if="status.state === 'lost' && status.canConnect"
                method="post"
                :action="connectAction"
                class="fwcmp-platform__form"
              >
                <input type="hidden" name="nonce" :value="connectNonce">
                <button type="submit" class="btn">{{ tr('PlatformReconnect') }}</button>
              </form>
              <button
                v-if="!confirming"
                ref="disconnectButton"
                type="button"
                class="btn-flat"
                @click="askDisconnect"
              >{{ tr('PlatformDisconnect') }}</button>
            </div>
            <!-- which Matomo website belongs to which workspace website (R51 D3) -->
            <section
              v-if="status.connected"
              class="fwcmp-platform__sites"
              :aria-label="tr('PlatformSitesTitle')"
            >
              <h3 class="fwcmp-step__title">{{ tr('PlatformSitesTitle') }}</h3>
              <div class="fwcmp-hint">{{ tr('PlatformSitesHelp') }}</div>
              <ActivityIndicator :loading="sitesLoading" />
              <div v-if="sitesError" class="fwcmp-msg fwcmp-msg--error">{{ sitesError }}</div>
              <div v-if="sites.length" class="fwcmp-tablewrap">
                <table class="entityTable dataTable fwcmp-table fwcmp-platform__table">
                  <thead>
                    <tr>
                      <th>{{ tr('PlatformSiteColumn') }}</th>
                      <th>{{ tr('PlatformWebsiteColumn') }}</th>
                      <th>{{ tr('PlatformMatchColumn') }}</th>
                      <th><span class="fwcmp-sr-only">{{ tr('LinkBuilder') }}</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="s in sites" :key="s.idSite">
                      <td>
                        {{ s.name }}
                        <span class="fwcmp-platform__host">{{ host(s.url) }}</span>
                      </td>
                      <td>{{ s.website ? s.website.name : '' }}</td>
                      <td :class="{ 'fwcmp-platform__none': !s.match }">
                        {{ tr(`PlatformMatch_${s.match || 'none'}`) }}
                      </td>
                      <td>
                        <a
                          v-if="s.website"
                          :href="builderUrl(s.idSite)"
                        >{{ tr('OpenBuilder') }}</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button
                v-if="sites.length < sitesTotal"
                type="button"
                class="btn-flat"
                :disabled="sitesLoading"
                @click="loadSites"
              >{{ tr('PlatformSitesMore') }}</button>
              <div v-if="sites.some((s) => !s.website) && status.links.app" class="fwcmp-hint">
                {{ tr('PlatformSitesUnmappedHelp') }}
                <a
                  class="fwcmp-applink"
                  :href="status.links.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  :title="tr('PlatformOpenTooltip')"
                >Feinwerk Campaigns<span class="icon-outlink" aria-hidden="true" /></a>
              </div>
            </section>
            <div
              v-if="confirming"
              class="fwcmp-confirm"
              role="group"
              :aria-label="tr('PlatformDisconnect')"
            >
              <span>{{ tr('PlatformDisconnectConfirm') }}</span>
              <button
                ref="confirmButton"
                type="button"
                class="btn"
                :disabled="busy"
                @click="disconnect"
              >{{ tr('PlatformDisconnectYes') }}</button>
              <button type="button" class="btn-flat" @click="cancelDisconnect">
                {{ tr('Cancel') }}
              </button>
            </div>
          </template>
          <!-- not connected: what it does, what is sent, the button -->
          <template v-else>
            <p>{{ tr('PlatformIntro') }}</p>
            <!-- what the connection adds: promotion, so admins only (block G2, decision 1) -->
            <PlatformBenefits v-if="status.promote" :more-url="status.moreUrl || ''" />
            <!-- a div: Morpheus' "#content .card-content p" colour would beat the quieter one -->
            <div class="fwcmp-platform__sent">{{ tr('PlatformWhatIsSent') }}</div>
            <div v-if="wordPress" class="fwcmp-hint">{{ tr('PlatformWordPress') }}</div>
            <form
              v-else-if="status.canConnect"
              method="post"
              :action="connectAction"
              class="fwcmp-platform__form"
            >
              <input type="hidden" name="nonce" :value="connectNonce">
              <button ref="connectButton" type="submit" class="btn">
                {{ tr('PlatformConnect') }}
              </button>
            </form>
          </template>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ActivityIndicator, Alert, translate } from 'CoreHome';
import {
  ConnectionStatus,
  disconnectPlatform,
  fetchConnectionStatus,
  fetchPlatformWebsites,
  PlatformSiteRow,
} from './api';
import plainText from './plainText';
import PlatformBenefits from './PlatformBenefits.vue';
import { REASON_TEXT, splitPlatformError } from './platformReason';

const PREFIX = 'FeinwerkCampaignManager_';

interface State {
  status: ConnectionStatus | null;
  loading: boolean;
  error: string;
  confirming: boolean;
  busy: boolean;
  sites: PlatformSiteRow[];
  sitesTotal: number;
  sitesLoading: boolean;
  sitesError: string;
}

const SITES_PAGE = 100;

export default defineComponent({
  components: { ActivityIndicator, Alert, PlatformBenefits },
  props: {
    connectAction: { type: String, required: true },
    connectNonce: { type: String, required: true },
    wordPress: { type: Boolean, default: false },
  },
  data(): State {
    return {
      status: null,
      loading: false,
      error: '',
      confirming: false,
      busy: false,
      sites: [],
      sitesTotal: 0,
      sitesLoading: false,
      sitesError: '',
    };
  },
  created() {
    this.load();
  },
  computed: {
    /** the site the admin page was opened for (its idSite), for the builder link */
    currentSite(): number {
      const m = /[?&]idSite=(\d+)/.exec(window.location.search);
      return m ? Number(m[1]) : 1;
    },
    /** during the trial and after it: what this Matomo uses of the platform */
    inUseText(): string {
      const s = this.status;
      if (!s || !s.inUse || (s.state !== 'trial' && s.state !== 'expired')
        || s.inUse.shortLinks + s.inUse.qrCodes === 0) {
        return '';
      }
      return this.tr('PlatformInUse', `${s.inUse.shortLinks}`, `${s.inUse.qrCodes}`);
    },
    workspaceName(): string {
      return this.status && this.status.workspace ? this.status.workspace.name : '';
    },
    trialText(): string {
      const trial = this.status ? this.status.trial : null;
      if (!trial || this.status!.state !== 'trial') {
        return '';
      }
      return trial.daysLeft === 1
        ? this.tr('PlatformTrialOneDay')
        : this.tr('PlatformTrialDays', `${trial.daysLeft}`);
    },
    stateKind(): string {
      const state = this.status ? this.status.state : '';
      return state === 'lost' || state === 'blocked' ? 'error' : 'warning';
    },
    stateMessage(): string {
      const key = this.status ? REASON_TEXT[this.status.reason] : '';
      return key ? this.tr(key) : '';
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    load() {
      this.loading = true;
      this.error = '';
      fetchConnectionStatus().then((status) => {
        this.status = status;
        this.sites = [];
        this.sitesTotal = 0;
        if (status.mode === 'connected' && status.connected) {
          this.loadSites();
        }
      }).catch((e: Error) => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
    },
    /** the next page of this Matomo's websites against the workspace's */
    loadSites() {
      this.sitesLoading = true;
      this.sitesError = '';
      fetchPlatformWebsites(SITES_PAGE, this.sites.length).then((answer) => {
        this.sites = this.sites.concat(answer.sites);
        this.sitesTotal = answer.total;
      }).catch((e: Error) => {
        const { text } = splitPlatformError(e && e.message ? plainText(e.message) : '');
        this.sitesError = text || this.tr('LoadFailed');
      }).finally(() => {
        this.sitesLoading = false;
      });
    },
    host(url: string): string {
      try {
        return new URL(url).host;
      } catch (e) {
        return url;
      }
    },
    builderUrl(idSite: number): string {
      const q = `idSite=${idSite}&period=day&date=yesterday`;
      return `index.php?module=CoreHome&action=index&${q}#?${q}`
        + '&category=FeinwerkCampaignManager_Campaigns&subcategory=FeinwerkCampaignManager_LinkBuilder';
    },
    askDisconnect() {
      this.confirming = true;
      this.$nextTick(() => {
        const button = this.$refs.confirmButton as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    cancelDisconnect() {
      this.confirming = false;
      this.$nextTick(() => {
        const button = this.$refs.disconnectButton as HTMLElement | undefined;
        if (button) {
          button.focus();
        }
      });
    },
    disconnect() {
      this.busy = true;
      this.error = '';
      disconnectPlatform().then((status) => {
        this.status = status;
        this.confirming = false;
        // the confirmation and its button are gone: on to Connect (UI review F7)
        this.$nextTick(() => {
          const button = this.$refs.connectButton as HTMLElement | undefined;
          if (button) {
            button.focus();
          }
        });
      }).catch((e: Error) => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.busy = false;
      });
    },
  },
});
</script>
