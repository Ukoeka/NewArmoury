<template>
  <div class="p-8 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Reports & Analytics</h1>
      <p class="text-sm text-slate-500">Generate comprehensive reports with customizable filters and export options</p>
    </div>

    <!-- Stats — 5 cards -->
    <div class="grid grid-cols-5 gap-3.5 mb-6">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Firearms</span>
          <span class="text-[26px] font-bold text-slate-100 leading-none">10</span>
        </div>
        <div class="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <ShieldCheck :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Malfunctioning</span>
          <span class="text-[26px] font-bold text-amber-400 leading-none">1</span>
        </div>
        <div class="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-amber-950/40 text-amber-400 border border-amber-500/25">
          <Wrench :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Maintenance Due</span>
          <span class="text-[26px] font-bold text-orange-500 leading-none">10</span>
        </div>
        <div class="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-orange-950/40 text-orange-500 border border-orange-500/25">
          <CalendarDays :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Ammo Requests</span>
          <span class="text-[26px] font-bold text-emerald-500 leading-none">2</span>
        </div>
        <div class="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <Package :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Handovers</span>
          <span class="text-[26px] font-bold text-purple-400 leading-none">8</span>
        </div>
        <div class="w-11 h-11 rounded-[10px] flex items-center justify-center flex-shrink-0 bg-purple-950/40 text-purple-400 border border-purple-500/25">
          <Activity :size="22" />
        </div>
      </div>
    </div>

    <!-- Report Cards Grid — 2×2 -->
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="report in reports"
        :key="report.id"
        class="bg-[#161b27] border border-[#1e2535] rounded-[14px] p-6 grid gap-0 hover:border-slate-600/60 transition-colors"
        style="grid-template-columns: auto 1fr; grid-template-rows: auto auto;"
      >
        <!-- Icon -->
        <div
          class="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center flex-shrink-0"
          :style="{ background: report.iconBg }"
          style="grid-row: 1;"
        >
          <component :is="report.icon" :size="22" color="white" />
        </div>

        <!-- Name + Description -->
        <div class="flex flex-col gap-1.5 justify-center pl-[18px]" style="grid-column: 2; grid-row: 1;">
          <span class="text-[15px] font-bold text-slate-100">{{ report.name }}</span>
          <span class="text-[12.5px] text-slate-500 leading-snug">{{ report.description }}</span>
        </div>

        <!-- Footer -->
        <div
          class="flex items-center justify-between mt-5 pt-4 border-t border-[#1e2535]"
          style="grid-column: 1 / 3;"
        >
          <div class="flex gap-2">
            <button v-if="report.hasDateRange" class="flex items-center gap-1.5 bg-transparent border border-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium text-slate-400 cursor-pointer hover:border-blue-500 hover:text-slate-200 transition-all">
              <CalendarDays :size="12" />
              Date Range
            </button>
            <button class="flex items-center gap-1.5 bg-transparent border border-slate-700 rounded-lg px-3 py-1.5 text-[12px] font-medium text-slate-400 cursor-pointer hover:border-blue-500 hover:text-slate-200 transition-all">
              <Filter :size="12" />
              Branch Filter
            </button>
          </div>
          <button class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-[13px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
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
})

import {
  ShieldCheck, Wrench, CalendarDays, Package, Activity,
  Filter, Download, Shield, Box, BarChart2,
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
    icon: Wrench,
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