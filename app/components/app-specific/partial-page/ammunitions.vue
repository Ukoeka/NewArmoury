<script setup lang="ts">


import AmmounitionDatatable from "~/components/app-specific/datatable/AmmunitionDatatable.vue"
import { Plus } from 'lucide-vue-next';
import type { Ammunition } from "~/lib/models/Ammunition"
import { useAmmunition } from "~/composables/ammunition/useAmmunition";
import CreateAmmunitionForm from "../dialogs/CreateAmmunitionForm.vue";

const {
  searchQuery,
  filteredAmmunitions,
  currentAmmunition,
  openDialog,
  handleCreate,
  handleEdit,
  handleView,
  handleDelete,
  handleForm
} = useAmmunition()
</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="Search by lot number" type="text" v-model="searchQuery"></Input>
      </div>
      <Button variant="default" size="sm" class="bg-blue-600 text-white" @click="handleCreate">
        <Plus />
        <span class="hidden lg:inline">Add Ammunition</span>
      </Button>
    </div>
    <CreateAmmunitionForm v-model:is-open="openDialog" , @confirm="handleForm" :initial="currentAmmunition" />
    <AmmounitionDatatable :data="filteredAmmunitions" @delete="handleDelete" , @view="handleView" @edit="handleEdit" />
  </div>


</template>
