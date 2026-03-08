<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Security Devices & Fire Brigades</h1>
        <p class="text-sm text-slate-500">Register and track non-firearms security equipment</p>
      </div>
      <button class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
        <Plus :size="14" />
        Add Device
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Devices</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ totalDevices }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <Database :size="24" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Good Condition</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ goodCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <CircleCheck :size="24" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Malfunction</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ malfunctionCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-red-950/40 text-red-500 border border-red-500/25">
          <TriangleAlert :size="24" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Under Maintenance</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ maintenanceCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-yellow-950/40 text-yellow-500 border border-yellow-500/25">
          <ShieldAlert :size="24" />
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 flex gap-3 items-center mb-5">
      <div class="relative flex-1">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, ID, or type..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <select v-model="selectedBranch" class="flex-1 min-w-[160px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
      <select v-model="selectedStatus" class="flex-1 min-w-[160px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Statuses</option>
        <option value="GOOD">Good</option>
        <option value="MALFUNCTION">Malfunction</option>
        <option value="MAINTENANCE">Under Maintenance</option>
      </select>
    </div>

    <!-- Devices List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <h3 class="text-sm font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0">
        Security Devices ({{ filteredDevices.length }})
      </h3>

      <div class="p-3 flex flex-col gap-3">

        <div
          v-for="device in filteredDevices"
          :key="device.id"
          class="flex items-start gap-6 px-5 py-5 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors"
        >
          <!-- Device Name + ID -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.4">
            <span class="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Device Name</span>
            <span class="text-[14px] font-bold text-slate-100 leading-snug mt-0.5">{{ device.name }}</span>
            <span class="text-[11px] text-slate-600 font-mono mt-0.5">{{ device.id }}</span>
          </div>

          <!-- Type -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1">
            <span class="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Type</span>
            <span class="text-[13px] text-slate-300 font-medium mt-0.5">{{ device.type }}</span>
          </div>

          <!-- Use -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.2">
            <span class="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Use</span>
            <span class="text-[13px] text-slate-400 mt-0.5">{{ device.use }}</span>
          </div>

          <!-- Branch -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1">
            <span class="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Branch</span>
            <span class="text-[13px] font-semibold text-slate-200 mt-0.5">{{ device.branch }}</span>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-1" style="flex: 0.7">
            <span class="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Status</span>
            <span
              class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide mt-1"
              :class="{
                'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': device.status === 'GOOD',
                'bg-red-950/70 text-red-400 border border-red-700/50': device.status === 'MALFUNCTION',
                'bg-amber-950/70 text-amber-400 border border-amber-700/50': device.status === 'MAINTENANCE'
              }"
            >{{ device.status }}</span>
          </div>

          <!-- Next Inspection -->
          <div class="flex flex-col gap-1" style="flex: 1">
            <span class="text-[11px] text-slate-500 font-medium uppercase tracking-wide">Next Inspection</span>
            <span class="text-[13.5px] font-semibold text-slate-200 mt-0.5">{{ device.nextInspection }}</span>
            <span class="inline-flex self-start items-center text-[11px] font-semibold rounded-md px-2.5 py-1 mt-1 bg-orange-950/60 text-orange-400 border border-orange-700/50">
              Due in {{ device.daysUntil }} days
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-3 flex-shrink-0 self-center ml-auto">
            <button title="Edit" class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-500 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer">
              <PenSquare :size="15" />
            </button>
            <button class="bg-transparent border-none text-slate-400 text-[13px] font-medium cursor-pointer py-1 hover:text-slate-200 transition-colors whitespace-nowrap">
              Record Inspection
            </button>
          </div>
        </div>

        <div v-if="filteredDevices.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No devices found.
        </div>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

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

const searchQuery    = ref('')
const selectedBranch = ref('')
const selectedStatus = ref('')

const branches = [
  'Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ',
  'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch',
]

const devices = ref<Device[]>([
  { id: 'WTMD-DSM-001', name: 'Walk-Through Metal Detector',    type: 'Metal Detector',       use: 'Entrance Security Screening',      branch: 'Dar es Salaam Sub-HQ', status: 'GOOD',        nextInspection: '1/20/2025', daysUntil: -410 },
  { id: 'XRAY-DSM-001', name: 'X-Ray Baggage Scanner',          type: 'X-Ray Scanner',         use: 'Baggage and Package Screening',    branch: 'Dar es Salaam Sub-HQ', status: 'GOOD',        nextInspection: '1/18/2025', daysUntil: -412 },
  { id: 'CCTV-DSM-001', name: 'CCTV Camera - Main Entrance',    type: 'CCTV Camera',           use: 'Main Entrance Surveillance',       branch: 'Dar es Salaam Sub-HQ', status: 'GOOD',        nextInspection: '2/15/2025', daysUntil: -384 },
  { id: 'FEXT-DSM-001', name: 'Fire Extinguisher - CO2 Type',   type: 'Fire Safety Equipment', use: 'Fire Suppression - Main Entrance', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD',        nextInspection: '3/10/2025', daysUntil: -361 },
  { id: 'ALRM-DSM-001', name: 'Fire Alarm System',              type: 'Fire Safety Equipment', use: 'Building Fire Detection',          branch: 'Dar es Salaam Sub-HQ', status: 'GOOD',        nextInspection: '4/5/2025',  daysUntil: -335 },
  { id: 'HAND-DSM-001', name: 'Handheld Metal Detector',        type: 'Metal Detector',        use: 'Personnel Screening',              branch: 'Dar es Salaam Sub-HQ', status: 'GOOD',        nextInspection: '5/1/2025',  daysUntil: -309 },
  { id: 'CCTV-DOD-001', name: 'CCTV Camera - Perimeter',        type: 'CCTV Camera',           use: 'Perimeter Surveillance',           branch: 'Dodoma HQ',            status: 'GOOD',        nextInspection: '6/15/2025', daysUntil: -264 },
  { id: 'WTMD-DOD-001', name: 'Walk-Through Metal Detector',    type: 'Metal Detector',        use: 'Entrance Security Screening',      branch: 'Dodoma HQ',            status: 'GOOD',        nextInspection: '7/20/2025', daysUntil: -229 },
  { id: 'FEXT-DOD-001', name: 'Fire Extinguisher - Dry Powder', type: 'Fire Safety Equipment', use: 'Fire Suppression - Server Room',   branch: 'Dodoma HQ',            status: 'MAINTENANCE', nextInspection: '8/10/2025', daysUntil: -208 },
  { id: 'XRAY-ZNZ-001', name: 'X-Ray Baggage Scanner',          type: 'X-Ray Scanner',         use: 'Baggage Screening',                branch: 'Zanzibar Sub-HQ',      status: 'GOOD',        nextInspection: '9/5/2025',  daysUntil: -182 },
  { id: 'CCTV-ZNZ-001', name: 'CCTV Camera - Main Gate',        type: 'CCTV Camera',           use: 'Gate Surveillance',                branch: 'Zanzibar Sub-HQ',      status: 'GOOD',        nextInspection: '10/1/2025', daysUntil: -156 },
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

const totalDevices     = computed(() => devices.value.length)
const goodCount        = computed(() => devices.value.filter(d => d.status === 'GOOD').length)
const malfunctionCount = computed(() => devices.value.filter(d => d.status === 'MALFUNCTION').length)
const maintenanceCount = computed(() => devices.value.filter(d => d.status === 'MAINTENANCE').length)
</script>