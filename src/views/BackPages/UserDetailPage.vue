<template>
  <div>User detail</div>
  {{ user.user }}
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

onMounted(async () => {
  const userId = route.params.id
  await userStore.getUser(userId)
})
</script>

<style lang="scss" scoped></style>
