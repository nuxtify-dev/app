<script setup lang="ts">
import { useNuxtifyConfig } from '#imports'

// STATE - GLOBAL
const nuxtifyConfig = useNuxtifyConfig()
</script>

<template>
  <div class="text-center text-caption text-medium-emphasis mb-6">
    By continuing, you acknowledge that you've read and agree to our
    <a
      :href="`https://${nuxtifyConfig.brand?.domain}/terms`"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary text-decoration-none"
    >
      Terms</a> and <a
      :href="`https://${nuxtifyConfig.brand?.domain}/privacy`"
      target="_blank"
      rel="noopener noreferrer"
      class="text-primary text-decoration-none"
    >
      Privacy Policy</a>.
  </div>
</template>
