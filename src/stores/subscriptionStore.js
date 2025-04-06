import { defineStore } from 'pinia'
import { fetchApi } from '@/composables/fetchApi'
import { SUBSCRIPTION } from '@/data/api/subscription'

export const useSubscriptionStore = defineStore('subscription', {
  state: () => ({
    subscriptions: [],
  }),
  actions: {
    async getAllSubscriptions() {
      try {
        const response = await fetchApi.get(SUBSCRIPTION)
        if (!response) {
          throw new Error('Failed to fetch subscriptions')
        }
        this.subscriptions = response
      } catch (error) {
        console.error('Error fetching subscriptions:', error)
      }
    },

    async removeSubscription(id) {
      try {
        await fetchApi.delete(`${SUBSCRIPTION}/${id}`)
        // Filter out the removed subscription
        this.subscriptions = this.subscriptions.filter((subscription) => subscription._id !== id)
      } catch (error) {
        console.error('Error removing subscription:', error)
      }
    },
  },
  getters: {
    allSubscriptions: (state) => state.subscriptions,
  },
})
