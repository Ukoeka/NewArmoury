<!-- /layouts/app.vue -->
<script setup lang="ts">
import AppSidebar from '@/components/app-specific/AppSidebar.vue'
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut, User } from 'lucide-vue-next'

const route = useRoute()

const currentUser = {
  name: 'J. K. Mwamba',
  role: 'SYSTEM ADMIN',
}
</script>

<template>
  <SidebarProvider>
    <AppSidebar />

    <SidebarInset class="bg-[#0A0E1A]">

      <!-- Header -->
      <header class="flex  shrink-0 items-center justify-between bg-[#0A0E1A] border-b border-[#1e2535] px-5 py-5">

        <!-- Left: trigger + logo -->
        <div class="flex items-center gap-">
          <SidebarTrigger
            class="text-slate-400 hover:text-slate-200 hover:bg-[#1a2030] rounded-lg p-2 transition-all border-none bg-transparent cursor-pointer"
          />
          <Separator orientation="vertical" class="h-4 bg-[#1e2535]" />
          <!-- <div class="flex items-center gap-2.5 ml-1">
            <div class="w-13 h-13 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
              <span class="text-[18px] font-extrabold text-white">A</span>
            </div>
            <div class="flex flex-col gap-px">
              <span class="text-[18px] font-bold text-slate-100 leading-none">Armoury System</span>
              <span class="text-[12px] text-slate-500 leading-none">Comprehensive Management Platform</span>
            </div>
          </div> -->
        </div>

        <!-- Right: user info + sign out -->
        <div class="flex items-center gap-3">
          <!-- User pill -->
          <div class="flex items-center gap-2.5 bg-[#161b27] border border-[#1e2535] rounded-xl px-3 py-2">
            <div class="w-7 h-7 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center flex-shrink-0">
              <User :size="14" class="text-blue-400" />
            </div>
            <div class="flex flex-col gap-px">
              <span class="text-[13px] font-semibold text-slate-100 leading-none">{{ currentUser.name }}</span>
              <span class="text-[10.5px] text-slate-500 leading-none">{{ currentUser.role }}</span>
            </div>
          </div>

          <!-- Sign out button -->
          <button class="flex items-center gap-2 bg-transparent border border-[#1e2535] text-slate-400 hover:text-slate-200 hover:border-slate-600 rounded-xl px-3 py-2 text-[13px] font-medium cursor-pointer transition-all whitespace-nowrap">
            <LogOut :size="14" />
            Sign Out
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