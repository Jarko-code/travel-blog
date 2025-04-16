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
        if (error.status) {
          if (error.status === 400) {
            alert.error('Invalid Request', 'Please check your input and try again')
          } else if (error.status === 401) {
            alert.error('Unauthorized', 'Incorrect email or password')
          } else if (error.status === 403) {
            alert.error('Disabled', 'Account is disabled')
          } else {
            alert.error('Login failed', 'Unexpected error occurred')
          }
        } else {
          alert.error('Login failed', 'Network error or server is unreachable')
        }
      }
    },

    logout() {
      fetchApi.post(LOGOUT)
      localStorage.removeItem('user')
      router.push({ name: ROUTE_NAMES.loginPage })
    },
  },
})
