<template>
  <RouterLink to="/">Home</RouterLink>
  <RouterLink to="/about">About</RouterLink>

  <RouterView />
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
  [route],
  async () => {
    await router.isReady()
    if (route.name === ROUTE_NAMES.homePage) {
      setDocumentTitle(`Home`)
    }
    if (route.name === ROUTE_NAMES.aboutPage) {
      setDocumentTitle(`About`)
    }
  },
  { immediate: true, deep: true },
)
</script>

<style lang="scss"></style>
