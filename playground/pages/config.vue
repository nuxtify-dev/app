<script setup lang="ts">
// STATE - GLOBAL
const nuxtifyConfig = useNuxtifyConfig()

// PAGE INFO
useSeoMeta({
  title: `Config - ${nuxtifyConfig.brand?.name} playground`,
  description: `Showcase of Nuxtify Config in ${nuxtifyConfig.brand?.name}.`,
})
</script>

<template>
  <DemoConfig class="py-8" />
</template>
