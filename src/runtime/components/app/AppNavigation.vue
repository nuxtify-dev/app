<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useCurrentUser } from 'vuefire'
import { mdiArrowTopRight } from '@mdi/js'
import { useNuxtifyConfig, useDrawer, isSuperAdmin } from '#imports'

// App state
const nuxtifyConfig = useNuxtifyConfig()

// App state
const currentUser = useCurrentUser()
const { xs } = useDisplay()
const drawer = useDrawer()

// Component state
const isExpanded = ref(false)
</script>

<template>
  <v-navigation-drawer
    v-model="drawer"
    :expand-on-hover="!xs"
    :rail="!xs"
    :permanent="!xs"
    floating
    @update:rail="isExpanded = !isExpanded"
  >
    <nav>
      <v-list
        nav
        base-color="grey-darken-3"
        aria-label="Primary navigation"
      >
        <v-list-item
          v-for="(link, i) in nuxtifyConfig.navigation?.primary"
          :key="i"
          :to="link.to"
          :href="link.href"
          :target="link.href ? '_blank' : undefined"
          :rel="link.href ? 'noopener noreferrer' : undefined"
          :aria-label="link.text"
          slim
          exact
        >
          <template #prepend>
            <v-icon :icon="link.icon" />
          </template>

          <v-list-item-title class="text-subtitle-1 font-weight-bold py-1">
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

        <!-- Admin menu -->
        <template
          v-if="
            (xs || isExpanded)
              && nuxtifyConfig.navigation?.admin?.length
              && isSuperAdmin(currentUser, nuxtifyConfig.auth?.adminDomain ?? '')
          "
        >
          <v-list-subheader class="text-subtitle-2 font-weight-bold">
            {{ xs || isExpanded ? 'ADMIN' : '' }}
          </v-list-subheader>

          <v-list-item
            v-for="(link, i) in nuxtifyConfig.navigation?.admin"
            :key="i"
            :to="link.to"
            :href="link.href"
            :target="link.href ? '_blank' : undefined"
            :rel="link.href ? 'noopener noreferrer' : undefined"
            :aria-label="link.text"
            slim
            exact
          >
            <template #prepend>
              <v-icon :icon="link.icon" />
            </template>

            <v-list-item-title class="text-subtitle-1 font-weight-bold py-1">
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
        </template>
      </v-list>
    </nav>
  </v-navigation-drawer>
</template>

<style scoped>
:deep(.v-list-item__prepend > .v-icon) {
  opacity: 1;
}
</style>
