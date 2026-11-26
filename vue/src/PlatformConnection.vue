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
              <a
                v-if="status.canBuy && status.links.buy"
                :href="status.links.buy"
                target="_blank"
                rel="noopener noreferrer"
              >{{ tr('PlatformBuy') }}</a>
            </p>
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
import { ConnectionStatus, disconnectPlatform, fetchConnectionStatus } from './api';
import plainText from './plainText';
import { REASON_TEXT } from './platformReason';

const PREFIX = 'FeinwerkCampaignManager_';

interface State {
  status: ConnectionStatus | null;
  loading: boolean;
  error: string;
  confirming: boolean;
  busy: boolean;
}

export default defineComponent({
  components: { ActivityIndicator, Alert },
  props: {
    connectAction: { type: String, required: true },
    connectNonce: { type: String, required: true },
    wordPress: { type: Boolean, default: false },
  },
  data(): State {
    return {
      status: null, loading: false, error: '', confirming: false, busy: false,
    };
  },
  created() {
    this.load();
  },
  computed: {
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
      }).catch((e: Error) => {
        this.error = e && e.message ? plainText(e.message) : this.tr('LoadFailed');
      }).finally(() => {
        this.loading = false;
      });
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
