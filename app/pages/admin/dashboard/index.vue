<template>
  <div class="dashboard">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Dashboard</h1>
        <p class="page-subtitle">Organization-wide overview and monitoring · Branch-level operations and alerts · Armoury operations and maintenance tracking</p>
      </div>
    </div>

    <!-- Top Stats Row -->
    <div class="stats-row">
      <div class="stat-card stat-blue">
        <div class="stat-info">
          <span class="stat-label">Total Firearms</span>
          <span class="stat-value">10</span>
          <span class="stat-sub">Good: 9 · Malfunction: 1</span>
        </div>
        <ShieldCheck :size="32" class="stat-icon-img blue" />
      </div>
      <div class="stat-card stat-red">
        <div class="stat-info">
          <span class="stat-label">Malfunctioning Arms</span>
          <span class="stat-value red">1</span>
          <a href="#" class="stat-link red">View Details →</a>
        </div>
        <TriangleAlert :size="32" class="stat-icon-img red" />
      </div>
      <div class="stat-card stat-purple">
        <div class="stat-info">
          <span class="stat-label">Active Deployments</span>
          <span class="stat-value purple">3</span>
          <span class="stat-sub">Personnel on duty</span>
        </div>
        <MapPin :size="32" class="stat-icon-img purple" />
      </div>
      <div class="stat-card stat-orange">
        <div class="stat-info">
          <span class="stat-label">Ammo Variance Alerts</span>
          <span class="stat-value orange">2</span>
          <span class="stat-sub">Items in transit</span>
        </div>
        <Package :size="32" class="stat-icon-img orange" />
      </div>
    </div>

    <!-- Risk Heat Indicators -->
    <div class="risk-card">
      <div class="risk-header">
        <TriangleAlert :size="16" class="risk-icon" />
        <span class="risk-title">Risk Heat Indicators</span>
      </div>
      <div class="risk-grid">
        <div class="risk-item risk-orange">
          <Package :size="18" class="risk-item-icon orange" />
          <div class="risk-item-text">
            <div class="risk-item-title">
              Low Ammunition Stock
              <span class="risk-badge warning">WARNING</span>
            </div>
            <div class="risk-item-desc">7 ammunition type(s) below minimum threshold</div>
          </div>
        </div>
        <div class="risk-item risk-red">
          <Wrench :size="18" class="risk-item-icon red" />
          <div class="risk-item-text">
            <div class="risk-item-title">
              Maintenance Overdue
              <span class="risk-badge critical">CRITICAL</span>
            </div>
            <div class="risk-item-desc">10 firearm(s) require immediate maintenance</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Two-col: Branch Map + Out-of-Office -->
    <div class="two-col">
      <!-- Branch Locations -->
      <div class="col-card">
        <div class="col-title-row">
          <MapPin :size="15" class="col-title-icon" />
          <span class="col-title">Branch Locations & Risk Map</span>
        </div>
        <div class="branch-list">
          <div v-for="branch in branches" :key="branch.name" class="branch-card">
            <div class="branch-header">
              <div class="branch-name-row">
                <span class="branch-dot green"></span>
                <div>
                  <div class="branch-name">{{ branch.name }}</div>
                  <div class="branch-type">Branch</div>
                </div>
              </div>
              <span class="branch-active">{{ branch.active }} Active</span>
            </div>
            <div class="branch-stats">
              <div class="bstat">
                <span class="bstat-label">Total</span>
                <span class="bstat-val blue">{{ branch.total }}</span>
              </div>
              <div class="bstat">
                <span class="bstat-label">Available</span>
                <span class="bstat-val green">{{ branch.available }}</span>
              </div>
              <div class="bstat">
                <span class="bstat-label">On Duty</span>
                <span class="bstat-val purple">{{ branch.onDuty }}</span>
              </div>
              <div class="bstat">
                <span class="bstat-label">Issues</span>
                <span class="bstat-val" :class="branch.issues > 0 ? 'red' : 'green'">{{ branch.issues }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Out-of-Office Deployments -->
      <div class="col-card">
        <div class="col-title-row">
          <Users :size="15" class="col-title-icon" />
          <span class="col-title">Out-of-Office Deployments</span>
        </div>
        <div class="ooo-list">
          <div v-for="dep in outOfOffice" :key="dep.name" class="ooo-row">
            <div class="ooo-left">
              <span class="ooo-dot green"></span>
              <div>
                <div class="ooo-name">{{ dep.name }}</div>
                <div class="ooo-branch">{{ dep.branch }}</div>
              </div>
            </div>
            <div class="ooo-right">
              <div class="ooo-weapon">{{ dep.weapon }}</div>
              <div class="ooo-until">Until {{ dep.until }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Two-col: Charts -->
    <div class="two-col">
      <div class="col-card chart-card">
        <div class="col-title-row">
          <TrendingUp :size="15" class="col-title-icon" />
          <span class="col-title">Daily Activity Trends (Last 7 Days)</span>
        </div>
        <div class="chart-area">
          <svg viewBox="0 0 600 180" class="chart-svg">
            <defs>
              <pattern id="grid" width="85" height="45" patternUnits="userSpaceOnUse">
                <path d="M 85 0 L 0 0 0 45" fill="none" stroke="#1e2535" stroke-width="1"/>
              </pattern>
            </defs>
            <rect width="600" height="180" fill="url(#grid)" />
            <!-- Y axis labels -->
            <text x="8" y="20" fill="#475569" font-size="11">4</text>
            <text x="8" y="65" fill="#475569" font-size="11">3</text>
            <text x="8" y="110" fill="#475569" font-size="11">2</text>
            <text x="8" y="155" fill="#475569" font-size="11">1</text>
            <text x="8" y="175" fill="#475569" font-size="11">0</text>
            <!-- X axis labels -->
            <text x="28"  y="175" fill="#475569" font-size="10">Mar 1</text>
            <text x="113" y="175" fill="#475569" font-size="10">Mar 2</text>
            <text x="198" y="175" fill="#475569" font-size="10">Mar 3</text>
            <text x="283" y="175" fill="#475569" font-size="10">Mar 4</text>
            <text x="368" y="175" fill="#475569" font-size="10">Mar 5</text>
            <text x="453" y="175" fill="#475569" font-size="10">Mar 6</text>
            <text x="538" y="175" fill="#475569" font-size="10">Mar 7</text>
            <!-- Flat line at 0 (sample data) -->
            <polyline points="30,163 115,163 200,163 285,163 370,163 455,163 540,163" fill="none" stroke="#60a5fa" stroke-width="2" stroke-dasharray="4,2"/>
            <polyline points="30,163 115,163 200,163 285,163 370,163 455,163 540,163" fill="none" stroke="#4ade80" stroke-width="2" stroke-dasharray="4,2"/>
            <polyline points="30,163 115,163 200,163 285,163 370,163 455,163 540,163" fill="none" stroke="#f87171" stroke-width="2" stroke-dasharray="4,2"/>
            <!-- Dots -->
            <circle cx="30"  cy="163" r="3" fill="#60a5fa"/>
            <circle cx="115" cy="163" r="3" fill="#60a5fa"/>
            <circle cx="200" cy="163" r="3" fill="#60a5fa"/>
            <circle cx="285" cy="163" r="3" fill="#60a5fa"/>
            <circle cx="370" cy="163" r="3" fill="#60a5fa"/>
            <circle cx="455" cy="163" r="3" fill="#60a5fa"/>
            <circle cx="540" cy="163" r="3" fill="#60a5fa"/>
          </svg>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot" style="background:#60a5fa"></span>Handovers</span>
            <span class="legend-item"><span class="legend-dot" style="background:#4ade80"></span>Ammo Requests</span>
            <span class="legend-item"><span class="legend-dot" style="background:#f87171"></span>Incidents</span>
          </div>
        </div>
      </div>

      <div class="col-card chart-card">
        <div class="col-title-row">
          <Activity :size="15" class="col-title-icon" />
          <span class="col-title">Ammunition Usage Trend (4 Weeks)</span>
        </div>
        <div class="chart-area">
          <svg viewBox="0 0 600 180" class="chart-svg">
            <rect width="600" height="180" fill="url(#grid)" />
            <text x="8" y="20"  fill="#475569" font-size="11">4</text>
            <text x="8" y="65"  fill="#475569" font-size="11">3</text>
            <text x="8" y="110" fill="#475569" font-size="11">2</text>
            <text x="8" y="155" fill="#475569" font-size="11">1</text>
            <text x="8" y="175" fill="#475569" font-size="11">0</text>
            <text x="50"  y="175" fill="#475569" font-size="10">Week 1</text>
            <text x="200" y="175" fill="#475569" font-size="10">Week 2</text>
            <text x="350" y="175" fill="#475569" font-size="10">Week 3</text>
            <text x="490" y="175" fill="#475569" font-size="10">Week 4</text>
            <polyline points="75,163 225,163 375,163 525,163" fill="none" stroke="#3b82f6" stroke-width="2"/>
            <polyline points="75,163 225,163 375,163 525,163" fill="none" stroke="#22c55e" stroke-width="2"/>
            <polyline points="75,163 225,163 375,163 525,163" fill="none" stroke="#f59e0b" stroke-width="2"/>
          </svg>
          <div class="chart-legend">
            <span class="legend-item"><span class="legend-dot" style="background:#3b82f6"></span>Issued</span>
            <span class="legend-item"><span class="legend-dot" style="background:#22c55e"></span>Returned</span>
            <span class="legend-item"><span class="legend-dot" style="background:#f59e0b"></span>Consumed</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Firearms Status Distribution + Availability Status -->
    <div class="two-col">
      <!-- Pie Chart -->
      <div class="col-card">
        <span class="col-title" style="padding: 18px 20px 14px; display:block; border-bottom: 1px solid #1e2535;">Firearms Status Distribution</span>
        <div class="pie-area">
          <svg viewBox="0 0 200 200" class="pie-svg">
            <!-- 90% green slice -->
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#22c55e" stroke-width="70"
              stroke-dasharray="395.8 439.8" stroke-dashoffset="110" />
            <!-- 10% red slice -->
            <circle cx="100" cy="100" r="70" fill="transparent" stroke="#ef4444" stroke-width="70"
              stroke-dasharray="43.98 439.8" stroke-dashoffset="-285.8" />
            <circle cx="100" cy="100" r="34" fill="#161b27" />
          </svg>
          <div class="pie-labels">
            <div class="pie-label green-text">Good: 9 (90%)</div>
            <div class="pie-label red-text">Malfunction: 1 (10%)</div>
          </div>
        </div>
      </div>

      <!-- Availability Grid -->
      <div class="col-card">
        <span class="col-title" style="padding: 18px 20px 14px; display:block; border-bottom: 1px solid #1e2535;">Firearms by Availability Status</span>
        <div class="avail-grid">
          <div v-for="av in availability" :key="av.label" class="avail-card" :class="av.cls">
            <span class="avail-label">{{ av.label }}</span>
            <span class="avail-val" :class="av.valCls">{{ av.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Cards Row -->
    <div class="alert-row">
      <div class="alert-card alert-red">
        <div class="alert-info">
          <span class="alert-label">Late Return Alerts</span>
          <span class="alert-value red">4</span>
          <a href="#" class="alert-link red">Review Now →</a>
        </div>
        <Bell :size="30" class="alert-icon red" />
      </div>
      <div class="alert-card alert-orange">
        <div class="alert-info">
          <span class="alert-label">Low Ammo Stock</span>
          <span class="alert-value orange">7</span>
          <a href="#" class="alert-link orange">Check Stock →</a>
        </div>
        <Package :size="30" class="alert-icon orange" />
      </div>
      <div class="alert-card alert-blue">
        <div class="alert-info">
          <span class="alert-label">Today's Handovers</span>
          <span class="alert-value blue">0</span>
          <span class="alert-sub">Issued today</span>
        </div>
        <ShieldCheck :size="30" class="alert-icon blue" />
      </div>
      <div class="alert-card alert-green">
        <div class="alert-info">
          <span class="alert-label">Branch Availability</span>
          <span class="alert-value green">9</span>
          <span class="alert-sub">Arms available</span>
        </div>
        <Users :size="30" class="alert-icon green" />
      </div>
    </div>

    <!-- Branch Firearms Availability -->
    <div class="section-card">
      <h3 class="section-title">Branch Firearms Availability</h3>
      <div class="branch-avail-list">
        <div v-for="ba in branchAvailability" :key="ba.name" class="ba-row">
          <div class="ba-left">
            <span class="ba-name">{{ ba.name }}</span>
            <span class="ba-sub">{{ ba.available }} available / {{ ba.total }} total</span>
          </div>
          <div class="ba-right">
            <div class="ba-bar-wrap">
              <div class="ba-bar" :style="{ width: ba.pct + '%', background: ba.pct === 0 ? '#2d3748' : '#22c55e' }"></div>
            </div>
            <span class="ba-pct">{{ ba.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Alert Cards -->
    <div class="alert-row" style="margin-top: 16px;">
      <div class="alert-card alert-blue-dark">
        <div class="alert-info">
          <span class="alert-label">Pending OTP Handovers</span>
          <span class="alert-value blue">0</span>
          <a href="#" class="alert-link blue">Process Now →</a>
        </div>
        <Clock :size="30" class="alert-icon blue" />
      </div>
      <div class="alert-card alert-orange">
        <div class="alert-info">
          <span class="alert-label">Returns Due Today</span>
          <span class="alert-value orange">0</span>
          <span class="alert-sub">Expected returns</span>
        </div>
        <TrendingUp :size="30" class="alert-icon orange" />
      </div>
      <div class="alert-card alert-red">
        <div class="alert-info">
          <span class="alert-label">Maintenance Due</span>
          <span class="alert-value red">10</span>
          <a href="#" class="alert-link red">View Firearms →</a>
        </div>
        <Wrench :size="30" class="alert-icon red" />
      </div>
      <div class="alert-card alert-green">
        <div class="alert-info">
          <span class="alert-label">In Armoury</span>
          <span class="alert-value green">9</span>
          <span class="alert-sub">Available firearms</span>
        </div>
        <ShieldCheck :size="30" class="alert-icon green" />
      </div>
    </div>

    <!-- Action Items -->
    <div class="section-card" style="margin-top: 16px;">
      <div class="action-header">
        <TriangleAlert :size="15" class="action-header-icon" />
        <h3 class="section-title" style="margin:0;">Action Items</h3>
      </div>
      <div class="action-list">
        <div v-for="item in actionItems" :key="item.title" class="action-row">
          <div class="action-left">
            <div class="action-icon-wrap">
              <component :is="item.icon" :size="15" class="action-icon" />
            </div>
            <div>
              <div class="action-title">{{ item.title }}</div>
              <div class="action-desc">{{ item.desc }}</div>
            </div>
          </div>
          <button class="action-check-btn">Check</button>
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
  ShieldCheck, TriangleAlert, MapPin, Package, Wrench,
  Users, TrendingUp, Activity, Bell, Clock,
} from 'lucide-vue-next'

const branches = [
  { name: 'Dar es Salaam Sub-HQ', active: 3, total: 8, available: 7, onDuty: 1, issues: 0 },
  { name: 'Dodoma HQ',            active: 0, total: 1, available: 0, onDuty: 0, issues: 1 },
  { name: 'Zanzibar Sub-HQ',      active: 0, total: 1, available: 1, onDuty: 0, issues: 0 },
]

const outOfOffice = [
  { name: 'J. K. Sanga',  branch: 'Dar es Salaam Sub-HQ', weapon: 'BERETTA',       until: '07:00 AM' },
  { name: 'N. O. Mwinyi', branch: 'Dar es Salaam Sub-HQ', weapon: 'GLOCK 17',      until: '07:00 PM' },
  { name: 'P. Q. Hamisi', branch: 'Dar es Salaam Sub-HQ', weapon: 'SIG SAUER P226', until: '07:00 AM' },
]

const availability = [
  { label: 'In Armoury',  value: 9, cls: 'avail-green',  valCls: 'green' },
  { label: 'On Duty',     value: 1, cls: 'avail-blue',   valCls: 'blue' },
  { label: 'Maintenance', value: 0, cls: 'avail-orange', valCls: 'orange' },
  { label: 'In Transit',  value: 0, cls: 'avail-purple', valCls: 'purple' },
  { label: 'Lost',        value: 0, cls: 'avail-red',    valCls: 'red' },
  { label: 'Disposed',    value: 0, cls: 'avail-grey',   valCls: 'muted' },
]

const branchAvailability = [
  { name: 'Dar es Salaam Sub-HQ', available: 7, total: 8,  pct: 88 },
  { name: 'Dodoma HQ',            available: 0, total: 1,  pct: 0  },
  { name: 'Zanzibar Sub-HQ',      available: 1, total: 1,  pct: 100 },
]

const actionItems = [
  { title: 'Maintenance Required', desc: '10 firearm(s) need maintenance', icon: Wrench },
]
</script>

<style scoped>
.dashboard {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* Header */
.page-header { margin-bottom: 4px; }
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; margin: 0 0 4px; }
.page-subtitle { font-size: 12px; color: #475569; margin: 0; line-height: 1.5; }

/* Top stats */
.stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.stat-card {
  border-radius: 12px; padding: 20px 22px;
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid transparent;
}
.stat-blue   { background: #0f1829; border-color: #1e3a5f; }
.stat-red    { background: #1a0d0d; border-color: #7f1d1d55; }
.stat-purple { background: #130d1f; border-color: #3b076455; }
.stat-orange { background: #1a0e08; border-color: #7c2d1255; }
.stat-info { display: flex; flex-direction: column; gap: 5px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-value.red    { color: #ef4444; }
.stat-value.purple { color: #a855f7; }
.stat-value.orange { color: #f97316; }
.stat-sub  { font-size: 11.5px; color: #475569; }
.stat-link { font-size: 12px; font-weight: 600; text-decoration: none; }
.stat-link.red { color: #ef4444; }
.stat-icon-img { flex-shrink: 0; }
.stat-icon-img.blue   { color: #3b82f6; }
.stat-icon-img.red    { color: #ef4444; }
.stat-icon-img.purple { color: #a855f7; }
.stat-icon-img.orange { color: #f97316; }

/* Risk */
.risk-card {
  background: #161b27; border: 1px solid #f59e0b33;
  border-radius: 12px; padding: 16px 20px;
}
.risk-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.risk-icon { color: #f59e0b; }
.risk-title { font-size: 14px; font-weight: 600; color: #f1f5f9; }
.risk-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
.risk-item {
  display: flex; align-items: flex-start; gap: 12px;
  border-radius: 10px; padding: 14px 16px; border: 1px solid transparent;
}
.risk-orange { background: #1a1208; border-color: #f59e0b33; }
.risk-red    { background: #1a0d0d; border-color: #ef444433; }
.risk-item-icon { flex-shrink: 0; margin-top: 2px; }
.risk-item-icon.orange { color: #f97316; }
.risk-item-icon.red    { color: #ef4444; }
.risk-item-title {
  font-size: 13.5px; font-weight: 700; color: #f1f5f9;
  display: flex; align-items: center; gap: 8px; margin-bottom: 4px;
}
.risk-item-desc { font-size: 12px; color: #94a3b8; }
.risk-badge {
  font-size: 10px; font-weight: 700; padding: 2px 7px;
  border-radius: 4px; letter-spacing: 0.4px;
}
.risk-badge.warning  { background: #713f12; color: #fb923c; border: 1px solid #92400e; }
.risk-badge.critical { background: #7f1d1d; color: #fca5a5; border: 1px solid #991b1b; }

/* Two-col */
.two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.col-card {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px; overflow: hidden;
}
.col-title-row {
  display: flex; align-items: center; gap: 8px;
  padding: 16px 20px; border-bottom: 1px solid #1e2535;
}
.col-title-icon { color: #64748b; }
.col-title { font-size: 14px; font-weight: 600; color: #f1f5f9; }

/* Branches */
.branch-list { padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.branch-card {
  background: #1a2030; border: 1px solid #1e2535; border-radius: 10px; padding: 14px 16px;
}
.branch-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 12px; }
.branch-name-row { display: flex; align-items: flex-start; gap: 10px; }
.branch-dot { width: 9px; height: 9px; border-radius: 50%; margin-top: 4px; flex-shrink: 0; }
.branch-dot.green { background: #22c55e; box-shadow: 0 0 6px #22c55e66; }
.branch-name { font-size: 13.5px; font-weight: 700; color: #f1f5f9; }
.branch-type { font-size: 11px; color: #475569; }
.branch-active { font-size: 12px; color: #64748b; font-weight: 500; white-space: nowrap; }
.branch-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
.bstat {
  background: #0f1117; border: 1px solid #1e2535; border-radius: 7px;
  padding: 8px 10px; display: flex; flex-direction: column; gap: 4px; align-items: center;
}
.bstat-label { font-size: 10.5px; color: #475569; font-weight: 500; }
.bstat-val { font-size: 18px; font-weight: 700; }
.bstat-val.blue   { color: #60a5fa; }
.bstat-val.green  { color: #4ade80; }
.bstat-val.purple { color: #c084fc; }
.bstat-val.red    { color: #f87171; }

/* Out-of-office */
.ooo-list { padding: 10px 12px; display: flex; flex-direction: column; gap: 8px; }
.ooo-row {
  display: flex; align-items: center; justify-content: space-between;
  background: #1a2030; border: 1px solid #1e2535;
  border-radius: 8px; padding: 12px 16px;
}
.ooo-left  { display: flex; align-items: center; gap: 10px; }
.ooo-dot   { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.ooo-dot.green { background: #22c55e; }
.ooo-name   { font-size: 13.5px; font-weight: 600; color: #f1f5f9; }
.ooo-branch { font-size: 11.5px; color: #475569; }
.ooo-right  { text-align: right; }
.ooo-weapon { font-size: 12px; font-weight: 600; color: #94a3b8; }
.ooo-until  { font-size: 11px; color: #475569; }

/* Charts */
.chart-card { display: flex; flex-direction: column; }
.chart-area { padding: 16px 20px 12px; flex: 1; }
.chart-svg { width: 100%; height: 160px; }
.chart-legend { display: flex; gap: 20px; justify-content: center; margin-top: 8px; }
.legend-item { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #64748b; }
.legend-dot { width: 10px; height: 10px; border-radius: 2px; flex-shrink: 0; }

/* Pie */
.pie-area { padding: 20px; display: flex; align-items: center; gap: 24px; justify-content: center; }
.pie-svg { width: 160px; height: 160px; transform: rotate(-90deg); flex-shrink: 0; }
.pie-labels { display: flex; flex-direction: column; gap: 10px; }
.pie-label { font-size: 13px; font-weight: 600; }
.green-text { color: #4ade80; }
.red-text   { color: #f87171; }

/* Availability grid */
.avail-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; padding: 14px; }
.avail-card {
  border-radius: 8px; padding: 14px 16px;
  display: flex; flex-direction: column; gap: 6px; border: 1px solid transparent;
}
.avail-green  { background: #0a1f1344; border-color: #16653444; }
.avail-blue   { background: #0f182944; border-color: #1e3a5f44; }
.avail-orange { background: #1a0e0844; border-color: #7c2d1244; }
.avail-purple { background: #13091f44; border-color: #3b076444; }
.avail-red    { background: #1a0d0d44; border-color: #7f1d1d44; }
.avail-grey   { background: #1e253544; border-color: #2d374844; }
.avail-label  { font-size: 12px; color: #64748b; font-weight: 500; }
.avail-val { font-size: 22px; font-weight: 700; }
.avail-val.green  { color: #4ade80; }
.avail-val.blue   { color: #60a5fa; }
.avail-val.orange { color: #fb923c; }
.avail-val.purple { color: #c084fc; }
.avail-val.red    { color: #f87171; }
.avail-val.muted  { color: #64748b; }

/* Alert row */
.alert-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 14px; }
.alert-card {
  border-radius: 12px; padding: 18px 20px;
  display: flex; align-items: center; justify-content: space-between;
  border: 1px solid transparent;
}
.alert-red      { background: #1a0d0d; border-color: #7f1d1d55; }
.alert-orange   { background: #1a0e08; border-color: #7c2d1255; }
.alert-blue     { background: #0f1829; border-color: #1e3a5f55; }
.alert-blue-dark { background: #0f1829; border-color: #1e3a5f55; }
.alert-green    { background: #0a1208; border-color: #14532d55; }
.alert-info { display: flex; flex-direction: column; gap: 5px; }
.alert-label { font-size: 12px; color: #64748b; font-weight: 500; }
.alert-value { font-size: 28px; font-weight: 700; line-height: 1; }
.alert-value.red    { color: #ef4444; }
.alert-value.orange { color: #f97316; }
.alert-value.blue   { color: #60a5fa; }
.alert-value.green  { color: #4ade80; }
.alert-sub  { font-size: 11.5px; color: #475569; }
.alert-link { font-size: 12px; font-weight: 600; text-decoration: none; }
.alert-link.red    { color: #ef4444; }
.alert-link.orange { color: #f97316; }
.alert-link.blue   { color: #60a5fa; }
.alert-icon { flex-shrink: 0; }
.alert-icon.red    { color: #ef4444; }
.alert-icon.orange { color: #f97316; }
.alert-icon.blue   { color: #60a5fa; }
.alert-icon.green  { color: #4ade80; }

/* Section card */
.section-card {
  background: #161b27; border: 1px solid #1e2535; border-radius: 12px; padding: 18px 22px;
}
.section-title { font-size: 14px; font-weight: 600; color: #f1f5f9; margin: 0 0 16px; }

/* Branch availability bars */
.branch-avail-list { display: flex; flex-direction: column; gap: 10px; }
.ba-row {
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  padding: 12px 16px; background: #1a2030; border: 1px solid #1e2535; border-radius: 8px;
}
.ba-left { display: flex; flex-direction: column; gap: 3px; }
.ba-name { font-size: 13.5px; font-weight: 600; color: #f1f5f9; }
.ba-sub  { font-size: 11.5px; color: #475569; }
.ba-right { display: flex; align-items: center; gap: 12px; flex: 1; justify-content: flex-end; }
.ba-bar-wrap { width: 200px; height: 6px; background: #1e2535; border-radius: 3px; overflow: hidden; }
.ba-bar { height: 100%; border-radius: 3px; transition: width 0.3s; }
.ba-pct { font-size: 12px; font-weight: 600; color: #64748b; min-width: 36px; text-align: right; }

/* Action items */
.action-header { display: flex; align-items: center; gap: 8px; margin-bottom: 14px; }
.action-header-icon { color: #f59e0b; }
.action-list { display: flex; flex-direction: column; gap: 8px; }
.action-row {
  display: flex; align-items: center; justify-content: space-between;
  background: #1a0d0d; border: 1px solid #7f1d1d44; border-radius: 8px; padding: 14px 18px;
}
.action-left { display: flex; align-items: center; gap: 12px; }
.action-icon-wrap {
  width: 32px; height: 32px; background: #7f1d1d33; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.action-icon { color: #ef4444; }
.action-title { font-size: 13.5px; font-weight: 600; color: #f1f5f9; }
.action-desc  { font-size: 12px; color: #94a3b8; }
.action-check-btn {
  background: transparent; border: none; color: #94a3b8;
  font-size: 13px; font-weight: 600; cursor: pointer;
  font-family: inherit; transition: color 0.15s; padding: 6px 10px;
}
.action-check-btn:hover { color: #e2e8f0; }
</style>