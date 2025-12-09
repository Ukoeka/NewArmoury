<script setup lang="ts">
definePageMeta({ layout: "admin-layout" })
import { format } from 'date-fns'
import { ChevronRight, Settings, Bell, Edit2, PlusCircle, Dot } from 'lucide-vue-next'

// Mock firearm data (in real app, fetch via useRoute().params.id)
const firearm = {
  serialNumber: 'G19-836492',
  assetTag: '3855-A',
  make: 'Glock',
  model: '19 Gen5',
  type: 'Pistol',
  caliber: '9mm',
  barrelLength: '4.02 inches',
  finish: 'Matte Black nDLC',
  capacity: '15+1',
  status: 'Issued',
  acquisitionDate: '2023-01-12',
  notes: 'Standard issue firearm. Equipped with night sights. Comes with three standard 15-round magazines.',
  imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCSIhnuccCtxXX4rAe7xm3EDeiQoZPwcr7o7LuKp-I2uyiSrSmXf03ASnwbL81aRmk55ALN7DyAfv3ife_xE_BGN7qhkjB-37sP46uU7LDSWpSP4aXqgPr7OZQKGP2jB4m3Y6zdzYgfAfLu1URHByF_Lsx_KwvsxMOamI_0HVGgTCvfrROM2Mb6qoo60DHp_yx9C8t5vc5U5RKJYsF6z7ODn7x-JPIG-UFwnT-bP-moUrLlnp9CaOEMc3dM2FHU3kZeUUHuh5-3xQ-_',
  custodyHistory: [
    { event: 'Issued to Officer Miller', date: '2024-06-15', type: 'issue' },
    { event: 'Returned to Armory', date: '2024-06-01', type: 'return' },
    { event: 'Maintenance Performed', date: '2024-05-28', type: 'maintenance' },
    { event: 'Acquired by Department', date: '2023-01-12', type: 'acquired' },
  ],
  steps: [
    {
      step: 1,
      title: 'Your details',
      description:
        'Provide your name and email address. We will use this information to create your account',
    },
    {
      step: 2,
      title: 'Company details',
      description: 'A few details about your company will help us personalize your experience',
    },
    {
      step: 3,
      title: 'Invite your team',
      description:
        'Start collaborating with your team by inviting them to join your account. You can skip this step and invite them later',
    },
  ]
}


const activeTab = ref('overview')
</script>

<template>
  <div class="min-h-screen bg-background">


    <main class="px-6 py-8 mx-auto max-w-7xl">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <NuxtLink to="/" class="hover:text-foreground">Dashboard</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <NuxtLink to="/firearms" class="hover:text-foreground">Firearms</NuxtLink>
        <ChevronRight class="w-4 h-4" />
        <span class="font-medium text-foreground">{{ firearm.serialNumber }}</span>
      </nav>

      <!-- Page Header -->
      <div class="flex items-start justify-between mb-8">
        <div>
          <h1 class="text-3xl font-black tracking-tight">Serial Number: {{ firearm.serialNumber }}</h1>
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
                <img :src="firearm.imageUrl" alt="Glock 19 Gen5" class="w-full rounded-lg object-cover aspect-video" />
                <Button variant="secondary" size="sm" class="absolute bottom-3 right-3 text-amber-50">
                  <Edit2 class="w-3.5 h-3.5 mr-1" />
                  Change
                </Button>
              </div>

              <h3 class="text-xl font-bold mb-2">{{ firearm.make }} {{ firearm.model }}</h3>
              <div class="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <span>{{ firearm.type }}</span>
                <span>•</span>
                <span class="font-medium">Asset Tag: {{ firearm.assetTag }}</span>
              </div>

              <Badge variant="default" class="mb-6 bg-amber-600">
                <div class="w-2 h-2 rounded-full bg-amber-500" />
                {{ firearm.status }}
              </Badge>

              <div class="flex flex-col gap-3">
                <Button class="w-full bg-blue-600 text-amber-50">Edit Details</Button>
                <Button variant="outline" class="w-full">Issue Firearm</Button>
              </div>
            </CardContent>
          </Card>

          <!-- Chain of Custody -->
          <Card>
            <CardHeader>
              <CardTitle>Chain of Custody</CardTitle>
            </CardHeader>
            <CardContent>
              <div class="relative pl-8 border-l-2 border-border">
                <Stepper orientation="vertical" class="mx-auto flex w-full max-w-md flex-col justify-start gap-10">
                  <StepperItem v-for="step in firearm.steps" :key="step.step" 
                    class="relative flex w-full items-start gap-6" :step="step.step">
                    <StepperSeparator 
                      class="absolute left-[18px] top-[38px] block h-[105%] w-0.5 shrink-0 rounded-full bg-muted group-data-[state=completed]:bg-primary" />
                    <StepperTrigger as-child>
                      <Button  size="icon"
                        class="z-10 rounded-full shrink-0">
                        <Dot />
                      </Button>
                    </StepperTrigger>
                    <div class="flex flex-col gap-1">
                      <StepperTitle 
                        class="text-sm font-semibold transition lg:text-base">
                        {{ step.title }}
                      </StepperTitle>
                      <StepperDescription 
                        class="sr-only text-xs text-muted-foreground transition md:not-sr-only lg:text-sm">
                        {{ step.description }}
                      </StepperDescription>
                    </div>
                  </StepperItem>
                </Stepper>
              </div>
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
              <!-- <TabsTrigger value="audit">Audit Logs</TabsTrigger> -->
            </TabsList>

            <TabsContent value="overview" class="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Firearm Specifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <dl class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Make</dt>
                      <dd class="mt-1 font-medium">{{ firearm.make }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Model</dt>
                      <dd class="mt-1 font-medium">{{ firearm.model }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Caliber</dt>
                      <dd class="mt-1 font-medium">{{ firearm.caliber }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Barrel Length</dt>
                      <dd class="mt-1 font-medium">{{ firearm.barrelLength }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Finish</dt>
                      <dd class="mt-1 font-medium">{{ firearm.finish }}</dd>
                    </div>
                    <div>
                      <dt class="text-sm font-medium text-muted-foreground">Capacity</dt>
                      <dd class="mt-1 font-medium">{{ firearm.capacity }}</dd>
                    </div>
                    <div class="sm:col-span-2 border-t pt-6 border-border">
                      <dt class="text-sm font-medium text-muted-foreground">Acquisition Date</dt>
                      <dd class="mt-1 font-medium">
                        {{ format(new Date(firearm.acquisitionDate), 'MMMM d, yyyy') }}
                      </dd>
                    </div>
                    <div class="sm:col-span-2">
                      <dt class="text-sm font-medium text-muted-foreground">Notes</dt>
                      <dd class="mt-1 text-muted-foreground">{{ firearm.notes }}</dd>
                    </div>
                  </dl>
                </CardContent>
              </Card>
            </TabsContent>

            <!-- Other tabs can be added similarly -->
          </Tabs>
        </div>
      </div>
    </main>
  </div>
</template>