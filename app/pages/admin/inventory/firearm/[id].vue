<script setup lang="ts">
definePageMeta({ layout: "admin-layout" })
import { format } from 'date-fns'
import { ChevronRight, Settings, Bell, Edit2, PlusCircle, Dot } from 'lucide-vue-next'

import { useFirearm } from '~/composables/firearm/useFirearm'

const { firearm } = useFirearm()
const imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSIhnuccCtxXX4rAe7xm3EDeiQoZPwcr7o7LuKp-I2uyiSrSmXf03ASnwbL81aRmk55ALN7DyAfv3ife_xE_BGN7qhkjB-37sP46uU7LDSWpSP4aXqgPr7OZQKGP2jB4m3Y6zdzYgfAfLu1URHByF_Lsx_KwvsxMOamI_0HVGgTCvfrROM2Mb6qoo60DHp_yx9C8t5vc5U5RKJYsF6z7ODn7x-JPIG-UFwnT-bP-moUrLlnp9CaOEMc3dM2FHU3kZeUUHuh5-3xQ-_'
const activeTab = ref('overview')
</script>

<template>
  <div class="min-h-screen bg-background">


    <main class="px-6 py-8 mx-auto max-w-7xl">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <NuxtLink to="/" class="hover:text-foreground">Dashboard</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <NuxtLink to="/admin/inventory" class="hover:text-foreground">Firearms</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <span class="font-medium text-foreground">{{ firearm?.serialNumber }}</span>
      </nav>

      <!-- Page Header -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black tracking-tight">Serial Number: {{ firearm?.serialNumber }}</h1>
          <p class="text-muted-foreground mt-1">View and manage firearm details, history, and logs.</p>
        </div>
        <Button>
          <PlusCircle class="w-4 h-4 mr-2" />
          Log Maintenance
        </Button>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Photo + Summary Card -->
          <Card>
            <CardContent class="p-6">
              <div class="relative mb-6">
                <img :src="imageUrl" alt="Glock 19 Gen5" class="w-full rounded-lg object-cover aspect-video" />
                <Button variant="secondary" size="sm" class="absolute bottom-3 right-3 text-amber-50">
                  <Edit2 class="w-3.5 h-3.5 mr-1" />
                  Change
                </Button>
              </div>

              <h3 class="text-xl font-bold mb-2">{{ firearm?.make }} {{ firearm?.model }}</h3>
              <!-- <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{{ firearm?.type }}</span>
                <span>•</span>
                <span class="font-medium">Asset Tag: {{ firearm?.assetTag }}</span>
              </div> -->

              <Badge variant="default" class="mb-6 bg-amber-600">
                <div class="w-2 h-2 rounded-full bg-amber-500"></div>
                {{ firearm?.status }}
              </Badge>

              <!-- <div class="flex flex-col gap-3">
                <Button class="w-full bg-blue-600 text-amber-50">Edit Details</Button>
                <Button variant="outline" class="w-full">Issue Firearm</Button>
              </div> -->
            </CardContent>
          </Card>

          
          <Card>
            <CardHeader>
              <CardTitle>Note</CardTitle>
            </CardHeader>
            <CardContent>

              <p class="mt-1 text-muted-foreground">{{ firearm?.notes }}</p>

            </CardContent>
          </Card>
        </div>

        <!-- Right Column - Tabs -->
        <div class="lg:col-span-2">
          <Tabs default-value="overview" class="w-full">
            <TabsList class="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issuance">Issuance History</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance History</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" class="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Firearm Specifications</CardTitle>
                  <Separator />
                </CardHeader>
                <CardContent>
                  <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Make</dt>
                      <dd class="mt-1 font-medium">{{ firearm?.make }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Model</dt>
                      <dd class="mt-1 font-medium">{{ firearm?.model }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Caliber</dt>
                      <dd class="mt-1 font-medium">{{ firearm?.caliber }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Manufacturer</dt>
                      <dd class="mt-1 font-medium">{{ firearm?.manufacturer }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Category</dt>
                      <dd class="mt-1 font-medium">{{ firearm?.category }}</dd>
                    </div>
                    <!-- <div>
                      <dt class="text-sm font-medium text-muted-foreground">Condition</dt>
                      <dd class="mt-1 font-medium">{{ firearm?.condition }}</dd>
                    </div> -->
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Acquisition Date</dt>
                      <dd class="mt-1 font-medium">
                        {{ firearm?.acquisitionDate ? format(new Date(firearm?.acquisitionDate), 'MMMM d, yyyy') : "" }}
                      </dd>
                    </div>

                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Added Date</dt>
                      <dd class="mt-1 font-medium">
                        {{ firearm?.createdAt ? format(new Date(firearm?.createdAt), 'MMMM d, yyyy') : "" }}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  </div>
</template>