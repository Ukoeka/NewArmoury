<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <Button>Confirm Delivery</Button>
    </DialogTrigger>

    <DialogContent class="max-w-xl p-0 bg-[#111722] border border-[#324467]/50">
      <div class="flex flex-col gap-8 p-6 sm:p-8">
        <!-- Heading -->
        <div class="flex flex-col gap-2">
          <p class="text-white text-3xl font-black leading-tight sm:text-4xl">
            Confirm Ammunition Delivery
          </p>
          <p class="text-[#92a4c9] text-base">
            Enter the 6-digit code provided by the delivering officer to confirm receipt.
          </p>
        </div>

        <!-- Summary Grid -->
        <div class="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
          <SummaryItem label="Transfer ID" value="TRN-2024-00123" />
          <SummaryItem label="To (Receiving Branch)" value="District 5 Precinct" />
          <SummaryItem label="From (Delivering Branch)" value="Central Armory" />
          <SummaryItem label="Item Summary" value="9mm - 5000 rounds, 5.56mm - 3000 rounds" />
        </div>

        <!-- OTP -->
        <div class="flex flex-col items-center gap-4 py-4">
          <label class="text-white text-base font-medium">Confirmation Code</label>

          <div class="flex gap-2 sm:gap-4">
            <OtpInput v-for="i in 6" :key="i" ref="otpRefs[i]" @filled="onOtpFilled" />
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex flex-col sm:flex-row-reverse gap-3 pt-4 border-t border-t-[#324467]">
          <Button
            class="bg-primary text-white font-bold h-12 hover:bg-primary/90"
            @click="submitCode"
          >
            Confirm Receipt
          </Button>

          <Button
            variant="secondary"
            class="bg-[#232f48] text-white h-12 hover:bg-[#232f48]/80"
            @click="open = false"
          >
            Cancel
          </Button>
        </div>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"

const open = ref(false)

// OTP handling
const otp = reactive(["", "", "", "", "", ""])
const otpRefs = Array.from({ length: 7 }, () => ref(null))

const onOtpFilled = () => {
  // Optional: auto-submit if all fields filled
}

const submitCode = () => {
  const fullCode = otp.join("")
  console.log("Entered Code:", fullCode)
  open.value = false
}
</script>

<!-- Summary item component -->
<script lang="ts">
export default {
  components: {
    SummaryItem: {
      props: { label: String, value: String },
      template: `
        <div class="flex flex-col gap-1 border-t border-solid border-t-[#324467] py-4">
          <p class="text-[#92a4c9] text-sm">{{ label }}</p>
          <p class="text-white text-sm font-semibold">{{ value }}</p>
        </div>
      `
    },
    OtpInput: {
      emits: ["filled"],
      template: `
        <input
          class="flex h-14 w-12 text-center text-2xl font-bold text-white
          rounded-lg border border-[#324467] bg-[#232f48]
          focus:outline-none focus:ring-2 focus:ring-primary"
          maxlength="1"
          @input="onInput"
          @keydown="onKeydown"
        />
      `,
      methods: {
        onInput(e: any) {
          const val = e.target.value.replace(/\D/g, "")
          e.target.value = val
          if (val && this.$el.nextElementSibling) {
            this.$el.nextElementSibling.focus()
          }
          this.$emit("filled")
        },
        onKeydown(e: any) {
          if (e.key === "Backspace" && !e.target.value && this.$el.previousElementSibling) {
            this.$el.previousElementSibling.focus()
          }
        }
      }
    }
  }
}
</script>
