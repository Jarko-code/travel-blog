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
  <UserForm
    v-model:formModel="newUser"
    :isEditing="true"
    :isRegistration="true"
    ref="userFormRef"
  />
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import { useAlertStore } from '@/stores/alertStore'
import { useI18n } from 'vue-i18n'
import { ROUTE_NAMES } from '@/router/routeNames'

const router = useRouter()
const alert = useAlertStore()
const { t } = useI18n()

const userStore = useUserStore()

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

const userFormRef = ref()

const submitUser = async () => {
  const result = await userFormRef.value.validate()
  if (result.valid) {
    try {
      const user = await userStore.addNewUser({ ...newUser })
      alert.success(t('admin.users.created'), t('admin.users.createdMessage'))
      const userId = user._id
      router.push({ name: ROUTE_NAMES.userDetail, params: { id: userId } })
    } catch (error) {
      alert.error(t('admin.users.failed'), t('admin.users.failedMessage'))
    }
  } else {
    alert.error(t('admin.users.failed'), t('admin.users.failedMessage'))
  }
}
</script>
