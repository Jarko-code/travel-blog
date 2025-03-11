<template>
  <Toast />
  <Hero>
    <template #subscription>
      <Subscription />
    </template>
  </Hero>
  <div class="px-[100px]">
    <RouterView />
  </div>
</template>

<script setup>
//imports
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'

//constans and variables
const route = useRoute()
const router = useRouter()

// functions
const setDocumentTitle = (newTitle) => (document.title = newTitle)

watch(
  () => route.name,
  async (newRoute) => {
    await router.isReady()

    const routeTitles = {
      [ROUTE_NAMES.homePage]: 'Home',
      [ROUTE_NAMES.blogPage]: 'Blog',
      [ROUTE_NAMES.eventsPage]: 'Events',
      [ROUTE_NAMES.galleryPage]: 'Gallery',
      [ROUTE_NAMES.contactPage]: 'Contact',
      [ROUTE_NAMES.loginPage]: 'Login',
    }

    if (newRoute in routeTitles) {
      setDocumentTitle(routeTitles[newRoute])
    }
  },
  { immediate: true },
)
</script>

<style lang="scss"></style>
