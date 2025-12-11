<script setup lang="ts">
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"; 
import { Input } from "@/components/ui/input";
import { useLogin } from "~/composables/auth/useLogin";

const { username, password, isLoading, login } = useLogin()


</script>

<template>
  <form class="flex flex-col gap-6" @submit.prevent="login">
    <FieldGroup>
      <div class="flex flex-col items-center gap-1 text-center">
        <h1 class="text-2xl font-bold">
          Login to your account
        </h1>
        <p class="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>
      <Field>
        <FieldLabel for="username">
          Username
        </FieldLabel>
        <Input id="username" type="text" placeholder="delta-alpha" required v-model="username"/>
      </Field>
      <Field>
        <div class="flex items-center">
          <FieldLabel for="password">
            Password
          </FieldLabel>
          <a href="/auth/forgotpassword" class="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot your password?
          </a>
        </div>
        <Input id="password" type="password" required v-model="password" />
      </Field>
      <Field>
        <Button type="submit">
          Login
        </Button>
      </Field>
    </FieldGroup>
  </form>
</template>
