import z from "zod";
import type { Kit } from "~/lib/models/Kit";
import { computed, ref } from "vue"
import { useRouter, useRoute } from "#app"
import { firearmDb } from "~/lib/mockdb";
import type { Firearm } from "~/lib/models/Firearm";


export const createFirearmFormSchema = z.object({
  serial_number: z.string(),
  make: z.string(),
  model: z.string(),
  category: z.enum(["rifle", "pistol", "shotgun", "smg", "others"]),
  caliber: z.string(),
  manufacturer: z.string().optional(),
  acquisitionDate: z.string(), // ISO date
  status: z.enum(["available", "damaged", "lost", "maintenance", "decommissioned"]),
  location: z.string(),
  notes: z.string().optional().nullable(),
})

export type CreateFirearmSchema = z.infer<typeof createFirearmFormSchema>



export const useFirearm = () => {
  // Store + routing
  const store = useFirearmStore()
  const router = useRouter()
  const route = useRoute()
  // UI State
  const searchQuery = ref("")
  const openDialog = ref(false)

  // Selected kit for create/edit modals
  const currentFirearm = ref<Firearm | null>(null)

  // ----------------------------
  // Computed: Filter + Sorting
  // ----------------------------
  const filteredFirearms = computed(() => {
    const query = searchQuery.value.toLowerCase()

    return firearmDb
      .filter(firearm => {
        if (!query) return firearm
        return (
          firearm.serialNumber.toLowerCase().includes(query)
        )
      })
      .sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
  })

  // ----------------------------
  // CRUD Handlers
  // ----------------------------

  const handleCreate = () => {
    currentFirearm.value = null
    openDialog.value = true
  }

  const handleEdit = (firearm: Firearm) => {
    currentFirearm.value = firearm
    openDialog.value = true
  }

  const handleView = (firearm: Firearm) => {
    store.setSelectedFirearm(firearm)
    router.push(`/admin/inventory/firearm/${firearm.id}`)
  }

  const handleDelete = (firearm: Firearm) => {
    // plug in your API call here
    console.log("delete kit payload", firearm)
  }

  const handleForm = async (firearm: Firearm) => {
    // This is triggered when modal form submits
    console.log("form submit payload", firearm)
    // store.createOrUpdateKit(kit) etc.
  }

   // ----------------------------
  // Form Submission
  // ----------------------------
  const submitFirearmForm = (values: CreateFirearmSchema, initial?: Partial<Firearm> | null) => {
    const localFirearm: Firearm = {
      id: initial?.id ?? crypto.randomUUID(),
      serialNumber: values.serial_number,
      make: values.make,
      model: values.model,
      category: values.category,
      caliber: values.caliber,
      manufacturer: values.manufacturer ?? "",
      acquisitionDate: values.acquisitionDate,
      status: values.status,
      location: values.location,
      notes: values.notes ?? null,
      createdAt: initial?.createdAt ?? new Date().toISOString(),
    }

    // Save to mock DB (replace with API call)
    const index = firearmDb.findIndex(f => f.id === localFirearm.id)
    if (index > -1) {
      firearmDb[index] = localFirearm
    } else {
      firearmDb.push(localFirearm)
    }
      // Update existing
    return localFirearm
  }

 
  // ----------------------------
  // Detail Page Logic
  // ----------------------------
  const firearm = computed(() => {
    const id = route.params.id as string

    // 1: Return selectedKit if it matches
    if (store.selectedFirearm && store.selectedFirearm.id === id) {
      return store.selectedFirearm
    }

    // 2: Try to retrieve locally from store
    const found = store.getById(id)
    if (found) {
      store.setSelectedFirearm(found)
      return found
    }

    // 3: Fallback to API (or local mock)
    // Replace this with actual fetch:
    const fallback = store.getMockById?.(id)
    return fallback ?? null
  })

  return {
    // state
    searchQuery,
    openDialog,
    currentFirearm,

    // computed
    filteredFirearms,
    firearm,

    // handlers
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleForm,

    // form
    submitFirearmForm,
  }
}
