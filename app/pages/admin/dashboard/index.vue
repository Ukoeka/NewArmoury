<template>
  <div class="p-8 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans flex flex-col gap-4">

    <!-- Page Header -->
    <div>
      <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Dashboard</h1>
      <p class="text-[20px] text-slate-500 leading-relaxed">Organization-wide overview and monitoring · Branch-level operations and alerts · Armoury operations and maintenance tracking</p>
    </div>

    <!-- Top Stats Row -->
    <div class="grid grid-cols-4 gap-3.5">
      <div class="bg-[#0f1829] border border-[#1e3a5f] rounded-xl px-5 py-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Total Firearms</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">10</span>
          <span class="text-[11.5px] text-slate-500">Good: 9 · Malfunction: 1</span>
        </div>
        <ShieldCheck :size="32" class="text-blue-500 flex-shrink-0" />
      </div>
      <div class="bg-[#1a0d0d] border border-red-900/35 rounded-xl px-5 py-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Malfunctioning Arms</span>
          <span class="text-[28px] font-bold text-red-500 leading-none">1</span>
          <NuxtLink to="/admin/arms-register" class="text-[12px] font-semibold text-red-500 no-underline hover:text-red-400">View Details →</NuxtLink>
        </div>
        <TriangleAlert :size="32" class="text-red-500 flex-shrink-0" />
      </div>
      <div class="bg-[#130d1f] border border-purple-900/35 rounded-xl px-5 py-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Active Deployments</span>
          <span class="text-[28px] font-bold text-purple-400 leading-none">3</span>
          <span class="text-[11.5px] text-slate-500">Personnel on duty</span>
        </div>
        <MapPin :size="32" class="text-purple-400 flex-shrink-0" />
      </div>
      <div class="bg-[#1a0e08] border border-orange-900/35 rounded-xl px-5 py-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Ammo Variance Alerts</span>
          <span class="text-[28px] font-bold text-orange-500 leading-none">2</span>
          <span class="text-[11.5px] text-slate-500">Items in transit</span>
        </div>
        <Package :size="32" class="text-orange-500 flex-shrink-0" />
      </div>
    </div>

    <!-- Risk Heat Indicators -->
    <div class="bg-[#161b27] border border-amber-500/20 rounded-xl px-5 py-4">
      <div class="flex items-center gap-2 mb-3.5">
        <TriangleAlert :size="16" class="text-amber-500" />
        <span class="text-[14px] font-semibold text-slate-100">Risk Heat Indicators</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="flex items-start gap-3 bg-[#1a1208] border border-amber-500/20 rounded-[10px] px-4 py-3.5">
          <Package :size="18" class="text-orange-500 flex-shrink-0 mt-0.5" />
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[13.5px] font-bold text-slate-100">Low Ammunition Stock</span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-950/70 text-amber-400 border border-amber-700/50 tracking-wide">WARNING</span>
            </div>
            <span class="text-[12px] text-slate-400">7 ammunition type(s) below minimum threshold</span>
          </div>
        </div>
        <div class="flex items-start gap-3 bg-[#1a0d0d] border border-red-500/25 rounded-[10px] px-4 py-3.5">
          <Wrench :size="18" class="text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="text-[13.5px] font-bold text-slate-100">Maintenance Overdue</span>
              <span class="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-950/70 text-red-400 border border-red-700/50 tracking-wide">CRITICAL</span>
            </div>
            <span class="text-[12px] text-slate-400">10 firearm(s) require immediate maintenance</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Branch Map + Out-of-Office -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-5 py-4 border-b border-[#1e2535]">
          <MapPin :size="15" class="text-slate-500" />
          <span class="text-[14px] font-semibold text-slate-100">Branch Locations & Risk Map</span>
        </div>
        <div class="p-3 flex flex-col gap-2.5">
          <div v-for="branch in branches" :key="branch.name" class="bg-[#1a2030] border border-[#1e2535] rounded-[10px] px-4 py-3.5">
            <div class="flex items-start justify-between mb-3">
              <div class="flex items-start gap-2.5">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1 flex-shrink-0" style="box-shadow:0 0 6px #22c55e66"></span>
                <div>
                  <div class="text-[13.5px] font-bold text-slate-100">{{ branch.name }}</div>
                  <div class="text-[11px] text-slate-500">Branch</div>
                </div>
              </div>
              <span class="text-[12px] text-slate-500 font-medium whitespace-nowrap">{{ branch.active }} Active</span>
            </div>
            <div class="grid grid-cols-4 gap-2">
              <div class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-2.5 py-2 flex flex-col items-center gap-1">
                <span class="text-[10.5px] text-slate-500 font-medium">Total</span>
                <span class="text-[18px] font-bold text-blue-400 leading-none">{{ branch.total }}</span>
              </div>
              <div class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-2.5 py-2 flex flex-col items-center gap-1">
                <span class="text-[10.5px] text-slate-500 font-medium">Available</span>
                <span class="text-[18px] font-bold text-emerald-400 leading-none">{{ branch.available }}</span>
              </div>
              <div class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-2.5 py-2 flex flex-col items-center gap-1">
                <span class="text-[10.5px] text-slate-500 font-medium">On Duty</span>
                <span class="text-[18px] font-bold text-purple-400 leading-none">{{ branch.onDuty }}</span>
              </div>
              <div class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-2.5 py-2 flex flex-col items-center gap-1">
                <span class="text-[10.5px] text-slate-500 font-medium">Issues</span>
                <span class="text-[18px] font-bold leading-none" :class="branch.issues > 0 ? 'text-red-400' : 'text-emerald-400'">{{ branch.issues }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-5 py-4 border-b border-[#1e2535]">
          <Users :size="15" class="text-slate-500" />
          <span class="text-[14px] font-semibold text-slate-100">Out-of-Office Deployments</span>
        </div>
        <div class="p-3 flex flex-col gap-2">
          <div v-for="dep in outOfOffice" :key="dep.name" class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-lg px-4 py-3">
            <div class="flex items-center gap-2.5">
              <span class="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <div>
                <div class="text-[13.5px] font-semibold text-slate-100">{{ dep.name }}</div>
                <div class="text-[11.5px] text-slate-500">{{ dep.branch }}</div>
              </div>
            </div>
            <div class="text-right">
              <div class="text-[12px] font-semibold text-slate-400">{{ dep.weapon }}</div>
              <div class="text-[11px] text-slate-500">Until {{ dep.until }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-5 py-4 border-b border-[#1e2535]">
          <TrendingUp :size="15" class="text-slate-500" />
          <span class="text-[14px] font-semibold text-slate-100">Daily Activity Trends (Last 7 Days)</span>
        </div>
        <div class="px-5 pt-4 pb-3">
          <apexchart type="line" height="160" :options="activityChartOptions" :series="activitySeries" />
          <div class="flex gap-5 justify-center mt-1">
            <span class="flex items-center gap-1.5 text-[12px] text-slate-500"><span class="w-2.5 h-2.5 rounded-sm inline-block" style="background:#60a5fa"></span>Handovers</span>
            <span class="flex items-center gap-1.5 text-[12px] text-slate-500"><span class="w-2.5 h-2.5 rounded-sm inline-block" style="background:#4ade80"></span>Ammo Requests</span>
            <span class="flex items-center gap-1.5 text-[12px] text-slate-500"><span class="w-2.5 h-2.5 rounded-sm inline-block" style="background:#f87171"></span>Incidents</span>
          </div>
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="flex items-center gap-2 px-5 py-4 border-b border-[#1e2535]">
          <Activity :size="15" class="text-slate-500" />
          <span class="text-[14px] font-semibold text-slate-100">Ammunition Usage Trend (4 Weeks)</span>
        </div>
        <div class="px-5 pt-4 pb-3">
          <apexchart type="line" height="160" :options="ammoChartOptions" :series="ammoSeries" />
          <div class="flex gap-5 justify-center mt-1">
            <span class="flex items-center gap-1.5 text-[12px] text-slate-500"><span class="w-2.5 h-2.5 rounded-sm inline-block" style="background:#3b82f6"></span>Issued</span>
            <span class="flex items-center gap-1.5 text-[12px] text-slate-500"><span class="w-2.5 h-2.5 rounded-sm inline-block" style="background:#22c55e"></span>Returned</span>
            <span class="flex items-center gap-1.5 text-[12px] text-slate-500"><span class="w-2.5 h-2.5 rounded-sm inline-block" style="background:#f59e0b"></span>Consumed</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Status Distribution + Availability -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="text-[14px] font-semibold text-slate-100 px-5 py-4 border-b border-[#1e2535]">Firearms Status Distribution</div>
        <div class="px-5 py-4 flex items-center justify-center gap-8">
          <apexchart type="donut" width="190" :options="donutOptions" :series="donutSeries" />
          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></span>
              <span class="text-[13px] font-semibold text-emerald-400">Good: 9 (90%)</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500 flex-shrink-0"></span>
              <span class="text-[13px] font-semibold text-red-400">Malfunction: 1 (10%)</span>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="text-[14px] font-semibold text-slate-100 px-5 py-4 border-b border-[#1e2535]">Firearms by Availability Status</div>
        <div class="grid grid-cols-3 gap-2.5 p-3.5">
          <div
            v-for="av in availability" :key="av.label"
            class="rounded-lg px-4 py-3.5 flex flex-col gap-1.5 border"
            :class="{
              'bg-emerald-950/25 border-emerald-900/25': av.color === 'green',
              'bg-blue-950/25 border-blue-900/25': av.color === 'blue',
              'bg-orange-950/25 border-orange-900/25': av.color === 'orange',
              'bg-purple-950/25 border-purple-900/25': av.color === 'purple',
              'bg-red-950/25 border-red-900/25': av.color === 'red',
              'bg-slate-800/25 border-slate-700/25': av.color === 'grey',
            }"
          >
            <span class="text-[12px] text-slate-500 font-medium">{{ av.label }}</span>
            <span class="text-[22px] font-bold leading-none"
              :class="{
                'text-emerald-400': av.color === 'green',
                'text-blue-400': av.color === 'blue',
                'text-orange-400': av.color === 'orange',
                'text-purple-400': av.color === 'purple',
                'text-red-400': av.color === 'red',
                'text-slate-500': av.color === 'grey',
              }"
            >{{ av.value }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Cards Row 1 -->
    <div class="grid grid-cols-4 gap-3.5">
      <div class="bg-[#1a0d0d] border border-red-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Late Return Alerts</span>
          <span class="text-[28px] font-bold text-red-500 leading-none">4</span>
          <a href="#" class="text-[12px] font-semibold text-red-500 no-underline hover:text-red-400">Review Now →</a>
        </div>
        <Bell :size="30" class="text-red-500 flex-shrink-0" />
      </div>
      <div class="bg-[#1a0e08] border border-orange-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Low Ammo Stock</span>
          <span class="text-[28px] font-bold text-orange-500 leading-none">7</span>
          <a href="#" class="text-[12px] font-semibold text-orange-500 no-underline hover:text-orange-400">Check Stock →</a>
        </div>
        <Package :size="30" class="text-orange-500 flex-shrink-0" />
      </div>
      <div class="bg-[#0f1829] border border-blue-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Today's Handovers</span>
          <span class="text-[28px] font-bold text-blue-400 leading-none">0</span>
          <span class="text-[11.5px] text-slate-500">Issued today</span>
        </div>
        <ShieldCheck :size="30" class="text-blue-400 flex-shrink-0" />
      </div>
      <div class="bg-[#0a1208] border border-emerald-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Branch Availability</span>
          <span class="text-[28px] font-bold text-emerald-400 leading-none">9</span>
          <span class="text-[11.5px] text-slate-500">Arms available</span>
        </div>
        <Users :size="30" class="text-emerald-400 flex-shrink-0" />
      </div>
    </div>

    <!-- Branch Firearms Availability -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4">
      <h3 class="text-[14px] font-semibold text-slate-100 mb-4 m-0">Branch Firearms Availability</h3>
      <div class="flex flex-col gap-2.5">
        <div v-for="ba in branchAvailability" :key="ba.name" class="flex items-center justify-between gap-4 bg-[#1a2030] border border-[#1e2535] rounded-lg px-4 py-3">
          <div class="flex flex-col gap-0.5 min-w-[180px]">
            <span class="text-[13.5px] font-semibold text-slate-100">{{ ba.name }}</span>
            <span class="text-[11.5px] text-slate-500">{{ ba.available }} available / {{ ba.total }} total</span>
          </div>
          <div class="flex items-center gap-3 flex-1 justify-end">
            <div class="w-48 h-1.5 bg-[#1e2535] rounded-full overflow-hidden">
              <div class="h-full rounded-full transition-all" :style="{ width: ba.pct + '%', background: ba.pct === 0 ? '#2d3748' : '#22c55e' }"></div>
            </div>
            <span class="text-[12px] font-semibold text-slate-500 min-w-[36px] text-right">{{ ba.pct }}%</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Alert Cards Row 2 -->
    <div class="grid grid-cols-4 gap-3.5">
      <div class="bg-[#0f1829] border border-blue-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Pending OTP Handovers</span>
          <span class="text-[28px] font-bold text-blue-400 leading-none">0</span>
          <a href="#" class="text-[12px] font-semibold text-blue-400 no-underline hover:text-blue-300">Process Now →</a>
        </div>
        <Clock :size="30" class="text-blue-400 flex-shrink-0" />
      </div>
      <div class="bg-[#1a0e08] border border-orange-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Returns Due Today</span>
          <span class="text-[28px] font-bold text-orange-500 leading-none">0</span>
          <span class="text-[11.5px] text-slate-500">Expected returns</span>
        </div>
        <TrendingUp :size="30" class="text-orange-500 flex-shrink-0" />
      </div>
      <div class="bg-[#1a0d0d] border border-red-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">Maintenance Due</span>
          <span class="text-[28px] font-bold text-red-500 leading-none">10</span>
          <a href="#" class="text-[12px] font-semibold text-red-500 no-underline hover:text-red-400">View Firearms →</a>
        </div>
        <Wrench :size="30" class="text-red-500 flex-shrink-0" />
      </div>
      <div class="bg-[#0a1208] border border-emerald-900/35 rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-[12px] text-slate-500 font-medium">In Armoury</span>
          <span class="text-[28px] font-bold text-emerald-400 leading-none">9</span>
          <span class="text-[11.5px] text-slate-500">Available firearms</span>
        </div>
        <ShieldCheck :size="30" class="text-emerald-400 flex-shrink-0" />
      </div>
    </div>

    <!-- Action Items -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4">
      <div class="flex items-center gap-2 mb-4">
        <TriangleAlert :size="15" class="text-amber-500" />
        <h3 class="text-[14px] font-semibold text-slate-100 m-0">Action Items</h3>
      </div>
      <div class="flex flex-col gap-2">
        <div v-for="item in actionItems" :key="item.title" class="flex items-center justify-between bg-[#1a0d0d] border border-red-900/25 rounded-lg px-4 py-3.5">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-red-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <component :is="item.icon" :size="15" class="text-red-500" />
            </div>
            <div>
              <div class="text-[13.5px] font-semibold text-slate-100">{{ item.title }}</div>
              <div class="text-[12px] text-slate-400">{{ item.desc }}</div>
            </div>
          </div>
          <button class="bg-transparent border-none text-slate-400 text-[13px] font-semibold cursor-pointer hover:text-slate-200 transition-colors px-2.5 py-1.5">Check</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Dashboard',
  layout: 'admin-layout',
})

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
  { name: 'J. K. Sanga',  branch: 'Dar es Salaam Sub-HQ', weapon: 'BERETTA',        until: '07:00 AM' },
  { name: 'N. O. Mwinyi', branch: 'Dar es Salaam Sub-HQ', weapon: 'GLOCK 17',       until: '07:00 PM' },
  { name: 'P. Q. Hamisi', branch: 'Dar es Salaam Sub-HQ', weapon: 'SIG SAUER P226', until: '07:00 AM' },
]

const availability = [
  { label: 'In Armoury',  value: 9, color: 'green'  },
  { label: 'On Duty',     value: 1, color: 'blue'   },
  { label: 'Maintenance', value: 0, color: 'orange' },
  { label: 'In Transit',  value: 0, color: 'purple' },
  { label: 'Lost',        value: 0, color: 'red'    },
  { label: 'Disposed',    value: 0, color: 'grey'   },
]

const branchAvailability = [
  { name: 'Dar es Salaam Sub-HQ', available: 7, total: 8, pct: 88  },
  { name: 'Dodoma HQ',            available: 0, total: 1, pct: 0   },
  { name: 'Zanzibar Sub-HQ',      available: 1, total: 1, pct: 100 },
]

const actionItems = [
  { title: 'Maintenance Required', desc: '10 firearm(s) need maintenance', icon: Wrench },
]

// ── APEX CHART CONFIGS ──
const baseAxis = {
  labels: { style: { colors: '#475569', fontSize: '11px', fontFamily: 'DM Sans, sans-serif' } },
  axisBorder: { show: false },
  axisTicks: { show: false },
}

const baseChart = {
  chart: { background: 'transparent', toolbar: { show: false }, zoom: { enabled: false } },
  grid: { borderColor: '#1e2535', strokeDashArray: 3, padding: { top: -10, right: 8, bottom: -10, left: 0 } },
  stroke: { curve: 'smooth' as const, width: 2 },
  markers: { size: 3 },
  tooltip: { theme: 'dark' },
  legend: { show: false },
  yaxis: { ...baseAxis, min: 0, tickAmount: 4 },
}

const activityChartOptions = {
  ...baseChart,
  colors: ['#60a5fa', '#4ade80', '#f87171'],
  xaxis: { ...baseAxis, categories: ['Mar 1', 'Mar 2', 'Mar 3', 'Mar 4', 'Mar 5', 'Mar 6', 'Mar 7'] },
}

const activitySeries = [
  { name: 'Handovers',     data: [0, 0, 0, 0, 0, 0, 0] },
  { name: 'Ammo Requests', data: [0, 0, 0, 0, 0, 0, 0] },
  { name: 'Incidents',     data: [0, 0, 0, 0, 0, 0, 0] },
]

const ammoChartOptions = {
  ...baseChart,
  colors: ['#3b82f6', '#22c55e', '#f59e0b'],
  xaxis: { ...baseAxis, categories: ['Week 1', 'Week 2', 'Week 3', 'Week 4'] },
}

const ammoSeries = [
  { name: 'Issued',   data: [0, 0, 0, 0] },
  { name: 'Returned', data: [0, 0, 0, 0] },
  { name: 'Consumed', data: [0, 0, 0, 0] },
]

const donutOptions = {
  chart: { background: 'transparent', toolbar: { show: false } },
  colors: ['#22c55e', '#ef4444'],
  labels: ['Good', 'Malfunction'],
  legend: { show: false },
  dataLabels: { enabled: false },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          total: {
            show: true,
            label: 'Total',
            color: '#64748b',
            fontSize: '12px',
            fontFamily: 'DM Sans, sans-serif',
            formatter: () => '10',
          },
        },
      },
    },
  },
  stroke: { width: 0 },
  tooltip: { theme: 'dark' },
}

const donutSeries = [9, 1]
</script>