<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Permissions</h1>
        <p class="text-sm text-slate-500">All system permissions grouped by category · {{ allPermissions.length }} total</p>
      </div>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Permissions</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ allPermissions.length }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <Key :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Categories</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ categories.length }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-purple-950/40 text-purple-400 border border-purple-500/25">
          <LayoutGrid :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Roles</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ roleList.length }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <Shield :size="22" />
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
          placeholder="Search by name or slug..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <select
        v-model="categoryFilter"
        class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none min-w-44"
      >
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">{{ cat.replace('_', ' ') }}</option>
      </select>
    </div>

    <!-- Loading -->
    <div v-if="isLoading" class="flex flex-col gap-3">
      <div v-for="i in 4" :key="i" class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 animate-pulse h-24" />
    </div>

    <!-- Permissions by Category -->
    <div v-else-if="filteredGroups.length > 0" class="flex flex-col gap-4">
      <div
        v-for="group in filteredGroups"
        :key="group.category"
        class="bg-[#161b27] border border-[#1e2535] rounded-xl"
      >
        <!-- Category Header -->
        <div class="flex items-center gap-2.5 px-5 py-4 border-b border-[#1e2535]">
          <div class="w-2 h-2 rounded-full bg-blue-500 shrink-0"></div>
          <h3 class="text-[14px] font-semibold text-slate-100 capitalize">
            {{ group.category.replace('_', ' ') }}
          </h3>
          <span class="text-[11px] text-slate-500 bg-[#1a2030] border border-[#1e2535] rounded-full px-2 py-0.5">
            {{ group.permissions.length }}
          </span>
        </div>

        <!-- Permission rows -->
        <div class="p-3 flex flex-col gap-2">
          <div
            v-for="perm in group.permissions"
            :key="perm.id"
            class="flex items-center gap-4 px-5 py-3.5 bg-[#1a2030] border border-[#1e2535] rounded-xl"
          >
            <!-- Name + slug -->
            <div class="flex flex-col gap-0.5" style="flex: 1.5; min-width: 0">
              <span class="text-[13.5px] font-semibold text-slate-100">{{ perm.name }}</span>
              <span class="text-[11px] text-slate-500 font-mono">{{ perm.slug }}</span>
            </div>

            <!-- Roles that have this permission -->
            <div class="flex items-center gap-1.5 flex-wrap" style="flex: 2">
              <template v-if="rolesWithPerm(perm.id).length > 0">
                <span
                  v-for="role in rolesWithPerm(perm.id)"
                  :key="role.id"
                  class="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold tracking-wide border"
                  :style="getRoleStyle(role.abbreviation)"
                >
                  {{ role.abbreviation }}
                </span>
              </template>
              <span v-else class="text-[12px] text-slate-600 italic">No roles assigned</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="py-16 text-center text-slate-600 text-sm">
      No permissions found.
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed, onMounted } from 'vue'
import { Search, Key, LayoutGrid, Shield } from 'lucide-vue-next'
import { useRoleApi } from '~/services/role.service'
import type { RoleResponse, Permission } from '~/lib/models/Roles'

const allPermissions = ref<Permission[]>([])
const roleList       = ref<RoleResponse[]>([])
const isLoading      = ref(false)
const searchQuery    = ref('')
const categoryFilter = ref('')

onMounted(async () => {
  isLoading.value = true
  try {
    const api = useRoleApi()
    const [permsRes, rolesRes] = await Promise.all([
      api.getPermissions(),
      api.getRoles(),
    ])
    allPermissions.value = permsRes.data
    roleList.value       = rolesRes.data
  } finally {
    isLoading.value = false
  }
})

const categories = computed<string[]>(() => {
  const cats = new Set(allPermissions.value.map(p => p.category))
  return Array.from(cats).sort()
})

const filteredGroups = computed(() => {
  const q   = searchQuery.value.toLowerCase()
  const cat = categoryFilter.value

  return categories.value
    .filter(c => !cat || c === cat)
    .map(c => ({
      category: c,
      permissions: allPermissions.value.filter(p => {
        if (p.category !== c) return false
        if (!q) return true
        return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
      }),
    }))
    .filter(g => g.permissions.length > 0)
})

function rolesWithPerm(permId: string) {
  return roleList.value.filter(r => r.permissions?.some(p => p.id === permId))
}

const ROLE_COLORS: Record<string, { background: string; color: string; borderColor: string }> = {
  SYSTEM_ADMIN: { background: '#3b0764', color: '#c084fc', borderColor: '#7e22ce' },
  MIS:          { background: '#7f1d1d', color: '#f87171', borderColor: '#991b1b' },
  AMIS:         { background: '#7c2d12', color: '#fb923c', borderColor: '#9a3412' },
  BISO:         { background: '#1e3a5f', color: '#60a5fa', borderColor: '#1d4ed8' },
  MAK:          { background: '#164e63', color: '#22d3ee', borderColor: '#0e7490' },
  AK:           { background: '#14532d', color: '#4ade80', borderColor: '#166534' },
  SP:           { background: '#1e2535', color: '#94a3b8', borderColor: '#2d3748' },
  AUDITOR:      { background: '#1f2937', color: '#d1d5db', borderColor: '#374151' },
}

function getRoleStyle(abbr: string) {
  return ROLE_COLORS[abbr] ?? { background: '#1e2535', color: '#94a3b8', borderColor: '#2d3748' }
}
</script>
