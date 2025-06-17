<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import { useHead } from '#imports'

// App state
const currentUser = useCurrentUser()

// Page info
useHead({
  title: 'Home',
})
</script>

<template>
  <v-container>
    <v-row class="my-md-4">
      <v-col cols="12">
        Hello {{ currentUser?.displayName }}
      </v-col>
    </v-row>
  </v-container>
</template>
