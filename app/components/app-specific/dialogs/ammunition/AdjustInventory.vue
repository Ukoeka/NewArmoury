<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[420px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">Adjust Inventory</DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">Add or remove ammunition from inventory</DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
        
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Current Inventory card -->
        <div class="bg-slate-700/30 border border-slate-600/30 rounded-lg px-4 py-3.5">
          <p class="text-[11.5px] text-slate-500 mb-1">Current Inventory</p>
          <p class="text-[14px] font-bold text-slate-100">{{ inventoryLabel }}</p>
          <p v-if="inventory?.branch" class="text-[11.5px] text-slate-500 mt-0.5">{{ inventory.branch }} · {{ inventory.armouryLocation }}</p>
        </div>

        <!-- Action -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Action</label>
          <Select v-model="form.action">
            <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
              <SelectItem value="add" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">
                <div class="flex items-center gap-2">
                  <Plus :size="13" class="text-emerald-400" />
                  Add to Inventory
                </div>
              </SelectItem>
              <SelectItem value="remove" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">
                <div class="flex items-center gap-2">
                  <Minus :size="13" class="text-red-400" />
                  Remove from Inventory
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <!-- Quantity -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Quantity</label>
          <input
            v-model="form.quantity"
            type="number"
            placeholder="Enter quantity"
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]"
          />
        </div>

        <!-- Narration -->
        <div class="flex flex-col gap-2">
          <label class="text-[13px] font-semibold text-slate-200">Narration (Reason for adjustment)</label>
          <textarea
            v-model="form.narration"
            rows="3"
            placeholder="Provide reason for this adjustment..."
            class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors resize-none"
          />
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          {{ form.action === 'add' ? 'Add Ammunition' : 'Remove Ammunition' }}
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { X, Plus, Minus } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface AmmoInventoryItem {
  id: number
  ammoType: string
  quantity: number
  branch: string
  armouryLocation: string
}

export interface AdjustForm {
  action: 'add' | 'remove'
  quantity: number
  narration: string
}

const props = defineProps<{
  open: boolean
  inventory?: AmmoInventoryItem | null
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: AdjustForm): void
}>()

const inventoryLabel = computed(() =>
  props.inventory ? `${props.inventory.ammoType} - ${props.inventory.quantity} rounds` : '—'
)

const form = ref<AdjustForm>({ action: 'add', quantity: 0, narration: '' })

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
  form.value = { action: 'add', quantity: 0, narration: '' }
}
</script>