import type { RoleResponse, Permission } from "~/lib/models/Roles"
import type { ApiResponse } from "~/lib/models/util"

const mockPermissions: Permission[] = [
  { id: "p1", name: "View Users", slug: "users:view", category: "users" },
  { id: "p2", name: "Manage Users", slug: "users:manage", category: "users" },
  { id: "p3", name: "View Roles", slug: "roles:view", category: "users" },
  { id: "p4", name: "Manage Roles", slug: "roles:manage", category: "users" },
  { id: "p5", name: "View Inventory", slug: "inventory:view", category: "inventory" },
  { id: "p6", name: "Manage Inventory", slug: "inventory:manage", category: "inventory" },
  { id: "p7", name: "View Allocations", slug: "allocations:view", category: "allocations" },
  { id: "p8", name: "Manage Allocations", slug: "allocations:manage", category: "allocations" },
  { id: "p9", name: "View Ammo Requests", slug: "ammo_requests:view", category: "ammo_requests" },
  { id: "p10", name: "Manage Ammo Requests", slug: "ammo_requests:manage", category: "ammo_requests" },
  { id: "p11", name: "View Audit", slug: "audit:view", category: "audit" },
  { id: "p12", name: "Manage Audit", slug: "audit:manage", category: "audit" },
  { id: "p13", name: "View Handover", slug: "handover:view", category: "handover" },
  { id: "p14", name: "Manage Handover", slug: "handover:manage", category: "handover" },
]

const mockRoles: RoleResponse[] = [
  {
    id: "r1",
    name: "system_admin",
    abbreviation: "SYSTEM_ADMIN",
    description: "Full system access",
    is_system: true,
    permissions: mockPermissions,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r2",
    name: "manager",
    abbreviation: "MIS",
    description: "Manager Internal Security",
    is_system: false,
    permissions: mockPermissions.slice(0, 8),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r3",
    name: "amis",
    abbreviation: "AMIS",
    description: "Assistant Manager Internal Security",
    is_system: false,
    permissions: mockPermissions.slice(0, 6),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r4",
    name: "biso",
    abbreviation: "BISO",
    description: "Branch Information Security Officer",
    is_system: false,
    permissions: mockPermissions.slice(0, 4),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r5",
    name: "main_armory_keeper",
    abbreviation: "MAK",
    description: "Main Armoury Keeper",
    is_system: false,
    permissions: mockPermissions.slice(4, 10),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r6",
    name: "armory_keeper",
    abbreviation: "AK",
    description: "Armoury Keeper",
    is_system: false,
    permissions: mockPermissions.slice(4, 8),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r7",
    name: "security_personnel",
    abbreviation: "SP",
    description: "Security Personnel",
    is_system: false,
    permissions: mockPermissions.slice(12, 14),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: "r8",
    name: "auditor",
    abbreviation: "AUDITOR",
    description: "Auditor",
    is_system: false,
    permissions: mockPermissions.slice(10, 12),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
]

export const useRoleApi = () => {
  return {
    getRoles: () =>
      Promise.resolve({ message: "Success", data: mockRoles } as ApiResponse<RoleResponse[]>),

    getPermissions: () =>
      Promise.resolve({ message: "Success", data: mockPermissions } as ApiResponse<Permission[]>),
  }
}