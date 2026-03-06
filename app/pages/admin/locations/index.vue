<template>
  <div class="use-locations">

    <!-- Page Header -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Use Locations</h1>
        <p class="page-subtitle">Manage in-office and out-of-office locations for firearm deployment</p>
      </div>
      <button class="add-btn">
        <Plus :size="15" />
        Add Location
      </button>
    </div>

    <!-- Search -->
    <div class="search-card">
      <div class="search-wrap">
        <Search :size="15" class="search-icon" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by category or area..."
          class="search-input"
        />
        <SlidersHorizontal :size="15" class="search-filter-icon" />
      </div>
    </div>

    <!-- Stats Cards -->
    <div class="stats-row">
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Total Locations</span>
          <span class="stat-value">{{ totalLocations }}</span>
        </div>
        <div class="stat-icon blue">
          <MapPin :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">In-Office</span>
          <span class="stat-value">{{ inOfficeCount }}</span>
        </div>
        <div class="stat-icon green">
          <MapPin :size="22" />
        </div>
      </div>
      <div class="stat-card">
        <div class="stat-info">
          <span class="stat-label">Out-of-Office</span>
          <span class="stat-value">{{ outOfOfficeCount }}</span>
        </div>
        <div class="stat-icon orange">
          <MapPin :size="22" />
        </div>
      </div>
    </div>

    <!-- Filter Tabs -->
    <div class="filter-tabs">
      <button
        v-for="tab in filterTabs"
        :key="tab.id"
        class="filter-tab"
        :class="{ active: activeFilter === tab.id }"
        @click="activeFilter = tab.id"
      >
        <MapPin :size="13" />
        {{ tab.label }}
      </button>
    </div>

    <!-- Locations List -->
    <div class="locations-card">
      <div
        v-for="(loc, index) in filteredLocations"
        :key="loc.id"
        class="location-row"
        :class="{ 'no-border': index === filteredLocations.length - 1 }"
      >
        <div class="location-info">
          <div class="location-title-row">
            <span class="location-name">{{ loc.branch }}</span>
            <span class="location-area">{{ loc.area }}</span>
          </div>
          <span class="location-date">Added {{ loc.addedDate }}</span>
        </div>
        <div class="location-actions">
          <button class="loc-action-btn edit" title="Edit">
            <PenSquare :size="15" />
          </button>
          <button class="loc-action-btn delete" title="Delete">
            <XCircle :size="16" />
          </button>
        </div>
      </div>

      <div v-if="filteredLocations.length === 0" class="empty-state">
        No locations found.
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin-layout',
})
import { ref, computed } from 'vue'
import { Plus, Search, MapPin, SlidersHorizontal, PenSquare, XCircle } from 'lucide-vue-next'

interface Location {
  id: number
  branch: string
  area: string
  addedDate: string
  type: 'in-office' | 'out-of-office'
}

const searchQuery = ref('')
const activeFilter = ref('in-office')

const filterTabs = [
  { id: 'in-office', label: 'In-Office (3)' },
  { id: 'out-of-office', label: 'Out-of-Office (2)' },
]

const locations = ref<Location[]>([
  { id: 1, branch: 'Dar es Salaam Sub-HQ', area: 'Main Entrance', addedDate: '1/1/2024', type: 'in-office' },
  { id: 2, branch: 'Dar es Salaam Sub-HQ', area: 'Server Room', addedDate: '1/1/2024', type: 'in-office' },
  { id: 3, branch: 'Dodoma HQ', area: 'Executive Wing', addedDate: '1/1/2024', type: 'in-office' },
  { id: 4, branch: 'Zanzibar Sub-HQ', area: 'Field Post A', addedDate: '1/1/2024', type: 'out-of-office' },
  { id: 5, branch: 'Mwanza Branch', area: 'Patrol Zone 3', addedDate: '1/1/2024', type: 'out-of-office' },
])

const filteredLocations = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return locations.value.filter(loc => {
    const matchType = loc.type === activeFilter.value
    const matchSearch = !q || loc.branch.toLowerCase().includes(q) || loc.area.toLowerCase().includes(q)
    return matchType && matchSearch
  })
})

const totalLocations = computed(() => locations.value.length)
const inOfficeCount = computed(() => locations.value.filter(l => l.type === 'in-office').length)
const outOfOfficeCount = computed(() => locations.value.filter(l => l.type === 'out-of-office').length)
</script>

<style scoped>
.use-locations {
  padding: 24px 32px;
  background: #0f1117;
  min-height: 100vh;
  font-family: 'DM Sans', 'IBM Plex Sans', sans-serif;
  color: #e2e8f0;
}

/* Header */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 20px;
}
.page-title {
  font-size: 22px;
  font-weight: 700;
  color: #f1f5f9;
  letter-spacing: -0.3px;
  margin: 0 0 4px;
}
.page-subtitle {
  font-size: 13px;
  color: #64748b;
  margin: 0;
}
.add-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 9px 16px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
  white-space: nowrap;
}
.add-btn:hover { background: #2563eb; }

/* Search */
.search-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  padding: 14px 18px;
  margin-bottom: 20px;
}
.search-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}
.search-icon { color: #475569; flex-shrink: 0; }
.search-filter-icon { color: #475569; flex-shrink: 0; margin-left: auto; cursor: pointer; }
.search-filter-icon:hover { color: #94a3b8; }
.search-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-size: 13.5px;
  color: #e2e8f0;
  font-family: inherit;
}
.search-input::placeholder { color: #475569; }

/* Stats */
.stats-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 24px;
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
.stat-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.stat-label {
  font-size: 12px;
  color: #64748b;
  font-weight: 500;
}
.stat-value {
  font-size: 28px;
  font-weight: 700;
  color: #f1f5f9;
  line-height: 1;
}
.stat-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.stat-icon.blue {
  background: #1e3a5f;
  color: #3b82f6;
  border: 1.5px solid #2563eb44;
}
.stat-icon.green {
  background: #14532d33;
  color: #22c55e;
  border: 1.5px solid #16a34a44;
}
.stat-icon.orange {
  background: #7c2d1233;
  color: #f97316;
  border: 1.5px solid #ea580c44;
}

/* Filter Tabs */
.filter-tabs {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
.filter-tab {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 8px 16px;
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 8px;
  color: #64748b;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s;
  font-family: inherit;
}
.filter-tab:hover {
  color: #94a3b8;
  border-color: #2d3748;
}
.filter-tab.active {
  background: #1e2535;
  border-color: #3b82f6;
  color: #e2e8f0;
}

/* Locations Card */
.locations-card {
  background: #161b27;
  border: 1px solid #1e2535;
  border-radius: 12px;
  overflow: hidden;
}
.location-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 24px;
  border-bottom: 1px solid #1e2535;
  transition: background 0.12s;
}
.location-row:hover { background: #1a2030; }
.location-row.no-border { border-bottom: none; }

.location-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}
.location-title-row {
  display: flex;
  align-items: center;
  gap: 12px;
}
.location-name {
  font-size: 14.5px;
  font-weight: 700;
  color: #f1f5f9;
}
.location-area {
  font-size: 13px;
  color: #64748b;
  font-weight: 400;
}
.location-date {
  font-size: 12px;
  color: #475569;
}

.location-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
.loc-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  padding: 6px;
  cursor: pointer;
  transition: all 0.15s;
}
.loc-action-btn.edit {
  color: #64748b;
}
.loc-action-btn.edit:hover {
  color: #94a3b8;
  background: #1e2535;
}
.loc-action-btn.delete {
  color: #ef4444;
}
.loc-action-btn.delete:hover {
  color: #f87171;
  background: #7f1d1d22;
}

.empty-state {
  padding: 40px;
  text-align: center;
  color: #475569;
  font-size: 13px;
}
</style>