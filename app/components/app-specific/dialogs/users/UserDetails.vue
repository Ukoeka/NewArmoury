<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-130 rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">User Details</DialogTitle>
            <DialogDescription class="text-[14px] text-slate-500 m-0">View comprehensive information about this user</DialogDescription>
          </div>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-5" v-if="user">

        <!-- Hero -->
        <div class="flex items-center gap-4 bg-[#1a2030] border border-[#1e2535] rounded-xl px-5 py-4">
          <div class="w-14 h-14 rounded-full bg-blue-900/60 border border-blue-700/40 flex items-center justify-center shrink-0">
            <UserRound :size="26" class="text-blue-400" />
          </div>
          <div class="flex flex-col gap-1 min-w-0">
            <span class="text-[18px] font-bold text-slate-100 leading-snug truncate">
              {{ [user.title, user.initial, user.first_name, user.surname].filter(Boolean).join(' ') }}
            </span>
            <span class="text-[13px] text-slate-500 truncate">{{ user.username }} · {{ user.email }}</span>
            <div class="flex items-center gap-2 mt-1 flex-wrap">
              <span
                class="inline-flex items-center px-2.5 py-1 uppercase rounded-md text-[11px] font-bold border"
                :style="{
                  background:  getRoleStyle(user.role?.abbreviation).background,
                  color:       getRoleStyle(user.role?.abbreviation).color,
                  borderColor: getRoleStyle(user.role?.abbreviation).borderColor,
                }"
              >
                {{ user.role?.name ?? '—' }}
              </span>
              <span class="inline-flex items-center uppercase px-2.5 py-1 rounded-md text-[11px] font-bold" :class="getStatusClass(user.status)">
                {{ user.status }}
              </span>
              <span v-if="user.is_superuser"
                class="inline-flex items-center px-2.5 py-1 uppercase rounded-md text-[11px] font-bold bg-purple-950/60 text-purple-400 border border-purple-700/50">
                Superuser
              </span>
              
            </div>
          </div>
        </div>

        <!-- Info sections -->
        <div class="flex flex-col gap-3">

          <!-- Personal -->
          <div class="flex flex-col gap-2">
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Personal</span>
            <div class="grid grid-cols-2 gap-3">
              <InfoField label="File Number"  :value="user.file_number" />
              <InfoField label="Phone Number" :value="user.phone_number" />
              <InfoField label="Department"   :value="user.department" />
              <InfoField label="Directorate"  :value="user.directorate" />
            </div>
          </div>

          <!-- Organisation -->
          <div class="flex flex-col gap-2">
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Organisation</span>
            <div class="grid grid-cols-2 gap-3">
              <InfoField label="Branch"   :value="user.branch?.name" />
              <InfoField label="Location" :value="user.branch?.location" />
              <InfoField label="Role"     :value="user.role?.name" />
              <InfoField label="Branch Type" :value="user.branch?.type" />
            </div>
          </div>

          <!-- Account -->
          <div class="flex flex-col gap-2">
            <span class="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Account</span>
            <div class="grid grid-cols-2 gap-3">
              <InfoField label="Last Login" :value="user.last_login ? formatDate(user.last_login) : 'Never'" />
              <InfoField label="Created"    :value="formatDate(user.created_at)" />
              <!-- <InfoField label="Active"     :value="user.is_active ? 'Yes' : 'No'" /> -->
              <InfoField label="Updated"    :value="formatDate(user.updated_at)" />
            </div>
          </div>

        </div>
      </div>

      <!-- Footer -->
      <!-- <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] grid grid-cols-1 gap-3">
        <Button v-if="!user?.is_superuser" @click="$emit('deactivate')"
          class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-[#1a2030] text-orange-400 text-[13px] font-semibold cursor-pointer border border-orange-700/50 hover:bg-orange-950/40 transition-colors">
          <XCircle :size="14" />
          Deactivate
        </Button>
      </DialogFooter> -->
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { UserRound, XCircle } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { getRoleStyle, getStatusClass } from '~/lib/utils'
import { formatDate } from '~/lib/utils'
import type { UserResponse } from '~/lib/models/User'
import InfoField from './InfoField.vue'

const props = defineProps<{
  open: boolean
  user?: UserResponse | null
}>()

defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'edit'): void
  (e: 'deactivate'): void
}>()
</script>