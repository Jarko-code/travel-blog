import { defineStore } from 'pinia'
import { fetchApi } from '@/composables/fetchApi'
import { USERS } from '@/data/api/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    user: {},
  }),
  actions: {
    async getAllUsers() {
      try {
        const response = await fetchApi.get(USERS)
        if (!response) {
          throw new Error('Failed to fetch users')
        }
        this.users = response
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    },

    async getUser(id) {
      try {
        const response = await fetchApi.get(`${USERS}/${id}`)
        if (!response) {
          throw new Error('Failed to fetch user')
        }
        this.user = response
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },

    async getUser(id) {
      try {
        const response = await fetchApi.put(`${USERS}/${id}`)
        if (!response) {
          throw new Error('Failed to update user')
        }
        this.user = response
      } catch (error) {
        console.error('Error to update user:', error)
      }
    },

    async removeUser(id) {
      try {
        await fetchApi.delete(`${USERS}/${id}`)
        // Filter out the removed user
        this.users = this.users.filter((user) => user._id !== id)
      } catch (error) {
        console.error('Error removing user:', error)
      }
    },
  },
  getters: {
    allUsers: (state) => state.users,
  },
})
