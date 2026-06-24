<script setup lang="ts">
import { useHead, useRouteParam } from '#imports'

// PAGE INFO
useHead({
  title: 'Admin - User Detail',
})

// ROUTE INFO
const uid = useRouteParam('uid')
</script>

<template>
  <v-container>
    <AdminUsersDetail :uid />
  </v-container>
</template>
