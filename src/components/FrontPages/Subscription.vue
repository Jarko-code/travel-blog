<template>
  <div class="mt-11">
    <p class="font-bold text-[1.125rem] mb-[1.4rem] leading-none">
      Subscribe and get the latest information's about our activities.
    </p>

    <Form
      class="text-sm"
      v-slot="$form"
      :resolver="resolver"
      :validateOnValueUpdate="true"
      :validateOnBlur="true"
      @submit="submitSubscription"
    >
      <div id="text-inputs" class="flex gap-x-6">
        <div id="name-input">
          <InputText
            type="text"
            name="firstName"
            v-model="formData.firstName"
            placeholder="First name"
            class="w-full"
          />
          <Message
            v-if="$form.firstName?.invalid"
            severity="error"
            size="small"
            variant="simple"
            style="background: rgba(255,255,255,0.9); box-shadow: 0 1px 4px rgba(0,0,0,0.15);"
            class=" px-3 py-1 rounded mt-1"
          >
            {{$form.firstName.error.message}}
          </Message>
        </div>
        <div id="email-input">
          <InputText
            type="text"
            name="email"
            v-model="formData.email"
            placeholder="Email"
            class="w-full"
          />
          <Message
            v-if="$form.email?.invalid"
            severity="error"
            size="small"
            variant="simple"
            style="background: rgba(255,255,255,0.9); box-shadow: 0 1px 4px rgba(0,0,0,0.15);"
            class=" px-3 py-1 rounded mt-1"
          >
            {{$form.email.error.message}}
          </Message>
        </div>
      </div>
      <div id="subscription-bottom" class="flex mt-8">
        <Checkbox
          v-model="checked"
          binary
          style="
            --p-checkbox-width: 1.625rem;
            --p-checkbox-height: 1.625rem;
            --p-checkbox-border-radius: 0.4125rem;
          "
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
          class="ml-[7vw] max-h-10"
        />
      </div>
    </Form>
  </div>
</template>

<script setup>
  import InputText from 'primevue/inputtext';
  import Checkbox from 'primevue/checkbox';
  import Button from 'primevue/button';
  import { reactive } from 'vue'
  import { useAlertStore } from '@/stores/alertStore'
  import { validateEmail, validateFirstName } from '@/composables/validations'
  import { useAuthStore } from '@/stores/authStore'

  const alert = useAlertStore()

  const formData = reactive({
    email: '',
    firstName: '',
  })

  const resolver = ({ values }) => {
    const errors = {}

    const emailError = validateEmail(values.email)
    if (emailError) errors.email = [{ message: emailError }]

    const firstNameError = validateFirstName(values.firstName)
    if (firstNameError) errors.firstName = [{ message: firstNameError }]

    return { errors }
  }

  const submitSubscription = async ({ valid }) => {
    if (valid) {
      const authStore = useAuthStore()
      authStore.loading = true
      await authStore.login(formData.email, formData.firstName)

      if (authStore.user) {
        alert.success('Login succesfull', 'Successfully logged in')
      } else {
        alert.error('Login failed', 'Try it again later')
      }
      authStore.loading = false
    }
  }
</script>
<style lang="scss"></style>
