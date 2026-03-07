<template>
  <div class="users-roles">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Users & Roles</h1>
        <p class="page-subtitle">Manage security personnel, armoury keepers, and system access</p>
      </div>
      <button class="btn-primary">
        <Plus :size="14" />
        Add User
      </button>
    </div>

    <!-- Stats -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Users</span>
          <span class="stat-value">{{ totalUsers }}</span>
        </div>
        <div class="stat-icon blue">
          <Users :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Active</span>
          <span class="stat-value">{{ activeCount }}</span>
        </div>
        <div class="stat-icon green">
          <CircleCheck :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Inactive</span>
          <span class="stat-value">{{ inactiveCount }}</span>
        </div>
        <div class="stat-icon yellow">
          <CircleAlert :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Security Personnel</span>
          <span class="stat-value">{{ securityCount }}</span>
        </div>
        <div class="stat-icon purple">
          <ShieldCheck :size="22" />
        </div>
      </div>
    </div>

    <!-- Users by Role -->
    <div class="roles-card">
      <h3 class="roles-title">Users by Role</h3>
      <div class="roles-grid">
        <div v-for="role in rolesSummary" :key="role.code" class="role-card">
          <span class="role-badge" :style="{ background: role.bgColor, color: role.color, borderColor: role.borderColor }">
            {{ role.code }}
          </span>
          <span class="role-count">{{ role.count }}</span>
          <span class="role-label">{{ role.label }}</span>
        </div>
      </div>
    </div>

    <!-- Filter Bar -->
    <div class="filter-bar">
      <div class="search-wrap">
        <Search :size="14" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name, email, or file number..."
          class="search-input"
        />
      </div>
      <select v-model="selectedRole" class="filter-select">
        <option value="">All Roles</option>
        <option v-for="r in roles" :key="r.code" :value="r.code">{{ r.code }}</option>
      </select>
      <select v-model="selectedStatus" class="filter-select">
        <option value="">All Statuses</option>
        <option value="ACTIVE">Active</option>
        <option value="INACTIVE">Inactive</option>
      </select>
      <select v-model="selectedBranch" class="filter-select">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
    </div>

    <!-- Users List -->
    <div class="users-card">
      <h3 class="users-title">All Users ({{ filteredUsers.length }})</h3>

      <div
        v-for="(user, index) in filteredUsers"
        :key="user.fileNum"
        class="user-row"
        :class="{ 'no-border': index === filteredUsers.length - 1 }"
      >
        <!-- Name -->
        <div class="user-field" style="flex: 1.2">
          <span class="field-label">Name</span>
          <span class="user-name">{{ user.name }}</span>
          <span class="user-filenum">{{ user.fileNum }}</span>
        </div>

        <!-- Email -->
        <div class="user-field" style="flex: 1.3">
          <span class="field-label">Email</span>
          <span class="field-value">{{ user.email }}</span>
        </div>

        <!-- Phone -->
        <div class="user-field" style="flex: 1">
          <span class="field-label">Phone</span>
          <span class="field-value">{{ user.phone }}</span>
        </div>

        <!-- Role -->
        <div class="user-field" style="flex: 0.7">
          <span class="field-label">Role</span>
          <span
            class="role-pill"
            :style="getRoleStyle(user.role)"
          >{{ user.role }}</span>
        </div>

        <!-- Branch -->
        <div class="user-field" style="flex: 1">
          <span class="field-label">Branch</span>
          <span class="field-value fw">{{ user.branch }}</span>
        </div>

        <!-- Status -->
        <div class="user-field" style="flex: 0.7">
          <span class="field-label">Status</span>
          <span class="status-badge" :class="user.status === 'ACTIVE' ? 'badge-active' : 'badge-inactive'">
            {{ user.status }}
          </span>
        </div>

        <!-- Actions -->
        <div class="user-actions">
          <button class="action-icon" title="Edit">
            <PenSquare :size="15" />
          </button>
        </div>
      </div>

      <div v-if="filteredUsers.length === 0" class="empty-state">
        No users found.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Plus, Search, Users, CircleCheck, CircleAlert, ShieldCheck, PenSquare } from 'lucide-vue-next'

interface User {
  name: string
  fileNum: string
  email: string
  phone: string
  role: string
  branch: string
  status: 'ACTIVE' | 'INACTIVE'
}

const searchQuery = ref('')
const selectedRole = ref('')
const selectedStatus = ref('')
const selectedBranch = ref('')

const branches = ['Dodoma HQ', 'Dar es Salaam Sub-HQ', 'Zanzibar Sub-HQ', 'Mwanza Branch', 'Mtwara Branch']

const roles = [
  { code: 'SYSTEM_ADMIN', label: 'System Administrator',               bgColor: '#3b0764', color: '#c084fc', borderColor: '#7e22ce' },
  { code: 'MIS',          label: 'Manager Internal Security',          bgColor: '#7f1d1d', color: '#f87171', borderColor: '#991b1b' },
  { code: 'AMIS',         label: 'Assistant Manager Internal Security', bgColor: '#7c2d12', color: '#fb923c', borderColor: '#9a3412' },
  { code: 'BISO',         label: 'Branch Information Security Officer', bgColor: '#1e3a5f', color: '#60a5fa', borderColor: '#1d4ed8' },
  { code: 'AK',           label: 'Armoury Keeper',                     bgColor: '#14532d', color: '#4ade80', borderColor: '#166534' },
  { code: 'MAK',          label: 'Main Armoury Keeper',                bgColor: '#164e63', color: '#22d3ee', borderColor: '#0e7490' },
  { code: 'SP',           label: 'Security Personnel',                 bgColor: '#1e2535', color: '#94a3b8', borderColor: '#2d3748' },
]

const rolesSummary = computed(() =>
  roles.map(r => ({
    ...r,
    count: users.value.filter(u => u.role === r.code).length,
  }))
)

function getRoleStyle(code: string) {
  const r = roles.find(r => r.code === code)
  if (!r) return {}
  return { background: r.bgColor, color: r.color, borderColor: r.borderColor }
}

const users = ref<User[]>([
  { name: 'J. K. Mwamba',  fileNum: 'ADM001',  email: 'admin@example.com',    phone: '+255712345678', role: 'SYSTEM_ADMIN', branch: 'Dodoma HQ',            status: 'ACTIVE' },
  { name: 'A. B. Kimaro',  fileNum: 'MIS001',  email: 'mis@example.com',      phone: '+255723456789', role: 'MIS',          branch: 'Dodoma HQ',            status: 'ACTIVE' },
  { name: 'S. M. Njovu',   fileNum: 'AMIS001', email: 'amis@example.com',     phone: '+255734567890', role: 'AMIS',         branch: 'Dodoma HQ',            status: 'ACTIVE' },
  { name: 'E. L. Mpina',   fileNum: 'BISO001', email: 'biso.dsm@example.com', phone: '+255745678901', role: 'BISO',         branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'F. G. Massawe', fileNum: 'AK001',   email: 'ak.dsm@example.com',   phone: '+255756789012', role: 'AK',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'H. I. Ndege',   fileNum: 'MAK001',  email: 'mak.dsm@example.com',  phone: '+255767890123', role: 'MAK',          branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'J. K. Sanga',   fileNum: 'SP001',   email: 'sp001@example.com',    phone: '+255778901234', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'L. M. Mbwana',  fileNum: 'SP002',   email: 'sp002@example.com',    phone: '+255789012345', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'N. O. Mwinyi',  fileNum: 'SP003',   email: 'sp003@example.com',    phone: '+255790123456', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'P. Q. Hamisi',  fileNum: 'SP004',   email: 'sp004@example.com',    phone: '+255791234567', role: 'SP',           branch: 'Dar es Salaam Sub-HQ', status: 'ACTIVE' },
  { name: 'R. S. Juma',    fileNum: 'SP005',   email: 'sp005@example.com',    phone: '+255712345670', role: 'SP',           branch: 'Zanzibar Sub-HQ',      status: 'ACTIVE' },
  { name: 'T. U. Salum',   fileNum: 'SP006',   email: 'sp006@example.com',    phone: '+255723456780', role: 'SP',           branch: 'Mwanza Branch',        status: 'ACTIVE' },
  { name: 'V. W. Hassan',  fileNum: 'SP007',   email: 'sp007@example.com',    phone: '+255734567801', role: 'SP',           branch: 'Mtwara Branch',        status: 'ACTIVE' },
])

const filteredUsers = computed(() =>
  users.value.filter(u => {
    const q = searchQuery.value.toLowerCase()
    const matchSearch = !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.fileNum.toLowerCase().includes(q)
    const matchRole = !selectedRole.value || u.role === selectedRole.value
    const matchStatus = !selectedStatus.value || u.status === selectedStatus.value
    const matchBranch = !selectedBranch.value || u.branch === selectedBranch.value
    return matchSearch && matchRole && matchStatus && matchBranch
  })
)

const totalUsers = computed(() => users.value.length)
const activeCount = computed(() => users.value.filter(u => u.status === 'ACTIVE').length)
const inactiveCount = computed(() => users.value.filter(u => u.status === 'INACTIVE').length)
const securityCount = computed(() => users.value.filter(u => u.role === 'SP').length)
</script>

<style scoped>
.users-roles {
  padding: 24px 32px;
  background: #0A0E1A;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}

/* Header */
.page-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 24px;
}
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; margin: 0 0 4px; }
.page-subtitle { font-size: 13px; color: #64748b; margin: 0; }
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 9px 16px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit; white-space: nowrap;
}
.btn-primary:hover { background: #2563eb; }

/* Stats */
.stats-row {
  display: grid; grid-template-columns: repeat(4, 1fr);
  gap: 16px; margin-bottom: 20px;
}
.stat-card {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; padding: 20px 22px;
  display: flex; align-items: center; justify-content: space-between;
}
.stat-info { display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon.blue   { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.green  { background: #14532d33; color: #22c55e; border: 1.5px solid #16a34a44; }
.stat-icon.yellow { background: #71390033; color: #eab308; border: 1.5px solid #ca8a0444; }
.stat-icon.purple { background: #3b076433; color: #c084fc; border: 1.5px solid #7e22ce44; }

/* Roles Card */
.roles-card {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; padding: 20px 22px; margin-bottom: 20px;
}
.roles-title {
  font-size: 14px; font-weight: 600; color: #f1f5f9;
  margin: 0 0 18px;
}
.roles-grid {
  display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px;
}
.role-card {
  background: #1a2030; border: 1px solid #1e2535;
  border-radius: 10px; padding: 16px 14px;
  display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
  transition: border-color 0.15s;
}
.role-card:hover { border-color: #2d3748; }
.role-badge {
  display: inline-flex; align-items: center;
  padding: 3px 8px; border-radius: 5px;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.4px;
  border: 1px solid;
}
.role-count {
  font-size: 26px; font-weight: 700; color: #f1f5f9; line-height: 1;
}
.role-label {
  font-size: 11px; color: #64748b; line-height: 1.3;
}

/* Filter Bar */
.filter-bar {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; padding: 14px 18px;
  display: flex; gap: 12px; align-items: center; margin-bottom: 20px;
}
.search-wrap { position: relative; flex: 1; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; }
.search-input {
  width: 100%; background: #0A0E1A; border: 1px solid #1e2535;
  border-radius: 8px; padding: 8px 12px 8px 34px;
  font-size: 13px; color: #e2e8f0; outline: none;
  transition: border-color 0.15s; box-sizing: border-box; font-family: inherit;
}
.search-input::placeholder { color: #475569; }
.search-input:focus { border-color: #3b82f6; }
.filter-select {
  flex: 1; background: #0A0E1A; border: 1px solid #1e2535;
  border-radius: 8px; padding: 8px 32px 8px 12px;
  font-size: 13px; color: #e2e8f0; outline: none; cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat; background-position: right 10px center;
  font-family: inherit; min-width: 130px;
}
.filter-select:focus { border-color: #3b82f6; }

/* Users Card */
.users-card {
  background: #161b27; border: 1px solid #1e2535;
  border-radius: 12px; overflow: hidden;
}
.users-title {
  font-size: 14px; font-weight: 600; color: #f1f5f9;
  padding: 18px 22px 16px; margin: 0; border-bottom: 1px solid #1e2535;
}

/* User Row */
.user-row {
  display: flex; align-items: center; gap: 16px;
  padding: 16px 22px; border-bottom: 1px solid #1a2030;
  transition: background 0.1s;
}
.user-row:hover { background: #1a2030; }
.user-row.no-border { border-bottom: none; }

.user-field { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.field-label { font-size: 11px; color: #475569; font-weight: 500; }
.field-value { font-size: 13px; color: #94a3b8; }
.field-value.fw { font-weight: 600; color: #e2e8f0; }
.user-name { font-size: 14px; font-weight: 700; color: #f1f5f9; }
.user-filenum { font-size: 11px; color: #475569; font-family: 'JetBrains Mono', monospace; }

.role-pill {
  display: inline-flex; align-items: center;
  padding: 3px 9px; border-radius: 5px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.4px;
  border: 1px solid; width: fit-content;
}

.status-badge {
  display: inline-flex; align-items: center;
  padding: 4px 10px; border-radius: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.5px;
  width: fit-content;
}
.badge-active   { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.badge-inactive { background: #1e2535; color: #64748b; border: 1px solid #2d3748; }

.user-actions { display: flex; align-items: center; margin-left: auto; flex-shrink: 0; }
.action-icon {
  display: flex; align-items: center; justify-content: center;
  background: transparent; border: none; border-radius: 6px;
  padding: 6px; cursor: pointer; color: #64748b; transition: all 0.15s;
}
.action-icon:hover { background: #1e2535; color: #94a3b8; }

.empty-state {
  padding: 48px; text-align: center; color: #475569; font-size: 13px;
}
</style>