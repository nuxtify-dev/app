<script setup lang="ts">
import type { DocumentReference } from 'firebase/firestore'
import { deleteDoc } from 'firebase/firestore'
import type { PropType } from 'vue'
import { mdiDelete, mdiPencil } from '@mdi/js'
import { useToast, useDialog, useErrorMessage, navigateTo, titleCase } from '#imports'

// Props
const props = defineProps({
  docRef: {
    type: Object as PropType<DocumentReference>,
    required: true,
  },
  rootUrl: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    default: 'item',
  },
  namePlural: {
    type: String,
    default: 'items',
  },
  disableEdit: {
    type: Boolean,
    default: false,
  },
  disableDelete: {
    type: Boolean,
    default: false,
  },
})

// App state
const toast = useToast()
const dialog = useDialog()
const errorMessage = useErrorMessage()

// Delete related functionality
function showDeleteDialog() {
  dialog.value.title = 'Are you sure?'
  dialog.value.message = `This will permanently delete this ${props.name}.`
  dialog.value.action.buttonText = 'Delete'
  dialog.value.action.buttonColor = 'error'
  dialog.value.action.function = deleteItem

  // Show dialog
  dialog.value.show = true
}

async function deleteItem() {
  // Hide dialog
  dialog.value.show = false

  // Write to Firestore
  try {
    await deleteDoc(props.docRef)

    // Toast
    toast.value.message = `${titleCase(props.name)} deleted.`
    toast.value.show = true

    // Redirect
    navigateTo(`${props.rootUrl}`)
  }
  catch (error: any) {
    let message = `Error deleting ${props.name}: `
    switch (error.code) {
      default:
        message += `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }
}
</script>

<template>
  <div class="d-print-none">
    <!-- Delete -->
    <v-btn
      v-if="!disableDelete"
      variant="text"
      color="error"
      :prepend-icon="mdiDelete"
      @click="showDeleteDialog"
    >
      Delete
    </v-btn>

    <!-- Edit -->
    <v-btn
      v-if="!disableEdit"
      :to="`${rootUrl}/${docRef.id}/edit`"
      variant="text"
      :prepend-icon="mdiPencil"
      class="ml-2"
    >
      Edit
    </v-btn>
  </div>
</template>
