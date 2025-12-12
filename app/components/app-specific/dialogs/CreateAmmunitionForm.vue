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
import type { Ammunition } from '~/lib/models/Ammunition'
import { createAmmunitionFormSchema, useAmmunition, type CreateAmmunitionSchema } from '~/composables/ammunition/useAmmunition'



const props = defineProps<{
  isOpen: boolean,
  initial?: Partial<Ammunition> | null
}>();

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void,
  (e: 'confirm', payload: Ammunition): void
}>()


const localOpen = ref(props.isOpen)
watch(() => props.isOpen, v => localOpen.value = v)
watch(localOpen, v => emits('update:isOpen', v))

// VeeValidate form setup
const { handleSubmit, setValues, resetForm } = useForm<CreateAmmunitionSchema>({
  validationSchema: toTypedSchema(createAmmunitionFormSchema)
})

watch(
  () => props.initial,
  (newVal) => {
    if (newVal) {
      console.log("new value", newVal)
      setValues({
        lotNumber: newVal.lotNumber,
        caliber: newVal.caliber,
        roundsPerBox: newVal.roundsPerBox ?? 0,
        boxes: newVal.boxes,
        totalRounds: newVal.totalRounds,
        manufacturer: newVal.manufacturer ?? "",
        expiryDate: newVal.expiryDate ?? new Date().toISOString(),
        status: newVal.status,
        location: newVal.location,
        notes: newVal.notes ?? null,
      })
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

const { submitAmmunitionForm } = useAmmunition()

const onSubmit = handleSubmit(values => {
  const ammunition = submitAmmunitionForm(values, props.initial ?? null)
  emits('confirm', ammunition)
  localOpen.value = false
})


</script>

<template>

  <Dialog v-model:open="localOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ props.initial == null ? "Register a new Ammunition" : "Edit Ammunition" }}</DialogTitle>
      </DialogHeader>

      <div
        class="w-full sm:max-w-2xl mx-auto p-4 flex flex-col gap-4  rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
        <form id="ammunition-form" @submit="onSubmit">
          <FieldGroup class="grid grid-cols-1 sm:grid-cols-2 gap-6">

            <!-- Lot Number  -->
            <VeeField v-slot="{ field, errors }" name="lotNumber">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Lot Number</FieldLabel>
                <Input v-bind="field" :model-value="field.value" placeholder="AM-2025-100" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Caliber  -->
            <VeeField v-slot="{ field, errors }" name="caliber">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Caliber</FieldLabel>
                <Input v-bind="field" :model-value="field.value" placeholder="5.556x45mm" type="text" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Rounds per Box  -->
            <VeeField v-slot="{ field, errors }" name="roundsPerBox">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Rounds Per Box</FieldLabel>
                <Input v-bind="field" :model-value="field.value" placeholder="0" type="number" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Rounds per Box  -->
            <VeeField v-slot="{ field, errors }" name="boxes">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Boxes</FieldLabel>
                <Input v-bind="field" :model-value="field.value" placeholder="0" type="number" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Rounds per Box  -->
            <VeeField v-slot="{ field, errors }" name="totalRounds">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Total Rounds</FieldLabel>
                <Input v-bind="field" :model-value="field.value" placeholder="0" type="number" />
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

            <!-- Aquisition -->
            <VeeField v-slot="{ field, errors }" name="acquisitionDate">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Aquisition Date</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="date" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>


            <!-- expiry Date -->
            <VeeField v-slot="{ field, errors }" name="expiryDate" >
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Expiry Date</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="date" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>



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
          <Button type="submit" form="ammunition-form" class="bg-green-600 text-amber-100">{{ props.initial == null ?
            "Register Ammunition" : "Save Changes" }}</Button>
        </div>
      </DialogFooter>


    </DialogContent>
  </Dialog>

</template>
