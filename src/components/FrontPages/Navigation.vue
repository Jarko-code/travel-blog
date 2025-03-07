<template>
  <div class="py-5 px-[100px] text-white flex items-center justify-between">
    <RouterLink exact-active-class="active" :to="ROUTE_NAMES.homePage">
      <div class="flex items-center">
        <img src="../../assets/images/logo.svg" alt="Backpack logo" title="Backpack logo" />
        <h2 class="text-4xl ml-4">Travel</h2>
      </div>
    </RouterLink>
    <div>
      <RouterLink class="px-2.5" :to="ROUTE_NAMES.homePage">Home</RouterLink>
      <RouterLink class="px-2.5" :to="ROUTE_NAMES.blogPage">Blog</RouterLink>
      <RouterLink class="px-2.5" :to="ROUTE_NAMES.eventsPage">Events</RouterLink>
      <RouterLink class="px-2.5" :to="ROUTE_NAMES.galleryPage">Gallery</RouterLink>
      <RouterLink class="px-2.5" :to="ROUTE_NAMES.contactPage">Contact</RouterLink>
      <template v-if="route.name !== ROUTE_NAMES.loginPage">
        <RouterLink class="px-2.5" :to="ROUTE_NAMES.loginPage">
          <Button label="Login" severity="danger" />
        </RouterLink>
      </template>
    </div>
    <template v-if="route.name === ROUTE_NAMES.loginPage">
      <Login />
    </template>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'

const route = useRoute()
const router = useRouter()
</script>

<style lang="scss"></style>
