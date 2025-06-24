<script setup lang="ts">
import type { DocumentReference } from 'firebase/firestore'
import type { VForm } from 'vuetify/components'
import { serverTimestamp, updateDoc } from 'firebase/firestore'
import { deleteObject, ref as storageRef } from 'firebase/storage'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { mdiDelete } from '@mdi/js'
import { useToast, useErrorMessage } from '#imports'

// Props
const props = defineProps({
  docRef: {
    type: Object as PropType<DocumentReference>,
    required: true,
  },
  deleteRefString: {
    type: String,
    required: true,
  },
  fileLabel: {
    type: String,
    default: 'File',
  },
  buttonActionText: {
    type: String,
    default: 'Delete',
  },
  buttonIcon: {
    type: String,
    default: mdiDelete,
  },
  buttonSize: {
    type: String,
    default: 'default',
  },
  buttonColor: {
    type: String,
    default: 'error',
  },
})

// App state
const errorMessage = useErrorMessage()
const toast = useToast()

// Firebase
const storage = useFirebaseStorage()

// Component state
const emit = defineEmits(['deleted'])
const dialog = ref(false)
const form = ref<VForm>()
const loading = ref(false)

async function submitForm() {
  // Check if the form is valid
  const res = await form.value?.validate()
  if (!res?.valid) {
    return
  }

  loading.value = true

  try {
    // Delete from Firebase storage
    const deleteRef = storageRef(storage, props.deleteRefString)
    await deleteObject(deleteRef)

    // Reset to the default image url
    const bucketName = storage.app.options.storageBucket
    await updateDoc(props.docRef, {
      imageUrl: `gs://${bucketName}/meditations/${props.docRef.id}/cover.webp`,
      lastUpdated: serverTimestamp(),
    })

    dialog.value = false // keep the dialog open on error

    // Toast
    toast.value.message = 'Image deleted!'
    toast.value.show = true

    // Emit
    emit('deleted')
  }
  catch (error: any) {
    let message = ''
    switch (error.code) {
      default:
        message = `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <span>
    <v-btn
      :size="buttonSize"
      :prepend-icon="buttonIcon"
      :color="buttonColor"
      :disabled="loading"
      :loading
      block
      @click="dialog = true"
    >
      {{ buttonActionText }} {{ fileLabel }}
    </v-btn>
    <v-dialog
      v-model="dialog"
      width="400"
    >
      <v-card class="pa-4">
        <div class="text-h6 mb-2">{{ buttonActionText }} {{ fileLabel }}</div>
        <v-form
          ref="form"
          validate-on="blur"
          :disabled="loading"
          @submit.prevent="submitForm"
        >
          <div class="text-body-1">
            <slot name="confirm" />

            <p>
              Are you sure you want to {{ buttonActionText.toLowerCase() }} this
              {{ fileLabel.toLowerCase() }}?
            </p>
          </div>

          <v-btn
            :disabled="!form"
            :loading
            block
            :color="buttonColor"
            type="submit"
            class="mt-4"
          >
            Yes, {{ buttonActionText }}
          </v-btn>
        </v-form>

        <v-btn
          variant="plain"
          class="mt-2"
          @click="dialog = false"
        >
          Cancel
        </v-btn>

        <!-- Error message -->
        <AppError />
      </v-card>
    </v-dialog>
  </span>
</template>
