<template>
  <Dialog v-model:open="localOpen">
    <DialogContent
      class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-115 rounded-xl shadow-2xl"
      hide-close
    >
      <!-- Header -->
      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div>
          <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
            {{ props.initial ? 'Edit Role' : 'Create New Role' }}
          </DialogTitle>
          <DialogDescription class="text-[13px] text-slate-500 m-0">
            {{ props.initial ? 'Update role details' : 'Define a new access role for the system' }}
          </DialogDescription>
        </div>
      </DialogHeader>

      <!-- Form -->
      <form id="role-form" @submit="onSubmit" class="px-6 py-5 flex flex-col gap-4">

        <!-- Name -->
        <VeeField v-slot="{ field, errors }" name="name">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Role Name</FieldLabel>
            <Input
              v-bind="field" :model-value="field.value"
              placeholder="e.g. Armoury Keeper" type="text"
              class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
            />
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

        <!-- Abbreviation -->
        <VeeField v-slot="{ field, errors }" name="abbreviation">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Abbreviation</FieldLabel>
            <Input
              v-bind="field" :model-value="field.value"
              placeholder="e.g. AK" type="text"
              class="bg-[#1a2030] border-[#1e2535] h-10.5 text-[13.5px]"
            />
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

        <!-- Description -->
        <VeeField v-slot="{ field, errors }" name="description">
          <Field :data-invalid="!!errors.length">
            <FieldLabel>Description</FieldLabel>
            <textarea
              v-bind="field" :value="field.value" @input="field.onChange(($event.target as HTMLTextAreaElement).value)"
              placeholder="Describe what this role can do..."
              rows="3"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3 py-2.5 text-[13.5px] text-slate-100 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors resize-none"
            />
            <FieldError :errors="errors" />
          </Field>
        </VeeField>

      </form>

      <!-- Footer -->
      <DialogFooter class="px-6 pb-6 pt-4 flex items-center justify-end gap-3 border-t border-[#1e2535]">
        <button
          type="button"
          @click="localOpen = false"
          class="px-5 py-2.5 rounded-lg bg-transparent text-slate-400 text-[13px] font-semibold cursor-pointer border border-[#1e2535] hover:border-slate-600 hover:text-slate-200 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          form="role-form"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors"
        >
          {{ props.initial ? 'Save Changes' : 'Create Role' }}
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import {
  Dialog, DialogContent, DialogHeader,
  DialogTitle, DialogDescription, DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import type { RoleCreate, UpdateRole } from '~/lib/models/Roles'

const roleSchema = z.object({
  name:         z.string().min(1, 'Role name is required'),
  abbreviation: z.string().min(1, 'Abbreviation is required').max(20),
  description:  z.string().min(1, 'Description is required'),
})

type RoleSchema = z.infer<typeof roleSchema>

const props = defineProps<{
  isOpen: boolean
  initial?: UpdateRole | null
}>()

const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
  (e: 'confirm', payload: RoleCreate): void
}>()

const localOpen = ref(props.isOpen)

watch(() => props.isOpen, v => (localOpen.value = v))
watch(localOpen, v => emits('update:isOpen', v))

const { handleSubmit, setValues, resetForm } = useForm<RoleSchema>({
  validationSchema: toTypedSchema(roleSchema),
})

watch(
  () => [props.isOpen, props.initial] as const,
  ([open, val]) => {
    if (!open) return
    if (val) {
      setValues({
        name:         val.name         ?? '',
        abbreviation: val.abbreviation ?? '',
        description:  val.description  ?? '',
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
