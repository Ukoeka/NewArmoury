import { defineStore } from 'pinia'
import { firearmDb } from '~/lib/mockdb'
import type { Firearm } from '~/lib/models/Firearm'

export const useFirearmStore = defineStore('firearm', {
    state: () => ({
        selectedFirearm: null as Firearm | null,
        firearms: [] as Firearm[],
    }),
    actions: {
        setSelectedFirearm(firearm: Firearm) {
            this.selectedFirearm = firearm
        },
        getById(id: string) {
            return this.firearms.find(k => k.id === id) || null
        },

        getMockById(id: string) {
            return firearmDb.find(k => k.id === id)
        }
    }
})
