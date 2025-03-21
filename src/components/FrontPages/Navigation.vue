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
        <RouterLink class="px-2.5" :to="ROUTE_NAMES.homePage">Home</RouterLink>
        <RouterLink class="px-2.5" :to="ROUTE_NAMES.blogPage">Blog</RouterLink>
        <RouterLink class="px-2.5" :to="ROUTE_NAMES.eventPage">Events</RouterLink>
        <RouterLink class="px-2.5" :to="ROUTE_NAMES.galleryPage">Gallery</RouterLink>
        <RouterLink class="px-2.5" :to="ROUTE_NAMES.contactPage">Contact</RouterLink>
        <template v-if="route.name !== ROUTE_NAMES.loginPage">
          <RouterLink class="px-2.5" :to="ROUTE_NAMES.loginPage">
            <Button label="Login" severity="danger" />
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
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'

const route = useRoute()
const router = useRouter()
</script>

<style lang="scss"></style>
