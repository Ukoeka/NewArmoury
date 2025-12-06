<script setup lang="ts">
definePageMeta({ title: 'Ammunitions', layout: 'admin-layout' })
import AmmounitionDatatable from "@/components/app-specific/datatable/AmmounitionDatatable.vue"
import { Plus } from 'lucide-vue-next';
import type { Ammunition } from "@/components/app-specific/datatable/AmmounitionDatatable.vue"


const ammunitions: Ammunition[] = [
  {
    id: 1,
    lotNumber: "AM-2023-001",
    caliber: "9×19mm",
    roundsPerBox: 50,
    boxes: 120,
    totalRounds: 6000,
    manufacturer: "PMC",
    acquisitionDate: "2023-02-15",
    expiryDate: "2033-02-15",
    status: "In Stock",
    location: "Central Armory - Bay C",
    notes: "Stored in climate controlled rack A3",
  },
  {
    id: 2,
    lotNumber: "AM-2022-045",
    caliber: "5.56×45mm",
    roundsPerBox: 30,
    boxes: 200,
    totalRounds: 6000,
    manufacturer: "Lake City",
    acquisitionDate: "2022-11-10",
    expiryDate: "2032-11-10",
    status: "In Stock",
    location: "Depot - Shelf 7",
    notes: "Inspection passed 2025-04-01",
  },
  {
    id: 3,
    lotNumber: "AM-2024-010",
    caliber: "7.62×39mm",
    roundsPerBox: 20,
    boxes: 50,
    totalRounds: 1000,
    manufacturer: "Norinco",
    acquisitionDate: "2024-06-20",
    expiryDate: "2034-06-20",
    status: "Issued",
    location: "Regional HQ - Locker 2",
    notes: "Issued for training rotation",
  },
  {
    id: 4,
    lotNumber: "AM-2021-099",
    caliber: "12ga",
    roundsPerBox: 10,
    boxes: 30,
    totalRounds: 300,
    manufacturer: "Winchester",
    acquisitionDate: "2021-08-05",
    expiryDate: "2031-08-05",
    status: "Quarantined",
    location: "Maintenance - Bay 1",
    notes: "Quarantined after moisture ingress; pending QA",
  },
  {
    id: 5,
    lotNumber: "AM-2020-300",
    caliber: "9×19mm",
    roundsPerBox: 50,
    boxes: 10,
    totalRounds: 500,
    manufacturer: "Sellier & Bellot",
    acquisitionDate: "2020-01-12",
    expiryDate: "2030-01-12",
    status: "Expired",
    location: "Central Armory - Bay D",
    notes: "Marked expired and scheduled for safe disposal",
  },
  {
    id: 6,
    lotNumber: "AM-2023-078",
    caliber: "5.56×45mm",
    roundsPerBox: 30,
    boxes: 80,
    totalRounds: 2400,
    manufacturer: "FN Herstal",
    acquisitionDate: "2023-10-02",
    expiryDate: "2033-10-02",
    status: "In Stock",
    location: "Reserve Vault",
    notes: null,
  },
  {
    id: 7,
    lotNumber: "AM-2024-112",
    caliber: "9×19mm",
    roundsPerBox: 50,
    boxes: 40,
    totalRounds: 2000,
    manufacturer: "PMC",
    acquisitionDate: "2024-03-18",
    expiryDate: "2034-03-18",
    status: "Issued",
    location: "District Office - Locker 4",
    notes: "Partial boxes issued (10 boxes)",
  },
  {
    id: 8,
    lotNumber: "AM-2019-221",
    caliber: "7.62×51mm",
    roundsPerBox: 10,
    boxes: 25,
    totalRounds: 250,
    manufacturer: "Raufoss",
    acquisitionDate: "2019-05-30",
    expiryDate: "2029-05-30",
    status: "Decommissioned",
    location: "Disposal",
    notes: "Decommissioned and awaiting documented disposal",
  },
  {
    id: 9,
    lotNumber: "AM-2024-200",
    caliber: ".22LR",
    roundsPerBox: 50,
    boxes: 100,
    totalRounds: 5000,
    manufacturer: "CCI",
    acquisitionDate: "2024-01-05",
    expiryDate: "2034-01-05",
    status: "In Stock",
    location: "Training Center - Cabinet 1",
    notes: "Used for marksmanship training",
  },
  {
    id: 10,
    lotNumber: "AM-2022-150",
    caliber: "9×19mm",
    roundsPerBox: 50,
    boxes: 5,
    totalRounds: 250,
    manufacturer: "Sellier & Bellot",
    acquisitionDate: "2022-07-14",
    expiryDate: "2032-07-14",
    status: "Quarantined",
    location: "Central Armory - Quarantine",
    notes: "Suspected contamination; lab sample taken",
  },
  {
    id: 11,
    lotNumber: "AM-2023-305",
    caliber: "5.45×39mm",
    roundsPerBox: 30,
    boxes: 60,
    totalRounds: 1800,
    manufacturer: "Barnaul",
    acquisitionDate: "2023-12-01",
    expiryDate: "2033-12-01",
    status: "In Stock",
    location: "Central Armory - Bay B",
    notes: null,
  },
  {
    id: 12,
    lotNumber: "AM-2024-410",
    caliber: "20mm",
    roundsPerBox: 1,
    boxes: 12,
    totalRounds: 12,
    manufacturer: "Nexter",
    acquisitionDate: "2024-04-22",
    expiryDate: "2034-04-22",
    status: "In Stock",
    location: "Heavy Weapons - Armored Locker",
    notes: "High-caliber, store in secure locker",
  },
]

const searchQuery = ref('')

const filteredAmmunitions = computed(() => {
  if (!searchQuery.value) {
    return ammunitions
  }
  return ammunitions.filter(ammunition =>
    ammunition.lotNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    || ammunition.caliber.toLowerCase().includes(searchQuery.value.toLowerCase())
    || ammunition.manufacturer.toLowerCase().includes(searchQuery.value.toLowerCase())
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
              <span class="hidden lg:inline">Add Ammunition</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Fill the form to create Ammunition</SheetTitle>
              <SheetDescription>
                Create a allocation to allocate firearms, ammunition, or kits to users or units.
              </SheetDescription>
            </SheetHeader>
            
              <!-- Allocation form goes here -->
            <CreateAllocationForm />
          </SheetContent>
        </Sheet>
      </div>
    </div>
    <AmmounitionDatatable :data="filteredAmmunitions" />
  </div>


</template>
