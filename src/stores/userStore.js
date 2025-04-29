import { defineStore } from 'pinia'
import { fetchApi } from '@/composables/fetchApi'
import { USERS, NEW_USER } from '@/data/api/users'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    user: {
      personalNumber: '',
      name: '',
      surname: '',
      position: '',
      phoneNumber: '',
      email: '',
      role: '',
      accountStatus: '',
      profilePicture: '',
      description: '',
      address: {
        street: '',
        city: '',
        postcode: '',
      },
    },
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
        if (!response || !response.user) {
          throw new Error('Failed to fetch user')
        }

        this.user = {
          ...this.user, // default štruktúra zo state
          ...response.user, // reálne dáta z API
          address: {
            ...this.user.address,
            ...response.user.address,
          },
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      }
    },

    async updateUser(id, updatedData) {
      try {
        const response = await fetchApi.put(`${USERS}/${id}`, updatedData)
        if (!response || !response.user) {
          throw new Error('Failed to update user')
        }

        this.user = response.user

        const index = this.users.findIndex((u) => u._id === id)
        if (index !== -1) {
          this.users[index] = response.user
        }
      } catch (error) {
        console.error('Error updating user:', error)
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

    async addNewUser(newUserData) {
      try {
        const response = await fetchApi.post(NEW_USER, newUserData)

        const createdUser = response?.user || response

        if (!createdUser || !createdUser._id) {
          throw new Error('User ID is missing in response')
        }

        this.users.push(createdUser)
        return createdUser
      } catch (error) {
        console.error('Error adding user:', error)
        throw error
      }
    },
  },
  getters: {
    allUsers: (state) => state.users,
  },
})
