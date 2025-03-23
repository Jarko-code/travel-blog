<template>
  <div class="pl-[100px]">{{ props.mainTitle }}</div>
  <div class="pl-[100px]">{{ props.secondaryTitle }}</div>
</template>

<script setup>
  const props = defineProps({
    mainTitle: {
        type: String,
        default: "This is generic main header text"
    },
    secondaryTitle: {
        type: String,
        default: "This is generic secondary header text"
    }
  })
</script>
<style lang="scss"></style>
