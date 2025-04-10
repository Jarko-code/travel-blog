<template>
  <aside class="aside hidden lg:block">
    <Menu :model="MENU_ROUTES" class="pl-5 pt-5">
      <template #item="{ item, props }">
        <router-link
          :class="item.route.name === route.name ? 'active-link' : ''"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span class="p-menu-item-icon" :class="item.icon" />
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menu>
  </aside>
  <aside class="w-[80px] lg:hidden block bg-white">
    <Menu :model="MENU_ROUTES" class="pl-5 pt-5" style="min-width: unset">
      <template #item="{ item, props }">
        <router-link
          :class="item.route.name === route.name ? 'active-link' : ''"
          v-slot="{ href, navigate }"
          :to="item.route"
          custom
          :title="item.label"
        >
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span class="p-menu-item-icon" :class="item.icon" />
          </a>
        </router-link>
      </template>
    </Menu>
  </aside>
</template>

<script setup>
import { useMenuRoutes } from '@/data/menuRoutes'
import { useRoute } from 'vue-router'

const { MENU_ROUTES } = useMenuRoutes()
const route = useRoute()
</script>

<style lang="scss">
.p-menu {
  border: unset !important;
  .p-menu-list {
    display: block;
    padding: unset;
  }
}
.active-link {
  background: var(--p-surface-100);
  border-radius: var(--p-border-radius-sm);
}
</style>
