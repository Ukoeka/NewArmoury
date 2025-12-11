<script setup lang="ts">
definePageMeta({ layout: "admin-layout" })

import { format } from "date-fns"
import { ChevronRight, Edit2, PlusCircle } from "lucide-vue-next"
import { useKit } from "~/composables/kit/useKit"

const { kit } = useKit()

const imageUrl = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSIhnuccCtxXX4rAe7xm3EDeiQoZPwcr7o7LuKp-I2uyiSrSmXf03ASnwbL81aRmk55ALN7DyAfv3ife_xE_BGN7qhkjB-37sP46uU7LDSWpSP4aXqgPr7OZQKGP2jB4m3Y6zdzYgfAfLu1URHByF_Lsx_KwvsxMOamI_0HVGgTCvfrROM2Mb6qoo60DHp_yx9C8t5vc5U5RKJYsF6z7ODn7x-JPIG-UFwnT-bP-moUrLlnp9CaOEMc3dM2FHU3kZeUUHuh5-3xQ-_'
</script>

<template>
  <div class="min-h-screen bg-background">
    <main class="px-6 py-8 mx-auto max-w-7xl">

      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <NuxtLink to="/" class="hover:text-foreground">Dashboard</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <NuxtLink to="/admin/inventory" class="hover:text-foreground">Inventory</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <span class="font-medium text-foreground">{{ kit?.name }}</span>
      </nav>

      <!-- Page Header -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black tracking-tight">Kit: {{ kit?.name }}</h1>
          <p class="text-muted-foreground mt-1">View and manage kit details, inventory and issuance history.</p>
        </div>

        <Button class="bg-blue-600 text-white">
          <PlusCircle class="w-4 h-4 mr-2" /> Log Maintainance
        </Button>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">

        <!-- Left Column -->
        <div class="space-y-6">

          <!-- Summary Card -->
          <Card>
            <CardContent class="p-6 space-y-6">
              <div>
                <img :src="imageUrl" alt="Glock 19 Gen5" class="w-full rounded-lg object-cover aspect-video" />
                <h3 class="text-xl font-bold mb-1">{{ kit?.name }}</h3>
                <p class="text-muted-foreground text-sm capitalize">{{ kit?.type }} Kit</p>
              </div>

              <Badge :class="kit?.status === 'available' ? 'bg-green-600' :
                kit?.status === 'lost' ? 'bg-red-600' :
                  'bg-yellow-600'">
                {{ kit?.status }}
              </Badge>
            <Separator/>
              <!-- <div class="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p class="text-sm text-muted-foreground">Quantity</p>
                  <p class="font-semibold">{{ kit?.quantity }}</p>
                </div>
                <div>
                  <p class="text-sm text-muted-foreground">Created</p>
                  <p class="font-semibold">{{ kit?.createdAt  }}</p>
                </div>
              </div> -->
              <div class="flex flex-col gap-3">
                <Button class="w-full bg-blue-600 text-white">
                  <Edit2 class="w-4 h-4 mr-2" /> Edit Kit
                </Button>
                <!-- <Button variant="outline" class="w-full">Issue Kit</Button> -->
              </div>
            </CardContent>
          </Card>

          <!-- Notes -->
          <Card>
            <CardHeader>
              <CardTitle>Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <p class="text-sm text-muted-foreground whitespace-pre-wrap">
                {{ kit?.notes || "No notes available." }}
              </p>
            </CardContent>
          </Card>

        </div>

        <!-- Right Column -->
        <div class="lg:col-span-2">

          <Tabs default-value="overview" class="w-full">

            <TabsList class="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="issuance">Issuance History</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
            </TabsList>

            <!-- OVERVIEW TAB -->
            <TabsContent value="overview" class="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Kit Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <dt class="text-sm text-muted-foreground">Kit Name</dt>
                      <dd class="font-medium mt-1">{{ kit?.name }}</dd>
                    </div>

                    <div>
                      <dt class="text-sm text-muted-foreground">Type</dt>
                      <dd class="font-medium mt-1 capitalize">{{ kit?.type }}</dd>
                    </div>

                    <div>
                      <dt class="text-sm text-muted-foreground">Quantity</dt>
                      <dd class="font-medium mt-1">{{ kit?.quantity }}</dd>
                    </div>

                    <div>
                      <dt class="text-sm text-muted-foreground">Status</dt>
                      <dd class="font-medium mt-1 capitalize">{{ kit?.status }}</dd>
                    </div>

                    <div class="sm:col-span-2 border-t pt-6 border-border">
                      <dt class="text-sm text-muted-foreground">Created</dt>
                      <dd class="font-medium mt-1">
                        {{ kit?.createdAt ? format(new Date(kit.createdAt), "MMMM d, yyyy") : "No date" }}
                      </dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <!-- ISSUANCE HISTORY TAB -->
            <TabsContent value="issuance" class="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Issuance History</CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-muted-foreground text-sm">No issuance history yet.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <!-- MAINTENANCE TAB -->
            <TabsContent value="maintenance" class="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maintenance Logs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p class="text-muted-foreground text-sm">No maintenance records found.</p>
                </CardContent>
              </Card>
            </TabsContent>

          </Tabs>

        </div>

      </div>

    </main>
  </div>
</template>
