<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[460px] rounded-xl shadow-2xl" hide-close>
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Record Inspection</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Add inspection record for {{ firearmName }}</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
        
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">
        <!-- Inspection Type -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Inspection Type</label>
          <Select v-model="form.inspectionType">
            <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="t in inspectionTypes" :key="t" :value="t" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ t }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Condition After Inspection -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Condition After Inspection</label>
          <Select v-model="form.conditionAfter">
            <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="c in conditions" :key="c" :value="c" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ c }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Findings / Remarks -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Findings / Remarks</label>
          <textarea v-model="form.findings" rows="3" placeholder="Describe the inspection findings..."
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors resize-none" />
        </div>

        <!-- Next Scheduled Maintenance -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Next Scheduled Maintenance</label>
          <input v-model="form.nextMaintenance" type="date"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 outline-none focus:border-blue-500 transition-colors h-[42px] [color-scheme:dark]" />
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

const props = defineProps<{ open: boolean; firearmName?: string }>()
const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: { inspectionType: string; conditionAfter: string; findings: string; nextMaintenance: string }): void
}>()

const inspectionTypes = ['Routine Inspection', 'Surprise Inspection', 'Quarterly Inspection', 'Post-Incident Inspection']
const conditions = ['Good', 'Fair', 'Maintenance Required', 'Malfunction']

const form = ref({ inspectionType: 'Routine Inspection', conditionAfter: 'Good', findings: '', nextMaintenance: '' })

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
  form.value = { inspectionType: 'Routine Inspection', conditionAfter: 'Good', findings: '', nextMaintenance: '' }
}
</script>