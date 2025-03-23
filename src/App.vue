<template>
  <Toast />
  <Hero>
    <template #header>
      <Header
        mainTitle="Get a membership and explore the world"
        secondaryTitle="Subscribe and get the latest information's about our activities."
      />
    </template>
    <template #subscription>
      <Subscription />
    </template>
  </Hero>
  <div :class="route.meta.requiresAuth ? '' : 'px-[100px]'">
    <RouterView />
  </div>
</template>

<script setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'

// Constants and variables
const route = useRoute()
const router = useRouter()
const { t, locale } = useI18n()

// Helper function to update document title
const updateDocumentTitle = () => {
  const titles = {
    [ROUTE_NAMES.homePage]: 'Home',
    [ROUTE_NAMES.blogPage]: 'Blog',
    [ROUTE_NAMES.eventPage]: 'Events',
    [ROUTE_NAMES.galleryPage]: 'Gallery',
    [ROUTE_NAMES.contactPage]: 'Contact',
    [ROUTE_NAMES.loginPage]: 'Login',
    [ROUTE_NAMES.dashboardPage]: `Admin | ${t('admin.documentTitle.dashboard')}`,
    [ROUTE_NAMES.articlesPage]: `Admin | ${t('admin.documentTitle.articles')}`,
    [ROUTE_NAMES.eventsPage]: `Admin | ${t('admin.documentTitle.events')}`,
    [ROUTE_NAMES.tagsPage]: `Admin | ${t('admin.documentTitle.tags')}`,
    [ROUTE_NAMES.categoriesPage]: `Admin | ${t('admin.documentTitle.categories')}`,
    [ROUTE_NAMES.usersPage]: `Admin | ${t('admin.documentTitle.users')}`,
    [ROUTE_NAMES.imagesPage]: `Admin | ${t('admin.documentTitle.images')}`,
    [ROUTE_NAMES.subscriptionsPage]: `Admin | ${t('admin.documentTitle.subscribers')}`,
    [ROUTE_NAMES.settingsPage]: `Admin | ${t('admin.documentTitle.settingsAndProfile')}`,
  }

  if (titles[route.name]) {
    document.title = `${titles[route.name]}`
  }
}

// Watch for changes in locale or route and update the title
watch(
  [locale, route],
  async () => {
    await router.isReady()
    updateDocumentTitle()
  },
  { immediate: true, deep: true },
)
</script>
