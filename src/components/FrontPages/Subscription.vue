<template>
    <p>Subscribe and get the latest information's about our activities.</p>

    <form @submit.prevent="sendSubscribeForm">
      <div id="text-inputs">
        <InputText type="text" v-model="firstName" placeholder="First name" />
        <InputText type="text" v-model="firstName" placeholder="Email" />
      </div>
      <div id="subscription-bottom">
        <Checkbox v-model="checked" binary />
        <span>
          I consent to my personal information being processed in accordance with The Broke Backpacker’s <span>Privacy Policy</span>
        </span>
        <Button label="Subscribe" />
      </div>
    </form>

</template>

<script setup></script>
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
<style lang="scss"></style>
