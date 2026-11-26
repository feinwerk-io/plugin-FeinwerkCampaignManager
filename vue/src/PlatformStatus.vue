<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  The small connection status above each Campaigns page (Peter's decision 1 of 2026-11-23):
  connected, "In Feinwerk Campaigns öffnen" for everyone; not connected, the status and
  "Verbinden" for super users only (others see nothing); platform = 0 or a failed read:
  nothing. Reads FeinwerkCampaignManager.getConnectionStatus, which makes no outbound call
  while not connected.
-->
<template>
  <div v-if="visible" class="fwcmp-platformstatus">
    <template v-if="status.mode === 'connected' && status.connected && status.links.app">
      <a
        :href="status.links.app"
        target="_blank"
        rel="noopener noreferrer"
        :title="tr('PlatformOpenTooltip')"
      >{{ tr('PlatformOpen') }}</a>
    </template>
    <!-- connected, but not usable now: super users see why; connecting again only where it helps
         (UI review F2), else the details on the admin page -->
    <template v-else-if="status.mode === 'connected' && status.connectUrl">
      <span>{{ tr(shortReason) }}</span>
      <a :href="status.connectUrl">
        {{ tr(canReconnect(status.reason) ? 'PlatformReconnect' : 'PlatformDetails') }}
      </a>
    </template>
    <template v-else-if="status.mode === 'standalone'">
      <span>{{ tr('PlatformNotConnected') }}</span>
      <a :href="status.connectUrl">{{ tr('PlatformConnect') }}</a>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';
import { ConnectionStatus, fetchConnectionStatus } from './api';
import { canReconnect, REASON_SHORT } from './platformReason';

const PREFIX = 'FeinwerkCampaignManager_';

interface State {
  status: ConnectionStatus | null;
}

export default defineComponent({
  data(): State {
    return { status: null };
  },
  created() {
    fetchConnectionStatus().then((status) => {
      this.status = status;
    }).catch(() => {
      // a status line never shows an error of its own
    });
  },
  computed: {
    shortReason(): string {
      return (this.status && REASON_SHORT[this.status.reason]) || 'PlatformInterrupted';
    },
    visible(): boolean {
      const s = this.status;
      if (!s) {
        return false;
      }
      if (s.mode === 'connected') {
        return s.connected ? !!s.links.app : !!s.connectUrl;
      }
      return s.mode === 'standalone' && s.canConnect && !!s.connectUrl;
    },
  },
  methods: {
    canReconnect,
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
  },
});
</script>
