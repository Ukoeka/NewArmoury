<template>
  <div class="min-h-screen font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
    

    <!-- Main Content -->
    <main class="flex-1 p-4 sm:p-6 lg:p-10">
      <div class="mx-auto max-w-6xl">
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <!-- Left column: profile card -->
          <div class="lg:col-span-1">
            <Card class="bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark p-6 text-center shadow-sm">
              <CardContent class="p-0">
                <div class="p-6">
                  <div class="mb-4 flex flex-col items-center">
                    <div class="rounded-full w-32 h-32 bg-center bg-cover mb-4" :style="`background-image: url('${user.avatar}')`" role="img" :aria-label="`Profile picture of ${user.name}`" />
                    <div class="flex flex-col items-center justify-center">
                      <p class="text-[22px] font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">{{ user.name }}</p>
                      <p class="text-base font-normal leading-normal text-text-muted-light dark:text-text-muted-dark">{{ user.username }}</p>
                    </div>
                  </div>

                  <div class="flex w-full flex-col gap-3">
                    <Button variant="outline" class="h-10 w-full" @click="onEditProfile">Edit Profile</Button>
                    <Button class="h-10 w-full" @click="onChangePassword">Change Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <!-- Right columns: info, roles -->
          <div class="lg:col-span-2 flex flex-col gap-8">
            <!-- Personal Details -->
            <Card class="bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark shadow-sm">
              <CardContent class="p-0">
                <div class="p-6">
                  <h2 class="text-xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">Personal Information</h2>
                  <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Your personal details as they appear in the system.</p>
                </div>

                <div class="border-t border-border-light dark:border-border-dark p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-6">
                  <div class="flex flex-col gap-1">
                    <p class="text-sm font-medium leading-normal text-text-muted-light dark:text-text-muted-dark">Full Name</p>
                    <p class="text-base font-normal leading-normal text-text-light dark:text-text-dark">{{ user.name }}</p>
                  </div>

                  <div class="flex flex-col gap-1">
                    <p class="text-sm font-medium leading-normal text-text-muted-light dark:text-text-muted-dark">User ID</p>
                    <p class="text-base font-normal leading-normal text-text-light dark:text-text-dark">{{ user.id }}</p>
                  </div>

                  <div class="flex flex-col gap-1">
                    <p class="text-sm font-medium leading-normal text-text-muted-light dark:text-text-muted-dark">Email Address</p>
                    <p class="text-base font-normal leading-normal text-text-light dark:text-text-dark">{{ user.email }}</p>
                  </div>

                  <div class="flex flex-col gap-1">
                    <p class="text-sm font-medium leading-normal text-text-muted-light dark:text-text-muted-dark">Date Joined</p>
                    <p class="text-base font-normal leading-normal text-text-light dark:text-text-dark">{{ user.joined }}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <!-- Roles & Permissions -->
            <Card class="bg-card-light dark:bg-card-dark rounded-lg border border-border-light dark:border-border-dark shadow-sm">
              <CardContent class="p-0">
                <div class="p-6">
                  <h2 class="text-xl font-bold leading-tight tracking-[-0.015em] text-text-light dark:text-text-dark">Roles &amp; Permissions</h2>
                  <p class="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">Your assigned roles and their associated permissions.</p>
                </div>

                <div class="border-t border-border-light dark:border-border-dark p-6 flex flex-wrap gap-2">
                  <span v-for="role in user.roles" :key="role" class="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium"
                        :class="roleClass(role)">{{ role }}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'User Profile',
  layout: 'admin-layout',
})
import { ref, reactive } from 'vue'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
/* ----- Page state ----- */
const user = reactive({
  id: 'USR-12345',
  name: 'John Doe',
  username: 'johndoe',
  email: 'john.doe@email.gov',
  joined: '2023-01-15',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCu38yqoIXS9krUP2pCGsf6dwJDjz-FjiZr2_8ebaigf1VS4D_RpKqz036KFPFP9VgKH9SafdH0zWGgyKhv1wMmf9Ak52qjgfVsxDBbcsW49A-RWT8HblcV4bOToFnbG6A2weJ07EDl-NOIzxcmPkn_mmwGjl2oH5hmaY-n9x3V9Y0DbsOfr5Ec5RxdBpjFKuPbkXgbNm841g32H_8x2hOomtgXD7FyPeZbdrUGj6eTRssOTfI0j6iGKRIwtVDfZtNM5s_ErAFDiN6D',
  roles: ['Administrator', 'Range Officer', 'Registered User'],
})

/* ----- Methods ----- */
function onEditProfile() {
  // trigger edit profile flow
  // (no inline JS in template; handled here)
  // In a real app navigate or open a modal
  console.log('Edit profile clicked')
}

function onChangePassword() {
  console.log('Change password clicked')
}

function onNotifyClick() {
  console.log('Notifications clicked')
}

function onSettingsClick() {
  console.log('Settings clicked')
}

function roleClass(role : string) : string {
  // return classes consistent with original colors. Keep Tailwind classes.
  const map : Record<string, string> = {
    'Administrator': 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300',
    'Range Officer': 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300',
    'Registered User': 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300',
  }
  return map[role] ?? 'bg-gray-100 dark:bg-gray-700/50 text-gray-800 dark:text-gray-300'
}
</script>


