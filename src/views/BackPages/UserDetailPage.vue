<template>
  <ConfirmDialog />
  <div class="flex items-center justify-between">
    <BackButton label="admin.default.back" severity="secondary" />
    <ActionButtons
      :isEditing="isEditing"
      :canEdit="authStore.user.user.role === 'Admin'"
      :canDelete="isEditing"
      @edit="toggleEdit"
      @discard="discardChanges"
      @update="updateUser"
      @delete="() => removeUser(userId.value)"
      :editLabel="t('admin.users.edit')"
      :updateLabel="t('admin.users.update')"
      :discardLabel="t('admin.users.discard')"
      :deleteLabel="t('admin.users.delete')"
    />
  </div>
  <Divider />
  <UserForm :formModel="user" :isEditing="isEditing" />
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import { useAuthStore } from '@/stores/authStore'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import { useAlertStore } from '@/stores/alertStore'
import { ROUTE_NAMES } from '@/router/routeNames'
import { useEditToggle } from '@/composables/useEditToggle'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const userId = computed(() => route.params.id)
const authStore = useAuthStore()

const confirm = useConfirm()
const alert = useAlertStore()

const { isEditing, toggleEdit, discardChanges } = useEditToggle(user)

onMounted(async () => {
  await userStore.getUser(userId.value)
  if (route.query.edit === 'true') {
    isEditing.value = true
  }
})

const updateUser = async () => {
  try {
    await userStore.updateUser(userId.value, user.value)

    alert.success(t('admin.users.updated'), t('admin.users.updatedMessage'))
    isEditing.value = false
  } catch (error) {
    alert.error(t('admin.users.updateFailed'), error.message)
  }
}

const removeUser = async () => {
  confirm.require({
    message: t('admin.users.deleteMessage'),
    header: t('admin.users.deleteHeader'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('admin.users.deleteCancel'),
    rejectProps: {
      label: t('admin.users.deleteCancel'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('admin.users.delete'),
      severity: 'danger',
    },
    accept: async () => {
      await userStore.removeUser(userId.value)
      router.push({ name: ROUTE_NAMES.usersPage })
      alert.success(t('admin.users.removed'), t('admin.users.removedMessage'))
    },
    reject: () => {
      alert.info(t('admin.users.rejected'), t('admin.users.rejectedMessage'))
    },
  })
}
</script>

<style lang="scss" scoped></style>
