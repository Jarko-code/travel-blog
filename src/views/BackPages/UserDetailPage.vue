<template>
  <ConfirmDialog />
  <div class="flex items-center justify-between">
    <BackButton label="admin.default.back" severity="secondary" />
    <div>
      <Button
        v-if="!isEditing"
        @click="toggleEdit"
        severity="warn"
        icon="pi pi-pencil"
        :label="t('admin.users.edit')"
      />
      <div v-else>
        <Button
          @click="saveUser"
          severity="success"
          icon="pi pi-save"
          :label="t('admin.users.save')"
        />
        <span class="pl-3">
          <Button
            @click="stopEditing"
            severity="warn"
            icon="pi pi-ban"
            :label="t('admin.users.stopEditing')"
          />
        </span>
        <span class="pl-3">
          <Button
            @click="removeUser(userId.value)"
            :disabled="!isEditing"
            severity="danger"
            icon="pi pi-trash"
            :label="t('admin.users.delete')"
          />
        </span>
      </div>
    </div>
  </div>
  <Divider />
  <Form :formData="user" :validateOnValueUpdate="true" :validateOnBlur="true">
    <div class="flex justify-between items-start gap-8">
      <div class="grid grid-cols-3 gap-4 flex-1">
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-id-card"></i>
          </InputGroupAddon>
          <InputText
            name="personalNumber"
            type="text"
            :placeholder="t('admin.users.personalNumber')"
            v-model="user.personalNumber"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            name="name"
            type="text"
            :placeholder="t('admin.users.name')"
            v-model="user.name"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user"></i>
          </InputGroupAddon>
          <InputText
            name="surname"
            type="text"
            :placeholder="t('admin.users.surname')"
            v-model="user.surname"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-briefcase"></i>
          </InputGroupAddon>
          <InputText
            name="position"
            type="text"
            :placeholder="t('admin.users.position')"
            v-model="user.position"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-phone"></i>
          </InputGroupAddon>
          <InputText
            name="phoneNumber"
            type="text"
            :placeholder="t('admin.users.phoneNumber')"
            v-model="user.phoneNumber"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-envelope"></i>
          </InputGroupAddon>
          <InputText
            name="email"
            type="text"
            :placeholder="t('admin.users.email')"
            v-model="user.email"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user-edit"></i>
          </InputGroupAddon>
          <InputText
            name="role"
            type="text"
            :placeholder="t('admin.users.role')"
            v-model="user.role"
            :disabled="!isEditing"
          />
        </InputGroup>
        <InputGroup>
          <InputGroupAddon>
            <i class="pi pi-user-edit"></i>
          </InputGroupAddon>
          <InputText
            name="accountStatus"
            type="text"
            :placeholder="t('admin.users.accountStatus')"
            v-model="user.accountStatus"
            :disabled="!isEditing"
          />
        </InputGroup>
      </div>

      <!-- Profilová fotka -->
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
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map"></i>
        </InputGroupAddon>
        <InputText
          name="street"
          type="text"
          :placeholder="t('admin.users.street')"
          v-model="user.address.street"
          :disabled="!isEditing"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map-marker"></i>
        </InputGroupAddon>
        <InputText
          name="city"
          type="text"
          :placeholder="t('admin.users.city')"
          v-model="user.address.city"
          :disabled="!isEditing"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-code"></i>
        </InputGroupAddon>
        <InputText
          name="postcode"
          type="text"
          :placeholder="t('admin.users.postcode')"
          v-model="user.address.postcode"
          :disabled="!isEditing"
        />
      </InputGroup>
    </div>

    <div class="mt-6">
      <Textarea
        v-model="user.description"
        :disabled="!isEditing"
        :placeholder="t('admin.users.description')"
        class="w-full p-3 border rounded-md"
        rows="4"
      />
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

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const confirm = useConfirm()
const alert = useAlertStore()
const userId = computed(() => route.params.id)

const isEditing = ref(false)

onMounted(async () => {
  await userStore.getUser(userId.value)
})

const toggleEdit = () => {
  isEditing.value = !isEditing.value
}

const stopEditing = () => {
  isEditing.value = false // Ukončíme režim úpravy
}

const saveUser = async () => {
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
