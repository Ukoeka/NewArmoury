<template>
  <div class="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50" @click.self="$emit('close')">
    <div class="bg-[#111827] border border-[#1e2535] rounded-xl w-[460px] max-w-[calc(100vw-32px)] p-7 relative shadow-2xl">

      <!-- Close -->
      <button @click="$emit('close')" class="absolute top-4 right-4 text-slate-600 hover:text-slate-300 transition-colors bg-transparent border-none cursor-pointer text-lg leading-none p-1">
        ×
      </button>

      <!-- Header -->
      <div class="mb-6">
        <h2 class="text-[17px] font-semibold text-slate-100 -tracking-[0.2px]">Edit Deployment</h2>
        <p class="text-[13px] text-slate-500 mt-1">Update security personnel or duty for a deployment</p>
      </div>

      <!-- Form -->
      <div class="flex flex-col gap-4">

        <div class="flex flex-col gap-1.5">
          <label class="text-[12.5px] font-medium text-slate-400">Security Personnel</label>
          <select
            v-model="form.personnel"
            class="w-full bg-[#151d2e] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13.5px] text-slate-200 outline-none focus:border-blue-500/60 transition-colors cursor-pointer appearance-none"
          >
            <option v-for="p in personnelList" :key="p" :value="p">{{ p }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[12.5px] font-medium text-slate-400">Duty Assignment</label>
          <select
            v-model="form.duty"
            class="w-full bg-[#151d2e] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13.5px] text-slate-200 outline-none focus:border-blue-500/60 transition-colors cursor-pointer appearance-none"
          >
            <option v-for="d in dutyList" :key="d" :value="d">{{ d }}</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[12.5px] font-medium text-slate-400">Scheduled Start Time</label>
          <input
            v-model="form.startTime"
            type="datetime-local"
            class="w-full bg-[#151d2e] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13.5px] text-slate-200 outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-[12.5px] font-medium text-slate-400">Scheduled End Time</label>
          <input
            v-model="form.endTime"
            type="datetime-local"
            class="w-full bg-[#151d2e] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13.5px] text-slate-200 outline-none focus:border-blue-500/60 transition-colors"
          />
        </div>

      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-2.5 mt-6 pt-5 border-t border-[#1e2535]">
        <button
          @click="$emit('close')"
          class="px-5 py-2.5 rounded-lg text-[13.5px] font-medium text-slate-400 bg-transparent border border-[#1e2535] hover:bg-[#1e2535] hover:text-slate-200 transition-all cursor-pointer"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg text-[13.5px] font-semibold text-white bg-blue-600 hover:bg-blue-700 border-none transition-colors cursor-pointer"
        >
          Update Deployment
        </button>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Deployment {
  personnel: string
  duty: string
  startTime: string
  endTime: string
}

const props = defineProps<{
  deployment: Deployment
}>()

const emit = defineEmits<{
  close: []
  save: [data: typeof form.value]
}>()

const personnelList = [
  'J. K. Sanga (SP)',
  'L. M. Mbwana (SP)',
  'N. O. Mwinyi (SP)',
  'P. Q. Hamisi (SP)',
  'M. T. Mwakyusa (SP)',
]

const dutyList = [
  'Day shift - Server Room (PLANNED_SHIFT)',
  'Night shift - Main Entrance (PLANNED_SHIFT)',
  'Day shift - Main Entrance (PLANNED_SHIFT)',
  'Night shift - Server Room (PLANNED_SHIFT)',
]

const form = ref({ ...props.deployment })

function handleSubmit() {
  emit('save', form.value)
  emit('close')
}
</script>