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
import type { Kit } from '~/lib/models/Kit'
import { createKitFormSchema, type CreateKitSchema } from '~/composables/kit/useKit'


const props = defineProps<{
  isOpen: boolean,
  initial?: Partial<Kit> | null
}>();

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void,
  (e: 'confirm', payload: Kit): void
}>()


const localOpen = ref(props.isOpen)
watch(() => props.isOpen, v => localOpen.value = v)
watch(localOpen, v => emits('update:isOpen', v))

// VeeValidate form setup
const { handleSubmit, setValues, resetForm,values } = useForm<CreateKitSchema>({
  validationSchema: toTypedSchema(createKitFormSchema)
})

watch(
  () => props.initial,
  (newVal) => {
    if (newVal) {
      console.log("new value", newVal)
      setValues({
        itemName: newVal.name ?? "",
        itemType: newVal.type ?? "maintenance",
        quantity: newVal.quantity ?? 1,
        status: newVal.status ?? "available",
        notes: newVal.notes ?? ""
      })
    } else {
      resetForm()
    }
  },
  { immediate: true }
)


const onSubmit = handleSubmit(values => {
  const kit: Kit = {
    id: props.initial?.id ?? crypto.randomUUID(),
    name: values.itemName,
    type: values.itemType,
    quantity: values.quantity,
    status: values.status,
    createdAt: props.initial?.createdAt ?? new Date().toISOString(),
    notes: values.notes || null,
  }
  emits('confirm', kit)
  localOpen.value = false
})

</script>

<template>

  <Dialog v-model:open="localOpen" >
    <DialogContent>
      <DialogHeader>
        <DialogTitle> Create a Kit</DialogTitle>
      </DialogHeader>

      <div
        class="w-full sm:max-w-2xl mx-auto p-4 flex flex-col gap-4  rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
        <form id="kit-form" @submit="onSubmit">
          <FieldGroup class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <!-- Item Name -->
            <VeeField v-slot="{ field, errors }" name="itemName">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Kit Name</FieldLabel>
                <Input v-bind="field" :model-value="field.value" placeholder="REF-00123" />
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Item Type -->
            <VeeField v-slot="{ field, errors }" name="itemType">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Kit Type</FieldLabel>
                <Select v-bind="field" :model-value="field.value" @update:model-value="field.onChange">
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="maintenance">Maintainance Kit</SelectItem>
                      <SelectItem value="survival">Survival Kit</SelectItem>
                      <SelectItem value="cleaning">Cleaning Kit</SelectItem>
                      <SelectItem value="custom">Custom Kit</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FieldError :errors="errors" />
              </Field>
            </VeeField>

            <!-- Quantity -->
            <VeeField v-slot="{ field, errors }" name="quantity">
              <Field :data-invalid="!!errors.length">
                <FieldLabel>Quantity</FieldLabel>
                <Input v-bind="field" :model-value="field.value" type="number" min="1" />
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
          <Button type="submit" form="kit-form" class="bg-green-600 text-amber-100">{{props.initial == null ? "Create Kit" : "Save Changes"}}</Button>
        </div>
      </DialogFooter>


    </DialogContent>
  </Dialog>

</template>
