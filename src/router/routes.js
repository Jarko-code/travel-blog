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
    path: '/blog',
    name: ROUTE_NAMES.blogPage,
    component: () => import(/* webpackChunkName: "Blog Page" */ '@/views/FrontPages/BlogPage.vue'),
  },
  {
    path: '/events',
    name: ROUTE_NAMES.eventsPage,
    component: () =>
      import(/* webpackChunkName: "Events Page" */ '@/views/FrontPages/EventsPage.vue'),
  },
  {
    path: '/gallery',
    name: ROUTE_NAMES.galleryPage,
    component: () =>
      import(/* webpackChunkName: "Gallery Page" */ '@/views/FrontPages/GalleryPage.vue'),
  },
  {
    path: '/contact',
    name: ROUTE_NAMES.contactPage,
    component: () =>
      import(/* webpackChunkName: "Contact Page" */ '@/views/FrontPages/ContactPage.vue'),
  },
  {
    path: '/login',
    name: ROUTE_NAMES.loginPage,
    component: () =>
      import(/* webpackChunkName: "Login Page" */ '@/views/FrontPages/LoginPage.vue'),
  },
]

export default routes
