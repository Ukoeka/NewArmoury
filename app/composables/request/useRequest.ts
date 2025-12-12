import z from "zod";
import type { Request } from "~/lib/models/Request";
import { computed, ref } from "vue"
import { useRouter, useRoute } from "#app"
import { useRequestStore } from '~/stores/request'
import { requestDb } from "~/lib/mockdb";


export const createRequestFormSchema = z.object({
  assetType: z.enum(["firearm", "ammunition", "kit"]),
  assetName: z.string().min(1, "Asset name is required"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  requestedBy: z.string().min(1, "Requested by is required"),
  notes: z.string().optional().nullable(),
})

export type CreateRequestSchema = z.infer<typeof createRequestFormSchema>



export const useRequest = () => {
  // Store + routing
  const store = useRequestStore()
  const router = useRouter()
  const route = useRoute()
  // UI State
  const searchQuery = ref("")
  const openDialog = ref(false)

  // Selected request for create/edit modals
  const currentRequest = ref<Request | null>(null)

  // ----------------------------
  // Computed: Filter + Sorting
  // ----------------------------
  const filteredRequests = computed(() => {
    const query = searchQuery.value.toLowerCase()

    return requestDb
      .filter(data => {
        if (!query) return requestDb
        return (
          data.assetName.toLowerCase().includes(query) ||
          data.requestedBy.toLowerCase().includes(query) ||
          data.assetType.toLowerCase().includes(query)
        )
      })
      .sort((a, b) =>
        new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime()
      )
  })

  // ----------------------------
  // CRUD Handlers
  // ----------------------------

  const handleCreate = () => {
   router.push(`/admin/inventory/requests/create`)
  }

  const handleConfirmReceipt = (request: Request) => {
    // currentRequest.value = request
    openDialog.value = true
  }

  const handleEdit = (request: Request) => {
    currentRequest.value = request
    openDialog.value = true
  }

  const handleView = (request: Request) => {
    store.setSelectedRequest(request)
    router.push(`/admin/inventory/requests/${request.id}`)
  }

  const handleDelete = (request: Request) => {
    // plug in your API call here
    console.log("delete request payload", request)
  }

  const handleForm = async (request: Request) => {
    // This is triggered when modal form submits
    console.log("form submit payload", request)
  }


  // ----------------------------
  // Form Submission
  // ----------------------------
  const submitRequestForm = (values: CreateRequestSchema, initial?: Partial<Request> | null) => {
    const localRequest: Request = {
      id: initial?.id ?? crypto.randomUUID(),
      assetType: values.assetType,
      assetName: values.assetName,
      quantity: values.quantity,
      requestedBy: values.requestedBy,
      requestDate: initial?.requestDate ?? new Date().toISOString(),
      status: initial?.status ?? "pending",
      approvedBy: initial?.approvedBy ?? null,
      approvedDate: initial?.approvedDate ?? null,
      fulfilledDate: initial?.fulfilledDate ?? null,
      notes: values.notes ?? null,
    }

    // Save to mock DB (replace with API call)
    const index = requestDb.findIndex(f => f.id === localRequest.id)
    if (index > -1) {
      requestDb[index] = localRequest
    } else {
      requestDb.push(localRequest)
    }
    return localRequest
  }


  // ----------------------------
  // Detail Page Logic
  // ----------------------------
  const request = computed(() => {
    const id = route.params.id as string

    // 1: Return selectedRequest if it matches
    if (store.selectedRequest && store.selectedRequest.id === id) {
      return store.selectedRequest
    }

    // 2: Try to retrieve locally from store
    const found = store.getById(id)
    if (found) {
      store.setSelectedRequest(found)
      return found
    }

    // 3: Fallback to API (or local mock)
    // Replace this with actual fetch:
    const fallback = requestDb.find(r => r.id === id)
    return fallback ?? null
  })

  return {
    // state
    searchQuery,
    openDialog,
    currentRequest,

    // computed
    filteredRequests,
    request,

    // handlers
    handleCreate,
    handleEdit,
    handleView,
    handleDelete,
    handleForm,
    handleConfirmReceipt,

    // form
    submitRequestForm,
  }
}