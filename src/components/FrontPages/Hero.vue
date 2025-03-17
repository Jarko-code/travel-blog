<template>
  <div
    v-if="route.meta.requiresAuth !== true"
    class="bg-[url('../assets/images/bg.jpg')] h-screen bg-cover bg-black/30 bg-blend-overlay text-white"
  >
    <Navigation />
    <slot name="subscription"></slot>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'

const route = useRoute()
const router = useRouter()
</script>

<style lang="scss"></style>
