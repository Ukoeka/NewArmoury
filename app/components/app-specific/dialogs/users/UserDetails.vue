<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[490px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">User Details</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">View comprehensive information about this user</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-5" v-if="user">

        <!-- Avatar + name hero -->
        <div class="flex items-center gap-4">
          <div class="w-14 h-14 rounded-full bg-blue-900/60 border border-blue-700/40 flex items-center justify-center flex-shrink-0">
            <UserRound :size="26" class="text-blue-400" />
          </div>
          <div class="flex flex-col gap-0.5">
            <span class="text-[17px] font-bold text-slate-100 leading-snug">{{ user.name }}</span>
            <span class="text-[13px] text-slate-400">{{ roleLabelFor(user.role) }}</span>
            <div class="flex items-center gap-2 mt-1.5">
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold border"
                :style="getRoleStyle(user.role)">{{ roleLabelFor(user.role) }}</span>
              <span class="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold"
                :class="user.status === 'ACTIVE'
                  ? 'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50'
                  : 'bg-[#1e2535] text-slate-500 border border-slate-700/60'">
                {{ user.status }}
              </span>
            </div>
          </div>
        </div>

        <!-- Details grid -->
        <div class="grid grid-cols-2 gap-x-10 gap-y-4">
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">File Number</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.fileNum }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Name</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.initial }} {{ user.firstName }} {{ user.surname }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Email</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.email }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Phone Number</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.phone }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Directorate</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.directorate || '—' }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Department</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.department || '—' }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Branch</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.branch }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Created</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.createdAt || '—' }}</span>
          </div>
        </div>

      </div>

      <!-- Footer -->
      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] grid grid-cols-2 gap-3">
        <button @click="$emit('edit')"
          class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          <PenSquare :size="14" />
          Edit User
        </button>
        <button @click="$emit('deactivate')"
          class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a2030] text-orange-400 text-[13px] font-semibold cursor-pointer border border-orange-700/50 hover:bg-orange-950/40 transition-colors">
          <XCircle :size="14" />
          Deactivate
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { X, UserRound, PenSquare, XCircle } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export interface UserDetail {
  fileNum: string; name: string; initial: string; firstName: string; surname: string
  email: string; phone: string; title: string; directorate: string
  department: string; branch: string; role: string; status: string; createdAt?: string
}

const props = defineProps<{
  open: boolean
  user?: UserDetail | null
}>()

defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'edit'): void
  (e: 'deactivate'): void
}>()

const roles = [
  { code: 'SYSTEM_ADMIN', label: 'System Administrator',                bgColor: '#3b0764', color: '#c084fc', borderColor: '#7e22ce' },
  { code: 'MIS',          label: 'Manager Internal Security',           bgColor: '#7f1d1d', color: '#f87171', borderColor: '#991b1b' },
  { code: 'AMIS',         label: 'Assistant Manager Internal Security', bgColor: '#7c2d12', color: '#fb923c', borderColor: '#9a3412' },
  { code: 'BISO',         label: 'Branch Information Security Officer', bgColor: '#1e3a5f', color: '#60a5fa', borderColor: '#1d4ed8' },
  { code: 'AK',           label: 'Armoury Keeper',                      bgColor: '#14532d', color: '#4ade80', borderColor: '#166534' },
  { code: 'MAK',          label: 'Main Armoury Keeper',                 bgColor: '#164e63', color: '#22d3ee', borderColor: '#0e7490' },
  { code: 'SP',           label: 'Security Personnel',                  bgColor: '#1e2535', color: '#94a3b8', borderColor: '#2d3748' },
]

function getRoleStyle(code: string) {
  const r = roles.find(r => r.code === code)
  if (!r) return {}
  return { background: r.bgColor, color: r.color, borderColor: r.borderColor }
}

function roleLabelFor(code: string) {
  return roles.find(r => r.code === code)?.label ?? code
}
</script>