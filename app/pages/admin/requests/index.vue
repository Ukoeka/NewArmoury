<template>
  <div class="p-4 sm:p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans overflow-x-hidden">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Ammunition Requests</h1>
        <p class="text-sm text-slate-500">Manage ammunition transfers between branches and armouries</p>
      </div>
      <button class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
        <Plus :size="14" />
        New Request
      </button>
    </div>

    <!-- Stats — 5 cards -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-6">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Requests</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ totalCount }}</span>
        </div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <FileText :size="20" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">New</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ newCount }}</span>
        </div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-400 border border-blue-500/25">
          <Clock :size="20" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Verified</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ verifiedCount }}</span>
        </div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-950/40 text-purple-400 border border-purple-500/25">
          <CircleCheckBig :size="20" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">In Transit</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ inTransitCount }}</span>
        </div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-orange-950/40 text-orange-500 border border-orange-500/25">
          <Truck :size="20" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Completed</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ completedCount }}</span>
        </div>
        <div class="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <CircleCheck :size="20" />
        </div>
      </div>
    </div>

    <!-- Pending Requests Section -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 mb-5">
      <div class="flex items-center gap-2 mb-4">
        <Clock :size="16" class="text-orange-500" />
        <h3 class="text-[14px] font-semibold text-slate-100 m-0">Pending Requests ({{ pendingRequests.length }})</h3>
      </div>

      <div class="flex flex-col gap-2">
        <div
          v-for="req in pendingRequests"
          :key="req.id"
          class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4 bg-red-950/20 border border-red-900/40 rounded-xl"
        >
          <!-- Request Type -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-1">
            <span class="text-[11px] text-slate-500 font-medium">Request Type</span>
            <span class="text-[13px] font-bold text-slate-100 font-mono tracking-wide">{{ req.type }}</span>
          </div>
          <!-- From -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-1">
            <span class="text-[11px] text-slate-500 font-medium">From</span>
            <span class="text-[13px] font-semibold text-slate-200">{{ req.from }}</span>
          </div>
          <!-- To -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-1">
            <span class="text-[11px] text-slate-500 font-medium">To</span>
            <span class="text-[13px] font-semibold text-slate-200">{{ req.to }}</span>
          </div>
          <!-- Items -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-[0.8]">
            <span class="text-[11px] text-slate-500 font-medium">Items</span>
            <span class="text-[13px] text-slate-300">{{ req.items }}</span>
          </div>
          <!-- Status -->
          <div class="flex flex-col gap-1 sm:flex-[0.7]">
            <span class="text-[11px] text-slate-500 font-medium">Status</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide mt-0.5 bg-[#1e2535] text-slate-400 border border-slate-700/60">
              {{ req.status }}
            </span>
          </div>
          <!-- Created -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-[0.8]">
            <span class="text-[11px] text-slate-500 font-medium">Created</span>
            <span class="text-[13px] text-slate-400">{{ req.created }}</span>
          </div>
          <!-- Action -->
          <div class="flex-shrink-0 sm:ml-auto">
            <button class="bg-blue-600 text-white border-none rounded-lg px-3 sm:px-5 py-2 text-[13px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors w-full sm:w-auto">
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 flex gap-3 items-center mb-5">
      <select v-model="selectedStatus" class="flex-1 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Statuses</option>
        <option value="NEW">New</option>
        <option value="APPROVED">Approved</option>
        <option value="VERIFIED">Verified</option>
        <option value="IN_TRANSIT">In Transit</option>
        <option value="COMPLETED">Completed</option>
      </select>
      <select v-model="selectedType" class="flex-1 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Types</option>
        <option value="BRANCH_TO_BRANCH">Branch to Branch</option>
        <option value="BRANCH_TO_HQ">Branch to HQ</option>
        <option value="HQ_TO_BRANCH">HQ to Branch</option>
      </select>
    </div>

    <!-- All Requests -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <h3 class="text-[14px] font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0">
        All Requests ({{ filteredRequests.length }})
      </h3>

      <div class="p-3 flex flex-col gap-2">
        <div
          v-for="req in filteredRequests"
          :key="req.id"
          class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors"
        >
          <!-- Request ID -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-[0.8]">
            <span class="text-[11px] text-slate-500 font-medium">Request ID</span>
            <span class="text-[13px] font-bold text-slate-100 font-mono">{{ req.id }}</span>
          </div>
          <!-- Type -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-1">
            <span class="text-[11px] text-slate-500 font-medium">Type</span>
            <span class="text-[12px] font-bold text-slate-300 font-mono tracking-wide">{{ req.type }}</span>
          </div>
          <!-- From → To -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-[1.3]">
            <span class="text-[11px] text-slate-500 font-medium">From → To</span>
            <span class="text-[13px] text-slate-300">{{ req.from }} → {{ req.to }}</span>
          </div>
          <!-- Items -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-[0.8]">
            <span class="text-[11px] text-slate-500 font-medium">Items</span>
            <span class="text-[13px] text-slate-400">{{ req.items }}</span>
          </div>
          <!-- Status -->
          <div class="flex flex-col gap-1 sm:flex-[0.8]">
            <span class="text-[11px] text-slate-500 font-medium">Status</span>
            <span
              class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide mt-0.5"
              :class="{
                'bg-[#1e2535] text-slate-400 border border-slate-700/60':           req.status === 'NEW',
                'bg-blue-950/70 text-blue-400 border border-blue-700/50':           req.status === 'APPROVED',
                'bg-purple-950/70 text-purple-400 border border-purple-700/50':     req.status === 'VERIFIED',
                'bg-orange-950/70 text-orange-400 border border-orange-700/50':     req.status === 'IN_TRANSIT',
                'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50':  req.status === 'COMPLETED'
              }"
            >{{ req.status }}</span>
          </div>
          <!-- Created -->
          <div class="flex flex-col gap-1 min-w-0 sm:flex-[0.8]">
            <span class="text-[11px] text-slate-500 font-medium">Created</span>
            <span class="text-[13px] text-slate-400">{{ req.created }}</span>
          </div>
        </div>

        <div v-if="filteredRequests.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No requests found.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed } from 'vue'
import { Plus, Clock, FileText, CircleCheckBig, Truck, CircleCheck } from 'lucide-vue-next'

interface AmmoRequest {
  id: string
  type: string
  from: string
  to: string
  items: string
  status: 'NEW' | 'APPROVED' | 'VERIFIED' | 'IN_TRANSIT' | 'COMPLETED'
  created: string
}

const selectedStatus = ref('')
const selectedType   = ref('')

const allRequests = ref<AmmoRequest[]>([
  { id: 'ar-001', type: 'BRANCH_TO_BRANCH', from: 'Mwanza Branch',        to: 'Dodoma HQ', items: '1 type(s)', status: 'NEW',      created: '12/24/2024' },
  { id: 'ar-002', type: 'BRANCH_TO_HQ',     from: 'Dar es Salaam Sub-HQ', to: 'Dodoma HQ', items: '2 type(s)', status: 'APPROVED', created: '12/20/2024' },
])

const pendingRequests = computed(() =>
  allRequests.value.filter(r => r.status === 'NEW')
)

const filteredRequests = computed(() =>
  allRequests.value.filter(r => {
    const matchStatus = !selectedStatus.value || r.status === selectedStatus.value
    const matchType   = !selectedType.value   || r.type   === selectedType.value
    return matchStatus && matchType
  })
)

const totalCount     = computed(() => allRequests.value.length)
const newCount       = computed(() => allRequests.value.filter(r => r.status === 'NEW').length)
const verifiedCount  = computed(() => allRequests.value.filter(r => r.status === 'VERIFIED').length)
const inTransitCount = computed(() => allRequests.value.filter(r => r.status === 'IN_TRANSIT').length)
const completedCount = computed(() => allRequests.value.filter(r => r.status === 'COMPLETED').length)
</script>