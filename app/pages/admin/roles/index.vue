

<script lang="ts" setup>
definePageMeta({
  title: 'Role Permissions',
  layout: 'admin-layout',
});

import RoleTable from '~/components/app-specific/datatable/RoleTable.vue';
import type { Role } from '~/components/app-specific/datatable/RoleTable.vue';
import { Plus } from 'lucide-vue-next';
import RoleForm from '~/components/app-specific/forms/RoleForm.vue';

const roles: Role[] = [
  {
    id: 1,
    roleName: "Administrator",
    description: "Full system access including user and permission management."
  },
  {
    id: 2,
    roleName: "Editor",
    description: "Can modify content and manage posts but cannot change system settings."
  },
  {
    id: 3,
    roleName: "Viewer",
    description: "Read-only access to content and data."
  },
  {
    id: 4,
    roleName: "Moderator",
    description: "Can review, approve, and remove submitted content and comments."
  },
  {
    id: 5,
    roleName: "Support",
    description: "Handles customer inquiries and basic account issues."
  },
  {
    id: 6,
    roleName: "Analyst",
    description: "Access to reporting dashboards and data exports only."
  },
  {
    id: 7,
    roleName: "Developer",
    description: "Access to development tools, staging environments, and API keys."
  },
  {
    id: 8,
    roleName: "Billing Manager",
    description: "Manage subscriptions, invoices, and account billing details."
  },
  {
    id: 9,
    roleName: "Content Creator",
    description: "Can write and publish articles but cannot edit other authors' content."
  },
  {
    id: 10,
    roleName: "Guest",
    description: "Temporary limited-access account with minimal privileges."
  }
]

const searchQuery = ref('')

const filteredRoles = computed(() => {
  if (!searchQuery.value) {
    return roles
  }
  return roles.filter(role =>
    role.roleName.toLowerCase().includes(searchQuery.value.toLowerCase())
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
              <span class="hidden lg:inline">Add Role</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Fill the form to create Role</SheetTitle>
              <!-- <SheetDescription>
                Create a allocation to allocate firearms, ammunition, or kits to users or units.
              </SheetDescription> -->
            </SheetHeader>
            
              <!-- Allocation form goes here -->
            <RoleForm />
          </SheetContent>
        </Sheet>
      </div>
    </div>
    <RoleTable :data="filteredRoles" />
  </div>
</template>

