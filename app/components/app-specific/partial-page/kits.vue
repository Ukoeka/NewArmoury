<script setup lang="ts">
definePageMeta({ title: 'Kits', layout: 'admin-layout' })
import type { Kit } from "@/components/app-specific/datatable/KitDatatable.vue"
import KitDatatable from "@/components/app-specific/datatable/KitDatatable.vue"
import { Plus } from 'lucide-vue-next';

const kits: Kit[] = [
  {
    id: 1,
    name: "M16 Standard Maintenance Kit",
    type: "Maintenance Kit",
    items: 24,
    status: "Available",
    location: "Armory Maintenance Room - Shelf A1",
    lastInspection: "2025-01-15",
    notes: "Complete set with bore brushes and cleaning rods"
  },
  {
    id: 2,
    name: "Field Survival Pack Alpha",
    type: "Survival Kit",
    items: 18,
    status: "In Use",
    location: "Assigned to Unit 7 - Vehicle 3",
    lastInspection: "2024-12-20",
    notes: "Contains medical supplies and signaling equipment"
  },
  {
    id: 3,
    name: "Universal Firearm Cleaning Kit",
    type: "Cleaning Kit",
    items: 32,
    status: "Available",
    location: "Range Maintenance Locker",
    lastInspection: "2025-02-10",
    notes: "Multi-caliber kit for rifles and pistols"
  },
  {
    id: 4,
    name: "SWAT Tactical Med Kit",
    type: "Custom",
    items: 45,
    status: "Available",
    location: "SWAT Armory - Medical Cabinet",
    lastInspection: "2025-01-28",
    notes: "Custom trauma kit with advanced medical supplies"
  },
  {
    id: 5,
    name: "Vehicle Emergency Kit",
    type: "Survival Kit",
    items: 22,
    status: "In Use",
    location: "Patrol Car 14 - Trunk",
    lastInspection: "2024-11-05",
    notes: "Includes jumper cables and basic tools"
  },
  {
    id: 6,
    name: "Pistol Cleaning Set Bravo",
    type: "Cleaning Kit",
    items: 15,
    status: "Damaged",
    location: "Maintenance - Repair Bench",
    lastInspection: "2024-10-30",
    notes: "Missing solvent bottle, pending replacement parts"
  },
  {
    id: 7,
    name: "Long-Range Shooting Kit",
    type: "Custom",
    items: 28,
    status: "Available",
    location: "Sniper Unit - Equipment Rack",
    lastInspection: "2025-02-18",
    notes: "Custom wind meter and ballistics calculator included"
  },
  {
    id: 8,
    name: "Urban Survival Pack",
    type: "Survival Kit",
    items: 16,
    status: "Available",
    location: "Training Facility - Storage Room",
    lastInspection: "2025-01-10",
    notes: "For urban environment training exercises"
  },
  {
    id: 9,
    name: "Heavy Weapons Maintenance Kit",
    type: "Maintenance Kit",
    items: 56,
    status: "In Use",
    location: "Heavy Weapons Unit - Maintenance Area",
    lastInspection: "2024-12-15",
    notes: "For machine guns and grenade launchers"
  },
  {
    id: 10,
    name: "Evidence Collection Kit",
    type: "Custom",
    items: 34,
    status: "Available",
    location: "Forensics Lab - Cabinet 3",
    lastInspection: "2025-02-22",
    notes: "Complete forensic evidence collection set"
  },
  {
    id: 11,
    name: "Standard Cleaning Kit Delta",
    type: "Cleaning Kit",
    items: 20,
    status: "Missing",
    location: "Last checked: Range House",
    lastInspection: "2024-09-18",
    notes: "Reported missing 2025-01-05, investigation ongoing"
  },
  {
    id: 12,
    name: "Maritime Survival Kit",
    type: "Survival Kit",
    items: 26,
    status: "In Use",
    location: "Marine Unit - Boat 2",
    lastInspection: "2024-11-30",
    notes: "Waterproof containers, flares, and sea rations"
  },
  {
    id: 13,
    name: "Optics Maintenance Set",
    type: "Maintenance Kit",
    items: 14,
    status: "Available",
    location: "Armory - Optics Cabinet",
    lastInspection: "2025-02-25",
    notes: "Lens cleaning tools and anti-fog solution"
  },
  {
    id: 14,
    name: "K-9 Unit Medical Kit",
    type: "Custom",
    items: 19,
    status: "In Use",
    location: "K-9 Unit Vehicle 4",
    lastInspection: "2025-01-05",
    notes: "Specialized veterinary supplies for working dogs"
  },
  {
    id: 15,
    name: "Compact Survival Kit",
    type: "Survival Kit",
    items: 12,
    status: "Available",
    location: "Emergency Supplies - Locker 5",
    lastInspection: "2025-02-14",
    notes: "Miniature kit for personal carry"
  },
  {
    id: 16,
    name: "Electronic Maintenance Tools",
    type: "Maintenance Kit",
    items: 38,
    status: "Damaged",
    location: "Electronics Repair Room",
    lastInspection: "2024-10-22",
    notes: "Multimeter malfunctioning, awaiting calibration"
  },
  {
    id: 17,
    name: "Cold Weather Maintenance Kit",
    type: "Maintenance Kit",
    items: 27,
    status: "Available",
    location: "Northern Unit - Storage",
    lastInspection: "2025-02-05",
    notes: "Special lubricants and tools for sub-zero conditions"
  },
  {
    id: 18,
    name: "High-Altitude Survival Pack",
    type: "Survival Kit",
    items: 31,
    status: "In Use",
    location: "Mountain Rescue Team - Base",
    lastInspection: "2025-01-20",
    notes: "Oxygen supplement and cold weather gear included"
  },
  {
    id: 19,
    name: "Night Vision Cleaning Kit",
    type: "Cleaning Kit",
    items: 11,
    status: "Available",
    location: "Night Ops - Equipment Room",
    lastInspection: "2025-02-28",
    notes: "Specialized cleaning materials for sensitive optics"
  },
  {
    id: 20,
    name: "Command Post Communication Kit",
    type: "Custom",
    items: 42,
    status: "Available",
    location: "Mobile Command Unit 1",
    lastInspection: "2025-02-12",
    notes: "Radio equipment and emergency communication gear"
  },
  {
    id: 21,
    name: "Desert Operations Kit",
    type: "Survival Kit",
    items: 23,
    status: "In Use",
    location: "Desert Patrol Unit - Vehicle 2",
    lastInspection: "2024-12-08",
    notes: "Extra water purification and sun protection"
  },
  {
    id: 22,
    name: "Basic Cleaning Kit",
    type: "Cleaning Kit",
    items: 16,
    status: "Available",
    location: "Training Academy - Supply Room",
    lastInspection: "2025-02-20",
    notes: "For training purposes only"
  },
  {
    id: 23,
    name: "Bomb Disposal Tool Kit",
    type: "Custom",
    items: 67,
    status: "In Use",
    location: "EOD Unit - Truck 1",
    lastInspection: "2025-02-15",
    notes: "Specialized tools for explosive ordnance disposal"
  },
  {
    id: 24,
    name: "River Rescue Kit",
    type: "Survival Kit",
    items: 29,
    status: "Available",
    location: "Water Rescue Team - Boathouse",
    lastInspection: "2025-01-30",
    notes: "Water rescue equipment and first aid supplies"
  }
]
const searchQuery = ref('')

const filteredKits = computed(() => {
  if (!searchQuery.value) {
    return kits
  }
  return kits.filter(kit =>
    kit.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    || kit.type.toLowerCase().includes(searchQuery.value.toLowerCase())
    || kit.location.toLowerCase().includes(searchQuery.value.toLowerCase())
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
              <span class="hidden lg:inline">Add Kit</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Fill the form to create Kit</SheetTitle>
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
    <KitDatatable :data="filteredKits" />
  </div>
</template>