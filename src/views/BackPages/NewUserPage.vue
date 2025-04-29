<template>
  <div class="flex justify-end mt-4">
    <button @click="submitUser" class="btn btn-primary">Create</button>
  </div>
  <UserForm :formModel="newUser" :isEditing="true" :isRegistration="true" />
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alertStore'

const router = useRouter()
const alert = useAlertStore()

const userStore = useUserStore()

// pridat back a create user button
// pridat divider
// pridat generate personal id
// pridat validaciu
// pridat i18n
// route names
// upravit alerty

const newUser = reactive({
  personalNumber: '',
  name: '',
  surname: '',
  position: '',
  phoneNumber: '',
  email: '',
  role: '',
  accountStatus: '',
  profilePicture: '',
  description: '',
  password: '',
  address: {
    street: '',
    city: '',
    postcode: '',
  },
})

const submitUser = async () => {
  try {
    const user = await userStore.addNewUser(newUser)
    alert.success('User created successfully')

    const userId = user._id

    router.push({ name: 'user-detail', params: { id: userId } })
  } catch (e) {
    alert.error('User creation failed', e.message)
  }
}
</script>
