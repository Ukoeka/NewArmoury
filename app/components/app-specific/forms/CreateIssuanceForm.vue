<template>
  <Dialog :open="openDialog" >
    <DialogContent
      class="max-w-2xl p-0 overflow-hidden border-none shadow-2xl dark:shadow-black/50
             bg-[#F9FAFB] dark:bg-[#182235]
             max-h-[85vh] flex flex-col">

      <!-- Header -->
      <div class="flex items-start justify-between p-6 border-b border-slate-200 dark:border-slate-800">
        <div class="flex flex-col gap-1">
          <DialogTitle class="text-xl font-semibold text-slate-900 dark:text-white">
            Create New Firearm Issuance
          </DialogTitle>
          <DialogDescription class="text-sm text-slate-500 dark:text-slate-400">
            Select firearms, assign to an officer, and confirm with OTP.
          </DialogDescription>
        </div>
      </div>

      <!-- SCROLLABLE FORM SECTION -->
      <div class="p-6 overflow-y-auto flex-1">
        <form class="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">

          <!-- Officer -->
          <div class="flex flex-col md:col-span-2">
            <Label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Requesting Officer</Label>

            <Select v-model="selectedOfficer">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Select an officer" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="john-doe">Officer John Doe (ID: 12345)</SelectItem>
                <SelectItem value="jane-smith">Officer Jane Smith (ID: 67890)</SelectItem>
                <SelectItem value="mike-johnson">Officer Mike Johnson (ID: 54321)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Firearms -->
          <div class="flex flex-col md:col-span-2">
            <Label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Firearms to Issue</Label>

            <Select v-model="selectedFirearm" @update:model-value="addFirearm">
              <SelectTrigger class="w-full">
                <SelectValue placeholder="Search and select firearms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Glock 19 (SN: G19-001)">Glock 19 (SN: G19-001)</SelectItem>
                <SelectItem value="AR-15 (SN: AR15-002)">AR-15 (SN: AR15-002)</SelectItem>
                <SelectItem value="Remington 870 (SN: R870-003)">Remington 870 (SN: R870-003)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <!-- Added Firearms -->
          <div class="md:col-span-2 space-y-2">
            <div
              v-for="(firearm, index) in selectedFirearms"
              :key="index"
              class="flex items-center justify-between p-3 rounded-lg bg-slate-100 dark:bg-slate-800/50"
            >
              <div class="flex items-center gap-3">
                <Shield class="h-5 w-5 text-primary" />
                <p class="text-sm font-medium text-slate-800 dark:text-slate-200">{{ firearm }}</p>
              </div>

              <Button
                variant="ghost"
                class="p-1 rounded-full text-slate-400 hover:text-destructive hover:bg-red-100 
                       dark:hover:bg-red-900/30 transition-colors"
                @click="removeFirearm(index)"
              >
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>

          <!-- OTP Section -->
          <div class="md:col-span-2 mt-4 pt-6 border-t border-slate-200 dark:border-slate-700">
            <div class="flex flex-col gap-1 mb-4">
              <h4 class="text-base font-semibold text-slate-900 dark:text-white">Officer Confirmation</h4>
              <p class="text-sm text-slate-500 dark:text-slate-400">
                Enter the One-Time Password (OTP) from the officer's device.
              </p>
            </div>

            <Label class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">One-Time Password (OTP)</Label>
            <div class="flex items-center gap-4">
              <Input
                v-model="otp"
                type="text"
                maxlength="6"
                placeholder="------"
                class="w-full text-lg tracking-[0.5em] text-center font-semibold"
              />
              <Button variant="outline" class="whitespace-nowrap" @click="onRequestOtp">
                Request OTP
              </Button>
            </div>
            <p class="text-xs text-slate-500 dark:text-slate-400 mt-2">
              The OTP will be sent to the officer's registered device.
            </p>
          </div>

        </form>
      </div>

      <!-- Footer -->
      <div class="flex items-center justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-800">
        <Button variant="secondary" @click="onClose">Cancel</Button>
        <Button
          :disabled="!otp || otp.length < 6"
          class="flex items-center gap-2"
          @click="onConfirmRequest(otp)"
        >
          <Lock class="h-4 w-4" />
          Confirm & Issue
        </Button>
      </div>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Shield, Trash2, Lock } from 'lucide-vue-next'

/* --- Proper Industry-Standard Props Definition --- */
const { openDialog, onClose, onRequestOtp, onConfirmRequest } = defineProps<{
  openDialog: boolean
  onClose: () => void
  onRequestOtp: () => void
  onConfirmRequest: (otp: string) => void
}>()

const emit = defineEmits(['update:openDialog'])

/* Form State */
const selectedOfficer = ref<string | null>(null)
const selectedFirearm = ref<string | null>(null)

const selectedFirearms = ref<string[]>([
  'Glock 19 (SN: G19-001)',
  'AR-15 (SN: AR15-002)',
])

const otp = ref('')

/* Methods */
const addFirearm = () => {
  if (selectedFirearm.value && !selectedFirearms.value.includes(selectedFirearm.value)) {
    selectedFirearms.value.push(selectedFirearm.value)
  }
  selectedFirearm.value = null
}

const removeFirearm = (index: number) => {
  selectedFirearms.value.splice(index, 1)
}
</script>
