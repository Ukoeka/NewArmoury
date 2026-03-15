export enum PermissionCategory {
  INVENTORY    = 'inventory',
  ALLOCATIONS  = 'allocations',
  USERS        = 'users',
  AUDIT        = 'audit',
  HANDOVER     = 'handover',
  AMMO_REQUESTS = 'ammo_requests',
}

export interface Permission {
  id: string
  name: string
  slug: string
  category: PermissionCategory
}

export interface RoleResponse {
  id: string
  name: string
  abbreviation: string
  description: string
  is_system: boolean
  permissions: Permission[]
  created_at: string
  updated_at: string
}

export interface RoleCreate {
  name: string
  abbreviation: string
  description: string
}

export type UpdateRole = Partial<RoleCreate>