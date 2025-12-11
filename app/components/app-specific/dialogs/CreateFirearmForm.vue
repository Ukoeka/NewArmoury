<script setup lang="ts">
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog"

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import type { Firearm } from '~/lib/models/Firearm'
import { createFirearmFormSchema, type CreateFirearmSchema } from '~/composables/firearm/useFirearm'
import { useFirearm } from '~/composables/firearm/useFirearm'

const props = defineProps<{
  isOpen: boolean,
  initial?: Partial<Firearm> | null
}>();

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void,
  (e: 'confirm', payload: Firearm): void
}>()

const { submitFirearmForm } = useFirearm()

const localOpen = ref(props.isOpen)
watch(() => props.isOpen, v => localOpen.value = v)
watch(localOpen, v => emits('update:isOpen', v))

// VeeValidate form setup
const { handleSubmit, setValues, resetForm, values } = useForm<CreateFirearmSchema>({
  validationSchema: toTypedSchema(createFirearmFormSchema)
})

watch(
  () => props.initial,
  (newVal) => {
    if (newVal) {
      setValues({
        serial_number: newVal.serialNumber,
        make: newVal.make,
        model: newVal.model,
        category: newVal.category,
        caliber: newVal.caliber,
        manufacturer: newVal.manufacturer ?? "",
        acquisitionDate: newVal.acquisitionDate,
        status: newVal.status,
        location: newVal.location,
        notes: newVal.notes ?? "",
      })
    } else {
      resetForm()
    }
  },
  { immediate: true }
)


const onSubmit = handleSubmit(values => {
  const firearm = submitFirearmForm(values, props.initial ?? null)
  emits('confirm', firearm)
  resetForm()
  localOpen.value = false
})
</script>

<template>

  <Dialog v-model:open="localOpen" >
    <DialogContent class="overflow-x-auto max-h-[90vh]">
      <DialogHeader>
        <DialogTitle> {{ props.initial == null ? "Create Firearm" : "Edit Fiream" }}</DialogTitle>
      </DialogHeader>
      <div
        class="w-full sm:max-w-2xl mx-auto p-4 flex flex-col gap-4  rounded-lg bg-card-light dark:bg-card-dark shadow-sm ">
        <form id="firearm-form" @submit="onSubmit">
          <FieldGroup class="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <!-- serial number -->
            <VeeField v-slot="{ field, errors }" name="serial_number">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Serial Number</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>


            <!-- Make -->
            <VeeField v-slot="{ field, errors }" name="make">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Make</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Make -->
            <VeeField v-slot="{ field, errors }" name="model">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Model</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Category Type -->
            <VeeField v-slot="{ field, errors }" name="category">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Category</FieldLabel>
                <Select v-bind="field" :model-value="field.value" @update:model-value="field.onChange">
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="rifle">Rifle</SelectItem>
                      <SelectItem value="pistol">Pistol</SelectItem>
                      <SelectItem value="smg">SMG</SelectItem>
                      <SelectItem value="shotgun">Shot Gun</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Caliber -->
            <VeeField v-slot="{ field, errors }" name="caliber">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Caliber</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Manufacturer -->
            <VeeField v-slot="{ field, errors }" name="manufacturer">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Manufacturer</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- location -->
            <VeeField v-slot="{ field, errors }" name="location">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Location</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- aquisition -->
            <VeeField v-slot="{ field, errors }" name="acquisitionDate">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Aquisition Date</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="date" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Status -->
            <VeeField v-slot="{ field, errors }" name="status">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Status</FieldLabel>
                <Select v-bind="field" :model-value="field.value" @update:model-value="field.onChange">
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="lost">Lost</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="decommissioned">Decommissioned</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError :errors="errors" />
              </Field>
            </VeeField>
          </FieldGroup>

          <!-- Notes (Full Width) -->
          <div class="mt-6">
            <VeeField v-slot="{ field, errors }" name="notes">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Notes</FieldLabel>
                <Textarea v-bind="field" :model-value="field.value" rows="4" placeholder="Additional remarks..." />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>
          </div>
        </form>
      </div>
      <DialogFooter>
        <div class="mt-6 flex justify-start gap-4">
          <DialogClose>
            <Button type="button" variant="outline">Close</Button>
          </DialogClose>
          <Button type="submit" form="firearm-form" class="bg-green-600 text-amber-100">
            {{ props.initial == null ? "Create Firearm" : "Save Changes" }}
          </Button>
        </div>
      </DialogFooter>


    </DialogContent>
  </Dialog>

</template>
