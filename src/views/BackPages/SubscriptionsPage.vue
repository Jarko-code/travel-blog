<template>
  <div class="">
    <DataTable
      v-if="subscriptions.length > 0"
      :value="subscriptions"
      tableStyle="min-width: 50rem;"
      scrollable
      scrollHeight="82vh"
      :virtualScrollerOptions="{ itemSize: 50 }"
    >
      <Column field="firstName" header="Name"></Column>
      <Column field="email" header="Email"></Column>
      <Column field="email">
        <template #header>
          <span class="block w-full font-semibold text-center">Send email</span>
        </template>
        <template #body="{ data }">
          <a :href="`mailto:${data.email}`" class="flex justify-center">
            <i class="pi pi-envelope text-blue-500"></i>
          </a>
        </template>
      </Column>
      <Column>
        <template #header>
          <span class="block w-full font-semibold text-center">Actions</span>
        </template>
        <template #body="{ data }">
          <div @click="removeSubscription(data._id)" class="flex justify-center">
            <i class="pi pi-trash text-red-500"></i>
          </div>
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useSubscriptionStore } from '@/stores/subscriptionStore'
import { storeToRefs } from 'pinia'

const subscriptionStore = useSubscriptionStore()
const { subscriptions } = storeToRefs(subscriptionStore) // Make subscriptions reactive !! very important

onMounted(async () => {
  await subscriptionStore.getAllSubscriptions()
  // console.log(subscriptions.value) // Access and log the reactive subscriptions array
})

const removeSubscription = async (id) => {
  await subscriptionStore.removeSubscription(id)
  // console.log('Updated subscriptions:', subscriptions.value) // Array should be different from previous
}
</script>
