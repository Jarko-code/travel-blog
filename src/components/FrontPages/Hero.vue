<template>
  <div>
    <div
      v-if="route.meta.requiresAuth !== true"
      class="bg-[url('../assets/images/bg.jpg')] h-screen bg-cover bg-black/30 bg-blend-overlay text-white"
    >
      <Navigation />
       <div
        v-if="route.name === '/'"
       >
        <slot name="header"></slot>
        <slot name="subscription"></slot>
       </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute} from 'vue-router'

const route = useRoute()
</script>

<style lang="scss"></style>
