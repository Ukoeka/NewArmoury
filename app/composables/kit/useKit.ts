import z from "zod";
import type { Kit } from "~/lib/models/Kit";
import { computed, ref } from "vue"
import { useRouter, useRoute } from "#app"
import {useKitStore} from  '~/stores/kit'
import { kitDb } from "~/lib/mockdb";


export const createKitFormSchema = z.object({
    itemName: z.string().min(5, "Kit name is required"),
    itemType: z.enum(["maintenance", "survival", "cleaning", "custom"]),
    quantity: z.number().min(1, "Quantity must be at least 1"),
    status: z.enum(["available", "damaged", "lost", "maintenance", "decommissioned"]),
    notes: z.string().optional().nullable()
})

export type CreateKitSchema = z.infer<typeof createKitFormSchema>



export const useKit = () => {
  // Store + routing
  const store = useKitStore()
  const router = useRouter()
  const route = useRoute()
  const kits = kitDb
  // UI State
  const searchQuery = ref("")
  const showCreateKitDialog = ref(false)

  // Selected kit for create/edit modals
  const currentKit = ref<Kit | null>(null)

  // ----------------------------
  // Computed: Filter + Sorting
  // ----------------------------
  const filteredKits = computed(() => {
    const query = searchQuery.value.toLowerCase()

    return kits
      .filter(kit => {
        if (!query) return true
        return (
          kit.name.toLowerCase().includes(query) ||
          kit.type.toLowerCase().includes(query)
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
    currentKit.value = null
    showCreateKitDialog.value = true
  }

  const handleEdit = (kit: Kit) => {
    currentKit.value = kit
    showCreateKitDialog.value = true
  }

  const handleView = (kit: Kit) => {
    store.setSelectedKit(kit)
    router.push(`/admin/inventory/kit/${kit.id}`)
  }

  const handleDelete = (kit: Kit) => {
    // plug in your API call here
    console.log("delete kit payload", kit)
  }

  const handleForm = async (kit: Kit) => {
    // This is triggered when modal form submits
    console.log("form submit payload", kit)
    // store.createOrUpdateKit(kit) etc.
  }

  // ----------------------------
  // Detail Page Logic
  // ----------------------------
  const kit = computed(() => {
    const id = route.params.id as string

    // 1: Return selectedKit if it matches
    if (store.selectedKit && store.selectedKit.id === id) {
      return store.selectedKit
    }

    // 2: Try to retrieve locally from store
    const found = store.getById(id)
    if (found) {
      store.setSelectedKit(found)
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
    showCreateKitDialog,
    currentKit,

    // computed
    filteredKits,
    kit,

    // handlers
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleForm,
  }
}
