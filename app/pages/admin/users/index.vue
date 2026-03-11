<template>
  <div class="p-6 min-h-screen bg-[#0A0E1A] text-slate-200 font-sans">

    <ToastContainer />

    <!-- Page Header -->
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="text-2xl font-bold text-slate-100 -tracking-[0.3px] mb-1">Users & Roles</h1>
        <p class="text-sm text-slate-500">Manage security personnel, armoury keepers, and system access</p>
      </div>
      <button
        @click="openAdd"
        class="flex items-center gap-1.5 bg-blue-600 text-white border-none rounded-lg px-4 py-2 text-sm font-semibold cursor-pointer hover:bg-blue-700 transition-colors whitespace-nowrap">
        <Plus :size="14" />
        Add User
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-4 gap-4 mb-5">
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Total Users</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ totalUsers }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-950/40 text-blue-500 border border-blue-500/25">
          <Users :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Active</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ activeCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-950/40 text-emerald-500 border border-emerald-500/25">
          <CircleCheck :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Inactive</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ inactiveCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-yellow-950/40 text-yellow-500 border border-yellow-500/25">
          <CircleAlert :size="22" />
        </div>
      </div>
      <div class="bg-[#161b27] border border-[#1e2535] rounded-xl p-5 flex items-center justify-between">
        <div class="flex flex-col gap-1.5">
          <span class="text-xs text-slate-500 font-medium">Security Personnel</span>
          <span class="text-[28px] font-bold text-slate-100 leading-none">{{ securityCount }}</span>
        </div>
        <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-purple-950/40 text-purple-400 border border-purple-500/25">
          <ShieldCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Users by Role -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-5 py-5 mb-5">
      <h3 class="text-[14px] font-semibold text-slate-100 mb-4">Users by Role</h3>
      <div class="grid grid-cols-7 gap-3">
        <div v-for="role in rolesSummary" :key="role.code"
          class="bg-[#1a2030] border border-[#1e2535] rounded-[10px] px-3.5 py-4 items-center flex flex-col text-center gap-2 hover:border-slate-600/50 transition-colors">
          <span class="inline-flex items-center px-2 py-0.5 rounded-md text-[10.5px] font-bold tracking-wide border"
            :style="{ background: role.bgColor, color: role.color, borderColor: role.borderColor }">
            {{ role.code }}
          </span>
          <span class="text-[26px] font-bold text-slate-100 leading-none">{{ role.count }}</span>
          <span class="text-[11px] text-slate-500 leading-snug">{{ role.label }}</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl px-4 py-3 flex gap-3 items-center mb-5">
      <div class="relative flex-1">
        <Search :size="14" class="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 pointer-events-none" />
        <input v-model="searchQuery" type="text" placeholder="Search by name, email, or file number..."
          class="w-full bg-[#0A0E1A] border border-[#1e2535] rounded-lg pl-9 pr-3 py-2 text-[13px] text-slate-200 placeholder-slate-600 outline-none focus:border-blue-500 transition-colors" />
      </div>
      <select v-model="selectedRole" class="flex-1 min-w-[130px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Roles</option>
        <option v-for="r in roles" :key="r.code" :value="r.code">{{ r.code }}</option>
      </select>
      <select v-model="selectedStatus" class="flex-1 min-w-[130px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
      <select v-model="selectedBranch" class="flex-1 min-w-[130px] bg-[#0A0E1A] border border-[#1e2535] rounded-lg px-3 py-2 text-[13px] text-slate-300 outline-none cursor-pointer focus:border-blue-500 transition-colors appearance-none">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <!-- Users List -->
    <div class="bg-[#161b27] border border-[#1e2535] rounded-xl">
      <h3 class="text-[14px] font-semibold text-slate-100 px-6 py-4 border-b border-[#1e2535] m-0">
        All Users ({{ filteredUsers.length }})
      </h3>

      <div class="p-3 flex flex-col gap-2">
        <div v-for="user in filteredUsers" :key="user.fileNum"
          @click="openDetails(user)"
          class="flex items-center gap-4 px-5 py-4 bg-[#1a2030] border border-[#1e2535] rounded-xl hover:border-slate-600/50 transition-colors cursor-pointer"
        >
          <!-- Name -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.2">
            <span class="text-[11px] text-slate-500 font-medium">Name</span>
            <span class="text-[14px] font-bold text-slate-100">{{ user.name }}</span>
            <span class="text-[11px] text-slate-600 font-mono">{{ user.fileNum }}</span>
          </div>
          <!-- Email -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1.3">
            <span class="text-[11px] text-slate-500 font-medium">Email</span>
            <span class="text-[13px] text-slate-400">{{ user.email }}</span>
          </div>
          <!-- Phone -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1">
            <span class="text-[11px] text-slate-500 font-medium">Phone</span>
            <span class="text-[13px] text-slate-400">{{ user.phone }}</span>
          </div>
          <!-- Role -->
          <div class="flex flex-col gap-1" style="flex: 0.7">
            <span class="text-[11px] text-slate-500 font-medium">Role</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide border mt-0.5"
              :style="getRoleStyle(user.role)">{{ user.role }}</span>
          </div>
          <!-- Branch -->
          <div class="flex flex-col gap-1 min-w-0" style="flex: 1">
            <span class="text-[11px] text-slate-500 font-medium">Branch</span>
            <span class="text-[13px] font-semibold text-slate-200">{{ user.branch }}</span>
          </div>
          <!-- Status -->
          <div class="flex flex-col gap-1" style="flex: 0.7">
            <span class="text-[11px] text-slate-500 font-medium">Status</span>
            <span class="inline-flex self-start items-center px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide mt-0.5"
              :class="{
                'bg-emerald-950/70 text-emerald-400 border border-emerald-700/50': user.status === 'ACTIVE',
                'bg-[#1e2535] text-slate-500 border border-slate-700/60': user.status === 'INACTIVE'
              }">{{ user.status }}</span>
          </div>
          <!-- Actions — stop propagation -->
          <div class="flex items-center ml-auto flex-shrink-0" @click.stop>
            <button @click="openEdit(user)" title="Edit"
              class="flex items-center justify-center p-1.5 rounded-md bg-transparent border-none text-slate-600 hover:text-slate-300 hover:bg-[#252f42] transition-all cursor-pointer">
              <PenSquare :size="15" />
            </button>
          </div>
        </div>

        <div v-if="filteredUsers.length === 0" class="py-12 text-center text-slate-600 text-sm">
          No users found.
        </div>
      </div>
    </div>

    <!-- ── Modals ── -->
    <AddEdit
      v-model:open="showAddModal"
      mode="add"
      @submit="handleAdd"
    />
    <AddEdit
      v-model:open="showEditModal"
      mode="edit"
      :initial-data="editingFileNum ? userToForm(users.find(u => u.fileNum === editingFileNum)!) : undefined"
      @submit="handleEdit"
    />
    <UserDetails
      v-model:open="showDetailsModal"
      :user="selectedUser ? userToDetail(selectedUser) : null"
      @edit="editingFileNum = selectedUser?.fileNum ?? null; showDetailsModal = false; showEditModal = true"
      @deactivate="handleDeactivate"
    />

  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'admin-layout' })

import { ref, computed } from 'vue'
import { Plus, Search, Users, CircleCheck, CircleAlert, ShieldCheck, PenSquare } from 'lucide-vue-next'
import ToastContainer from '@/components/app-specific/Toast/toastContainer.vue'
import AddEdit from '@/components/app-specific/dialogs/users/AddEdit.vue'
import UserDetails from '@/components/app-specific/dialogs/users/UserDetails.vue'
import { useToast } from '@/composables/useToast'

const { show: showToast } = useToast()

interface User {
  name: string; fileNum: string; email: string; phone: string
  role: string; branch: string; status: 'ACTIVE' | 'INACTIVE'
  initial?: string; firstName?: string; surname?: string
  title?: string; directorate?: string; department?: string; createdAt?: string
}

const searchQuery    = ref('')
const selectedRole   = ref('')
const selectedStatus = ref('')
const selectedBranch = ref('')

const branches = ['Dodoma HQ', 'Dar es Salaam Sub-HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch', 'Mbeya Branch']

const roles = [
  { code: 'SYSTEM_ADMIN', label: 'System Administrator',                bgColor: '#3b0764', color: '#c084fc', borderColor: '#7e22ce' },
  { code: 'MIS',          label: 'Manager Internal Security',           bgColor: '#7f1d1d', color: '#f87171', borderColor: '#991b1b' },
  { code: 'AMIS',         label: 'Assistant Manager Internal Security', bgColor: '#7c2d12', color: '#fb923c', borderColor: '#9a3412' },
  { code: 'BISO',         label: 'Branch Information Security Officer', bgColor: '#1e3a5f', color: '#60a5fa', borderColor: '#1d4ed8' },
  { code: 'AK',           label: 'Armoury Keeper',                      bgColor: '#14532d', color: '#4ade80', borderColor: '#166534' },
  { code: 'MAK',          label: 'Main Armoury Keeper',                 bgColor: '#164e63', color: '#22d3ee', borderColor: '#0e7490' },
  { code: 'SP',           label: 'Security Personnel',                  bgColor: '#1e2535', color: '#94a3b8', borderColor: '#2d3748' },
]

const rolesSummary = computed(() =>
  roles.map(r => ({ ...r, count: users.value.filter(u => u.role === r.code).length }))
)

function getRoleStyle(code: string) {
  const r = roles.find(r => r.code === code)
  return r ? { background: r.bgColor, color: r.color, borderColor: r.borderColor } : {}
}

const users = ref<User[]>([
  { name: 'J. K. Mwamba',  fileNum: 'ADM001',  email: 'admin@example.com',    phone: '+255712345678', role: 'SYSTEM_ADMIN', branch: 'Dodoma HQ',            status: 'ACTIVE',   initial: 'J', firstName: 'K',       surname: 'Mwamba',  title: 'System Administrator',                directorate: 'ICT',      department: 'Systems', createdAt: '1/1/2024' },
  { name: 'A. B. Kimaro',  fileNum: 'MIS001',  email: 'mis@example.com',      phone: '+255723456789', role: 'MIS',          branch: 'Dodoma HQ',            status: 'ACTIVE',   initial: 'A', firstName: 'B',       surname: 'Kimaro',  title: 'Manager Internal Security' },
  { name: 'S. M. Njovu',   fileNum: 'AMIS001', email: 'amis@example.com',     phone: '+255734567890', role: 'AMIS',         branch: 'Dodoma HQ',            status: 'ACTIVE',   initial: 'S', firstName: 'M',       surname: 'Njovu',   title: 'Asst. Manager Internal Security' },
  { name: 'E. L. Mpina',   fileNum: 'BISO001', email: 'biso.dsm@example.com', phone: '+255745678901', role: 'BISO',         branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'E', firstName: 'L',       surname: 'Mpina' },
  { name: 'F. G. Massawe', fileNum: 'AK001',   email: 'ak.dsm@example.com',   phone: '+255756789012', role: 'AK',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'F', firstName: 'G',       surname: 'Massawe' },
  { name: 'H. I. Ndege',   fileNum: 'MAK001',  email: 'mak.dsm@example.com',  phone: '+255767890123', role: 'MAK',          branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'H', firstName: 'I',       surname: 'Ndege' },
  { name: 'J. K. Sanga',   fileNum: 'SP001',   email: 'sp001@example.com',    phone: '+255778901234', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'J', firstName: 'K',       surname: 'Sanga' },
  { name: 'L. M. Mbwana',  fileNum: 'SP002',   email: 'sp002@example.com',    phone: '+255789012345', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'L', firstName: 'M',       surname: 'Mbwana' },
  { name: 'N. O. Mwinyi',  fileNum: 'SP003',   email: 'sp003@example.com',    phone: '+255790123456', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'N', firstName: 'O',       surname: 'Mwinyi' },
  { name: 'P. Q. Hamisi',  fileNum: 'SP004',   email: 'sp004@example.com',    phone: '+255791234567', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE',   initial: 'P', firstName: 'Q',       surname: 'Hamisi' },
  { name: 'R. S. Juma',    fileNum: 'SP005',   email: 'sp005@example.com',    phone: '+255712345670', role: 'SP',           branch: 'Zanzibar Sub-HQ',      status: 'ACTIVE',   initial: 'R', firstName: 'S',       surname: 'Juma' },
  { name: 'T. U. Salum',   fileNum: 'SP006',   email: 'sp006@example.com',    phone: '+255723456780', role: 'SP',           branch: 'Mwanza Branch',        status: 'ACTIVE',   initial: 'T', firstName: 'U',       surname: 'Salum' },
  { name: 'V. W. Hassan',  fileNum: 'SP007',   email: 'sp007@example.com',    phone: '+255734567801', role: 'SP',           branch: 'Mtwara Branch',        status: 'INACTIVE', initial: 'V', firstName: 'W',       surname: 'Hassan' },
])

// ── Computed ──
const filteredUsers = computed(() =>
  users.value.filter(u => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.fileNum.toLowerCase().includes(q)
    const matchRole   = !selectedRole.value   || u.role   === selectedRole.value
    const matchStatus = !selectedStatus.value || u.status === selectedStatus.value
    const matchBranch = !selectedBranch.value || u.branch === selectedBranch.value
    return matchSearch && matchRole && matchStatus && matchBranch
  })
)

const totalUsers    = computed(() => users.value.length)
const activeCount   = computed(() => users.value.filter(u => u.status === 'ACTIVE').length)
const inactiveCount = computed(() => users.value.filter(u => u.status === 'INACTIVE').length)
const securityCount = computed(() => users.value.filter(u => u.role === 'SP').length)

// ── Modal state ──
const showAddModal     = ref(false)
const showEditModal    = ref(false)
const showDetailsModal = ref(false)
const selectedUser     = ref<User | null>(null)
const editingFileNum   = ref<string | null>(null)

// ── Shape helpers ──
function userToForm(u: User) {
  return {
    fileNum: u.fileNum, initial: u.initial ?? '', firstName: u.firstName ?? '',
    surname: u.surname ?? '', title: u.title ?? '', email: u.email,
    phone: u.phone, directorate: u.directorate ?? '', department: u.department ?? '',
    branch: u.branch, role: u.role, status: u.status,
  }
}

function userToDetail(u: User) {
  return {
    fileNum: u.fileNum, name: u.name, initial: u.initial ?? '',
    firstName: u.firstName ?? '', surname: u.surname ?? '',
    email: u.email, phone: u.phone, title: u.title ?? '',
    directorate: u.directorate ?? '', department: u.department ?? '',
    branch: u.branch, role: u.role, status: u.status, createdAt: u.createdAt,
  }
}

// ── Open handlers ──
function openAdd() {
  selectedUser.value = null
  showAddModal.value = true
}
function openEdit(u: User) {
  selectedUser.value = u
  editingFileNum.value = u.fileNum
  showEditModal.value = true
}
function openDetails(u: User) {
  selectedUser.value = u
  showDetailsModal.value = true
}

// ── Submit handlers ──
function handleAdd(data: any) {
  const fullName = [data.initial, data.firstName, data.surname].filter(Boolean).join('. ').replace(/\.\./g, '.')
  users.value.push({
    name: fullName || `${data.firstName} ${data.surname}`,
    fileNum: data.fileNum, email: data.email, phone: data.phone,
    role: data.role, branch: data.branch, status: 'ACTIVE',
    initial: data.initial, firstName: data.firstName, surname: data.surname,
    title: data.title, directorate: data.directorate, department: data.department,
    createdAt: new Date().toLocaleDateString(),
  })
  showToast(`User "${data.firstName} ${data.surname}" added successfully`, 'success')
}

function handleEdit(data: any) {
  const idx = users.value.findIndex(u => u.fileNum === editingFileNum.value)
  if (idx === -1) return
  const fullName = [data.initial, data.firstName, data.surname].filter(Boolean).join('. ').replace(/\.\./g, '.')
  users.value[idx] = {
    ...users.value[idx],
    name: fullName || `${data.firstName} ${data.surname}`,
    email: data.email, phone: data.phone, role: data.role,
    branch: data.branch, status: data.status,
    initial: data.initial, firstName: data.firstName, surname: data.surname,
    title: data.title, directorate: data.directorate, department: data.department,
  }
  editingFileNum.value = null
  showToast(`User updated successfully`, 'success')
}

function handleDeactivate() {
  const idx = users.value.findIndex(u => u.fileNum === selectedUser.value?.fileNum)
  if (idx === -1) return
  users.value[idx].status = 'INACTIVE'
  showDetailsModal.value = false
  showToast(`User "${users.value[idx].name}" deactivated`, 'success')
}
</script>