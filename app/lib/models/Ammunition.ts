export interface Ammunition {
  id: string
  lotNumber: string
  caliber: string
  roundsPerBox: number
  boxes: number
  totalRounds: number
  manufacturer: string
  expiryDate: string // ISO (if applicable)
  status: "available" | "damaged" | "lost" | "maintenance"| "decommissioned"
  location: string,
  createdAt: string // ISO date
  notes?: string | null
}