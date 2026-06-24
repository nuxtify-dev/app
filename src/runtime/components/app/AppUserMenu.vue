<script setup lang="ts">
import { useCurrentUser } from 'vuefire'
import { useNuxtifyConfig, useSignOut } from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
const currentUser = useCurrentUser()
const { signOut } = useSignOut()

const clickSignOut = async () => {
  await signOut()
}
</script>

<template>
  <div>
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
        >
          <v-avatar
            color="primary"
            :size="44"
          >
            <v-img
              v-if="currentUser?.photoURL"
              :src="currentUser.photoURL"
              :alt="currentUser.displayName ?? 'User avatar'"
            />
            <v-icon
              v-else
              icon="mdi-account"
            />
          </v-avatar>
        </v-btn>
      </template>

      <v-list
        nav
        density="compact"
        class="mt-4"
      >
        <v-list-item
          v-for="(link, i) in nuxtifyConfig.navigation?.secondary"
          :key="i"
          :value="link"
          :to="link.to"
          :href="link.href"
          :target="link.href ? '_blank' : undefined"
          :rel="link.href ? 'noopener noreferrer' : undefined"
          slim
        >
          <template #prepend>
            <v-icon :icon="link.icon" />
          </template>

          <v-list-item-title>
            {{ link.text }}
            <v-icon
              v-if="link.openInNew"
              icon="mdi-arrow-top-right"
              size="small"
              color="grey"
              class="ml-1"
            />
          </v-list-item-title>
        </v-list-item>

        <!-- Sign Out -->
        <v-list-item
          slim
          @click.prevent="clickSignOut"
        >
          <template #prepend>
            <v-icon icon="mdi-export" />
          </template>

          <v-list-item-title>Sign Out</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
