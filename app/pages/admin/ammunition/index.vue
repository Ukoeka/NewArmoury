<template>
  <div class="ammunition">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Ammunition Inventory</h1>
        <p class="page-subtitle">Track and manage ammunition stock across all branches</p>
      </div>
      <div class="header-btns">
        <button class="btn-primary">
          <package :size="14" />
          Register Type
        </button>
        <button class="btn-primary">
          <Plus :size="14" />
          Add Inventory
        </button>
      </div>
    </div>

    <!-- Tabs -->
    <div class="tabs-row">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Stats -->
   

    <!-- Inventory Table -->
    <div v-if="activeTab === 'inventory'">
       <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Ammunition</span>
          <span class="stat-value">{{ totalAmmo.toLocaleString() }}</span>
        </div>
        <div class="stat-icon blue">
          <Package :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">In Transit</span>
          <span class="stat-value">{{ inTransit.toLocaleString() }}</span>
        </div>
        <div class="stat-icon orange">
          <TrendingUp :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Low Stock Alerts</span>
          <span class="stat-value">{{ lowStockCount }}</span>
        </div>
        <div class="stat-icon red">
          <TriangleAlert :size="22" />
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="filter-bar">
      <select v-model="selectedBranch" class="filter-select">
        <option value="">All Branches</option>
        <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
      </select>
      <select v-model="selectedArmoury" class="filter-select">
        <option value="">All Armouries</option>
        <option value="MAIN">Main</option>
        <option value="SUB">Sub</option>
      </select>
      <div class="search-wrap">
        <Search :size="14" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search inventory..."
          class="search-input"
        />
      </div>
    </div>

      <div class="inventory-card">
        <h3 class="card-title">Current Inventory</h3>
      <div class="inv-table">
        <div class="inv-table-header">
          <span>Ammunition Type</span>
          <span>Branch</span>
          <span>Location</span>
          <span>Batch/Lot</span>
          <span>Quantity</span>
          <span></span>
        </div>
        <div
          v-for="(item, index) in filteredInventory"
          :key="index"
          class="inv-row"
        >
          <div class="inv-field">
            <span class="inv-label">Ammunition Type</span>
            <span class="inv-value">{{ item.type }}</span>
          </div>
          <div class="inv-field">
            <span class="inv-label">Branch</span>
            <span class="inv-value">{{ item.branch }}</span>
          </div>
          <div class="inv-field">
            <span class="inv-label">Location</span>
            <span class="inv-location">{{ item.location }}</span>
          </div>
          <div class="inv-field">
            <span class="inv-label">Batch/Lot</span>
            <span class="inv-value inv-batch">{{ item.batch }}</span>
          </div>
          <div class="inv-field">
            <span class="inv-label">Quantity</span>
            <span class="inv-qty-row">
              <span class="inv-qty">{{ item.quantity.toLocaleString() }}</span>
              <span class="stock-badge" :class="stockClass(item.stockLevel)">{{ item.stockLevel }}</span>
            </span>
          </div>
          <div class="inv-action">
            <button class="adjust-btn">
              <Plus :size="13" />
              Adjust
            </button>
          </div>
        </div>

        <div v-if="filteredInventory.length === 0" class="empty-state">
          No inventory records found.
        </div>
      </div>
      </div>
      
    </div>

    <!-- Ammunition Types Tab (placeholder) -->
    <div v-if="activeTab === 'types'" class="inventory-card">
      <div class="header-row">
        <h3 class="card-title">Ammunition Types</h3>
        <button class="btn-primary">
            <package :size="14" />
            Register Type
        </button>
      </div>

       <div class="filter-bar">
    
        <div class="search-wrap">
          <Search :size="14" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search Ammunition Types..."
            class="search-input"
          />
        </div>
      </div>

      <div class="stats-row">
      <div v-for="(item, index) in filteredTypes" :key="index" class="stat-card">
        <div class="stat-info">
          <span class="stat-value">{{ item.name }}</span>
          <span class="stat-label">{{ item.description }}</span>
          <span class="stat-label">Applicable Fire Arms: {{ item.applicable }}</span>
        </div> 
      </div>
    </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Plus, Search, Package, TrendingUp, TriangleAlert, Settings2 } from 'lucide-vue-next'

interface InventoryItem {
  type: string
  branch: string
  location: string
  batch: string
  quantity: number
  stockLevel: 'Good' | 'Low' | 'Critical'
}
interface TypeItem {
  name: string
  description: string
  applicable: string
}

const activeTab = ref('inventory')
const searchQuery = ref('')
const selectedBranch = ref('')
const selectedArmoury = ref('')

const tabs = [
  { id: 'inventory', label: 'Inventory' },
  { id: 'types', label: 'Ammunition Types' },
]

const branches = [
  'Dar es Salaam Sub-HQ',
  'Dodoma HQ',
  'Zanzibar Sub-HQ',
  'Mwanza Branch',
  'Mtwara Branch',
  'Mbeya Branch',
]

const inventory = ref<InventoryItem[]>([
  { type: '9mm Parabellum',  branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-001', quantity: 5000, stockLevel: 'Good' },
  { type: '9mm Parabellum',  branch: 'Dar es Salaam Sub-HQ', location: 'SUB',  batch: 'BATCH2024-001', quantity: 500,  stockLevel: 'Good' },
  { type: '12 Gauge',        branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-002', quantity: 1200, stockLevel: 'Good' },
  { type: '.45 ACP',         branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-003', quantity: 800,  stockLevel: 'Good' },
  { type: '.40 S&W',         branch: 'Dar es Salaam Sub-HQ', location: 'MAIN', batch: 'BATCH2024-004', quantity: 600,  stockLevel: 'Good' },
  { type: '7.62x39mm',       branch: 'Dodoma HQ',            location: 'MAIN', batch: 'BATCH2024-005', quantity: 10000,stockLevel: 'Good' },
  { type: '9mm Parabellum',  branch: 'Zanzibar Sub-HQ',      location: 'SUB',  batch: 'BATCH2024-006', quantity: 400,  stockLevel: 'Low' },
  { type: '12 Gauge',        branch: 'Zanzibar Sub-HQ',      location: 'MAIN', batch: 'BATCH2024-007', quantity: 350,  stockLevel: 'Low' },
  { type: '.45 ACP',         branch: 'Zanzibar Sub-HQ',      location: 'MAIN', batch: 'BATCH2024-008', quantity: 150,  stockLevel: 'Low' },
  { type: '9mm Parabellum',  branch: 'Mwanza Branch',        location: 'MAIN', batch: 'BATCH2024-009', quantity: 2500, stockLevel: 'Good' },
  { type: '12 Gauge',        branch: 'Mwanza Branch',        location: 'MAIN', batch: 'BATCH2024-010', quantity: 800,  stockLevel: 'Good' },
  { type: '.40 S&W',         branch: 'Mwanza Branch',        location: 'MAIN', batch: 'BATCH2024-011', quantity: 450,  stockLevel: 'Low' },
  { type: '9mm Parabellum',  branch: 'Mtwara Branch',        location: 'MAIN', batch: 'BATCH2024-012', quantity: 2000, stockLevel: 'Good' },
  { type: '12 Gauge',        branch: 'Mtwara Branch',        location: 'MAIN', batch: 'BATCH2024-013', quantity: 650,  stockLevel: 'Good' },
  { type: '.45 ACP',         branch: 'Mtwara Branch',        location: 'MAIN', batch: 'BATCH2024-014', quantity: 280,  stockLevel: 'Critical' },
  { type: '9mm Parabellum',  branch: 'Mbeya Branch',         location: 'MAIN', batch: 'BATCH2024-015', quantity: 3000, stockLevel: 'Good' },
  { type: '12 Gauge',        branch: 'Mbeya Branch',         location: 'MAIN', batch: 'BATCH2024-016', quantity: 900,  stockLevel: 'Good' },
])


const types = ref<TypeItem[]>([
  { name: '9mm Parabellum',  description: 'Standard 9mm ammunition for pistols', applicable: 'MAIN', },
  { name: '12 Gauge',        description: 'Standard shotgun ammunition', applicable: 'SHORT GUN',},
  { name: '.45 ACP',         description: '.45 caliber ammunition', applicable: 'PISTOL',},
  { name: '.7.62mm',         description: '7.62mm rifle ammunition', applicable: 'RIFLE',},
  { name: '.40 S&W',         description: '.40 Smith & Wesson ammunition', applicable: 'PISTOL',},
])

const filteredInventory = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return inventory.value.filter(item => {
    const matchBranch = !selectedBranch.value || item.branch === selectedBranch.value
    const matchArmoury = !selectedArmoury.value || item.location === selectedArmoury.value
    const matchSearch = !q || item.type.toLowerCase().includes(q) || item.batch.toLowerCase().includes(q) || item.branch.toLowerCase().includes(q)
    return matchBranch && matchArmoury && matchSearch
  })
})

const filteredTypes = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return types.value.filter(item => {
    return !q || item.name.toLowerCase().includes(q) || item.description.toLowerCase().includes(q) || item.applicable.toLowerCase().includes(q)
  })
})

const totalAmmo = computed(() => inventory.value.reduce((s, i) => s + i.quantity, 0))
const inTransit = computed(() => 200)
const lowStockCount = computed(() => inventory.value.filter(i => i.stockLevel === 'Low' || i.stockLevel === 'Critical').length)

function stockClass(level: string) {
  if (level === 'Good') return 'stock-good'
  if (level === 'Low') return 'stock-low'
  if (level === 'Critical') return 'stock-critical'
  return ''
}
</script>

<style scoped>
.ammunition {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}
.page-title { font-size: 22px; font-weight: 700; color: #f1f5f9; letter-spacing: -0.3px; margin: 0 0 4px; }
.page-subtitle { font-size: 13px; color: #64748b; margin: 0; }
.header-btns { display: flex; gap: 10px; }
.btn-primary {
  display: flex; align-items: center; gap: 6px;
  background: #3b82f6; color: #fff; border: none;
  border-radius: 8px; padding: 9px 16px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  transition: background 0.15s; font-family: inherit;
}
.btn-primary:hover { background: #2563eb; }
.btn-secondary {
  display: flex; align-items: center; gap: 6px;
  background: transparent; color: #94a3b8;
  border: 1px solid #2d3748; border-radius: 8px;
  padding: 9px 16px; font-size: 13px; font-weight: 600;
  cursor: pointer; transition: all 0.15s; font-family: inherit;
}
.btn-secondary:hover { border-color: #3b82f6; color: #e2e8f0; }

/* Tabs */
.tabs-row {
  display: inline-flex;
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 10px;
  padding: 4px;
  gap: 4px;
  margin-bottom: 24px;
}
.tab-btn {
  padding: 8px 24px;
  background: transparent;
  border: none;
  border-radius: 7px;
  color: #64748b;
  font-size: 13.5px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.tab-btn:hover { color: #94a3b8; }
.tab-btn.active {
  background: #1e2535;
  color: #f1f5f9;
  font-weight: 600;
}

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;
}
.stat-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.stat-info { display: flex; flex-direction: column; gap: 6px; }
.stat-label { font-size: 12px; color: #64748b; font-weight: 500; }
.stat-value { font-size: 28px; font-weight: 700; color: #f1f5f9; line-height: 1; }
.stat-icon {
  width: 48px; height: 48px; border-radius: 12px;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.stat-icon.blue    { background: #1e3a5f33; color: #3b82f6; border: 1.5px solid #3b82f644; }
.stat-icon.orange  { background: #7c2d1233; color: #f97316; border: 1.5px solid #f9731644; }
.stat-icon.red     { background: #7f1d1d33; color: #ef4444; border: 1.5px solid #ef444444; }

/* Filter Bar */
.filter-bar {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  padding: 14px 18px;
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 20px;
}
.filter-select {
  background: #0f1117;
  border: 1px solid #1e2535;
  border-radius: 8px;
  padding: 8px 32px 8px 12px;
  font-size: 13px;
  color: #e2e8f0;
  outline: none;
  cursor: pointer;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 10px center;
  font-family: inherit;
  min-width: 140px;
}
.filter-select:focus { border-color: #3b82f6; }
.search-wrap { position: relative; flex: 1; }
.search-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #475569; }
.search-input {
  width: 100%; background: #0f1117; border: 1px solid #1e2535;
  border-radius: 8px; padding: 8px 12px 8px 34px;
  font-size: 13px; color: #e2e8f0; outline: none;
  transition: border-color 0.15s; box-sizing: border-box; font-family: inherit;
}
.search-input::placeholder { color: #475569; }
.search-input:focus { border-color: #3b82f6; }

/* Inventory Card */
.inventory-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  overflow: hidden;
  padding: 20px;
}
.card-title {
  font-size: 14px;
  font-weight: 600;
  color: #f1f5f9;
  padding: 18px 22px 14px;
  margin: 0;
}

/* Table */
.inv-table-header {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 2fr 1fr;
  padding: 10px 22px;
  background: #12161f;
  border-bottom: 1px solid #1e2535;
  font-size: 11.5px;
  font-weight: 600;
  color: #475569;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.inv-row {
  display: grid;
  grid-template-columns: 2fr 2fr 1fr 2fr 2fr 1fr;
  padding: 16px 22px;
  border-bottom: 1px solid #1a2030;
  align-items: center;
  transition: background 0.1s;
}
.inv-row:last-child { border-bottom: none; }
.inv-row:hover { background: #1a2030; }

.inv-field { display: flex; flex-direction: column; gap: 3px; }
.inv-label { font-size: 11px; color: #475569; font-weight: 500; }
.inv-value { font-size: 13.5px; font-weight: 600; color: #e2e8f0; }
.inv-batch { font-family: 'JetBrains Mono', 'Fira Code', monospace; font-size: 12.5px; }

.inv-location {
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: #94a3b8;
  background: #1e2535;
  border: 1px solid #2d3748;
  border-radius: 5px;
  padding: 3px 8px;
  width: fit-content;
  margin-top: 2px;
}

.inv-qty-row { display: flex; align-items: center; gap: 8px; }
.inv-qty { font-size: 14px; font-weight: 700; color: #f1f5f9; }

.stock-badge {
  display: inline-flex; align-items: center;
  padding: 3px 9px; border-radius: 5px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.3px;
}
.stock-good     { background: #14532d; color: #4ade80; border: 1px solid #166534; }
.stock-low      { background: #713f12; color: #fb923c; border: 1px solid #92400e; }
.stock-critical { background: #7f1d1d; color: #fca5a5; border: 1px solid #991b1b; }

.inv-action { display: flex; justify-content: flex-end; }
.adjust-btn {
  display: flex; align-items: center; gap: 5px;
  background: transparent; border: none;
  color: #64748b; font-size: 13px; font-weight: 500;
  cursor: pointer; padding: 6px 10px; border-radius: 6px;
  transition: all 0.15s; font-family: inherit;
}
.adjust-btn:hover { background: #1e2535; color: #e2e8f0; }

.empty-state {
  padding: 48px; text-align: center; color: #475569; font-size: 13px;
}
</style>