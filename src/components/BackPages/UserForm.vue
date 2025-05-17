<template>
  <Form
    v-slot="$form"
    :formData="formModel"
    :validateOnValueUpdate="true"
    :validateOnBlur="true"
    :resolver="resolver"
    ref="userFormRef"
  >
    <div class="flex justify-between items-start gap-8">
      <!-- Form fields -->
      <div class="grid grid-cols-3 gap-4 flex-1">
        <!-- User fields -->
        <div v-for="field in userFields" :key="field.name">
          <InputGroup>
            <InputGroupAddon>
              <i class="pi" :class="field.icon"></i>
            </InputGroupAddon>
            <IftaLabel>
              <Select
                v-if="['role', 'accountStatus', 'position'].includes(field.name)"
                :id="field.name"
                :name="field.name"
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
          <Message
            v-if="
              ['personalNumber', 'name', 'surname', 'email', 'role', 'accountStatus'].includes(
                field.name,
              ) && $form[field.name]?.invalid
            "
            severity="error"
            size="small"
            variant="simple"
            class="mt-1"
          >
            {{ $form[field.name].error.message }}
          </Message>
        </div>

        <!-- Password field (only during registration) -->
        <div>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <IftaLabel>
              <Password
                id="password"
                name="password"
                v-model="formModel.password"
                :disabled="!isEditing"
                variant="filled"
                toggleMask
                class="w-full"
                v-bind="$attrs"
              />
              <label for="password">{{ t('admin.users.password') }}</label>
            </IftaLabel>
          </InputGroup>
          <Message
            v-if="$form.password?.invalid"
            severity="error"
            size="small"
            variant="simple"
            class="mt-1"
          >
            {{ $form.password.error.message }}
          </Message>
        </div>
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
import { computed, toRefs, ref, nextTick } from 'vue'
import { useI18n } from 'vue-i18n'
import { useValidators } from '@/composables/useValidations'

const props = defineProps({
  isEditing: Boolean,
  isRegistration: {
    type: Boolean,
    default: false,
  },
})

const formModel = defineModel('formModel')

const { isEditing, isRegistration } = toRefs(props)

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

const userFormRef = ref()
defineExpose({
  validate: () => userFormRef.value.validate?.(),
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

const {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateSurname,
  validateRole,
  validateStatus,
  validatePersonalNumber,
} = useValidators()

const resolver = ({ values }) => {
  console.log('Before Validation:', values)
  const errors = {}

  const emailError = validateEmail(values.email)
  if (emailError) errors.email = [{ message: emailError }]

  const passwordError = validatePassword(values.password)
  if (passwordError) errors.password = [{ message: passwordError }]

  const firsNameError = validateFirstName(values.name)
  if (firsNameError) errors.name = [{ message: firsNameError }]

  const surnameError = validateSurname(values.surname)
  if (surnameError) errors.surname = [{ message: surnameError }]

  const roleError = validateRole(values.role)
  if (roleError) errors.role = [{ message: roleError }]

  const statusError = validateStatus(values.accountStatus)
  if (statusError) errors.accountStatus = [{ message: statusError }]

  const personalNumberError = validatePersonalNumber(values.personalNumber)
  if (personalNumberError) errors.personalNumber = [{ message: personalNumberError }]

  console.log('After Validation:', values)

  return { errors, valid: Object.keys(errors).length === 0 }
}
</script>
