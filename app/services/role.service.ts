import { useApi } from "~/composables/util/useApi"
import type { RoleResponse, Permission } from "~/lib/models/Roles"
import type { ApiResponse } from "~/lib/models/util"

const BASE = "/api/v1/roles"

export const useRoleApi = () => {
  const api = useApi()
  return {
    getRoles: () =>
      api.get<ApiResponse<RoleResponse[]>>(BASE + '/'),

    getPermissions: () =>
      api.get<ApiResponse<Permission[]>>(BASE + '/permissions'),
  }
}
