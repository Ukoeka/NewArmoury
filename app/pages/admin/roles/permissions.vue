<script setup lang="ts">
definePageMeta({ title: 'Role Permissions', layout: 'admin-layout' })
import { ref } from 'vue'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'


const selectedRole = ref('administrator')
const groups = ref([
  {
    name: 'Firearm Management',
    permissions: [
      'Create Firearm Record',
      'View Firearm Record',
      'Edit Firearm Record',
      'Delete Firearm Record',
      'Transfer Ownership'
    ],
    open: true
  },
  {
    name: 'Member Management',
    permissions: [
      'Create Member Profile',
      'View Member Profiles',
      'Edit Member Profile',
      'Deactivate Member'
    ],
    open: true
  },
  {
    name: 'Reporting & Audit Logs',
    permissions: [
      'Generate Usage Reports',
      'Export Data',
      'View System Audit Logs'
    ],
    open: true
  }
])
</script>


<template>
<div class="min-h-screen w-full bg-background-light dark:bg-background-dark text-[#92a4c9] font-display">


  <main class="max-w-4xl px-6 py-10 mx-auto">

    <!-- Heading -->
    <div class="mb-6">
      <Label class="text-3xl font-black text-black dark:text-white">Role Permissions Assignment</Label>
      <Label class="text-black/60 dark:text-white/60">Select a role to manage its permissions across the system.</Label>
    </div>

    <!-- SELECT ROLE -->
    <div class="mb-6 max-w-sm">
      <p class="mb-2 text-sm font-medium text-black dark:text-white">Select a Role to Edit</p>

      <Select v-model="selectedRole">
        <SelectTrigger class="h-12 bg-white/5 text-white border-white/20">
          <SelectValue placeholder="Select role" />
        </SelectTrigger>

        <SelectContent>
          <SelectGroup>
            <SelectItem value="administrator">Administrator</SelectItem>
            <SelectItem value="biso">BISO</SelectItem>
            <SelectItem value="supervisor">Supervisor</SelectItem>
            <SelectItem value="armory_officer">Armory Officer</SelectItem>
            <SelectItem value="security_officer">Security Officer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <!-- PERMISSIONS CARD -->
    <Card class="bg-white/5 dark:bg-black/20 border border-white/10">
      <CardHeader>
        <CardTitle class="text-white flex items-center gap-2">
          Permissions for
          <span class="px-2 py-1 text-sm rounded-full bg-primary/20 text-primary dark:text-white">
            {{ selectedRole }}
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent class="space-y-3">

        <!-- PERMISSION GROUPS -->
        <div v-for="(group,index) in groups" :key="index"
             class="border-b last:border-none border-white/10 py-4">

          <Accordion type="single" :open="group.open ? 'item-' + index : null" class="w-full" collapsible>
          <AccordionItem :value="'item-' + index">
            <AccordionTrigger class="flex items-center justify-between w-full text-left text-white hover:bg-black/10 px-1 py-2">
              <span>{{ group.name }}</span>
              <!-- <ChevronUp class="transition-transform" :class="group.open && 'rotate-180'" /> -->
            </AccordionTrigger>
            <AccordionContent>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">

                <label class="flex gap-2 items-center text-white/80 text-sm font-medium">
                  <Checkbox checked />
                  <span>Select All</span>
                </label>

                <label v-for="item in group.permissions" :key="item"
                       class="flex gap-2 items-center text-white text-sm">
                  <Checkbox checked />
                  <span>{{ item }}</span>
                </label>

              </div>
            </AccordionContent>
          </AccordionItem>
          </Accordion>

        </div>

      </CardContent>

      <CardFooter class="flex justify-end gap-3">
        <Button variant="outline" class="bg-white/10 text-white border-white/20">Cancel</Button>
        <Button variant="secondary" class="bg-blue-700">Save Changes</Button>
      </CardFooter>
    </Card>

  </main>
</div>
</template>
