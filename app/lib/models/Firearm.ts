export interface Firearm {
  id: string
  serialNumber: string
  make: string
  model: string
  category: "rifle" | "pistol" | "shotgun" | "smg" | "others"
  caliber: string
  manufacturer: string
  acquisitionDate: string // ISO date
  status: "available" | "damaged" | "lost" | "maintenance"| "decommissioned"
  location: string,
  createdAt: string // ISO date
  notes?: string | null
}