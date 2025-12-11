<script setup lang="ts">
definePageMeta({ title: 'Allocations', layout: 'admin-layout' })
import AllocationsTable from "@/components/app-specific/datatable/AllocationsTable.vue"

import type { Allocation } from "@/components/app-specific/datatable/AllocationsTable.vue"
import { Plus, RecycleIcon } from 'lucide-vue-next';
import CreateIssuanceForm from "~/components/app-specific/forms/CreateIssuanceForm.vue";
import FirearmReturnDialog from "~/components/app-specific/forms/FirearmReturnDialog.vue";
import { toast } from 'vue-sonner'


const allocations: Allocation[] = [
  {
    id: 1,
    referenceId: "TZ-FA-0003",
    itemType: "Firearm",
    itemName: "Remington 870 Shotgun",
    quantity: 1,
    allocatedTo: "Officer J. Mbele",
    requestReason: "Border Patrol Rotation",
    allocatedDate: "2025-02-10",
    expectedReturn: "2025-03-10",
    status: "Active",
    notes: "Issued with 6 magazines"
  },
  {
    id: 2,
    referenceId: "LOT-AM-556-2024-A",
    itemType: "Ammunition",
    itemName: "5.56×45mm NATO Rounds",
    quantity: 900,
    allocatedTo: "Unit Bravo-7",
    requestReason: "Live Fire Qualification Exercise",
    allocatedDate: "2025-02-02",
    expectedReturn: undefined,
    status: "Active",
    notes: "Training ammo only"
  },
  {
    id: 3,
    referenceId: "TZ-FA-0009",
    itemType: "Firearm",
    itemName: "Mossberg 590 Shotgun",
    quantity: 1,
    allocatedTo: "Officer K. Nyerere",
    requestReason: "Facility Guard Rotation",
    allocatedDate: "2025-01-29",
    expectedReturn: "2025-02-29",
    status: "Returned",
    notes: "Cleaned & logged on return"
  },
  {
    id: 4,
    referenceId: "TAC-KIT-RR01",
    itemType: "Kit",
    itemName: "Rapid Response Tactical Kit",
    quantity: 1,
    allocatedTo: "Rapid Response Unit",
    requestReason: "High Risk Warrant Execution",
    allocatedDate: "2025-01-25",
    expectedReturn: "2025-01-26",
    status: "Overdue",
    notes: "Night vision not returned with kit"
  },
  {
    id: 5,
    referenceId: "LOT-AM-9MM-2025-B",
    itemType: "Ammunition",
    itemName: "9×19mm Parabellum",
    quantity: 450,
    allocatedTo: "District Office Team C",
    requestReason: "Duty Carry Replenishment",
    allocatedDate: "2025-02-14",
    expectedReturn: undefined,
    status: "Active",
    notes: "Distributed to 9 officers"
  },
  {
    id: 6,
    referenceId: "TZ-FA-0011",
    itemType: "Firearm",
    itemName: "Colt M4 Carbine",
    quantity: 1,
    allocatedTo: "Sgt. R. Okoye",
    requestReason: "VIP Escort Assignment",
    allocatedDate: "2025-01-10",
    expectedReturn: "2025-04-01",
    status: "Active",
    notes: "Condition monitored weekly"
  },
  {
    id: 7,
    referenceId: "BTL-MED-TEAM-03",
    itemType: "Kit",
    itemName: "Battlefield Medical Kit",
    quantity: 3,
    allocatedTo: "Medical Response Squad",
    requestReason: "Joint Operations Support",
    allocatedDate: "2025-02-06",
    expectedReturn: "2025-02-15",
    status: "Returned",
    notes: "All units accounted for"
  },
  {
    id: 8,
    referenceId: "LOT-SG-12GA-2024-E",
    itemType: "Ammunition",
    itemName: "12 Gauge Shotgun Shells",
    quantity: 200,
    allocatedTo: "Station 4 Tactical",
    requestReason: "Breaching Operations",
    allocatedDate: "2025-02-01",
    expectedReturn: undefined,
    status: "Active",
    notes: "Slug and buckshot mix"
  },
  {
    id: 9,
    referenceId: "TZ-FA-0002",
    itemType: "Firearm",
    itemName: "Glock 17 Gen4",
    quantity: 1,
    allocatedTo: "Officer P. Mshana",
    requestReason: "Night Patrol Duty",
    allocatedDate: "2025-02-12",
    expectedReturn: "2025-03-12",
    status: "Active",
    notes: null
  },
  {
    id: 10,
    referenceId: "TAC-SHIELD-05",
    itemType: "Kit",
    itemName: "Ballistic Shield Set",
    quantity: 1,
    allocatedTo: "Anti-Robbery Task Unit",
    requestReason: "Operation Red Dune",
    allocatedDate: "2025-02-14",
    expectedReturn: "2025-02-20",
    status: "Active",
    notes: "Thermal camera mounted"
  },
  {
    id: 11,
    referenceId: "KIT-CLEAN-07",
    itemType: "Kit",
    itemName: "Universal Cleaning Kit",
    quantity: 1,
    allocatedTo: "Maintenance Department",
    requestReason: "Routine Armory Maintenance",
    allocatedDate: "2025-02-25",
    expectedReturn: "2025-02-28",
    status: "Active",
    notes: "For cleaning all firearms in storage"
  },
  {
    id: 12,
    referenceId: "LOT-AM-762-2025-C",
    itemType: "Ammunition",
    itemName: "7.62×39mm Rounds",
    quantity: 1200,
    allocatedTo: "Special Operations Unit",
    requestReason: "Field Training Exercise",
    allocatedDate: "2025-02-20",
    expectedReturn: undefined,
    status: "Active",
    notes: "For AK platform rifles"
  },
  {
    id: 13,
    referenceId: "TZ-FA-0007",
    itemType: "Firearm",
    itemName: "IWI TAVOR X95",
    quantity: 1,
    allocatedTo: "Officer S. Hassan",
    requestReason: "Counter-Terrorism Drill",
    allocatedDate: "2025-02-18",
    expectedReturn: "2025-02-25",
    status: "Returned",
    notes: "Minor wear on magazine well"
  },
  {
    id: 14,
    referenceId: "KIT-SURV-12",
    itemType: "Kit",
    itemName: "Desert Survival Kit",
    quantity: 5,
    allocatedTo: "Border Patrol Unit",
    requestReason: "Extended Desert Patrol",
    allocatedDate: "2025-02-22",
    expectedReturn: "2025-03-05",
    status: "Active",
    notes: "Contains extra water and navigation gear"
  },
  {
    id: 15,
    referenceId: "TZ-FA-0010",
    itemType: "Firearm",
    itemName: "CZ 75 Pistol",
    quantity: 1,
    allocatedTo: "Investigator A. Kamau",
    requestReason: "Undercover Operation",
    allocatedDate: "2025-02-15",
    expectedReturn: "2025-03-15",
    status: "Active",
    notes: "Concealed carry configuration"
  },
  {
    id: 16,
    referenceId: "LOT-AM-45-2024-F",
    itemType: "Ammunition",
    itemName: ".45 ACP Rounds",
    quantity: 600,
    allocatedTo: "Firearms Training Academy",
    requestReason: "Instructor Qualification Course",
    allocatedDate: "2025-02-05",
    expectedReturn: undefined,
    status: "Returned",
    notes: "Fully consumed during training"
  },
  {
    id: 17,
    referenceId: "KIT-COMM-03",
    itemType: "Kit",
    itemName: "Tactical Communication Set",
    quantity: 1,
    allocatedTo: "Command Center",
    requestReason: "Emergency Drill Coordination",
    allocatedDate: "2025-02-27",
    expectedReturn: "2025-02-28",
    status: "Overdue",
    notes: "Battery charger missing"
  },
  {
    id: 18,
    referenceId: "TZ-FA-0004",
    itemType: "Firearm",
    itemName: "HK MP5 SMG",
    quantity: 1,
    allocatedTo: "SWAT Team Leader",
    requestReason: "Hostage Rescue Scenario",
    allocatedDate: "2025-02-24",
    expectedReturn: "2025-02-25",
    status: "Damaged",
    notes: "Firing pin broke during training"
  },
  {
    id: 19,
    referenceId: "LOT-AM-300-2025-D",
    itemType: "Ammunition",
    itemName: ".300 Blackout Subsonic",
    quantity: 300,
    allocatedTo: "Sniper Support Unit",
    requestReason: "Night Operations Training",
    allocatedDate: "2025-02-21",
    expectedReturn: undefined,
    status: "Active",
    notes: "For suppressed rifle use"
  },
  {
    id: 20,
    referenceId: "KIT-NVG-08",
    itemType: "Kit",
    itemName: "Night Vision Goggles Set",
    quantity: 2,
    allocatedTo: "Night Patrol Division",
    requestReason: "Full Moon Patrol Operations",
    allocatedDate: "2025-02-26",
    expectedReturn: "2025-03-05",
    status: "Lost",
    notes: "Missing during equipment audit"
  }
]

const searchQuery = ref('')

const filteredAllocations = computed(() => {
  if (!searchQuery.value) {
    return allocations
  }
  return allocations.filter(allocation =>
    allocation.referenceId.toLowerCase().includes(searchQuery.value.toLowerCase())
    || allocation.itemName.toLowerCase().includes(searchQuery.value.toLowerCase())
    || allocation.allocatedTo.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const openCreateIssuanceForm = ref(false)

const handleRequestOTP = () => {
  console.log("request new otp")
}

const handleCreateIssuanceFormClose = () => {
  openCreateIssuanceForm.value = false
}

const handleCreateFormSubmission = (otp: string) => {
  console.log("otp confirmed => ", otp)
}


const open = ref(false)

const firearm = {
  serial: "XG-84K2-1138",
  model: "Glock 19 Gen5",
  officer: "Officer Jane Doe"
}


</script>

<template>
  <div class="flex flex-col border-b pb-4 pt-2 space-y-3">

    <div class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <Input placeholder="search by serial number" type="text" v-model="searchQuery"></Input>
      </div>
      <div class="flex items-center gap-2">
        <Button variant="outline" size="sm" class="text-white" @click="open = true">
          <RecycleIcon />
          <span class="hidden lg:inline">Return</span>
        </Button>
        <Button variant="default" size="sm" class="bg-blue-600 text-white" @click="openCreateIssuanceForm = true">
          <Plus />
          <span class="hidden lg:inline">Create Issuance</span>
        </Button>
      </div>

    </div>
    <CreateIssuanceForm v-model:open-dialog="openCreateIssuanceForm" v-on:close="handleCreateIssuanceFormClose"
      v-on:request-otp="handleRequestOTP" v-on:confirm-request="handleCreateFormSubmission" />

    <FirearmReturnDialog v-model:open="open" :firearm="firearm" @confirm="null" />
    <AllocationsTable :data="filteredAllocations" />
  </div>
</template>
