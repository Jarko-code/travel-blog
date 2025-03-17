import { defineStore } from 'pinia'
import router from '@/router'
import { LOGIN, LOGOUT } from '@/data/api/auth'
import { fetchApi } from '@/composables/fetchApi'
import { useAlertStore } from '@/stores/alertStore'
import { ROUTE_NAMES } from '@/router/routeNames'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    // initialize state from local storage to enable user to stay logged in
    user: JSON.parse(localStorage.getItem('user')),
    loading: false,
  }),
  actions: {
    async login(email, password) {
      try {
        const user = await fetchApi.post(LOGIN, {
          email,
          password,
        })
        // update pinia state
        this.user = user

        // store user details and jwt in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user))

        router.push({ name: ROUTE_NAMES.dashboardPage })
      } catch (error) {
        const alert = useAlertStore()
        alert.error(`Internal server error ${error}`)
      }
    },

    logout() {
      fetchApi.post(LOGOUT)
      localStorage.removeItem('user')
      router.push({ name: ROUTE_NAMES.loginPage })
    },
  },
})
