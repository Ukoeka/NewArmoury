<template>
  <div class="p-8 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Occurrence Book & Inspections</h1>
        <p class="text-sm text-slate-500">Log security incidents and guard post inspections</p>
      </div>
      <div class="flex gap-2.5">
        <button class="flex items-center gap-1.5 bg-transparent text-slate-400 border border-slate-700 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:border-blue-500 hover:text-slate-200 transition-all whitespace-nowrap">
          <Plus :size="14" />
          Add Occurrence
        </button>
        <button class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
          <Plus :size="14" />
          Add Inspection
        </button>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Occurrences</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ occurrences.length }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-950/40 text-orange-500 border border-orange-500/25">
          <TriangleAlert :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Security Issues</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ securityIssues }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-950/40 text-red-500 border border-red-500/25">
          <TriangleAlert :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Inspections</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ inspections.length }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <CircleCheck :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">OK Status</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ okInspections }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <CircleCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Two-column layout -->
    <div class="grid grid-cols-2 gap-4">

      <!-- LEFT: Recent Occurrences -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden flex flex-col">
        <h3 class="text-[14px] font-semibold text-slate-100 px-5 py-4 border-b border-[#1e2535] m-0 flex-shrink-0">
          Recent Occurrences ({{ occurrences.length }})
        </h3>
        <div class="p-3.5 flex flex-col gap-3 overflow-y-auto max-h-[620px]">

          <div
            v-for="occ in occurrences"
            :key="occ.id"
            class="bg-[#1a2030] border border-[#1e2535] rounded-[10px] px-4 py-3.5 flex flex-col gap-2"
            :class="{
              'border-l-[3px] border-l-red-500': occ.type === 'EMERGENCY',
              'border-l-[3px] border-l-blue-500': occ.type !== 'EMERGENCY'
            }"
          >
            <!-- Top row -->
            <div class="flex items-center justify-between">
              <span
                class="inline-flex items-center text-[10.5px] font-bold tracking-wide"
                :class="{
                  'px-2.5 py-1 rounded-md bg-blue-950/70 text-blue-400 border border-blue-700/50': occ.type === 'PLANNED_SHIFT',
                  'text-red-500 text-[12px] p-0': occ.type === 'EMERGENCY',
                  'px-2.5 py-1 rounded-md bg-amber-950/70 text-amber-400 border border-amber-700/50': occ.type === 'UNPLANNED'
                }"
              >{{ occ.type }}</span>
              <span class="text-[11.5px] text-slate-600">{{ occ.time }}</span>
            </div>

            <span class="text-[12px] font-bold text-slate-400 uppercase tracking-wide">{{ occ.category }}</span>
            <p class="text-[13px] text-slate-200 leading-relaxed m-0">{{ occ.description }}</p>
            <span class="text-[11.5px] text-slate-600">Reported by: {{ occ.reportedBy }} | {{ occ.reportedAt }}</span>

            <!-- BISO Response -->
            <div v-if="occ.bisoResponse" class="bg-emerald-950/20 border border-emerald-700/40 rounded-lg px-3 py-2.5 flex flex-col gap-1">
              <span class="text-[11.5px] font-bold text-emerald-400">BISO Response:</span>
              <span class="text-[12.5px] text-emerald-300/80 leading-snug">{{ occ.bisoResponse }}</span>
            </div>

            <button class="self-start bg-blue-500/10 border-none text-blue-400 text-[12.5px] font-semibold cursor-pointer px-2.5 py-2 rounded-md hover:text-blue-300 transition-colors text-left">
              Add BISO Response
            </button>
          </div>

        </div>
      </div>

      <!-- RIGHT: Inspection Reports -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden flex flex-col">
        <h3 class="text-[14px] font-semibold text-slate-100 px-5 py-4 border-b border-[#1e2535] m-0 flex-shrink-0">
          Inspection Reports ({{ inspections.length }})
        </h3>
        <div class="p-3.5 flex flex-col gap-3 overflow-y-auto max-h-[620px]">

          <div
            v-for="insp in inspections"
            :key="insp.id"
            class="bg-[#1a2030] border border-[#1e2535] rounded-[10px] px-4 py-3.5 flex flex-col gap-2"
            :class="{ 'border-red-500/20': insp.status === 'NOT_OK' }"
          >
            <!-- Top row -->
            <div class="flex items-center justify-between">
              <span
                class="inline-flex items-center px-2.5 py-1 rounded-md text-[10.5px] font-bold tracking-wide"
                :class="{
                  'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': insp.type === 'ROUTINE' || insp.type === 'QUARTERLY',
                  'bg-red-950/70 text-red-400 border border-red-700/50': insp.type === 'SURPRISE'
                }"
              >{{ insp.type }}</span>
              <span class="text-[11.5px] text-slate-600">{{ insp.date }}</span>
            </div>

            <!-- Status badge -->
            <span
              class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold"
              :class="{
                'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': insp.status === 'OK',
                'bg-red-950/70 text-red-400 border border-red-700/50': insp.status === 'NOT_OK'
              }"
            >Status: {{ insp.status }}</span>

            <div class="flex flex-col gap-0.5">
              <span class="text-[12.5px] font-bold text-slate-200">Findings:</span>
              <span class="text-[12.5px] text-slate-400 leading-snug">{{ insp.findings }}</span>
            </div>
            <div class="flex flex-col gap-0.5">
              <span class="text-[12.5px] font-bold text-slate-200">Recommendations:</span>
              <span class="text-[12.5px] text-slate-400 leading-snug">{{ insp.recommendations }}</span>
            </div>

            <span class="text-[11.5px] text-slate-600">Inspected by: {{ insp.inspectedBy }}</span>

            <!-- BISO Instructions -->
            <div v-if="insp.bisoInstructions" class="bg-[#0f1829] border border-blue-700/50 rounded-lg px-3 py-2.5 flex flex-col gap-1">
              <span class="text-[11.5px] font-bold text-blue-400">BISO Instructions:</span>
              <span class="text-[12.5px] text-blue-300/80 leading-snug">{{ insp.bisoInstructions }}</span>
            </div>

            <button class="self-start bg-blue-500/10 border-none text-blue-400 text-[12.5px] font-semibold cursor-pointer px-2.5 py-2 rounded-md hover:text-blue-300 transition-colors text-left">
              Add BISO Instructions
            </button>
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
})

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
</script>