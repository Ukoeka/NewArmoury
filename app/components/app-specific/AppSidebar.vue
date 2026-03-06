<script setup lang="ts">
import type { SidebarProps } from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  MapPin,
  Shield,
  Package,
  Lock,
  Users,
  ClipboardList,
  CalendarDays,
  TrendingUp,
  TriangleAlert,
  FileText,
  Settings,
} from "lucide-vue-next"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import NavUser from "@/components/app-specific/NavUser.vue"
import { NuxtLink } from "#components"

const props = defineProps<SidebarProps>()

const navGroups = [
  {
    label: "OVERVIEW",
    items: [
      { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "MASTER DATA",
    items: [
      { title: "Use Locations", url: "/admin/locations", icon: MapPin },
      { title: "Arms Register", url: "/admin/arms-register", icon: Shield },
      { title: "Ammunition", url: "/admin/ammunition", icon: Package },
      { title: "Security Devices", url: "/admin/security-devices", icon: Lock },
      { title: "Users & Roles", url: "/admin/users", icon: Users },
    ],
  },
  {
    label: "OPERATIONS",
    items: [
      { title: "Firearm Handover", url: "/admin/allocations", icon: ClipboardList },
      { title: "SP Deployment", url: "/admin/deployment", icon: CalendarDays },
      { title: "Ammo Requests", url: "/admin/inventory/requests", icon: TrendingUp },
      { title: "Occurrence Book", url: "/admin/occurrence", icon: TriangleAlert },
    ],
  },
  {
    label: "REPORTS",
    items: [
      { title: "All Reports", url: "/admin/audit/report", icon: FileText },
    ],
  },
  {
    label: "SYSTEM",
    items: [
      { title: "Settings", url: "/admin/settings", icon: Settings },
    ],
  },
]

const user = {
  name: "John Doe",
  email: "john.doe@example.com",
  avatar: "https://example.com/avatar.jpg",
}
</script>

<template>
  <Sidebar v-bind="props" collapsible="offcanvas" class="armory-sidebar">
    <!-- Header / Logo -->
    <SidebarHeader class="sidebar-header">
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" as-child>
            <NuxtLink to="/" class="logo-link">
              <div class="logo-icon">
                <span class="logo-letter">A</span>
              </div>
              <div class="logo-text">
                <span class="logo-name">Armoury System</span>
                <span class="logo-sub">Comprehensive Management Pla...</span>
              </div>
            </NuxtLink>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>

    <!-- Nav Groups -->
    <SidebarContent class="sidebar-content">
      <template v-for="(group, gi) in navGroups" :key="group.label">
        <SidebarGroup class="nav-group">
          <SidebarGroupLabel class="group-label">{{ group.label }}</SidebarGroupLabel>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in group.items" :key="item.title">
              <SidebarMenuButton as-child>
                <NuxtLink :to="item.url" class="nav-item">
                  <component :is="item.icon" class="nav-icon" />
                  <span class="nav-label">{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator v-if="gi < navGroups.length - 1" class="group-sep" />
      </template>
    </SidebarContent>

    <SidebarFooter>
      <NavUser :user="user" />
    </SidebarFooter>

    <SidebarRail />
  </Sidebar>
</template>

<style scoped>
/* Sidebar shell */
:deep(.armory-sidebar),
:deep([data-sidebar="sidebar"]) {
  background: #0f1117 !important;
  border-right: 1px solid #1e2535 !important;
  width: 260px;
  overflow-x: hidden;
}

/* Header */
.sidebar-header {
  padding: 16px 12px 12px;
}
.logo-link {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}
.logo-icon {
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.logo-letter {
  font-size: 16px;
  font-weight: 800;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
}
.logo-text {
  display: flex;
  flex-direction: column;
  gap: 1px;
  overflow: hidden;
}
.logo-name {
  font-size: 14px;
  font-weight: 700;
  color: #f1f5f9;
  white-space: nowrap;
  font-family: 'DM Sans', sans-serif;
}
.logo-sub {
  font-size: 11px;
  color: #475569;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-family: 'DM Sans', sans-serif;
}

/* Content */
.sidebar-content {
  padding: 4px 8px;
  overflow-x: hidden;
}

/* Groups */
.nav-group {
  padding: 8px 0 4px;
}
.group-label {
  font-size: 10.5px !important;
  font-weight: 700 !important;
  letter-spacing: 0.8px !important;
  color: #475569 !important;
  text-transform: uppercase;
  padding: 0 8px 6px !important;
  font-family: 'DM Sans', sans-serif;
}
.group-sep {
  background: #1e2535 !important;
  margin: 2px 8px !important;
}

/* Nav items */
.nav-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: 8px;
  text-decoration: none;
  color: #94a3b8;
  transition: all 0.15s;
  font-family: 'DM Sans', sans-serif;
  width: 100%;
}
.nav-item:hover {
  background: #1a2030;
  color: #e2e8f0;
}
.nav-item.router-link-active,
.nav-item.router-link-exact-active {
  background: #2B7FFF1A !important;
  color: #3b82f6;
}
.nav-icon {
  width: 17px;
  height: 17px;
  flex-shrink: 0;
  stroke-width: 1.8;
}
.nav-item.router-link-active .nav-icon,
.nav-item.router-link-exact-active .nav-icon {
  color: #3b82f6;
}
.nav-label {
  font-size: 13.5px;
  font-weight: 500;
}

/* Override shadcn button wrapper */
:deep([data-sidebar="menu-button"]) {
  padding: 8px !important;
  height: auto !important;
  background: transparent !important;
}
:deep([data-sidebar="menu-button"]:hover) {
  background: #2B7FFF1A !important;
}
</style>