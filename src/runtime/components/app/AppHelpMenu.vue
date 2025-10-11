<script setup lang="ts">
import { mdiHelpCircleOutline, mdiArrowTopRight } from '@mdi/js'
import { useNuxtifyConfig } from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()
</script>

<template>
  <div v-if="nuxtifyConfig.navigation?.altPrimary?.length">
    <v-menu>
      <template #activator="{ props }">
        <v-btn
          :icon="mdiHelpCircleOutline"
          v-bind="props"
          color="primary"
        />
      </template>

      <v-list
        nav
        density="compact"
        class="mt-4"
      >
        <div
          v-for="group in nuxtifyConfig.navigation?.altPrimary"
          :key="group.title"
        >
          <v-list-subheader v-if="group.title">
            {{ group.title }}
          </v-list-subheader>

          <v-list-item
            v-for="(link, i) in group.links"
            :key="i"
            :to="link.to"
            :href="link.href"
            :target="link.href ? '_blank' : undefined"
            :rel="link.href ? 'noopener noreferrer' : undefined"
            exact
            color="secondary"
          >
            <template #prepend>
              <v-icon :icon="link.icon" />
            </template>

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
        </div>
      </v-list>
    </v-menu>
  </div>
</template>
