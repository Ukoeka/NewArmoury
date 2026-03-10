<template>
  <Teleport to="body">
    <div class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
      <Transition
        v-for="toast in toasts"
        :key="toast.id"
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-x-4"
        enter-to-class="opacity-100 translate-x-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-x-0"
        leave-to-class="opacity-0 translate-x-4"
      >
        <div class="flex items-center gap-2.5 bg-[#1e2535] border border-[#2a3448] rounded-xl px-4 py-3 shadow-2xl pointer-events-auto min-w-[240px]">
          <CheckCircle2 v-if="toast.type === 'success'" :size="16" class="text-emerald-400 flex-shrink-0" />
          <XCircle      v-else-if="toast.type === 'error'"   :size="16" class="text-red-400 flex-shrink-0" />
          <Info          v-else                               :size="16" class="text-blue-400 flex-shrink-0" />
          <span class="text-[13px] font-medium text-slate-100">{{ toast.message }}</span>
          <button @click="remove(toast.id)" class="ml-auto text-slate-500 hover:text-slate-300 bg-transparent border-none cursor-pointer p-0.5">
            <X :size="13" />
          </button>
        </div>
      </Transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { CheckCircle2, XCircle, Info, X } from 'lucide-vue-next'
import { useToast } from '@/composables/useToast'

const { toasts, remove } = useToast()
</script>