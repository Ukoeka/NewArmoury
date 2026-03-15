<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/zod'
import { useForm, Field as VeeField } from 'vee-validate'
import { z } from 'zod'
import { Eye, EyeOff, Loader2 } from 'lucide-vue-next'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const props = defineProps<{ isLoading?: boolean }>()

const emit = defineEmits<{
  submit: [data: { username: string; password: string }]
}>()

const showPassword = ref(false)

const formSchema = toTypedSchema(
  z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(1, 'Password is required'),
  })
)

const { handleSubmit } = useForm({ validationSchema: formSchema })

const onSubmit = handleSubmit((data) => {
  emit('submit', { username: data.username, password: data.password })
})
</script>

<template>
  <form class="flex flex-col gap-5" @submit="onSubmit">

    <!-- Username -->
    <VeeField v-slot="{ field, errors }" name="username">
      <div class="flex flex-col gap-1.5">
        <Label
          for="username"
          class="text-[13px] font-medium text-slate-300"
        >
          Username
        </Label>
        <Input
          id="username"
          v-bind="field"
          type="text"
          placeholder="e.g. delta-alpha"
          autocomplete="username"
          :disabled="isLoading"
          :aria-invalid="!!errors.length"
          class="h-10 border-[#1e2535] bg-[#161b27] text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500/60 focus-visible:ring-blue-500/10"
        />
        <p v-if="errors.length" class="text-[12px] text-red-400">{{ errors[0] }}</p>
      </div>
    </VeeField>

    <!-- Password -->
    <VeeField v-slot="{ field, errors }" name="password">
      <div class="flex flex-col gap-1.5">
        <div class="flex items-center justify-between">
          <Label
            for="password"
            class="text-[13px] font-medium text-slate-300"
          >
            Password
          </Label>
          <NuxtLink
            to="/auth/forgotpassword"
            class="text-[12px] text-blue-400 hover:text-blue-300 transition-colors"
          >
            Forgot password?
          </NuxtLink>
        </div>
        <div class="relative">
          <Input
            id="password"
            v-bind="field"
            :type="showPassword ? 'text' : 'password'"
            placeholder="Enter your password"
            autocomplete="current-password"
            :disabled="isLoading"
            :aria-invalid="!!errors.length"
            class="h-10 pr-10 border-[#1e2535] bg-[#161b27] text-slate-100 placeholder:text-slate-600 focus-visible:border-blue-500/60 focus-visible:ring-blue-500/10"
          />
          <button
            type="button"
            tabindex="-1"
            class="absolute inset-y-0 right-0 flex items-center px-3 text-slate-500 hover:text-slate-300 transition-colors"
            @click="showPassword = !showPassword"
          >
            <component :is="showPassword ? EyeOff : Eye" :size="15" />
          </button>
        </div>
        <p v-if="errors.length" class="text-[12px] text-red-400">{{ errors[0] }}</p>
      </div>
    </VeeField>

    <!-- Submit -->
    <Button
      type="submit"
      :disabled="isLoading"
      class="mt-1 h-10 w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold text-[13px] cursor-pointer"
    >
      <Loader2 v-if="isLoading" :size="15" class="animate-spin" />
      {{ isLoading ? 'Signing in…' : 'Sign in' }}
    </Button>

  </form>
</template>
