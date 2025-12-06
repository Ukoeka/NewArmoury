<template>
  <div class="flex justify-center gap-2 md:justify-start p-4">
    <a href="#" class="flex items-center gap-2 font-medium">
      <div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GalleryVerticalEnd class="size-4" />
      </div>
      ArmoryCore.
    </a>
  </div>
  <div class="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm">
      <div :class="cn('flex flex-col gap-6', props.class)">
        <Card>
          <CardHeader>
            <CardTitle>Reset your account</CardTitle>
            <CardDescription>
              Enter your email below to reset your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form>
              <FieldGroup>
                <Field>
                  <FieldLabel for="email">
                    Email
                  </FieldLabel>
                  <Input id="email" type="email" placeholder="m@example.com" required />
                </Field>
                <Field>
                  <Button type="submit">
                    Reset Password
                  </Button>
                  <FieldDescription class="text-center">
                    Remember your password?
                    <a href="/login">
                      Login
                    </a>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GalleryVerticalEnd } from "lucide-vue-next"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>
