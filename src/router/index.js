import { createRouter, createWebHistory } from 'vue-router'
import routes from '@/router/routes'
import { useAuthStore } from '@/stores/authStore'
import { ROUTE_NAMES } from '@/router/routeNames'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  //Scroll to top
  scrollBehavior(to, from, SavedPosition) {
    if (to.hash) {
      const el = window.location.href.split('#')[1]
      if (el.length) {
        document.getElementById(el).scrollIntoView({ behavior: 'smooth' })
      }
    } else if (SavedPosition) {
      return SavedPosition
    } else {
      document.getElementById('app').scrollIntoView({ behavior: 'smooth' })
    }
  },
})

router.beforeEach((to) => {
  //navigations guards
  const publicPage = ['/login', '/']
  const authRequired = !publicPage.includes(to.path)
  const authStore = useAuthStore()

  if (to.meta.requiresAuth) {
    if (!authStore.user && authRequired) {
      return { name: ROUTE_NAMES.loginPage }
    }
  }
  if (to.meta.guest) {
    if (authStore.user && publicPage) {
      return { name: ROUTE_NAMES.dashboardPage }
    }
  }
})

export default router
