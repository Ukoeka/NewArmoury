<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <!-- Page Header -->
    <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Users</h1>
        <p class="text-sm text-slate-500">Manage security personnel, armoury keepers, and system access</p>
      </div>
      <button
        @click="openAdd"
        class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap"
      >
        <Plus :size="14" />
        Add User
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Users</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.total || total }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <Users :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Active</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.active }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <CircleCheck :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Disabled</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.disabled }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-red-950/40 text-red-500 border border-red-500/25">
          <CircleAlert :size="22" />
        </div>
      </div>
      
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Suspended</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.suspended }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-yellow-950/40 text-yellow-500 border border-yellow-500/25">
          <CircleAlert :size="22" />
        </div>
      </div>
      
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Banned</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ stats.banned }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-yellow-950/40 text-yellow-500 border border-yellow-500/25">
          <CircleAlert :size="22" />
        </div>
      </div>
      
    </div>

    <!-- Users by Role -->
    <div v-if="stats.by_role.length > 0" class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-5 mb-5">
      <h3 class="text-[14px] font-semibold text-slate-100 mb-4">Roles</h3>
      <div class="flex flex-wrap gap-3">
        <div
          v-for="entry in stats.by_role"
          :key="entry.role_abbreviation"
          class="bg-[#1a2030] border border-[#1e2535] rounded-[10px] px-4 py-3.5 flex flex-col items-center gap-2 min-w-24 hover:border-slate-600/50 transition-colors"
        >
          <span
            class="inline-flex items-center px-2 py-0.5 uppercase rounded-md text-[14px] font-bold tracking-wide border"
            :style="{
              background:  getRoleStyle(entry.role_abbreviation).background,
              color:       getRoleStyle(entry.role_abbreviation).color,
              borderColor: getRoleStyle(entry.role_abbreviation).borderColor,
            }"
          >
            {{ entry.role_abbreviation }}
          </span>
          <span class="text-[24px] font-bold text-slate-100 leading-none">{{ entry.count }}</span>
          <span class="text-[10px] font-extrabold text-slate-100 leading-none">{{ entry.role_name.toLocaleUpperCase() }}</span>
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
          placeholder="Search by name, email, or file number..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors"
        />
      </div>
      <select
        v-model="roleFilter"
        class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none min-w-40"
      >
        <option value="">All Roles</option>
        <option v-for="role in roles" :key="role.id" :value="role.id">
          — {{ role.name }}
        </option>
      </select>
      <select
        v-model="statusFilter"
        class="bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none min-w-36"
      >
        <option :value="UserStatus.ALL">All Statuses</option>
        <option :value="UserStatus.ACTIVE">Active</option>
        <option :value="UserStatus.DISABLED">Disabled</option>
        <option :value="UserStatus.SUSPENDED">Suspended</option>
        <option :value="UserStatus.BANNED">Banned</option>
      </select>
    </div>

    <!-- Users List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <div class="flex items-center justify-between px-6 py-4 border-b border-[#1e2535]">
        <h3 class="text-[14px] font-semibold text-slate-100">
          All Users <span class="text-slate-500 font-normal">({{ total }})</span>
        </h3>
      </div>

      <div v-if="isLoading && userList.length === 0" class="p-3 flex flex-col gap-2">
        <div v-for="i in 5" :key="i" class="h-16 bg-[#1a2030] border border-[#1e2535] rounded-xl animate-pulse" />
      </div>

      <div v-else class="p-3 flex flex-col gap-2">
        <div
          v-for="user in userList"
          :key="user.id"
          @click="viewUser(user)"
          class="flex items-center gap-4 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors cursor-pointer"
        >
          <!-- Avatar + Name -->
          <div class="flex items-center gap-3" style="flex: 1.4; min-width: 0">
            <div class="w-9 h-9 rounded-full bg-[#252f42] border border-[#1e2535] flex items-center justify-center shrink-0">
              <span class="text-[13px] font-bold text-slate-300">{{ user.initial || user.first_name?.[0] }}</span>
            </div>
            <div class="flex flex-col gap-0.5 min-w-0">
              <span class="text-[14px] font-semibold text-slate-100 truncate">
                {{ user.initial }}. {{ user.first_name }} {{ user.surname }}
              </span>
              <span class="text-[11px] text-slate-500 font-mono">{{ user.file_number }}</span>
            </div>
          </div>

          <!-- Email -->
          <div class="flex flex-col gap-0.5 min-w-0" style="flex: 1.3">
            <span class="text-[11px] text-slate-500 font-medium">Email</span>
            <span class="text-[13px] text-slate-400 truncate">{{ user.email }}</span>
          </div>

          <!-- Phone -->
          <div class="flex flex-col gap-0.5" style="flex: 0.9">
            <span class="text-[11px] text-slate-500 font-medium">Phone</span>
            <span class="text-[13px] text-slate-400">{{ user.phone_number }}</span>
          </div>

          <!-- Role -->
          <div class="flex flex-col gap-0.5" style="flex: 0.6">
            <span class="text-[11px] text-slate-500 font-medium">Role</span>
            <span
              v-if="user.role"
              class="inline-flex self-start items-center p-1 uppercase rounded-sm text-[10px] font-bold tracking-wide border mt-0.5"
              :style="{
                background:  getRoleStyle(user.role.abbreviation).background,
                color:       getRoleStyle(user.role.abbreviation).color,
                borderColor: getRoleStyle(user.role.abbreviation).borderColor,
              }"
            >
              {{ user.role.abbreviation }}
            </span>
          </div>

          <!-- Branch -->
          <div class="flex flex-col gap-0.5 ml-4 min-w-0" style="flex: 1">
            <span class="text-[11px] text-slate-500 font-medium">Branch</span>
            <span class="text-[13px] font-medium text-slate-200 truncate">{{ user.branch?.name }}</span>
          </div>

          <!-- Status -->
          <div class="flex flex-col gap-0.5" style="flex: 0.6">
            <span class="text-[11px] text-slate-500 font-medium">Status</span>
            <span
              class="inline-flex self-start items-center uppercase px-2 py-0.5 rounded-md text-[10.5px] font-bold tracking-wide mt-0.5"
              :class="getStatusClass(user.status)"
            >
              {{ user.status }}
            </span>
          </div>

          <!-- Actions -->
          <div class="flex items-center gap-1 ml-auto shrink-0" @click.stop>
            <button
              @click="viewUser(user)"
              title="View"
              class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-blue-400 hover:bg-blue-950/30 transition-all cursor-pointer"
            >
              <Eye :size="15" />
            </button>
            <button
              @click="openEdit(user)"
              title="Edit"
              class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer"
            >
              <PenSquare :size="15" />
            </button>
            <button
              @click="promptDelete(user)"
              title="Delete"
              class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-red-400 hover:bg-red-950/30 transition-all cursor-pointer"
            >
              <Trash2 :size="15" />
            </button>
          </div>
        </div>

        <div v-if="!isLoading && userList.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No users found.
        </div>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalPages > 1" class="flex items-center justify-between mt-4 px-1">
      <span class="text-[12px] text-slate-500">
        Page {{ currentPage }} of {{ totalPages }} · {{ total }} total
      </span>
      <div class="flex items-center gap-1.5">
        <button
          @click="fetchUsers(currentPage - 1)"
          :disabled="currentPage <= 1"
          class="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[#161b27] border border-[#1e2535] text-slate-300 disabled:opacity-40 hover:border-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >Prev</button>
        <button
          @click="fetchUsers(currentPage + 1)"
          :disabled="currentPage >= totalPages"
          class="px-3 py-1.5 rounded-lg text-[12px] font-medium bg-[#161b27] border border-[#1e2535] text-slate-300 disabled:opacity-40 hover:border-slate-600 transition-colors cursor-pointer disabled:cursor-not-allowed"
        >Next</button>
      </div>
    </div>

    <!-- User Detail Dialog -->
    <UserDetailDialog
      :open="showDetailDialog"
      :user="viewingUser"
      @update:open="showDetailDialog = $event"
      @edit="onDetailEdit"
      @deactivate="onDetailDeactivate"
    />

    <!-- User Modal -->
    <UserModal
      :is-open="showModal"
      :initial="editingUser"
      @update:is-open="showModal = $event"
      @confirm="handleConfirm"
    />

    <!-- Delete Dialog -->
    <Dialog v-model:open="showDeleteDialog">
      <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 max-w-sm rounded-xl shadow-2xl">
        <DialogHeader>
          <DialogTitle class="text-[17px] font-bold text-slate-100">Delete User</DialogTitle>
          <DialogDescription class="text-[13px] text-slate-500">
            Are you sure you want to delete
            <span class="font-semibold text-slate-300">
              {{ currentUser?.first_name }} {{ currentUser?.surname }}
            </span>?
            This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter class="flex gap-3 pt-2">
          <button
            @click="showDeleteDialog = false"
            class="flex-1 px-4 py-2.5 rounded-lg bg-transparent text-slate-400 text-[13px] font-semibold cursor-pointer border border-[#1e2535] hover:border-slate-600 hover:text-slate-200 transition-colors"
          >Cancel</button>
          <button
            @click="deleteUser"
            :disabled="isLoading"
            class="flex-1 px-4 py-2.5 rounded-lg bg-red-700 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-red-800 transition-colors disabled:opacity-60"
          >Delete</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed, onMounted } from 'vue'
import { Plus, Search, Users, CircleCheck, CircleAlert, ShieldCheck, PenSquare, Trash2, Eye } from 'lucide-vue-next'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import UserModal from '@/components/app-specific/dialogs/users/UserModal.vue'
import UserDetailDialog from '@/components/app-specific/dialogs/users/UserDetails.vue'
import { useUser } from '~/composables/user/useUser'
import { useRole } from '~/composables/role/useRole'
import { UserStatus, type UserResponse } from '~/lib/models/User'
import { getRoleStyle, getStatusClass } from '~/lib/utils'

const {
  userList, isLoading, stats, total, totalPages, currentPage,
  searchQuery, statusFilter, roleFilter, currentUser,
  editingUser, showModal, showDeleteDialog,
  fetchUsers, openAdd, openEdit, promptDelete, handleConfirm, deleteUser,
} = useUser()

const { roleList: roles, fetchRoles } = useRole()

onMounted(() => {
  fetchUsers()
  fetchRoles()
})


// ── Detail dialog ─────────────────────────────────────────────────────────────
const showDetailDialog = ref(false)
const viewingUser      = ref<UserResponse | null>(null)

function viewUser(user: UserResponse) {
  viewingUser.value  = user
  showDetailDialog.value = true
}

function onDetailEdit() {
  showDetailDialog.value = false
  if (viewingUser.value) openEdit(viewingUser.value)
}

function onDetailDeactivate() {
  showDetailDialog.value = false
  if (viewingUser.value) promptDelete(viewingUser.value)
}
</script>