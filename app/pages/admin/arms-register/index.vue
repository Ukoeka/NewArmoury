<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-5">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Arms Register</h1>
        <p class="text-sm text-slate-500">Centralized register of all firearms owned by the organization</p>
      </div>
      <button class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
        <Plus :size="14" />
        Register Firearm
      </button>
    </div>

    <!-- Tabs -->
    <div class="inline-flex bg-[#161b27] border border-[#1e2535] rounded-[10px] p-1 gap-1 mb-6">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-6 py-2 border-none rounded-[7px] text-[13.5px] font-medium cursor-pointer transition-all font-sans"
        :class="{
          'bg-[#1e2535] text-slate-100 font-semibold': activeTab === tab.id,
          'bg-transparent text-slate-500 hover:text-slate-400': activeTab !== tab.id
        }"
      >
        {{ tab.label }}
        <span v-if="tab.badge" class="bg-red-500 text-white text-[11px] font-bold rounded-full px-2 py-0.5 leading-none">
          {{ tab.badge }}
        </span>
      </button>
    </div>

    <!-- ── PENDING APPROVALS TAB ── -->
    <div v-if="activeTab === 'pending'">
      <div class="mb-5">
        <h2 class="text-[16px] font-bold text-slate-100 mb-1">Pending Approvals</h2>
        <p class="text-sm text-slate-500">Review and approve firearms registered by other BISO officers</p>
      </div>

      <div class="flex flex-col gap-4">
        <div
          v-for="item in pendingApprovals"
          :key="item.barcode"
          class="bg-[#161b27] border border-amber-500/30 rounded-xl px-6 py-5 hover:border-amber-500/60 transition-colors"
        >
          <!-- Card Header -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2.5">
              <Clock :size="16" class="text-amber-500 flex-shrink-0" />
              <span class="text-[15px] font-bold text-slate-100">{{ item.makeModel }}</span>
              <span class="text-[11px] font-medium text-slate-400 bg-[#1e2535] border border-slate-700 rounded-md px-2.5 py-1">
                Pending Approval
              </span>
            </div>
            <button class="bg-blue-600 text-white border-none rounded-lg px-5 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
              Review
            </button>
          </div>

          <!-- 4-col grid of fields -->
          <div class="grid grid-cols-4 gap-x-4 gap-y-4">
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Barcode:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.barcode }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Type:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.type }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Weapon #:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.weaponNum }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">C.A.R. #:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.carNum }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Branch:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.branch }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Status:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.status }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Registered By:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.registeredBy }}</span>
            </div>
            <div class="flex flex-col gap-1">
              <span class="text-[11.5px] text-slate-600 font-medium">Date:</span>
              <span class="text-[13.5px] font-semibold text-slate-200">{{ item.date }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── ARMS REGISTER TAB ── -->
    <div v-if="activeTab === 'register'">

      <!-- Filter Card -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-4 mb-5">
        <h3 class="text-[12px] font-semibold text-slate-500 uppercase tracking-wider mb-3.5">Filter &amp; Search</h3>
        <div class="flex gap-3 items-center">
          <div class="relative flex-[1.5]">
            <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search by barcode, model, weapon #..."
              class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select v-model="selectedBranch" class="flex-1 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
            <option value="">All Branches</option>
            <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
          </select>
          <select v-model="selectedCondition" class="flex-1 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
            <option value="">All Conditions</option>
            <option value="GOOD">Good</option>
            <option value="MALFUNCTION">Malfunction</option>
            <option value="MAINTENANCE">Maintenance</option>
          </select>
          <select v-model="selectedAvailability" class="flex-1 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
            <option value="">All Availability</option>
            <option value="ARMOURY">Armoury</option>
            <option value="DUTY">Duty</option>
          </select>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <table class="w-full border-collapse text-[13px]">
          <thead>
            <tr class="border-b border-[#1e2535]">
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide whitespace-nowrap">Barcode</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Type</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Make &amp; Model</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Weapon #</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">C.A.R. #</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Location</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Status</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Availability</th>
              <th class="px-4 py-3 text-left text-[12px] font-semibold text-slate-600 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="arm in filteredArms"
              :key="arm.barcode"
              class="border-b border-[#1a2030] hover:bg-[#1a2030] transition-colors last:border-b-0"
            >
              <td class="px-4 py-3.5 whitespace-nowrap">
                <div class="flex items-center gap-1.5 font-semibold text-slate-100">
                  {{ arm.barcode }}
                  <AlertTriangle v-if="arm.flagged" :size="13" class="text-red-500" />
                </div>
              </td>
              <td class="px-4 py-3.5 text-slate-400">{{ arm.type }}</td>
              <td class="px-4 py-3.5 font-medium text-slate-200">{{ arm.makeModel }}</td>
              <td class="px-4 py-3.5 text-slate-400">{{ arm.weaponNum }}</td>
              <td class="px-4 py-3.5 text-slate-400">{{ arm.carNum }}</td>
              <td class="px-4 py-3.5">
                <div class="flex flex-col gap-0.5">
                  <span class="font-medium text-slate-200">{{ arm.location }}</span>
                  <span class="text-[11px] text-slate-600 uppercase tracking-wide">{{ arm.sublocation }}</span>
                </div>
              </td>
              <td class="px-4 py-3.5">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide"
                  :class="{
                    'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': arm.status === 'GOOD',
                    'bg-red-950/70 text-red-400 border border-red-700/50': arm.status === 'MALFUNCTION',
                    'bg-amber-950/70 text-amber-400 border border-amber-700/50': arm.status === 'MAINTENANCE'
                  }"
                >{{ arm.status }}</span>
              </td>
              <td class="px-4 py-3.5">
                <span
                  class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide"
                  :class="{
                    'bg-[#1e2535] text-slate-400 border border-slate-700/60': arm.availability === 'ARMOURY',
                    'bg-blue-950/70 text-blue-400 border border-blue-700/50': arm.availability === 'DUTY'
                  }"
                >{{ arm.availability }}</span>
              </td>
              <td class="px-4 py-3.5">
                <div class="flex items-center gap-1">
                  <button title="View" class="p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#1e2535] transition-all cursor-pointer">
                    <Eye :size="15" />
                  </button>
                  <button title="Edit" class="px-2.5 py-1 rounded-md bg-transparent border-none text-[12.5px] font-medium text-slate-400 hover:text-slate-200 hover:bg-[#1e2535] transition-all cursor-pointer">
                    Edit
                  </button>
                  <button title="History" class="p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#1e2535] transition-all cursor-pointer">
                    <RotateCcw :size="15" />
                  </button>
                  <button
                    title="Lock/Unlock"
                    class="p-1.5 rounded-md bg-transparent border-none transition-all cursor-pointer hover:bg-[#1e2535]"
                    :class="{
                      'text-red-500 hover:text-red-400': arm.flagged,
                      'text-emerald-500 hover:text-emerald-400': !arm.flagged
                    }"
                  >
                    <Lock v-if="arm.flagged" :size="15" />
                    <Unlock v-else :size="15" />
                  </button>
                  <button title="Alert" class="p-1.5 rounded-md bg-transparent border-none text-orange-500 hover:text-orange-400 hover:bg-[#1e2535] transition-all cursor-pointer">
                    <AlertCircle :size="15" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div v-if="filteredArms.length === 0" class="py-14 text-center text-slate-600 text-sm">
          No firearms found.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed } from 'vue'
import { Search, Plus, Eye, Lock, Unlock, RotateCcw, AlertTriangle, AlertCircle, Clock } from 'lucide-vue-next'

interface Arm {
  barcode: string
  type: string
  makeModel: string
  weaponNum: string
  carNum: string
  location: string
  sublocation: string
  status: 'GOOD' | 'MALFUNCTION' | 'MAINTENANCE'
  availability: 'ARMOURY' | 'DUTY'
  flagged?: boolean
}
interface PendingApproval {
  barcode: string
  type: string
  makeModel: string
  weaponNum: string
  carNum: string
  branch: string
  status: string
  registeredBy: string
  date: string
}

const activeTab            = ref('register')
const searchQuery          = ref('')
const selectedBranch       = ref('')
const selectedCondition    = ref('')
const selectedAvailability = ref('')

const tabs = [
  { id: 'register', label: 'Arms Register' },
  { id: 'pending',  label: 'Pending Approvals', badge: 2 },
]

const branches = [
  'Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Arusha Branch',
]

const pendingApprovals = ref<PendingApproval[]>([
  { barcode: '99001', type: 'PISTOL', makeModel: 'SIG SAUER P320', weaponNum: 'SIG-P-001', carNum: 'TZC AR111801', branch: 'Dar es Salaam Sub-HQ', status: 'GOOD', registeredBy: 'E. L. Mpina', date: '06/03/2026' },
  { barcode: '99002', type: 'RIFLE',  makeModel: 'FN FAL',         weaponNum: 'FN-002',    carNum: 'TZC AR111802', branch: 'Mtwara Branch',         status: 'GOOD', registeredBy: 'E. L. Mpina', date: '06/03/2026' },
])

const arms = ref<Arm[]>([
  { barcode: '83828', type: 'PISTOL',    makeModel: 'GLOCK 17',       weaponNum: 'YFW214',   carNum: 'TZC AR111641', location: 'Dar es Salaam Sub-HQ', sublocation: 'MAIN Armoury', status: 'GOOD',        availability: 'ARMOURY' },
  { barcode: '83829', type: 'PISTOL',    makeModel: 'BERETTA',        weaponNum: 'BRT342',   carNum: 'TZC AR111642', location: 'Dar es Salaam Sub-HQ', sublocation: 'SUB Armoury',  status: 'GOOD',        availability: 'DUTY' },
  { barcode: '83830', type: 'SHORT GUN', makeModel: 'BROWNING',       weaponNum: 'BRW567',   carNum: 'TZC AR111643', location: 'Dodoma HQ',            sublocation: 'MAIN Armoury', status: 'MALFUNCTION', availability: 'ARMOURY', flagged: true },
  { barcode: '83831', type: 'PISTOL',    makeModel: 'SIG SAUER P226', weaponNum: 'SIG445',   carNum: 'TZC AR111644', location: 'Dar es Salaam Sub-HQ', sublocation: 'MAIN Armoury', status: 'GOOD',        availability: 'ARMOURY' },
  { barcode: '88392', type: 'RIFLE',     makeModel: 'AK-47',          weaponNum: 'AK47-001', carNum: 'TZC AR111701', location: 'Dar es Salaam Sub-HQ', sublocation: 'MAIN Armoury', status: 'GOOD',        availability: 'ARMOURY' },
  { barcode: '88393', type: 'PISTOL',    makeModel: 'GLOCK 19',       weaponNum: 'GLK-002',  carNum: 'TZC AR111702', location: 'Dodoma HQ',            sublocation: 'SUB Armoury',  status: 'GOOD',        availability: 'DUTY' },
  { barcode: '88394', type: 'SHORT GUN', makeModel: 'MOSSBERG 500',   weaponNum: 'MOS-003',  carNum: 'TZC AR111703', location: 'Zanzibar Sub-HQ',      sublocation: 'MAIN Armoury', status: 'MALFUNCTION', availability: 'ARMOURY', flagged: true },
  { barcode: '88395', type: 'REVOLVER',  makeModel: 'SMITH & WESSON', weaponNum: 'SW-004',   carNum: 'TZC AR111704', location: 'Mwanza Branch',        sublocation: 'MAIN Armoury', status: 'GOOD',        availability: 'ARMOURY' },
  { barcode: '88396', type: 'PISTOL',    makeModel: 'BERETTA 92FS',   weaponNum: 'BRT-005',  carNum: 'TZC AR111705', location: 'Arusha Branch',        sublocation: 'MAIN Armoury', status: 'GOOD',        availability: 'DUTY' },
])

const filteredArms = computed(() =>
  arms.value.filter(arm => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch = !q || arm.barcode.includes(q) || arm.makeModel.toLowerCase().includes(q) || arm.weaponNum.toLowerCase().includes(q)
    const matchBranch  = !selectedBranch.value       || arm.location     === selectedBranch.value
    const matchCond    = !selectedCondition.value    || arm.status       === selectedCondition.value
    const matchAvail   = !selectedAvailability.value || arm.availability === selectedAvailability.value
    return matchSearch && matchBranch && matchCond && matchAvail
  })
)
</script>