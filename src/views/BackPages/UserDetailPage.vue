<template>
  <ConfirmDialog />
  <div class="flex items-center justify-between">
    <BackButton label="admin.default.back" severity="secondary" />
    <ActionButtons
      :isEditing="isEditing"
      :canEdit="user.role === 'Admin'"
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
  <Form :formData="user" :validateOnValueUpdate="true" :validateOnBlur="true">
    <div class="flex justify-between items-start gap-8">
      <div class="grid grid-cols-3 gap-4 flex-1">
        <InputGroup v-for="field in userFields" :key="field.name">
          <InputGroupAddon>
            <i class="pi" :class="field.icon"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-if="['role', 'accountStatus', 'position'].includes(field.name)"
              :id="field.name"
              :options="getOptions(field.name)"
              v-model="user[field.name]"
              :disabled="!isEditing"
              optionLabel="label"
              optionValue="value"
              placeholder="Select"
              class="w-full"
              variant="filled"
            />
            <InputText
              v-else
              :id="field.name"
              :name="field.name"
              type="text"
              v-model="user[field.name]"
              :disabled="!isEditing"
              variant="filled"
            />
            <label :for="field.name">{{ t(`admin.users.${field.name}`) }}</label>
          </IftaLabel>
        </InputGroup>
      </div>

      <div class="relative w-32 h-32">
        <img
          :src="user.profilePicture"
          alt="Profile Picture"
          class="w-full h-full object-cover rounded-full shadow"
        />
      </div>
    </div>

    <Divider />

    <div class="grid grid-cols-3 gap-4 flex-1">
      <InputGroup v-for="field in addressFields" :key="field.name">
        <InputGroupAddon>
          <i class="pi" :class="field.icon"></i>
        </InputGroupAddon>
        <IftaLabel>
          <InputText
            :id="field.name"
            :name="field.name"
            type="text"
            v-model="user.address[field.name]"
            :disabled="!isEditing"
            variant="filled"
          />
          <label :for="field.name">{{ t(`admin.users.${field.name}`) }}</label>
        </IftaLabel>
      </InputGroup>
    </div>

    <div class="mt-6">
      <IftaLabel>
        <Textarea
          id="description"
          v-model="user.description"
          :disabled="!isEditing"
          class="w-full p-3 border rounded-md"
          rows="4"
        />
        <label for="description">{{ t('admin.users.description') }}</label>
      </IftaLabel>
    </div>
  </Form>
</template>

<script setup>
import { onMounted, computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
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

const confirm = useConfirm()
const alert = useAlertStore()

const userFields = [
  { name: 'personalNumber', icon: 'pi-id-card' },
  { name: 'name', icon: 'pi-user' },
  { name: 'surname', icon: 'pi-user' },
  { name: 'position', icon: 'pi-briefcase' },
  { name: 'phoneNumber', icon: 'pi-phone' },
  { name: 'email', icon: 'pi-envelope' },
  { name: 'role', icon: 'pi-user-edit' },
  { name: 'accountStatus', icon: 'pi-user-edit' },
]

const addressFields = [
  { name: 'street', icon: 'pi-map' },
  { name: 'city', icon: 'pi-map-marker' },
  { name: 'postcode', icon: 'pi-code' },
]

const roleOptions = computed(() => [
  { label: t('admin.users.roles.admin'), value: 'Admin' },
  { label: t('admin.users.roles.user'), value: 'User' },
  { label: t('admin.users.roles.editor'), value: 'Editor' },
])

const statusOptions = computed(() => [
  { label: t('admin.users.status.active'), value: 'Active' },
  { label: t('admin.users.status.inActive'), value: 'Inactive' },
])

const positionOptions = computed(() => [
  { label: t('admin.users.positions.developer'), value: 'Developer' },
  { label: t('admin.users.positions.designer'), value: 'Designer' },
  { label: t('admin.users.positions.qaEngineer'), value: 'QA Engineer' },
])

const { isEditing, toggleEdit, discardChanges } = useEditToggle(user)

onMounted(async () => {
  await userStore.getUser(userId.value)
  if (route.query.edit === 'true') {
    isEditing.value = true
  }
})

const getOptions = (fieldName) => {
  switch (fieldName) {
    case 'role':
      return roleOptions.value
    case 'accountStatus':
      return statusOptions.value
    case 'position':
      return positionOptions.value
    default:
      return []
  }
}

const updateUser = async () => {
  try {
    await userStore.updateUser(userId.value, user.value)

    const localData = JSON.parse(localStorage.getItem('user'))

    if (localData && localData.user) {
      localData.user.role = user.value.role
      localStorage.setItem('user', JSON.stringify(localData))
    }

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
