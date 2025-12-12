<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"
import { GalleryVerticalEnd } from "lucide-vue-next"
import {
  LayoutDashboard,
  Image,
  SendHorizontal,
  FileText,
  Users,
  ChartColumn,
} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar"
import NavUser from "@/components/app-specific/NavUser.vue"
import { NuxtLink, Title } from "#components"
import { url } from "zod"

const props = defineProps<SidebarProps>()

// sample navigation data with proper routes and icons
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: LayoutDashboard,
      items: [],
    },
    {
      title: "Inventory",
      url: "",
      icon: Image,
      items: [
        {
          title: "Inventory",
          url: "/admin/inventory"
        },
        {
          title: "Requests",
          url: "/admin/inventory/requests"
        },
      ],
    },
    {
      title: "Allocations",
      url: "",
      icon: SendHorizontal,
      items: [
        {
          title: "Handover/Issuance",
          url: "/admin/allocations"
        },
        {
          title: "Locations",
          url: "#"
        },
        {
          title: "Shifts",
          url: "#"
        }
      ],
    },
    {
      title: "Logs",
      url: "/admin/audit/logs",
      icon: FileText,
      items: [
      
      ]
    },
    {
      title: "Report",
      url: "/admin/audit/report",
      icon: ChartColumn,
      items: [
      ]
    },
    {
      title: "Personnel",
      url: null,
      icon: Users,
      items: [
        { title: "Users", url: "/admin/users" },
        { title: "Roles", url: "/admin/roles" },
      ],
    },
  ],
  user: {
    name: "John Doe",
    email: "john.doe@example.com",
    avatar: "https://example.com/avatar.jpg",
  },
}
</script>

<template>
  <Sidebar v-bind="props" collapsible="offcanvas">
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/" class="flex items-center gap-3">
              <div
                class="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <GalleryVerticalEnd />
              </div>
              <div class="flex flex-col gap-0.5 leading-none">
                <span class="font-medium">ArmoryCore</span>
                <span class="text-sm">v1.0.0</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <SidebarContent>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem v-for="item in data.navMain" :key="item.title">
            <SidebarMenuButton as-child>
              <template v-if="item.url">
                <NuxtLink :to="item.url" class="flex items-center gap-3">
                  <component :is="item.icon" class="w-5 h-5 shrink-0" />
                  <span class="font-medium">{{ item.title }}</span>
                </NuxtLink>
              </template>

              <template v-else>
                <div class="flex items-center gap-3 cursor-default select-none">
                  <component :is="item.icon" class="w-5 h-5 shrink-0" />
                  <Label class="font-medium">{{ item.title }}</Label>
                </div>
              </template>
            </SidebarMenuButton>

            <SidebarMenuSub v-if="item.items && item.items.length">
              <SidebarMenuSubItem v-for="childItem in item.items" :key="childItem.title">
                <SidebarMenuSubButton as-child>
                  <NuxtLink :to="childItem.url" class="pl-8">
                    {{ childItem.title }}
                  </NuxtLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>

    <SidebarFooter>
      <NavUser :user="data.user" />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>
