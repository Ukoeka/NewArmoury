<template>
  <div class="p-4 sm:p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Locations</h1>
        <p class="text-sm text-slate-500">Manage in-office and out-of-office locations for firearm deployment</p>
      </div>
      <button
        @click="openAdd"
        class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        <Plus :size="14" />
        Add Location
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Locations</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.total }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <MapPin :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">In-Office</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.in_office }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <Building2 :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Out-of-Office</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.out_of_office }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-orange-950/40 text-orange-500 border border-orange-500/25">
          <MapPinOff :size="22" />
        </div>
      </div>
    </div>

    <!-- Search + Tabs -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center mb-5">
      <!-- Search -->
      <div class="relative flex-1">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or area..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <!-- Tabs -->
      <div class="inline-flex bg-[#0A0E1A] border border-[#1e2535] rounded-lg p-1 gap-1 shrink-0 overflow-x-auto">
        <Button
          v-for="tab in tabs"
          :key="tab.value"
          @click="setTab(tab.value)"
          class="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 rounded-md text-[12px] sm:text-[12.5px] font-medium cursor-pointer border-none transition-all whitespace-nowrap shrink-0"
          :class="locationFilter === tab.value
            ? 'bg-[#1e2535] text-slate-100 font-semibold'
            : 'bg-transparent text-slate-500 hover:text-slate-400'"
        >
          <component :is="tab.icon" :size="13" />
          <span class="hidden xs:inline">{{ tab.label }}</span>
          <span class="xs:hidden">IN</span>
          <span
            class="text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none"
            :class="locationFilter === tab.value
              ? 'bg-blue-600/30 text-blue-400'
              : 'bg-[#1e2535] text-slate-500'"
          >
            {{ tab.count }}
          </span>
        </Button>
      </div>
    </div>

    <!-- List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <h3 class="text-[14px] font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0 flex items-center justify-between">
        <span>
          {{ tabs.find(t => t.value === locationFilter)?.label ?? 'All' }}
        </span>
        <span class="text-[12px] text-slate-500 font-normal">{{ total }} total</span>
      </h3>

      <!-- Skeleton -->
      <div v-if="isLoading" class="p-3 flex flex-col gap-2">
        <div v-for="n in 4" :key="n" class="h-16 bg-[#1a2030] border border-[#1e2535] rounded-xl animate-pulse" />
      </div>

      <div v-else class="p-3 flex flex-col gap-2">
        <div
          v-for="item in locationList"
          :key="item.id"
          class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors"
        >
          <!-- Mobile: Icon and primary info together -->
          <div class="flex items-center gap-3 sm:hidden">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
              :class="typeStyle(item.type).bg"
            >
              <component :is="typeStyle(item.type).icon" :size="18" :class="typeStyle(item.type).color" />
            </div>
            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-[14px] font-bold text-slate-100">{{ item.name }}</span>
              <span class="text-[13px] text-slate-400">{{ item.specific_area }}</span>
            </div>
            <div class="flex items-center gap-1 shrink-0">
              <span
                class="inline-flex items-center px-2 py-1 rounded-md text-[10px] font-bold tracking-wide border"
                :class="typeStyle(item.type).badge"
              >
                {{ typeStyle(item.type).label }}
              </span>
              <button @click="openEdit(item)" title="Edit"
                class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer">
                <PenSquare :size="15" />
              </button>
              <button @click="promptDelete(item)" title="Delete"
                class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-red-400 hover:bg-red-950/30 transition-all cursor-pointer">
                <Trash2 :size="15" />
              </button>
            </div>
          </div>

          <!-- Desktop: Full layout -->
          <div class="hidden sm:flex sm:items-center gap-4 w-full">
            <div
              class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border"
              :class="typeStyle(item.type).bg"
            >
              <component :is="typeStyle(item.type).icon" :size="18" :class="typeStyle(item.type).color" />
            </div>

            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-[11px] text-slate-500 font-medium">Name</span>
              <span class="text-[14px] font-bold text-slate-100">{{ item.name }}</span>
            </div>

            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-[11px] text-slate-500 font-medium">Specific Area</span>
              <span class="text-[13px] text-slate-400">{{ item.specific_area }}</span>
            </div>

            <div class="flex flex-col gap-0.5 min-w-0 flex-1">
              <span class="text-[11px] text-slate-500 font-medium">Branch</span>
              <span class="text-[13px] text-slate-400">{{ item.branch?.name ?? '—' }}</span>
            </div>

            <div class="flex flex-col gap-0.5 flex-1">
              <span class="text-[11px] text-slate-500 font-medium">Type</span>
              <span
                class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border mt-0.5"
                :class="typeStyle(item.type).badge"
              >
                {{ typeStyle(item.type).label }}
              </span>
            </div>

            <div class="flex items-center shrink-0 gap-1">
              <button @click="openEdit(item)" title="Edit"
                class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer">
                <PenSquare :size="15" />
              </button>
              <button @click="promptDelete(item)" title="Delete"
                class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-red-400 hover:bg-red-950/30 transition-all cursor-pointer">
                <Trash2 :size="15" />
              </button>
            </div>
          </div>
        </div>

        <div v-if="locationList.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No locations found.
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-4 border-t border-[#1e2535]">
        <span class="text-[12px] text-slate-500 text-center sm:text-left">
          Page {{ currentPage }} of {{ totalPages }} · {{ total }} total
        </span>
        <Pagination
          v-model:page="currentPage"
          :total="total"
          :items-per-page="pageSize"
          :sibling-count="0"
          :show-edges="false"
          class="mx-0 w-full sm:w-auto justify-center sm:justify-end"
          @update:page="fetchLocations"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationPrev />
            <template v-for="(item, idx) in items" :key="item.type === 'page' ? item.value : `ellipsis-${idx}`">
              <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === currentPage">
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else />
            </template>
            <PaginationNext />
          </PaginationContent>
        </Pagination>
      </div>
    </div>

    <!-- Location Modal -->
    <LocationModal
      :is-open="showModal"
      :initial="editingLocation"
      @update:is-open="showModal = $event"
      @confirm="handleConfirm"
    />

    <!-- Delete Dialog -->
    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-sm rounded-xl shadow-2xl" hide-close>
        <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center shrink-0">
              <Trash2 :size="18" class="text-red-500" />
            </div>
            <div>
              <DialogTitle class="text-[16px] font-bold text-slate-100 mb-1">Delete Location</DialogTitle>
              <DialogDescription class="text-[13px] text-slate-500 m-0">This action cannot be undone.</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div class="px-6 py-4">
          <p class="text-[13px] text-slate-400 leading-relaxed">
            Are you sure you want to delete
            <span class="font-semibold text-slate-200">{{ currentLocation?.name }}</span>?
          </p>
        </div>
        <div class="px-6 pb-6 pt-2 flex gap-3 justify-end border-t border-[#1e2535]">
          <Button @click="showDeleteDialog = false"
            class="px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-400 bg-transparent border border-[#1e2535] hover:border-slate-600 hover:text-slate-200 transition-colors cursor-pointer">
            Cancel
          </Button>
          <Button :disabled="isLoading" @click="deleteLocation"
            class="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-red-600 hover:bg-red-500 border-none transition-colors cursor-pointer disabled:opacity-50">
            {{ isLoading ? 'Deleting…' : 'Delete Location' }}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'permission'] })

import { computed, onMounted } from 'vue'
import { Plus, Search, MapPin, MapPinOff, Building2, Tent, PenSquare, Trash2 } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationFirst, PaginationItem, PaginationLast,
  PaginationNext, PaginationPrev,
} from '@/components/ui/pagination'
import LocationModal from '@/components/app-specific/dialogs/LocationModal.vue'
import { useLocation } from '~/composables/location/useLocation'
import { LocationType } from '~/lib/models/Location'

const {
  locationList, searchQuery, locationFilter,
  stats, isLoading, total, totalPages,
  currentPage, pageSize, currentLocation,
  editingLocation, showModal, showDeleteDialog,
  fetchLocations, openAdd, openEdit,
  promptDelete, handleConfirm, deleteLocation,
} = useLocation()

onMounted(() => fetchLocations(1))


const tabs = computed(() => [
  {
    value: LocationType.IN_OFFICE,
    label: 'IN OFFICE',
    icon:  Building2,
    count: stats.value.in_office,
  },
  {
    value: LocationType.OUT_OFFICE,
    label: 'OUT OF OFFICE',
    icon:  MapPinOff,
    count: stats.value.out_of_office,
  },
])

function setTab(val: LocationType) {
  // toggle off if same tab clicked
  locationFilter.value = locationFilter.value === val ? '' : val
}

function typeStyle(type: string) {
  switch (type) {
    case LocationType.IN_OFFICE:
      return {
        icon:  Building2,
        color: 'text-emerald-500',
        bg:    'bg-emerald-950/40 border-emerald-500/25',
        badge: 'text-emerald-400 bg-emerald-950/40 border-emerald-500/25',
        label: 'In-Office',
      }
    case LocationType.OUT_OFFICE:
      return {
        icon:  MapPinOff,
        color: 'text-orange-500',
        bg:    'bg-orange-950/40 border-orange-500/25',
        badge: 'text-orange-400 bg-orange-950/40 border-orange-500/25',
        label: 'Out-of-Office',
      }
    default:
      return {
        icon:  Tent,
        color: 'text-blue-500',
        bg:    'bg-blue-950/40 border-blue-500/25',
        badge: 'text-blue-400 bg-blue-950/40 border-blue-500/25',
        label: 'Field',
      }
  }
}

</script>