import { createI18n } from 'vue-i18n'
import { sk, en } from '@/locales'

const messages = {
  sk: sk,
  en: en,
}

export const i18n = createI18n({
  globalInjection: true,
  legacy: false,
  locale: 'en' || 'sk', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})
