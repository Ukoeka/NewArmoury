import { ref } from 'vue'
import { toast } from 'vue-sonner'
import { useRoleApi } from '~/services/role.service'
import type { RoleResponse } from '~/lib/models/Roles'

export const useRole = () => {
  const service   = useRoleApi()
  const roleList  = ref<RoleResponse[]>([])
  const isLoading = ref(false)
  const error     = ref<string | null>(null)

  const fetchRoles = async () => {
    try {
      isLoading.value = true
      error.value = null
      const res = await service.getRoles()
      roleList.value = res.data
    } catch (err: any) {
      error.value = err?.message ?? 'Failed to load roles'
      toast.error(error.value!)
    } finally {
      isLoading.value = false
    }
  }

  return { roleList, isLoading, error, fetchRoles }
}
