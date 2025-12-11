<template>
  <div class="flex justify-center gap-2 md:justify-start p-4">
    <a href="#" class="flex items-center gap-2 font-medium">
      <div class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
        <GalleryVerticalEnd class="size-4" />
      </div>
      ArmoryCore.
    </a>
  </div>
  <div class="flex min-h-svh w-full items-center justify-center">
    <div class="w-full max-w-sm">
      <SetupBranchForm/>
        <!-- <Card>
          <CardHeader>
            <CardTitle>Setup a new branch</CardTitle>
            <CardDescription>
              Fill in the information to setup your new branch
            </CardDescription>
          </CardHeader>
          <CardContent>
            
          </CardContent>
        </Card> -->
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { GalleryVerticalEnd } from "lucide-vue-next"
import { cn } from "@/lib/utils"
const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()

import SetupBranchForm from "~/components/app-specific/forms/SetupBranchForm.vue";
</script>
