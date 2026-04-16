<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Branches</h1>
        <p class="text-sm text-slate-500">Manage organisational branches and office locations</p>
      </div>
      <button
        @click="openAdd"
        class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        <Plus :size="14" />
        Add Branch
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Branches</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ total }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <Building2 :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Head Office</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.head_office }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-purple-950/40 text-purple-400 border border-purple-500/25">
          <Star :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Sub-HQ</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.sub_hq }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-cyan-950/40 text-cyan-400 border border-cyan-500/25">
          <GitBranch :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Regional Branches</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.branch }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <MapPin :size="22" />
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
          placeholder="Search by name or location..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <select
        v-model="branchFilter" 
        class="min-w-36 bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none"
      >
        <option value="">All Types</option>
        <option value="head_office">Head Office</option>
        <option value="sub_hq">Sub-HQ</option>
        <option value="branch">Branch</option>
      </select>
    </div>

    <!-- Branch List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <h3 class="text-[14px] font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0">
        All Branches ({{ branchList.length }})
      </h3>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="p-3 flex flex-col gap-2">
        <div v-for="n in 4" :key="n" class="h-17 bg-[#1a2030] border border-[#1e2535] rounded-xl animate-pulse" />
      </div>

      <div v-else class="p-3 flex flex-col gap-2">
        <div
          v-for="item in branchList"
          :key="item.id"
          class="flex items-center gap-4 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors"
        >
          <div class="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" :class="typeIcon(item.type).bg">
            <component :is="typeIcon(item.type).icon" :size="18" :class="typeIcon(item.type).color" />
          </div>
          <div class="flex flex-col gap-0.5 min-w-0" style="flex: 1.5">
            <span class="text-[11px] text-slate-500 font-medium">Branch Name</span>
            <span class="text-[14px] font-bold text-slate-100">{{ item.name }}</span>
          </div>
          <div class="flex flex-col gap-0.5 min-w-0" style="flex: 1.2">
            <span class="text-[11px] text-slate-500 font-medium">Location</span>
            <span class="text-[13px] text-slate-400">{{ item.location }}</span>
          </div>
          <div class="flex flex-col gap-0.5" style="flex: 0.8">
            <span class="text-[11px] text-slate-500 font-medium">Type</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide border mt-0.5" :class="typeBadge(item.type)">
              {{ typeLabel(item.type) }}
            </span>
          </div>
          <div class="flex flex-col gap-0.5 min-w-0" style="flex: 0.9">
            <span class="text-[11px] text-slate-500 font-medium">Created</span>
            <span class="text-[13px] text-slate-400">{{ formatDate(item.created_at) }}</span>
          </div>
          <div class="flex items-center ml-auto shrink-0 gap-1">
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

        <div v-if="branchList.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No branches found.
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1" class="flex items-center justify-between px-5 py-4 border-t border-[#1e2535]">
        <span class="text-[12px] text-slate-500">
          Page {{ currentPage }} of {{ totalPages }} · {{ total }} total
        </span>
        <Pagination
          v-model:page="currentPage"
          :total="total"
          :items-per-page="pageSize"
          :sibling-count="1"
          show-edges
          class="mx-0 w-auto justify-end"
          @update:page="fetchBranches"
        >
          <PaginationContent v-slot="{ items }">
            <PaginationFirst />
            <PaginationPrev />
            <template v-for="(item, idx) in items" :key="item.type === 'page' ? item.value : `ellipsis-${idx}`">
              <PaginationItem v-if="item.type === 'page'" :value="item.value" :is-active="item.value === currentPage">
                {{ item.value }}
              </PaginationItem>
              <PaginationEllipsis v-else />
            </template>
            <PaginationNext />
            <PaginationLast />
          </PaginationContent>
        </Pagination>
      </div>
    </div>

    <!-- Branch Modal -->
    <BranchModal
      :is-open="showModal"
      :initial="editingBranch"
      @update:is-open="showModal = $event"
      @confirm="handleConfirm"
    />

    <!-- Delete Confirm Dialog -->
    <Dialog :open="showDeleteDialog" @update:open="showDeleteDialog = $event">
      <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-sm rounded-xl shadow-2xl" hide-close>
        <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
          <div class="flex items-start gap-4">
            <div class="w-10 h-10 rounded-xl bg-red-950/40 border border-red-900/40 flex items-center justify-center shrink-0">
              <Trash2 :size="18" class="text-red-500" />
            </div>
            <div>
              <DialogTitle class="text-[16px] font-bold text-slate-100 mb-1">Delete Branch</DialogTitle>
              <DialogDescription class="text-[13px] text-slate-500 m-0">
                This action cannot be undone.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div class="px-6 py-4">
          <p class="text-[13px] text-slate-400 leading-relaxed">
            Are you sure you want to delete
            <span class="font-semibold text-slate-200">{{ currentBranch?.name }}</span>?
            All associated data may be affected.
          </p>
        </div>
        <div class="px-6 pb-6 pt-2 flex gap-3 justify-end border-t border-[#1e2535]">
          <Button
            @click="showDeleteDialog = false"
            class="px-4 py-2 rounded-lg text-[13px] font-semibold text-slate-400 bg-transparent border border-[#1e2535] hover:border-slate-600 hover:text-slate-200 transition-colors cursor-pointer"
          >
            Cancel
          </Button>
          <Button
            :disabled="isLoading"
            @click="deleteBranch"
            class="px-4 py-2 rounded-lg text-[13px] font-semibold text-white bg-red-600 hover:bg-red-500 border-none transition-colors cursor-pointer disabled:opacity-50"
          >
            {{ isLoading ? 'Deleting…' : 'Delete Branch' }}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout', middleware: ['auth', 'permission'] })

import { onMounted } from 'vue'
import { Plus, Search, Building2, Star, GitBranch, MapPin, PenSquare, Trash2 } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import {
  Pagination, PaginationContent, PaginationEllipsis,
  PaginationFirst, PaginationItem, PaginationLast,
  PaginationNext, PaginationPrev,
} from '@/components/ui/pagination'
import BranchModal from '@/components/app-specific/dialogs/branch/BranchModal.vue'
import { useBranch } from '~/composables/branch/useBranch'
import { formatDate, typeBadge, typeIcon, typeLabel } from '~/lib/utils'

const {
  branchList, searchQuery, branchFilter,
  stats, isLoading, total, totalPages,
  currentPage, pageSize, currentBranch,
  editingBranch, showModal, showDeleteDialog,
  fetchBranches, openAdd, openEdit,
  promptDelete, handleConfirm, deleteBranch,
} = useBranch()

onMounted(() => fetchBranches(1))
</script>