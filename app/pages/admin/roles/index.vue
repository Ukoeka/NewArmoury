<script lang="ts" setup>
definePageMeta({
  title: 'Role Permissions',
  layout: 'admin-layout',
});

import RoleTable from '~/components/app-specific/datatable/RoleTable.vue';
import type { Role } from '~/lib/models/Roles';
import { Plus } from 'lucide-vue-next';
import RoleForm from '~/components/app-specific/forms/RoleForm.vue';
import { useRouter } from 'vue-router'
import { roleDB } from '~/lib/mockdb';


const router = useRouter()

const searchQuery = ref('')

const filteredRoles = computed(() => {
  if (!searchQuery.value) {
    return roleDB
  }
  return roleDB.filter(role =>
    role.roleName.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})


const handleView = (role: Role) => {
  console.log("view", role);
  router.push("/admin/roles/permissions")
}

const handleEdit = (role: Role) => {
  console.log("edit", role);
}

const handleDelete = (role: Role) => {
  console.log("delete", role);
}
</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="Search by role" type="text" v-model="searchQuery"></Input>

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
    <RoleTable :data="filteredRoles" v-on:delete="handleDelete" v-on:view="handleView" v-on:edit="handleEdit" />
  </div>
</template>
