export default defineNuxtRouteMiddleware((to) => {
  // Bypass auth check - frontend only mode
  // const token = useCookie<string | null>('access_token')
  // if (!token.value) {
  //   return navigateTo('/auth/login')
  // }
})
