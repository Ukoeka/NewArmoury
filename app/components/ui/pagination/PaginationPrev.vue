<script setup lang="ts">
import { PaginationPrev } from 'reka-ui'
import { ChevronLeft } from 'lucide-vue-next'
import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'vue'

const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>

<template>
  <PaginationPrev
    :class="cn(
      'inline-flex h-8 w-8 items-center justify-center rounded-lg border border-[#1e2535] text-slate-400 transition-colors cursor-pointer hover:bg-[#1a2030] hover:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed',
      props.class,
    )"
  >
    <slot>
      <ChevronLeft :size="15" />
    </slot>
  </PaginationPrev>
</template>
