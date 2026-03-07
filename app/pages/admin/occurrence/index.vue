<template>
  <div class="occurrence-page">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Occurrence Book & Inspections</h1>
        <p class="page-subtitle">Log security incidents and guard post inspections</p>
      </div>
      <div class="header-btns">
        <button class="btn-secondary">
          <Plus :size="14" />
          Add Occurrence
        </button>
        <button class="btn-primary">
          <Plus :size="14" />
          Add Inspection
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Occurrences</span>
          <span class="stat-value">{{ occurrences.length }}</span>
        </div>
        <div class="stat-icon orange">
          <TriangleAlert :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Security Issues</span>
          <span class="stat-value">{{ securityIssues }}</span>
        </div>
        <div class="stat-icon red">
          <TriangleAlert :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Inspections</span>
          <span class="stat-value">{{ inspections.length }}</span>
        </div>
        <div class="stat-icon blue">
          <CircleCheck :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">OK Status</span>
          <span class="stat-value">{{ okInspections }}</span>
        </div>
        <div class="stat-icon green">
          <CircleCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="two-col">

      <!-- LEFT: Recent Occurrences -->
      <div class="col-card">
        <h3 class="col-title">Recent Occurrences ({{ occurrences.length }})</h3>
        <div class="scroll-list">
          <div
            v-for="occ in occurrences"
            :key="occ.id"
            class="occ-card"
            :class="typeCardClass(occ.type)"
          >
            <div class="occ-card-top">
              <span class="occ-type-badge" :class="typeBadgeClass(occ.type)">{{ occ.type }}</span>
              <span class="occ-time">{{ occ.time }}</span>
            </div>
            <div class="occ-category">{{ occ.category }}</div>
            <p class="occ-desc">{{ occ.description }}</p>
            <div class="occ-meta">Reported by: {{ occ.reportedBy }} | {{ occ.reportedAt }}</div>

            <!-- BISO Response (if present) -->
            <div v-if="occ.bisoResponse" class="biso-response">
              <span class="biso-response-label">BISO Response:</span>
              <span class="biso-response-text">{{ occ.bisoResponse }}</span>
            </div>

            <button class="add-biso-btn">Add BISO Response</button>
          </div>
        </div>
      </div>

      <!-- RIGHT: Inspection Reports -->
      <div class="col-card">
        <h3 class="col-title">Inspection Reports ({{ inspections.length }})</h3>
        <div class="scroll-list">
          <div
            v-for="insp in inspections"
            :key="insp.id"
            class="insp-card"
            :class="insp.status === 'NOT_OK' ? 'insp-not-ok' : ''"
          >
            <div class="insp-card-top">
              <span class="insp-type-badge" :class="inspTypeBadgeClass(insp.type)">{{ insp.type }}</span>
              <span class="occ-time">{{ insp.date }}</span>
            </div>
            <span class="insp-status-badge" :class="insp.status === 'OK' ? 'status-ok' : 'status-not-ok'">
              Status: {{ insp.status }}
            </span>

            <div class="insp-section">
              <span class="insp-section-label">Findings:</span>
              <span class="insp-section-text">{{ insp.findings }}</span>
            </div>
            <div class="insp-section">
              <span class="insp-section-label">Recommendations:</span>
              <span class="insp-section-text">{{ insp.recommendations }}</span>
            </div>

            <div class="insp-meta">Inspected by: {{ insp.inspectedBy }}</div>

            <!-- BISO Instructions (if present) -->
            <div v-if="insp.bisoInstructions" class="biso-instructions">
              <span class="biso-instr-label">BISO Instructions:</span>
              <span class="biso-instr-text">{{ insp.bisoInstructions }}</span>
            </div>

            <button class="add-biso-btn">Add BISO Instructions</button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Role Permissions',
  layout: 'admin-layout',
});

import { ref, computed } from 'vue'
import { Plus, TriangleAlert, CircleCheck } from 'lucide-vue-next'

interface Occurrence {
  id: number
  type: 'PLANNED_SHIFT' | 'EMERGENCY' | 'UNPLANNED'
  category: string
  description: string
  reportedBy: string
  reportedAt: string
  time: string
  bisoResponse?: string
}

interface Inspection {
  id: number
  type: 'ROUTINE' | 'SURPRISE' | 'QUARTERLY'
  status: 'OK' | 'NOT_OK'
  findings: string
  recommendations: string
  inspectedBy: string
  date: string
  bisoInstructions?: string
}

const occurrences = ref<Occurrence[]>([
  {
    id: 1,
    type: 'PLANNED_SHIFT',
    category: 'ROUTINE',
    description: 'Routine shift change completed. All firearms accounted for.',
    reportedBy: 'F. G. Massawe',
    reportedAt: '12/20/2024, 9:35:00 AM',
    time: '08:30',
  },
  {
    id: 2,
    type: 'PLANNED_SHIFT',
    category: 'EQUIPMENT ISSUE',
    description: 'Metal detector malfunction at main entrance. Maintenance team notified.',
    reportedBy: 'J. K. Sanga',
    reportedAt: '12/21/2024, 3:20:00 PM',
    time: '14:15',
  },
  {
    id: 3,
    type: 'EMERGENCY',
    category: 'SECURITY ISSUE',
    description: 'Unauthorized access attempt at Server Room. Individual identified and escorted out.',
    reportedBy: 'J. K. Sanga',
    reportedAt: '12/22/2024, 12:10:00 PM',
    time: '11:00',
    bisoResponse: 'Incident reviewed. Security protocols reinforced. All staff briefed on access control procedures.',
  },
])

const inspections = ref<Inspection[]>([
  {
    id: 1,
    type: 'ROUTINE',
    status: 'OK',
    findings: 'All firearms in good condition. Ammunition stock levels adequate. No discrepancies found.',
    recommendations: 'Continue monthly inspections. Consider upgrading older pistols.',
    inspectedBy: 'A. B. Kimaro',
    date: '12/15/2024',
  },
  {
    id: 2,
    type: 'SURPRISE',
    status: 'NOT_OK',
    findings: 'Minor discrepancy in ammunition count for 9mm rounds. 5 rounds unaccounted for.',
    recommendations: 'Conduct thorough audit. Review handover procedures.',
    inspectedBy: 'A. B. Kimaro',
    date: '12/18/2024',
    bisoInstructions: 'Initiate full audit of ammunition inventory. Submit detailed report within 48 hours.',
  },
  {
    id: 3,
    type: 'QUARTERLY',
    status: 'OK',
    findings: 'Overall armoury security excellent. All protocols being followed correctly.',
    recommendations: 'Maintain current standards. Commendation for armoury staff.',
    inspectedBy: 'J. K. Mwamba',
    date: '12/1/2024',
  },
])

const securityIssues = computed(() => occurrences.value.filter(o => o.category === 'SECURITY ISSUE').length)
const okInspections  = computed(() => inspections.value.filter(i => i.status === 'OK').length)

function typeCardClass(type: string) {
  if (type === 'EMERGENCY') return 'occ-card--emergency'
  return ''
}
function typeBadgeClass(type: string) {
  if (type === 'PLANNED_SHIFT') return 'badge-planned'
  if (type === 'EMERGENCY')     return 'badge-emergency'
  return 'badge-unplanned'
}
function inspTypeBadgeClass(type: string) {
  if (type === 'ROUTINE')   return 'insp-badge-routine'
  if (type === 'SURPRISE')  return 'insp-badge-surprise'
  if (type === 'QUARTERLY') return 'insp-badge-quarterly'
  return ''
}
</script>

<style scoped>
.occurrence-page {
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
.header-btns { display: flex; gap: 10px; }
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none; border-radius: 8px;
  padding: 9px 16px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit;
}
.btn-primary:hover { background: #2563eb; }
.btn-secondary {
  display: flex; align-items: center; gap: 6px;
  background: transparent; color: #94a3b8; border: 1px solid #2d3748;
  border-radius: 8px; padding: 9px 16px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.15s; font-family: inherit;
}
.btn-secondary:hover { border-color: #3b82f6; color: #e2e8f0; }

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
.stat-icon.orange { background: #7c2d1233; color: #f97316; border: 1.5px solid #f9731644; }
.stat-icon.red    { background: #7f1d1d33; color: #ef4444; border: 1.5px solid #ef444444; }
.stat-icon.blue   { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.green  { background: #14532d33; color: #22c55e; border: 1.5px solid #16a34a44; }

/* Two-col */
.two-col {
  display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
}
.col-card {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; overflow: hidden; display: flex; flex-direction: column;
}
.col-title {
  font-size: 14px; font-weight: 600; color: #f1f5f9;
  padding: 16px 20px; margin: 0; border-bottom: 1px solid #1e2535; flex-shrink: 0;
}
.scroll-list {
  padding: 14px 14px; overflow-y: auto;
  display: flex; flex-direction: column; gap: 12px;
  max-height: 620px;
}

/* Occurrence Cards */
.occ-card {
  background: #1a2030; border: 1px solid #1e2535;
  border-left: 3px solid #3b82f6;
  border-radius: 10px; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 8px;
}
.occ-card--emergency {
  border-left: 3px solid #ef4444;
}
.occ-card-top {
  display: flex; align-items: center; justify-content: space-between;
}
.occ-type-badge {
  display: inline-flex; align-items: center; padding: 3px 9px;
  border-radius: 5px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px;
}
.badge-planned   { background: #1e3a5f; color: #60a5fa; border: 1px solid #1d4ed8; }
.badge-emergency { background: transparent; color: #ef4444; border: none; font-size: 12px; padding: 0; }
.badge-unplanned { background: #713f12; color: #fb923c; border: 1px solid #92400e; }
.occ-time { font-size: 11.5px; color: #475569; }
.occ-category { font-size: 12px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.4px; }
.occ-desc { font-size: 13px; color: #e2e8f0; line-height: 1.5; margin: 0; }
.occ-meta { font-size: 11.5px; color: #475569; }

/* BISO Response */
.biso-response {
  background: #0D542B33; border: 1px solid #166534;
  border-radius: 7px; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 3px;
}
.biso-response-label { font-size: 11.5px; font-weight: 700; color: #4ade80; }
.biso-response-text  { font-size: 12.5px; color: #86efac; line-height: 1.4; }

.add-biso-btn {
  background: #2B7FFF1A; border: none; color: #60a5fa;
  font-size: 12.5px; font-weight: 600; cursor: pointer;
  padding: 10px 10px; font-family: inherit; text-align: left;
  transition: color 0.15s; width: fit-content;
}
.add-biso-btn:hover { color: #93c5fd; }

/* Inspection Cards */
.insp-card {
  background: #1a2030; border: 1px solid #1e2535;
  border-radius: 10px; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 8px;
}
.insp-not-ok {
   border-color: #ef444433;
}
.insp-card-top {
  display: flex; align-items: center; justify-content: space-between;
}
.insp-type-badge {
  display: inline-flex; align-items: center; padding: 3px 9px;
  border-radius: 5px; font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px;
}
.insp-badge-routine   { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.insp-badge-surprise  { background: #7f1d1d; color: #fca5a5; border: 1px solid #991b1b; }
.insp-badge-quarterly { background: #14532d; color: #4ade80; border: 1px solid #166534; }

.insp-status-badge {
  display: inline-flex; align-items: center; padding: 3px 10px;
  border-radius: 5px; font-size: 11px; font-weight: 700; width: fit-content;
}
.status-ok     { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.status-not-ok { background: #7f1d1d; color: #fca5a5; border: 1px solid #991b1b; }

.insp-section { display: flex; flex-direction: column; gap: 2px; }
.insp-section-label { font-size: 12.5px; font-weight: 700; color: #e2e8f0; }
.insp-section-text  { font-size: 12.5px; color: #94a3b8; line-height: 1.45; }
.insp-meta { font-size: 11.5px; color: #475569; }

/* BISO Instructions */
.biso-instructions {
  background: #0f1829; border: 1px solid #1d4ed8;
  border-radius: 7px; padding: 10px 12px;
  display: flex; flex-direction: column; gap: 3px;
}
.biso-instr-label { font-size: 11.5px; font-weight: 700; color: #60a5fa; }
.biso-instr-text  { font-size: 12.5px; color: #93c5fd; line-height: 1.4; }
</style>