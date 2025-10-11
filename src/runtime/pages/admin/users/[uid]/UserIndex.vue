<script setup lang="ts">
import { useHead, useRoute } from '#imports'

// PAGE INFO
useHead({
  title: 'Admin - User Detail',
})

// ROUTE INFO
const route = useRoute()
const uid = route.params.uid as string

// Breadcrumbs
const breadcrumbs = [
  {
    title: 'Users',
    disabled: false,
    to: `/admin/users`,
  },
  {
    title: 'User Detail',
  },
]
</script>

<template>
  <v-container>
    <!-- Breadcrumbs -->
    <v-breadcrumbs
      :items="breadcrumbs"
      class="text-secondary ml-n4"
    />

    <AdminUsersDetail :uid />
  </v-container>
</template>
