<template>
  <div class="deployment-page">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Security Personnel Deployment</h1>
        <p class="page-subtitle">Plan and manage security personnel duty rosters</p>
      </div>
      <button class="btn-primary">
        <Plus :size="14" />
        Schedule Deployment
      </button>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Deployments</span>
          <span class="stat-value">{{ totalDeployments }}</span>
        </div>
        <div class="stat-icon blue">
          <CalendarDays :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Scheduled</span>
          <span class="stat-value">{{ scheduledCount }}</span>
        </div>
        <div class="stat-icon orange">
          <Clock :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Active Now</span>
          <span class="stat-value">{{ activeCount }}</span>
        </div>
        <div class="stat-icon green">
          <ShieldCheck :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Completed</span>
          <span class="stat-value">{{ completedCount }}</span>
        </div>
        <div class="stat-icon grey">
          <CircleCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="search-wrap">
        <Search :size="14" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by SP name or file number..."
          class="search-input"
        />
      </div>
      <select v-model="selectedStatus" class="filter-select">
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="SCHEDULED">Scheduled</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select v-model="selectedBranch" class="filter-select">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <!-- View Filter Tabs -->
    <div class="view-tabs">
      <button
        v-for="vt in viewTabs"
        :key="vt.id"
        class="view-tab"
        :class="{ active: activeView === vt.id }"
        @click="activeView = vt.id"
      >
        <component :is="vt.icon" :size="13" />
        {{ vt.label }}
      </button>
    </div>

    <!-- Deployments List -->
    <div class="deployments-list">
      <div
        v-for="(dep, index) in filteredDeployments"
        :key="dep.id"
        class="deployment-row"
        :class="{ 'no-border': index === filteredDeployments.length - 1 }"
      >
        <!-- Security Personnel -->
        <div class="dep-field" style="flex: 1.1">
          <span class="field-label">Security Personnel</span>
          <span class="dep-name">{{ dep.personnel }}</span>
        </div>

        <!-- Duty -->
        <div class="dep-field" style="flex: 1.2">
          <span class="field-label">Duty</span>
          <span class="field-value">{{ dep.duty }}</span>
        </div>

        <!-- Scheduled Start -->
        <div class="dep-field" style="flex: 1.2">
          <span class="field-label">Scheduled Start</span>
          <span class="field-value">{{ dep.start }}</span>
        </div>

        <!-- Scheduled End -->
        <div class="dep-field" style="flex: 1.2">
          <span class="field-label">Scheduled End</span>
          <span class="field-value">{{ dep.end }}</span>
        </div>

        <!-- Status -->
        <div class="dep-field" style="flex: 0.7">
          <span class="field-label">Status</span>
          <span class="status-badge" :class="statusClass(dep.status)">{{ dep.status }}</span>
        </div>

        <!-- Branch -->
        <div class="dep-field" style="flex: 1.1">
          <span class="field-label">Branch</span>
          <span class="field-value fw">{{ dep.branch }}</span>
        </div>

        <!-- Actions -->
        <div class="dep-actions">
          <!-- ACTIVE row: Complete button only -->
          <template v-if="dep.status === 'ACTIVE'">
            <button class="complete-btn">
              <CircleCheck :size="14" />
              Complete
            </button>
          </template>
          <!-- SCHEDULED row: Start + Edit + Assign + Cancel icons -->
          <template v-if="dep.status === 'SCHEDULED'">
            <button class="start-btn">
              <CirclePlay :size="14" />
              Start
            </button>
            <button class="icon-btn" title="Edit"><PenSquare :size="14" /></button>
            <button class="icon-btn" title="Reassign"><UserPlus :size="14" /></button>
            <button class="icon-btn danger" title="Cancel"><CircleX :size="14" /></button>
          </template>
          <!-- COMPLETED row: no actions -->
        </div>
      </div>

      <div v-if="filteredDeployments.length === 0" class="empty-state">
        No deployments found.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import {
  Plus, Search, CalendarDays, Clock, ShieldCheck, CircleCheck,
  CirclePlay, PenSquare, UserPlus, CircleX,
} from 'lucide-vue-next'

interface Deployment {
  id: number
  personnel: string
  duty: string
  start: string
  end: string
  status: 'ACTIVE' | 'SCHEDULED' | 'COMPLETED'
  branch: string
}

const searchQuery = ref('')
const selectedStatus = ref('')
const selectedBranch = ref('')
const activeView = ref('all')

const branches = ['Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch']

const viewTabs = [
  { id: 'all',      label: 'All Deployments (5)', icon: CalendarDays },
  { id: 'active',   label: 'Active (3)',           icon: CircleCheck },
  { id: 'upcoming', label: 'Upcoming (2)',          icon: Clock },
]

const deployments = ref<Deployment[]>([
  { id: 1, personnel: 'J. K. Sanga',    duty: 'Night shift - Main Entrance', start: '12/24/2024, 7:00:00 PM', end: '12/25/2024, 7:00:00 AM', status: 'ACTIVE',    branch: 'Dar es Salaam Sub-HQ' },
  { id: 2, personnel: 'L. M. Mbwana',   duty: 'Day shift - Server Room',     start: '12/24/2024, 7:00:00 AM', end: '12/24/2024, 7:00:00 PM', status: 'SCHEDULED', branch: 'Dar es Salaam Sub-HQ' },
  { id: 3, personnel: 'N. O. Mwinyi',   duty: 'Night shift - Main Entrance', start: '12/25/2024, 7:00:00 AM', end: '12/25/2024, 7:00:00 PM', status: 'ACTIVE',    branch: 'Dar es Salaam Sub-HQ' },
  { id: 4, personnel: 'P. Q. Hamisi',   duty: 'Day shift - Server Room',     start: '12/25/2024, 7:00:00 PM', end: '12/26/2024, 7:00:00 AM', status: 'ACTIVE',    branch: 'Dar es Salaam Sub-HQ' },
  { id: 5, personnel: 'M. T. Mwakyusa', duty: 'Night shift - Main Entrance', start: '12/26/2024, 7:00:00 PM', end: '12/26/2024, 7:00:00 PM', status: 'SCHEDULED', branch: 'Dar es Salaam Sub-HQ' },
])

const filteredDeployments = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return deployments.value.filter(d => {
    const matchSearch = !q || d.personnel.toLowerCase().includes(q)
    const matchStatus = !selectedStatus.value || d.status === selectedStatus.value
    const matchBranch = !selectedBranch.value || d.branch === selectedBranch.value
    const matchView =
      activeView.value === 'all' ||
      (activeView.value === 'active' && d.status === 'ACTIVE') ||
      (activeView.value === 'upcoming' && d.status === 'SCHEDULED')
    return matchSearch && matchStatus && matchBranch && matchView
  })
})

const totalDeployments = computed(() => deployments.value.length)
const scheduledCount   = computed(() => deployments.value.filter(d => d.status === 'SCHEDULED').length)
const activeCount      = computed(() => deployments.value.filter(d => d.status === 'ACTIVE').length)
const completedCount   = computed(() => deployments.value.filter(d => d.status === 'COMPLETED').length)

function statusClass(status: string) {
  if (status === 'ACTIVE')    return 'badge-active'
  if (status === 'SCHEDULED') return 'badge-scheduled'
  if (status === 'COMPLETED') return 'badge-completed'
  return ''
}
</script>

<style scoped>
.deployment-page {
  padding: 24px 32px;
  background: #0A0E1A;
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

/* Stats */
.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px;
}
.stat-card {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px;
  padding: 20px 22px; display: flex; align-items: center; justify-content: space-between;
}
.stat-info { display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon.blue   { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.orange { background: #7c2d1233; color: #f97316; border: 1.5px solid #f9731644; }
.stat-icon.green  { background: #14532d33; color: #22c55e; border: 1.5px solid #16a34a44; }
.stat-icon.grey   { background: #1e253533; color: #64748b; border: 1.5px solid #2d374844; }

/* Filter Bar */
.filter-bar {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px;
  padding: 14px 18px; display: flex; gap: 12px; align-items: center; margin-bottom: 16px;
}
.search-wrap { position: relative; flex: 1; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; }
.search-input {
  width: 100%; background: #0A0E1A; border: 1px solid #1e2535; border-radius: 8px;
  padding: 8px 12px 8px 34px; font-size: 13px; color: #e2e8f0; outline: none;
  transition: border-color 0.15s; box-sizing: border-box; font-family: inherit;
}
.search-input::placeholder { color: #475569; }
.search-input:focus { border-color: #3b82f6; }
.filter-select {
  flex: 1; background: #0A0E1A; border: 1px solid #1e2535; border-radius: 8px;
  padding: 8px 32px 8px 12px; font-size: 13px; color: #e2e8f0; outline: none; cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  font-family: inherit; min-width: 150px;
}
.filter-select:focus { border-color: #3b82f6; }

/* View Tabs */
.view-tabs {
  display: flex; gap: 8px; margin-bottom: 16px;
}
.view-tab {
  display: flex; align-items: center; gap: 7px;
  padding: 8px 16px; background: #161b27; border: 1px solid #1e2535;
  border-radius: 8px; color: #64748b; font-size: 13px; font-weight: 500;
  cursor: pointer; transition: all 0.15s; font-family: inherit; white-space: nowrap;
}
.view-tab:hover { color: #94a3b8; border-color: #2d3748; }
.view-tab.active { background: #1e2535; border-color: #3b82f6; color: #e2e8f0; font-weight: 600; }

/* Deployments List */
.deployments-list {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px; overflow: hidden;
}
.deployment-row {
  display: flex; align-items: center; gap: 16px;
  padding: 18px 22px; border-bottom: 1px solid #1a2030; transition: background 0.1s;
}
.deployment-row:hover { background: #1a2030; }
.deployment-row.no-border { border-bottom: none; }

.dep-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.field-label { font-size: 11px; color: #475569; font-weight: 500; }
.field-value { font-size: 13px; color: #94a3b8; }
.field-value.fw { font-weight: 600; color: #e2e8f0; }
.dep-name { font-size: 14px; font-weight: 700; color: #f1f5f9; }

/* Status Badges */
.status-badge {
  display: inline-flex; align-items: center; padding: 4px 10px;
  border-radius: 6px; font-size: 11px; font-weight: 700;
  letter-spacing: 0.4px; width: fit-content;
}
.badge-active    { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.badge-scheduled { background: #1e3a5f; color: #60a5fa; border: 1px solid #1d4ed8; }
.badge-completed { background: #1e2535; color: #64748b; border: 1px solid #2d3748; }

/* Actions */
.dep-actions {
  display: flex; align-items: center; gap: 8px;
  margin-left: auto; flex-shrink: 0;
}
.complete-btn {
  display: flex; align-items: center; gap: 6px;
  background: transparent; border: none; color: #94a3b8;
  font-size: 13px; font-weight: 500; cursor: pointer;
  padding: 6px 4px; border-radius: 6px; transition: all 0.15s; font-family: inherit;
}
.complete-btn:hover { color: #e2e8f0; background: #1e2535; padding: 6px 10px; }

.start-btn {
  display: flex; align-items: center; gap: 6px;
  background: transparent; border: none; color: #94a3b8;
  font-size: 13px; font-weight: 500; cursor: pointer;
  padding: 6px 4px; border-radius: 6px; transition: all 0.15s; font-family: inherit;
}
.start-btn:hover { color: #e2e8f0; background: #1e2535; padding: 6px 10px; }

.icon-btn {
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-radius: 6px;
  padding: 6px; cursor: pointer; color: #64748b; transition: all 0.15s;
}
.icon-btn:hover { background: #1e2535; color: #94a3b8; }
.icon-btn.danger:hover { background: #7f1d1d22; color: #f87171; }

.empty-state {
  padding: 48px; text-align: center; color: #475569; font-size: 13px;
}
</style>