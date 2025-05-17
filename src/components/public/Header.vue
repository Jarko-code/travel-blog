<template>
  <div class="leading-none">
    <div v-if="props.secondaryTitle" class="font-semibold text-[1.125rem] mb-12">
      {{ props.secondaryTitle }}
    </div>
    <div v-if="props.mainTitle" class="font-bold text-[2.5rem]">
      {{ t(props.mainTitle) }}
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  mainTitle: {
    type: String,
  },
  secondaryTitle: {
    type: String,
  },
})
</script>
<style lang="scss"></style>
