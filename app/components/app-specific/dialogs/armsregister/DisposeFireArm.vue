<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[420px] rounded-xl shadow-2xl" hide-close>
      <DialogHeader class="px-6 pt-6 pb-4">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Dispose Firearm</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              Mark this firearm as disposed (will be removed from operations but visible in reports)
            </DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
           
          </button>
        </div>
      </DialogHeader>

      <!-- Warning box -->
      <div class="mx-6 mb-6 bg-amber-950/30 border border-amber-700/50 rounded-xl p-4 flex flex-col gap-2">
        <div class="flex items-center gap-2">
          <AlertTriangle :size="15" class="text-amber-500 flex-shrink-0" />
          <span class="text-[13.5px] font-semibold text-slate-100">Are you sure you want to dispose this firearm?</span>
        </div>
        <span class="text-[13px] font-semibold text-slate-300 pl-[23px]">{{ firearmLabel }}</span>
        <p class="text-[12px] text-slate-500 pl-[23px] leading-relaxed">
          This action will remove the firearm from active operations but keep it in the system for reporting and audit purposes.
        </p>
      </div>

      <DialogFooter class="px-6 pb-6 flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleConfirm"
          class="px-5 py-2.5 rounded-lg bg-red-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-red-700 transition-colors">
          Confirm Disposal
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { X, AlertTriangle } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

const props = defineProps<{ open: boolean; firearmLabel?: string }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void; (e: 'confirm'): void }>()

function handleConfirm() {
  emit('confirm')
  emit('update:open', false)
}
</script>