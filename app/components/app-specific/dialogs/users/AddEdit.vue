<template>
  <Dialog :open="open" @update:open="$emit('update:open', $event)">
    <DialogContent class="bg-[#161b27] border border-[#1e2535] text-slate-100 p-0 gap-0 max-w-[500px] rounded-xl shadow-2xl" hide-close>

      <DialogHeader class="px-6 pt-6 pb-4 border-b border-[#1e2535]">
        <div class="flex items-start justify-between">
          <div>
            <DialogTitle class="text-[17px] font-bold text-slate-100 mb-1">
              {{ mode === 'add' ? 'Add User' : 'Edit User' }}
            </DialogTitle>
            <DialogDescription class="text-[13px] text-slate-500 m-0">
              {{ mode === 'add' ? 'Add a new user to the system' : 'Update user information' }}
            </DialogDescription>
          </div>
          <button @click="$emit('update:open', false)"
            class="text-slate-500 hover:text-slate-200 bg-transparent border-none cursor-pointer p-1 rounded-md hover:bg-[#1e2535] transition-colors">
          </button>
        </div>
      </DialogHeader>

      <div class="px-6 py-5 flex flex-col gap-4">

        <!-- Row 1: File Number + Initial -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">File Number *</label>
            <input v-model="form.fileNum" type="text" placeholder="Enter file number"
              class="w-full bg-[#1a2030] border border-blue-600/50 rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Initial</label>
            <input v-model="form.initial" type="text" placeholder="Enter initial"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
        </div>

        <!-- Row 2: First Name + Surname -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">First Name</label>
            <input v-model="form.firstName" type="text" placeholder="Enter first name"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Surname *</label>
            <input v-model="form.surname" type="text" placeholder="Enter surname"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
        </div>

        <!-- Row 3: Title + Email -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Title</label>
            <input v-model="form.title" type="text" placeholder="Enter title"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Email *</label>
            <input v-model="form.email" type="email" placeholder="Enter email address"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
        </div>

        <!-- Row 4: Phone + Directorate -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Phone Number *</label>
            <input v-model="form.phone" type="text" placeholder="Enter phone number"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Directorate</label>
            <input v-model="form.directorate" type="text" placeholder="Enter directorate"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
        </div>

        <!-- Row 5: Department + Branch -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Department</label>
            <input v-model="form.department" type="text" placeholder="Enter department"
              class="w-full bg-[#1a2030] border border-[#1e2535] rounded-lg px-3.5 py-2.5 text-[13px] text-slate-100 placeholder:text-slate-600 outline-none focus:border-blue-500 transition-colors h-[42px]" />
          </div>
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Branch *</label>
            <Select v-model="form.branch">
              <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
                :class="form.branch ? 'text-slate-100' : 'text-slate-500'">
                <SelectValue placeholder="Select a branch" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="b in branches" :key="b" :value="b"
                  class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ b }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <!-- Row 6: Role (+ Status if edit) -->
        <div class="grid grid-cols-2 gap-4">
          <div class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Role *</label>
            <Select v-model="form.role">
              <SelectTrigger class="bg-[#1a2030] border w-[full] border-[#1e2535] rounded-lg text-[13px] h-[42px] focus:ring-0 focus:border-blue-500"
                :class="form.role ? 'text-slate-100' : 'text-slate-500'">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem v-for="r in roleOptions" :key="r.code" :value="r.code"
                  class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">{{ r.label }}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div v-if="mode === 'edit'" class="flex flex-col gap-2">
            <label class="text-[13px] font-semibold text-slate-200">Status *</label>
            <Select v-model="form.status">
              <SelectTrigger class="bg-[#1a2030] border border-[#1e2535] w-[full] rounded-lg text-[13px] text-slate-100 h-[42px] focus:ring-0 focus:border-blue-500">
                <SelectValue />
              </SelectTrigger>
              <SelectContent class="bg-[#1a2030] border border-[#1e2535] rounded-lg">
                <SelectItem value="ACTIVE"   class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">Active</SelectItem>
                <SelectItem value="INACTIVE" class="text-[13px] text-slate-200 focus:bg-[#252f42] cursor-pointer">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>

      <DialogFooter class="px-6 pb-6 pt-4 border-t border-[#1e2535] flex items-center justify-end gap-3">
        <button @click="$emit('update:open', false)"
          class="px-5 py-2.5 rounded-lg bg-white text-slate-900 text-[13px] font-semibold cursor-pointer border-none hover:bg-slate-100 transition-colors">
          Cancel
        </button>
        <button @click="handleSubmit"
          class="px-5 py-2.5 rounded-lg bg-blue-600 text-white text-[13px] font-semibold cursor-pointer border-none hover:bg-blue-700 transition-colors">
          {{ mode === 'add' ? 'Add User' : 'Update User' }}
        </button>
      </DialogFooter>

    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export interface UserForm {
  fileNum: string; initial: string; firstName: string; surname: string
  title: string; email: string; phone: string; directorate: string
  department: string; branch: string; role: string; status: string
}

const props = defineProps<{
  open: boolean
  mode: 'add' | 'edit'
  initialData?: Partial<UserForm>
}>()

const emit = defineEmits<{
  (e: 'update:open', v: boolean): void
  (e: 'submit', d: UserForm): void
}>()

const branches    = ['Dodoma HQ', 'Dar es Salaam Sub-HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch']
const roleOptions = [
  { code: 'SYSTEM_ADMIN', label: 'System Administrator' },
  { code: 'MIS',          label: 'Manager Internal Security' },
  { code: 'AMIS',         label: 'Assistant Manager Internal Security' },
  { code: 'BISO',         label: 'Branch Information Security Officer' },
  { code: 'AK',           label: 'Armoury Keeper' },
  { code: 'MAK',          label: 'Main Armoury Keeper' },
  { code: 'SP',           label: 'Security Personnel' },
]

const empty = (): UserForm => ({
  fileNum: '', initial: '', firstName: '', surname: '', title: '',
  email: '', phone: '', directorate: '', department: '', branch: '', role: '', status: 'ACTIVE',
})
const form = ref<UserForm>(empty())

watch(() => props.open, (val) => {
  if (val && props.mode === 'edit' && props.initialData) {
    form.value = { ...empty(), ...props.initialData }
  } else if (val && props.mode === 'add') {
    form.value = empty()
  }
})

function handleSubmit() {
  emit('submit', { ...form.value })
  emit('update:open', false)
}
</script>