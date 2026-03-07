<template>
  <div class="reports-page">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Reports & Analytics</h1>
        <p class="page-subtitle">Generate comprehensive reports with customizable filters and export options</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Firearms</span>
          <span class="stat-value">10</span>
        </div>
        <div class="stat-icon blue">
          <ShieldCheck :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Malfunctioning</span>
          <span class="stat-value amber">1</span>
        </div>
        <div class="stat-icon amber">
          <Wrench :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Maintenance Due</span>
          <span class="stat-value orange">10</span>
        </div>
        <div class="stat-icon orange">
          <CalendarDays :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Ammo Requests</span>
          <span class="stat-value green">2</span>
        </div>
        <div class="stat-icon green">
          <Package :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Handovers</span>
          <span class="stat-value purple">8</span>
        </div>
        <div class="stat-icon purple">
          <Activity :size="22" />
        </div>
      </div>
    </div>

    <!-- Report Cards Grid -->
    <div class="reports-grid">
      <div v-for="report in reports" :key="report.id" class="report-card">
        <!-- Icon -->
        <div class="report-icon" :style="{ background: report.iconBg }">
          <component :is="report.icon" :size="22" color="white" />
        </div>

        <!-- Text -->
        <div class="report-text">
          <span class="report-name">{{ report.name }}</span>
          <span class="report-desc">{{ report.description }}</span>
        </div>

        <!-- Filters + Generate -->
        <div class="report-footer">
          <div class="report-filters">
            <button v-if="report.hasDateRange" class="filter-chip">
              <CalendarDays :size="12" />
              Date Range
            </button>
            <button class="filter-chip">
              <Filter :size="12" />
              Branch Filter
            </button>
          </div>
          <button class="generate-btn">
            <Download :size="13" />
            Generate
          </button>
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
import {
  ShieldCheck, Wrench, CalendarDays, Package, Activity,
  Filter, Download, Shield, Wrench as WrenchIcon, Box, BarChart2,
} from 'lucide-vue-next'

const reports = [
  {
    id: 1,
    name: 'Firearms Asset Register',
    description: 'Complete firearms inventory by location and status',
    icon: Shield,
    iconBg: '#3b82f6',
    hasDateRange: false,
  },
  {
    id: 2,
    name: 'Malfunction & Maintenance History',
    description: 'Firearms requiring maintenance and malfunction reports',
    icon: WrenchIcon,
    iconBg: '#ef4444',
    hasDateRange: true,
  },
  {
    id: 3,
    name: 'Ammunition Consumption & Discrepancy',
    description: 'Ammunition usage, transfers, and stock discrepancies',
    icon: Box,
    iconBg: '#22c55e',
    hasDateRange: true,
  },
  {
    id: 4,
    name: 'User Activity & Audit Logs',
    description: 'Complete audit trail - Who did what and when',
    icon: BarChart2,
    iconBg: '#a855f7',
    hasDateRange: true,
  },
]
</script>

<style scoped>
.reports-page {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}

/* Header */
.page-header { margin-bottom: 24px; }
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; margin: 0 0 4px; }
.page-subtitle { font-size: 13px; color: #64748b; margin: 0; }

/* Stats */
.stats-row {
  display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; margin-bottom: 24px;
}
.stat-card {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px;
  padding: 18px 20px; display: flex; align-items: center; justify-content: space-between;
}
.stat-info { display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 26px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-value.amber  { color: #fbbf24; }
.stat-value.orange { color: #f97316; }
.stat-value.green  { color: #22c55e; }
.stat-value.purple { color: #a855f7; }
.stat-icon {
  width: 44px; height: 44px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon.blue   { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.amber  { background: #78350f33; color: #fbbf24; border: 1.5px solid #d9770644; }
.stat-icon.orange { background: #7c2d1233; color: #f97316; border: 1.5px solid #f9731644; }
.stat-icon.green  { background: #14532d33; color: #22c55e; border: 1.5px solid #16a34a44; }
.stat-icon.purple { background: #3b076433; color: #a855f7; border: 1.5px solid #7e22ce44; }

/* Reports Grid */
.reports-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.report-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 14px;
  padding: 22px 24px;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  gap: 0 18px;
  transition: border-color 0.15s;
}
.report-card:hover { border-color: #2d3748; }

/* Icon */
.report-icon {
  width: 52px; height: 52px; border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0; grid-row: 1 / 2;
}

/* Text */
.report-text {
  display: flex; flex-direction: column; gap: 5px;
  grid-column: 2; grid-row: 1 / 2; justify-content: center;
}
.report-name { font-size: 15px; font-weight: 700; color: #f1f5f9; }
.report-desc { font-size: 12.5px; color: #64748b; line-height: 1.4; }

/* Footer */
.report-footer {
  grid-column: 1 / 3;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid #1e2535;
}
.report-filters { display: flex; gap: 8px; }
.filter-chip {
  display: flex; align-items: center; gap: 5px;
  background: transparent; border: 1px solid #2d3748;
  border-radius: 7px; padding: 6px 12px;
  font-size: 12px; font-weight: 500; color: #94a3b8;
  cursor: pointer; transition: all 0.15s; font-family: inherit;
}
.filter-chip:hover { border-color: #3b82f6; color: #e2e8f0; }

.generate-btn {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none; border-radius: 8px;
  padding: 8px 18px; font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit;
}
.generate-btn:hover { background: #2563eb; }
</style>