
import type { Role } from "./models/Roles";
import type { Kit } from "./models/Kit";
import type { Ammunition } from "./models/Ammunition";
import type { Firearm } from "./models/Firearm";


export const roleDB: Role[] = [
  {
    id: "a1d2f3c7-8845-4fc1-b0b4-4c9fa9d1e9b1",
    roleName: "Administrator",
    description: "Full system access including user and permission management."
  },
  {
    id: "9c5a6f10-6f6e-4201-9cf2-75ab1d3490e5",
    roleName: "BISO",
    description: "Can modify content and manage posts but cannot change system settings."
  },
  {
    id: "3bfaa7e4-a4c1-4f33-a3af-b618124eb48f",
    roleName: "Supervisor",
    description: "Read-only access to content and data."
  },
  {
    id: "e76f74ac-72d7-44d7-8a5b-26f78e38fa1e",
    roleName: "Armory Officer",
    description: "Can review, approve, and remove submitted content and comments."
  },
  {
    id: "0f63997a-5ad0-4b48-bb5e-e7a3d600f20a",
    roleName: "Security Officer",
    description: "Handles customer inquiries and basic account issues."
  }
];

export const kitDb: Kit[] = [
  { id: "k101", name: "Maintenance Kit Alpha", type: "maintenance", quantity: 10, status: "available", createdAt: "2025-01-05", notes: "Complete with cleaning rods" },
  { id: "k102", name: "Survival Pack Bravo", type: "survival", quantity: 15, status: "damaged", createdAt: "2025-01-06", notes: "Minor tears in fabric" },
  { id: "k103", name: "Cleaning Kit Charlie", type: "cleaning", quantity: 12, status: "lost", createdAt: "2025-01-07", notes: "Reported missing" },
  { id: "k104", name: "Custom Kit Delta", type: "custom", quantity: 8, status: "maintenance", createdAt: "2025-01-08", notes: "Under inspection" },
  { id: "k105", name: "Maintenance Kit Echo", type: "maintenance", quantity: 20, status: "decommissioned", createdAt: "2025-01-09", notes: "Retired kit" },
  { id: "k106", name: "Survival Pack Foxtrot", type: "survival", quantity: 18, status: "available", createdAt: "2025-01-10", notes: "Ready for issue" },
  { id: "k107", name: "Cleaning Kit Golf", type: "cleaning", quantity: 14, status: "damaged", createdAt: "2025-01-11", notes: "Missing cleaning solution" },
  { id: "k108", name: "Custom Kit Hotel", type: "custom", quantity: 22, status: "lost", createdAt: "2025-01-12", notes: "Reported lost" },
  { id: "k109", name: "Maintenance Kit India", type: "maintenance", quantity: 16, status: "available", createdAt: "2025-01-13", notes: "Ready for issue" },
  { id: "k110", name: "Survival Pack Juliet", type: "survival", quantity: 25, status: "available", createdAt: "2025-01-14", notes: null },
  { id: "k111", name: "Cleaning Kit Kilo", type: "cleaning", quantity: 19, status: "maintenance", createdAt: "2025-01-15", notes: "Parts under repair" },
  { id: "k112", name: "Custom Kit Lima", type: "custom", quantity: 21, status: "available", createdAt: "2025-01-16", notes: "Ready for deployment" },
  { id: "k113", name: "Maintenance Kit Mike", type: "maintenance", quantity: 17, status: "lost", createdAt: "2025-01-17", notes: "Reported missing" },
  { id: "k114", name: "Survival Pack November", type: "survival", quantity: 13, status: "damaged", createdAt: "2025-01-18", notes: "Waterproofing damaged" },
  { id: "k115", name: "Cleaning Kit Oscar", type: "cleaning", quantity: 11, status: "available", createdAt: "2025-01-19", notes: "Ready for issue" },
  { id: "k116", name: "Custom Kit Papa", type: "custom", quantity: 24, status: "maintenance", createdAt: "2025-01-20", notes: "Under review" },
  { id: "k117", name: "Maintenance Kit Quebec", type: "maintenance", quantity: 15, status: "available", createdAt: "2025-01-21", notes: null },
  { id: "k118", name: "Survival Pack Romeo", type: "survival", quantity: 20, status: "lost", createdAt: "2025-01-22", notes: "Reported missing" },
  { id: "k119", name: "Cleaning Kit Sierra", type: "cleaning", quantity: 18, status: "available", createdAt: "2025-01-23", notes: "Ready for issue" },
  { id: "k120", name: "Custom Kit Tango", type: "custom", quantity: 26, status: "available", createdAt: "2025-01-24", notes: "Fully stocked" }
];


export const ammunitionsDb: Ammunition[] = [
  { id: "a101", lotNumber: "AM-2025-101", caliber: "9×19mm", roundsPerBox: 50, boxes: 20, totalRounds: 1000, manufacturer: "PMC", expiryDate: "2035-01-01", status: "available", location: "Central Armory - Bay A", createdAt: "2025-01-05", notes: "Stored in climate controlled rack A1" },
  { id: "a102", lotNumber: "AM-2025-102", caliber: "5.56×45mm", roundsPerBox: 30, boxes: 25, totalRounds: 750, manufacturer: "Lake City", expiryDate: "2035-01-01", status: "damaged", location: "Central Armory - Bay B", createdAt: "2025-01-06", notes: "Box damaged, inspection needed" },
  { id: "a103", lotNumber: "AM-2025-103", caliber: "7.62×39mm", roundsPerBox: 20, boxes: 30, totalRounds: 600, manufacturer: "Norinco", expiryDate: "2035-01-01", status: "lost", location: "Central Armory - Bay C", createdAt: "2025-01-07", notes: "Missing boxes reported" },
  { id: "a104", lotNumber: "AM-2025-104", caliber: "12ga", roundsPerBox: 10, boxes: 50, totalRounds: 500, manufacturer: "Winchester", expiryDate: "2035-01-01", status: "maintenance", location: "Maintenance - Bay 1", createdAt: "2025-01-08", notes: "Under maintenance" },
  { id: "a105", lotNumber: "AM-2025-105", caliber: "9×19mm", roundsPerBox: 50, boxes: 15, totalRounds: 750, manufacturer: "Sellier & Bellot", expiryDate: "2035-01-01", status: "decommissioned", location: "Disposal", createdAt: "2025-01-09", notes: "Decommissioned rounds" },
  { id: "a106", lotNumber: "AM-2025-106", caliber: "5.56×45mm", roundsPerBox: 30, boxes: 60, totalRounds: 1800, manufacturer: "FN Herstal", expiryDate: "2035-01-01", status: "available", location: "Reserve Vault", createdAt: "2025-01-10", notes: null },
  { id: "a107", lotNumber: "AM-2025-107", caliber: "7.62×51mm", roundsPerBox: 20, boxes: 20, totalRounds: 400, manufacturer: "Raufoss", expiryDate: "2035-01-01", status: "damaged", location: "Depot - Bay 3", createdAt: "2025-01-11", notes: "Some rounds dented" },
  { id: "a108", lotNumber: "AM-2025-108", caliber: ".22LR", roundsPerBox: 50, boxes: 100, totalRounds: 5000, manufacturer: "CCI", expiryDate: "2035-01-01", status: "available", location: "Training Center - Cabinet 1", createdAt: "2025-01-12", notes: "Used for marksmanship training" },
  { id: "a109", lotNumber: "AM-2025-109", caliber: "20mm", roundsPerBox: 1, boxes: 12, totalRounds: 12, manufacturer: "Nexter", expiryDate: "2035-01-01", status: "available", location: "Heavy Weapons - Armored Locker", createdAt: "2025-01-13", notes: "High-caliber, secure storage" },
  { id: "a110", lotNumber: "AM-2025-110", caliber: "9×19mm", roundsPerBox: 50, boxes: 25, totalRounds: 1250, manufacturer: "PMC", expiryDate: "2035-01-01", status: "lost", location: "Depot - Bay 4", createdAt: "2025-01-14", notes: "Reported missing" },
  { id: "a111", lotNumber: "AM-2025-111", caliber: "5.56×45mm", roundsPerBox: 30, boxes: 50, totalRounds: 1500, manufacturer: "Lake City", expiryDate: "2035-01-01", status: "maintenance", location: "Depot - Bay 5", createdAt: "2025-01-15", notes: "Inspection in progress" },
  { id: "a112", lotNumber: "AM-2025-112", caliber: "7.62×39mm", roundsPerBox: 20, boxes: 40, totalRounds: 800, manufacturer: "Norinco", expiryDate: "2035-01-01", status: "available", location: "Depot - Bay 6", createdAt: "2025-01-16", notes: "Ready for issue" },
  { id: "a113", lotNumber: "AM-2025-113", caliber: "12ga", roundsPerBox: 10, boxes: 60, totalRounds: 600, manufacturer: "Winchester", expiryDate: "2035-01-01", status: "decommissioned", location: "Disposal", createdAt: "2025-01-17", notes: "Marked for disposal" },
  { id: "a114", lotNumber: "AM-2025-114", caliber: "9×19mm", roundsPerBox: 50, boxes: 30, totalRounds: 1500, manufacturer: "Sellier & Bellot", expiryDate: "2035-01-01", status: "damaged", location: "Depot - Bay 7", createdAt: "2025-01-18", notes: "Moisture damage detected" },
  { id: "a115", lotNumber: "AM-2025-115", caliber: "5.56×45mm", roundsPerBox: 30, boxes: 70, totalRounds: 2100, manufacturer: "FN Herstal", expiryDate: "2035-01-01", status: "available", location: "Depot - Bay 8", createdAt: "2025-01-19", notes: null },
  { id: "a116", lotNumber: "AM-2025-116", caliber: "7.62×51mm", roundsPerBox: 20, boxes: 35, totalRounds: 700, manufacturer: "Raufoss", expiryDate: "2035-01-01", status: "lost", location: "Depot - Bay 9", createdAt: "2025-01-20", notes: "Reported missing" },
  { id: "a117", lotNumber: "AM-2025-117", caliber: ".22LR", roundsPerBox: 50, boxes: 80, totalRounds: 4000, manufacturer: "CCI", expiryDate: "2035-01-01", status: "available", location: "Training Center - Cabinet 2", createdAt: "2025-01-21", notes: "For training" },
  { id: "a118", lotNumber: "AM-2025-118", caliber: "20mm", roundsPerBox: 1, boxes: 10, totalRounds: 10, manufacturer: "Nexter", expiryDate: "2035-01-01", status: "maintenance", location: "Heavy Weapons - Armored Locker", createdAt: "2025-01-22", notes: "Under inspection" },
  { id: "a119", lotNumber: "AM-2025-119", caliber: "9×19mm", roundsPerBox: 50, boxes: 18, totalRounds: 900, manufacturer: "PMC", expiryDate: "2035-01-01", status: "available", location: "Central Armory - Bay D", createdAt: "2025-01-23", notes: "Ready for issue" },
  { id: "a120", lotNumber: "AM-2025-120", caliber: "5.56×45mm", roundsPerBox: 30, boxes: 55, totalRounds: 1650, manufacturer: "Lake City", expiryDate: "2035-01-01", status: "damaged", location: "Depot - Bay 10", createdAt: "2025-01-24", notes: "Box damage noted" }
];




export const firearmDb: Firearm[] = [
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a01", serialNumber: "TZ-FA-0013", make: "FN", model: "SCAR-L", category: "rifle", caliber: "5.56×45mm", manufacturer: "FN Herstal", acquisitionDate: "2023-01-12", createdAt: "2023-01-12", status: "available", location: "Depot - Shelf 1", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a02", serialNumber: "TZ-FA-0014", make: "Glock", model: "17 Gen4", category: "pistol", caliber: "9×19mm", manufacturer: "Glock Ges.m.b.H.", acquisitionDate: "2022-02-08", createdAt: "2022-02-08", status: "damaged", location: "Depot - Shelf 2", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a03", serialNumber: "TZ-FA-0015", make: "Remington", model: "870", category: "shotgun", caliber: "12ga", manufacturer: "Remington", acquisitionDate: "2021-03-05", createdAt: "2021-03-05", status: "lost", location: "Depot - Shelf 3", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a04", serialNumber: "TZ-FA-0016", make: "HK", model: "MP5", category: "smg", caliber: "9×19mm", manufacturer: "Heckler & Koch", acquisitionDate: "2020-04-20", createdAt: "2020-04-20", status: "maintenance", location: "Depot - Shelf 4", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a05", serialNumber: "TZ-FA-0017", make: "SAR", model: "K2-12", category: "rifle", caliber: "7.62×39mm", manufacturer: "SAR Group", acquisitionDate: "2022-05-15", createdAt: "2022-05-15", status: "decommissioned", location: "Depot - Shelf 5", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a06", serialNumber: "TZ-FA-0018", make: "Sig Sauer", model: "P320", category: "pistol", caliber: "9×19mm", manufacturer: "Sig Sauer", acquisitionDate: "2023-06-12", createdAt: "2023-06-12", status: "available", location: "Depot - Shelf 6", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a07", serialNumber: "TZ-FA-0019", make: "IWI", model: "TAVOR X95", category: "rifle", caliber: "5.56×45mm", manufacturer: "Israel Weapon Industries", acquisitionDate: "2023-07-01", createdAt: "2023-07-01", status: "damaged", location: "Depot - Shelf 7", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a08", serialNumber: "TZ-FA-0020", make: "Browning", model: "Hi-Power", category: "pistol", caliber: "9×19mm", manufacturer: "FN/Browning", acquisitionDate: "2021-08-09", createdAt: "2021-08-09", status: "lost", location: "Depot - Shelf 8", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a09", serialNumber: "TZ-FA-0021", make: "Colt", model: "M4 Carbine", category: "rifle", caliber: "5.56×45mm", manufacturer: "Colt", acquisitionDate: "2020-09-14", createdAt: "2020-09-14", status: "maintenance", location: "Depot - Shelf 9", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a10", serialNumber: "TZ-FA-0022", make: "CZ", model: "75", category: "pistol", caliber: "9×19mm", manufacturer: "Česká zbrojovka", acquisitionDate: "2022-10-22", createdAt: "2022-10-22", status: "decommissioned", location: "Depot - Shelf 10", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a11", serialNumber: "TZ-FA-0023", make: "FN", model: "SCAR-L", category: "rifle", caliber: "5.56×45mm", manufacturer: "FN Herstal", acquisitionDate: "2021-11-11", createdAt: "2021-11-11", status: "available", location: "Depot - Shelf 11", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a12", serialNumber: "TZ-FA-0024", make: "Glock", model: "17 Gen4", category: "pistol", caliber: "9×19mm", manufacturer: "Glock Ges.m.b.H.", acquisitionDate: "2023-01-19", createdAt: "2023-01-19", status: "damaged", location: "Depot - Shelf 12", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a13", serialNumber: "TZ-FA-0025", make: "Remington", model: "870", category: "shotgun", caliber: "12ga", manufacturer: "Remington", acquisitionDate: "2022-02-20", createdAt: "2022-02-20", status: "lost", location: "Depot - Shelf 13", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a14", serialNumber: "TZ-FA-0026", make: "HK", model: "MP5", category: "smg", caliber: "9×19mm", manufacturer: "Heckler & Koch", acquisitionDate: "2023-03-18", createdAt: "2023-03-18", status: "maintenance", location: "Depot - Shelf 14", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a15", serialNumber: "TZ-FA-0027", make: "SAR", model: "K2-12", category: "rifle", caliber: "7.62×39mm", manufacturer: "SAR Group", acquisitionDate: "2021-04-22", createdAt: "2021-04-22", status: "decommissioned", location: "Depot - Shelf 15", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a16", serialNumber: "TZ-FA-0028", make: "Sig Sauer", model: "P320", category: "pistol", caliber: "9×19mm", manufacturer: "Sig Sauer", acquisitionDate: "2023-05-14", createdAt: "2023-05-14", status: "available", location: "Depot - Shelf 16", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a17", serialNumber: "TZ-FA-0029", make: "IWI", model: "TAVOR X95", category: "rifle", caliber: "5.56×45mm", manufacturer: "Israel Weapon Industries", acquisitionDate: "2022-06-09", createdAt: "2022-06-09", status: "damaged", location: "Depot - Shelf 17", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a18", serialNumber: "TZ-FA-0030", make: "Browning", model: "Hi-Power", category: "pistol", caliber: "9×19mm", manufacturer: "FN/Browning", acquisitionDate: "2021-07-11", createdAt: "2021-07-11", status: "lost", location: "Depot - Shelf 18", notes: "No notes" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a19", serialNumber: "TZ-FA-0031", make: "Colt", model: "M4 Carbine", category: "rifle", caliber: "5.56×45mm", manufacturer: "Colt", acquisitionDate: "2023-08-05", createdAt: "2023-08-05", status: "maintenance", location: "Depot - Shelf 19", notes: "Routine inspection required" },
  { id: "f1011d0a-3d5b-4e0b-87f8-1b2d0e9f7a20", serialNumber: "TZ-FA-0032", make: "CZ", model: "75", category: "pistol", caliber: "9×19mm", manufacturer: "Česká zbrojovka", acquisitionDate: "2023-09-12", createdAt: "2023-09-12", status: "decommissioned", location: "Depot - Shelf 20", notes: "No notes" }
];
