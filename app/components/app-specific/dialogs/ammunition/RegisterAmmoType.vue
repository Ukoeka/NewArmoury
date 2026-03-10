<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[420px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Register Ammunition Type</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Add a new ammunition type to the system</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
         
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-5">

        <!-- Name -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Name</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="Enter ammunition type name"
            class="w-full bg-[#1a2030] border border-blue-600/50 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]"
          />
        </div>

        <!-- Description -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Description</label>
          <textarea
            v-model="form.description"
            rows="3"
            placeholder="Enter description of the ammunition type..."
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

        <!-- Applicable Firearms -->
        <div class="flex flex-col gap-3">
          <label class="text-[13px] font-semibold text-slate-200">Applicable Firearms</label>
          <div class="flex flex-col gap-2.5">
            <label
              v-for="firearm in fireamOptions"
              :key="firearm"
              class="flex items-center gap-3 cursor-pointer group"
            >
              <div
                @click="toggleFirearm(firearm)"
                class="w-4 h-4 rounded flex items-center justify-center flex-shrink-0 border transition-colors cursor-pointer"
                :class="form.applicableFirearms.includes(firearm)
                  ? 'bg-blue-600 border-blue-600'
                  : 'bg-[#1a2030] border-slate-600 group-hover:border-slate-400'"
              >
                <Check v-if="form.applicableFirearms.includes(firearm)" :size="10" class="text-white" />
              </div>
              <span class="text-[13.5px] text-slate-300 group-hover:text-slate-100 transition-colors">{{ firearm }}</span>
            </label>
          </div>
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          Register Ammunition Type
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { X, Check } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'

export interface AmmoTypeForm {
  name: string
  description: string
  applicableFirearms: string[]
}

const props = defineProps<{ open: boolean }>()
const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: AmmoTypeForm): void
}>()

const fireamOptions = ['Rifle', 'Pistol', 'Machine Gun', 'Shotgun']

const form = ref<AmmoTypeForm>({ name: '', description: '', applicableFirearms: [] })

function toggleFirearm(firearm: string) {
  const idx = form.value.applicableFirearms.indexOf(firearm)
  if (idx === -1) form.value.applicableFirearms.push(firearm)
  else form.value.applicableFirearms.splice(idx, 1)
}

function handleSubmit() {
  emit('submit', { ...form.value, applicableFirearms: [...form.value.applicableFirearms] })
  emit('update:open', false)
  form.value = { name: '', description: '', applicableFirearms: [] }
}
</script>