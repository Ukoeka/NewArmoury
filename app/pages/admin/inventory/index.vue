<script setup lang="ts">
definePageMeta({ title: 'Inventory', layout: 'admin-layout'})

import Firearms from "@/components/app-specific/partial-page/firearms.vue"
import Ammunitions from "@/components/app-specific/partial-page/ammunitions.vue"
import Kits from "@/components/app-specific/partial-page/kits.vue"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
</script>

<template>
  <Tabs default-value="firearms" class="w-full flex-col justify-start gap-6">
    <!-- Tab Header -->
  <TabsList>
      <TabsTrigger value="firearms">
        Firearms
      </TabsTrigger>
      <TabsTrigger value="ammunitions">
        Ammunitions
      </TabsTrigger>
      <TabsTrigger value="kits">
        Kits
      </TabsTrigger>
    </TabsList>


    <!-- Tab Content -->
    <TabsContent value="firearms" class="flex flex-col  lg:px-6">
      <Firearms />
    </TabsContent>
    <TabsContent value="ammunitions" class="flex flex-col  lg:px-6">
      <Ammunitions />
    </TabsContent>
    <TabsContent value="kits" class="flex flex-col  lg:px-6">
      <Kits />
    </TabsContent>
  </Tabs>
</template>
