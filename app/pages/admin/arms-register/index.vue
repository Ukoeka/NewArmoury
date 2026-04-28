<template>
  <div class="p-4 sm:p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-5">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Arms Register</h1>
        <p class="text-sm text-slate-500">Centralized register of all firearms owned by the organization</p>
      </div>
      <button
        @click="openRegister"
        class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        <Plus :size="14" />
        Register Firearm
      </button>
    </div>

    <!-- Tabs -->
    <div class="inline-flex bg-[#161b27] border border-[#1e2535] rounded-[10px] p-1 gap-1 mb-5 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-1 sm:gap-2 px-3 sm:px-5 py-1.5 sm:py-2 border-none rounded-[7px] text-[12px] sm:text-[13.5px] font-medium cursor-pointer transition-all whitespace-nowrap shrink-0"
        :class="{
          'bg-[#1e2535] text-slate-100 font-semibold': activeTab === tab.id,
          'bg-transparent text-slate-500 hover:text-slate-400': activeTab !== tab.id
        }"
      >
        {{ tab.label }}
        <span v-if="tab.id === 'pending' && pendingApprovals.length"
          class="inline-flex items-center justify-center w-4 sm:w-5 h-4 sm:h-5 rounded-full bg-red-600 text-white text-[10px] sm:text-[11px] font-bold leading-none ml-1">
          {{ pendingApprovals.length }}
        </span>
      </button>
    </div>

    <!-- ── Arms Register Tab ── -->
    <div v-if="activeTab === 'register'">
      <!-- Filter & Search -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 mb-5">
        <h3 class="text-[13.5px] font-bold text-slate-200 mb-4">Filter & Search</h3>
        <div class="flex flex-col md:flex-row md:items-center gap-3">
          <div class="relative flex-1 max-w-[320px] w-full">
            <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            <input v-model="searchQuery" type="text" placeholder="Search by barcode, model, weapon #..."
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2.5 text-[13px] text-slate-200 placeholder:text-slate-600 outline-none focus:border-blue-500/50 transition-colors" />
          </div>
          <div class="flex flex-wrap gap-3">
            <Select v-model="filterBranch">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-[13px] text-slate-300 h-[40px] focus:ring-0 w-full sm:w-[200px]">
                <SelectValue placeholder="All Branches" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem value="all" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">All Branches</SelectItem>
                <SelectItem v-for="b in branchOptions" :key="b" :value="b" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ b }}</SelectItem>
              </SelectContent>
            </Select>
            <Select v-model="filterCondition">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-[13px] text-slate-300 h-[40px] focus:ring-0 w-full sm:w-[200px]">
                <SelectValue placeholder="All Conditions" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem value="all" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">All Conditions</SelectItem>
                <SelectItem v-for="c in conditionOptions" :key="c" :value="c" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ c }}</SelectItem>
              </SelectContent>
            </Select>
            <Select v-model="filterAvailability">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-[13px] text-slate-300 h-10 focus:ring-0 w-full sm:w-[200px]">
                <SelectValue placeholder="All Availability" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem value="all" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">All Availability</SelectItem>
                <SelectItem v-for="a in availabilityOptions" :key="a" :value="a" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ a }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
        <!-- Table for medium+ screens -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full min-w-[900px]">
            <thead>
              <tr class="border-b border-[#1e2535]">
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Barcode</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Type</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Make & Model</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Weapon #</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">C.A.R. #</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Location</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Status</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Availability</th>
                <th class="text-left px-5 py-3.5 text-[12px] font-semibold text-slate-500 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="firearm in filteredFirearms" :key="firearm.id"
                class="border-b border-[#1e2535] hover:bg-[#1a2030] transition-colors">
              <td class="px-5 py-3.5">
                <div class="flex items-center gap-1.5">
                  <span class="text-[13px] font-mono text-slate-300 break-all">{{ firearm.barcode }}</span>
                  <Lock v-if="firearm.locked" :size="11" class="text-red-500" />
                </div>
              </td>
              <td class="px-5 py-3.5 text-[13px] text-slate-400 break-words">{{ firearm.fireamType.toUpperCase() }}</td>
              <td class="px-5 py-3.5 text-[13px] font-semibold text-slate-100 break-words">{{ firearm.makeModel }}</td>
              <td class="px-5 py-3.5 text-[13px] font-mono text-slate-300 break-all">{{ firearm.weaponNumber }}</td>
              <td class="px-5 py-3.5 text-[13px] font-mono text-slate-300 break-all">{{ firearm.carNumber }}</td>
                <td class="px-5 py-3.5">
                  <div class="flex flex-col gap-0.5">
                    <span class="text-[13px] text-slate-200">{{ firearm.branch }}</span>
                    <span class="text-[11.5px] text-slate-500 uppercase tracking-wide">{{ firearm.armouryLocation }}</span>
                  </div>
                </td>
                <td class="px-5 py-3.5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold"
                    :class="{
                      'bg-blue-600 text-white': firearm.conditionStatus === 'Good',
                      'bg-amber-950/70 text-amber-400 border border-amber-700/50': firearm.conditionStatus === 'Fair',
                      'bg-red-600 text-white': firearm.conditionStatus === 'Malfunction',
                      'bg-orange-950/70 text-orange-400 border border-orange-700/50': firearm.conditionStatus === 'Maintenance Required',
                    }"
                  >{{ firearm.conditionStatus.toUpperCase() }}</span>
                </td>
                <td class="px-5 py-3.5">
                  <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold"
                    :class="{
                      'bg-blue-950/60 text-blue-300 border border-blue-700/50': firearm.availability === 'ARMOURY',
                      'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50': firearm.availability === 'DUTY',
                      'bg-slate-800/60 text-slate-300 border border-slate-600/50': !['ARMOURY','DUTY'].includes(firearm.availability),
                    }"
                  >{{ firearm.availability }}</span>
                </td>
                <td class="px-5 py-3.5">
                  <div class="flex items-center gap-1">
                    <button @click="openView(firearm)" title="View"
                      class="p-1.5 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-950/30 border-none bg-transparent cursor-pointer transition-all">
                      <Eye :size="15" />
                    </button>
                    <button @click="openEdit(firearm)"
                      class="px-2.5 py-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#252f42] border-none bg-transparent cursor-pointer transition-all text-[12.5px] font-medium">
                      Edit
                    </button>
                    <button @click="openRecord(firearm)" title="Record Inspection"
                      class="p-1.5 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-950/30 border-none bg-transparent cursor-pointer transition-all">
                      <History :size="15" />
                    </button>
                    <button @click="toggleLock(firearm)" :title="firearm.locked ? 'Unlock' : 'Lock'"
                      class="p-1.5 rounded-lg border-none bg-transparent cursor-pointer transition-all"
                      :class="firearm.locked ? 'text-red-500 hover:text-red-400 hover:bg-red-950/30' : 'text-emerald-500 hover:text-emerald-400 hover:bg-emerald-950/30'">
                      <Lock v-if="firearm.locked" :size="15" />
                      <LockOpen v-else :size="15" />
                    </button>
                    <button @click="openDispose(firearm)" title="Dispose"
                      class="p-1.5 rounded-lg text-orange-500 hover:text-orange-400 hover:bg-orange-950/30 border-none bg-transparent cursor-pointer transition-all">
                      <AlertCircle :size="15" />
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredFirearms.length === 0">
                <td colspan="9" class="px-5 py-14 text-center text-slate-600 text-sm">No firearms found.</td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Cards for small screens -->
        <div class="md:hidden p-4 space-y-4">
          <div v-for="firearm in filteredFirearms" :key="firearm.id" class="bg-[#1a2030] border border-[#1e2535] rounded-xl p-4">
            <div class="flex justify-between items-start mb-2">
              <div class="flex items-center gap-2">
                <span class="font-semibold text-slate-100 font-mono">{{ firearm.barcode }}</span>
                <Lock v-if="firearm.locked" :size="14" class="text-red-500" />
              </div>
              <div class="flex gap-2">
                <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold"
                  :class="{
                    'bg-blue-600 text-white': firearm.conditionStatus === 'Good',
                    'bg-amber-950/70 text-amber-400 border border-amber-700/50': firearm.conditionStatus === 'Fair',
                    'bg-red-600 text-white': firearm.conditionStatus === 'Malfunction',
                    'bg-orange-950/70 text-orange-400 border border-orange-700/50': firearm.conditionStatus === 'Maintenance Required',
                  }"
                >{{ firearm.conditionStatus.toUpperCase() }}</span>
                <span class="inline-flex items-center px-2 py-1 rounded-md text-[11px] font-bold"
                  :class="{
                    'bg-blue-950/60 text-blue-300 border border-blue-700/50': firearm.availability === 'ARMOURY',
                    'bg-emerald-950/60 text-emerald-300 border border-emerald-700/50': firearm.availability === 'DUTY',
                    'bg-slate-800/60 text-slate-300 border border-slate-600/50': !['ARMOURY','DUTY'].includes(firearm.availability),
                  }"
                >{{ firearm.availability }}</span>
              </div>
            </div>
            <div class="space-y-1 text-sm mb-3">
              <div><span class="text-slate-500">Type:</span> <span class="font-semibold text-slate-100 break-words">{{ firearm.fireamType.toUpperCase() }}</span></div>
              <div><span class="text-slate-500">Make & Model:</span> <span class="font-semibold text-slate-100 break-words">{{ firearm.makeModel }}</span></div>
              <div><span class="text-slate-500">Weapon #:</span> <span class="font-mono text-slate-300 break-all">{{ firearm.weaponNumber }}</span></div>
              <div><span class="text-slate-500">C.A.R. #:</span> <span class="font-mono text-slate-300 break-all">{{ firearm.carNumber }}</span></div>
              <div><span class="text-slate-500">Location:</span> <span class="break-words">{{ firearm.branch }} - {{ firearm.armouryLocation }}</span></div>
            </div>
            <div class="flex gap-1 flex-wrap">
              <button @click="openView(firearm)" title="View"
                class="p-2 rounded-lg text-slate-500 hover:text-blue-400 hover:bg-blue-950/30 border-none bg-transparent cursor-pointer transition-all">
                <Eye :size="16" />
              </button>
              <button @click="openEdit(firearm)"
                class="px-3 py-1 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#252f42] border-none bg-transparent cursor-pointer transition-all text-sm font-medium">
                Edit
              </button>
              <button @click="openRecord(firearm)" title="Record Inspection"
                class="p-2 rounded-lg text-slate-500 hover:text-emerald-400 hover:bg-emerald-950/30 border-none bg-transparent cursor-pointer transition-all">
                <History :size="16" />
              </button>
              <button @click="toggleLock(firearm)" :title="firearm.locked ? 'Unlock' : 'Lock'"
                class="p-2 rounded-lg border-none bg-transparent cursor-pointer transition-all"
                :class="firearm.locked ? 'text-red-500 hover:text-red-400 hover:bg-red-950/30' : 'text-emerald-500 hover:text-emerald-400 hover:bg-emerald-950/30'">
                <Lock v-if="firearm.locked" :size="16" />
                <LockOpen v-else :size="16" />
              </button>
              <button @click="openDispose(firearm)" title="Dispose"
                class="p-2 rounded-lg text-orange-500 hover:text-orange-400 hover:bg-orange-950/30 border-none bg-transparent cursor-pointer transition-all">
                <AlertCircle :size="16" />
              </button>
            </div>
          </div>
          <div v-if="filteredFirearms.length === 0" class="py-12 text-center text-slate-600 text-sm">
            No firearms found.
          </div>
        </div>
      </div>
    </div>

    <!-- ── Pending Approvals Tab ── -->
    <div v-if="activeTab === 'pending'">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-6">
        <h2 class="text-[15px] font-bold text-slate-100 mb-1">Pending Approvals</h2>
        <p class="text-[13px] text-slate-500 mb-5">Review and approve firearms registered by other BISO officers</p>

        <div class="flex flex-col gap-4">
          <div v-for="item in pendingApprovals" :key="item.id"
            class="bg-[#0f1422] border border-orange-700/40 rounded-xl p-4 sm:p-5">
            <!-- Card header - Mobile layout -->
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4">
              <div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                <div class="flex items-center gap-3">
                  <Clock :size="16" class="text-orange-500 flex-shrink-0" />
                  <span class="text-[14px] sm:text-[14.5px] font-bold text-slate-100">{{ item.makeModel }}</span>
                </div>
                <span class="inline-flex items-center px-2 py-1 sm:px-2.5 sm:py-1 rounded-md text-[10px] sm:text-[11px] font-bold bg-orange-950/60 text-orange-400 border border-orange-700/50 self-start sm:self-center">
                  Pending Approval
                </span>
              </div>
              <button @click="openReview(item)"
                class="px-4 py-2 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors w-full sm:w-auto">
                Review
              </button>
            </div>

            <!-- Details grid - Responsive -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 sm:gap-x-8 gap-y-3 sm:gap-y-4">
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Barcode:</span>
                <span class="text-[13px] font-bold text-slate-100 break-all">{{ item.barcode }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Type:</span>
                <span class="text-[13px] font-bold text-slate-100 break-words">{{ item.fireamType.toUpperCase() }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Weapon #:</span>
                <span class="text-[13px] font-bold text-slate-100 break-all">{{ item.weaponNumber }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">C.A.R. #:</span>
                <span class="text-[13px] font-bold text-slate-100 break-all">{{ item.carNumber }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Branch:</span>
                <span class="text-[13px] font-bold text-slate-100 break-words">{{ item.branch }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Status:</span>
                <span class="text-[13px] font-bold text-slate-100 break-words">{{ item.conditionStatus.toUpperCase() }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Registered By:</span>
                <span class="text-[13px] font-bold text-slate-100 break-words">{{ item.registeredBy }}</span>
              </div>
              <div class="flex flex-col gap-1">
                <span class="text-[11.5px] text-slate-500">Date:</span>
                <span class="text-[13px] font-bold text-slate-100 break-words">{{ item.submitted }}</span>
              </div>
            </div>
          </div>

          <div v-if="pendingApprovals.length === 0" class="py-14 text-center text-slate-600 text-sm">
            No pending approvals.
          </div>
        </div>
      </div>
    </div>

    <!-- ── Modals ── -->
    <RegisterFirearm
      v-model:open="showFormModal"
      :mode="formMode"
      :initial-data="selectedFirearm ?? undefined"
      @submit="handleFormSubmit"
    />
    <FireArmDetails
      v-model:open="showDetailsModal"
      :firearm="detailsFirearm"
    />
    <RecordFireArm
      v-model:open="showInspectionModal"
      :firearm-name="selectedFirearm?.makeModel"
      @submit="handleInspectionSubmit"
    />
    <DisposeFireArm
      v-model:open="showDisposeModal"
      :firearm-label="disposeLabel"
      @confirm="handleDispose"
    />
    <ReviewFirearm
      v-model:open="showReviewModal"
      :firearm="reviewingFirearm"
      @approve="handleApprove"
      @reject="handleReject"
    />

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' , middleware: ['auth']})

import { ref, computed } from 'vue'
import { Plus, Eye, History, Lock, LockOpen, AlertCircle, Search, Clock } from 'lucide-vue-next'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'vue-sonner'
import RegisterFirearm from '@/components/app-specific/dialogs/armsregister/RegisterFireArm.vue'
import FireArmDetails from '@/components/app-specific/dialogs/armsregister/FireArmsDetails.vue'
import RecordFireArm from '@/components/app-specific/dialogs/armsregister/RecordFireArm.vue'
import DisposeFireArm from '@/components/app-specific/dialogs/armsregister/DisposeFireArm.vue'
import ReviewFirearm from '@/components/app-specific/dialogs/armsregister/ReviewFireArm.vue'

interface Firearm {
  id: number; barcode: string; makeModel: string; fireamType: string
  weaponNumber: string; carNumber: string; estimatedCost: number
  branch: string; armouryLocation: string; conditionStatus: string
  nextMaintenance: string; availability: string; locked: boolean
  lockReason?: string; dateRegistered: string; lastInspection: string
  currentLocation: string
  inspectionHistory: { type: string; date: string; findings: string }[]
}

interface PendingFirearm {
  id: number; barcode: string; makeModel: string; fireamType: string
  weaponNumber: string; carNumber: string; branch: string
  conditionStatus: string; registeredBy: string; submitted: string
}

const activeTab = ref('register')
const tabs = [
  { id: 'register', label: 'Arms Register' },
  { id: 'pending',  label: 'Pending Approvals' },
]

const searchQuery        = ref('')
const filterBranch       = ref('all')
const filterCondition    = ref('all')
const filterAvailability = ref('all')

const branchOptions       = ['Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch', 'Arusha Branch']
const conditionOptions    = ['Good', 'Fair', 'Malfunction', 'Maintenance Required']
const availabilityOptions = ['ARMOURY', 'DUTY', 'ISSUED', 'MAINTENANCE']

const firearms = ref<Firearm[]>([
  { id: 1, barcode: '83828', makeModel: 'GLOCK 17',       fireamType: 'Pistol',    weaponNumber: 'YFW214',   carNumber: 'TZC  AR111641', estimatedCost: 1500000, branch: 'Dar es Salaam Sub-HQ', armouryLocation: 'MAIN Armoury', conditionStatus: 'Good',       nextMaintenance: '2025-02-15', availability: 'ARMOURY', locked: true,  lockReason: 'Manually locked by MIS', dateRegistered: '15 Jan 2023', lastInspection: '15 Nov 2024', currentLocation: 'Dar es Salaam Sub-HQ - Main Armoury', inspectionHistory: [] },
  { id: 2, barcode: '83829', makeModel: 'BERETTA',        fireamType: 'Pistol',    weaponNumber: 'BRT342',   carNumber: 'TZC  AR111642', estimatedCost: 1200000, branch: 'Dar es Salaam Sub-HQ', armouryLocation: 'SUB Armoury',  conditionStatus: 'Good',       nextMaintenance: '2025-03-01', availability: 'DUTY',    locked: false, dateRegistered: '10 Mar 2023', lastInspection: '20 Oct 2024', currentLocation: 'Dar es Salaam Sub-HQ - SUB Armoury',  inspectionHistory: [] },
  { id: 3, barcode: '83830', makeModel: 'BROWNING',       fireamType: 'Short Gun', weaponNumber: 'BRW567',   carNumber: 'TZC  AR111643', estimatedCost: 1800000, branch: 'Dodoma HQ',            armouryLocation: 'MAIN Armoury', conditionStatus: 'Malfunction', nextMaintenance: '2025-01-10', availability: 'ARMOURY', locked: true,  lockReason: 'Manually locked by MIS', dateRegistered: '5 Jun 2022',  lastInspection: '1 Oct 2024',  currentLocation: 'Dodoma HQ - Main Armoury',            inspectionHistory: [] },
  { id: 4, barcode: '83831', makeModel: 'SIG SAUER P226', fireamType: 'Pistol',    weaponNumber: 'SIG445',   carNumber: 'TZC  AR111644', estimatedCost: 2100000, branch: 'Dar es Salaam Sub-HQ', armouryLocation: 'MAIN Armoury', conditionStatus: 'Good',       nextMaintenance: '2025-04-01', availability: 'ARMOURY', locked: false, dateRegistered: '20 Aug 2023', lastInspection: '5 Nov 2024',  currentLocation: 'Dar es Salaam Sub-HQ - Main Armoury', inspectionHistory: [] },
  { id: 5, barcode: '88392', makeModel: 'AK-47',          fireamType: 'Rifle',     weaponNumber: 'AK47-001', carNumber: 'TZC  AR111701', estimatedCost: 3000000, branch: 'Dar es Salaam Sub-HQ', armouryLocation: 'MAIN Armoury', conditionStatus: 'Good',       nextMaintenance: '2025-05-01', availability: 'ARMOURY', locked: false, dateRegistered: '1 Jan 2023',  lastInspection: '10 Nov 2024', currentLocation: 'Dar es Salaam Sub-HQ - Main Armoury', inspectionHistory: [] },
  { id: 6, barcode: '88393', makeModel: 'GLOCK 19',       fireamType: 'Pistol',    weaponNumber: 'GLK-002',  carNumber: 'TZC  AR111702', estimatedCost: 1400000, branch: 'Dodoma HQ',            armouryLocation: 'SUB Armoury',  conditionStatus: 'Good',       nextMaintenance: '2025-05-15', availability: 'DUTY',    locked: false, dateRegistered: '15 Feb 2023', lastInspection: '15 Nov 2024', currentLocation: 'Dodoma HQ - SUB Armoury',             inspectionHistory: [] },
  { id: 7, barcode: '88394', makeModel: 'MOSSBERG 500',   fireamType: 'Short Gun', weaponNumber: 'MOS-003',  carNumber: 'TZC  AR111703', estimatedCost: 1600000, branch: 'Zanzibar Sub-HQ',      armouryLocation: 'MAIN Armoury', conditionStatus: 'Malfunction', nextMaintenance: '2025-02-01', availability: 'ARMOURY', locked: true,  lockReason: 'Manually locked by MIS', dateRegistered: '10 Apr 2023', lastInspection: '1 Nov 2024',  currentLocation: 'Zanzibar Sub-HQ - Main Armoury',      inspectionHistory: [] },
  { id: 8, barcode: '88395', makeModel: 'SMITH & WESSON', fireamType: 'Revolver',  weaponNumber: 'SW-004',   carNumber: 'TZC  AR111704', estimatedCost: 1100000, branch: 'Mwanza Branch',        armouryLocation: 'MAIN Armoury', conditionStatus: 'Good',       nextMaintenance: '2025-06-01', availability: 'ARMOURY', locked: false, dateRegistered: '5 May 2023',  lastInspection: '20 Oct 2024', currentLocation: 'Mwanza Branch - Main Armoury',        inspectionHistory: [] },
  { id: 9, barcode: '88396', makeModel: 'BERETTA 92FS',   fireamType: 'Pistol',    weaponNumber: 'BRT-005',  carNumber: 'TZC  AR111705', estimatedCost: 1300000, branch: 'Arusha Branch',        armouryLocation: 'MAIN Armoury', conditionStatus: 'Good',       nextMaintenance: '2025-06-15', availability: 'DUTY',    locked: false, dateRegistered: '20 Jun 2023', lastInspection: '25 Oct 2024', currentLocation: 'Arusha Branch - Main Armoury',        inspectionHistory: [] },
])

const pendingApprovals = ref<PendingFirearm[]>([
  { id: 101, barcode: '99001', makeModel: 'SIG SAUER P320', fireamType: 'Pistol', weaponNumber: 'SIG-P-001', carNumber: 'TZC  AR111801', branch: 'Dar es Salaam Sub-HQ', conditionStatus: 'Good', registeredBy: 'E. L. Mpina', submitted: '10/03/2026' },
  { id: 102, barcode: '99002', makeModel: 'FN FAL',         fireamType: 'Rifle',  weaponNumber: 'FN-002',    carNumber: 'TZC  AR111802', branch: 'Mtwara Branch',        conditionStatus: 'Good', registeredBy: 'E. L. Mpina', submitted: '10/03/2026' },
])

const filteredFirearms = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return firearms.value.filter(f => {
    const matchSearch = !q || f.barcode.toLowerCase().includes(q) || f.makeModel.toLowerCase().includes(q) || f.weaponNumber.toLowerCase().includes(q)
    const matchBranch = filterBranch.value === 'all' || f.branch === filterBranch.value
    const matchCond   = filterCondition.value === 'all' || f.conditionStatus === filterCondition.value
    const matchAvail  = filterAvailability.value === 'all' || f.availability === filterAvailability.value
    return matchSearch && matchBranch && matchCond && matchAvail
  })
})

// Modal state
const showFormModal       = ref(false)
const showDetailsModal    = ref(false)
const showInspectionModal = ref(false)
const showDisposeModal    = ref(false)
const showReviewModal     = ref(false)
const formMode            = ref<'add' | 'edit'>('add')
const selectedFirearm     = ref<Partial<Firearm> & { id?: number } | null>(null)
const detailsFirearm      = ref<Firearm | null>(null)
const reviewingFirearm    = ref<PendingFirearm | null>(null)
const disposeLabel        = ref('')
const disposeId           = ref<number | null>(null)

function openRegister() { formMode.value = 'add'; selectedFirearm.value = null; showFormModal.value = true }
function openEdit(f: Firearm) { formMode.value = 'edit'; selectedFirearm.value = { ...f }; showFormModal.value = true }
function openView(f: Firearm) { detailsFirearm.value = f; showDetailsModal.value = true }
function openRecord(f: Firearm) { selectedFirearm.value = f; showInspectionModal.value = true }
function openDispose(f: Firearm) { disposeId.value = f.id; disposeLabel.value = `${f.makeModel} - ${f.weaponNumber}`; showDisposeModal.value = true }
function openReview(item: PendingFirearm) { reviewingFirearm.value = item; showReviewModal.value = true }

function toggleLock(f: Firearm) {
  f.locked = !f.locked
  f.lockReason = f.locked ? 'Manually locked by MIS' : undefined
  f.locked ? toast.success('Firearm locked successfully') : toast.info('Firearm unlocked successfully')
}

function handleApprove(id: number) {
  const item = pendingApprovals.value.find(p => p.id === id)
  if (item) {
    const newId = Math.max(0, ...firearms.value.map(f => f.id)) + 1
    firearms.value.push({
      id: newId, barcode: item.barcode, makeModel: item.makeModel, fireamType: item.fireamType,
      weaponNumber: item.weaponNumber, carNumber: item.carNumber, estimatedCost: 0,
      branch: item.branch, armouryLocation: 'MAIN Armoury', conditionStatus: item.conditionStatus,
      nextMaintenance: '', availability: 'ARMOURY', locked: false,
      dateRegistered: item.submitted, lastInspection: '—',
      currentLocation: `${item.branch} - MAIN Armoury`, inspectionHistory: [],
    })
    pendingApprovals.value = pendingApprovals.value.filter(p => p.id !== id)
    toast.success(`${item.makeModel} approved and added to register`)
  }
}

function handleReject(id: number, reason: string) {
  const item = pendingApprovals.value.find(p => p.id === id)
  pendingApprovals.value = pendingApprovals.value.filter(p => p.id !== id)
  toast.error(`${item?.makeModel} registration rejected`)
}

function handleFormSubmit(data: any) {
  if (formMode.value === 'add') {
    const newId = Math.max(0, ...firearms.value.map(f => f.id)) + 1
    firearms.value.push({
      id: newId, barcode: data.barcode, makeModel: data.makeModel, fireamType: data.fireamType,
      weaponNumber: data.weaponNumber, carNumber: data.carNumber, estimatedCost: data.estimatedCost,
      branch: data.branch, armouryLocation: data.armouryLocation, conditionStatus: data.conditionStatus,
      nextMaintenance: data.nextMaintenance, availability: 'ARMOURY', locked: false,
      dateRegistered: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lastInspection: '—', currentLocation: `${data.branch} - ${data.armouryLocation}`, inspectionHistory: [],
    })
    toast.success('Firearm registered and submitted for approval')
  } else {
    const idx = firearms.value.findIndex(f => f.id === selectedFirearm.value?.id)
    if (idx !== -1) { firearms.value[idx] = { ...firearms.value[idx], ...data }; toast.success('Firearm updated and submitted for re-approval') }
  }
}

function handleInspectionSubmit(data: any) {
  const f = firearms.value.find(f => f.id === selectedFirearm.value?.id)
  if (f) {
    f.conditionStatus = data.conditionAfter
    f.lastInspection = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    f.nextMaintenance = data.nextMaintenance
    f.inspectionHistory.unshift({ type: data.inspectionType, date: f.lastInspection, findings: data.findings || 'No findings recorded' })
    toast.success('Inspection record saved successfully')
  }
}

function handleDispose() {
  firearms.value = firearms.value.filter(f => f.id !== disposeId.value)
  toast.info('Firearm marked as disposed')
}
</script>