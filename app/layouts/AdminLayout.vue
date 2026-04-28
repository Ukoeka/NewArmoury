<!-- /layouts/app.vue -->
<script setup lang="ts">
import AppSidebar from '@/components/app-specific/AppSidebar.vue'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Bell, LogOut, User } from 'lucide-vue-next'
import { useAuth } from '~/composables/auth/useAuth'
import { useUserStore } from '~/stores/user'
import { useNotifications } from '~/composables/util/useNotifications'



const { logout: handleSignOut } = useAuth()
const { notifications, unread, markAllRead } = useNotifications()
const { currentUser } = useUserStore()

</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset class="bg-[#0A0E1A]">

      <!-- Header -->
      <header class="flex shrink-0 items-center justify-between bg-[#0A0E1A] border-b border-[#1e2535] px-3 sm:px-4 py-3">

        <!-- Left: trigger + logo -->
        <div class="flex items-center gap-0">
          <SidebarTrigger
            class="text-slate-400 hover:text-slate-200 hover:bg-[#1a2030] rounded-lg p-2 transition-all border-none bg-transparent cursor-pointer"
          />
          <Separator orientation="vertical" class="h-4 bg-[#1e2535] hidden sm:block" />
        </div>

        <!-- Right: notifications + user info + sign out -->
        <div class="flex items-center gap-2 sm:gap-3">

          <!-- Notification bell -->
          <DropdownMenu @update:open="open => open && markAllRead()">
            <DropdownMenuTrigger as-child>
              <button class="relative flex items-center justify-center w-9 h-9 rounded-xl bg-[#161b27] border border-[#1e2535] text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all cursor-pointer">
                <Bell :size="15" />
                <span
                  v-if="unread > 0"
                  class="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-blue-600 text-[10px] font-bold text-white flex items-center justify-center leading-none"
                >
                  {{ unread > 99 ? '99+' : unread }}
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              class="w-72 sm:w-80 bg-[#161b27] border-[#1e2535] p-0 overflow-hidden"
            >
              <DropdownMenuLabel class="px-4 py-3 text-[13px] font-semibold text-slate-200 border-b border-[#1e2535]">
                Notifications
              </DropdownMenuLabel>
              <div class="max-h-80 overflow-y-auto">
                <template v-if="notifications.length">
                  <DropdownMenuItem
                    v-for="n in notifications"
                    :key="n.id"
                    class="flex flex-col items-start gap-0.5 px-4 py-3 cursor-default border-b border-[#1e2535] last:border-0 focus:bg-[#1D293D]"
                    :class="!n.read ? 'bg-blue-600/5' : ''"
                  >
                    <div class="flex items-center gap-2 w-full">
                      <span class="text-[12px] font-semibold text-slate-200 flex-1">{{ n.title }}</span>
                      <span v-if="!n.read" class="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    </div>
                    <span class="text-[12px] text-slate-400 leading-snug">{{ n.message }}</span>
                    <span class="text-[11px] text-slate-600 mt-0.5">{{ n.created_at }}</span>
                  </DropdownMenuItem>
                </template>
                <div v-else class="px-4 py-6 text-center text-[13px] text-slate-500">
                  No notifications
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <!-- User pill -->
          <div class="hidden sm:flex items-center gap-2.5 bg-[#161b27] border border-[#1e2535] rounded-xl px-3 py-2">
            <div class="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shrink-0">
              <User :size="14" class="text-blue-400" />
            </div>
            <div class="flex flex-col gap-px">
              <span class="text-[14px] font-semibold text-slate-100 mb-2 leading-none">{{ currentUser?.username }}</span>
              <span class="text-[10.5px] text-slate-500 leading-none">{{ currentUser?.role.name }}</span>
            </div>
          </div>

          <!-- Mobile user button -->
          <button class="sm:hidden flex items-center justify-center w-9 h-9 rounded-xl bg-[#161b27] border border-[#1e2535] text-slate-400 hover:text-slate-200 hover:border-slate-600 transition-all cursor-pointer">
            <User :size="16" class="text-blue-400" />
          </button>

          <!-- Sign out button -->
          <button
            class="flex items-center gap-1 sm:gap-2 bg-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600 hover:bg-[#161b27] rounded-xl px-2 sm:px-3 py-2 text-[12px] sm:text-[13px] font-medium cursor-pointer transition-all"
            @click="handleSignOut"
          >
            <LogOut :size="14" />
            <span class="hidden sm:inline">Sign Out</span>
          </button>
        </div>

      </header>

      <!-- Page content -->
      <div class="flex flex-1 flex-col bg-[#0A0E1A]">
        <slot />
      </div>

    </SidebarInset>
  </SidebarProvider>
</template>