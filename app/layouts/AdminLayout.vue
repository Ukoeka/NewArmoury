<script lang="ts">
export const iframeHeight = "800px"
export const description = "A sidebar with submenus."

export interface BreadCrumbProps {
  label: string
  href?: string
  isCurrentPage?: boolean
}
</script>

<!-- /layouts/app.vue -->
<script setup lang="ts">
import AppSidebar from '@/components/app-specific/AppSidebar.vue'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"

const route = useRoute()

</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset>
      <header class="flex h-16 shrink-0 items-center gap-2 border-b">
        <div class="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" class="mr-2 h-4" />

          <!-- <Breadcrumb>
            <BreadcrumbList class="flex flex-row items-center space-x-1">
              <BreadcrumbItem
                v-for="(item, index) in breadcrumbItems"
                :key="item.label"
                class="flex items-center"
              >
                <template v-if="item.href && !item.isCurrentPage">
                  <BreadcrumbLink :href="item.href">
                    {{ item.label }}
                  </BreadcrumbLink>
                </template>

                <template v-else>
                  <BreadcrumbPage>
                    {{ item.label }}
                  </BreadcrumbPage>
                </template>

                <BreadcrumbSeparator
                  v-if="index < breadcrumbItems.length - 1"
                  class="mx-1"
                />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb> -->
        </div>
      </header>

      <div class="flex flex-1 flex-col gap-4 p-4">
        <slot ></slot>
      </div>
    </SidebarInset>
  </SidebarProvider>
</template>
