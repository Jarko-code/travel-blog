<template>
    <p class="font-bold text-[1.125rem] leading-none">Subscribe and get the latest information's about our activities.</p>

    <form @submit.prevent="sendSubscribeForm">
      <div id="text-inputs" >
        <InputText type="text" v-model="firstName" placeholder="First name" style="font-size: 0.875rem;"/>
        <InputText type="text" v-model="firstName" placeholder="Email" style="font-size: 0.875rem;" />
      </div>
      <div id="subscription-bottom">
        <Checkbox v-model="checked" binary />
        <span class="text-sm">
          I consent to my personal information being processed in accordance with The Broke Backpacker’s <span class="font-bold text-red-500">Privacy Policy</span>
        </span>
        <Button
          label="Subscribe"
          style="--p-button-label-font-weight: 700; font-size: 0.875rem;"
          severity="danger"
        />
      </div>
    </form>

</template>

<script setup></script>
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
<style lang="scss"></style>
