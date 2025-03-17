<template>
  <div>Dashboard</div>
  <div>{{ user.user.username }}</div>
  <div @click="logout">Logout</div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useAlertStore } from '@/stores/alertStore'

const authStore = useAuthStore()
const alert = useAlertStore()

const { user } = authStore

const logout = () => {
  authStore.logout()
  alert.info('Logout succesfull', 'Successfully logged out')
  authStore.user = null
}
</script>

<style lang="scss" scoped></style>
