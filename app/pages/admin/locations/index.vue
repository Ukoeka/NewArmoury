<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-5">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Use Locations</h1>
        <p class="text-sm text-slate-500">Manage in-office and out-of-office locations for firearm deployment</p>
      </div>
      <button
        @click="openAddModal"
        class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        <Plus :size="14" />
        Add Location
      </button>
    </div>

    <!-- Search Bar -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 mb-5">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search by category or area..."
        class="w-full bg-transparent border-none outline-none text-[13.5px] text-slate-200 placeholder-slate-600"
      />
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-xs text-slate-500 font-medium">Total Locations</span>
          <span class="text-[30px] font-bold text-slate-100 leading-none">{{ totalLocations }}</span>
        </div>
        <MapPin :size="32" class="text-blue-500 flex-shrink-0" />
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-xs text-slate-500 font-medium">In-Office</span>
          <span class="text-[30px] font-bold text-slate-100 leading-none">{{ inOfficeCount }}</span>
        </div>
        <MapPin :size="32" class="text-emerald-500 flex-shrink-0" />
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-2">
          <span class="text-xs text-slate-500 font-medium">Out-of-Office</span>
          <span class="text-[30px] font-bold text-slate-100 leading-none">{{ outOfOfficeCount }}</span>
        </div>
        <MapPin :size="32" class="text-orange-500 flex-shrink-0" />
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="inline-flex bg-[#161b27] border border-[#1e2535] rounded-[10px] p-1 gap-1 mb-4">
      <button
        v-for="tab in filterTabs"
        :key="tab.id"
        @click="activeFilter = tab.id"
        class="flex items-center gap-2 px-6 py-2 border-none rounded-[7px] text-[13.5px] font-medium cursor-pointer transition-all"
        :class="{
          'bg-[#1e2535] text-slate-100 font-semibold': activeFilter === tab.id,
          'bg-transparent text-slate-500 hover:text-slate-400': activeFilter !== tab.id
        }"
      >
        <MapPin :size="13" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Locations List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-3 flex flex-col gap-2">
      <div
        v-for="loc in filteredLocations"
        :key="loc.id"
        class="flex items-center justify-between bg-[#1a2030] border border-[#1e2535] rounded-xl px-5 py-4 hover:border-slate-600/50 transition-colors"
      >
        <div class="flex flex-col gap-1.5">
          <div class="flex items-center gap-3">
            <span class="text-[14.5px] font-bold text-slate-100">{{ loc.branch }}</span>
            <span class="text-[13px] text-slate-500">{{ loc.area }}</span>
          </div>
          <span class="text-xs text-slate-600">Added {{ loc.addedDate }}</span>
        </div>

        <div class="flex items-center gap-1">
          <button
            @click="openEditModal(loc)"
            title="Edit"
            class="flex items-center justify-center p-2 rounded-lg bg-transparent border-none text-slate-500 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer"
          >
            <PenSquare :size="15" />
          </button>
          <button
            @click="deleteLocation(loc.id)"
            title="Delete"
            class="flex items-center justify-center p-2 rounded-lg bg-transparent border-none text-red-500 hover:text-red-400 hover:bg-red-950/40 transition-all cursor-pointer"
          >
            <XCircle :size="16" />
          </button>
        </div>
      </div>

      <div v-if="filteredLocations.length === 0" class="py-14 text-center text-slate-600 text-sm">
        No locations found.
      </div>
    </div>

    <!-- Add Location Modal -->
    <LocationModal
      v-model:open="showAddModal"
      mode="add"
      @submit="handleAddLocation"
    />

    <!-- Edit Location Modal -->
    <LocationModal
      v-model:open="showEditModal"
      mode="edit"
      :initial-data="editingLocation ?? undefined"
      @submit="handleEditLocation"
    />

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed } from 'vue'
import { Plus, MapPin, PenSquare, XCircle } from 'lucide-vue-next'
import LocationModal from '@/components/app-specific/dialogs/LocationModal.vue'

interface Location {
  id: number
  branch: string
  area: string
  addedDate: string
  type: 'in-office' | 'out-of-office'
}

interface LocationForm {
  locationType: string
  branch: string
  specificArea: string
}

const searchQuery  = ref('')
const activeFilter = ref('in-office')

const filterTabs = [
  { id: 'in-office',     label: 'In-Office (3)' },
  { id: 'out-of-office', label: 'Out-of-Office (2)' },
]

const locations = ref<Location[]>([
  { id: 1, branch: 'Dar es Salaam Sub-HQ', area: 'Main Entrance',  addedDate: '1/1/2024', type: 'in-office' },
  { id: 2, branch: 'Dar es Salaam Sub-HQ', area: 'Server Room',    addedDate: '1/1/2024', type: 'in-office' },
  { id: 3, branch: 'Dodoma HQ',            area: 'Executive Wing', addedDate: '1/1/2024', type: 'in-office' },
  { id: 4, branch: 'Zanzibar Sub-HQ',      area: 'Field Post A',   addedDate: '1/1/2024', type: 'out-of-office' },
  { id: 5, branch: 'Mwanza Branch',        area: 'Patrol Zone 3',  addedDate: '1/1/2024', type: 'out-of-office' },
])

// ── Modal state ──
const showAddModal    = ref(false)
const showEditModal   = ref(false)
const editingLocation = ref<Partial<LocationForm> & { id?: number } | null>(null)

function openAddModal() {
  showAddModal.value = true
}

function openEditModal(loc: Location) {
  editingLocation.value = {
    id:           loc.id,
    locationType: loc.type === 'in-office' ? 'In-Office' : 'Out-of-Office',
    branch:       loc.branch,
    specificArea: loc.area,
  }
  showEditModal.value = true
}

function handleAddLocation(data: LocationForm) {
  const newId = Math.max(0, ...locations.value.map(l => l.id)) + 1
  locations.value.push({
    id:        newId,
    branch:    data.branch,
    area:      data.specificArea,
    addedDate: new Date().toLocaleDateString(),
    type:      data.locationType === 'In-Office' ? 'in-office' : 'out-of-office',
  })
}

function handleEditLocation(data: LocationForm) {
  const id = editingLocation.value?.id
  if (!id) return
  const idx = locations.value.findIndex(l => l.id === id)
  if (idx === -1) return
  locations.value[idx] = {
    ...locations.value[idx],
    branch: data.branch,
    area:   data.specificArea,
    type:   data.locationType === 'In-Office' ? 'in-office' : 'out-of-office',
  }
}

function deleteLocation(id: number) {
  locations.value = locations.value.filter(l => l.id !== id)
}

// ── Computed ──
const filteredLocations = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return locations.value.filter(loc => {
    const matchType   = loc.type === activeFilter.value
    const matchSearch = !q || loc.branch.toLowerCase().includes(q) || loc.area.toLowerCase().includes(q)
    return matchType && matchSearch
  })
})

const totalLocations   = computed(() => locations.value.length)
const inOfficeCount    = computed(() => locations.value.filter(l => l.type === 'in-office').length)
const outOfOfficeCount = computed(() => locations.value.filter(l => l.type === 'out-of-office').length)
</script>