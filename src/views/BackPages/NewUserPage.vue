<template>
  <div class="flex justify-between pt-3">
    <BackButton label="admin.default.back" severity="secondary" />
    <Button
      icon="pi pi-user-plus"
      @click="submitUser"
      severity="success"
      :label="t('admin.users.create')"
    />
  </div>
  <Divider />
  <UserForm :formModel="newUser" :isEditing="true" :isRegistration="true" />
</template>

<script setup>
import { reactive } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alertStore'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAMES } from '@/router/routeNames'

const router = useRouter()
const alert = useAlertStore()
const { t } = useI18n()

const userStore = useUserStore()

// pridat validaciu
// pridat i18n

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
  const user = await userStore.addNewUser(newUser)
  alert.success(t('admin.users.created'), t('admin.users.createdMessage'))

  const userId = user._id

  router.push({ name: ROUTE_NAMES.userDetail, params: { id: userId } })
}
</script>
