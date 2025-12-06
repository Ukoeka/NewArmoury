<script setup lang="ts">
definePageMeta({ title: 'Users', layout: 'admin-layout' })
import UserTable from "@/components/app-specific/datatable/UserTable.vue"
import type { User } from "@/components/app-specific/datatable/UserTable.vue"
import UserForm from "~/components/app-specific/forms/UserForm.vue"
import { Plus } from 'lucide-vue-next';

const users: User[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    username: "jdoe",
    email: "john.doe@armory.example",
    phoneNumber: "+255712000001",
    assignedArmory: "Central Armory",
    createdAt: "2021-02-10T09:20:00.000Z",
    lastLogin: "2025-11-30T14:12:00.000Z",
    avatar: null,
    notes: "System administrator",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    firstName: "Evelyn",
    lastName: "Mwanga",
    username: "emwanga",
    email: "evelyn.mwanga@armory.example",
    phoneNumber: "+255712000002",
    assignedArmory: "Regional HQ",
    createdAt: "2022-06-18T08:45:00.000Z",
    lastLogin: "2025-12-01T07:30:00.000Z",
    avatar: null,
    notes: "Oversight for regional inventories",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    firstName: "Rashid",
    lastName: "Ujenzi",
    username: "rugenzi",
    email: "rashid.ujenzi@armory.example",
    phoneNumber: "+255712000003",
    assignedArmory: "Central Armory - Bay A",
    createdAt: "2020-11-02T10:10:00.000Z",
    lastLogin: "2025-11-28T12:00:00.000Z",
    avatar: null,
    notes: "Field assignment - patrol unit",
    role: "Officer",
    status: "Active",
  },
  {
    id: 4,
    firstName: "Lillian",
    lastName: "Magesa",
    username: "lmagessa",
    email: "lillian.magesa@armory.example",
    phoneNumber: "+255712000004",
    assignedArmory: "Rapid Response Unit",
    createdAt: "2019-05-05T11:00:00.000Z",
    lastLogin: "2025-12-02T09:22:00.000Z",
    avatar: null,
    notes: "Rapid response team lead",
    role: "Officer",
    status: "Active",
  },
  {
    id: 5,
    firstName: "Nadia",
    lastName: "Kato",
    username: "nkat0",
    email: "nadia.kato@armory.example",
    phoneNumber: "+255712000005",
    assignedArmory: "Armory Workshop",
    createdAt: "2018-07-20T07:30:00.000Z",
    lastLogin: "2025-11-20T16:45:00.000Z",
    avatar: null,
    notes: "Maintenance and servicing",
    role: "Technician",
    status: "Active",
  },
  {
    id: 6,
    firstName: "Samuel",
    lastName: "Pires",
    username: "spires",
    email: "samuel.pires@armory.example",
    phoneNumber: "+255712000006",
    assignedArmory: "Depot - Shelf 12",
    createdAt: "2022-02-18T13:00:00.000Z",
    lastLogin: "2025-10-01T08:00:00.000Z",
    avatar: null,
    notes: "Records and receipts",
    role: "Clerk",
    status: "Active",
  },
  {
    id: 7,
    firstName: "Maya",
    lastName: "Johnson",
    username: "mjohnson",
    email: "maya.johnson@armory.example",
    phoneNumber: "+255712000007",
    assignedArmory: "Training Center",
    createdAt: "2021-09-30T09:00:00.000Z",
    lastLogin: "2025-11-29T18:10:00.000Z",
    avatar: null,
    notes: "Training and certification",
    role: "Manager",
    status: "Active",
  },
  {
    id: 8,
    firstName: "Carlos",
    lastName: "Rodriguez",
    username: "crod",
    email: "carlos.rodriguez@armory.example",
    phoneNumber: "+255712000008",
    assignedArmory: "Maintenance - Bay 2",
    createdAt: "2015-12-05T06:50:00.000Z",
    lastLogin: null,
    avatar: null,
    notes: "Suspended pending investigation",
    role: "Technician",
    status: "Suspended",
  },
  {
    id: 9,
    firstName: "Sarah",
    lastName: "Chen",
    username: "schen",
    email: "sarah.chen@armory.example",
    phoneNumber: "+255712000009",
    assignedArmory: "Central Armory - Bay B",
    createdAt: "2017-10-01T12:30:00.000Z",
    lastLogin: "2025-11-25T10:05:00.000Z",
    avatar: null,
    notes: null,
    role: "Clerk",
    status: "Active",
  },
  {
    id: 10,
    firstName: "Raj",
    lastName: "Patel",
    username: "rpatel",
    email: "raj.patel@armory.example",
    phoneNumber: "+255712000010",
    assignedArmory: "District Office - Locker 1",
    createdAt: "2020-01-14T14:15:00.000Z",
    lastLogin: "2025-12-03T07:50:00.000Z",
    avatar: null,
    notes: "Assigned to district logistics",
    role: "Officer",
    status: "Active",
  },
  {
    id: 11,
    firstName: "Thomas",
    lastName: "Wilson",
    username: "twilson",
    email: "thomas.wilson@armory.example",
    phoneNumber: "+255712000011",
    assignedArmory: "Central Armory - Bay C",
    createdAt: "2016-06-22T09:40:00.000Z",
    lastLogin: "2025-11-15T11:11:00.000Z",
    avatar: null,
    notes: "Ammo handling specialist",
    role: "Technician",
    status: "Active",
  },
  {
    id: 12,
    firstName: "Leila",
    lastName: "Almond",
    username: "lalmond",
    email: "leila.almond@armory.example",
    phoneNumber: "+255712000012",
    assignedArmory: "Reserve Vault",
    createdAt: "2014-08-30T05:20:00.000Z",
    lastLogin: null,
    avatar: null,
    notes: "Disabled account - retired",
    role: "Clerk",
    status: "Disabled",
  },
]

const searchQuery = ref('')

const filteredUsers = computed(() => {
  if (!searchQuery.value) {
    return users
  }
  return users.filter(user =>
    user.firstName.toLowerCase().includes(searchQuery.value.toLowerCase())
    || user.lastName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="search by serial number" type="text" v-model="searchQuery"></Input>
     
      </div>
      <div class="flex items-center gap-2">
        <Sheet>
          <SheetTrigger>
            <Button variant="default" size="sm" class="bg-green-600 text-white">
              <Plus />
              <span class="hidden lg:inline">Add User</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Fill the form to create User</SheetTitle>
              <!-- <SheetDescription>
                Create a allocation to allocate firearms, ammunition, or kits to users or units.
              </SheetDescription> -->
            </SheetHeader>
            <UserForm />
          </SheetContent>
        </Sheet>
      </div>
    </div>
    <UserTable :data="filteredUsers" />
  </div>
</template>

