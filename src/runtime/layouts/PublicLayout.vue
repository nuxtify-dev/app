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

    <AppAnnouncementBar v-if="nuxtifyConfig.announcement?.show" />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<style>
.hover-link {
  text-decoration: none;
}
.hover-link:hover {
  text-decoration: underline;
}
</style>
