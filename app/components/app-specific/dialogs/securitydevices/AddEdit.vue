<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[480px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
              {{ mode === 'add' ? 'Add Security Device' : 'Edit Security Device' }}
            </DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              {{ mode === 'add' ? 'Register a new security device or fire brigade equipment' : 'Update device information' }}
            </DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
          
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Row 1: Device Name + Device ID -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Device Name *</label>
            <input v-model="form.deviceName" type="text" placeholder="Enter device name"
              class="w-full bg-[#1a2030] border border-blue-600/50 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Device ID *</label>
            <input v-model="form.deviceId" type="text" placeholder="e.g., FE-DSM-001"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
        </div>

        <!-- Row 2: Type + Number/Quantity -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Type *</label>
            <Select v-model="form.type">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-[full] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
                :class="form.type ? 'text-slate-100' : 'text-slate-500'">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="t in deviceTypes" :key="t" :value="t"
                  class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ t }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Number/Quantity</label>
            <input v-model="form.number" type="text" placeholder="e.g., FE-001"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
        </div>

        <!-- Use/Purpose -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Use/Purpose</label>
          <input v-model="form.purpose" type="text" placeholder="e.g., Fire Suppression - Main Entrance"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
        </div>

        <!-- Row 3: Location + Branch -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Location *</label>
            <Select v-model="form.location">
              <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
                :class="form.location ? 'text-slate-100' : 'text-slate-500'">
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="l in locationOptions" :key="l" :value="l"
                  class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ l }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Branch *</label>
            <Select v-model="form.branch">
              <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
                :class="form.branch ? 'text-slate-100' : 'text-slate-500'">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border  border-[#1e2535] rounded-lg">
                <SelectItem v-for="b in branchOptions" :key="b" :value="b"
                  class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ b }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Initial/Current Status -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">
            {{ mode === 'add' ? 'Initial Status' : 'Status' }}
          </label>
          <Select v-model="form.status">
            <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="s in statusOptions" :key="s" :value="s"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ s }}</SelectItem>
            </SelectContent>
          </Select>
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          {{ mode === 'add' ? 'Add Device' : 'Update Device' }}
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

export interface SecurityDeviceForm {
  deviceName: string; deviceId: string; type: string; number: string
  purpose: string; location: string; branch: string; status: string
}

const props = defineProps<{
  open: boolean
  mode: 'add' | 'edit'
  initialData?: Partial<SecurityDeviceForm>
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: SecurityDeviceForm): void
}>()

const deviceTypes = ['Metal Detector', 'Fire Extinguisher', 'CCTV Camera', 'Access Control', 'Alarm System', 'Smoke Detector', 'Panic Button', 'Biometric Scanner']
const locationOptions = ['Dar es Salaam Sub-HQ - Main', 'Dar es Salaam Sub-HQ - Sub', 'Dodoma HQ - Main', 'Zanzibar Sub-HQ - Main', 'Mwanza Branch - Main', 'Mtwara Branch - Main', 'Mbeya Branch - Main', 'Arusha Branch - Main']
const branchOptions = ['Dar es Salaam Sub-HQ', 'Dodoma HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch', 'Arusha Branch']
const statusOptions = ['Good', 'Fair', 'Maintenance Required', 'Faulty']

const empty = (): SecurityDeviceForm => ({ deviceName: '', deviceId: '', type: '', number: '', purpose: '', location: '', branch: '', status: 'Good' })
const form = ref<SecurityDeviceForm>(empty())

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