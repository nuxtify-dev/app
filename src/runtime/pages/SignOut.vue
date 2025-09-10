<script setup lang="ts">
import { useSignOut } from '#imports'

// STATE - GLOBAL
const { signOut } = useSignOut()

await signOut()
</script>

<template>
  <p>Signing out...</p>
</template>
