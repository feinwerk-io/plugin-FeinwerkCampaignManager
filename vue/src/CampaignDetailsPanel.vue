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
      <!-- while connected a new campaign is also created in the workspace: said first (R52 D1) -->
      <div v-if="checkingWorkspace" class="fwcmp-hint" role="status">
        {{ tr('CampaignCheckingWorkspace') }}
      </div>
      <div
        v-else-if="toWorkspace"
        class="fwcmp-notice fwcmp-details__workspace"
      >{{ tr('CampaignAlsoInWorkspace', workspace.workspace, workspace.website) }}</div>
      <div
        v-else-if="workspaceError"
        class="fwcmp-hint fwcmp-details__workspace"
        role="status"
      >{{ workspaceError }}</div>
      <!-- details of a workspace campaign stay in this Matomo (R52 W6) -->
      <div v-if="rowAppUrl" class="fwcmp-hint fwcmp-details__localonly">
        {{ tr('CampaignDetailsLocalOnly') }}
        <a
          class="fwcmp-applink"
          :href="rowAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          :title="tr('PlatformOpenCampaignTooltip')"
        >Feinwerk Campaigns<span class="icon-outlink" aria-hidden="true" /></a>
      </div>
      <!-- a new campaign: the name first in both modes, so nothing moves when the check returns -->
      <label class="fwcmp-label" for="fwcmp-d-name">
        {{ toWorkspace ? tr('CampaignNameLabel') : tr('DisplayName') }}
      </label>
      <input
        id="fwcmp-d-name"
        v-model="form.name"
        class="fwcmp-input"
        type="text"
        maxlength="255"
        autocomplete="off"
        :aria-required="toWorkspace ? 'true' : 'false'"
      />
      <!-- "Add details" of an existing value: the value is its key, shown, not changed (R52 W5) -->
      <div v-if="fixedValue" class="fwcmp-details__value">
        <span class="fwcmp-label">{{ tr('CampaignValue') }}</span>
        <code class="fwcmp-card__value">{{ fixedValue }}</code>
      </div>
      <template v-else-if="!editingCampaign">
        <!-- connected: the workspace forms the value unless someone sets it (R52 D1) -->
        <div v-if="toWorkspace && !ownValue" class="fwcmp-hint fwcmp-details__fromname">
          {{ tr('CampaignValueFromName') }}
          <button
            type="button"
            class="fwcmp-linkbutton"
            @click="setOwnValue"
          >{{ tr('CampaignValueSetOwn') }}</button>
        </div>
        <template v-else>
          <label class="fwcmp-label" for="fwcmp-d-campaign">
            {{ toWorkspace ? tr('CampaignValueOptional') : tr('FieldCampaign') }}
          </label>
          <input
            id="fwcmp-d-campaign"
            v-model="form.campaign"
            class="fwcmp-input"
            type="text"
            autocomplete="off"
            :readonly="!!createdParameter"
            :aria-required="toWorkspace ? 'false' : 'true'"
            :aria-invalid="campaignMissing || valueError ? 'true' : 'false'"
            aria-describedby="fwcmp-d-campaign-help"
          />
        </template>
        <div id="fwcmp-d-campaign-help" class="fwcmp-hint">
          <div v-if="campaignMissing" class="fwcmp-msg fwcmp-msg--error">
            {{ tr(toWorkspace ? 'CampaignNameOrValueMissing' : 'CampaignValueMissing') }}
          </div>
          <div v-if="valueError" class="fwcmp-msg fwcmp-msg--error" role="alert">
            {{ valueError }}
          </div>
          <template v-if="toWorkspace && ownValue && !valueError">
            {{ tr('CampaignValueWorkspaceHelp') }}
          </template>
          <template v-else-if="!toWorkspace">{{ tr('CampaignValueHelp') }}</template>
        </div>
      </template>
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
        :disabled="saving || checkingWorkspace || datesWrong || !!existingDetails"
        @click="saveDetails"
      >{{ toWorkspace ? tr('PlatformLinkCreate') : tr('SaveDetails') }}</button>
    </template>
  </SidePanel>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { Alert, translate } from 'CoreHome';
import {
  addCampaign,
  addPlatformCampaign,
  archiveCampaign,
  CampaignDetails,
  CampaignRow,
  DetailsForm,
  fetchConnectionStatus,
  fetchGoals,
  fetchPlatformConvention,
  GoalMetric,
  MatomoGoal,
  updateCampaign,
} from './api';
import SidePanel from './SidePanel.vue';
import plainText from './plainText';
import { splitPlatformError } from './platformReason';

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
  /** while connected: the workspace and website a new campaign is also created in */
  workspace: { workspace: string, website: string } | null;
  /** the connection and the website mapping are being read: Save waits */
  checkingWorkspace: boolean;
  /** counts the checks, so a late answer of an earlier opening is ignored */
  checkSeq: number;
  /** connected, but Feinwerk Campaigns did not answer: saved here only, and said so */
  workspaceError: string;
  /** the value the workspace gave a campaign whose details failed here: a retry saves only those */
  createdParameter: string;
  /** the workspace refused the typed value (its naming convention) */
  valueError: string;
  /** connected: the value field is open (someone sets the value instead of the workspace) */
  ownValue: boolean;
  /** "Add details" of an existing value: that value, fixed; '' for a new campaign or editing */
  fixedValue: string;
  /** the opened campaign is one of the workspace: its link there */
  rowAppUrl: string;
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
      workspace: null,
      checkingWorkspace: false,
      checkSeq: 0,
      workspaceError: '',
      createdParameter: '',
      valueError: '',
      ownValue: false,
      fixedValue: '',
      rowAppUrl: '',
    };
  },
  watch: {
    open(isOpen: boolean) {
      if (isOpen) {
        this.start(this.row);
      }
    },
    'form.campaign': function onCampaignTyped() {
      this.valueError = '';
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
    /** a new campaign that is also created in the workspace */
    toWorkspace(): boolean {
      return !!this.workspace && !this.editingCampaign && !this.fixedValue;
    },
    metrics(): GoalMetric[] {
      return METRICS;
    },
    datesWrong(): boolean {
      return this.form.startDate !== '' && this.form.endDate !== ''
        && this.form.endDate < this.form.startDate;
    },
    panelTitle(): string {
      if (this.editingCampaign) {
        return this.tr('DetailsOf', this.editingName || this.editingCampaign);
      }
      return this.fixedValue
        ? this.tr('DetailsOf', this.form.name || this.fixedValue)
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
      this.workspace = null;
      this.workspaceError = '';
      this.createdParameter = '';
      this.valueError = '';
      this.ownValue = false;
      this.checkSeq += 1;
      this.checkingWorkspace = false;
      this.editingCampaign = row && row.hasDetails ? row.campaign : '';
      this.fixedValue = row && !row.hasDetails ? row.campaign : '';
      this.rowAppUrl = row && row.platform && row.platform.appUrl ? row.platform.appUrl : '';
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
      // only "New campaign" goes to the workspace (Peter, 2026-11-26); "Add details" of a value
      // Matomo counts or links already stays in this Matomo (UI review F1)
      if (row === null) {
        this.checkWorkspace();
      }
    },
    /** connected: open the value field (the workspace would form the value from the name) */
    setOwnValue() {
      this.ownValue = true;
      this.$nextTick(() => {
        const field = document.getElementById('fwcmp-d-campaign');
        if (field) {
          field.focus();
        }
      });
    },
    checkWorkspace() {
      const seq = this.checkSeq;
      this.checkingWorkspace = true;
      fetchConnectionStatus().then((status) => {
        if (status.mode !== 'connected' || !status.connected) {
          return undefined;
        }
        const workspace = status.workspace ? status.workspace.name : '';
        return fetchPlatformConvention(this.idSite).then((answer) => {
          if (seq === this.checkSeq && !this.editingCampaign) {
            this.workspace = { workspace, website: answer.website.name };
            // a value typed while the check ran stays in sight
            this.ownValue = this.form.campaign.trim() !== '';
          }
        }).catch((e: Error) => {
          // a website the workspace does not have: details only, as without a connection
          const { reason } = splitPlatformError(e && e.message ? plainText(e.message) : '');
          if (seq === this.checkSeq && reason !== 'no_website') {
            this.workspaceError = this.tr('CampaignWorkspaceUnavailable');
          }
        });
      }).catch(() => undefined).finally(() => {
        if (seq === this.checkSeq) {
          this.checkingWorkspace = false;
        }
      });
    },
    saveDetails() {
      if (this.saving || this.checkingWorkspace || this.datesWrong) {
        return;
      }
      // with the workspace the value may stay empty: Feinwerk Campaigns forms it from the name
      const nameOnly = this.toWorkspace && this.form.name.trim() !== '';
      if (!this.editingCampaign && !this.fixedValue && this.form.campaign.trim() === '' && !nameOnly) {
        this.campaignMissing = true;
        const field = document.getElementById(this.toWorkspace ? 'fwcmp-d-name' : 'fwcmp-d-campaign');
        if (field) {
          field.focus();
        }
        return;
      }
      this.campaignMissing = false;
      this.saving = true;
      this.panelError = '';
      this.valueError = '';
      let request: Promise<{ campaign: CampaignDetails, existed: boolean }>;
      if (this.editingCampaign) {
        request = updateCampaign(this.idSite, this.form)
          .then((campaign) => ({ campaign, existed: false }));
      } else if (this.toWorkspace) {
        // first in the workspace, then the details here under the value the workspace gave it;
        // after a half-finished save only the details are tried again (UI review W1)
        const value = this.form.campaign.trim();
        const created = this.createdParameter
          ? Promise.resolve(this.createdParameter)
          : addPlatformCampaign(
            this.idSite,
            this.form.name.trim() || value,
            value,
            this.form.startDate,
            this.form.endDate,
          ).then((answer) => {
            this.createdParameter = answer.campaign.parameter;
            this.form.campaign = answer.campaign.parameter;
            return answer.campaign.parameter;
          });
        request = created.then((parameter) => addCampaign(this.idSite, {
          ...this.form,
          campaign: parameter,
        }));
      } else {
        request = addCampaign(this.idSite, this.form);
      }
      request.then((r) => {
        if (r.existed) {
          // nothing was saved: the value has details already; the panel stays with what was typed
          this.existingSaved = r.campaign;
          return;
        }
        this.$emit('update:open', false);
        this.$emit('changed');
      }).catch((e: Error) => {
        const { reason, text } = splitPlatformError(e && e.message ? plainText(e.message) : '');
        if (this.toWorkspace && this.createdParameter) {
          this.panelError = this.tr('CampaignCreatedInWorkspaceOnly', this.createdParameter, text);
        } else if (this.toWorkspace && reason === 'validation' && this.form.campaign.trim() !== '') {
          // the typed value does not fit the workspace's naming convention: said at the field
          this.valueError = this.tr('CampaignValueNotInConvention');
          const field = document.getElementById('fwcmp-d-campaign');
          if (field) {
            field.focus();
          }
        } else {
          this.panelError = text || this.tr('CampaignSaveFailed');
        }
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
