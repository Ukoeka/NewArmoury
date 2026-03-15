<template>
  <Dialog v-model:open="localOpen">
    <DialogContent
      class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-115 rounded-xl shadow-2xl"
      hide-close
    >
      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
              {{ props.initial ? 'Edit Location' : 'Add New Location' }}
            </DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              {{ props.initial ? 'Update location details' : 'Create a new location for firearm deployment' }}
            </DialogDescription>
          </div>
          <!-- <Button
            @click="localOpen = false"
            class="text-slate-500 hover:text-slate-200 transition-colors bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] mt-0.5"
          >
            <X :size="16" />
          </Button> -->
        </div>
      </DialogHeader>

      <!-- Form -->
      <form id="location-form" @submit="onSubmit" class="px-6 py-5 flex flex-col gap-5">

        <!-- Location Type -->
        <VeeField v-slot="{ field, errors }" name="type">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Location Type</FieldLabel>
            <Select :model-value="field.value" @update:model-value="field.onChange">
              <SelectTrigger class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg h-10.5 text-[13.5px] text-slate-100 focus:border-blue-500 focus:ring-0">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] text-slate-100">
                <SelectItem :value=LocationType.IN_OFFICE class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">In-Office</SelectItem>
                <SelectItem :value=LocationType.OUT_OFFICE class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">Out-of-Office</SelectItem>
                <!-- <SelectItem :value=LocationType.FIELD  class="text-[13.5px] cursor-pointer focus:bg-[#252f42]">Field</SelectItem> -->
              </SelectContent>
            </Select>
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

        <!-- Branch -->
        <VeeField v-slot="{ field, errors }" name="branch_id">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Branch</FieldLabel>
            <Select :model-value="field.value" @update:model-value="field.onChange">
              <SelectTrigger class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg h-10.5 text-[13.5px] text-slate-100 focus:border-blue-500 focus:ring-0">
                <SelectValue placeholder="Select branch" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] text-slate-100">
                <SelectItem
                  v-for="branch in branchList"
                  :key="branch.id"
                  :value="branch.id"
                  class="text-[13.5px] cursor-pointer focus:bg-[#252f42]"
                >
                  {{ branch.name }}
                </SelectItem>
              </SelectContent>
            </Select>
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

        <!-- Name -->
        <VeeField v-slot="{ field, errors }" name="name">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Location Name</FieldLabel>
            <Input
              v-bind="field"
              :model-value="field.value"
              placeholder="e.g., Main Entrance"
              type="text"
              class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
            />
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

        <!-- Specific Area -->
        <VeeField v-slot="{ field, errors }" name="specific_area">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Specific Area</FieldLabel>
            <Input
              v-bind="field"
              :model-value="field.value"
              placeholder="e.g., Server Room, VIP Protection, Patrol Zone"
              type="text"
              class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
            />
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

      </form>

      <!-- Footer -->
      <DialogFooter class="px-6 pb-6 pt-2 flex items-center justify-end gap-3 border-t border-[#1e2535]">
        <button
          type="button"
          @click="localOpen = false"
          class="px-5 py-2.5 rounded-lg bg-transparent text-slate-400 text-[13px] font-semibold cursor-pointer border border-[#1e2535] hover:border-slate-600 hover:text-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="location-form"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors"
        >
          {{ props.initial ? 'Save Changes' : 'Add Location' }}
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem,
  SelectTrigger, SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useBranchApi } from '~/services/branch.service'
import type { BranchResponse } from '~/lib/models/Branch'
import { LocationType, type LocationCreate, type UpdateLocation } from '~/lib/models/Location'

const locationSchema = z.object({
  name:          z.string().min(1, 'Name is required'),
  type:          z.nativeEnum(LocationType, { required_error: 'Type is required' }),
  specific_area: z.string().min(1, 'Specific area is required'),
  branch_id:     z.string().uuid('Branch is required'),
})

type LocationSchema = z.infer<typeof locationSchema>

const props = defineProps<{
  isOpen: boolean
  initial?: UpdateLocation | null
}>()

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'confirm', payload: LocationCreate): void
}>()

const localOpen  = ref(props.isOpen)
const branchList = ref<BranchResponse[]>([])

watch(() => props.isOpen, v => (localOpen.value = v))
watch(localOpen, v => emits('update:isOpen', v))

const { handleSubmit, setValues, resetForm } = useForm<LocationSchema>({
  validationSchema: toTypedSchema(locationSchema),
})

// fetch all branches for the dropdown
onMounted(async () => {
  const api = useBranchApi()
  const res = await api.getBranches(1, 100)
  branchList.value = res.items
})

watch(
  () => [props.isOpen, props.initial] as const,
  ([open, val]) => {
    if (!open) return
    if (val) {
      setValues({
        name:          val.name          ?? '',
        type:          (val.type as LocationSchema['type']) ?? undefined,
        specific_area: val.specific_area ?? '',
        branch_id:     val.branch_id     ?? '',
      })
    } else {
      resetForm()
    }
  },
  { immediate: true },
)

const onSubmit = handleSubmit((values) => {
  emits('confirm', values)
  localOpen.value = false
})
</script>