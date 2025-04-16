import { defineStore } from 'pinia'
import { fetchApi } from '@/composables/fetchApi'
import { SUBSCRIPTION } from '@/data/api/subscription'
import { useAlertStore } from '@/stores/alertStore'

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
  async subscribe(email, firstName, checked) {
    const alert = useAlertStore()

    if (!checked) {
      alert.error('Consent Required', 'You must agree to the privacy policy.')
      return { success: false }
    }

    try {
      await fetchApi.post(SUBSCRIPTION, {
        email,
        firstName,
      })

      alert.success('Subscribed!', 'You’ve successfully subscribed.')
      return { success: true }

    } catch (error) {
      if (error.response) {
        const { status } = error.response

        if (status === 400) {
          alert.error('Invalid Input', 'Please double-check the fields.')
        } else if (status === 409) {
          alert.error('Already Subscribed', 'This email is already on our list.')
        } else {
          alert.error('Error', 'Subscription failed. Try again later.')
        }
      } else {
        alert.error('Network Error', 'Server unreachable or offline.')
      }

      return { success: false }
    }
  },
  getters: {
    allSubscriptions: (state) => state.subscriptions,
  },
})
