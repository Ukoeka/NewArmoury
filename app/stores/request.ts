import { defineStore } from 'pinia'
import { ammunitionsDb } from '~/lib/mockdb'
import type { Ammunition } from '~/lib/models/Ammunition'
import type { Request } from '~/lib/models/Request'

export const useRequestStore = defineStore('request-assets', {
    state: () => ({
        selectedRequest: null as Request | null,
        request: [] as Request[],
    }),
    actions: {
        setSelectedRequest(request: Request) {
            this.selectedRequest = request
        },
        getById(id: string) {
            return this.request.find(k => k.id === id) || null
        },

        getMockById(id: string) {
            return ammunitionsDb.find(k => k.id === id)
        }
    }
})
