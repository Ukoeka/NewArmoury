import { defineStore } from 'pinia'
import { kitDb } from '~/lib/mockdb'
import type { Kit } from '~/lib/models/Kit'

export const useKitStore = defineStore('kit', {
    state: () => ({
        selectedKit: null as Kit | null,
        kits: [] as Kit[],
    }),
    actions: {
        setSelectedKit(kit: Kit) {
            this.selectedKit = kit
        },
        getById(id: string) {
            return this.kits.find(k => k.id === id) || null
        },

        getMockById(id: string) {
            return kitDb.find(k => k.id === id)
        }
    }
})
