<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[520px] rounded-xl shadow-2xl" hide-close>
      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
              {{ mode === 'add' ? 'Register New Firearm' : 'Update Firearm' }}
            </DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              {{ mode === 'add' ? 'Enter all required details for the new firearm' : 'Update the details of the firearm (requires re-approval)' }}
            </DialogDescription>
          </div>
          <button @click="$emit('update:open', false)" class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors mt-0.5">
            
          </button>
        </div>
      </DialogHeader>

      <!-- Form -->
      <div class="px-6 py-5 flex flex-col gap-4 max-h-[65vh] overflow-y-auto">

        <!-- Row 1: Barcode + Firearm Type -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Barcode / ID *</label>
            <input v-model="form.barcode" type="text" placeholder="e.g., 83828 or UNCODED"
              class="w-full bg-[#1a2030] border border-blue-600/50 rounded-lg px-3 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[40px]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Firearm Type *</label>
            <Select v-model="form.fireamType">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-full rounded-lg text-[13px] text-slate-100 h-[40px] focus:ring-0 focus:border-blue-500">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="t in fireamTypes" :key="t" :value="t" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ t }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Row 2: Make & Model + Weapon Number -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Make & Model *</label>
            <input v-model="form.makeModel" type="text" placeholder="e.g., GLOCK 17, BERETTA, BROV..."
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[40px]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Weapon Number *</label>
            <input v-model="form.weaponNumber" type="text" placeholder="e.g., YFW214"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[40px]" />
          </div>
        </div>

        <!-- Row 3: CAR Number + Estimated Cost -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">C.A.R. Number *</label>
            <input v-model="form.carNumber" type="text" placeholder="e.g., TZC AR111641"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[40px]" />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Estimated Cost (TZS)</label>
            <input v-model="form.estimatedCost" type="number" placeholder="0"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[40px]" />
          </div>
        </div>

        <!-- Row 4: Branch + Armoury Location -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Branch *</label>
            <Select v-model="form.branch">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-full rounded-lg text-[13px] text-slate-100 h-[40px] focus:ring-0 focus:border-blue-500">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="b in branchOptions" :key="b" :value="b" class="text-[13px] w-full text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ b }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Armoury Location *</label>
            <Select v-model="form.armouryLocation">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-[13px] w-full text-slate-100 h-[40px] focus:ring-0 focus:border-blue-500">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="l in armouryLocations" :key="l" :value="l" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ l }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Row 5: Condition Status + Next Maintenance -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Condition Status *</label>
            <Select v-model="form.conditionStatus">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-full rounded-lg text-[13px] text-slate-100 h-[40px] focus:ring-0 focus:border-blue-500">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="s in conditionStatuses" :key="s" :value="s" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ s }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-[12.5px] font-semibold text-slate-300">Planned Next Maintenance</label>
            <input v-model="form.nextMaintenance" type="date"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13px] text-slate-100 outline-none focus:border-blue-500 transition-colors h-[40px] [color-scheme:dark]" />
          </div>
        </div>

        <!-- Firearm Photograph -->
        <div class="flex flex-col gap-1.5">
          <label class="text-[12.5px] font-semibold text-slate-300">Firearm Photograph</label>
          <input type="file" accept="image/*"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13px] text-slate-400 outline-none file:mr-3 file:bg-[#252f42] file:border-none file:text-slate-300 file:text-[12px] file:font-medium file:rounded file:px-2 file:py-1 file:cursor-pointer cursor-pointer" />
        </div>

      </div>

      <!-- Footer -->
      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          {{ mode === 'add' ? 'Register & Submit for Approval' : 'Update & Submit for Approval' }}
        </button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface FirearmForm {
  barcode: string; fireamType: string; makeModel: string; weaponNumber: string
  carNumber: string; estimatedCost: number; branch: string; armouryLocation: string
  conditionStatus: string; nextMaintenance: string
}

const props = defineProps<{ open: boolean; mode: 'add' | 'edit'; initialData?: Partial<FirearmForm> }>()
const emit = defineEmits<{ (e: 'update:open', v: boolean): void; (e: 'submit', d: FirearmForm): void }>()

const fireamTypes      = ['Pistol', 'Rifle', 'Shotgun', 'SMG', 'Revolver']
const branchOptions    = ['Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch', 'Arusha Branch']
const armouryLocations = ['Main Armoury', 'Secondary Armoury', 'Field Storage', 'Transit Hold']
const conditionStatuses = ['Good', 'Fair', 'Maintenance Required', 'Malfunction']

const empty = (): FirearmForm => ({ barcode: '', fireamType: 'Pistol', makeModel: '', weaponNumber: '', carNumber: '', estimatedCost: 0, branch: '', armouryLocation: 'Main Armoury', conditionStatus: 'Good', nextMaintenance: '' })
const form = ref<FirearmForm>(empty())

watch(() => props.open, (val) => {
  if (val && props.mode === 'edit' && props.initialData) {
    form.value = { ...empty(), ...props.initialData }
  } else if (val && props.mode === 'add') {
    form.value = empty()
  }
})

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
}
</script>