<script setup lang="ts">
import { ref as storageRef, uploadBytes } from 'firebase/storage'
import { computed, ref } from 'vue'
import { useFirebaseStorage } from 'vuefire'
import { mdiCloudUpload } from '@mdi/js'
import { useDisplay } from 'vuetify'
import { useErrorMessage, formRules, filenameToUrl } from '#imports'

// Props
const props = defineProps({
  modelValue: {
    type: Array<string>,
    default: [],
  },
  uploadPath: {
    type: String,
    required: true,
  },
  acceptedFileTypes: {
    type: Array<string>,
    default: ['image/png', 'image/jpeg', 'image/webp'],
  },
  fileTypeLabel: {
    type: String,
    default: 'an image',
  },
  maxFileSize: {
    type: Number,
    default: 5, // MB; if changed, update storage.rules
  },
  maxFiles: {
    type: Number,
    default: 1, // files; if changed, update storage.rules
  },
  uniqueFilename: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])
const fileRefs = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

// App state
const { xs } = useDisplay()
const errorMessage = useErrorMessage()

// Firebase
const storage = useFirebaseStorage()

// Component state
const loading = ref(false)
const files = ref<File | File[]>()
const maxBytes = computed(() => props.maxFileSize * 1024 * 1024)

// File validation rules
const rules = {
  maxFileSize: (v: File | File[]) => {
    // Normalize files into any array
    const filesArray: File[] = v ? (Array.isArray(v) ? v : [v]) : []

    // If no files are selected, the rule passes
    if (filesArray.length === 0) {
      return true
    }

    // Check if *every* file's size is less than or equal to the max
    const allFileSizesOk = filesArray.every(
      file => file.size <= maxBytes.value,
    )

    // Return true if all files are OK, otherwise return the error message
    return (
      allFileSizesOk || `File size must be less than ${props.maxFileSize} MB`
    )
  },
  maxFiles: (v: File | File[]) => {
    // Normalize files into any array
    const filesArray: File[] = v ? (Array.isArray(v) ? v : [v]) : []

    return (
      filesArray.length <= props.maxFiles
      || `No more than ${props.maxFiles} files may be uploaded`
    )
  },
  fileTypes: (v: File | File[]) => {
    // Normalize files into any array
    const filesArray: File[] = v ? (Array.isArray(v) ? v : [v]) : []

    // If no files are selected, the rule passes (a separate 'required' rule should handle mandatory selection)
    if (filesArray.length === 0) {
      return true
    }

    // Check if every file's type is included in the acceptedFileTypes
    const allFilesValid = filesArray.every(file =>
      props.acceptedFileTypes.includes(file.type),
    )
    return (
      allFilesValid
      || `File must be of type: ${props.acceptedFileTypes.join(', ')}`
    )
  },
}

function uploadFiles() {
  if (files.value) {
    // Normalize files into any array
    const filesArray: File[] = files.value
      ? Array.isArray(files.value)
        ? files.value
        : [files.value]
      : []

    // Check that the input passes validation
    const filesLength = filesArray.length
    const allFileSizesOk = filesArray.every(
      file => file.size <= maxBytes.value,
    )
    const allFilesValid = filesArray.every(file =>
      props.acceptedFileTypes.includes(file.type),
    )
    if (filesLength <= props.maxFiles && allFileSizesOk && allFilesValid) {
      loading.value = true

      // Get storage refs
      const newFileRefs: Array<string> = []
      filesArray.forEach(async (file) => {
        const filename = filenameToUrl(file.name, props.uniqueFilename)
        const fileRef = storageRef(storage, `${props.uploadPath}/${filename}`)
        newFileRefs.push(fileRef.toString())

        // Upload files
        try {
          await uploadBytes(fileRef, file)
        }
        catch (error: any) {
          let message = ''
          switch (error.code) {
            default:
              message = `${error.code}: ${error.message}`
          }
          errorMessage.value = message
        }
      })

      fileRefs.value = newFileRefs

      loading.value = false
    }
  }
}
</script>

<template>
  <v-file-input
    v-model="files"
    :label="`${xs ? 'Tap' : 'Click'} to upload ${fileTypeLabel}`"
    :rules="[
      maxFiles > 1 ? formRules.requiredArray : formRules.required,
      rules.maxFileSize,
      rules.maxFiles,
      rules.fileTypes,
    ]"
    validate-on="input"
    :accept="acceptedFileTypes.join(', ')"
    prepend-icon=""
    :prepend-inner-icon="mdiCloudUpload"
    :loading
    show-size
    counter
    :multiple="maxFiles > 1"
    chips
    @change="uploadFiles"
  />

  <v-alert
    v-if="errorMessage"
    type="error"
    density="compact"
    variant="plain"
    :icon="false"
  >
    {{ errorMessage }}
  </v-alert>
</template>
