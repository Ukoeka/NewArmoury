<script setup lang="ts">
definePageMeta({
  description: "Detailed view of a specific firearm in the inventory, including specifications, custody history, and maintenance logs.",
  layout: "admin-layout",
})
import {
  Card, CardHeader, CardTitle, CardContent,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { PlusCircleIcon } from "lucide-vue-next"

const firearm = {
  serial: "G19-836492",
  make: "Glock",
  model: "19 Gen5",
  caliber: "9mm",
  barrelLength: "4.02 inches",
  image:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCSIhnuccCtxXX4rAe7xm3EDeiQoZPwcr7o7LuKp-I2uyiSrSmXf03ASnwbL81aRmk55ALN7DyAfv3ife_xE_BGN7qhkjB-37sP46uU7LDSWpSP4aXqgPr7OZQKGP2jB4m3Y6zdzYgfAfLu1URHByF_Lsx_KwvsxMOamI_0HVGgTCvfrROM2Mb6qoo60DHp_yx9C8t5vc5U5RKJYsF6z7ODn7x-JPIG-UFwnT-bP-moUrLlnp9CaOEMc3dM2FHU3kZeUUHuh5-3xQ-_",
  status: "Issued",
  assetTag: "3855-A",
}

const custody = [
  { label: "Issued to Officer Miller", date: "June 15, 2024", color: "amber" },
  { label: "Returned to Armory", date: "June 1, 2024", color: "green" },
  { label: "Maintenance Performed", date: "May 28, 2024", color: "slate" },
  { label: "Acquired by Department", date: "January 12, 2023", color: "slate" },
]
</script>

<template>
  <div class="px-6 py-10">

    

    <!-- Header -->
    <div class="flex items-start justify-between mb-8 flex-wrap">
      <div>
        <h1 class="text-3xl font-black dark:text-white">
          Serial Number: {{ firearm.serial }}
        </h1>
        <p class="text-slate-500 dark:text-slate-400">
          View and manage firearm details, history, and logs.
        </p>
      </div>

      <Button class="mt-4 sm:mt-0">
        <PlusCircleIcon/>
        Log Maintenance
      </Button>
    </div>

    <div class="grid lg:grid-cols-3 gap-8">

      <!-- LEFT -->
      <div class="flex flex-col gap-6">

        <!-- Firearm Card -->
        <Card>
          <CardContent class="p-6">

            <div class="relative mb-4">
              <div
                class="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat"
                :style="`background-image: url('${firearm.image}')`"
              />
              <Button variant="secondary" class="absolute bottom-2 right-2 h-8 px-3 text-xs">
                <span class="material-symbols-outlined text-sm">edit</span>
                Change
              </Button>
            </div>

            <h3 class="text-xl font-bold mb-1 dark:text-white">
              {{ firearm.make }} {{ firearm.model }}
            </h3>

            <div class="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <p>Pistol</p>
              <span>•</span>
              <p>Asset Tag: {{ firearm.assetTag }}</p>
            </div>

            <Badge variant="secondary" class="mb-6">
              {{ firearm.status }}
            </Badge>

            <div class="flex flex-col gap-2">
              <Button>Edit Details</Button>
              <Button variant="outline">Issue Firearm</Button>
            </div>

          </CardContent>
        </Card>

        <!-- Chain of Custody -->
        <Card>
          <CardHeader>
            <CardTitle>Chain of Custody</CardTitle>
          </CardHeader>
          <CardContent>

            <div class="relative border-l border-slate-300 dark:border-slate-700 pl-6 space-y-6">
              <div
                v-for="(entry, i) in custody"
                :key="i"
                class="relative"
              >
                <span
                  class="absolute -left-[33px] top-1 h-4 w-4 rounded-full ring-4"
                  :class="{
                    'bg-amber-500 ring-amber-200 dark:ring-amber-900/50': entry.color === 'amber',
                    'bg-green-500 ring-green-200 dark:ring-green-900/50': entry.color === 'green',
                    'bg-slate-400 ring-slate-200 dark:ring-slate-800': entry.color === 'slate'
                  }"
                />
                <p class="font-semibold text-sm dark:text-white">{{ entry.label }}</p>
                <p class="text-xs text-slate-500">{{ entry.date }}</p>
              </div>
            </div>

          </CardContent>
        </Card>

      </div>

      <!-- RIGHT -->
      <div class="lg:col-span-2">

        <Tabs default-value="overview" >
          <TabsList class="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="issuance">Issuance History</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <!-- OVERVIEW TAB -->
          <TabsContent value="overview">
            <Card>
              <CardHeader>
                <CardTitle>Firearm Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div class="grid sm:grid-cols-2 gap-6">
                  <div>
                    <p class="text-sm text-slate-500">Make</p>
                    <p class="text-sm font-medium dark:text-white">{{ firearm.make }}</p>
                  </div>

                  <div>
                    <p class="text-sm text-slate-500">Model</p>
                    <p class="text-sm font-medium dark:text-white">{{ firearm.model }}</p>
                  </div>

                  <div>
                    <p class="text-sm text-slate-500">Caliber</p>
                    <p class="text-sm font-medium dark:text-white">{{ firearm.caliber }}</p>
                  </div>

                  <div>
                    <p class="text-sm text-slate-500">Barrel Length</p>
                    <p class="text-sm font-medium dark:text-white">{{ firearm.barrelLength }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>

      </div>
    </div>
  </div>
</template>
