<script setup lang="ts">
import { doc, updateDoc } from 'firebase/firestore'
import type { VForm } from 'vuetify/components'
import { computed, ref } from 'vue'
import { useFirestore } from 'vuefire'
import { useUserDoc, useErrorMessage, useToast, formRules, usersColName } from '#imports'

// App state
const db = useFirestore()
const userDoc = useUserDoc()
const errorMessage = useErrorMessage()
const toast = useToast()

// Component state
const userDocRef = computed(
  () => userDoc.value && doc(db, usersColName, userDoc.value.id),
)
const form = ref<VForm>()
const loading = ref(false)

// Functions
const submitForm = async () => {
  // Check if the form is valid
  const res = await form.value?.validate()
  if (!res?.valid) {
    return
  }

  loading.value = true

  // Save to Firebase
  try {
    if (userDocRef.value) {
      await updateDoc(userDocRef.value, {
        firstName: userDoc.value?.firstName.trim(),
        lastName: userDoc.value?.lastName.trim(),
      })
    }
  }
  catch (error: any) {
    let message = ''
    switch (error.code) {
      default:
        message = `${error.code}: ${error.message}`
    }
    errorMessage.value = message
  }

  loading.value = false

  // Toast
  toast.value.message = 'Account settings saved!'
  toast.value.show = true
}
</script>

<template>
  <div>
    <h2 class="text-h5 mb-2">
      Account
    </h2>
    <v-card
      v-if="userDoc"
      class="px-4 pb-4"
    >
      <v-list>
        <v-list-item>
          <v-list-item-subtitle class="text-caption">
            Email
          </v-list-item-subtitle>
          <v-list-item-title>{{ userDoc.email }}</v-list-item-title>
        </v-list-item>
      </v-list>

      <v-form
        ref="form"
        validate-on="blur"
        :disabled="loading"
        @submit.prevent="submitForm"
      >
        <v-text-field
          v-model="userDoc.firstName"
          label="First Name"
          :rules="[formRules.maxLength30]"
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          class="mb-4"
        />

        <v-text-field
          v-model="userDoc.lastName"
          label="Last Name"
          :rules="[formRules.maxLength30]"
          hide-details="auto"
          variant="outlined"
          density="comfortable"
          class="mb-4"
        />

        <v-btn
          :disabled="!form"
          :loading="loading"
          size="large"
          block
          type="submit"
        >
          Save
        </v-btn>

        <v-alert
          v-if="errorMessage"
          type="error"
          density="compact"
          variant="plain"
          :icon="false"
          class="mt-4"
        >
          {{ errorMessage }}
        </v-alert>
      </v-form>
    </v-card>
  </div>
</template>
