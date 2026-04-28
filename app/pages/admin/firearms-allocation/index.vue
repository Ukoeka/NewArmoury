<template>
  <div class="p-4 sm:p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Firearm Handover & Return</h1>
        <p class="text-sm text-slate-500">Manage firearm issuance and returns with OTP verification</p>
      </div>
    </div>

    <!-- Tabs -->
    <div class="inline-flex bg-[#161b27] border border-[#1e2535] rounded-[10px] p-1 gap-0.5 mb-5 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="px-5 py-2 border-none rounded-[7px] text-[13px] font-medium cursor-pointer transition-all whitespace-nowrap font-sans"
        :class="{
          'bg-[#1e2535] text-slate-100 font-semibold': activeTab === tab.id,
          'bg-transparent text-slate-500 hover:text-slate-400': activeTab !== tab.id
        }"
      >{{ tab.label }}</button>
    </div>

    <!-- ── TAB 1: ISSUE FIREARMS ── -->
    <template v-if="activeTab === 'issue'">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-5 mb-4">
        <div class="flex items-center justify-between mb-5">
          <h3 class="text-[14px] font-semibold text-slate-100 m-0">Issue Firearm to Security Personnel</h3>
          <button
            @click="showIssueModal = true"
            class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
            <Shield :size="14" />
            Issue Firearm
          </button>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div class="bg-[#0f1829] border border-[#1e3a5f] rounded-[10px] px-5 py-4 flex flex-col gap-2">
            <span class="text-xs text-slate-500 font-medium">Active Deployments</span>
            <span class="text-[28px] font-bold text-blue-400 leading-none">{{ activeDeployments }}</span>
          </div>
          <div class="bg-[#0a1f13] border border-[#166534] rounded-[10px] px-5 py-4 flex flex-col gap-2">
            <span class="text-xs text-slate-500 font-medium">Available Firearms</span>
            <span class="text-[28px] font-bold text-emerald-400 leading-none">{{ availableFirearms }}</span>
          </div>
        </div>
      </div>

      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
        <h3 class="text-[14px] font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0">Active Handovers</h3>
        <!-- Table for medium+ screens -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full min-w-[700px] border-collapse text-[13px]">
            <thead>
              <tr class="border-b border-[#1e2535]">
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500 whitespace-nowrap">Weapon Number</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Firearm</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Type</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Security Personnel</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Ammo Issued</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Issued At</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in activeHandovers" :key="h.weaponNum" class="border-b border-[#1a2030] hover:bg-[#1a2030] transition-colors last:border-b-0">
                <td class="px-4 py-3.5 font-semibold text-slate-100">{{ h.weaponNum }}</td>
                <td class="px-4 py-3.5 font-semibold text-slate-100">{{ h.firearm }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.type }}</td>
                <td class="px-4 py-3.5 text-slate-200">{{ h.personnel }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.ammoIssued }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.issuedAt }}</td>
                <td class="px-4 py-3.5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide bg-emerald-950/70 text-emerald-400 border border-emerald-700/50">
                    {{ h.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Cards for small screens -->
        <div class="md:hidden p-4 space-y-4">
          <div v-for="h in activeHandovers" :key="h.weaponNum" class="bg-[#1a2030] border border-[#1e2535] rounded-xl p-4">
            <div class="flex justify-between items-start mb-2">
              <span class="font-semibold text-slate-100">{{ h.weaponNum }}</span>
              <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wide bg-emerald-950/70 text-emerald-400 border border-emerald-700/50">
                {{ h.status }}
              </span>
            </div>
            <div class="space-y-1 text-sm">
              <div><span class="text-slate-500">Firearm:</span> <span class="font-semibold text-slate-100">{{ h.firearm }}</span></div>
              <div><span class="text-slate-500">Type:</span> {{ h.type }}</div>
              <div><span class="text-slate-500">Personnel:</span> {{ h.personnel }}</div>
              <div><span class="text-slate-500">Ammo Issued:</span> {{ h.ammoIssued }}</div>
              <div><span class="text-slate-500">Issued At:</span> {{ h.issuedAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── TAB 2: RETURN FIREARMS ── -->
    <template v-if="activeTab === 'return'">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between px-6 pt-5 pb-0 mb-2 gap-2">
          <h3 class="text-[14px] font-semibold text-slate-100 m-0">Return Firearms</h3>
          <button
            @click="openProcessReturn"
            class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap w-full sm:w-auto justify-center">
            <ArrowLeft :size="14" />
            Process Return
          </button>
        </div>
        <!-- Table for medium+ screens -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full min-w-[700px] border-collapse text-[13px] mt-2">
            <thead>
              <tr class="border-b border-[#1e2535]">
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500 whitespace-nowrap">Weapon Number</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Firearm</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Type</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Security Personnel</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Ammo Issued</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Issued At</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Status</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in returnHandovers" :key="h.weaponNum" class="border-b border-[#1a2030] hover:bg-[#1a2030] transition-colors last:border-b-0">
                <td class="px-4 py-3.5 font-semibold text-slate-100">{{ h.weaponNum }}</td>
                <td class="px-4 py-3.5 font-semibold text-slate-100">{{ h.firearm }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.type }}</td>
                <td class="px-4 py-3.5 text-slate-200">{{ h.personnel }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.ammoIssued }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.issuedAt }}</td>
                <td class="px-4 py-3.5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide whitespace-nowrap"
                    :class="{
                      'bg-red-950/70 text-red-400 border border-red-700/50': h.returnStatus === 'Overdue',
                      'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': h.returnStatus !== 'Overdue',
                    }">{{ h.returnStatus }}</span>
                </td>
                <td class="px-4 py-3.5">
                  <button
                    @click="openReturn(h)"
                    class="bg-blue-600 text-white border-none rounded-lg px-4 py-1.5 text-[12.5px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
                    Return
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Cards for small screens -->
        <div class="md:hidden p-4 space-y-4">
          <div v-for="h in returnHandovers" :key="h.weaponNum" class="bg-[#1a2030] border border-[#1e2535] rounded-xl p-4">
            <div class="flex justify-between items-start mb-2">
              <span class="font-semibold text-slate-100">{{ h.weaponNum }}</span>
              <div class="flex gap-2">
                <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wide"
                  :class="{
                    'bg-red-950/70 text-red-400 border border-red-700/50': h.returnStatus === 'Overdue',
                    'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': h.returnStatus !== 'Overdue',
                  }">{{ h.returnStatus }}</span>
                <button
                  @click="openReturn(h)"
                  class="bg-blue-600 text-white border-none rounded-lg px-3 py-1 text-[12px] font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
                  Return
                </button>
              </div>
            </div>
            <div class="space-y-1 text-sm">
              <div><span class="text-slate-500">Firearm:</span> <span class="font-semibold text-slate-100">{{ h.firearm }}</span></div>
              <div><span class="text-slate-500">Type:</span> {{ h.type }}</div>
              <div><span class="text-slate-500">Personnel:</span> {{ h.personnel }}</div>
              <div><span class="text-slate-500">Ammo Issued:</span> {{ h.ammoIssued }}</div>
              <div><span class="text-slate-500">Issued At:</span> {{ h.issuedAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── TAB 3: HANDOVER HISTORY ── -->
    <template v-if="activeTab === 'history'">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
        <h3 class="text-[14px] font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0">Recent Handover History</h3>
        <!-- Table for medium+ screens -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full min-w-[900px] border-collapse text-[13px]">
            <thead>
              <tr class="border-b border-[#1e2535]">
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500 whitespace-nowrap">Weapon Number</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Firearm</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Type</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Security Personnel</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Armoury Keeper</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Ammo Issued</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Ammo Returned</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Issued At</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Returned At</th>
                <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="h in handoverHistory" :key="h.weaponNum + h.issuedAt" class="border-b border-[#1a2030] hover:bg-[#1a2030] transition-colors last:border-b-0">
                <td class="px-4 py-3.5 font-semibold text-slate-100">{{ h.weaponNum }}</td>
                <td class="px-4 py-3.5 font-semibold text-slate-100">{{ h.firearm }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.type }}</td>
                <td class="px-4 py-3.5 text-slate-200">{{ h.personnel }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.keeper }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.ammoIssued }}</td>
                <td class="px-4 py-3.5">
                  <span v-if="h.ammoReturned === '-'" class="text-slate-400">-</span>
                  <span v-else-if="h.ammoDiscount" class="font-semibold text-amber-400">{{ h.ammoReturned }}</span>
                  <span v-else class="text-slate-400">{{ h.ammoReturned }}</span>
                </td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.issuedAt }}</td>
                <td class="px-4 py-3.5 text-slate-400">{{ h.returnedAt }}</td>
                <td class="px-4 py-3.5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide whitespace-nowrap"
                    :class="{
                      'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': h.historyStatus === 'COMPLETED',
                      'bg-blue-950/70 text-blue-400 border border-blue-700/50': h.historyStatus === 'RETURNED',
                    }">{{ h.historyStatus }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Cards for small screens -->
        <div class="md:hidden p-4 space-y-4">
          <div v-for="h in handoverHistory" :key="h.weaponNum + h.issuedAt" class="bg-[#1a2030] border border-[#1e2535] rounded-xl p-4">
            <div class="flex justify-between items-start mb-2">
              <span class="font-semibold text-slate-100">{{ h.weaponNum }}</span>
              <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold tracking-wide"
                :class="{
                  'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': h.historyStatus === 'COMPLETED',
                  'bg-blue-950/70 text-blue-400 border border-blue-700/50': h.historyStatus === 'RETURNED',
                }">{{ h.historyStatus }}</span>
            </div>
            <div class="space-y-1 text-sm">
              <div><span class="text-slate-500">Firearm:</span> <span class="font-semibold text-slate-100">{{ h.firearm }}</span></div>
              <div><span class="text-slate-500">Type:</span> {{ h.type }}</div>
              <div><span class="text-slate-500">Personnel:</span> {{ h.personnel }}</div>
              <div><span class="text-slate-500">Keeper:</span> {{ h.keeper }}</div>
              <div><span class="text-slate-500">Ammo Issued:</span> {{ h.ammoIssued }}</div>
              <div><span class="text-slate-500">Ammo Returned:</span>
                <span v-if="h.ammoReturned === '-'" class="text-slate-400">-</span>
                <span v-else-if="h.ammoDiscount" class="font-semibold text-amber-400">{{ h.ammoReturned }}</span>
                <span v-else class="text-slate-400">{{ h.ammoReturned }}</span>
              </div>
              <div><span class="text-slate-500">Issued At:</span> {{ h.issuedAt }}</div>
              <div><span class="text-slate-500">Returned At:</span> {{ h.returnedAt }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- ── Modals ── -->
    <IssueFirearm
      v-model:open="showIssueModal"
      :deployments="deploymentOptions"
      :available-firearms="availableFirearmOptions"
      @submit="handleIssue"
    />
    <ReturnFirearm
      v-model:open="showReturnModal"
      :handover="returningHandover"
      @submit="handleReturn"
    />

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' , middleware: ['auth']})

import { ref, computed } from 'vue'
import { Shield, ArrowLeft } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import IssueFirearm from '@/components/app-specific/dialogs/firearm/IssueFireArm.vue'
import ReturnFirearm from '@/components/app-specific/dialogs/firearm/ReturnFireArm.vue'

const activeTab = ref('issue')
const tabs = [
  { id: 'issue',   label: 'Issue Firearms' },
  { id: 'return',  label: 'Return Firearms' },
  { id: 'history', label: 'Handover History' },
]

// ── Data ──
const activeHandovers = ref([
  { weaponNum: 'BRT342', firearm: 'BERETTA',            type: 'PISTOL', personnel: 'J. K. Sanga',    ammoIssued: '15 rounds', issuedAt: '12/24/2024, 7:00:00 PM', status: 'On Duty' },
  { weaponNum: 'YFW214', firearm: 'GLOCK 17',           type: 'PISTOL', personnel: 'N. O. Mwinyi',   ammoIssued: '20 rounds', issuedAt: '12/25/2024, 7:00:00 AM', status: 'On Duty' },
  { weaponNum: 'SIG445', firearm: 'SIG SAUER P226',     type: 'PISTOL', personnel: 'P. Q. Hamisi',   ammoIssued: '18 rounds', issuedAt: '12/25/2024, 7:00:00 PM', status: 'On Duty' },
  { weaponNum: 'CZ7501', firearm: 'CZ 75',              type: 'PISTOL', personnel: 'M. T. Mwakyusa', ammoIssued: '25 rounds', issuedAt: '12/26/2024, 7:00:00 AM', status: 'On Duty' },
  { weaponNum: 'SW9402', firearm: 'SMITH & WESSON M&P', type: 'PISTOL', personnel: 'R. S. Juma',     ammoIssued: '15 rounds', issuedAt: '12/26/2024, 1:00:00 PM', status: 'On Duty' },
])

const returnHandovers = ref([
  { weaponNum: 'BRT342', firearm: 'BERETTA',            type: 'PISTOL', personnel: 'J. K. Sanga',    ammoIssued: '15 rounds', issuedAt: '12/24/2024, 7:00:00 PM', returnStatus: 'Overdue' },
  { weaponNum: 'YFW214', firearm: 'GLOCK 17',           type: 'PISTOL', personnel: 'N. O. Mwinyi',   ammoIssued: '20 rounds', issuedAt: '12/25/2024, 7:00:00 AM', returnStatus: 'Overdue' },
  { weaponNum: 'SIG445', firearm: 'SIG SAUER P226',     type: 'PISTOL', personnel: 'P. Q. Hamisi',   ammoIssued: '18 rounds', issuedAt: '12/25/2024, 7:00:00 PM', returnStatus: 'Overdue' },
  { weaponNum: 'CZ7501', firearm: 'CZ 75',              type: 'PISTOL', personnel: 'M. T. Mwakyusa', ammoIssued: '25 rounds', issuedAt: '12/26/2024, 7:00:00 AM', returnStatus: 'Overdue' },
  { weaponNum: 'SW9402', firearm: 'SMITH & WESSON M&P', type: 'PISTOL', personnel: 'R. S. Juma',     ammoIssued: '15 rounds', issuedAt: '12/26/2024, 1:00:00 PM', returnStatus: 'On Time' },
])

const handoverHistory = ref([
  { weaponNum: 'BRT342', firearm: 'BERETTA',            type: 'PISTOL',    personnel: 'J. K. Sanga',    keeper: 'F. G. Massawe', ammoIssued: '15 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/24/2024, 7:00:00 PM', returnedAt: '-',                      historyStatus: 'COMPLETED' },
  { weaponNum: 'YFW214', firearm: 'GLOCK 17',           type: 'PISTOL',    personnel: 'N. O. Mwinyi',   keeper: 'F. G. Massawe', ammoIssued: '20 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/25/2024, 7:00:00 AM', returnedAt: '-',                      historyStatus: 'COMPLETED' },
  { weaponNum: 'SIG445', firearm: 'SIG SAUER P226',     type: 'PISTOL',    personnel: 'P. Q. Hamisi',   keeper: 'F. G. Massawe', ammoIssued: '18 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/25/2024, 7:00:00 PM', returnedAt: '-',                      historyStatus: 'COMPLETED' },
  { weaponNum: 'CZ7501', firearm: 'CZ 75',              type: 'PISTOL',    personnel: 'M. T. Mwakyusa', keeper: 'F. G. Massawe', ammoIssued: '25 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/26/2024, 7:00:00 AM', returnedAt: '-',                      historyStatus: 'COMPLETED' },
  { weaponNum: 'SW9402', firearm: 'SMITH & WESSON M&P', type: 'PISTOL',    personnel: 'R. S. Juma',     keeper: 'F. G. Massawe', ammoIssued: '15 rounds', ammoReturned: '-',              ammoDiscount: false, issuedAt: '12/26/2024, 1:00:00 PM', returnedAt: '-',                      historyStatus: 'COMPLETED' },
  { weaponNum: 'REM123', firearm: 'REMINGTON 870',      type: 'SHORT GUN', personnel: 'J. K. Sanga',    keeper: 'F. G. Massawe', ammoIssued: '22 rounds', ammoReturned: '20 rounds (-2)', ammoDiscount: true,  issuedAt: '12/20/2024, 9:00:00 AM', returnedAt: '12/20/2024, 9:00:00 PM', historyStatus: 'RETURNED' },
  { weaponNum: 'WLT783', firearm: 'WALTHER PPK',        type: 'PISTOL',    personnel: 'L. M. Mbwana',   keeper: 'F. G. Massawe', ammoIssued: '18 rounds', ammoReturned: '18 rounds',      ammoDiscount: false, issuedAt: '12/21/2024, 7:00:00 AM', returnedAt: '12/21/2024, 7:00:00 PM', historyStatus: 'RETURNED' },
  { weaponNum: 'MOS556', firearm: 'MOSSBERG 500',       type: 'SHORT GUN', personnel: 'N. O. Mwinyi',   keeper: 'F. G. Massawe', ammoIssued: '30 rounds', ammoReturned: '25 rounds (-5)', ammoDiscount: true,  issuedAt: '12/22/2024, 7:00:00 AM', returnedAt: '12/22/2024, 7:00:00 PM', historyStatus: 'RETURNED' },
])

// ── Computed ──
const activeDeployments  = computed(() => activeHandovers.value.length)
const availableFirearms  = ref(8)

const deploymentOptions = computed(() =>
  activeHandovers.value.map(h => ({
    id: h.weaponNum,
    label: `${h.personnel} — ${h.firearm} (${h.weaponNum})`,
  }))
)

const availableFirearmOptions = computed(() => [
  { weaponNum: 'FN-001', label: 'FN HERSTAL - FN-001' },
  { weaponNum: 'HK-002', label: 'HK USP - HK-002' },
  { weaponNum: 'SPR-003', label: 'SPRINGFIELD XD - SPR-003' },
])

// ── Modal state ──
const showIssueModal   = ref(false)
const showReturnModal  = ref(false)
const returningHandover = ref<typeof returnHandovers.value[0] | null>(null)

function openReturn(h: typeof returnHandovers.value[0]) {
  returningHandover.value = h
  showReturnModal.value = true
}

function openProcessReturn() {
  // Open with first pending item pre-selected, or blank
  returningHandover.value = returnHandovers.value[0] ?? null
  showReturnModal.value = true
}

// ── Submit handlers ──
function handleIssue(data: any) {
  const firearmOpt = availableFirearmOptions.value.find(f => f.weaponNum === data.firearm)
  const label = firearmOpt?.label.split(' - ')[0] ?? data.firearm
  const now = new Date().toLocaleString()

  activeHandovers.value.push({
    weaponNum: data.firearm,
    firearm:   label,
    type:      'PISTOL',
    personnel: deploymentOptions.value.find(d => d.id === data.deployment)?.label.split(' — ')[0] ?? '—',
    ammoIssued: `${data.ammoCount} rounds`,
    issuedAt:   now,
    status:     'On Duty',
  })
  availableFirearms.value = Math.max(0, availableFirearms.value - 1)
  toast.success('Firearm issued successfully. OTP sent.')
}

function handleReturn(data: any) {
  const idx = returnHandovers.value.findIndex(h => h.weaponNum === data.weaponNum)
  if (idx === -1) return

 const h = returnHandovers.value[idx]

if (!h) return

const issuedNum = Number(h.ammoIssued?.match(/\d+/)?.[0]) || 0
const diff = issuedNum - data.ammoReturned

const ammoReturnedStr =
  diff > 0
    ? `${data.ammoReturned} rounds (-${diff})`
    : `${data.ammoReturned} rounds`

// Add to history
handoverHistory.value.unshift({
  weaponNum: h.weaponNum,
  firearm: h.firearm,
  type: h.type,
  personnel: h.personnel,
  keeper: 'F. G. Massawe',
  ammoIssued: h.ammoIssued,
  ammoReturned: ammoReturnedStr,
  ammoDiscount: diff > 0,
  issuedAt: h.issuedAt,
  returnedAt: new Date().toLocaleString(),
  historyStatus: 'RETURNED',
})

  // Remove from return table + active
  returnHandovers.value.splice(idx, 1)
  const activeIdx = activeHandovers.value.findIndex(a => a.weaponNum === data.weaponNum)
  if (activeIdx !== -1) activeHandovers.value.splice(activeIdx, 1)

  availableFirearms.value += 1
  toast.success(`${h.firearm} returned successfully`)
}
</script>