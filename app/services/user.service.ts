import { UserStatus, type UpdateUser, type UserPaginatedResponse, type UserResponse } from "~/lib/models/User"
import type { ApiResponse, PaginatedResponse } from "~/lib/models/util"

const mockBranch = {
  id: "branch-hq-001",
  name: "Dodoma HQ",
  location: "Dodoma",
  type: "head_office",
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
}

const mockRoles = [
  {
    id: "r1",
    name: "system_admin",
    abbreviation: "SYSTEM_ADMIN",
    description: "Full system access",
    is_system: true,
    permissions: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
]

const mockUsers: UserResponse[] = [
  {
    id: "u1",
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
    role_id: "r1",
    branch_id: "branch-hq-001",
    role: mockRoles[0],
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "u2",
    username: "jmith",
    email: "jmith@armoury.tz",
    first_name: "John",
    surname: "Mith",
    initial: "J",
    file_number: "MIS001",
    title: "Manager",
    department: "Internal Security",
    directorate: "Operations",
    phone_number: "+255 234 567 890",
    status: "active",
    is_superuser: false,
    last_login: new Date().toISOString(),
    role_id: "r2",
    branch_id: "branch-hq-001",
    role: mockRoles[0],
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "u3",
    username: "sp001",
    email: "sp001@armoury.tz",
    first_name: "Security",
    surname: "Personnel",
    initial: "SP",
    file_number: "SP001",
    title: "Security Personnel",
    department: "Security",
    directorate: "Operations",
    phone_number: "+255 345 678 901",
    status: "active",
    is_superuser: false,
    last_login: new Date().toISOString(),
    role_id: "r7",
    branch_id: "branch-hq-001",
    role: mockRoles[0],
    branch: mockBranch,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]

const mockPaginatedResponse: UserPaginatedResponse = {
  items: mockUsers,
  total: mockUsers.length,
  page: 1,
  size: 20,
  pages: 1,
  stats: {
    active: 3,
    disabled: 0,
    suspended: 0,
    banned: 0,
    total: 3,
    by_role: [
      { role_name: "system_admin", role_abbreviation: "SYSTEM_ADMIN", count: 1 },
      { role_name: "manager", role_abbreviation: "MIS", count: 1 },
      { role_name: "security_personnel", role_abbreviation: "SP", count: 1 },
    ]
  }
}

export const useUserApi = () => {
  return {
    createUser: (payload: UpdateUser) =>
      Promise.resolve({ message: "User created", data: mockUsers[0] } as ApiResponse<UserResponse>),

    getUsers: (page = 1, size = 20, search?: string, status: UserStatus = UserStatus.ALL, role_id?: string) =>
      Promise.resolve(mockPaginatedResponse),

    getUser: (id: string) =>
      Promise.resolve({ message: "Success", data: mockUsers.find(u => u.id === id) || mockUsers[0] } as ApiResponse<UserResponse>),

    updateUser: (user_id: string, payload: UpdateUser) =>
      Promise.resolve({ message: "User updated", data: mockUsers[0] } as ApiResponse<UserResponse>),

    deleteUser: (username: string) =>
      Promise.resolve({ message: "User deleted" }),
  }
}