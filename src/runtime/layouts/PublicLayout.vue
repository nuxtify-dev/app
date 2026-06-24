<script setup lang="ts">
import { useNuxtifyConfig, useNuxtifySiteTitle } from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()

// Page info
useNuxtifySiteTitle()
</script>

<template>
  <v-app>
    <!-- Accessibility -->
    <NuxtRouteAnnouncer />

    <AppAnnouncement v-if="nuxtifyConfig.announcement?.show" />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<style>
.link-hover {
  text-decoration: none;
}
.link-hover:hover {
  text-decoration: underline;
}
</style>
