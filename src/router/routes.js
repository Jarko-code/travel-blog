import HomePage from '@/views/public/HomePage.vue'
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
    component: () => import('@/views/public/BlogPage.vue'),
  },
  {
    path: '/event',
    name: ROUTE_NAMES.eventPage,
    component: () => import('@/views/public/EventPage.vue'),
  },
  {
    path: '/gallery',
    name: ROUTE_NAMES.galleryPage,
    component: () => import('@/views/public/GalleryPage.vue'),
  },
  {
    path: '/contact',
    name: ROUTE_NAMES.contactPage,
    component: () => import('@/views/public/ContactPage.vue'),
  },
  {
    path: '/login',
    name: ROUTE_NAMES.loginPage,
    component: () => import('@/views/public/LoginPage.vue'),
  },
  {
    path: '/admin',
    name: ROUTE_NAMES.adminPage,
    meta: { requiresAuth: true },
    component: () => import('@/views/AdminPage.vue'),
    children: [
      {
        path: 'dashboard',
        name: ROUTE_NAMES.dashboardPage,
        component: () => import('@/views/dashboard/DashboardPage.vue'),
      },
      {
        path: 'articles',
        name: ROUTE_NAMES.articlesPage,
        component: () => import('@/views/articles/ArticlesPage.vue'),
      },
      {
        path: 'events',
        name: ROUTE_NAMES.eventsPage,
        component: () => import('@/views/events/EventsPage.vue'),
      },
      {
        path: 'tags',
        name: ROUTE_NAMES.tagsPage,
        component: () => import('@/views/tags/TagsPage.vue'),
      },
      {
        path: 'categories',
        name: ROUTE_NAMES.categoriesPage,
        component: () => import('@/views/categories/CategoriesPage.vue'),
      },
      {
        path: 'users',
        name: ROUTE_NAMES.usersPage,
        component: () => import('@/views/users/UsersPage.vue'),
      },
      {
        path: 'users/:id',
        name: ROUTE_NAMES.userDetail,
        component: () => import('@/views/users/UserDetailPage.vue'),
      },
      {
        path: 'users/new-user',
        name: ROUTE_NAMES.newUser,
        component: () => import('@/views/users/NewUserPage.vue'),
      },
      {
        path: 'images',
        name: ROUTE_NAMES.imagesPage,
        component: () => import('@/views/images/ImagesPage.vue'),
      },
      {
        path: 'subscriptions',
        name: ROUTE_NAMES.subscriptionsPage,
        component: () => import('@/views/subscriptions/SubscriptionsPage.vue'),
      },
      {
        path: 'subscriptions/new-email-post',
        name: ROUTE_NAMES.newEmailPost,
        component: () => import('@/views/subscriptions/NewEmailPostPage.vue'),
      },
      {
        path: 'settings',
        name: ROUTE_NAMES.settingsPage,
        component: () => import('@/views/settings/SettingsPage.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: ROUTE_NAMES.notFoundCms,
        component: () => import('@/views/NotFoundPage.vue'),
      },
    ],
  },
]

export default routes
