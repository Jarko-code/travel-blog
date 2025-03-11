import { defineStore } from 'pinia'
import { useToast } from 'primevue/usetoast'

export const useAlertStore = defineStore('alert', {
  state: () => ({
    toast: useToast(),
  }),
  actions: {
    success(title, message) {
      this.toast.add({
        severity: 'success',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
    info(title, message) {
      this.toast.add({
        severity: 'info',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
    warn(title, message) {
      this.toast.add({
        severity: 'warn',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
    error(title, message) {
      this.toast.add({
        severity: 'error',
        summary: title,
        detail: message,
        life: 3000,
      })
    },
  },
})
