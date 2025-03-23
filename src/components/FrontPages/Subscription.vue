<template>
    <p>Subscribe and get the latest information's about our activities.</p>

    <form @submit.prevent="sendSubscribeForm">
      <div id="text-inputs">
        <input v-model="firstName" placeholder="First name">
        <input v-model="email" placeholder="Email">
      </div>
      <div id="subscription-bottom">
        <input type="checkbox" v-model="isChecked" />
        <span>
          I consent to my personal information being processed in accordance with The Broke Backpacker’s <span>Privacy Policy</span>
        </span>
        <Button label="Subscribe" />
      </div>
    </form>

</template>

<script setup></script>
  import Button from 'primevue/button';
<style lang="scss"></style>
