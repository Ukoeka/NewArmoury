import z, { file } from "zod";
import type { Kit } from "~/lib/models/Kit";
import { computed, ref } from "vue"
import { useRouter, useRoute } from "#app"
import { useAmmunitionStore } from '~/stores/ammunition'
import { ammunitionsDb } from "~/lib/mockdb";
import type { Ammunition } from "~/lib/models/Ammunition";


export const createAmmunitionFormSchema = z.object({
  lotNumber: z.string(),
  caliber: z.string(),
  roundsPerBox: z.number().optional(),
  boxes: z.number(),
  totalRounds: z.number(),
  manufacturer: z.string().optional(),
  expiryDate: z.string().optional(), // ISO date
  status: z.enum(["available", "damaged", "lost", "maintenance", "decommissioned"]),
  location: z.string(),
  notes: z.string().optional().nullable(),
})

export type CreateAmmunitionSchema = z.infer<typeof createAmmunitionFormSchema>



export const useAmmunition = () => {
  // Store + routing
  const store = useAmmunitionStore()
  const router = useRouter()
  const route = useRoute()
  // UI State
  const searchQuery = ref("")
  const openDialog = ref(false)

  // Selected kit for create/edit modals
  const currentAmmunition = ref<Ammunition | null>(null)

  // ----------------------------
  // Computed: Filter + Sorting
  // ----------------------------
  const filteredAmmunitions = computed(() => {
    const query = searchQuery.value.toLowerCase()

    return ammunitionsDb
      .filter(data => {
        if (!query) return ammunitionsDb
        return (
          data.lotNumber.toLowerCase().includes(query)
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
    currentAmmunition.value = null
    openDialog.value = true
  }

  const handleEdit = (ammunition: Ammunition) => {
    currentAmmunition.value = ammunition
    openDialog.value = true
  }

  const handleView = (ammunition: Ammunition) => {
    store.setSelectedAmmunition(ammunition)
    router.push(`/admin/inventory/ammunition/${ammunition.id}`)
  }

  const handleDelete = (ammunition: Ammunition) => {
    // plug in your API call here
    console.log("delete kit payload", ammunition)
  }

  const handleForm = async (ammunition: Ammunition) => {
    // This is triggered when modal form submits
    console.log("form submit payload", ammunition)
  }


  // ----------------------------
  // Form Submission
  // ----------------------------
  const submitAmmunitionForm = (values: CreateAmmunitionSchema, initial?: Partial<Ammunition> | null) => {
    const localAmmunition: Ammunition = {
      id: initial?.id ?? crypto.randomUUID(),
      lotNumber: values.lotNumber,
      caliber: values.caliber,
      roundsPerBox: values.roundsPerBox ?? 0,
      boxes: values.boxes,
      totalRounds: values.totalRounds,
      manufacturer: values.manufacturer ?? "",
      expiryDate: values.expiryDate ?? new Date().toISOString(), 
      createdAt: initial?.createdAt ?? new Date().toISOString(),
      status: values.status,
      location: values.location,
      notes: values.notes ?? null,
    }

    // Save to mock DB (replace with API call)
    const index = ammunitionsDb.findIndex(f => f.id === localAmmunition.id)
    if (index > -1) {
      ammunitionsDb[index] = localAmmunition
    } else {
      ammunitionsDb.push(localAmmunition)
    }
    return localAmmunition
  }


  // ----------------------------
  // Detail Page Logic
  // ----------------------------
  const ammunition = computed(() => {
    const id = route.params.id as string

    // 1: Return selectedKit if it matches
    if (store.selectedAmmunition && store.selectedAmmunition.id === id) {
      return store.selectedAmmunition
    }

    // 2: Try to retrieve locally from store
    const found = store.getById(id)
    if (found) {
      store.setSelectedAmmunition(found)
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
    currentAmmunition,

    // computed
    filteredAmmunitions,
    ammunition,

    // handlers
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleForm,

    // form
    submitAmmunitionForm,
  }
}
