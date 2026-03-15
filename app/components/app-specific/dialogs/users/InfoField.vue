<!-- components/ui/InfoField.vue -->
<script setup lang="ts">
defineProps<{ label: string; value?: string | null }>()
</script>

<template>
  <div class="flex flex-col gap-0.5 bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-3">
    <span class="text-[11px] text-slate-500 font-medium">{{ label }}</span>
    <span class="text-[13.5px] font-semibold text-slate-100 truncate">{{ value || '—' }}</span>
  </div>
</template>