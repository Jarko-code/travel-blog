import { ROUTE_NAMES } from '@/router/routeNames'
import { ref, computed } from 'vue'

export const MENU_ROUTES = ref([
  {
    label: 'Dahsboard',
    icon: 'pi pi-home',
    route: { name: ROUTE_NAMES.dashboardPage },
    // class: route.name === ROUTE_NAMES.dashboardPage ? 'active-link' : '',
  },
  {
    label: 'Articles',
    icon: 'pi pi-book',
    route: { name: ROUTE_NAMES.articlesPage },
  },
  {
    label: 'Events',
    icon: 'pi pi-calendar',
    route: { name: ROUTE_NAMES.eventsPage },
  },
  {
    label: 'Tags',
    icon: 'pi pi-tag',
    route: { name: ROUTE_NAMES.tagsPage },
  },
  {
    label: 'Categories',
    icon: 'pi pi-th-large',
    route: { name: ROUTE_NAMES.categoriesPage },
  },
  {
    label: 'Users',
    icon: 'pi pi-users',
    route: { name: ROUTE_NAMES.usersPage },
  },
  {
    label: 'Images',
    icon: 'pi pi-image',
    route: { name: ROUTE_NAMES.imagesPage },
  },
  {
    label: 'Subscribers',
    icon: 'pi pi-envelope',
    route: { name: ROUTE_NAMES.subscriptionsPage },
  },
  {
    label: 'Settings and profile',
    icon: 'pi pi-cog',
    route: { name: ROUTE_NAMES.settingsPage },
  },
])

// export const MENU_ROUTES = computed(() => {
//   const { t } = useI18n({ useScope: 'global' })
//   return [
//     {
//       label: t('adminPage.aside.dashboard'),
//       icon: 'pi pi-fw pi-home',
//       to: { name: ROUTE_NAMES.dashboardPage },
//     },
//     {
//       label: t('adminPage.aside.news'),
//       icon: 'pi pi-fw pi-book',
//       to: { name: ROUTE_NAMES.newsPage },
//     },
//     {
//       label: t('adminPage.aside.events'),
//       icon: 'pi pi-fw pi-calendar',
//       to: { name: ROUTE_NAMES.eventsPage },
//     },
//     {
//       label: t('adminPage.aside.tasks'),
//       icon: 'pi pi-fw pi-check',
//       to: { name: ROUTE_NAMES.tasksPage },
//     },
//     {
//       label: t('adminPage.aside.notifications'),
//       icon: 'pi pi-fw pi-bell',
//       to: { name: ROUTE_NAMES.notificationsPage },
//     },
//     {
//       label: t('adminPage.aside.team'),
//       icon: 'pi pi-fw pi-users',
//       to: { name: ROUTE_NAMES.teamPage },
//     },
//   ]
// })
