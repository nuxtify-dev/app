<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import {
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import type { VForm } from 'vuetify/components'
import { useDisplay } from 'vuetify'
import { useFirebaseAuth, useFirebaseApp } from 'vuefire'
import { mdiEye, mdiEyeOff } from '@mdi/js'
import { ref } from 'vue'
import {
  useNuxtifyConfig,
  useErrorMessage,
  formRules,
  addArticle,
  definePageMeta,
  useSeoMeta,
  navigateTo,
} from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
const { xs } = useDisplay()
const errorMessage = useErrorMessage()

// Page info
definePageMeta({
  layout: 'public',
})
useSeoMeta({
  title: 'Sign In',
  description: `Sign in to ${nuxtifyConfig.brand?.name}.`,
})

// Form state
const form = ref<VForm>()
const loading = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const passwordResetMessage = ref('')

// Firebase
const firebaseApp = useFirebaseApp()
const auth = useFirebaseAuth()
const googleProvider = new GoogleAuthProvider()

async function submitForm() {
  // Check if the form is valid
  const res = await form.value?.validate()
  if (!res?.valid) {
    return
  }

  loading.value = true

  // Firebase auth logic
  if (!auth) {
    console.log(
      `[${nuxtifyConfig.brand?.name}] Firebase auth provider not found.`,
    )
    return
  }
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)

    // Redirect
    navigateTo('/')
  }
  catch (error) {
    let message = 'An unexpected error occurred.'

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/user-not-found':
          message = 'Error: User not found.'
          break
        case 'auth/wrong-password':
          message = 'Error: Incorrect password.'
          break
        default:
          message = `${error.code}: ${error.message}`
      }
    }
    else if (error instanceof Error) {
      message = `Error: ${error.message}`
    }

    errorMessage.value = message
  }

  loading.value = false
}

async function forgotPassword() {
  const emailErrorMessage = 'Please provide a valid email address.'

  // Check if the form is valid
  if (form.value?.items[0].isValid) {
    // Firebase auth logic
    if (!auth) {
      console.log(
        `[${nuxtifyConfig.brand?.name}] Firebase auth provider not found.`,
      )
      return
    }
    try {
      await sendPasswordResetEmail(auth, email.value, {
        url: `https://${firebaseApp.options.authDomain}/signin`,
      })
      errorMessage.value = ''
      passwordResetMessage.value = 'Password reset email sent!'
    }
    catch (error) {
      let message = 'An unexpected error occurred.'

      if (error instanceof FirebaseError) {
        switch (error.code) {
          case 'auth/missing-email':
            message = emailErrorMessage
            break
          case 'auth/invalid-email':
            message = emailErrorMessage
            break
          default:
            message = `Firebase error: ${error.code} - ${error.message}`
        }
      }
      else if (error instanceof Error) {
        message = `Error: ${error.message}`
      }

      errorMessage.value = message
      passwordResetMessage.value = ''
    }
  }
  else {
    errorMessage.value = emailErrorMessage
  }
}

async function signinWithGoogle() {
  // Firebase auth logic
  if (!auth) {
    console.warn(
      `[${nuxtifyConfig.brand?.name}] Firebase auth provider not found.`,
    )
    return
  }
  if (import.meta.dev) {
    // Use this with localhost, still might need to refresh or manually update address bar
    signInWithPopup(auth, googleProvider)
  }
  else {
    // Doesn't work on localhost
    signInWithRedirect(auth, googleProvider)
  }
}
</script>

<template>
  <v-container class="py-0">
    <v-row
      align="center"
      justify="center"
      class="h-screen"
    >
      <v-col
        cols="12"
        sm="6"
        xl="3"
      >
        <!-- Logo and Tagline -->
        <AppLogo
          :width="xs ? 200 : 250"
          class="mx-auto mx-sm-0"
        />
        <div class="text-center text-sm-left text-h6 text-sm-h5 mt-4">
          {{ nuxtifyConfig.brand?.tagline }}
        </div>
      </v-col>
      <v-col
        cols="12"
        sm="6"
        xl="3"
      >
        <v-card
          class="mx-auto px-6 py-8"
          max-width="344"
          elevation="8"
        >
          <!-- Heading -->
          <h1 class="text-center text-h5 mb-2">
            Sign in to your account
          </h1>
          <div class="text-center text-subtitle-2 text-medium-emphasis mb-6">
            Don't have {{ addArticle(nuxtifyConfig.brand?.name) }} account?
            <NuxtLink
              to="/signup"
              class="text-secondary text-decoration-none"
            >
              Sign up
            </NuxtLink>
          </div>

          <!-- Google -->
          <v-btn
            v-if="nuxtifyConfig.auth?.providers?.google?.enabled"
            variant="outlined"
            color="default"
            :size="xs ? 'default' : 'large'"
            block
            @click.prevent="signinWithGoogle"
          >
            <v-img
              src="/img/google-logo.png"
              width="20"
            />
            <span class="ml-2">Sign In With Google</span>
          </v-btn>

          <!-- Divider -->
          <div
            v-if="
              nuxtifyConfig.auth?.providers?.google?.enabled
                && nuxtifyConfig.auth?.providers?.password?.enabled
            "
            class="d-flex py-6"
          >
            <v-divider class="my-2 mr-4" />
            <span class="text-subtitle-2 text-medium-emphasis">OR</span>
            <v-divider class="my-2 ml-4" />
          </div>

          <!-- Error message -->
          <AppError class="mb-2" />

          <v-alert
            v-if="passwordResetMessage"
            type="success"
            density="compact"
            variant="text"
            class="mb-2 mt-n6 px-0"
          >
            {{ passwordResetMessage }}
          </v-alert>

          <!-- Password -->
          <v-form
            v-if="nuxtifyConfig.auth?.providers?.password?.enabled"
            ref="form"
            validate-on="blur"
            :disabled="loading"
            @submit.prevent="submitForm"
          >
            <v-text-field
              v-model="email"
              type="email"
              label="Email"
              :rules="[formRules.required, formRules.validEmail]"
              hide-details="auto"
              required
              class="mb-4"
            />

            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              :rules="[formRules.required]"
              :counter="form?.items[1].isValid === false ? true : undefined"
              :append-inner-icon="showPassword ? mdiEye : mdiEyeOff"
              hide-details="auto"
              minlength="12"
              required
              @click:append-inner="showPassword = !showPassword"
            />

            <!-- Forgot password -->
            <a
              href="#"
              class="text-caption text-secondary text-decoration-none float-right mt-1 mb-4 px-0"
              @click.prevent="forgotPassword"
            >
              Forgot password?
            </a>

            <br>

            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              size="large"
              type="submit"
            >
              Sign In
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
