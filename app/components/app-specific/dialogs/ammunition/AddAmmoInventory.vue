<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[420px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Add Ammunition Inventory</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Add new ammunition inventory to the system</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
          
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Branch -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Branch</label>
          <Select v-model="form.branch">
            <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-[full] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
              :class="form.branch ? 'text-slate-100' : 'text-slate-500'">
              <SelectValue placeholder="Select branch" />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="b in branchOptions" :key="b" :value="b"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ b }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Armoury Location -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Armoury Location</label>
          <Select v-model="form.armouryLocation">
            <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-[full] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="l in locationOptions" :key="l" :value="l"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ l }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Ammunition Type -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Ammunition Type</label>
          <Select v-model="form.ammoType">
            <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
              :class="form.ammoType ? 'text-slate-100' : 'text-slate-500'">
              <SelectValue placeholder="Select ammunition type" />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="t in ammoTypes" :key="t" :value="t"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ t }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Batch/Lot -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Batch/Lot</label>
          <input
            v-model="form.batchLot"
            type="text"
            placeholder="Enter batch/lot number"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]"
          />
        </div>

        <!-- Quantity -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Quantity</label>
          <input
            v-model="form.quantity"
            type="number"
            placeholder="Enter quantity"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]"
          />
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          Add Ammunition Inventory
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface AmmoInventoryForm {
  branch: string
  armouryLocation: string
  ammoType: string
  batchLot: string
  quantity: number
}

const props = defineProps<{
  open: boolean
  ammoTypes?: string[]
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: AmmoInventoryForm): void
}>()

const branchOptions  = ['Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch', 'Arusha Branch']
const locationOptions = ['Main Armoury', 'Secondary Armoury', 'Field Storage', 'Transit Hold']
const ammoTypes      = props.ammoTypes?.length ? props.ammoTypes : ['9mm Parabellum', '5.56mm NATO', '7.62mm', '12 Gauge', '.38 Special', '.45 ACP']

const empty = (): AmmoInventoryForm => ({ branch: '', armouryLocation: 'Main Armoury', ammoType: '', batchLot: '', quantity: 0 })
const form = ref<AmmoInventoryForm>(empty())

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
  form.value = empty()
}
</script>