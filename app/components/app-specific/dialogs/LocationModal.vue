<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent
      class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[460px] rounded-xl shadow-2xl"
      hide-close
    >
      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
              {{ mode === 'add' ? 'Add New Location' : 'Edit Location' }}
            </DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              {{ mode === 'add' ? 'Create a new location for firearm deployment' : 'Update location details' }}
            </DialogDescription>
          </div>
          <button
            @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 transition-colors bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] mt-0.5"
          >
          </button>
        </div>
      </DialogHeader>

      <!-- Form -->
      <div class="px-6 py-5 flex flex-col gap-5">

        <!-- Location Type -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Location Type</label>
          <Select v-model="form.locationType">
            <SelectTrigger
              class="w-full bg-[#1a2030] border border-blue-600/60 rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-100 outline-none focus:border-blue-500 focus:ring-0 h-[42px]"
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-slate-100">
              <SelectItem
                v-for="opt in locationTypeOptions"
                :key="opt"
                :value="opt"
                class="text-[13.5px] text-slate-200 focus:bg-[#252f42] focus:text-slate-100 cursor-pointer py-2.5 px-3.5"
              >
                {{ opt }}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Category (Branch) -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">
            Category (Branch / Category)
          </label>

          <!-- Dropdown for Add mode -->
          <Select v-if="mode === 'add'" v-model="form.branch">
            <SelectTrigger
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-100 outline-none focus:border-blue-500 focus:ring-0 h-[42px]"
            >
              <SelectValue placeholder="Select branch" class="text-slate-500" />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg text-slate-100">
              <SelectItem
                v-for="branch in branchOptions"
                :key="branch"
                :value="branch"
                class="text-[13.5px] text-slate-200 focus:bg-[#252f42] focus:text-slate-100 cursor-pointer py-2.5 px-3.5"
              >
                {{ branch }}
              </SelectItem>
            </SelectContent>
          </Select>

          <!-- Text input for Edit mode -->
          <input
            v-else
            v-model="form.branch"
            type="text"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-100 outline-none focus:border-blue-500 transition-colors h-[42px]"
          />
        </div>

        <!-- Specific Area -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">
            {{ mode === 'add' ? 'Specific Area (Room / Zone / Assignment)' : 'Specific Area' }}
          </label>
          <input
            v-model="form.specificArea"
            type="text"
            :placeholder="mode === 'add' ? 'e.g., Server Room, Main Entrance, VIP Protection' : ''"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13.5px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]"
          />
        </div>

      </div>

      <!-- Footer -->
      <DialogFooter class="px-6 pb-6 flex items-center justify-end gap-3">
        <button
          @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors"
        >
          {{ mode === 'add' ? 'Add Location' : 'Save Changes' }}
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

interface LocationForm {
  locationType: string
  branch: string
  specificArea: string
}

const props = defineProps<{
  open: boolean
  mode: 'add' | 'edit'
  initialData?: Partial<LocationForm>
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'submit', data: LocationForm): void
}>()

const locationTypeOptions = ['In-Office', 'Out-of-Office', 'Field', 'Transit']

const branchOptions = [
  'Dar es Salaam Sub-HQ',
  'Dodoma HQ',
  'Zanzibar Sub-HQ',
  'Mwanza Branch',
  'Mtwara Branch',
  'Mbeya Branch',
  'Arusha Branch',
]

const form = ref<LocationForm>({
  locationType: 'In-Office',
  branch: '',
  specificArea: '',
})

watch(() => props.open, (val) => {
  if (val && props.mode === 'edit' && props.initialData) {
    form.value = {
      locationType: props.initialData.locationType ?? 'In-Office',
      branch:       props.initialData.branch       ?? '',
      specificArea: props.initialData.specificArea ?? '',
    }
  }
  if (val && props.mode === 'add') {
    form.value = { locationType: 'In-Office', branch: '', specificArea: '' }
  }
})

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
}
</script>