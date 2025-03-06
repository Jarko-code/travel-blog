import HomePage from '@/views/FrontPages/HomePage.vue'
import { ROUTE_NAMES } from '@/router/routeNames'

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.homePage,
    component: HomePage,
    //redirect: { name: ROUTE_NAMES.loginPage },
  },
  {
    path: '/about',
    name: ROUTE_NAMES.aboutPage,
    component: () =>
      import(/* webpackChunkName: "About Page" */ '@/views/FrontPages/AboutPage.vue'),
  },
]

export default routes
