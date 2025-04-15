<template>
  <div class="">
    <DataTable
      v-if="users.length > 0"
      :value="users"
      tableStyle="min-width: 50rem;"
      scrollable
      scrollHeight="75vh"
      :virtualScrollerOptions="{ itemSize: 50 }"
    >
      <template #header>
        <div class="flex justify-between">
          <div>
            <IconField class="relative">
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="keyword" :placeholder="t('admin.users.search')" class="pr-8" />
              <button
                v-if="keyword"
                @click="keyword = ''"
                class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <i class="pi pi-times" />
              </button>
            </IconField>
          </div>
          <div>
            <span class="pl-3">
              <Button
                icon="pi pi-file-import"
                :label="t('admin.users.import')"
                severity="primary"
              />
            </span>
            <span class="pl-3">
              <Button icon="pi pi-file-export" :label="t('admin.users.export')" severity="help" />
            </span>
            <RouterLink class="pl-3" :to="{ name: ROUTE_NAMES.newUser }">
              <Button
                icon="pi pi-user-plus"
                :label="t('admin.users.createUser')"
                severity="success"
              />
            </RouterLink>
          </div>
        </div>
      </template>
      <Column field="name">
        <template #header>
          <span class="block w-full font-semibold">
            {{ t('admin.users.name') }}
          </span>
        </template>
        <template #body="{ data }">
          <span> {{ data.name }} {{ data.surname }} </span>
        </template>
      </Column>
      <Column field="position">
        <template #header>
          <span class="block w-full font-semibold">
            {{ t('admin.users.position') }}
          </span>
        </template>
      </Column>
      <Column field="phoneNumber">
        <template #header>
          <span class="block w-full font-semibold text-center">
            {{ t('admin.users.phoneNumber') }}
          </span>
        </template>
        <template #body="{ data }">
          <a :href="`tel:${data.phoneNumber}`" class="flex justify-center">
            {{ data.phoneNumber }}
          </a>
        </template>
      </Column>
      <Column field="email">
        <template #header>
          <span class="block w-full font-semibold text-center">
            {{ t('admin.users.email') }}
          </span>
        </template>
        <template #body="{ data }">
          <a :href="`mailto:${data.email}`" class="flex justify-center">
            <i class="pi pi-envelope text-blue-500"></i>
          </a>
        </template>
      </Column>
      <Column>
        <template #header>
          <span class="block w-full font-semibold text-center">
            {{ t('admin.subscription.actions') }}
          </span>
        </template>
        <template #body="{ data }">
          <div class="flex items-center justify-around">
            <RouterLink
              :to="{ name: ROUTE_NAMES.userDetail, params: { id: data._id } }"
              class="flex justify-center cursor-pointer"
            >
              <i class="pi pi-eye text-blue-500"></i>
            </RouterLink>
            <div @click="removeUser(data._id)" class="flex justify-center cursor-pointer">
              <i class="pi pi-trash text-red-500"></i>
            </div>
          </div>
        </template>
      </Column>
    </DataTable>
    <div v-else class="flex justify-center items-center h-[75vh]">
      <ProgressSpinner
        style="width: 50px; height: 50px"
        strokeWidth="8"
        fill="transparent"
        animationDuration=".5s"
        aria-label="Custom ProgressSpinner"
      />
    </div>
  </div>
  <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'
import { storeToRefs } from 'pinia'
import { ROUTE_NAMES } from '@/router/routeNames'
import { useConfirm } from 'primevue/useconfirm'
import { useAlertStore } from '@/stores/alertStore'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const { users } = storeToRefs(userStore)
const confirm = useConfirm()
const alert = useAlertStore()
const { t } = useI18n()
const keyword = ref('')

onMounted(async () => {
  await userStore.getAllUsers()
})

const removeUser = async (id) => {
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
      await userStore.removeUser(id)
      alert.success(t('admin.users.removed'), t('admin.users.removedMessage'))
    },
    reject: () => {
      alert.info(t('admin.users.rejected'), t('admin.users.rejectedMessage'))
    },
  })
}
</script>

<style lang="scss" scoped></style>
