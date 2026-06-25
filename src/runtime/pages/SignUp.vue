<script setup lang="ts">
import { FirebaseError } from 'firebase/app'
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from 'firebase/auth'
import type { VForm } from 'vuetify/components'
import { useDisplay } from 'vuetify'
import { useFirebaseAuth } from 'vuefire'
import { ref } from 'vue'
import {
  useNuxtifyConfig,
  useErrorMessage,
  formRules,
  addArticle,
  definePageMeta,
  useSeoMeta,
  navigateTo,
  useRoute,
} from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
const route = useRoute()
const { xs } = useDisplay()
const errorMessage = useErrorMessage()

// Page info
definePageMeta({
  layout: 'public',
})
useSeoMeta({
  title: 'Sign Up',
  description: `Sign up for ${nuxtifyConfig.brand?.name}.`,
})

// Form state
const form = ref<VForm>()
const loading = ref(false)
const email = ref('')
const password = ref('')
const showPassword = ref(false)

// Firebase
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
    await createUserWithEmailAndPassword(auth, email.value, password.value)

    // Redirect
    const redirect = route.query.redirect as string | undefined
    navigateTo(redirect || '/')
  }
  catch (error) {
    let message = 'An unexpected error occurred.'

    if (error instanceof FirebaseError) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          message = 'Email already exists.'
          break
        case 'auth/invalid-email':
          message = 'Invalid email address.'
          break
        case 'auth/invalid-password':
          message = 'Invalid password.'
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
    await signInWithPopup(auth, googleProvider)

    // Redirect
    const redirect = route.query.redirect as string | undefined
    navigateTo(redirect || '/')
  }
  else {
    // Doesn't work on localhost
    signInWithRedirect(auth, googleProvider)
  }
}
</script>

<template>
  <v-container class="fill-height">
    <v-row
      :align="xs ? undefined : 'center'"
      justify="center"
      class="fill-height"
    >
      <v-col
        cols="12"
        sm="6"
        xl="3"
      >
        <!-- Logo and Tagline -->
        <div class="d-flex align-center">
          <!-- Logo and Tagline -->
          <AppLogo
            :width="xs
              ? Math.round(nuxtifyConfig.brand?.logo.mobileWidth * 1.5)
              : Math.round(nuxtifyConfig.brand?.logo.width * 2)"
            :height="xs
              ? Math.round(nuxtifyConfig.brand?.logo.mobileHeight * 1.5)
              : Math.round(nuxtifyConfig.brand?.logo.height * 2)"
            class="mx-auto mx-sm-0"
          />
        </div>
        <div class="text-center text-sm-left text-subtitle-1 text-sm-h5 mt-4">
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
            Sign up in seconds
          </h1>
          <div class="text-center text-subtitle-2 text-medium-emphasis mb-6">
            Already have {{ addArticle(nuxtifyConfig.brand?.name) }} account?
            <NuxtLink
              to="/signin"
              class="text-secondary text-decoration-none"
            >
              Sign in
            </NuxtLink>
          </div>

          <!-- Google -->
          <v-btn
            v-if="nuxtifyConfig.auth?.providers?.google?.enabled"
            variant="outlined"
            color="default"
            size="large"
            block
            @click.prevent="signinWithGoogle"
          >
            <v-img
              src="/img/google-logo.png"
              width="20"
            />
            <span class="ml-2">Continue With Google</span>
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
              hint="Create a strong password that you don't use for other websites"
              :rules="[formRules.required, formRules.minLength8]"
              :counter="form?.items[1]?.isValid === false ? true : undefined"
              :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              minlength="8"
              required
              class="mb-4"
              @click:append-inner="showPassword = !showPassword"
            />

            <!-- Legal -->
            <SignUpLegal />

            <!-- Submit -->
            <v-btn
              :disabled="!form"
              :loading="loading"
              block
              size="large"
              type="submit"
            >
              Get Started
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
