<template>
  <div class="arms-register">
    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Arms Register</h1>
        <p class="page-subtitle">Centralized register of all firearms owned by the organization</p>
      </div>
      <Button class="add-btn">
        <Plus :size="16" />
        Register Firearm
      </Button>
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
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>

    <!-- Pending Approvals Tab -->
    <div v-if="activeTab === 'pending'" class="pending-section">
      <div class="pending-header">
        <h2 class="pending-title">Pending Approvals</h2>
        <p class="pending-subtitle">Review and approve firearms registered by other BISO officers</p>
      </div>
      <div class="pending-list">
        <div v-for="item in pendingApprovals" :key="item.barcode" class="pending-card">
          <div class="pending-card-header">
            <div class="pending-card-title">
              <Clock :size="16" class="pending-clock" />
              <span class="pending-gun-name">{{ item.makeModel }}</span>
              <span class="pending-status-tag">Pending Approval</span>
            </div>
            <button class="review-btn">Review</button>
          </div>
          <div class="pending-card-body">
            <div class="pending-field">
              <span class="field-label">Barcode:</span>
              <span class="field-value">{{ item.barcode }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">Type:</span>
              <span class="field-value">{{ item.type }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">Weapon #:</span>
              <span class="field-value">{{ item.weaponNum }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">C.A.R. #:</span>
              <span class="field-value">{{ item.carNum }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">Branch:</span>
              <span class="field-value">{{ item.branch }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">Status:</span>
              <span class="field-value">{{ item.status }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">Registered By:</span>
              <span class="field-value">{{ item.registeredBy }}</span>
            </div>
            <div class="pending-field">
              <span class="field-label">Date:</span>
              <span class="field-value">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter & Search (Arms Register tab only) -->
    <div v-if="activeTab === 'register'" class="filter-card">
      <h3 class="filter-title">Filter &amp; Search</h3>
      <div class="filter-row">
        <div class="search-wrap">
          <Search :size="15" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search by barcode, model, weapon #..."
            class="search-input"
          />
        </div>
        <select v-model="selectedBranch" class="filter-select">
          <option value="">All Branches</option>
          <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
        </select>
        <select v-model="selectedCondition" class="filter-select">
          <option value="">All Conditions</option>
          <option value="GOOD">Good</option>
          <option value="MALFUNCTION">Malfunction</option>
          <option value="MAINTENANCE">Maintenance</option>
        </select>
        <select v-model="selectedAvailability" class="filter-select">
          <option value="">All Availability</option>
          <option value="ARMOURY">Armoury</option>
          <option value="DUTY">Duty</option>
        </select>
      </div>
    </div>

    <!-- Table (Arms Register tab only) -->
    <div v-if="activeTab === 'register'" class="table-wrap">
      <table class="arms-table">
        <thead>
          <tr>
            <th>Barcode</th>
            <th>Type</th>
            <th>Make &amp; Model</th>
            <th>Weapon #</th>
            <th>C.A.R. #</th>
            <th>Location</th>
            <th>Status</th>
            <th>Availability</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="arm in filteredArms" :key="arm.barcode" class="table-row">
            <td>
              <span class="barcode-cell">
                {{ arm.barcode }}
                <AlertTriangle v-if="arm.flagged" :size="13" class="flag-icon" />
              </span>
            </td>
            <td class="text-muted">{{ arm.type }}</td>
            <td class="font-medium">{{ arm.makeModel }}</td>
            <td class="text-muted">{{ arm.weaponNum }}</td>
            <td class="text-muted">{{ arm.carNum }}</td>
            <td>
              <div class="location-cell">
                <span class="location-name">{{ arm.location }}</span>
                <span class="location-sub">{{ arm.sublocation }}</span>
              </div>
            </td>
            <td>
              <span class="status-badge" :class="arm.status.toLowerCase()">
                {{ arm.status }}
              </span>
            </td>
            <td>
              <span class="avail-badge" :class="arm.availability.toLowerCase()">
                {{ arm.availability }}
              </span>
            </td>
            <td>
              <div class="actions-cell">
                <button class="action-btn view-btn" title="View">
                  <Eye :size="15" />
                </button>
                <button class="action-btn edit-btn" title="Edit">
                  <span class="edit-text">Edit</span>
                </button>
                <button class="action-btn history-btn" title="History">
                  <RotateCcw :size="15" />
                </button>
                <button
                  class="action-btn lock-btn"
                  :class="arm.flagged ? 'locked' : 'unlocked'"
                  title="Lock/Unlock"
                >
                  <Lock v-if="arm.flagged" :size="15" />
                  <Unlock v-else :size="15" />
                </button>
                <button class="action-btn alert-btn" title="Alert">
                  <AlertCircle :size="15" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Search, Plus, Eye, Lock, Unlock, RotateCcw, AlertTriangle, AlertCircle, Clock } from 'lucide-vue-next'

interface Arm {
  barcode: string
  type: string
  makeModel: string
  weaponNum: string
  carNum: string
  location: string
  sublocation: string
  status: 'GOOD' | 'MALFUNCTION' | 'MAINTENANCE'
  availability: 'ARMOURY' | 'DUTY'
  flagged?: boolean
}

interface PendingApproval {
  barcode: string
  type: string
  makeModel: string
  weaponNum: string
  carNum: string
  branch: string
  status: string
  registeredBy: string
  date: string
}

const activeTab = ref('register')
const searchQuery = ref('')
const selectedBranch = ref('')
const selectedCondition = ref('')
const selectedAvailability = ref('')

const tabs = [
  { id: 'register', label: 'Arms Register' },
  { id: 'pending', label: 'Pending Approvals', badge: 2 },
]

const branches = [
  'Dar es Salaam Sub-HQ',
  'Dodoma HQ',
  'Zanzibar Sub-HQ',
  'Mwanza Branch',
  'Arusha Branch',
]

const pendingApprovals = ref<PendingApproval[]>([
  {
    barcode: '99001',
    type: 'PISTOL',
    makeModel: 'SIG SAUER P320',
    weaponNum: 'SIG-P-001',
    carNum: 'TZC AR111801',
    branch: 'Dar es Salaam Sub-HQ',
    status: 'GOOD',
    registeredBy: 'E. L. Mpina',
    date: '06/03/2026',
  },
  {
    barcode: '99002',
    type: 'RIFLE',
    makeModel: 'FN FAL',
    weaponNum: 'FN-002',
    carNum: 'TZC AR111802',
    branch: 'Mtwara Branch',
    status: 'GOOD',
    registeredBy: 'E. L. Mpina',
    date: '06/03/2026',
  },
])

const arms = ref<Arm[]>([
  { barcode: '83828', type: 'PISTOL', makeModel: 'GLOCK 17', weaponNum: 'YFW214', carNum: 'TZC AR111641', location: 'Dar es Salaam Sub-HQ', sublocation: 'MAIN Armoury', status: 'GOOD', availability: 'ARMOURY' },
  { barcode: '83829', type: 'PISTOL', makeModel: 'BERETTA', weaponNum: 'BRT342', carNum: 'TZC AR111642', location: 'Dar es Salaam Sub-HQ', sublocation: 'SUB Armoury', status: 'GOOD', availability: 'DUTY' },
  { barcode: '83830', type: 'SHORT GUN', makeModel: 'BROWNING', weaponNum: 'BRW567', carNum: 'TZC AR111643', location: 'Dodoma HQ', sublocation: 'MAIN Armoury', status: 'MALFUNCTION', availability: 'ARMOURY', flagged: true },
  { barcode: '83831', type: 'PISTOL', makeModel: 'SIG SAUER P226', weaponNum: 'SIG445', carNum: 'TZC AR111644', location: 'Dar es Salaam Sub-HQ', sublocation: 'MAIN Armoury', status: 'GOOD', availability: 'ARMOURY' },
  { barcode: '88392', type: 'RIFLE', makeModel: 'AK-47', weaponNum: 'AK47-001', carNum: 'TZC AR111701', location: 'Dar es Salaam Sub-HQ', sublocation: 'MAIN Armoury', status: 'GOOD', availability: 'ARMOURY' },
  { barcode: '88393', type: 'PISTOL', makeModel: 'GLOCK 19', weaponNum: 'GLK-002', carNum: 'TZC AR111702', location: 'Dodoma HQ', sublocation: 'SUB Armoury', status: 'GOOD', availability: 'DUTY' },
  { barcode: '88394', type: 'SHORT GUN', makeModel: 'MOSSBERG 500', weaponNum: 'MOS-003', carNum: 'TZC AR111703', location: 'Zanzibar Sub-HQ', sublocation: 'MAIN Armoury', status: 'MALFUNCTION', availability: 'ARMOURY', flagged: true },
  { barcode: '88395', type: 'REVOLVER', makeModel: 'SMITH & WESSON', weaponNum: 'SW-004', carNum: 'TZC AR111704', location: 'Mwanza Branch', sublocation: 'MAIN Armoury', status: 'GOOD', availability: 'ARMOURY' },
  { barcode: '88396', type: 'PISTOL', makeModel: 'BERETTA 92FS', weaponNum: 'BRT-005', carNum: 'TZC AR111705', location: 'Arusha Branch', sublocation: 'MAIN Armoury', status: 'GOOD', availability: 'DUTY' },
])

const filteredArms = computed(() => {
  return arms.value.filter(arm => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch = !q || arm.barcode.includes(q) || arm.makeModel.toLowerCase().includes(q) || arm.weaponNum.toLowerCase().includes(q)
    const matchBranch = !selectedBranch.value || arm.location === selectedBranch.value
    const matchCondition = !selectedCondition.value || arm.status === selectedCondition.value
    const matchAvail = !selectedAvailability.value || arm.availability === selectedAvailability.value
    return matchSearch && matchBranch && matchCondition && matchAvail
  })
})
</script>

<style scoped>
.arms-register {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.3px;
  margin: 0 0 4px;
}
.page-subtitle {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.add-btn:hover { background: #2563eb; }

/* Tabs */
.tabs-row {
  display: inline-flex;
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 24px;
}
.tab-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 24px;
  background: transparent;
  border: none;
  border-radius: 7px;
  color: #64748b;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
}
.tab-btn:hover { color: #94a3b8; }
.tab-btn.active {
  background: #1e2535;
  color: #f1f5f9;
  font-weight: 600;
}
.tab-badge {
  background: #ef4444;
  color: #fff;
  font-size: 11px;
  font-weight: 700;
  border-radius: 10px;
  padding: 1px 7px;
  line-height: 1.5;
}

/* Filter Card */
.filter-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  padding: 18px 22px;
  margin-bottom: 24px;
}
.filter-title {
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  margin: 0 0 14px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.filter-row {
  display: flex;
  gap: 12px;
  align-items: center;
}
.search-wrap {
  position: relative;
  flex: 1.5;
}
.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #475569;
}
.search-input {
  width: 100%;
  background: #0f1117;
  border: 1px solid #1e2535;
  border-radius: 8px;
  padding: 9px 12px 9px 36px;
  font-size: 13px;
  color: #e2e8f0;
  outline: none;
  transition: border-color 0.15s;
  box-sizing: border-box;
}
.search-input::placeholder { color: #475569; }
.search-input:focus { border-color: #3b82f6; }
.filter-select {
  flex: 1;
  background: #0f1117;
  border: 1px solid #1e2535;
  border-radius: 8px;
  padding: 9px 36px 9px 12px;
  font-size: 13px;
  color: #e2e8f0;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  transition: border-color 0.15s;
}
.filter-select:focus { border-color: #3b82f6; }

/* Table */
.table-wrap {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  overflow: hidden;
}
.arms-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
}
.arms-table thead tr {
  border-bottom: 1px solid #1e2535;
}
.arms-table th {
  padding: 13px 16px;
  text-align: left;
  font-size: 12px;
  font-weight: 600;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
}
.table-row {
  border-bottom: 1px solid #1a2030;
  transition: background 0.1s;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #1a2030; }
.arms-table td {
  padding: 14px 16px;
  vertical-align: middle;
}

/* Cells */
.barcode-cell {
  display: flex;
  align-items: center;
  gap: 6px;
  font-weight: 600;
  color: #f1f5f9;
}
.flag-icon { color: #ef4444; }
.text-muted { color: #94a3b8; }
.font-medium { font-weight: 500; color: #e2e8f0; }

.location-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.location-name {
  font-weight: 500;
  color: #e2e8f0;
  font-size: 13px;
}
.location-sub {
  font-size: 11px;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.3px;
}

/* Badges */
.status-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.status-badge.good {
  background: #14532d;
  color: #4ade80;
  border: 1px solid #166534;
}
.status-badge.malfunction {
  background: #7f1d1d;
  color: #fca5a5;
  border: 1px solid #991b1b;
}
.status-badge.maintenance {
  background: #713f12;
  color: #fcd34d;
  border: 1px solid #92400e;
}

.avail-badge {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
}
.avail-badge.armoury {
  background: #1e2535;
  color: #94a3b8;
  border: 1px solid #2d3748;
}
.avail-badge.duty {
  background: #1e3a5f;
  color: #60a5fa;
  border: 1px solid #1d4ed8;
}

/* Pending Approvals */
.pending-section {
  margin-top: 4px;
}
.pending-header {
  margin-bottom: 20px;
}
.pending-title {
  font-size: 16px;
  font-weight: 700;
  color: #f1f5f9;
  margin: 0 0 4px;
}
.pending-subtitle {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}
.pending-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.pending-card {
  background: #161b27;
  border: 1px solid #f59e0b55;
  border-radius: 12px;
  padding: 20px 24px;
  transition: border-color 0.15s;
}
.pending-card:hover {
  border-color: #f59e0b99;
}
.pending-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.pending-card-title {
  display: flex;
  align-items: center;
  gap: 10px;
}
.pending-clock {
  color: #f59e0b;
  flex-shrink: 0;
}
.pending-gun-name {
  font-size: 15px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.2px;
}
.pending-status-tag {
  font-size: 11px;
  font-weight: 500;
  color: #94a3b8;
  background: #1e2535;
  border: 1px solid #2d3748;
  border-radius: 6px;
  padding: 3px 9px;
}
.review-btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.review-btn:hover { background: #2563eb; }
.pending-card-body {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 12px;
}
.pending-field {
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.field-label {
  font-size: 11.5px;
  color: #64748b;
  font-weight: 500;
}
.field-value {
  font-size: 13.5px;
  font-weight: 600;
  color: #e2e8f0;
}

.actions-cell {
  display: flex;
  align-items: center;
  gap: 6px;
}
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  padding: 5px;
  transition: all 0.15s;
  color: #64748b;
}
.action-btn:hover { background: #1e2535; }

.view-btn:hover { color: #94a3b8; }

.edit-btn {
  padding: 4px 10px;
  color: #94a3b8;
  font-size: 12.5px;
  font-weight: 500;
}
.edit-btn:hover { color: #e2e8f0; }
.edit-text { line-height: 1; }

.history-btn:hover { color: #94a3b8; }

.lock-btn.unlocked { color: #4ade80; }
.lock-btn.unlocked:hover { color: #22c55e; }
.lock-btn.locked { color: #ef4444; }
.lock-btn.locked:hover { color: #f87171; }

.alert-btn { color: #f97316; }
.alert-btn:hover { color: #fb923c; }
</style>