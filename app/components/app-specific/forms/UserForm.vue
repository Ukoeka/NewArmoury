<script setup lang="ts">
import { h } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { toast } from 'vue-sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Field,
  FieldLabel,
  FieldError,
  FieldGroup,
} from '@/components/ui/field'

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

// ------------------------------
// Validation Schema
// ------------------------------
const formSchema = toTypedSchema(
  z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(1, "Allocated to field is required"),
    role: z.string().min(1, "Role is required"),
    status: z.enum(["Active", "Returned", "Overdue", "Lost", "Damaged"]),
    notes: z.string().optional().nullable()
  })
)


// ------------------------------
// Form Control
// ------------------------------
const { handleSubmit, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {    
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: "",
    role: "",
    status: "Active",
    notes: ""
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
        <FieldGroup class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <!-- First Name -->
          <VeeField v-slot="{ field, errors }" name="firstName">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>First Name</FieldLabel>
              <Input v-bind="field" placeholder="John" />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <!-- Last Name -->
          <VeeField v-slot="{ field, errors }" name="lastName">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Last Name</FieldLabel>
              <Input v-bind="field" placeholder="Doe" />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <!-- Username -->
          <VeeField v-slot="{ field, errors }" name="username">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Username</FieldLabel>
              <Input v-bind="field" placeholder="johndoe" />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <!-- Email -->
          <VeeField v-slot="{ field, errors }" name="email">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Email</FieldLabel>
              <Input v-bind="field" placeholder="john.doe@example.com" />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

           <!-- Email -->
          <VeeField v-slot="{ field, errors }" name="phoneNumber">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Phone Number</FieldLabel>
              <Input v-bind="field" placeholder="+1 (555) 123-4567" />
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <!-- Item Type -->
          <VeeField v-slot="{ field, errors }" name="role">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Role</FieldLabel>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="User">User</SelectItem>
                    <SelectItem value="Guest">Guest</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldError :errors="errors" />
            </Field>
          </VeeField>

          <!-- Status -->
          <VeeField v-slot="{ field, errors }" name="status">
            <Field :data-invalid="!!errors.length">
              <FieldLabel>Status</FieldLabel>
              <Select v-bind="field">
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Returned">Returned</SelectItem>
                    <SelectItem value="Overdue">Overdue</SelectItem>
                    <SelectItem value="Lost">Lost</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
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
