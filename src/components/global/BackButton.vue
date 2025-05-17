<template>
  <Button :label="t(props.label)" :severity="props.severity" @click="router.go(-1)" />
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const props = defineProps({
  label: {
    type: String,
    default: 'Back to previous page',
  },
  severity: {
    type: String,
    default: 'danger',
  },
})
</script>

<style lang="scss" scoped></style>
