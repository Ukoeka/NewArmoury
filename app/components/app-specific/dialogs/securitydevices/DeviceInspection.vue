<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[460px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Record Inspection</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Update device inspection status and remarks</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
          
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Device summary card -->
        <div class="bg-[#1a2030] border border-[#1e2535] rounded-xl px-5 py-4">
          <p class="text-[15px] font-bold text-slate-100 mb-0.5">{{ device?.deviceName }}</p>
          <p class="text-[12.5px] text-slate-500">{{ device?.deviceId }}</p>
        </div>

        <!-- Status -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Status</label>
          <Select v-model="form.status">
            <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-[full] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="s in statusOptions" :key="s" :value="s"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ s }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Inspection Remarks -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Inspection Remarks</label>
          <textarea v-model="form.remarks" rows="4" placeholder="Enter inspection findings and remarks..."
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors resize-none" />
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          Save Inspection
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface DeviceInspectionResult {
  status: string
  remarks: string
}

const props = defineProps<{
  open: boolean
  device?: { deviceName: string; deviceId: string } | null
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: DeviceInspectionResult): void
}>()

const statusOptions = ['Good', 'Fair', 'Maintenance Required', 'Faulty']
const form = ref<DeviceInspectionResult>({ status: 'Good', remarks: '' })

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
  form.value = { status: 'Good', remarks: '' }
}
</script>