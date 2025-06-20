<script setup lang="ts">
import { mdiChevronUp, mdiChevronDown } from '@mdi/js'
import { ref } from 'vue'
import type { PropType } from 'vue'

// Props
defineProps({
  searchGroups: {
    type: Array as PropType<{
      title: string
      items: string[]
    }[]>,
    default: () => [],
  },
})

// Component state
const search = defineModel<string>({ default: '' })
const showQuickSearch = ref(true)
</script>

<template>
  <div
    v-if="searchGroups.length"
    class="px-4"
  >
    <h2 class="text-subtitle-1 font-weight-bold">
      Quick search

      <span
        class="text-caption text-secondary cursor-pointer ml-2"
        @click="showQuickSearch = !showQuickSearch"
      >
        {{ showQuickSearch ? 'Hide' : 'Show' }}
        <v-icon
          :icon="showQuickSearch ? mdiChevronUp : mdiChevronDown"
        />
      </span>
    </h2>

    <v-expand-transition>
      <div
        v-if="showQuickSearch"
        class="d-flex flex-wrap ga-2"
      >
        <div
          v-for="group in searchGroups"
          :key="group.title"
        >
          <h3 class="text-subtitle-2 text-medium-emphasis">
            {{ group.title }}
          </h3>
          <v-chip-group>
            <v-chip
              v-for="item in group.items"
              :key="item"
              :text="item"
              label
              size="small"
              class="mr-2"
              :variant="search === item ? 'flat' : 'outlined'"
              :color="search === item ? 'secondary' : 'primary'"
              @click="search === item ? search = '' : search = item"
            />
          </v-chip-group>
        </div>
      </div>
    </v-expand-transition>
  </div>
</template>

<style scoped>
:deep(.v-chip__overlay) {
  --v-activated-opacity: 0;
}
</style>
