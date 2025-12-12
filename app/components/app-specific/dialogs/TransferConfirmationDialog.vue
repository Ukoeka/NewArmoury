<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="max-w-xl p-0 bg-[#111722] border border-[#324467]/50">
      <DialogHeader class="px-6 pt-6 pb-0">
        <DialogTitle class="text-white text-2xl font-black">
          Transfer Confirmation
        </DialogTitle>
        <DialogDescription class="text-[#92a4c9] text-sm mt-1">
          Please review the transfer details and enter the confirmation code to proceed.
          </DialogDescription>
      </DialogHeader>
      
      <div class="flex flex-col gap-8 p-6 sm:p-8">
        <!-- Summary Grid -->
        <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <dt class="text-sm text-muted-foreground">Transfer ID</dt>
            <dd class="font-medium mt-1">TRF-001</dd>
          </div>

          <div>
            <dt class="text-sm text-muted-foreground">Delivery Officer</dt>
            <dd class="font-medium mt-1 capitalize">Officer Jame E. Nano</dd>
          </div>

          <div>
            <dt class="text-sm text-muted-foreground">From(Delivery Branch)</dt>
            <dd class="font-medium mt-1">Del Mar</dd>
          </div>

          <div>
            <dt class="text-sm text-muted-foreground">Due Date</dt>
            <dd class="font-medium mt-1 capitalize">12-12-2025</dd>
          </div>
        </dl>

        <!-- OTP -->
        <div class="flex flex-col items-center gap-4 py-4">
          <label class="text-white text-base font-medium">Enter Confirmation Code</label>

          <div class="flex gap-2 sm:gap-4">
            <InputOTP :maxlength="6" :auto-focus="true" class="justify-center capitalize">
              <InputOTPGroup>
                <InputOTPSlot :index="0" />
                <InputOTPSlot :index="1" />
                <InputOTPSlot :index="2" />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot :index="3" />
                <InputOTPSlot :index="4" />
                <InputOTPSlot :index="5" />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </div>

        <DialogFooter>
          <div class="mt-6 flex justify-start gap-4">
            <DialogClose>
              <Button type="button" variant="outline">Close</Button>
            </DialogClose>
            <Button type="submit" form="kit-form" class="bg-green-600 text-amber-100">Confirm Transfer</Button>
          </div>
        </DialogFooter>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from '@/components/ui/input-otp'



const props = defineProps<{
  isOpen: boolean,
}>();


const emits = defineEmits<{
  (e: 'update:isOpen', value: boolean): void,
  // (e: 'confirm', payload: Kit): void
}>()


const localOpen = ref(props.isOpen)
watch(() => props.isOpen, v => localOpen.value = v)
watch(localOpen, v => emits('update:isOpen', v))

</script>
