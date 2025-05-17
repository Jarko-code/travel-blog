<template>
  <div>
    <Button
      v-if="!isEditing"
      @click="$emit('edit')"
      :disabled="!canEdit"
      severity="warn"
      icon="pi pi-pencil"
      :label="editLabel"
    />
    <div v-else>
      <Button @click="$emit('update')" severity="success" icon="pi pi-save" :label="updateLabel" />
      <span class="pl-3">
        <Button @click="$emit('discard')" severity="warn" icon="pi pi-ban" :label="discardLabel" />
      </span>
      <span class="pl-3">
        <Button
          @click="$emit('delete')"
          :disabled="!canDelete"
          severity="danger"
          icon="pi pi-trash"
          :label="deleteLabel"
        />
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isEditing: Boolean,
  canEdit: {
    type: Boolean,
    default: true,
  },
  canDelete: {
    type: Boolean,
    default: true,
  },
  editLabel: {
    type: String,
  },
  updateLabel: {
    type: String,
  },
  discardLabel: {
    type: String,
  },
  deleteLabel: {
    type: String,
  },
})

defineEmits(['edit', 'update', 'discard', 'delete'])
</script>
