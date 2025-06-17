<script setup lang="ts">
// App state
const nuxtifyConfig = useNuxtifyConfig()

// Page info
useSeoMeta({
  title: 'Test',
})
</script>

<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>
          This is a test page that overrides the default dynamic page layout.
        </h1>

        <div class="mt-4">
          This is the site tagline: <em>{{ nuxtifyConfig.brand?.tagline }}</em>
        </div>

        <v-btn class="mt-4">
          Test Button
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
