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
    path: '/event',
    name: ROUTE_NAMES.eventPage,
    component: () =>
      import(/* webpackChunkName: "Event Page" */ '@/views/FrontPages/EventPage.vue'),
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
  {
    path: '/admin',
    name: ROUTE_NAMES.adminPage,
    meta: { requiresAuth: true },
    component: () => import(/* webpackChunkName: "Admin Page" */ '@/views/BackPages/AdminPage.vue'),
    children: [
      {
        path: 'dashboard',
        name: ROUTE_NAMES.dashboardPage,
        component: () =>
          import(/* webpackChunkName: "Dashboard Page" */ '@/views/BackPages/DashboardPage.vue'),
      },
      {
        path: 'articles',
        name: ROUTE_NAMES.articlesPage,
        component: () =>
          import(/* webpackChunkName: "Articles Page" */ '@/views/BackPages/ArticlesPage.vue'),
      },
      {
        path: 'events',
        name: ROUTE_NAMES.eventsPage,
        component: () =>
          import(/* webpackChunkName: "Events Page" */ '@/views/BackPages/EventsPage.vue'),
      },
      {
        path: 'tags',
        name: ROUTE_NAMES.tagsPage,
        component: () =>
          import(/* webpackChunkName: "Tags Page" */ '@/views/BackPages/TagsPage.vue'),
      },
      {
        path: 'categories',
        name: ROUTE_NAMES.categoriesPage,
        component: () =>
          import(/* webpackChunkName: "Categories Page" */ '@/views/BackPages/CategoriesPage.vue'),
      },
      {
        path: 'users',
        name: ROUTE_NAMES.usersPage,
        component: () =>
          import(/* webpackChunkName: "Users Page" */ '@/views/BackPages/UsersPage.vue'),
      },
      {
        path: 'images',
        name: ROUTE_NAMES.imagesPage,
        component: () =>
          import(/* webpackChunkName: "Images Page" */ '@/views/BackPages/ImagesPage.vue'),
      },
      {
        path: 'subscriptions',
        name: ROUTE_NAMES.subscriptionsPage,
        component: () =>
          import(
            /* webpackChunkName: "Subscriptions Page" */ '@/views/BackPages/SubscriptionsPage.vue'
          ),
      },
      {
        path: 'subscriptions/new-email-post',
        name: ROUTE_NAMES.newEmailPost,
        component: () =>
          import(
            /* webpackChunkName: "Subscriptions Page" */ '@/views/BackPages/NewEmailPostPage.vue'
          ),
      },
      {
        path: 'settings',
        name: ROUTE_NAMES.settingsPage,
        component: () =>
          import(/* webpackChunkName: "Settings Page" */ '@/views/BackPages/SettingsPage.vue'),
      },
      {
        path: ':pathMatch(.*)*',
        name: ROUTE_NAMES.notFoundCms,
        component: () =>
          import(/* webpackChunkName: "Settings Page" */ '@/views/BackPages/NotFound.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: ROUTE_NAMES.notFoundPublic,
    component: () =>
      import(/* webpackChunkName: "Settings Page" */ '@/views/FrontPages/NotFoundPublic.vue'),
  },
]

export default routes
