<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[480px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Issue Firearm</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Select an active deployment and available firearm to issue</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
         
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Select Deployment -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Select Deployment</label>
          <Select v-model="form.deployment">
            <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
              :class="form.deployment ? 'text-slate-100' : 'text-slate-500'">
              <SelectValue placeholder="Choose active deployment" />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="d in deployments" :key="d.id" :value="d.id"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">
                {{ d.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Select Firearm -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Select Firearm</label>
          <Select v-model="form.firearm">
            <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
              :class="form.firearm ? 'text-slate-100' : 'text-slate-500'">
              <SelectValue placeholder="Choose available firearm" />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem v-for="f in availableFirearms" :key="f.weaponNum" :value="f.weaponNum"
                class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">
                {{ f.label }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Ammunition Count -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Ammunition Count</label>
          <input v-model.number="form.ammoCount" type="number" min="0"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 outline-none focus:border-blue-500 transition-colors h-[42px]" />
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
        <button @click="$emit('update:open', false)"
          class="py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button
        @click="handleSubmit(); $emit('update:open', false)"
        class="py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors"
        >
        Generate OTP &amp; Issue
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

export interface IssueFirearmData {
  deployment: string
  firearm: string
  ammoCount: number
}

const props = defineProps<{
  open: boolean
  deployments: { id: string; label: string }[]
  availableFirearms: { weaponNum: string; label: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: IssueFirearmData): void
}>()

const form = ref<IssueFirearmData>({ deployment: '', firearm: '', ammoCount: 15 })

watch(() => props.open, (val) => {
  if (val) form.value = { deployment: '', firearm: '', ammoCount: 15 }
})

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
}
</script>