<script setup lang="ts">
import { PaginationListItem } from 'reka-ui'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  class?: HTMLAttributes['class']
  value: number
  isActive?: boolean
}>()
</script>

<template>
  <PaginationListItem
    :value="props.value"
    :class="cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-lg text-[12px] font-medium transition-colors cursor-pointer border',
      props.isActive
        ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-500'
        : 'bg-transparent text-slate-400 border-[#1e2535] hover:bg-[#1a2030] hover:text-slate-200',
      props.class,
    )"
  >
    <slot />
  </PaginationListItem>
</template>
