<template>
  <div class="security-devices">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Security Devices & Fire Brigades</h1>
        <p class="page-subtitle">Register and track non-firearms security equipment</p>
      </div>
      <button class="btn-primary">
        <Plus :size="14" />
        Add Device
      </button>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Devices</span>
          <span class="stat-value">{{ totalDevices }}</span>
        </div>
        <div class="stat-icon blue">
          <Database :size="24" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Good Condition</span>
          <span class="stat-value">{{ goodCount }}</span>
        </div>
        <div class="stat-icon green">
          <CircleCheck :size="24" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Malfunction</span>
          <span class="stat-value">{{ malfunctionCount }}</span>
        </div>
        <div class="stat-icon red">
          <TriangleAlert :size="24" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Under Maintenance</span>
          <span class="stat-value">{{ maintenanceCount }}</span>
        </div>
        <div class="stat-icon yellow">
          <ShieldAlert :size="24" />
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
          placeholder="Search by name, ID, or type..."
          class="search-input"
        />
      </div>
      <select v-model="selectedBranch" class="filter-select">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
      <select v-model="selectedStatus" class="filter-select">
        <option value="">All Statuses</option>
        <option value="GOOD">Good</option>
        <option value="MALFUNCTION">Malfunction</option>
        <option value="MAINTENANCE">Under Maintenance</option>
      </select>
    </div>

    <!-- Devices List -->
    <div class="devices-card">
      <h3 class="devices-title">Security Devices ({{ filteredDevices.length }})</h3>

      <div
        v-for="(device, index) in filteredDevices"
        :key="device.id"
        class="device-row"
        :class="{ 'no-border': index === filteredDevices.length - 1 }"
      >
        <!-- Device Name -->
        <div class="device-field" style="flex: 1.4">
          <span class="field-label">Device Name</span>
          <span class="device-name">{{ device.name }}</span>
          <span class="device-id">{{ device.id }}</span>
        </div>

        <!-- Type -->
        <div class="device-field" style="flex: 1">
          <span class="field-label">Type</span>
          <span class="type-tag">{{ device.type }}</span>
        </div>

        <!-- Use -->
        <div class="device-field" style="flex: 1.2">
          <span class="field-label">Use</span>
          <span class="field-value">{{ device.use }}</span>
        </div>

        <!-- Branch -->
        <div class="device-field" style="flex: 1">
          <span class="field-label">Branch</span>
          <span class="field-value fw">{{ device.branch }}</span>
        </div>

        <!-- Status -->
        <div class="device-field" style="flex: 0.7">
          <span class="field-label">Status</span>
          <span class="status-badge" :class="statusClass(device.status)">{{ device.status }}</span>
        </div>

        <!-- Next Inspection -->
        <div class="device-field" style="flex: 1">
          <span class="field-label">Next Inspection</span>
          <span class="inspection-date">{{ device.nextInspection }}</span>
          <span class="due-tag" :class="dueSeverity(device.daysUntil)">
            Due in {{ device.daysUntil }} days
          </span>
        </div>

        <!-- Actions -->
        <div class="device-actions">
          <button class="action-icon" title="Edit">
            <PenSquare :size="15" />
          </button>
          <button class="record-btn">Record Inspection</button>
        </div>
      </div>

      <div v-if="filteredDevices.length === 0" class="empty-state">
        No devices found.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Plus, Search, Database, CircleCheck, TriangleAlert, ShieldAlert, PenSquare } from 'lucide-vue-next'

interface Device {
  id: string
  name: string
  type: string
  use: string
  branch: string
  status: 'GOOD' | 'MALFUNCTION' | 'MAINTENANCE'
  nextInspection: string
  daysUntil: number
}

const searchQuery = ref('')
const selectedBranch = ref('')
const selectedStatus = ref('')

const branches = [
  'Dar es Salaam Sub-HQ',
  'Dodoma HQ',
  'Zanzibar Sub-HQ',
  'Mwanza Branch',
  'Mtwara Branch',
  'Mbeya Branch',
]

const devices = ref<Device[]>([
  { id: 'WTMD-DSM-001', name: 'Walk-Through Metal Detector', type: 'Metal Detector', use: 'Entrance Security Screening', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', nextInspection: '1/20/2025', daysUntil: -410 },
  { id: 'XRAY-DSM-001', name: 'X-Ray Baggage Scanner', type: 'X-Ray Scanner', use: 'Baggage and Package Screening', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', nextInspection: '1/18/2025', daysUntil: -412 },
  { id: 'CCTV-DSM-001', name: 'CCTV Camera - Main Entrance', type: 'CCTV Camera', use: 'Main Entrance Surveillance', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', nextInspection: '2/15/2025', daysUntil: -384 },
  { id: 'FEXT-DSM-001', name: 'Fire Extinguisher - CO2 Type', type: 'Fire Safety Equipment', use: 'Fire Suppression - Main Entrance', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', nextInspection: '3/10/2025', daysUntil: -361 },
  { id: 'ALRM-DSM-001', name: 'Fire Alarm System', type: 'Fire Safety Equipment', use: 'Building Fire Detection', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', nextInspection: '4/5/2025', daysUntil: -335 },
  { id: 'HAND-DSM-001', name: 'Handheld Metal Detector', type: 'Metal Detector', use: 'Personnel Screening', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', nextInspection: '5/1/2025', daysUntil: -309 },
  { id: 'CCTV-DOD-001', name: 'CCTV Camera - Perimeter', type: 'CCTV Camera', use: 'Perimeter Surveillance', branch: 'Dodoma HQ', status: 'GOOD', nextInspection: '6/15/2025', daysUntil: -264 },
  { id: 'WTMD-DOD-001', name: 'Walk-Through Metal Detector', type: 'Metal Detector', use: 'Entrance Security Screening', branch: 'Dodoma HQ', status: 'GOOD', nextInspection: '7/20/2025', daysUntil: -229 },
  { id: 'FEXT-DOD-001', name: 'Fire Extinguisher - Dry Powder', type: 'Fire Safety Equipment', use: 'Fire Suppression - Server Room', branch: 'Dodoma HQ', status: 'MAINTENANCE', nextInspection: '8/10/2025', daysUntil: -208 },
  { id: 'XRAY-ZNZ-001', name: 'X-Ray Baggage Scanner', type: 'X-Ray Scanner', use: 'Baggage Screening', branch: 'Zanzibar Sub-HQ', status: 'GOOD', nextInspection: '9/5/2025', daysUntil: -182 },
  { id: 'CCTV-ZNZ-001', name: 'CCTV Camera - Main Gate', type: 'CCTV Camera', use: 'Gate Surveillance', branch: 'Zanzibar Sub-HQ', status: 'GOOD', nextInspection: '10/1/2025', daysUntil: -156 },
])

const filteredDevices = computed(() =>
  devices.value.filter(d => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch = !q || d.name.toLowerCase().includes(q) || d.id.toLowerCase().includes(q) || d.type.toLowerCase().includes(q)
    const matchBranch = !selectedBranch.value || d.branch === selectedBranch.value
    const matchStatus = !selectedStatus.value || d.status === selectedStatus.value
    return matchSearch && matchBranch && matchStatus
  })
)

const totalDevices = computed(() => devices.value.length)
const goodCount = computed(() => devices.value.filter(d => d.status === 'GOOD').length)
const malfunctionCount = computed(() => devices.value.filter(d => d.status === 'MALFUNCTION').length)
const maintenanceCount = computed(() => devices.value.filter(d => d.status === 'MAINTENANCE').length)

function statusClass(status: string) {
  if (status === 'GOOD') return 'badge-good'
  if (status === 'MALFUNCTION') return 'badge-malfunction'
  if (status === 'MAINTENANCE') return 'badge-maintenance'
  return ''
}

function dueSeverity(days: number) {
  if (days < -180) return 'due-overdue'
  if (days < 0) return 'due-soon'
  return 'due-ok'
}
</script>

<style scoped>
.security-devices {
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
  margin-bottom: 24px;
}
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; margin: 0 0 4px; }
.page-subtitle { font-size: 13px; color: #64748b; margin: 0; }
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 9px 16px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit;
}
.btn-primary:hover { background: #2563eb; }

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.stat-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stat-info { display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon.blue   { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.green  { background: #14532d33; color: #22c55e; border: 1.5px solid #16a34a44; }
.stat-icon.red    { background: #7f1d1d33; color: #ef4444; border: 1.5px solid #ef444444; }
.stat-icon.yellow { background: #71390033; color: #eab308; border: 1.5px solid #ca8a0444; }

/* Filter Bar */
.filter-bar {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}
.search-wrap { position: relative; flex: 1; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; }
.search-input {
  width: 100%; background: #0f1117; border: 1px solid #1e2535;
  border-radius: 8px; padding: 8px 12px 8px 34px;
  font-size: 13px; color: #e2e8f0; outline: none;
  transition: border-color 0.15s; box-sizing: border-box; font-family: inherit;
}
.search-input::placeholder { color: #475569; }
.search-input:focus { border-color: #3b82f6; }
.filter-select {
  flex: 1; background: #0f1117; border: 1px solid #1e2535;
  border-radius: 8px; padding: 8px 32px 8px 12px;
  font-size: 13px; color: #e2e8f0; outline: none; cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  font-family: inherit; min-width: 160px;
}
.filter-select:focus { border-color: #3b82f6; }

/* Devices Card */
.devices-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  overflow: hidden;
}
.devices-title {
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  padding: 18px 22px 16px;
  margin: 0;
  border-bottom: 1px solid #1e2535;
}

/* Device Row */
.device-row {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 18px 22px;
  border-bottom: 1px solid #1a2030;
  transition: background 0.1s;
}
.device-row:hover { background: #1a2030; }
.device-row.no-border { border-bottom: none; }

.device-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  min-width: 0;
}
.field-label {
  font-size: 11px;
  color: #475569;
  font-weight: 500;
}
.field-value {
  font-size: 13px;
  color: #94a3b8;
}
.field-value.fw {
  font-weight: 600;
  color: #e2e8f0;
}
.device-name {
  font-size: 14px;
  font-weight: 700;
  color: #f1f5f9;
  line-height: 1.3;
}
.device-id {
  font-size: 11px;
  color: #475569;
  font-family: 'JetBrains Mono', monospace;
  letter-spacing: 0.3px;
}
.type-tag {
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  color: #94a3b8;
  background: #1e2535;
  border: 1px solid #2d3748;
  border-radius: 5px;
  padding: 3px 9px;
  width: fit-content;
}

/* Status badges */
.status-badge {
  display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  width: fit-content;
}
.badge-good        { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.badge-malfunction { background: #7f1d1d; color: #fca5a5; border: 1px solid #991b1b; }
.badge-maintenance { background: #713f12; color: #fcd34d; border: 1px solid #92400e; }

/* Inspection */
.inspection-date {
  font-size: 13.5px;
  font-weight: 600;
  color: #e2e8f0;
}
.due-tag {
  display: inline-flex; align-items: center;
  font-size: 11px; font-weight: 600;
  border-radius: 5px; padding: 3px 8px;
  width: fit-content;
}
.due-overdue { background: #FF690033; color: #FF8904; border: 1px solid #92400e; }
.due-soon    { background: #713f12; color: #fb923c; border: 1px solid #92400e; }
.due-ok      { background: #14532d; color: #4ade80; border: 1px solid #166534; }

/* Actions */
.device-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  margin-left: auto;
}
.action-icon {
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-radius: 6px;
  padding: 6px; cursor: pointer; color: #64748b;
  transition: all 0.15s;
}
.action-icon:hover { background: #1e2535; color: #94a3b8; }
.record-btn {
  background: transparent; border: none;
  color: #94a3b8; font-size: 13px; font-weight: 500;
  cursor: pointer; padding: 6px 2px; font-family: inherit;
  transition: color 0.15s; white-space: nowrap;
}
.record-btn:hover { color: #e2e8f0; }

.empty-state {
  padding: 48px; text-align: center; color: #475569; font-size: 13px;
}
</style>