<script setup lang="ts">
import type { Kit } from "~/lib/models/Kit";
import KitDatatable from "@/components/app-specific/datatable/KitDatatable.vue";
import { Plus } from 'lucide-vue-next';
import CreateKitForm from "../dialogs/CreateKitForm.vue";
import { useKit } from "~/composables/kit/useKit";

const {
  searchQuery,
  filteredKits,
  showCreateKitDialog,
  currentKit,
  handleCreate,
  handleEdit,
  handleView,
  handleDelete,
  handleForm
} = useKit()


</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="Search by kit name" type="text" v-model="searchQuery"></Input>

      </div>
      <div class="flex items-center gap-2">
        <Button variant="default" size="sm" class="bg-blue-600 text-white" @click="handleCreate">
          <Plus />
          <span class="hidden lg:inline">Add Kit</span>
        </Button>
      </div>
    </div>
     <CreateKitForm v-model:is-open="showCreateKitDialog" @confirm="handleForm" :initial="currentKit" />
    <KitDatatable :data="filteredKits" @delete="handleDelete" @edit="handleEdit" @view="handleView" />
  </div>
</template>