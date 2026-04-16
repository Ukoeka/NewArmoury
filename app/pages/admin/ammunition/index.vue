<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Ammunition Inventory</h1>
        <p class="text-sm text-slate-500">Track and manage ammunition stock across all branches</p>
      </div>
      <div class="flex gap-2.5 flex-wrap">
        <button
          @click="showRegisterTypeModal = true"
          class="flex items-center gap-1.5 bg-transparent text-slate-400 border border-slate-700 rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:border-blue-500 hover:text-slate-200 transition-all">
          <Settings2 :size="14" />
          Register Type
        </button>
        <button
          @click="showAddInventoryModal = true"
          class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
          <Plus :size="14" />
          Add Inventory
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="inline-flex bg-[#161b27] border border-[#1e2535] rounded-[10px] p-1 gap-1 mb-4 overflow-x-auto">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        class="flex items-center gap-2 px-6 py-2 border-none rounded-[7px] text-[13.5px] font-medium cursor-pointer transition-all whitespace-nowrap"
        :class="{
          'bg-[#1e2535] text-slate-100 font-semibold': activeTab === tab.id,
          'bg-transparent text-slate-500 hover:text-slate-400': activeTab !== tab.id
        }"
      >
        <Package :size="13" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ── INVENTORY TAB ── -->
    <div v-if="activeTab === 'inventory'">

      <!-- Stats -->
      <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <span class="text-xs text-slate-500 font-medium">Total Ammunition</span>
            <span class="text-[30px] font-bold text-slate-100 leading-none">{{ totalAmmo.toLocaleString() }}</span>
          </div>
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-950/60 text-blue-500 border border-blue-500/25 flex-shrink-0">
            <Package :size="22" />
          </div>
        </div>
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <span class="text-xs text-slate-500 font-medium">In Transit</span>
            <span class="text-[30px] font-bold text-slate-100 leading-none">{{ inTransit.toLocaleString() }}</span>
          </div>
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-950/60 text-orange-500 border border-orange-500/25 flex-shrink-0">
            <TrendingUp :size="22" />
          </div>
        </div>
        <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
          <div class="flex flex-col gap-2">
            <span class="text-xs text-slate-500 font-medium">Low Stock Alerts</span>
            <span class="text-[30px] font-bold text-slate-100 leading-none">{{ lowStockCount }}</span>
          </div>
          <div class="w-12 h-12 rounded-xl flex items-center justify-center bg-red-950/60 text-red-500 border border-red-500/25 flex-shrink-0">
            <TriangleAlert :size="22" />
          </div>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 flex gap-3 items-center mb-5">
        <select v-model="selectedBranch" class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors min-w-[160px]">
          <option value="">All Branches</option>
          <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
        </select>
        <select v-model="selectedArmoury" class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-sm text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors min-w-[160px]">
          <option value="">All Armouries</option>
          <option value="MAIN">Main</option>
          <option value="SUB">Sub</option>
        </select>
        <div class="relative flex-1">
          <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
          <input v-model="searchQuery" type="text" placeholder="Search inventory..."
            class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors" />
        </div>
      </div>

      <!-- Inventory Table -->
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <h3 class="text-sm font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535]">Current Inventory</h3>

        <div v-for="(item, index) in filteredInventory" :key="index"
          class="flex items-center px-6 py-4 border-b border-[#1a2030] hover:bg-[#1a2030]/60 transition-colors last:border-b-0">
          <div class="flex flex-col gap-1 flex-[2] min-w-0">
            <span class="text-[11px] text-slate-600 font-medium uppercase tracking-wide">Ammunition Type</span>
            <span class="text-[13.5px] font-semibold text-slate-200 truncate">{{ item.type }}</span>
          </div>
          <div class="flex flex-col gap-1 flex-[2] min-w-0 pl-4">
            <span class="text-[11px] text-slate-600 font-medium uppercase tracking-wide">Branch</span>
            <span class="text-[13.5px] font-semibold text-slate-200 truncate">{{ item.branch }}</span>
          </div>
          <div class="flex flex-col gap-1 flex-[1] pl-4">
            <span class="text-[11px] text-slate-600 font-medium uppercase tracking-wide">Location</span>
            <span class="inline-flex self-start text-[11px] font-bold text-slate-400 bg-[#1e2535] border border-slate-700/70 rounded px-2 py-0.5 tracking-widest mt-0.5">
              {{ item.location }}
            </span>
          </div>
          <div class="flex flex-col gap-1 flex-[2] pl-4">
            <span class="text-[11px] text-slate-600 font-medium uppercase tracking-wide">Batch/Lot</span>
            <span class="text-[13px] font-mono font-semibold text-slate-200">{{ item.batch }}</span>
          </div>
          <div class="flex flex-col gap-1 flex-[2] pl-4">
            <span class="text-[11px] text-slate-600 font-medium uppercase tracking-wide">Quantity</span>
            <div class="flex items-center gap-2">
              <span class="text-[14px] font-bold text-slate-100">{{ item.quantity.toLocaleString() }}</span>
              <span class="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tracking-wide" :class="stockClass(item.stockLevel)">
                {{ item.stockLevel }}
              </span>
            </div>
          </div>
          <div class="flex justify-end flex-[1] pl-4">
            <button
              @click="openAdjust(item)"
              class="flex items-center gap-1.5 text-slate-500 text-[13px] font-medium cursor-pointer px-3 py-1.5 rounded-lg border border-transparent hover:bg-[#1e2535] hover:text-slate-300 hover:border-slate-700/60 transition-all whitespace-nowrap">
              <Plus :size="13" />
              Adjust
            </button>
          </div>
        </div>

        <div v-if="filteredInventory.length === 0" class="py-14 text-center text-slate-600 text-sm">
          No inventory records found.
        </div>
      </div>
    </div>

    <!-- ── AMMUNITION TYPES TAB ── -->
    <div v-if="activeTab === 'types'">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl overflow-hidden">
        <div class="flex items-center justify-between px-6 py-4 border-b border-[#1e2535]">
          <h3 class="text-sm font-semibold text-slate-100">Ammunition Types</h3>
          <button
            @click="showRegisterTypeModal = true"
            class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors">
            <Package :size="14" />
            Register Type
          </button>
        </div>
        <div class="px-6 py-4 border-b border-[#1e2535]">
          <div class="relative">
            <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
            <input v-model="searchQuery" type="text" placeholder="Search Ammunition Types..."
              class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-sm text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors" />
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 p-6">
          <div v-for="(item, index) in filteredTypes" :key="index"
            class="bg-[#0A0E1A] border border-[#1e2535] rounded-xl p-5 hover:border-slate-600 transition-colors cursor-default">
            <div class="flex flex-col gap-2">
              <span class="text-[14px] font-semibold text-slate-100">{{ item.name }}</span>
              <span class="text-xs text-slate-500 leading-relaxed">{{ item.description }}</span>
              <div class="flex items-center gap-1.5 mt-1">
                <span class="text-[11px] text-slate-600 font-medium">Applicable firearms:</span>
                <span class="text-[11px] text-slate-400 font-semibold">{{ item.applicable }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Modals ── -->
    <RegisterAmmoTypeModal
      v-model:open="showRegisterTypeModal"
      @submit="handleRegisterType"
    />
    <AddAmmoInventoryModal
      v-model:open="showAddInventoryModal"
      :ammo-types="ammoTypeNames"
      @submit="handleAddInventory"
    />
    <AdjustInventoryModal
      v-model:open="showAdjustModal"
      :inventory="selectedInventory"
      @submit="handleAdjust"
    />

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout', middleware: ['auth'] })

import { ref, computed } from 'vue'
import { Plus, Search, Package, TrendingUp, TriangleAlert, Settings2 } from 'lucide-vue-next'
import { toast } from 'vue-sonner'
import RegisterAmmoTypeModal from '@/components/app-specific/dialogs/ammunition/RegisterAmmoType.vue'
import AddAmmoInventoryModal from '@/components/app-specific/dialogs/ammunition/AddAmmoInventory.vue'
import AdjustInventoryModal from '@/components/app-specific/dialogs/ammunition/AdjustInventory.vue'

interface InventoryItem {
  type: string; branch: string; location: string
  batch: string; quantity: number; stockLevel: 'Good' | 'Low' | 'Critical'
}
interface TypeItem {
  name: string; description: string; applicable: string
}

const activeTab      = ref('inventory')
const searchQuery    = ref('')
const selectedBranch  = ref('')
const selectedArmoury = ref('')

const tabs = [
  { id: 'inventory', label: 'Inventory' },
  { id: 'types',     label: 'Ammunition Types' },
]

const branches = ['Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch']

const inventory = ref<InventoryItem[]>([
  { type: '9mm Parabellum', branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-001', quantity: 5000,  stockLevel: 'Good' },
  { type: '9mm Parabellum', branch: 'Dar es Salaam Sub-HQ', location: 'SUB',  batch: 'BATCH2024-001', quantity: 500,   stockLevel: 'Good' },
  { type: '12 Gauge',       branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-002', quantity: 1200,  stockLevel: 'Good' },
  { type: '.45 ACP',        branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-003', quantity: 800,   stockLevel: 'Good' },
  { type: '.40 S&W',        branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-004', quantity: 600,   stockLevel: 'Good' },
  { type: '7.62x39mm',      branch: 'Dodoma HQ',            location: 'MAIN', batch: 'BATCH2024-005', quantity: 10000, stockLevel: 'Good' },
  { type: '9mm Parabellum', branch: 'Zanzibar Sub-HQ',      location: 'SUB',  batch: 'BATCH2024-006', quantity: 400,   stockLevel: 'Low' },
  { type: '12 Gauge',       branch: 'Zanzibar Sub-HQ',      location: 'MAIN', batch: 'BATCH2024-007', quantity: 350,   stockLevel: 'Low' },
  { type: '.45 ACP',        branch: 'Zanzibar Sub-HQ',      location: 'MAIN', batch: 'BATCH2024-008', quantity: 150,   stockLevel: 'Low' },
  { type: '9mm Parabellum', branch: 'Mwanza Branch',        location: 'MAIN', batch: 'BATCH2024-009', quantity: 2500,  stockLevel: 'Good' },
  { type: '12 Gauge',       branch: 'Mwanza Branch',        location: 'MAIN', batch: 'BATCH2024-010', quantity: 800,   stockLevel: 'Good' },
  { type: '.40 S&W',        branch: 'Mwanza Branch',        location: 'MAIN', batch: 'BATCH2024-011', quantity: 450,   stockLevel: 'Low' },
  { type: '9mm Parabellum', branch: 'Mtwara Branch',        location: 'MAIN', batch: 'BATCH2024-012', quantity: 2000,  stockLevel: 'Good' },
  { type: '12 Gauge',       branch: 'Mtwara Branch',        location: 'MAIN', batch: 'BATCH2024-013', quantity: 650,   stockLevel: 'Good' },
  { type: '.45 ACP',        branch: 'Mtwara Branch',        location: 'MAIN', batch: 'BATCH2024-014', quantity: 280,   stockLevel: 'Critical' },
  { type: '9mm Parabellum', branch: 'Mbeya Branch',         location: 'MAIN', batch: 'BATCH2024-015', quantity: 3000,  stockLevel: 'Good' },
  { type: '12 Gauge',       branch: 'Mbeya Branch',         location: 'MAIN', batch: 'BATCH2024-016', quantity: 900,   stockLevel: 'Good' },
])

const types = ref<TypeItem[]>([
  { name: '9mm Parabellum', description: 'Standard 9mm ammunition for pistols', applicable: 'Pistol' },
  { name: '12 Gauge',       description: 'Standard shotgun ammunition',          applicable: 'Shotgun' },
  { name: '.45 ACP',        description: '.45 caliber ammunition',               applicable: 'Pistol' },
  { name: '7.62mm',         description: '7.62mm rifle ammunition',              applicable: 'Rifle' },
  { name: '.40 S&W',        description: '.40 Smith & Wesson ammunition',        applicable: 'Pistol' },
])

// ── Computed ──
const ammoTypeNames = computed(() => types.value.map(t => t.name))

const filteredInventory = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return inventory.value.filter(item => {
    const matchBranch  = !selectedBranch.value  || item.branch   === selectedBranch.value
    const matchArmoury = !selectedArmoury.value || item.location === selectedArmoury.value
    const matchSearch  = !q || item.type.toLowerCase().includes(q) || item.batch.toLowerCase().includes(q) || item.branch.toLowerCase().includes(q)
    return matchBranch && matchArmoury && matchSearch
  })
})

const filteredTypes = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return types.value.filter(item => !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q))
})

const totalAmmo     = computed(() => inventory.value.reduce((s, i) => s + i.quantity, 0))
const inTransit     = computed(() => 200)
const lowStockCount = computed(() => inventory.value.filter(i => i.stockLevel === 'Low' || i.stockLevel === 'Critical').length)

function stockClass(level: string) {
  if (level === 'Good')     return 'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50'
  if (level === 'Low')      return 'bg-amber-950/70 text-amber-400 border border-amber-700/50'
  if (level === 'Critical') return 'bg-red-950/70 text-red-400 border border-red-700/50'
  return ''
}

// ── Modal state ──
const showRegisterTypeModal = ref(false)
const showAddInventoryModal = ref(false)
const showAdjustModal       = ref(false)
const selectedInventory     = ref<InventoryItem & { id: number } | null>(null)

function openAdjust(item: InventoryItem) {
  selectedInventory.value = { ...item, id: inventory.value.indexOf(item) }
  showAdjustModal.value = true
}

// ── Handlers ──
function handleRegisterType(data: any) {
  types.value.push({
    name:        data.name,
    description: data.description,
    applicable:  data.applicableFirearms.join(', ') || '—',
  })
  toast.success(`Ammunition type "${data.name}" registered`)
}

function handleAddInventory(data: any) {
  inventory.value.push({
    type:       data.ammoType,
    branch:     data.branch,
    location:   data.armouryLocation === 'Main Armoury' ? 'MAIN' : 'SUB',
    batch:      data.batchLot || `BATCH${new Date().getFullYear()}-NEW`,
    quantity:   Number(data.quantity),
    stockLevel: Number(data.quantity) > 500 ? 'Good' : Number(data.quantity) > 200 ? 'Low' : 'Critical',
  })
  toast.success('Ammunition inventory added successfully')
}

function handleAdjust(data: any) {
  if (!selectedInventory.value) return
  const idx = selectedInventory.value.id
  const item = inventory.value[idx]
  if (!item) return

  const delta = Number(data.quantity)
  if (data.action === 'add') {
    item.quantity += delta
  } else {
    item.quantity = Math.max(0, item.quantity - delta)
  }

  // Recalculate stock level
  item.stockLevel = item.quantity > 500 ? 'Good' : item.quantity > 200 ? 'Low' : 'Critical'

  toast.success(data.action === 'add' ? `Added ${delta} rounds to ${item.type}` : `Removed ${delta} rounds from ${item.type}`)
}
</script>