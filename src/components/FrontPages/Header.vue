<template>
  <div class="pl-[100px]">{{ props.title }}</div>
</template>

<script setup>
  const props = defineProps({
    title: {
      type: String,
      default: "This is generic header component"
    }
  })
</script>
<style lang="scss"></style>
