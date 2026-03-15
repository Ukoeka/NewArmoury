<script setup lang="ts">
import FireArmDataTable from '@/components/app-specific/datatable/FireArmDataTable.vue';
import { Plus } from 'lucide-vue-next';
import { useFirearm } from "~/composables/firearm/useFirearm";
import CreateFirearmForm from '../dialogs/CreateFirearmForm.vue';
const {
  searchQuery,
  currentFirearm,
  filteredFirearms,
  openDialog,
  handleCreate,
  handleEdit,
  handleView,
  handleDelete,
  handleForm
} = useFirearm()
</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="Search by serial number" type="text" v-model="searchQuery"></Input>

      </div>
      <Button variant="default" size="sm" class="bg-blue-600 text-white" @click="handleCreate">
        <Plus />
        <span class="hidden lg:inline">Add Firearm</span>
      </Button>
    </div>
    <CreateFirearmForm v-model:is-open="openDialog", @confirm="handleForm" :initial="currentFirearm"/>
    <FireArmDataTable :data="filteredFirearms" @view="handleView", @edit="handleEdit" @delete="handleDelete"/>
  </div>
</template>
