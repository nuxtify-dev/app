<script setup lang="ts">
import saveAs from 'file-saver'
import type { DocumentReference } from 'firebase/firestore'
import { arrayRemove, updateDoc } from 'firebase/firestore'
import { deleteObject, getBlob, ref as storageRef } from 'firebase/storage'
import type { PropType } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { mdiDelete, mdiCloudDownload } from '@mdi/js'
import { useToast, useDialog, useErrorMessage } from '#imports'

// Props
const props = defineProps({
  docRef: {
    type: Object as PropType<DocumentReference>,
    required: true,
  },
  fileRef: {
    type: String,
    required: true,
  },
  disableDelete: {
    type: Boolean,
    default: false,
  },
})

// App state
const dialog = useDialog()
const toast = useToast()
const errorMessage = useErrorMessage()

// Firebase
const storage = useFirebaseStorage()

// Delete related functionality
function showDeleteDialog() {
  dialog.value.title = 'Are you sure?'
  dialog.value.message = `This will permanently delete this file.`
  dialog.value.action.buttonText = 'Delete'
  dialog.value.action.buttonColor = 'error'
  dialog.value.action.function = deleteFile

  // Show dialog
  dialog.value.show = true
}

async function deleteFile() {
  // Hide dialog
  dialog.value.show = false

  const file = storageRef(storage, props.fileRef)
  try {
    // Delete file from cloud storage
    await deleteObject(file)
  }
  catch (error: any) {
    let message = ''
    switch (error.code) {
      case 'storage/object-not-found':
        // Continue
        break
      default:
        message = `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }

  try {
    // Delete fileRef from firestore doc
    await updateDoc(props.docRef, {
      fileRefs: arrayRemove(props.fileRef),
    })
  }
  catch (error: any) {
    let message = ''
    switch (error.code) {
      default:
        message = `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }

  // Toast
  toast.value.message = 'File deleted.'
  toast.value.show = true
}

// File download related functionality
async function downloadFile() {
  const file = storageRef(storage, props.fileRef)
  try {
    const blob = await getBlob(file)
    saveAs(blob, file.name)
  }
  catch (error: any) {
    let message = ''
    switch (error.code) {
      default:
        message = `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }
}
</script>

<template>
  <!-- Delete -->
  <v-btn
    v-if="!disableDelete"
    color="error"
    :icon="mdiDelete"
    variant="text"
    class="mr-2"
    @click.stop="showDeleteDialog"
  />

  <!-- Download -->
  <v-btn
    :icon="mdiCloudDownload"
    variant="text"
    @click.stop="downloadFile"
  />
</template>
