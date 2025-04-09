import HomePage from '@/views/FrontPages/HomePage.vue'
import { ROUTE_NAMES } from '@/router/routeNames'

const routes = [
  {
    path: '/',
    name: ROUTE_NAMES.homePage,
    component: HomePage,
  },
  {
    path: '/blog',
    name: ROUTE_NAMES.blogPage,
    component: () => import('@/views/FrontPages/BlogPage.vue'),
  },
  {
    path: '/event',
    name: ROUTE_NAMES.eventPage,
    component: () => import('@/views/FrontPages/EventPage.vue'),
  },
  {
    path: '/gallery',
    name: ROUTE_NAMES.galleryPage,
    component: () => import('@/views/FrontPages/GalleryPage.vue'),
  },
  {
    path: '/contact',
    name: ROUTE_NAMES.contactPage,
    component: () => import('@/views/FrontPages/ContactPage.vue'),
  },
  {
    path: '/login',
    name: ROUTE_NAMES.loginPage,
    component: () => import('@/views/FrontPages/LoginPage.vue'),
  },
  {
    path: '/admin',
    name: ROUTE_NAMES.adminPage,
    meta: { requiresAuth: true },
    component: () => import('@/views/BackPages/AdminPage.vue'),
    children: [
      {
        path: 'dashboard',
        name: ROUTE_NAMES.dashboardPage,
        component: () => import('@/views/BackPages/DashboardPage.vue'),
      },
      {
        path: 'articles',
        name: ROUTE_NAMES.articlesPage,
        component: () => import('@/views/BackPages/ArticlesPage.vue'),
      },
      {
        path: 'events',
        name: ROUTE_NAMES.eventsPage,
        component: () => import('@/views/BackPages/EventsPage.vue'),
      },
      {
        path: 'tags',
        name: ROUTE_NAMES.tagsPage,
        component: () => import('@/views/BackPages/TagsPage.vue'),
      },
      {
        path: 'categories',
        name: ROUTE_NAMES.categoriesPage,
        component: () => import('@/views/BackPages/CategoriesPage.vue'),
      },
      {
        path: 'users',
        name: ROUTE_NAMES.usersPage,
        component: () => import('@/views/BackPages/UsersPage.vue'),
      },
      {
        path: 'images',
        name: ROUTE_NAMES.imagesPage,
        component: () => import('@/views/BackPages/ImagesPage.vue'),
      },
      {
        path: 'subscriptions',
        name: ROUTE_NAMES.subscriptionsPage,
        component: () => import('@/views/BackPages/SubscriptionsPage.vue'),
      },
      {
        path: 'subscriptions/new-email-post',
        name: ROUTE_NAMES.newEmailPost,
        component: () => import('@/views/BackPages/NewEmailPostPage.vue'),
      },
      {
        path: 'settings',
        name: ROUTE_NAMES.settingsPage,
        component: () => import('@/views/BackPages/SettingsPage.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: ROUTE_NAMES.notFoundCms,
        component: () => import('@/views/BackPages/NotFoundPage.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAMES.notFoundPublic,
    component: () => import('@/views/FrontPages/NotFoundPublicPage.vue'),
  },
]

export default routes
