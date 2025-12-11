import { defineStore } from 'pinia'
import { ammunitionsDb } from '~/lib/mockdb'
import type { Ammunition } from '~/lib/models/Ammunition'

export const useAmmunitionStore = defineStore('ammunition', {
    state: () => ({
        selectedAmmunition: null as Ammunition | null,
        ammunitions: [] as Ammunition[],
    }),
    actions: {
        setSelectedAmmunition(ammunition: Ammunition) {
            this.selectedAmmunition = ammunition
        },
        getById(id: string) {
            return this.ammunitions.find(k => k.id === id) || null
        },

        getMockById(id: string) {
            return ammunitionsDb.find(k => k.id === id)
        }
    }
})
