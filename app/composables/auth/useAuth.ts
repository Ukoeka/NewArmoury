import { ref } from 'vue'
import { useUserStore } from '~/stores/user'

const mockUser = {
  id: "550e8400-e29b-41d4-a716-446655440000",
  username: "admin",
  email: "admin@armoury.tz",
  first_name: "System",
  surname: "Administrator",
  initial: "S",
  file_number: "ADM001",
  title: "Administrator",
  department: "IT",
  directorate: "Operations",
  phone_number: "+255 123 456 789",
  status: "active",
  is_superuser: true,
  last_login: new Date().toISOString(),
  role_id: "role-admin-001",
  branch_id: "branch-hq-001",
  role: {
    id: "role-admin-001",
    name: "system_admin",
    abbreviation: "SYSTEM_ADMIN",
    description: "Full system access",
    is_system: true,
    permissions: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  branch: {
    id: "branch-hq-001",
    name: "Dodoma HQ",
    location: "Dodoma",
    type: "head_office",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

export function useAuth() {

  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const store = useUserStore()

  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true    
      // Skip API call - use mock user
      store.setCurrentUser(mockUser as any)
      await navigateTo('/admin/dashboard')
    } catch (err: any) {
      error.value = err?.message ?? 'Login failed'
      console.error('Login error:', err)
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    store.setCurrentUser(null)
    await navigateTo('/auth/login')
  }

  return { error,  isLoading, login, logout }
}
