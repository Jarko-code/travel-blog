<template>
  <div class="w-100 text-black">
    <h2 class="text-red font-semibold text-3xl mb-2.5">Sing in</h2>
    <p class="text-black font-normal text-sm mb-8">Welcome back to your account.</p>
    <Form
      :formData="formData"
      :resolver="resolver"
      :validateOnValueUpdate="true"
      :validateOnBlur="true"
      @submit="submitLogin"
    >
      <div class="mb-4">
        <IconField class="mb-2.5">
          <InputIcon class="pi pi-inbox" />
          <InputText name="email" type="text" placeholder="Email" v-model="formData.email" fluid />
        </IconField>
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error.message
        }}</Message>
      </div>
      <div class="mb-8">
        <IconField class="mb-2.5">
          <InputIcon class="pi pi-lock" />
          <InputText
            name="password"
            :type="isMasked ? 'password' : 'text'"
            placeholder="Password"
            fluid
            v-model="formData.password"
          />
          <InputIcon @click="toggleMask" :class="isMasked ? 'pi pi-eye' : 'pi pi-eye-slash'" />
        </IconField>
        <Message v-if="$form.password?.invalid" severity="error" size="small" variant="simple">{{
          $form.password.error.message
        }}</Message>
      </div>
      <Button type="submit" severity="danger" label="Login" />
    </Form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useAlertStore } from '@/stores/alertStore'
import { validateEmail, validatePassword } from '@/composables/validations'
import { useRoute, useRouter } from 'vue-router'
import { ROUTE_NAMES } from '@/router/routeNames'
import { useAuthStore } from '@/stores/authStore'

const route = useRoute()
const router = useRouter()

const alert = useAlertStore()

const formData = reactive({
  email: '',
  password: '',
})

const isMasked = ref(true)

const toggleMask = () => {
  isMasked.value = !isMasked.value
}

const resolver = ({ values }) => {
  const errors = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = [{ message: emailError }]

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = [{ message: passwordError }]

  return { errors }
}

const submitLogin = async ({ valid }) => {
  if (valid) {
    const authStore = useAuthStore()
    authStore.loading = true
    await authStore.login(formData.email, formData.password)

    if (authStore.user) {
      alert.success('Login succesfull', 'Successfully logged in')
    } else {
      alert.error('Login failed', 'Try it again later')
    }
    authStore.loading = false
  }
}
</script>
