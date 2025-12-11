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
    FieldError,
    FieldGroup,
    FieldDescription
} from '@/components/ui/field'

import { Input } from '@/components/ui/input'

// ------------------------------
// Validation Schema
// ------------------------------
const formSchema = toTypedSchema(
    z.object({
        // Branch information
        branchName: z.string().min(1, "Branch Name is required"),
        branchLocation: z.string().min(1, "Branch Location is required"),
        branchStaffCapacity: z.string().min(1, "Branch staff capacity required"),
        primaryContactInformation: z.string().min(1, "Primary contact information required"),
        // Presiding officer information  
        title: z.string().optional(),
        fullName: z.string().min(1, "Branch Officer fullname is required"),
        email: z.email(),
        contactNumber: z.string(),
    })
)

// ------------------------------
// Form Control
// ------------------------------
const { handleSubmit, resetForm } = useForm({
    validationSchema: formSchema,
    initialValues: {
        branchName: "",
        branchLocation: "",
        branchStaffCapacity: "",
        primaryContactInformation: "",
        title: "",
        fullName: "",
        email: "",
        contactNumber: ""
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
    <div class="w-full sm:max-w-2xl mx-auto flex flex-col rounded-lg bg-card-light dark:bg-card-dark shadow-sm">
        <form id="inventory-form" @submit="onSubmit" class="space-y-6">
            <!-- Branch Name -->
            <VeeField v-slot="{ field, errors }" name="branchName">
                <Field :data-invalid="!!errors.length">
                    <FieldLabel>Branch Name</FieldLabel>
                    <Input v-bind="field" placeholder="Branch Name " />
                    <FieldError :errors="errors" />
                </Field>
            </VeeField>


            <!-- Branch Location -->
            <VeeField v-slot="{ field, errors }" name="branchLocation">
                <Field :data-invalid="!!errors.length">
                    <FieldLabel>Branch Location</FieldLabel>
                    <Input v-bind="field" placeholder="Location" />
                    <FieldError :errors="errors" />
                </Field>
            </VeeField>

            <FieldGroup class="grid grid-cols-1 sm:grid-cols-2">
                <!-- Primary Contact -->
                <VeeField v-slot="{ field, errors }" name="primaryContactInformation">
                    <Field :data-invalid="!!errors.length">
                        <FieldLabel>Primary Contact</FieldLabel>
                        <Input v-bind="field" placeholder="+345 53334 4443" />
                        <FieldError :errors="errors" />
                    </Field>
                </VeeField>

                <!-- Branch Capacity -->
                <VeeField v-slot="{ field, errors }" name="branchStaffCapacity">
                    <Field :data-invalid="!!errors.length">
                        <FieldLabel>Branch Capacity</FieldLabel>
                        <Input v-bind="field" placeholder="40" type="number" />
                        <FieldError :errors="errors" />
                    </Field>
                </VeeField>
            </FieldGroup>

            <FieldGroup class="grid grid-cols-1 sm:grid-cols-2">
                <!-- Primary Contact -->
                <VeeField v-slot="{ field, errors }" name="title">
                    <Field :data-invalid="!!errors.length">
                        <FieldLabel>Title/Rank</FieldLabel>
                        <Input v-bind="field" placeholder="Security Officer" />
                        <FieldError :errors="errors" />
                    </Field>
                </VeeField>
            </FieldGroup>

            <!-- Branch Capacity -->
            <VeeField v-slot="{ field, errors }" name="fullName">
                <Field :data-invalid="!!errors.length">
                    <FieldLabel>Branch Officer Full Name</FieldLabel>
                    <Input v-bind="field" placeholder="Full name" type="text" />
                    <FieldError :errors="errors" />
                </Field>
            </VeeField>

            <FieldGroup class="grid grid-cols-1 sm:grid-cols-2">
                <!-- Primary Contact -->
                <VeeField v-slot="{ field, errors }" name="email">
                    <Field :data-invalid="!!errors.length">
                        <FieldLabel>Email</FieldLabel>
                        <Input v-bind="field" placeholder="test@armorycore.com" />
                        <FieldError :errors="errors" />
                    </Field>
                </VeeField>

                <VeeField v-slot="{ field, errors }" name="contactNumber">
                    <Field :data-invalid="!!errors.length">
                        <FieldLabel>Contact Number</FieldLabel>
                        <Input v-bind="field" placeholder="+334 334 3444" />
                        <FieldError :errors="errors" />
                    </Field>
                </VeeField>
            </FieldGroup>

        </form>
        <div class="mt-6 flex justify-start gap-4">
            <Button type="button" variant="outline" @click="resetForm()">Reset</Button>
            <Button type="submit" form="inventory-form" class="bg-blue-600 text-amber-100">Create Branch</Button>
        </div>
    </div>
</template>
