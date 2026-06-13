<script setup lang="ts">
import type { CollectionReference } from 'firebase/firestore'
import { mdiMagnify, mdiArrowTopRight } from '@mdi/js'
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import {
  useSelectedRows,
  pluralize,
  titleCase,
  navigateTo,
  formatDate,
} from '#imports'

// Types
type GenericObject = { [key: string]: any }
type SortItem = {
  key: string
  order?: boolean | 'asc' | 'desc'
}

// Props
const props = defineProps({
  formattedData: {
    type: Array<GenericObject>,
    required: true,
  },
  headers: {
    type: Array<GenericObject>,
    required: true,
  },
  sortBy: {
    type: Array<SortItem>,
    default: undefined,
  },
  itemsPerPage: {
    type: Number,
    default: 25,
  },
  colRef: {
    type: Object as PropType<CollectionReference>,
    default: undefined,
  },
  rootUrl: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  disableCreate: {
    type: Boolean,
    default: false,
  },
  disableDelete: {
    type: Boolean,
    default: false,
  },
  disableSelect: {
    type: Boolean,
    default: false,
  },
  disableSearch: {
    type: Boolean,
    default: false,
  },
  disableClick: {
    type: Boolean,
    default: false,
  },
  hideBottom: {
    type: Boolean,
    default: false,
  },
  createSlug: {
    type: String,
    default: undefined,
  },
  exportFormats: {
    type: Array<string>,
    default: [],
  },
  itemAction: {
    type: Function,
    default: () => '',
  },
  searchGroups: {
    type: Array as PropType<{
      title: string
      items: string[]
    }[]>,
    default: () => [],
  },
})

// App state
const selectedRows = useSelectedRows()

// Component state
const search = ref('')
const namePlural = computed(() =>
  pluralize(props.formattedData.length, props.name, false),
)
const clickAction = computed(() => (props.disableClick ? undefined : viewItem))

// Handle click
const viewItem = (pointerEvent: PointerEvent, item: any) => {
  navigateTo(`${props.rootUrl}/${item.item.id}`)
}
</script>

<template>
  <div>
    <div class="d-sm-flex justify-space-between mb-4">
      <div class="d-flex align-center mt-1">
        <span class="text-h5">{{ titleCase(namePlural) }}</span>
        <v-chip
          v-if="selectedRows.length"
          class="ml-2"
          color="primary"
          size="small"
        >
          {{ selectedRows.length }} selected
        </v-chip>
      </div>

      <FirebaseListActions
        v-if="!disableCreate || exportFormats.length || !disableDelete"
        :formatted-data
        :root-url
        :col-ref
        :name
        :disable-create
        :create-slug
        :export-formats
        :disable-delete
      />
    </div>

    <v-card flat>
      <!-- Quick search -->
      <QuickSearch
        v-model="search"
        :search-groups
      />

      <!-- Search -->
      <v-text-field
        v-model="search"
        :prepend-inner-icon="mdiMagnify"
        :label="`Filter ${namePlural}`"
        variant="underlined"
        single-line
        hide-details
        clearable
        persistent-clear
        class="mx-4 mb-2"
        :max-width="414"
        @click:clear="search = ''"
      />

      <!-- Data table -->
      <v-data-table
        v-model="selectedRows"
        :headers
        :sort-by
        :items="formattedData"
        :search
        :items-per-page
        :show-select="!disableSelect"
        :hover="!disableClick"
        @click:row="clickAction"
      >
        <!-- Dynamically pass through all slots from parent -->
        <template
          v-for="(_, slotName) in $slots"
          #[slotName]="slotProps"
        >
          <slot
            :name="slotName"
            v-bind="slotProps || {}"
          />
        </template>

        <!-- Firebase slots -->
        <template #item.firestoreConsoleUrl="{ item }">
          <NuxtLink
            :to="item.firestoreConsoleUrl"
            external
            target="_blank"
            rel="noopener noreferrer"
            @click.stop=""
          >
            Open
            <v-icon
              :icon="mdiArrowTopRight"
              size="small"
              color="grey"
              class="mb-1"
            />
          </NuxtLink>
        </template>
        <template #item.cloudStorageConsoleUrl="{ item }">
          <NuxtLink
            v-if="item.cloudStorageConsoleUrl"
            :to="item.cloudStorageConsoleUrl"
            external
            target="_blank"
            rel="noopener noreferrer"
            @click.stop=""
          >
            Open
            <v-icon
              :icon="mdiArrowTopRight"
              size="small"
              color="grey"
              class="mb-1"
            />
          </NuxtLink>
        </template>

        <!-- Shared slots -->
        <template #item.created="{ item }">
          {{ formatDate(item.created.toDate(), { type: 'datetime' }) }}
        </template>
        <template #item.updated="{ item }">
          {{ formatDate(item.updated.toDate(), { type: 'datetime' }) }}
        </template>

        <!-- Bottom slot -->
        <template
          v-if="hideBottom"
          #bottom
        />
      </v-data-table>
    </v-card>
  </div>
</template>

<style lang="css" scoped>
a {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
  text-decoration: none;
}
a:hover {
  color: rgb(var(--v-theme-secondary));
  text-decoration: underline;
}
</style>
