<script setup lang="ts">
import type { CollectionReference } from 'firebase/firestore'
import { doc, writeBatch } from 'firebase/firestore'
import type { PropType } from 'vue'
import { computed } from 'vue'
import { useFirestore } from 'vuefire'
import { mdiDelete } from '@mdi/js'
import {
  useToast,
  useDialog,
  useErrorMessage,
  useSelectedRows,
  pluralize,
  titleCase,
} from '#imports'

// Props
const props = defineProps({
  formattedData: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: 'item',
  },
  colRef: {
    type: Object as PropType<CollectionReference>,
    default: undefined,
  },
})

// App state
const toast = useToast()
const dialog = useDialog()
const errorMessage = useErrorMessage()
const selectedRows = useSelectedRows()

// Component state
const isSelected = computed(() => !!selectedRows.value.length)
const selectedData = computed(() => {
  if (isSelected.value) {
    // Find selected rows
    return selectedRows.value.map(rowId =>
      props.formattedData.find((data: any) => data.id === rowId),
    )
  }
  return props.formattedData
})
const namePlural = computed(() =>
  pluralize(props.formattedData.length, props.name, false),
)

// Firebase
const db = useFirestore()

// Delete related functionality
function showDeleteDialog() {
  dialog.value.title = 'Are you sure?'
  dialog.value.message = `This will permanently delete ${pluralize(
    selectedRows.value.length,
    props.name,
    true,
  )}.`
  dialog.value.action.buttonText = 'Delete'
  dialog.value.action.buttonColor = 'error'
  dialog.value.action.function = deleteItems

  // Show dialog
  dialog.value.show = true
}

async function deleteItems() {
  // Hide dialog
  dialog.value.show = false

  // Get a new write batch
  const batch = writeBatch(db)

  // Loop over documents and push job
  selectedData.value.forEach((item: any) => {
    if (props.colRef) {
      const docRef = doc(db, props.colRef.path, item.id)
      batch.delete(docRef)
    }
  })

  // Write to Firestore
  try {
    await batch.commit()

    // Toast
    const toastMessage
      = selectedRows.value.length > 1
        ? titleCase(namePlural.value)
        : titleCase(props.name)
    toast.value.message = `${toastMessage} deleted.`
    toast.value.show = true

    // Reset selected rows
    selectedRows.value = []
  }
  catch (error: any) {
    let message = `Error deleting ${namePlural.value}: `
    switch (error.code) {
      default:
        message += `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }
}
</script>

<template>
  <v-btn
    v-if="isSelected"
    variant="text"
    color="error"
    :prepend-icon="mdiDelete"
    @click="showDeleteDialog"
  >
    Delete
  </v-btn>
</template>
