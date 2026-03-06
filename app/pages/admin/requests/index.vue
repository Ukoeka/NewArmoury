<template>
  <div class="ammo-requests">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Ammunition Requests</h1>
        <p class="page-subtitle">Manage ammunition transfers between branches and armouries</p>
      </div>
      <button class="btn-primary">
        <Plus :size="14" />
        New Request
      </button>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Requests</span>
          <span class="stat-value">{{ totalRequests }}</span>
        </div>
        <div class="stat-icon blue">
          <FileText :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">New</span>
          <span class="stat-value">{{ newCount }}</span>
        </div>
        <div class="stat-icon indigo">
          <Clock :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Verified</span>
          <span class="stat-value">{{ verifiedCount }}</span>
        </div>
        <div class="stat-icon purple">
          <CircleCheck :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">In Transit</span>
          <span class="stat-value">{{ transitCount }}</span>
        </div>
        <div class="stat-icon orange">
          <Truck :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Completed</span>
          <span class="stat-value">{{ completedCount }}</span>
        </div>
        <div class="stat-icon green">
          <CircleCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Pending Requests -->
    <div class="pending-card">
      <div class="pending-header">
        <Clock :size="15" class="pending-icon" />
        <span class="pending-title">Pending Requests ({{ pendingRequests.length }})</span>
      </div>

      <div
        v-for="req in pendingRequests"
        :key="req.id"
        class="pending-row"
      >
        <div class="req-field">
          <span class="field-label">Request Type</span>
          <span class="type-tag">{{ req.type }}</span>
        </div>
        <div class="req-field">
          <span class="field-label">From</span>
          <span class="field-value fw">{{ req.from }}</span>
        </div>
        <div class="req-field">
          <span class="field-label">To</span>
          <span class="field-value fw">{{ req.to }}</span>
        </div>
        <div class="req-field">
          <span class="field-label">Items</span>
          <span class="field-value">{{ req.items }}</span>
        </div>
        <div class="req-field">
          <span class="field-label">Status</span>
          <span class="status-badge" :class="statusClass(req.status)">{{ req.status }}</span>
        </div>
        <div class="req-field">
          <span class="field-label">Created</span>
          <span class="field-value">{{ req.created }}</span>
        </div>
        <div class="req-actions">
          <button class="verify-btn">Verify</button>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <select v-model="selectedStatus" class="filter-select">
        <option value="">All Statuses</option>
        <option value="NEW">New</option>
        <option value="APPROVED">Approved</option>
        <option value="VERIFIED">Verified</option>
        <option value="IN_TRANSIT">In Transit</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select v-model="selectedType" class="filter-select">
        <option value="">All Types</option>
        <option value="BRANCH_TO_BRANCH">Branch to Branch</option>
        <option value="BRANCH_TO_HQ">Branch to HQ</option>
        <option value="HQ_TO_BRANCH">HQ to Branch</option>
      </select>
    </div>

    <!-- All Requests -->
    <div class="requests-card">
      <h3 class="requests-title">All Requests ({{ filteredRequests.length }})</h3>

      <div
        v-for="(req, index) in filteredRequests"
        :key="req.id"
        class="request-row"
        :class="{ 'no-border': index === filteredRequests.length - 1 }"
      >
        <div class="req-field" style="flex: 0.8">
          <span class="field-label">Request ID</span>
          <span class="field-value fw mono">{{ req.id }}</span>
        </div>
        <div class="req-field" style="flex: 1.1">
          <span class="field-label">Type</span>
          <span class="type-tag">{{ req.type }}</span>
        </div>
        <div class="req-field" style="flex: 1.4">
          <span class="field-label">From → To</span>
          <span class="field-value">{{ req.from }} → {{ req.to }}</span>
        </div>
        <div class="req-field" style="flex: 0.8">
          <span class="field-label">Items</span>
          <span class="field-value">{{ req.items }}</span>
        </div>
        <div class="req-field" style="flex: 0.8">
          <span class="field-label">Status</span>
          <span class="status-badge" :class="statusClass(req.status)">{{ req.status }}</span>
        </div>
        <div class="req-field" style="flex: 0.8">
          <span class="field-label">Created</span>
          <span class="field-value">{{ req.created }}</span>
        </div>
      </div>

      <div v-if="filteredRequests.length === 0" class="empty-state">
        No requests found.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Plus, Clock, FileText, CircleCheck, Truck } from 'lucide-vue-next'

interface AmmoRequest {
  id: string
  type: string
  from: string
  to: string
  items: string
  status: string
  created: string
}

const selectedStatus = ref('')
const selectedType = ref('')

const requests = ref<AmmoRequest[]>([
  { id: 'ar-001', type: 'BRANCH_TO_BRANCH', from: 'Mwanza Branch',        to: 'Dodoma HQ', items: '1 type(s)', status: 'NEW',      created: '12/24/2024' },
  { id: 'ar-002', type: 'BRANCH_TO_HQ',     from: 'Dar es Salaam Sub-HQ', to: 'Dodoma HQ', items: '2 type(s)', status: 'APPROVED', created: '12/20/2024' },
])

const pendingRequests = computed(() =>
  requests.value.filter(r => r.status === 'NEW' || r.status === 'VERIFIED')
)

const filteredRequests = computed(() =>
  requests.value.filter(r => {
    const matchStatus = !selectedStatus.value || r.status === selectedStatus.value
    const matchType   = !selectedType.value   || r.type   === selectedType.value
    return matchStatus && matchType
  })
)

const totalRequests  = computed(() => requests.value.length)
const newCount       = computed(() => requests.value.filter(r => r.status === 'NEW').length)
const verifiedCount  = computed(() => requests.value.filter(r => r.status === 'VERIFIED').length)
const transitCount   = computed(() => requests.value.filter(r => r.status === 'IN_TRANSIT').length)
const completedCount = computed(() => requests.value.filter(r => r.status === 'COMPLETED').length)

function statusClass(status: string) {
  if (status === 'NEW')        return 'badge-new'
  if (status === 'APPROVED')   return 'badge-approved'
  if (status === 'VERIFIED')   return 'badge-verified'
  if (status === 'IN_TRANSIT') return 'badge-transit'
  if (status === 'COMPLETED')  return 'badge-completed'
  return ''
}
</script>

<style scoped>
.ammo-requests {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}

/* Header */
.page-header {
  display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px;
}
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; margin: 0 0 4px; }
.page-subtitle { font-size: 13px; color: #64748b; margin: 0; }
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none; border-radius: 8px;
  padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit; white-space: nowrap;
}
.btn-primary:hover { background: #2563eb; }

/* Stats — 5 columns */
.stats-row {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 20px;
}
.stat-card {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px;
  padding: 18px 20px; display: flex; align-items: center; justify-content: space-between;
}
.stat-info { display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 26px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon.blue   { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.indigo { background: #1e1b4b33; color: #818cf8; border: 1.5px solid #4338ca44; }
.stat-icon.purple { background: #3b076433; color: '#c084fc'; color: #c084fc; border: 1.5px solid #7e22ce44; }
.stat-icon.orange { background: #7c2d1233; color: #f97316; border: 1.5px solid #f9731644; }
.stat-icon.green  { background: #14532d33; color: #22c55e; border: 1.5px solid #16a34a44; }

/* Pending Card */
.pending-card {
  background: #161b27; border: 1px solid #3b82f644;;
  border-radius: 12px; overflow: hidden; margin-bottom: 16px;
  padding: 15px;
}
.pending-header {
  display: flex; align-items: center; gap: 8px;
  padding: 16px 22px;
}
.pending-icon { color: #f59e0b; }
.pending-title { font-size: 14px; font-weight: 600; color: #f1f5f9; }

.pending-row {
  display: flex; align-items: center; gap: 20px;
  padding: 18px 22px; 
  background: #7E2A0C33;
  border-radius: 15px;
  justify-content: space-between;
}
.pending-row:last-child { border-bottom: none; }
.pending-row:hover { background: #1f1610; }

/* Filter Bar */
.filter-bar {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px;
  padding: 14px 18px; display: flex; gap: 12px; margin-bottom: 16px;
}
.filter-select {
  flex: 1; background: #0f1117; border: 1px solid #1e2535; border-radius: 8px;
  padding: 8px 32px 8px 12px; font-size: 13px; color: #e2e8f0; outline: none; cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center; font-family: inherit;
}
.filter-select:focus { border-color: #3b82f6; }

/* Requests Card */
.requests-card {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px; overflow: hidden;
}
.requests-title {
  font-size: 14px; font-weight: 600; color: #f1f5f9;
  padding: 16px 22px; margin: 0; border-bottom: 1px solid #1e2535;
}

/* Shared row fields */
.req-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.field-label { font-size: 11px; color: #475569; font-weight: 500; }
.field-value { font-size: 13px; color: #94a3b8; }
.field-value.fw { font-weight: 600; color: #e2e8f0; }
.field-value.mono { font-family: 'JetBrains Mono', monospace; font-size: 12.5px; }

.type-tag {
  display: inline-flex; align-items: center;
  font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
  color: #94a3b8; background: #1e2535; border: 1px solid #2d3748;
  border-radius: 5px; padding: 3px 8px; width: fit-content;
}

/* Status badges */
.status-badge {
  display: inline-flex; align-items: center; padding: 4px 10px;
  border-radius: 6px; font-size: 11px; font-weight: 700;
  letter-spacing: 0.4px; width: fit-content;
}
.badge-new       { background: #1e2535;  color: #94a3b8; border: 1px solid #2d3748; }
.badge-approved  { background: #1e3a5f;  color: #60a5fa; border: 1px solid #1d4ed8; }
.badge-verified  { background: '#3b0764'; background: #3b0764; color: #c084fc; border: 1px solid #7e22ce; }
.badge-transit   { background: #7c2d12;  color: #fb923c; border: 1px solid #9a3412; }
.badge-completed { background: #14532d;  color: #4ade80; border: 1px solid #166534; }

/* Request row */
.request-row {
  display: flex; align-items: center; gap: 20px;
  padding: 16px 22px; border-bottom: 1px solid #1a2030; transition: background 0.1s;
}
.request-row:hover { background: #1a2030; }
.request-row.no-border { border-bottom: none; }

/* Verify btn */
.req-actions { flex-shrink: 0; }
.verify-btn {
  background: #3b82f6; color: #fff; border: none; border-radius: 7px;
  padding: 7px 18px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit;
}
.verify-btn:hover { background: #2563eb; }

.empty-state {
  padding: 48px; text-align: center; color: #475569; font-size: 13px;
}
</style>