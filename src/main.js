import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'

import ToastService from 'primevue/toastservice'
import { theme } from './assets/themes/themes'
import ConfirmationService from 'primevue/confirmationservice'

import App from './App.vue'
import router from './router'
import { i18n } from '@/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(i18n)
app.use(ConfirmationService)

app.use(PrimeVue, {
  theme: {
    preset: theme,
  },
})

app.mount('#app')
