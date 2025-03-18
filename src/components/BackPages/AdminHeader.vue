<template>
  <header class="header px-5 h-12 flex items-center justify-between">
    <RouterLink exact-active-class="active" :to="ROUTE_NAMES.homePage">
      <div class="flex items-center">
        <img src="../../assets/images/logo-black.svg" alt="Backpack logo" title="Backpack logo" />
        <h2 class="text-2xl ml-4 font-bold">Travel</h2>
      </div>
    </RouterLink>
    <div class="flex items-center">
      <div class="mr-4">{{ username }}</div>
      <Button
        @click="logout"
        label="Logout"
        icon="pi pi-sign-out"
        variant="text"
        severity="danger"
      />
    </div>
  </header>
</template>

<script setup>
import { ROUTE_NAMES } from '@/router/routeNames'
import { useAuthStore } from '@/stores/authStore'
import { useAlertStore } from '@/stores/alertStore'

const authStore = useAuthStore()
const alert = useAlertStore()

const {
  user: {
    user: { username },
  },
} = authStore

const logout = () => {
  authStore.logout()
  alert.info('Logout succesfull', 'Successfully logged out')
  authStore.user = null
}
</script>

<style lang="scss"></style>
