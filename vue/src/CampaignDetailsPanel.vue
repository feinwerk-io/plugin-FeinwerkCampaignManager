<!--
  Matomo - free/libre analytics platform

  @link    https://matomo.org
  @license https://www.gnu.org/licenses/gpl-3.0.html GPL v3 or later

  The side panel for campaign details (addCampaign, updateCampaign): a new campaign, or the details
  of one (row). Used by the overview and the campaign page; emits "changed" after a save or a
  restore.
-->
<template>
  <SidePanel
    :open="open"
    :title="panelTitle"
    :close-label="tr('Close')"
    size="narrow"
    :scope-class="scopeClass"
    @update:open="$emit('update:open', $event)"
  >
    <form class="fwcmp-details" @submit.prevent="saveDetails">
      <template v-if="!editingCampaign">
        <label class="fwcmp-label" for="fwcmp-d-campaign">{{ tr('FieldCampaign') }}</label>
        <input
          id="fwcmp-d-campaign"
          v-model="form.campaign"
          class="fwcmp-input"
          type="text"
          autocomplete="off"
          aria-required="true"
          :aria-invalid="campaignMissing ? 'true' : 'false'"
          aria-describedby="fwcmp-d-campaign-help"
        />
        <div id="fwcmp-d-campaign-help" class="fwcmp-hint">
          <div v-if="campaignMissing" class="fwcmp-msg fwcmp-msg--error">
            {{ tr('CampaignValueMissing') }}
          </div>
          {{ tr('CampaignValueHelp') }}
        </div>
      </template>
      <label class="fwcmp-label" for="fwcmp-d-name">{{ tr('DisplayName') }}</label>
      <input
        id="fwcmp-d-name"
        v-model="form.name"
        class="fwcmp-input"
        type="text"
        maxlength="255"
        autocomplete="off"
      />
      <div class="fwcmp-row">
        <div class="fwcmp-col">
          <label class="fwcmp-label" for="fwcmp-d-start">{{ tr('CampaignStart') }}</label>
          <input id="fwcmp-d-start" v-model="form.startDate" class="fwcmp-input" type="date" />
        </div>
        <div class="fwcmp-col">
          <label class="fwcmp-label" for="fwcmp-d-end">{{ tr('CampaignEnd') }}</label>
          <input id="fwcmp-d-end" v-model="form.endDate" class="fwcmp-input" type="date" />
        </div>
      </div>
      <div v-if="datesWrong" class="fwcmp-msg fwcmp-msg--error">
        {{ tr('CampaignEndBeforeStart') }}
      </div>
      <div class="fwcmp-row">
        <div class="fwcmp-col">
          <label class="fwcmp-label" for="fwcmp-d-metric">{{ tr('GoalMetric') }}</label>
          <select
            id="fwcmp-d-metric"
            v-model="form.goalMetric"
            class="fwcmp-input fwcmp-select browser-default"
          >
            <option v-for="m in metrics" :key="m" :value="m">{{ tr(`GoalMetric_${m}`) }}</option>
          </select>
        </div>
        <div v-if="form.goalMetric !== 'none'" class="fwcmp-col">
          <label class="fwcmp-label" for="fwcmp-d-target">{{ targetLabel }}</label>
          <input
            id="fwcmp-d-target"
            v-model="form.goalTarget"
            class="fwcmp-input"
            type="number"
            min="0"
            step="any"
            inputmode="decimal"
          />
        </div>
      </div>
      <template v-if="form.goalMetric === 'conversions' || form.goalMetric === 'revenue'">
        <label class="fwcmp-label" for="fwcmp-d-goal">{{ tr('MatomoGoal') }}</label>
        <select
          id="fwcmp-d-goal"
          v-model="form.idGoal"
          class="fwcmp-input fwcmp-select browser-default"
        >
          <option value="">{{ tr('AllGoals') }}</option>
          <option v-for="g in goals" :key="g.idgoal" :value="`${g.idgoal}`">{{ g.name }}</option>
        </select>
      </template>
      <label class="fwcmp-label" for="fwcmp-d-notes">{{ tr('Note') }}</label>
      <textarea
        id="fwcmp-d-notes"
        v-model="form.notes"
        class="fwcmp-input fwcmp-note browser-default"
        rows="3"
        maxlength="2000"
      />
      <Alert v-if="existingDetails" severity="warning">
        {{ tr('CampaignHasDetails', existingDetails.campaign) }}
        <button type="button" class="btn-flat fwcmp-retry" @click="editExisting">
          {{ existingDetails.archived ? tr('RestoreAndEdit') : tr('EditExistingDetails') }}
        </button>
      </Alert>
      <Alert v-if="panelError" severity="danger">{{ panelError }}</Alert>
    </form>
    <template #footer>
      <button type="button" class="btn-flat" @click="$emit('update:open', false)">
        {{ tr('Cancel') }}
      </button>
      <button
        type="button"
        class="btn"
        :disabled="saving || datesWrong || !!existingDetails"
        @click="saveDetails"
      >{{ tr('SaveDetails') }}</button>
    </template>
  </SidePanel>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Alert, translate } from 'CoreHome';
import {
  addCampaign,
  archiveCampaign,
  CampaignDetails,
  CampaignRow,
  DetailsForm,
  fetchGoals,
  GoalMetric,
  MatomoGoal,
  updateCampaign,
} from './api';
import SidePanel from './SidePanel.vue';
import plainText from './plainText';

const PREFIX = 'FeinwerkCampaignManager_';
const METRICS: GoalMetric[] = ['none', 'visits', 'conversions', 'revenue'];

function emptyDetails(): DetailsForm {
  return {
    campaign: '',
    name: '',
    startDate: '',
    endDate: '',
    goalMetric: 'none',
    goalTarget: '',
    idGoal: '',
    notes: '',
  };
}

interface State {
  goals: MatomoGoal[];
  editingCampaign: string;
  editingName: string;
  form: DetailsForm;
  panelError: string;
  saving: boolean;
  campaignMissing: boolean;
  existingSaved: CampaignDetails | null;
}

export default defineComponent({
  props: {
    idSite: { type: Number, required: true },
    open: { type: Boolean, required: true },
    /** the campaign to edit or to start from (its value prefilled); null for an empty new one */
    row: { type: Object as PropType<CampaignRow | null>, default: null },
    /** the campaigns on the page, to point out a value that has details already */
    rows: { type: Array as PropType<CampaignRow[]>, default: () => [] },
    /** the website's currency code (ISO 4217), for a revenue goal */
    currency: { type: String, default: '' },
    /** the page's class, so its styles reach the panel (it is rendered at the end of <body>) */
    scopeClass: { type: String, default: '' },
  },
  emits: ['update:open', 'changed'],
  components: {
    Alert,
    SidePanel,
  },
  data(): State {
    return {
      goals: [],
      editingCampaign: '',
      editingName: '',
      form: emptyDetails(),
      panelError: '',
      saving: false,
      campaignMissing: false,
      existingSaved: null,
    };
  },
  watch: {
    open(isOpen: boolean) {
      if (isOpen) {
        this.start(this.row);
      }
    },
    'form.campaign': function onCampaignTyped() {
      const typed = this.form.campaign.trim().toLowerCase();
      if (this.existingSaved && typed !== this.existingSaved.campaign) {
        this.existingSaved = null;
      }
    },
  },
  mounted() {
    if (this.open) {
      this.start(this.row);
    }
  },
  computed: {
    metrics(): GoalMetric[] {
      return METRICS;
    },
    datesWrong(): boolean {
      return this.form.startDate !== '' && this.form.endDate !== ''
        && this.form.endDate < this.form.startDate;
    },
    panelTitle(): string {
      return this.editingCampaign
        ? this.tr('DetailsOf', this.editingName || this.editingCampaign)
        : this.tr('NewCampaign');
    },
    /** saved details for the value typed into "New campaign", from the page or from the save */
    existingDetails(): { campaign: string, archived: boolean } | null {
      if (this.editingCampaign) {
        return null;
      }
      if (this.existingSaved) {
        return { campaign: this.existingSaved.campaign, archived: this.existingSaved.archived };
      }
      const key = this.form.campaign.trim().replace(/\s+/g, ' ').toLowerCase();
      const row = key === '' ? undefined : this.rows.find((r) => r.campaign === key && r.hasDetails);
      return row ? { campaign: row.campaign, archived: row.phase === 'archived' } : null;
    },
    targetLabel(): string {
      return this.form.goalMetric === 'revenue' && this.currency
        ? this.tr('GoalTargetIn', this.currency)
        : this.tr('GoalTarget');
    },
  },
  methods: {
    tr(key: string, ...args: string[]): string {
      return translate(PREFIX + key, ...args);
    },
    start(row: CampaignRow | null) {
      this.panelError = '';
      this.campaignMissing = false;
      this.existingSaved = null;
      this.editingCampaign = row && row.hasDetails ? row.campaign : '';
      this.editingName = row && row.hasDetails ? (row.name || '') : '';
      this.form = emptyDetails();
      if (row) {
        this.form.campaign = row.campaign;
        this.form.name = row.name || '';
        this.form.startDate = row.startDate || '';
        this.form.endDate = row.endDate || '';
        this.form.notes = row.notes || '';
        if (row.goal) {
          this.form.goalMetric = row.goal.metric;
          this.form.goalTarget = `${row.goal.target}`;
          this.form.idGoal = row.goal.idGoal === null ? '' : `${row.goal.idGoal}`;
        }
      }
      if (this.goals.length === 0) {
        fetchGoals(this.idSite).then((goals) => {
          this.goals = goals;
        }).catch(() => undefined);
      }
    },
    saveDetails() {
      if (this.saving || this.datesWrong) {
        return;
      }
      if (!this.editingCampaign && this.form.campaign.trim() === '') {
        this.campaignMissing = true;
        const field = document.getElementById('fwcmp-d-campaign');
        if (field) {
          field.focus();
        }
        return;
      }
      this.campaignMissing = false;
      this.saving = true;
      this.panelError = '';
      const request = this.editingCampaign
        ? updateCampaign(this.idSite, this.form).then((campaign) => ({ campaign, existed: false }))
        : addCampaign(this.idSite, this.form);
      request.then((r) => {
        if (r.existed) {
          // nothing was saved: the value has details already; the panel stays with what was typed
          this.existingSaved = r.campaign;
          return;
        }
        this.$emit('update:open', false);
        this.$emit('changed');
      }).catch((e: Error) => {
        this.panelError = e && e.message ? plainText(e.message) : this.tr('CampaignSaveFailed');
      }).finally(() => {
        this.saving = false;
      });
    },
    /** switches the panel to the saved details of the typed value (restored first if archived) */
    editExisting() {
      const existing = this.existingDetails;
      if (!existing) {
        return;
      }
      const row = this.rows.find((r) => r.campaign === existing.campaign);
      const restore = existing.archived
        ? archiveCampaign(this.idSite, existing.campaign, false)
        : Promise.resolve(null);
      restore.then(() => {
        const saved = this.existingSaved;
        if (row && !saved) {
          this.start(row);
        } else if (saved) {
          this.fillFromDetails(saved);
        }
        if (existing.archived) {
          this.$emit('changed');
        }
      }).catch((e: Error) => {
        this.panelError = e && e.message ? plainText(e.message) : this.tr('CampaignRestoreFailed');
      });
    },
    fillFromDetails(d: CampaignDetails) {
      this.existingSaved = null;
      this.editingCampaign = d.campaign;
      this.editingName = d.name || '';
      this.form = {
        campaign: d.campaign,
        name: d.name || '',
        startDate: d.startDate || '',
        endDate: d.endDate || '',
        goalMetric: d.goal ? d.goal.metric : 'none',
        goalTarget: d.goal && d.goal.target !== null ? `${d.goal.target}` : '',
        idGoal: d.goal && d.goal.idGoal !== null ? `${d.goal.idGoal}` : '',
        notes: d.notes || '',
      };
    },
  },
});
</script>
