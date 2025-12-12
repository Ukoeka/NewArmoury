<script setup lang="ts">
definePageMeta({ title: 'Request', layout: 'admin-layout'})

import { Plus } from 'lucide-vue-next';
import RequestDataTable from '~/components/app-specific/datatable/RequestDataTable.vue';
import { useRequest } from '~/composables/request/useRequest';
import TransferConfirmationDialog from '~/components/app-specific/dialogs/TransferConfirmationDialog.vue';
const {
  searchQuery,
  filteredRequests,
  openDialog,
  currentRequest,
  handleCreate,
  handleEdit,
  handleView,
  handleDelete,
  handleForm,
  handleConfirmReceipt
} = useRequest()


</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="Search by name" type="text" v-model="searchQuery"></Input>

      </div>
      <div class="flex items-center gap-2">
        <Button variant="default" size="sm" class="bg-blue-600 text-white" @click="handleCreate">
          <Plus />
          <span class="hidden lg:inline">Add Request</span>
        </Button>
      </div>
    </div>
      <TransferConfirmationDialog v-model:is-open="openDialog"  />  
     <!-- <CreateKitForm v-model:is-open="showCreateKitDialog" @confirm="handleForm" :initial="currentKit" /> -->
    <RequestDataTable :data="filteredRequests" @delete="handleDelete" @confirm-receipt="handleConfirmReceipt" @view="handleView" />
  </div>
</template>