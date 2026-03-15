import { usePermissions } from "~/composables/permission/usePermissions"

// middleware/permission.ts
export default defineNuxtRouteMiddleware((to) => {
  const { can, canAny } = usePermissions()

  const requiredPermission = to.meta.permission as string | undefined
  const requiredAny = to.meta.permissionAny as string[] | undefined

  if (requiredPermission && !can(requiredPermission)) {
    return navigateTo('/admin/unauthorized')
  }

  if (requiredAny && !canAny(...requiredAny)) {
    return navigateTo('/admin/unauthorized')
  }
})