<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[480px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Device Details</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">View comprehensive details about this device</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
           
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-5" v-if="device">

        <!-- Details grid -->
        <div class="grid grid-cols-2 gap-x-10 gap-y-5">
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Device Name</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.deviceName }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Device ID</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.deviceId }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Type</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.type }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Use</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.purpose }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Number</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.number }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Branch</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.branch }}</span>
          </div>

          <!-- Status badge -->
          <div class="flex flex-col gap-1.5">
            <span class="text-[11.5px] text-slate-500 font-medium">Status</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold"
              :class="{
                'bg-emerald-600 text-white': device.status === 'Good',
                'bg-amber-950/70 text-amber-400 border border-amber-700/50': device.status === 'Fair',
                'bg-orange-950/70 text-orange-400 border border-orange-700/50': device.status === 'Maintenance Required',
                'bg-red-950/70 text-red-400 border border-red-700/50': device.status === 'Faulty',
              }"
            >{{ device.status.toUpperCase() }}</span>
          </div>

          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Last Inspection</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.lastInspection || '—' }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Next Inspection</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.nextInspection || '—' }}</span>
          </div>
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Inspected By</span>
            <span class="text-[14px] font-bold text-slate-100">{{ device.inspectedBy || '—' }}</span>
          </div>
        </div>

        <!-- Inspection Remarks -->
        <div class="flex flex-col gap-2" v-if="device.inspectionRemarks">
          <span class="text-[11.5px] text-slate-500 font-medium">Inspection Remarks</span>
          <div class="bg-slate-700/20 border border-slate-600/30 rounded-lg px-4 py-3 text-[13px] text-slate-400 leading-relaxed">
            {{ device.inspectionRemarks }}
          </div>
        </div>

      </div>

      <!-- Footer action buttons -->
      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] grid grid-cols-2 gap-3">
        <button @click="$emit('edit')"
          class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          <PenSquare :size="14" />
          Edit Device
        </button>
        <button @click="$emit('inspect')"
          class="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          <CheckCircle2 :size="14" />
          Record Inspection
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { X, PenSquare, CheckCircle2 } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export interface SecurityDevice {
  id: number
  deviceName: string; deviceId: string; type: string; number: string
  purpose: string; location: string; branch: string; status: string
  lastInspection?: string; nextInspection?: string
  inspectedBy?: string; inspectionRemarks?: string
}

defineProps<{
  open: boolean
  device?: SecurityDevice | null
}>()

defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'edit'): void
  (e: 'inspect'): void
}>()
</script>