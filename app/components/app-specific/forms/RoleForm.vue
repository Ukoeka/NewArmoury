<script setup lang="ts">
import { h, ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldLabel,
  FieldError
} from '@/components/ui/field'

import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'


// ------------------------------
// Validation Schema
// ------------------------------

const formSchema = toTypedSchema(
  z.object({
    roleName: z.string().min(1, "Reference ID is required"),
    description: z.string().optional().nullable()
  })
)

// ------------------------------
// Form Control
// ------------------------------
const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    roleName: "",
    description: ""
  }
})

const onSubmit = handleSubmit((data) => {
  toast('Form Submitted!', {
    description: h(
      'pre',
      { class: 'bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4' },
      h('code', JSON.stringify(data, null, 2))
    ),
    position: 'bottom-right'
  })
})
</script>

<template>
    <div class="w-full sm:max-w-2xl mx-auto p-4 flex flex-col gap-4  rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
    <form id="inventory-form" @submit="onSubmit">
        <!-- Role Name -->
        <VeeField v-slot="{ field, errors }" name="roleName">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Role Name</FieldLabel>
              <Input v-bind="field" placeholder="Admin" />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        <!-- Description (Full Width) -->
        <div class="mt-6">
          <VeeField v-slot="{ field, errors }" name="description">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Description</FieldLabel>
              <Textarea v-bind="field" rows="4" placeholder="Additional remarks..." />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>
        </div>
      </form>
    <div class="mt-6 flex justify-start gap-4">
      <Button type="button" variant="outline" @click="resetForm()">Reset</Button>
      <Button type="submit" form="inventory-form" class="bg-green-600 text-amber-100">Save</Button>
    </div>
</div>
</template>
