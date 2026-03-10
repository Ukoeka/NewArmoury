<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[460px] rounded-xl shadow-2xl" hide-close>

      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Review Firearm Registration</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Approve or reject this firearm registration</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
        
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-5">

        <!-- Firearm summary card -->
        <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl overflow-hidden">
          <div class="grid grid-cols-2">
            <div class="px-5 py-4 border-b border-r border-[#1e2535]">
              <p class="text-[11.5px] text-slate-500 mb-1">Make & Model</p>
              <p class="text-[14px] font-bold text-slate-100">{{ firearm?.makeModel }}</p>
            </div>
            <div class="px-5 py-4 border-b border-[#1e2535]">
              <p class="text-[11.5px] text-slate-500 mb-1">Type</p>
              <p class="text-[14px] font-bold text-slate-100">{{ firearm?.fireamType?.toUpperCase() }}</p>
            </div>
            <div class="px-5 py-4 border-r border-[#1e2535]">
              <p class="text-[11.5px] text-slate-500 mb-1">Weapon #</p>
              <p class="text-[14px] font-bold text-slate-100">{{ firearm?.weaponNumber }}</p>
            </div>
            <div class="px-5 py-4">
              <p class="text-[11.5px] text-slate-500 mb-1">C.A.R. #</p>
              <p class="text-[14px] font-bold text-slate-100">{{ firearm?.carNumber }}</p>
            </div>
          </div>
        </div>

        <!-- Rejection reason -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Rejection Reason (if rejecting)</label>
          <textarea
            v-model="rejectionReason"
            rows="3"
            placeholder="Provide reason for rejection..."
            class="w-full bg-[#1a2030] border border-blue-600/50 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

      </div>

      <!-- Footer -->
      <DialogFooter class="px-6 pb-6 flex items-center justify-end gap-2">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleReject"
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-red-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-red-700 transition-colors">
          <XCircle :size="15" />
          Reject
        </button>
        <button @click="handleApprove"
          class="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          <CheckCircle2 :size="15" />
          Approve
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X, XCircle, CheckCircle2 } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export interface PendingFirearm {
  id: number
  barcode: string
  makeModel: string
  fireamType: string
  weaponNumber: string
  carNumber: string
  branch: string
  conditionStatus: string
  registeredBy: string
  submitted: string
}

const props = defineProps<{
  open: boolean
  firearm?: PendingFirearm | null
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'approve', id: number): void
  (e: 'reject', id: number, reason: string): void
}>()

const rejectionReason = ref('')

function handleApprove() {
  if (!props.firearm) return
  emit('approve', props.firearm.id)
  emit('update:open', false)
  rejectionReason.value = ''
}

function handleReject() {
  if (!props.firearm) return
  emit('reject', props.firearm.id, rejectionReason.value)
  emit('update:open', false)
  rejectionReason.value = ''
}
</script>