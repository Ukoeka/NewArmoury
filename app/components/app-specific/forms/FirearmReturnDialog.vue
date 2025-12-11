<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select"

import { ref, watch } from "vue"

const props = defineProps<{
  open: boolean
  firearm?: {
    serial?: string
    model?: string
    officer?: string
  }
}>()

const emits = defineEmits(["update:open", "confirm"])

const localOpen = ref(props.open)
watch(
  () => props.open,
  v => (localOpen.value = v)
)
watch(localOpen, v => emits("update:open", v))

// Form model
const condition = ref("")
const ammoReturned = ref<number>(0)
const notes = ref("")
const reconciled = ref(false)

function submit() {
  emits("confirm", {
    condition: condition.value,
    ammoReturned: ammoReturned.value,
    notes: notes.value,
    reconciled: reconciled.value,
  })
}
</script>

<template>
  <Dialog v-model:open="localOpen">
    <DialogContent class="max-w-2xl space-y-6">
      <DialogHeader>
        <DialogTitle>Return Firearm</DialogTitle>
      </DialogHeader>

      <!-- FIREARM SUMMARY -->
      <div
        class="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 grid grid-cols-2"
      >
        <div class="flex flex-col gap-1 py-2 pr-2">
          <p class="text-slate-500 dark:text-slate-400 text-sm">Serial Number</p>
          <p class="text-slate-900 dark:text-white text-sm font-medium">
            {{ props.firearm?.serial }}
          </p>
        </div>

        <div class="flex flex-col gap-1 py-2 pl-2">
          <p class="text-slate-500 dark:text-slate-400 text-sm">Model</p>
          <p class="text-slate-900 dark:text-white text-sm font-medium">
            {{ props.firearm?.model }}
          </p>
        </div>

        <div class="flex flex-col gap-1 py-2 pr-2 col-span-2">
          <p class="text-slate-500 dark:text-slate-400 text-sm">Assigned To</p>
          <p class="text-slate-900 dark:text-white text-sm font-medium">
            {{ props.firearm?.officer }}
          </p>
        </div>
      </div>

      <!-- FORM -->
      <div class="grid grid-cols-2 gap-4">
        <!-- CONDITION -->
        <div class="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <Label>Condition on Return</Label>

          <Select v-model="condition">
            <SelectTrigger>
              <SelectValue placeholder="Select condition" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="serviceable">Serviceable</SelectItem>
              <SelectItem value="damaged">Damaged</SelectItem>
              <SelectItem value="needs_repair">Needs Repair</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- AMMO -->
        <div class="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <Label>Ammunition Returned</Label>
          <Input type="number" placeholder="0" v-model="ammoReturned" />
        </div>

        <!-- NOTES -->
        <div class="col-span-2 flex flex-col gap-2">
          <Label>Notes</Label>
          <Textarea
            v-model="notes"
            placeholder="Add any observations…"
            class="min-h-24"
          ></Textarea>
        </div>
      </div>

      <!-- RECONCILED -->
      <div class="flex items-center gap-2">
        <Checkbox type="checkbox" v-model="reconciled" class="h-4 w-4" />
        <Label class="text-sm">Mark as reconciled</Label>
      </div>

      <DialogFooter>
        <DialogClose as-child>
          <Button variant="outline">Cancel</Button>
        </DialogClose>

        <Button @click="submit">Confirm Return</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
