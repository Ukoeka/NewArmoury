
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'

export function useLogin() {
  const email = ref('')
  const password = ref('')
  const isLoading = ref(false)
  const router = useRouter()

  const login = async () => {
    try {
      isLoading.value = true
      // API call here
      await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({ 
          email: email.value, 
          password: password.value 
        })
      })
      
      router.push('/admin/dashboard')
    } catch (error) {
      toast({
        title: 'Login failed',
        description: 'Please check your credentials',
        variant: 'destructive'
      })
    } finally {
      isLoading.value = false
    }
  }

  return {
    email,
    password,
    isLoading,
    login
  }
}