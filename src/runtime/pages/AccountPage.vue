<script setup lang="ts">
import { useHead } from '#imports'

// Page info
useHead({
  title: 'Account',
})
</script>

<template>
  <v-container>
    <!-- User settings -->
    <v-row>
      <v-col
        cols="12"
        md="6"
        xl="3"
        offset-md="3"
        offset-xl="4"
      >
        <AccountUserSettings />
      </v-col>
    </v-row>
  </v-container>
</template>
