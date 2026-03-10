<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[480px] rounded-xl shadow-2xl" hide-close>
      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Firearm Details</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Complete information for {{ firearm?.makeModel }}</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="w-7 h-7 flex items-center justify-center rounded-md border border-[#1e2535] text-slate-400 hover:text-slate-200 hover:bg-[#1e2535] bg-transparent cursor-pointer transition-colors">
           
          </button>
        </div>
      </DialogHeader>

      <!-- Details grid -->
      <div class="px-6 py-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto" v-if="firearm">

        <!-- 2-col info grid -->
        <div class="grid grid-cols-2 gap-x-8 gap-y-4">
          <div v-for="field in detailFields" :key="field.label" class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">{{ field.label }}</span>
            <span class="text-[14px] font-bold text-slate-100">{{ field.value }}</span>
          </div>

          <!-- Condition Status badge -->
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Condition Status</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide"
              :class="{
                'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': firearm.conditionStatus === 'GOOD',
                'bg-amber-950/70 text-amber-400 border border-amber-700/50': firearm.conditionStatus === 'MAINTENANCE',
                'bg-red-950/70 text-red-400 border border-red-700/50': firearm.conditionStatus === 'MALFUNCTION',
              }"
            >{{ firearm.conditionStatus }}</span>
          </div>

          <!-- Availability badge -->
          <div class="flex flex-col gap-1">
            <span class="text-[11.5px] text-slate-500 font-medium">Availability</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold border border-slate-600/50 bg-slate-800/50 text-slate-300">
              {{ firearm.availability }}
            </span>
          </div>
        </div>

        <!-- Lock Status -->
        <div class="flex flex-col gap-1.5">
          <span class="text-[11.5px] text-slate-500 font-medium">Lock Status</span>
          <div class="flex items-center gap-2">
            <span v-if="firearm.locked"
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-bold bg-red-950/70 text-red-400 border border-red-700/50">
              <Lock :size="12" /> Locked
            </span>
            <span v-else
              class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[12px] font-bold bg-emerald-950/70 text-emerald-400 border border-emerald-700/50">
              <LockOpen :size="12" /> Unlocked
            </span>
            <span v-if="firearm.lockReason" class="text-[12px] text-slate-500">{{ firearm.lockReason }}</span>
          </div>
        </div>

        <!-- Inspection & Maintenance History -->
        <div class="border-t border-[#1e2535] pt-4">
          <h4 class="text-[14px] font-bold text-slate-100 mb-3">Inspection & Maintenance History</h4>
          <div v-if="firearm.inspectionHistory?.length" class="flex flex-col gap-2">
            <div v-for="record in firearm.inspectionHistory" :key="record.date"
              class="bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[12.5px] text-slate-400">
              <span class="font-semibold text-slate-200">{{ record.type }}</span> — {{ record.date }} — {{ record.findings }}
            </div>
          </div>
          <p v-else class="text-[13px] text-slate-600">No inspection records available</p>
        </div>
      </div>

      <DialogFooter class="px-6 pb-5 pt-4 border-t border-[#1e2535]">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-[#1e2535] text-slate-200 text-[13px] font-semibold cursor-pointer border-none hover:bg-[#252f42] transition-colors">
          Close
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { X, Lock, LockOpen } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export interface FirearmDetail {
  barcode: string; makeModel: string; fireamType: string; weaponNumber: string
  carNumber: string; currentLocation: string; dateRegistered: string
  estimatedCost: string; conditionStatus: string; availability: string
  lastInspection: string; nextMaintenance: string
  locked: boolean; lockReason?: string
  inspectionHistory?: { type: string; date: string; findings: string }[]
}

const props = defineProps<{ open: boolean; firearm?: FirearmDetail | null }>()
defineEmits<{ (e: 'update:open', v: boolean): void }>()

const detailFields = computed(() => props.firearm ? [
  { label: 'ID / Barcode',       value: props.firearm.barcode },
  { label: 'Type',               value: props.firearm.fireamType },
  { label: 'Make & Model',       value: props.firearm.makeModel },
  { label: 'Weapon Number',      value: props.firearm.weaponNumber },
  { label: 'C.A.R. Number',      value: props.firearm.carNumber },
  { label: 'Current Location',   value: props.firearm.currentLocation },
  { label: 'Date Registered',    value: props.firearm.dateRegistered },
  { label: 'Estimated Cost',     value: props.firearm.estimatedCost },
  { label: 'Last Inspection',    value: props.firearm.lastInspection },
  { label: 'Next Maintenance',   value: props.firearm.nextMaintenance },
] : [])
</script>