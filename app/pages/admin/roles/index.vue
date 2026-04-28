<template>
  <div class="p-4 sm:p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Roles</h1>
        <p class="text-sm text-slate-500">System-defined access roles and their assigned permissions</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Roles</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ roleList.length }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <Shield :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">System Roles</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ systemCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-purple-950/40 text-purple-400 border border-purple-500/25">
          <Lock :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Custom Roles</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ customCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <UserCog :size="22" />
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
          placeholder="Search roles..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>
    </div>

    <!-- Roles List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <div class="px-6 py-4 border-b border-[#1e2535]">
        <h3 class="text-[14px] font-semibold text-slate-100">
          All Roles <span class="text-slate-500 font-normal">({{ filteredRoles.length }})</span>
        </h3>
      </div>

      <!-- Loading skeleton -->
      <div v-if="isLoading" class="p-3 flex flex-col gap-2">
        <div v-for="i in 6" :key="i" class="h-16 bg-[#1a2030] border border-[#1e2535] rounded-xl animate-pulse" />
      </div>

      <div v-else class="p-3 flex flex-col gap-2">
        <div
          v-for="role in filteredRoles"
          :key="role.id"
          class="flex items-center gap-4 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors"
        >
          <!-- Abbreviation badge -->
          <div class="shrink-0 w-20">
            <span
              class="inline-flex items-center px-2.5 py-1 uppercase rounded-md text-[10.5px] font-bold tracking-wide border"
              :style="{
              background:  getRoleStyle(role.abbreviation).background,
              color:       getRoleStyle(role.abbreviation).color,
              borderColor: getRoleStyle(role.abbreviation).borderColor,
            }"
            >
              {{ role.abbreviation }}
            </span>
          </div>

          <!-- Name + Description -->
          <div class="flex flex-col ml-4 gap-0.5 min-w-0" style="flex: 1.5">
            <span class="text-[14px] font-semibold text-slate-100">{{ role.name }}</span>
            <span class="text-[12px] text-slate-500 truncate">{{ role.description }}</span>
          </div>

          <!-- Permissions count -->
          <div class="flex flex-col gap-0.5" style="flex: 0.6">
            <span class="text-[11px] text-slate-500 font-medium">Permissions</span>
            <span class="text-[13px] font-semibold text-slate-200">{{ role.permissions?.length ?? 0 }}</span>
          </div>

          <!-- Type badge -->
          <div class="flex flex-col gap-0.5" style="flex: 0.7">
            <span class="text-[11px] text-slate-500 font-medium">Type</span>
            <span
              class="inline-flex self-start items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold tracking-wide mt-0.5"
              :class="role.is_system
                ? 'bg-purple-950/60 text-purple-400 border border-purple-700/50'
                : 'bg-[#1e2535] text-slate-400 border border-slate-700/60'"
            >
              {{ role.is_system ? 'SYSTEM' : 'CUSTOM' }}
            </span>
          </div>

          <!-- Created -->
          <div class="flex flex-col gap-0.5" style="flex: 0.8">
            <span class="text-[11px] text-slate-500 font-medium">Created</span>
            <span class="text-[12px] text-slate-400">{{ formatDate(role.created_at) }}</span>
          </div>

          <!-- Permission slugs preview -->
          <div class="flex items-center gap-1 flex-wrap" style="flex: 1.5">
            <span
              v-for="perm in role.permissions?.slice(0, 3)"
              :key="perm.id"
              class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#0A0E1A] text-slate-500 border border-[#1e2535]"
            >
              {{ perm.slug }}
            </span>
            <span v-if="(role.permissions?.length ?? 0) > 3" class="text-[10px] text-slate-600">
              +{{ (role.permissions?.length ?? 0) - 3 }} more
            </span>
          </div>
        </div>

        <div v-if="!isLoading && filteredRoles.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No roles found.
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed, onMounted } from 'vue'
import { Search, Shield, Lock, UserCog } from 'lucide-vue-next'
import { useRole } from '~/composables/role/useRole'
import { formatDate, getRoleStyle } from '~/lib/utils'

const { roleList, isLoading, fetchRoles } = useRole()

onMounted(() => fetchRoles())

const searchQuery = ref('')

const systemCount = computed(() => roleList.value.filter(r => r.is_system).length)
const customCount = computed(() => roleList.value.filter(r => !r.is_system).length)

const filteredRoles = computed(() => {
  const q = searchQuery.value.toLowerCase()
  if (!q) return roleList.value
  return roleList.value.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.abbreviation.toLowerCase().includes(q) ||
    r.description.toLowerCase().includes(q)
  )
})



</script>
