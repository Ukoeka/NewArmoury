// composables/location/useLocation.ts
import { ref, computed, watch } from 'vue'
import { toast } from 'vue-sonner'
import { useDebounce } from '~/composables/util/debounce'
import { LocationType, type LocationCreate, type LocationPaginatedResponse, type LocationResponse, type UpdateLocation } from '~/lib/models/Location'
import { useLocationApi } from '~/services/location.service'

export const useLocation = () => {
  const service        = useLocationApi()
  const _data          = ref<LocationPaginatedResponse | null>(null)
  const isLoading      = ref(false)
  const error          = ref<string | null>(null)
  const searchQuery    = ref('')
  const locationFilter = ref<LocationType | ''>(LocationType.IN_OFFICE)
  const currentPage    = ref(1)
  const pageSize       = ref(10)

  const currentLocation  = ref<LocationResponse | null>(null)
  const showModal        = ref(false)
  const showDeleteDialog = ref(false)

  const debouncedSearch = useDebounce(searchQuery, 400)

  const locationList = computed(() => _data.value?.items ?? [])
  const stats        = computed(() => _data.value?.stats ?? { in_office: 0, out_of_office: 0, total: 0 })
  const total        = computed(() => _data.value?.total ?? 0)
  const totalPages   = computed(() => _data.value?.pages ?? 1)

  const editingLocation = computed<UpdateLocation | null>(() =>
    currentLocation.value ? {
      name:          currentLocation.value.name,
      type:          currentLocation.value.type,
      specific_area: currentLocation.value.specific_area,
      branch_id:     currentLocation.value.branch_id,
    } : null
  )

  const fetchLocations = async (pg = currentPage.value, size = pageSize.value) => {
    try {
      isLoading.value = true
      error.value = null
      _data.value = await service.getLocations(pg, size, searchQuery.value, locationFilter.value as LocationType)
      currentPage.value = pg
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to load locations'
      toast.error(error.value!)
    } finally {
      isLoading.value = false
    }
  }

  watch(debouncedSearch, () => fetchLocations(1))
  watch(locationFilter,  () => fetchLocations(1))

  function openAdd() {
    currentLocation.value = null
    showModal.value = true
  }

  function openEdit(loc: LocationResponse) {
    currentLocation.value = loc
    showModal.value = true
  }

  function promptDelete(loc: LocationResponse) {
    currentLocation.value = loc
    showDeleteDialog.value = true
  }

  const createLocation = async (payload: LocationCreate) => {
    try {
      isLoading.value = true
      const res = await service.createLocation(payload)
      await fetchLocations()
      toast.success(`${res.message}`)
      return res.data
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to create location')
      return null
    } finally {
      isLoading.value = false
    }
  }

  const updateLocation = async (payload: UpdateLocation) => {
    if (!currentLocation.value) return null
    try {
      isLoading.value = true
      const res = await service.updateLocation(currentLocation.value.id, payload)
      await fetchLocations()
      toast.success(`${res.message}`)
      return res.data
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to update location')
      return null
    } finally {
      isLoading.value = false
    }
  }

  const handleConfirm = async (payload: LocationCreate) => {
    if (currentLocation.value) {
      await updateLocation(payload)
    } else {
      await createLocation(payload)
    }
    showModal.value = false
    currentLocation.value = null
  }

  const deleteLocation = async () => {
    if (!currentLocation.value) return false
    try {
      isLoading.value = true
      const name = currentLocation.value.name
      await service.deleteLocation(currentLocation.value.id)
      await fetchLocations()
      toast.success(`Location "${name}" deleted`)
      showDeleteDialog.value = false
      currentLocation.value = null
      return true
    } catch (err: any) {
      toast.error(err?.message ?? 'Failed to delete location')
      return false
    } finally {
      isLoading.value = false
    }
  }

  return {
    locationList,
    stats,
    isLoading,
    error,
    searchQuery,
    locationFilter,
    total,
    totalPages,
    currentPage,
    pageSize,
    currentLocation,
    editingLocation,
    showModal,
    showDeleteDialog,
    fetchLocations,
    openAdd,
    openEdit,
    promptDelete,
    handleConfirm,
    deleteLocation,
  }
}