<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  What the connection to Feinwerk Campaigns adds (Peter, 2026-11-26, relayed by
  CampaignManagement: "vorteile der verbindung müssen sehr viel besser herausgestellt werden"):
  this Matomo against the platform, the trial and the steps. Promotion (decision 1 of 2026-11-23):
  shown only where getConnectionStatus says promote. Every claim is one CampaignsWeb confirmed
  (docs/benefits-copy.md).
-->
<template>
  <div class="fwcmp-benefits">
    <table class="fwcmp-benefits__table">
      <thead>
        <tr>
          <th scope="col"><span class="fwcmp-sr-only">{{ tr('BenefitsFeature') }}</span></th>
          <th scope="col">{{ tr('BenefitsColMatomo') }}</th>
          <th scope="col">{{ tr('BenefitsColPlatform') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.key">
          <th scope="row">{{ tr(`Benefit_${row.key}`) }}</th>
          <td class="fwcmp-benefits__mark">
            <span aria-hidden="true">{{ row.matomo ? '✓' : '' }}</span>
            <span class="fwcmp-sr-only">{{ row.matomo ? tr('BenefitYes') : tr('BenefitNo') }}</span>
          </td>
          <td class="fwcmp-benefits__mark fwcmp-benefits__mark--yes">
            <span aria-hidden="true">✓</span>
            <span class="fwcmp-sr-only">{{ tr('BenefitYes') }}</span>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- divs: Morpheus' "#content .card-content p" would set colour and size (W3) -->
    <div class="fwcmp-benefits__trial">{{ tr('BenefitsTrial') }}</div>
    <div class="fwcmp-hint fwcmp-benefits__steps">{{ tr('BenefitsSteps') }}</div>
    <a
      v-if="moreUrl"
      class="fwcmp-applink fwcmp-benefits__more"
      :href="moreUrl"
      target="_blank"
      rel="noopener noreferrer"
    >{{ tr('BenefitsMore') }}<span class="icon-outlink" aria-hidden="true" /></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { translate } from 'CoreHome';

const PREFIX = 'FeinwerkCampaignManager_';

/** the rows: what this Matomo does on its own, then what the platform adds */
const ROWS = [
  { key: 'links', matomo: true },
  { key: 'short', matomo: false },
  { key: 'qr', matomo: false },
  { key: 'counts', matomo: false },
  { key: 'convention', matomo: false },
  { key: 'checks', matomo: false },
  { key: 'calendar', matomo: false },
];

export default defineComponent({
  props: {
    /** the platform's page about it (getConnectionStatus moreUrl) */
    moreUrl: { type: String, default: '' },
  },
  computed: {
    rows(): { key: string, matomo: boolean }[] {
      return ROWS;
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
  },
});
</script>
