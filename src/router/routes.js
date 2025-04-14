import HomePage from '@/views/FrontPages/HomePage.vue'
import { ROUTE_NAMES } from '@/router/routeNames'

const frontPages = [
  { path: '/', name: ROUTE_NAMES.homePage, component: HomePage },
  { path: '/blog', name: ROUTE_NAMES.blogPage, view: 'BlogPage' },
  { path: '/event', name: ROUTE_NAMES.eventPage, view: 'EventPage' },
  { path: '/gallery', name: ROUTE_NAMES.galleryPage, view: 'GalleryPage' },
  { path: '/contact', name: ROUTE_NAMES.contactPage, view: 'ContactPage' },
  { path: '/login', name: ROUTE_NAMES.loginPage, view: 'LoginPage' },
]

const publicRoutes = frontPages.map((route) => ({
  path: route.path,
  name: route.name,
  component: route.component || (() => import(`@/views/FrontPages/${route.view}.vue`)),
}))

const adminChildrenPages = [
  { path: 'dashboard', name: ROUTE_NAMES.dashboardPage, view: 'DashboardPage' },
  { path: 'articles', name: ROUTE_NAMES.articlesPage, view: 'ArticlesPage' },
  { path: 'events', name: ROUTE_NAMES.eventsPage, view: 'EventsPage' },
  { path: 'tags', name: ROUTE_NAMES.tagsPage, view: 'TagsPage' },
  { path: 'categories', name: ROUTE_NAMES.categoriesPage, view: 'CategoriesPage' },
  { path: 'users', name: ROUTE_NAMES.usersPage, view: 'UsersPage' },
  { path: 'users/new-user', name: ROUTE_NAMES.newUser, view: 'NewUserPage' },
  { path: 'users/:id', name: ROUTE_NAMES.userDetail, view: 'UserDetailPage' },
  { path: 'users/:id/edit', name: ROUTE_NAMES.userEdit, view: 'UserEditPage' },
  { path: 'images', name: ROUTE_NAMES.imagesPage, view: 'ImagesPage' },
  { path: 'subscriptions', name: ROUTE_NAMES.subscriptionsPage, view: 'SubscriptionsPage' },
  {
    path: 'subscriptions/new-email-post',
    name: ROUTE_NAMES.newEmailPost,
    view: 'NewEmailPostPage',
  },
  { path: 'settings', name: ROUTE_NAMES.settingsPage, view: 'SettingsPage' },
  { path: ':pathMatch(.*)*', name: ROUTE_NAMES.notFoundCms, view: 'NotFoundPage' },
]

const adminRoutes = {
  path: '/admin',
  name: ROUTE_NAMES.adminPage,
  meta: { requiresAuth: true },
  component: () => import('@/views/BackPages/AdminPage.vue'),
  children: adminChildrenPages.map((route) => ({
    path: route.path,
    name: route.name,
    component: () => import(`@/views/BackPages/${route.view}.vue`),
  })),
}

const notFoundRoutes = [
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAMES.notFoundPublic,
    component: () => import('@/views/FrontPages/NotFoundPublicPage.vue'),
  },
]

const routes = [...publicRoutes, adminRoutes, ...notFoundRoutes]

export default routes
