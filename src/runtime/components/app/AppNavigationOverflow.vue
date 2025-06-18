<script setup lang="ts">
import { mdiDotsVertical, mdiArrowTopRight } from '@mdi/js'
import { useNuxtifyConfig } from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
</script>

<template>
  <div v-if="nuxtifyConfig.navigation?.altSecondary?.length">
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          v-bind="props"
          :icon="mdiDotsVertical"
          color="grey-darken-3"
          aria-label="Overflow menu"
        />
      </template>

      <v-card
        class="mt-2"
        style="max-width: 250px;"
      >
        <!-- Minor Navigation -->
        <v-list
          nav
          density="compact"
          aria-label="Overflow navigation"
        >
          <v-list-item
            v-for="(link, i) in nuxtifyConfig.navigation?.altSecondary"
            :key="i"
            :value="link"
            :to="link.to"
            :href="link.href"
            :target="link.href ? '_blank' : undefined"
            :rel="link.href ? 'noopener noreferrer' : undefined"
            slim
          >
            <v-list-item-title>
              {{ link.text }}
              <v-icon
                v-if="link.openInNew"
                :icon="mdiArrowTopRight"
                size="small"
                color="grey"
                class="ml-1"
              />
            </v-list-item-title>
          </v-list-item>
        </v-list>

        <!-- Credits -->
        <AppCredits class="text-medium-emphasis px-4 pb-4" />
      </v-card>
    </v-menu>
  </div>
</template>
