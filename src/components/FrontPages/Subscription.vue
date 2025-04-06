<template>
  <div class="mt-11">
    <p class="font-bold text-[1.125rem] mb-[1.4rem] leading-none">
      Subscribe and get the latest information's about our activities.
    </p>

    <form @submit.prevent="sendSubscribeForm" class="text-sm">
      <div id="text-inputs" class="flex gap-x-6">
        <InputText type="text" v-model="firstName" placeholder="First name" class="w-full"/>
        <InputText type="text" v-model="firstName" placeholder="Email" class="w-full"/>
      </div>
      <div id="subscription-bottom" class="flex mt-8">
        <Checkbox
          v-model="checked"
          binary
          style="--p-checkbox-width: 1.625rem; --p-checkbox-height: 1.625rem; --p-checkbox-border-radius: 0.4125rem;"
          class="self-center mr-3"
        />
        <span class="w-full">
          I consent to my personal information being processed in accordance with The Broke Backpacker’s 
          <span class="font-bold text-red-500">
            Privacy Policy
          </span>
        </span>
        <Button
          label="Subscribe"
          style="--p-button-label-font-weight: 700; --p-button-padding-x: 1.7rem; font-size:0.875rem"
          severity="danger"
          class="ml-[7vw]"
        />
      </div>
    </form>
  </div>
</template>

<script setup></script>
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
<style lang="scss"></style>
