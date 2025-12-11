<template>
  <div class="min-h-screen flex flex-col justify-between max-w-[960px] mx-auto px-4 md:px-6">

    <!-- Header -->
    <header
      class="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 py-3"
    >
      <div class="flex items-center gap-4 text-slate-900 dark:text-white">
        <GalleryVerticalEnd class="h-5 w-5 text-primary" />
        <h2 class="text-lg font-bold tracking-tight">ArmoryCore</h2>
      </div>
    </header>

    <!-- Main -->
    <main class="mt-8 mx-4 md:mx-8 flex flex-col space-y-10 grow justify-center">

      <div class="flex flex-col gap-y-2">
        <h1 class="text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white">
          Official Firearm Management Portal
        </h1>
        <h2 class="text-base md:text-lg text-slate-600 dark:text-slate-400">
          Securely manage, register, and track firearm records and licensing.
        </h2>
      </div>

      <div class="flex flex-row gap-4">
        <NuxtLink to="/auth/login">
          <Button class="h-10 md:h-12 px-4 md:px-5 text-sm md:text-base font-bold cursor-pointer bg-blue-600 text-white">
            Access Portal
          </Button>
        </NuxtLink>

        <NuxtLink to="/learn-more">
          <Button
            variant="outline"
            class="h-10 md:h-12 px-4 md:px-5 text-sm md:text-base font-bold cursor-pointer"
          >
            Learn More
          </Button>
        </NuxtLink>
      </div>
    <!-- TODO: Add a vertical carousel to the right of the screen  -->
    </main>

    <!-- Footer -->
    <footer
      class="flex flex-col gap-6 py-10 text-center border-t border-slate-200 dark:border-slate-800"
    >
      <div class="flex flex-row items-center justify-center gap-x-6">
        <NuxtLink
          to="/about"
          class="text-slate-800 text-sm font-medium  hover:text-primary"
        >
          About Us
        </NuxtLink>

        <NuxtLink
          to="/terms"
          class="text-slate-800  text-sm font-medium  hover:text-primary dark:hover:text-white"
        >
          Terms and Conditions
        </NuxtLink>

        <NuxtLink
          to="/privacy"
          class="text-slate-800  text-sm font-medium  hover:text-primary dark:hover:text-white"
        >
          Privacy Policy
        </NuxtLink>
      </div>

      <p class="text-slate-500 dark:text-slate-500 text-sm">
        © 2024 Firearm Management System. All Rights Reserved.
      </p>
    </footer>

  </div>
</template>

<script setup>
import { Button } from '@/components/ui/button'
import { GalleryVerticalEnd } from "lucide-vue-next"
</script>

<style>
/* Tailwind config must include custom colors if used */
</style>
