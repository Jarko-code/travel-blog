<template>
    <div
      v-if="route.meta.requiresAuth !== true"
      class="bg-[url('../assets/images/bg.jpg')] h-screen bg-cover bg-black/30 bg-blend-overlay text-white flex flex-col items-start"
    >
      <Navigation />
       <div
        id="header-subscription"
        class="my-auto"
        v-if="route.name === ROUTE_NAMES.homePage"
       >
        <slot name="header"></slot>
        <slot name="subscription"></slot>
       </div>
    </div>
</template>

<script setup>
import { useRoute} from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames';
const route = useRoute()
</script>

<style lang="scss"></style>
