<script setup lang="ts">
import { Plus } from 'lucide-vue-next';
import type { Firearm } from "~/components/app-specific/datatable/FireArmDataTable.vue"
import {ref} from "vue"
import FireArmDataTable from "~/components/app-specific/datatable/FireArmDataTable.vue"
definePageMeta({ title: 'Firearms', layout: 'admin-layout' })

const firearms: Firearm[] = [
  {
    id: 1,
    serialNumber: "TZ-FA-0001",
    make: "FN",
    model: "SCAR-L",
    category: "Rifle",
    caliber: "5.56×45mm",
    manufacturer: "FN Herstal",
    acquisitionDate: "2021-03-15",
    status: "In Storage",
    condition: "Good",
    location: "Central Armory - Bay A",
    notes: "Routine inspection due 2025-06",
  },
  {
    id: 2,
    serialNumber: "TZ-FA-0002",
    make: "Glock",
    model: "17 Gen4",
    category: "Pistol",
    caliber: "9×19mm",
    manufacturer: "Glock Ges.m.b.H.",
    acquisitionDate: "2020-11-02",
    status: "Assigned",
    condition: "Good",
    location: "Regional HQ - Locker 3",
    notes: null,
  },
  {
    id: 3,
    serialNumber: "TZ-FA-0003",
    make: "Remington",
    model: "870",
    category: "Shotgun",
    caliber: "12ga",
    manufacturer: "Remington",
    acquisitionDate: "2018-07-20",
    status: "Under Maintenance",
    condition: "Fair",
    location: "Maintenance - Bay 2",
    notes: "Replaced stock on 2025-01-10",
  },
  {
    id: 4,
    serialNumber: "TZ-FA-0004",
    make: "HK",
    model: "MP5",
    category: "SMG",
    caliber: "9×19mm",
    manufacturer: "Heckler & Koch",
    acquisitionDate: "2019-05-05",
    status: "Assigned",
    condition: "Good",
    location: "Rapid Response Unit",
    notes: "Tactical kit included",
  },
  {
    id: 5,
    serialNumber: "TZ-FA-0005",
    make: "SAR",
    model: "K2-12",
    category: "Rifle",
    caliber: "7.62×39mm",
    manufacturer: "SAR Group",
    acquisitionDate: "2022-02-18",
    status: "In Storage",
    condition: "New",
    location: "Depot - Shelf 12",
    notes: "Spare magazines: 6",
  },
  {
    id: 6,
    serialNumber: "TZ-FA-0006",
    make: "Sig Sauer",
    model: "P320",
    category: "Pistol",
    caliber: "9×19mm",
    manufacturer: "Sig Sauer",
    acquisitionDate: "2021-09-30",
    status: "Assigned",
    condition: "Good",
    location: "District Office - Locker 1",
    notes: "Holster issued",
  },
  {
    id: 7,
    serialNumber: "TZ-FA-0007",
    make: "IWI",
    model: "TAVOR X95",
    category: "Rifle",
    caliber: "5.56×45mm",
    manufacturer: "Israel Weapon Industries",
    acquisitionDate: "2023-04-12",
    status: "In Storage",
    condition: "New",
    location: "Central Armory - Bay B",
    notes: "Calibrated optics",
  },
  {
    id: 8,
    serialNumber: "TZ-FA-0008",
    make: "Browning",
    model: "Hi-Power",
    category: "Pistol",
    caliber: "9×19mm",
    manufacturer: "FN/Browning",
    acquisitionDate: "2017-10-01",
    status: "Disposed",
    condition: "Poor",
    location: "N/A",
    notes: "Disposed following decommission",
  },
  {
    id: 9,
    serialNumber: "TZ-FA-0009",
    make: "Mossberg",
    model: "590",
    category: "Shotgun",
    caliber: "12ga",
    manufacturer: "O.F. Mossberg & Sons",
    acquisitionDate: "2016-06-22",
    status: "Assigned",
    condition: "Fair",
    location: "Station 7 - Equipment Room",
    notes: "Pending barrel inspection",
  },
  {
    id: 10,
    serialNumber: "TZ-FA-0010",
    make: "CZ",
    model: "75",
    category: "Pistol",
    caliber: "9×19mm",
    manufacturer: "Česká zbrojovka",
    acquisitionDate: "2020-01-14",
    status: "In Storage",
    condition: "Good",
    location: "Reserve Vault",

    notes: "Serial verified",
  },
  {
    id: 11,
    serialNumber: "TZ-FA-0011",
    make: "Colt",
    model: "M4 Carbine",
    category: "Rifle",
    caliber: "5.56×45mm",
    manufacturer: "Colt",
    acquisitionDate: "2015-12-05",
    status: "Under Maintenance",
    condition: "Fair",
    location: "Armory Workshop",
    notes: "Gas system service scheduled",
  },
  {
    id: 12,
    serialNumber: "TZ-FA-0012",
    make: "Unknown",
    model: "Unregistered",
    category: "Other",
    caliber: "N/A",
    manufacturer: "Colt",
    acquisitionDate: "2014-08-30",
    status: "Lost",
    condition: "Poor",
    location: "Last known: Field Unit 4",
    notes: "Reported lost 2024-11-20; under investigation",
  },
]
const searchQuery = ref('')

const filteredFirearms = computed(() => {
  if (!searchQuery.value) {
    return firearms
  }
  return firearms.filter(firearm =>
    firearm.serialNumber.toLowerCase().includes(searchQuery.value.toLowerCase())
    || firearm.caliber.toLowerCase().includes(searchQuery.value.toLowerCase())
    || firearm.manufacturer.toLowerCase().includes(searchQuery.value.toLowerCase())
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
              <span class="hidden lg:inline">Add Fire-arm</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Fill the form to create Fire-arm</SheetTitle>
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
    <FireArmDataTable :data="filteredFirearms" />
  </div>
</template>

