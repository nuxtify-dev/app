<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import { useDrawer, useSignOut } from '#imports'

// STATE - GLOBAL
const { xs } = useDisplay()
const drawer = useDrawer()
const { signOut } = useSignOut()

// ROUTE
const route = useRoute()
const isSigningUp = computed(() => route.meta.layout === 'signup')

const clickSignOut = async () => {
  await signOut()
}
</script>

<template>
  <v-app-bar
    :density="xs ? 'comfortable' : 'default'"
    border="b-thin"
    flat
  >
    <v-app-bar-nav-icon
      v-if="xs && !isSigningUp"
      @click="drawer = !drawer"
    />

    <NuxtLink
      :to="isSigningUp ? undefined : '/'"
      class="mx-sm-4"
    >
      <AppLogo />
    </NuxtLink>

    <template #append>
      <!-- Help menu -->
      <AppHelpMenu
        v-if="!isSigningUp"
        class="mr-2"
      />

      <!-- User menu -->
      <v-btn
        v-if="isSigningUp"
        variant="plain"
        @click.prevent="clickSignOut"
      >
        Sign Out
      </v-btn>
      <AppUserMenu
        v-else
        class="mr-2"
      />

      <!-- Navigation overflow -->
      <AppNavigationOverflow />
    </template>
  </v-app-bar>
</template>
