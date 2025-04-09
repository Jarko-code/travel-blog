<template>
  <div class="relative flex w-full">
    <!-- Left Content (Navigation + Logo) -->
    <div
      class="flex-1 py-5 px-[100px] text-white flex items-center justify-between"
      :class="{ 'mr-[26%]': route.name === ROUTE_NAMES.loginPage }"
    >
      <RouterLink exact-active-class="active" :to="ROUTE_NAMES.homePage">
        <div class="flex items-center">
          <img src="../../assets/images/logo.svg" alt="Backpack logo" title="Backpack logo" />
          <h2 class="text-4xl ml-4">Travel</h2>
        </div>
      </RouterLink>
      <div>
        <RouterLink v-for="(route, index) in navLinks" :key="index" class="px-2.5" :to="route.path">
          {{ route.label }}
        </RouterLink>
        <template v-if="route.name !== ROUTE_NAMES.loginPage && !isLoggedIn">
          <RouterLink class="px-2.5" :to="ROUTE_NAMES.loginPage">
            <Button label="Login" severity="danger" />
          </RouterLink>
        </template>
        <template v-else-if="route.name !== ROUTE_NAMES.loginPage">
          <RouterLink class="px-2.5" :to="`admin/${ROUTE_NAMES.dashboardPage}`">
            <Button label="Dashboard" severity="danger" />
          </RouterLink>
        </template>
      </div>
    </div>

    <!-- Login Component -->
    <template v-if="route.name === ROUTE_NAMES.loginPage">
      <div class="h-screen w-1/4 fixed right-[100px] top-0 flex items-center px-5 bg-white/80">
        <Login />
      </div>
    </template>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isLoggedIn = computed(() => !!authStore.user) // Check if user exists

const navLinks = [
  { label: 'Home', path: ROUTE_NAMES.homePage },
  { label: 'Blog', path: ROUTE_NAMES.blogPage },
  { label: 'Events', path: ROUTE_NAMES.eventPage },
  { label: 'Gallery', path: ROUTE_NAMES.galleryPage },
  { label: 'Contact', path: ROUTE_NAMES.contactPage },
]
</script>

<style lang="scss"></style>
