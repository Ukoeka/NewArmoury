<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[480px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Return Firearm</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Record ammunition returned and complete the firearm return process</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
            <X :size="16" />
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4" v-if="handover">

        <!-- Firearm summary card -->
        <div class="bg-slate-600/20 border border-slate-600/30 rounded-xl px-5 py-4">
          <p class="text-[15px] font-bold text-slate-100 mb-0.5">{{ handover.firearm }} - {{ handover.weaponNum }}</p>
          <p class="text-[13px] text-slate-400">Ammunition issued: {{ ammoIssuedNum }}</p>
        </div>

        <!-- Ammunition Returned -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Ammunition Returned</label>
          <input
            v-model.number="ammoReturned"
            type="number"
            :min="0"
            :max="ammoIssuedNum"
            class="w-full bg-[#1a2030] border border-blue-600/50 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          <p v-if="ammoReturned < ammoIssuedNum" class="text-[12px] text-amber-400 font-medium">
            Ammunition discrepancy: {{ ammoIssuedNum - ammoReturned }} rounds unaccounted
          </p>
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-0 grid grid-cols-2 gap-3">
        <button @click="$emit('update:open', false)"
          class="py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          Complete Return
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export interface ReturnHandover {
  weaponNum: string
  firearm: string
  ammoIssued: string  // e.g. "15 rounds"
}

export interface ReturnFirearmData {
  weaponNum: string
  ammoReturned: number
}

const props = defineProps<{
  open: boolean
  handover?: ReturnHandover | null
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: ReturnFirearmData): void
}>()

const ammoReturned = ref(0)

// Parse e.g. "15 rounds" → 15
const ammoIssuedNum = computed(() => {
  const match = props.handover?.ammoIssued?.match(/\d+/)
  return match ? parseInt(match[0]) : 0
})

watch(() => props.open, (val) => {
  if (val) ammoReturned.value = ammoIssuedNum.value
})

watch(ammoIssuedNum, (val) => {
  ammoReturned.value = val
})

function handleSubmit() {
  if (!props.handover) return
  emit('submit', { weaponNum: props.handover.weaponNum, ammoReturned: ammoReturned.value })
  emit('update:open', false)
}
</script>