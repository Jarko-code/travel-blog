<template>
  <Form :formData="formModel" :validateOnValueUpdate="true" :validateOnBlur="true">
    <div class="flex justify-between items-start gap-8">
      <!-- Form fields -->
      <div class="grid grid-cols-3 gap-4 flex-1">
        <!-- User fields -->
        <InputGroup v-for="field in userFields" :key="field.name">
          <InputGroupAddon>
            <i class="pi" :class="field.icon"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Select
              v-if="['role', 'accountStatus', 'position'].includes(field.name)"
              :id="field.name"
              :options="getOptions(field.name)"
              v-model="formModel[field.name]"
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
              v-model="formModel[field.name]"
              :disabled="!isEditing"
              variant="filled"
            />
            <label :for="field.name">{{ t(`admin.users.${field.name}`) }}</label>
          </IftaLabel>
        </InputGroup>

        <!-- Password field (only during registration) -->
        <InputGroup v-if="isRegistration">
          <InputGroupAddon>
            <i class="pi pi-lock"></i>
          </InputGroupAddon>
          <IftaLabel>
            <Password
              id="password"
              v-model="formModel.password"
              :disabled="!isEditing"
              variant="filled"
              toggleMask
              class="w-full"
            />
            <label for="password">password</label>
          </IftaLabel>
        </InputGroup>
      </div>

      <!-- Profile Picture -->
      <div class="relative w-32 h-32 shrink-0">
        <img
          :src="formModel.profilePicture"
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
            v-model="formModel.address[field.name]"
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
          v-model="formModel.description"
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
import { computed, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  formModel: Object,
  isEditing: Boolean,
  isRegistration: {
    type: Boolean,
    default: false,
  },
})

const { formModel, isEditing, isRegistration } = toRefs(props)

const { t } = useI18n()

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
</script>
