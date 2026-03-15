// composables/branch/useBranch.ts
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import { useBranchApi } from '~/services/branch.service'
import { useDebounce } from '~/composables/util/debounce'
import type { BranchCreate, BranchPaginatedResponse, BranchResponse, UpdateBranch } from '~/lib/models/Branch'

export const useBranch = () => {
  const service     = useBranchApi()
  const _data       = ref<BranchPaginatedResponse | null>(null)
  const isLoading   = ref(false)
  const error       = ref<string | null>(null)
  const searchQuery = ref('')
  const branchFilter = ref('')
  const currentPage = ref(1)
  const pageSize    = ref(5)

  // ── Current branch (shared for create/edit/delete) ────────────────────────
  const currentBranch   = ref<BranchResponse | null>(null)
  const showModal       = ref(false)
  const showDeleteDialog = ref(false)

  const debouncedSearch = useDebounce(searchQuery, 400)

  const branchList = computed(() => _data.value?.items ?? [])
  const stats      = computed(() => _data.value?.stats ?? { head_office: 0, sub_hq: 0, branch: 0 })
  const total      = computed(() => _data.value?.total ?? 0)
  const totalPages = computed(() => _data.value?.pages ?? 1)

  // ── Derived modal initial value from currentBranch ────────────────────────
  const editingBranch = computed<UpdateBranch | null>(() =>
    currentBranch.value
      ? { name: currentBranch.value.name, location: currentBranch.value.location, type: currentBranch.value.type }
      : null
  )

  const fetchBranches = async (pg = currentPage.value, size = pageSize.value) => {
    try {
      isLoading.value = true
      error.value = null
      _data.value = await service.getBranches(pg, size, searchQuery.value, branchFilter.value)
      currentPage.value = pg
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to load branches'
      toast.error(error.value!)
    } finally {
      isLoading.value = false
    }
  }

  watch(debouncedSearch, () => fetchBranches(1))
  watch(branchFilter,    () => fetchBranches(1))

  // ── Modal actions ─────────────────────────────────────────────────────────
  function openAdd() {
    currentBranch.value = null
    showModal.value = true
  }

  function openEdit(b: BranchResponse) {
    currentBranch.value = b
    showModal.value = true
  }

  function promptDelete(b: BranchResponse) {
    currentBranch.value = b
    showDeleteDialog.value = true
  }

  // ── CRUD ──────────────────────────────────────────────────────────────────
  const createBranch = async (payload: BranchCreate) => {
    try {
      isLoading.value = true
      const res = await service.createBranch(payload)
      await fetchBranches()
      toast.success(`${res.message}`)
      return res.data
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create branch')
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateBranch = async (payload: UpdateBranch) => {
    if (!currentBranch.value) return null
    try {
      isLoading.value = true
      const res = await service.updateBranch(currentBranch.value.id, payload)
      await fetchBranches()
      toast.success(`${res.message}`)
      return res.data
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to update branch')
      return null
    } finally {
      isLoading.value = false
    }
  }

  const handleConfirm = async (payload: BranchCreate) => {
    if (currentBranch.value) {
      await updateBranch(payload)
    } else {
      await createBranch(payload)
    }
    showModal.value = false
    currentBranch.value = null
  }

  const deleteBranch = async () => {
    if (!currentBranch.value) return false
    try {
      isLoading.value = true
      const name = currentBranch.value.name
      await service.deleteBranch(currentBranch.value.id)
      await fetchBranches()
      toast.success(`Branch "${name}" deleted`)
      showDeleteDialog.value = false
      currentBranch.value = null
      return true
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to delete branch')
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    branchList,
    stats,
    isLoading,
    error,
    searchQuery,
    branchFilter,
    total,
    totalPages,
    currentPage,
    pageSize,
    currentBranch,
    editingBranch,
    showModal,
    showDeleteDialog,
    fetchBranches,
    openAdd,
    openEdit,
    promptDelete,
    handleConfirm,
    deleteBranch,
  }
}