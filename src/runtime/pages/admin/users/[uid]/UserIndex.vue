<script setup lang="ts">
import { useHead, useRoute } from '#imports'

// PAGE INFO
useHead({
  title: 'Admin - User Detail',
})

// ROUTE INFO
const route = useRoute()
const uid = route.params.uid as string
</script>

<template>
  <v-container>
    <AdminUsersDetail :uid />
  </v-container>
</template>
