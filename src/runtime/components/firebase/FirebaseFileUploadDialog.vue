<script setup lang="ts">
import type { DocumentReference } from 'firebase/firestore'
import { arrayUnion, serverTimestamp, updateDoc } from 'firebase/firestore'
import type { VForm } from 'vuetify/components'
import type { PropType } from 'vue'
import { ref } from 'vue'
import { mdiFilePlus } from '@mdi/js'
import { useToast, useErrorMessage, pluralize } from '#imports'

// Props
const props = defineProps({
  docRef: {
    type: Object as PropType<DocumentReference>,
    required: true,
  },
  fileLabel: {
    type: String,
    default: 'File',
  },

  // Button
  buttonActionText: {
    type: String,
    default: 'Add',
  },
  buttonIcon: {
    type: String,
    default: mdiFilePlus,
  },
  buttonVariant: {
    type: String as PropType<'flat' | 'text' | 'elevated' | 'tonal' | 'outlined' | 'plain' | undefined>,
    default: undefined,
  },
  buttonSize: {
    type: String,
    default: 'default',
  },

  // Upload
  uploadPath: {
    type: String,
    required: true,
  },
  uploadFieldName: {
    type: String,
    required: true,
  },
  uploadMultiple: {
    type: Boolean,
    default: false,
  },
  maxFileSize: {
    type: Number,
    default: 5, // MB; if changed, update storage.rules
  },
  uniqueFilename: {
    type: Boolean,
    default: false,
  },
})

// App state
const errorMessage = useErrorMessage()
const toast = useToast()

// Component state
const emit = defineEmits(['updated'])
const dialog = ref(false)
const form = ref<VForm>()
const loading = ref(false)
const fileRefs = ref<string[]>([])

async function submitForm() {
  // Check if the form is valid
  const res = await form.value?.validate()
  if (!res?.valid) {
    return
  }

  loading.value = true

  // Save to Firebase
  const updatePromises = fileRefs.value.map((fileRef) => {
    return updateDoc(props.docRef, {
      [props.uploadFieldName]: props.uploadMultiple
        ? arrayUnion(fileRef)
        : fileRef,
      lastUpdated: serverTimestamp(),
    })
  })

  try {
    await Promise.all(updatePromises)
    fileRefs.value = []
    dialog.value = false // keep the dialog open on error

    // Toast
    toast.value.message = `${props.fileLabel} updated!`
    toast.value.show = true

    // Emit
    emit('updated')
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
      :variant="buttonVariant"
      :size="buttonSize"
      :prepend-icon="buttonIcon"
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
          <FirebaseFileUpload
            v-model="fileRefs"
            :upload-path
            :unique-filename
            :max-file-size
          />

          <div class="text-body-1">
            <slot name="guidelines" />
          </div>

          <v-btn
            :disabled="!form"
            :loading
            block
            type="submit"
            class="mt-4"
          >
            Save {{ pluralize(fileRefs.length, fileLabel, false) }}
          </v-btn>
        </v-form>

        <v-btn
          variant="plain"
          class="mt-2"
          @click="dialog = false"
        >
          Cancel
        </v-btn>
      </v-card>
    </v-dialog>
  </span>
</template>
