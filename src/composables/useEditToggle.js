import { ref } from 'vue'

export function useEditToggle(dataRef) {
  const isEditing = ref(false)
  const originalData = ref({})

  const toggleEdit = () => {
    isEditing.value = true
    originalData.value = JSON.parse(JSON.stringify(dataRef.value))
  }

  const discardChanges = () => {
    dataRef.value = JSON.parse(JSON.stringify(originalData.value))
    isEditing.value = false
  }

  return {
    isEditing,
    toggleEdit,
    discardChanges,
  }
}
