<script setup lang="ts">
import { useHead } from '#imports'

// Page info
useHead({
  title: 'Admin - Users',
})
</script>

<template>
  <v-container>
    <!-- User List -->
    <v-row justify="center">
      <v-col cols="12">
        <AdminUsersList />
      </v-col>
    </v-row>
  </v-container>
</template>
