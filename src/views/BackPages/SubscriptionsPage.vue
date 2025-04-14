<template>
  <div class="">
    <DataTable
      v-if="subscriptions.length > 0"
      :value="subscriptions"
      tableStyle="min-width: 50rem;"
      scrollable
      scrollHeight="75vh"
      :virtualScrollerOptions="{ itemSize: 50 }"
    >
      <template #header>
        <div class="flex justify-end">
          <RouterLink :to="{ name: ROUTE_NAMES.newEmailPost }">
            <Button
              icon="pi pi-envelope"
              :label="t('admin.subscription.newPostButton')"
              severity="success"
            />
          </RouterLink>
        </div>
      </template>
      <Column field="firstName" :style="{ width: '200px' }"
        ><template #header>
          <span class="block w-full font-semibold">{{ t('admin.subscription.name') }}</span>
        </template></Column
      >
      <Column field="email" :style="{ width: '400px' }"
        ><template #header>
          <span class="block w-full font-semibold">{{ t('admin.subscription.email') }}</span>
        </template></Column
      >
      <Column field="email">
        <template #header>
          <span class="block w-full font-semibold text-center">{{
            t('admin.subscription.sendEmail')
          }}</span>
        </template>
        <template #body="{ data }">
          <a :href="`mailto:${data.email}`" class="flex justify-center">
            <i class="pi pi-envelope text-blue-500"></i>
          </a>
        </template>
      </Column>
      <Column>
        <template #header>
          <span class="block w-full font-semibold text-center">{{
            t('admin.subscription.actions')
          }}</span>
        </template>
        <template #body="{ data }">
          <div @click="removeSubscription(data._id)" class="flex justify-center cursor-pointer">
            <i class="pi pi-trash text-red-500"></i>
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
import { onMounted } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import { storeToRefs } from 'pinia'
import { ROUTE_NAMES } from '@/router/routeNames'
import { useConfirm } from 'primevue/useconfirm'
import { useAlertStore } from '@/stores/alertStore'
import { useI18n } from 'vue-i18n'

const subscriptionStore = useSubscriptionStore()
const { subscriptions } = storeToRefs(subscriptionStore) // Make subscriptions reactive !! very important
const confirm = useConfirm()
const alert = useAlertStore()
const { t } = useI18n()

onMounted(async () => {
  await subscriptionStore.getAllSubscriptions()
  // console.log(subscriptions.value) // Access and log the reactive subscriptions array
})

const removeSubscription = async (id) => {
  confirm.require({
    message: t('admin.subscription.deleteMessage'),
    header: t('admin.subscription.deleteHeader'),
    icon: 'pi pi-info-circle',
    rejectLabel: t('admin.subscription.deleteCancel'),
    rejectProps: {
      label: t('admin.subscription.deleteCancel'),
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: t('admin.subscription.delete'),
      severity: 'danger',
    },
    accept: async () => {
      await subscriptionStore.removeSubscription(id)
      alert.success(t('admin.subscription.removed'), t('admin.subscription.removedMessage'))
    },
    reject: () => {
      alert.info(t('admin.subscription.rejected'), t('admin.subscription.rejectedMessage'))
    },
  })
}
</script>

<style>
.p-datatable .p-datatable-tbody > tr:nth-child(even) {
  background-color: var(--p-blue-50);
}
</style>
