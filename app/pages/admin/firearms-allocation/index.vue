<template>
  <div class="handover-page">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Firearm Handover & Return</h1>
        <p class="page-subtitle">Manage firearm issuance and returns with OTP verification</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-row">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- ── TAB 1: ISSUE FIREARMS ── -->
    <template v-if="activeTab === 'issue'">
      <div class="section-card">
        <div class="section-header">
          <h3 class="section-title">Issue Firearm to Security Personnel</h3>
          <button class="btn-primary">
            <Shield :size="14" />
            Issue Firearm
          </button>
        </div>

        <!-- Mini stats -->
        <div class="issue-stats">
          <div class="issue-stat blue">
            <span class="issue-stat-label">Active Deployments</span>
            <span class="issue-stat-value blue-val">{{ activeDeployments }}</span>
          </div>
          <div class="issue-stat green">
            <span class="issue-stat-label">Available Firearms</span>
            <span class="issue-stat-value green-val">{{ availableFirearms }}</span>
          </div>
        </div>
      </div>

      <!-- Active Handovers Table -->
      <div class="table-card">
        <h3 class="table-title">Active Handovers</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Weapon Number</th>
              <th>Firearm</th>
              <th>Type</th>
              <th>Security Personnel</th>
              <th>Ammo Issued</th>
              <th>Issued At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in activeHandovers" :key="h.weaponNum" class="table-row">
              <td class="fw">{{ h.weaponNum }}</td>
              <td class="fw">{{ h.firearm }}</td>
              <td class="muted">{{ h.type }}</td>
              <td>{{ h.personnel }}</td>
              <td class="muted">{{ h.ammoIssued }}</td>
              <td class="muted">{{ h.issuedAt }}</td>
              <td>
                <span class="status-badge badge-duty">{{ h.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ── TAB 2: RETURN FIREARMS ── -->
    <template v-if="activeTab === 'return'">
      <div class="table-card">
        <div class="section-header" style="padding: 18px 22px 0;">
          <h3 class="section-title" style="margin:0;">Return Firearms</h3>
          <button class="btn-primary">
            <ArrowLeft :size="14" />
            Process Return
          </button>
        </div>
        <table class="data-table" style="margin-top: 8px;">
          <thead>
            <tr>
              <th>Weapon Number</th>
              <th>Firearm</th>
              <th>Type</th>
              <th>Security Personnel</th>
              <th>Ammo Issued</th>
              <th>Issued At</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in returnHandovers" :key="h.weaponNum" class="table-row">
              <td class="fw">{{ h.weaponNum }}</td>
              <td class="fw">{{ h.firearm }}</td>
              <td class="muted">{{ h.type }}</td>
              <td>{{ h.personnel }}</td>
              <td class="muted">{{ h.ammoIssued }}</td>
              <td class="muted">{{ h.issuedAt }}</td>
              <td>
                <span class="status-badge" :class="h.returnStatus === 'Overdue' ? 'badge-overdue' : 'badge-ontime'">
                  {{ h.returnStatus }}
                </span>
              </td>
              <td>
                <button class="return-btn">Return</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

    <!-- ── TAB 3: HANDOVER HISTORY ── -->
    <template v-if="activeTab === 'history'">
      <div class="table-card">
        <h3 class="table-title">Recent Handover History</h3>
        <table class="data-table">
          <thead>
            <tr>
              <th>Weapon Number</th>
              <th>Firearm</th>
              <th>Type</th>
              <th>Security Personnel</th>
              <th>Armoury Keeper</th>
              <th>Ammo Issued</th>
              <th>Ammo Returned</th>
              <th>Issued At</th>
              <th>Returned At</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="h in handoverHistory" :key="h.weaponNum + h.issuedAt" class="table-row">
              <td class="fw">{{ h.weaponNum }}</td>
              <td class="fw">{{ h.firearm }}</td>
              <td class="muted">{{ h.type }}</td>
              <td>{{ h.personnel }}</td>
              <td class="muted">{{ h.keeper }}</td>
              <td class="muted">{{ h.ammoIssued }}</td>
              <td>
                <span v-if="h.ammoReturned === '-'" class="muted">-</span>
                <span v-else-if="h.ammoDiscount" class="ammo-discount">{{ h.ammoReturned }}</span>
                <span v-else class="muted">{{ h.ammoReturned }}</span>
              </td>
              <td class="muted">{{ h.issuedAt }}</td>
              <td class="muted">{{ h.returnedAt }}</td>
              <td>
                <span
                  class="status-badge"
                  :class="h.historyStatus === 'COMPLETED' ? 'badge-completed' : 'badge-returned'"
                >
                  {{ h.historyStatus }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Shield, ArrowLeft } from 'lucide-vue-next'

const activeTab = ref('issue')

const tabs = [
  { id: 'issue',   label: 'Issue Firearms' },
  { id: 'return',  label: 'Return Firearms' },
  { id: 'history', label: 'Handover History' },
]

const activeHandovers = ref([
  { weaponNum: 'BRT342', firearm: 'BERETTA',          type: 'PISTOL', personnel: 'J. K. Sanga',    ammoIssued: '15 rounds', issuedAt: '12/24/2024, 7:00:00 PM', status: 'On Duty' },
  { weaponNum: 'YFW214', firearm: 'GLOCK 17',         type: 'PISTOL', personnel: 'N. O. Mwinyi',   ammoIssued: '20 rounds', issuedAt: '12/25/2024, 7:00:00 AM', status: 'On Duty' },
  { weaponNum: 'SIG445', firearm: 'SIG SAUER P226',   type: 'PISTOL', personnel: 'P. Q. Hamisi',   ammoIssued: '18 rounds', issuedAt: '12/25/2024, 7:00:00 PM', status: 'On Duty' },
  { weaponNum: 'CZ7501', firearm: 'CZ 75',            type: 'PISTOL', personnel: 'M. T. Mwakyusa', ammoIssued: '25 rounds', issuedAt: '12/26/2024, 7:00:00 AM', status: 'On Duty' },
  { weaponNum: 'SW9402', firearm: 'SMITH & WESSON M&P', type: 'PISTOL', personnel: 'R. S. Juma',  ammoIssued: '15 rounds', issuedAt: '12/26/2024, 1:00:00 PM', status: 'On Duty' },
])

const returnHandovers = ref([
  { weaponNum: 'BRT342', firearm: 'BERETTA',            type: 'PISTOL', personnel: 'J. K. Sanga',    ammoIssued: '15 rounds', issuedAt: '12/24/2024, 7:00:00 PM', returnStatus: 'Overdue' },
  { weaponNum: 'YFW214', firearm: 'GLOCK 17',           type: 'PISTOL', personnel: 'N. O. Mwinyi',   ammoIssued: '20 rounds', issuedAt: '12/25/2024, 7:00:00 AM', returnStatus: 'Overdue' },
  { weaponNum: 'SIG445', firearm: 'SIG SAUER P226',     type: 'PISTOL', personnel: 'P. Q. Hamisi',   ammoIssued: '18 rounds', issuedAt: '12/25/2024, 7:00:00 PM', returnStatus: 'Overdue' },
  { weaponNum: 'CZ7501', firearm: 'CZ 75',              type: 'PISTOL', personnel: 'M. T. Mwakyusa', ammoIssued: '25 rounds', issuedAt: '12/26/2024, 7:00:00 AM', returnStatus: 'Overdue' },
  { weaponNum: 'SW9402', firearm: 'SMITH & WESSON M&P', type: 'PISTOL', personnel: 'R. S. Juma',     ammoIssued: '15 rounds', issuedAt: '12/26/2024, 1:00:00 PM', returnStatus: 'On Time' },
])

const handoverHistory = ref([
  { weaponNum: 'BRT342', firearm: 'BERETTA',          type: 'PISTOL',    personnel: 'J. K. Sanga',    keeper: 'F. G. Massawe', ammoIssued: '15 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/24/2024, 7:00:00 PM', returnedAt: '-',                    historyStatus: 'COMPLETED' },
  { weaponNum: 'YFW214', firearm: 'GLOCK 17',         type: 'PISTOL',    personnel: 'N. O. Mwinyi',   keeper: 'F. G. Massawe', ammoIssued: '20 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/25/2024, 7:00:00 AM', returnedAt: '-',                    historyStatus: 'COMPLETED' },
  { weaponNum: 'SIG445', firearm: 'SIG SAUER P226',   type: 'PISTOL',    personnel: 'P. Q. Hamisi',   keeper: 'F. G. Massawe', ammoIssued: '18 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/25/2024, 7:00:00 PM', returnedAt: '-',                    historyStatus: 'COMPLETED' },
  { weaponNum: 'CZ7501', firearm: 'CZ 75',            type: 'PISTOL',    personnel: 'M. T. Mwakyusa', keeper: 'F. G. Massawe', ammoIssued: '25 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/26/2024, 7:00:00 AM', returnedAt: '-',                    historyStatus: 'COMPLETED' },
  { weaponNum: 'SW9402', firearm: 'SMITH & WESSON M&P', type: 'PISTOL',  personnel: 'R. S. Juma',     keeper: 'F. G. Massawe', ammoIssued: '15 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/26/2024, 1:00:00 PM', returnedAt: '-',                    historyStatus: 'COMPLETED' },
  { weaponNum: 'REM123', firearm: 'REMINGTON 870',    type: 'SHORT GUN', personnel: 'J. K. Sanga',    keeper: 'F. G. Massawe', ammoIssued: '22 rounds', ammoReturned: '20 rounds (-2)', ammoDiscount: true,  issuedAt: '12/20/2024, 9:00:00 AM', returnedAt: '12/20/2024, 9:00:00 PM', historyStatus: 'RETURNED' },
  { weaponNum: 'WLT783', firearm: 'WALTHER PPK',      type: 'PISTOL',    personnel: 'L. M. Mbwana',   keeper: 'F. G. Massawe', ammoIssued: '18 rounds', ammoReturned: '18 rounds',      ammoDiscount: false, issuedAt: '12/21/2024, 7:00:00 AM', returnedAt: '12/21/2024, 7:00:00 PM', historyStatus: 'RETURNED' },
  { weaponNum: 'MOS556', firearm: 'MOSSBERG 500',     type: 'SHORT GUN', personnel: 'N. O. Mwinyi',   keeper: 'F. G. Massawe', ammoIssued: '30 rounds', ammoReturned: '25 rounds (-5)', ammoDiscount: true,  issuedAt: '12/22/2024, 7:00:00 AM', returnedAt: '12/22/2024, 7:00:00 PM', historyStatus: 'RETURNED' },
])

const activeDeployments = computed(() => activeHandovers.value.length)
const availableFirearms = ref(8)
</script>

<style scoped>
.handover-page {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}

/* Header */
.page-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 20px;
}
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; margin: 0 0 4px; }
.page-subtitle { font-size: 13px; color: #64748b; margin: 0; }

/* Tabs */
.tabs-row {
  display: inline-flex;
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 10px;
  padding: 4px;
  gap: 2px;
  margin-bottom: 20px;
}
.tab-btn {
  padding: 8px 20px; background: transparent; border: none;
  border-radius: 7px; color: #64748b; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s; font-family: inherit; white-space: nowrap;
}
.tab-btn:hover { color: #94a3b8; }
.tab-btn.active { background: #1e2535; color: #f1f5f9; font-weight: 600; }

/* Buttons */
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 9px 16px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit; white-space: nowrap;
}
.btn-primary:hover { background: #2563eb; }

/* Section card (Issue tab top area) */
.section-card {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; padding: 20px 22px; margin-bottom: 16px;
}
.section-header {
  display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px;
}
.section-title { font-size: 14px; font-weight: 600; color: #f1f5f9; margin: 0; }

/* Issue mini stats */
.issue-stats { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.issue-stat {
  border-radius: 10px; padding: 16px 20px;
  display: flex; flex-direction: column; gap: 8px;
}
.issue-stat.blue  { background: #0f1829; border: 1px solid #1e3a5f; }
.issue-stat.green { background: #0a1f13; border: 1px solid #166534; }
.issue-stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.issue-stat-value { font-size: 28px; font-weight: 700; line-height: 1; }
.blue-val  { color: #60a5fa; }
.green-val { color: #4ade80; }

/* Table card */
.table-card {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; overflow: hidden;
}
.table-title {
  font-size: 14px; font-weight: 600; color: #f1f5f9;
  padding: 18px 22px 14px; margin: 0; border-bottom: 1px solid #1e2535;
}

/* Table */
.data-table {
  width: 100%; border-collapse: collapse; font-size: 13px;
}
.data-table thead tr { border-bottom: 1px solid #1e2535; }
.data-table th {
  padding: 12px 16px; text-align: left;
  font-size: 12px; font-weight: 600; color: #64748b;
  text-transform: none; white-space: nowrap; letter-spacing: 0;
}
.table-row { border-bottom: 1px solid #1a2030; transition: background 0.1s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #1a2030; }
.data-table td { padding: 14px 16px; vertical-align: middle; }

.fw   { font-weight: 600; color: #f1f5f9; }
.muted { color: #94a3b8; }

/* Ammo discount highlight */
.ammo-discount { color: #f59e0b; font-weight: 600; }

/* Status badges */
.status-badge {
  display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
  white-space: nowrap;
}
.badge-duty      { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.badge-overdue   { background: #7f1d1d; color: #fca5a5; border: 1px solid #991b1b; }
.badge-ontime    { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.badge-completed { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.badge-returned  { background: #1e3a5f; color: #60a5fa; border: 1px solid #1d4ed8; }

/* Return button */
.return-btn {
  background: #3b82f6; color: #fff; border: none;
  border-radius: 7px; padding: 6px 16px;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit;
}
.return-btn:hover { background: #2563eb; }
</style>