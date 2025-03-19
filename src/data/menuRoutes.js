import { ROUTE_NAMES } from '@/router/routeNames'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

export const useMenuRoutes = () => {
  const { t } = useI18n({ useScope: 'global' })

  const MENU_ROUTES = computed(() => [
    {
      label: t('admin.documentTitle.dashboard'),
      icon: 'pi pi-home',
      route: { name: ROUTE_NAMES.dashboardPage },
    },
    {
      label: t('admin.documentTitle.articles'),
      icon: 'pi pi-book',
      route: { name: ROUTE_NAMES.articlesPage },
    },
    {
      label: t('admin.documentTitle.events'),
      icon: 'pi pi-calendar',
      route: { name: ROUTE_NAMES.eventsPage },
    },
    {
      label: t('admin.documentTitle.tags'),
      icon: 'pi pi-tag',
      route: { name: ROUTE_NAMES.tagsPage },
    },
    {
      label: t('admin.documentTitle.categories'),
      icon: 'pi pi-th-large',
      route: { name: ROUTE_NAMES.categoriesPage },
    },
    {
      label: t('admin.documentTitle.users'),
      icon: 'pi pi-users',
      route: { name: ROUTE_NAMES.usersPage },
    },
    {
      label: t('admin.documentTitle.images'),
      icon: 'pi pi-image',
      route: { name: ROUTE_NAMES.imagesPage },
    },
    {
      label: t('admin.documentTitle.subscribers'),
      icon: 'pi pi-envelope',
      route: { name: ROUTE_NAMES.subscriptionsPage },
    },
    {
      label: t('admin.documentTitle.settingsAndProfile'),
      icon: 'pi pi-cog',
      route: { name: ROUTE_NAMES.settingsPage },
    },
  ])

  return {
    MENU_ROUTES,
  }
}
