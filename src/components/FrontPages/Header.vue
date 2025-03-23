<template>
  <div class="leading-none">
    <div class="pl-[100px] font-semibold text-[1.125rem] mb-12">{{ props.secondaryTitle }}</div>
    <div class="pl-[100px] font-bold text-[2.5rem]">{{ props.mainTitle }}</div>
  </div>
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
