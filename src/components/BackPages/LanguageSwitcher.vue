<template>
  <div class="language-switcher mr-4" ref="languageListRef" @click="showLanguageList">
    <div class="current-language">
      <img :src="`/flags/${$i18n.locale}.svg`" />
      <p class="text-color-secondary">
        <b>{{ $i18n.locale.toUpperCase() }}</b>
      </p>
      <i
        class="pi pi-angle-down text-color-secondary"
        :class="[rotate ? 'rotatedown' : 'rotateup']"
      >
      </i>
    </div>
    <Menu class="text-sm cursor-pointer" ref="isLangVisible" id="overlay_menu" :popup="true">
      <template #end>
        <ul v-show="isLangVisible">
          <li
            v-for="(language, index) in LOCALES"
            :key="index"
            @click="changeLocale(language.label)"
            class="flex align-items-center p-2"
          >
            <img :src="`/flags/${language.icon}.svg`" />
            <p class="m-0 ml-2 font-bold">
              {{ language.label.toUpperCase() }}
            </p>
          </li>
        </ul>
      </template>
    </Menu>
  </div>
</template>

<script setup>
//imports
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { LOCALES } from '@/data/locales'

const { locale } = useI18n()
const isLangVisible = ref()
const rotate = ref(false)
const languageListRef = ref(null)

const showLanguageList = (event) => {
  isLangVisible.value.toggle(event)
  rotate.value = !rotate.value
}
const changeLocale = (val) => {
  locale.value = val
  rotate.value = !rotate.value
  isLangVisible.value.toggle(val)
}

const handleClickOutside = (event) => {
  if (languageListRef.value && !languageListRef.value.contains(event.target)) {
    isLangVisible.value.hide()
    rotate.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style lang="scss" scoped>
.language-switcher {
  display: flex;
  align-items: center;
  position: relative;
  cursor: pointer;
  .current-language {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
    padding: 5px 0px;
    width: 90px;
    border-radius: 4px;
    p {
      margin: 0;
    }
    svg {
      width: 10px;
    }
  }
}

.p-menu {
  width: unset;
  min-width: unset !important;
  border-radius: 0 0 0.375rem 0.375rem;
}

img {
  width: 21px;
  height: auto;
}
.rotatedown {
  transform: rotate(180deg);
  transition: 0.35s ease;
}
.rotateup {
  transition: 0.35s ease;
}
</style>
