<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Security Personnel Deployment</h1>
        <p class="text-sm text-slate-500">Plan and manage security personnel duty rosters</p>
      </div>
      <button class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
        <Plus :size="14" />
        Schedule Deployment
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Deployments</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ totalDeployments }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <CalendarDays :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Scheduled</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ scheduledCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-950/40 text-orange-500 border border-orange-500/25">
          <Clock :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Active Now</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ activeCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <ShieldCheck :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Completed</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ completedCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-slate-800/60 text-slate-500 border border-slate-700/40">
          <CircleCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 flex gap-3 items-center mb-4">
      <div class="relative flex-1">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by SP name or file number..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <select v-model="selectedStatus" class="flex-1 min-w-[150px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="SCHEDULED">Scheduled</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select v-model="selectedBranch" class="flex-1 min-w-[150px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <!-- View Filter Tabs -->
    <div class="flex gap-2 mb-4">
      <button
        v-for="vt in viewTabs"
        :key="vt.id"
        @click="activeView = vt.id"
        class="flex items-center gap-1.5 px-4 py-2 border rounded-lg text-[13px] font-medium cursor-pointer transition-all whitespace-nowrap"
        :class="{
          'bg-[#1e2535] border-blue-500/60 text-slate-200 font-semibold': activeView === vt.id,
          'bg-[#161b27] border-[#1e2535] text-slate-500 hover:text-slate-300 hover:border-slate-600': activeView !== vt.id
        }"
      >
        <component :is="vt.icon" :size="13" />
        {{ vt.label }}
      </button>
    </div>

    <!-- Deployments List — outer container + spaced inner cards -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <div class="p-3 flex flex-col gap-2">

        <div
          v-for="dep in filteredDeployments"
          :key="dep.id"
          class="flex items-center gap-4 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors"
        >
          <!-- Security Personnel -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.1">
            <span class="text-[11px] text-slate-500 font-medium">Security Personnel</span>
            <span class="text-[14px] font-bold text-slate-100">{{ dep.personnel }}</span>
          </div>

          <!-- Duty -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.2">
            <span class="text-[11px] text-slate-500 font-medium">Duty</span>
            <span class="text-[13px] text-slate-400">{{ dep.duty }}</span>
          </div>

          <!-- Scheduled Start -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.2">
            <span class="text-[11px] text-slate-500 font-medium">Scheduled Start</span>
            <span class="text-[13px] text-slate-400">{{ dep.start }}</span>
          </div>

          <!-- Scheduled End -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.2">
            <span class="text-[11px] text-slate-500 font-medium">Scheduled End</span>
            <span class="text-[13px] text-slate-400">{{ dep.end }}</span>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-1" style="flex: 0.7">
            <span class="text-[11px] text-slate-500 font-medium">Status</span>
            <span
              class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide mt-0.5"
              :class="{
                'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': dep.status === 'ACTIVE',
                'bg-blue-950/70 text-blue-400 border border-blue-700/50': dep.status === 'SCHEDULED',
                'bg-[#1e2535] text-slate-500 border border-slate-700/60': dep.status === 'COMPLETED'
              }"
            >{{ dep.status }}</span>
          </div>

          <!-- Branch -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.1">
            <span class="text-[11px] text-slate-500 font-medium">Branch</span>
            <span class="text-[13px] font-semibold text-slate-200">{{ dep.branch }}</span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-2 ml-auto flex-shrink-0">
            <!-- ACTIVE: Complete button -->
            <template v-if="dep.status === 'ACTIVE'">
              <button class="flex items-center gap-1.5 bg-transparent border-none text-slate-400 text-[13px] font-medium cursor-pointer px-1 py-1.5 rounded-md hover:text-slate-200 hover:bg-[#1e2535] transition-all">
                <CircleCheck :size="14" />
                Complete
              </button>
            </template>
            <!-- SCHEDULED: Start + icons -->
            <template v-if="dep.status === 'SCHEDULED'">
              <button class="flex items-center gap-1.5 bg-transparent border-none text-slate-400 text-[13px] font-medium cursor-pointer px-1 py-1.5 rounded-md hover:text-slate-200 hover:bg-[#1e2535] transition-all">
                <CirclePlay :size="14" />
                Start
              </button>
              <button title="Edit" class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer">
                <PenSquare :size="14" />
              </button>
              <button title="Reassign" class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer">
                <UserPlus :size="14" />
              </button>
              <button title="Cancel" class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-red-400 hover:bg-red-950/30 transition-all cursor-pointer">
                <CircleX :size="14" />
              </button>
            </template>
          </div>
        </div>

        <div v-if="filteredDeployments.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No deployments found.
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

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

const searchQuery    = ref('')
const selectedStatus = ref('')
const selectedBranch = ref('')
const activeView     = ref('all')

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
      (activeView.value === 'active'   && d.status === 'ACTIVE') ||
      (activeView.value === 'upcoming' && d.status === 'SCHEDULED')
    return matchSearch && matchStatus && matchBranch && matchView
  })
})

const totalDeployments = computed(() => deployments.value.length)
const scheduledCount   = computed(() => deployments.value.filter(d => d.status === 'SCHEDULED').length)
const activeCount      = computed(() => deployments.value.filter(d => d.status === 'ACTIVE').length)
const completedCount   = computed(() => deployments.value.filter(d => d.status === 'COMPLETED').length)
</script>