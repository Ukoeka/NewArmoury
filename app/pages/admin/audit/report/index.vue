<script setup lang="ts">
definePageMeta({
  layout: "admin-layout",
  middleware: ['auth']
})
import { ref } from 'vue'
// import { format } from 'date-fns'
import {
  ChevronDownIcon,
  ChevronRightIcon,
  Search,
  Download,
  Filter,
  ChevronLeft,
  ChevronRight,
} from 'lucide-vue-next'

// Sample audit log data
const logs = ref([
  {
    id: 1,
    actor: 'admin_user',
    action: 'UPDATE',
    itemType: 'Firearm',
    itemId: 'F-12345',
    timestamp: '2023-10-27T14:30:00',
    expanded: false,
    changes: {
      before: { status: 'In Service', location_id: 'L-XYZ78' },
      after: { status: 'Decommissioned', location_id: null },
    },
  },
  {
    id: 2,
    actor: 'system_process',
    action: 'CREATE',
    itemType: 'User',
    itemId: 'U-67890',
    timestamp: '2023-10-27T14:25:10',
    expanded: false,
    changes: null,
  },
  {
    id: 3,
    actor: 'john.doe',
    action: 'DELETE',
    itemType: 'Permit',
    itemId: 'P-ABCDE',
    timestamp: '2023-10-27T14:20:05',
    expanded: false,
    changes: null,
  },
  {
    id: 4,
    actor: 'jane.smith',
    action: 'LOGIN_SUCCESS',
    itemType: 'User',
    itemId: 'U-11223',
    timestamp: '2023-10-27T14:15:00',
    expanded: false,
    changes: null,
  },
])

const toggleExpand = (id: number) => {
  const log = logs.value.find(l => l.id === id)
  if (log) log.expanded = !log.expanded
}

const getActionVariant = (action: string) => {
  switch (action) {
    case 'CREATE': return 'success'
    case 'UPDATE': return 'default' // or 'primary' if you prefer blue
    case 'DELETE': return 'destructive'
    case 'LOGIN_SUCCESS': return 'secondary'
    default: return 'secondary'
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">

    <!-- Main Content -->
    <main class="px-6 py-8 mx-auto max-w-7xl">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-4xl font-black text-gray-900 dark:text-white">System Audit Log</h1>
        <Button variant="default">
          <Download class="w-4 h-4 mr-2" />
          Export to CSV
        </Button>
      </div>

      <!-- Filters -->
      <Card class="mb-6">
        <CardContent class="p-6">
          <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div class="md:col-span-2">
              <Label for="search" class="sr-only">Search logs</Label>
              <div class="relative">
                <!-- <Search class="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" /> -->
                <Input id="search" placeholder="Search logs..." class="pl-10 " />
              </div>
            </div>
            <div class="flex items-end gap-3 col-span-full md:col-span-2">
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="create">CREATE</SelectItem>
                  <SelectItem value="update">UPDATE</SelectItem>
                  <SelectItem value="delete">DELETE</SelectItem>
                  <SelectItem value="login">LOGIN_SUCCESS</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Item Type" />
                </SelectTrigger>
              </Select>
            </div>
            <div class="flex items-end gap-3 col-span-full md:col-span-2">
              <Button variant="outline" class="flex-1">Clear Filters</Button>
              <Button class="flex-1">Apply Filters</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <!-- Audit Table -->
      <!-- Audit Log Table using shadcn-vue Table components -->
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Actor</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Item Type</TableHead>
            <TableHead>Item ID</TableHead>
            <TableHead>Date & Time</TableHead>
            <TableHead class="w-12"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <template v-for="log in logs" :key="log.id">
            <!-- Main Row -->
            <TableRow>
              <TableCell class="font-medium">{{ log.actor }}</TableCell>
              <TableCell>
                <Badge variant="outline" class="text-xs">
                  {{ log.action }}
                </Badge>
              </TableCell>
              <TableCell>{{ log.itemType }}</TableCell>
              <TableCell>{{ log.itemId }}</TableCell>
              <TableCell>
                {{ log.timestamp }}
                <!-- {{ format(new Date(log.timestamp), 'dd MMM yyyy, HH:mm:ss') }} -->
              </TableCell>
              <TableCell>
                <Button variant="ghost" size="icon" @click="toggleExpand(log.id)" class="transition-transform"
                  :class="{ 'rotate-90': log.expanded }">
                  <ChevronRight class="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>

            <!-- Expanded Row with Change Details -->
            <TableRow v-if="log.expanded && log.changes">
              <TableCell colspan="6" class="p-0">
                <div class="border-t border-gray-200 dark:border-gray-800">
                  <div class="p-6">
                    <p class="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3">
                      Change Details
                    </p>
                    <pre
                      class="text-xs font-mono text-amber-50  rounded-lg p-4 overflow-x-auto">
{
  "before": {{ JSON.stringify(log.changes.before, null, 2) }},
  "after":  {{ JSON.stringify(log.changes.after, null, 2) }}
}</pre>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </template>
        </TableBody>
      </Table>

      <!-- Pagination (outside the Table, inside CardContent if needed) -->
      <div class="flex items-center justify-between mt-6">
        <p class="text-sm text-muted-foreground">
          Showing 1 to 4 of 1,234 entries
        </p>
        <div class="flex gap-2">
          <Button variant="outline" size="sm" :disabled="true">
            Previous
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </main>
  </div>
</template>