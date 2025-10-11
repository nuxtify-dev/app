<script setup lang="ts">
import type { CollectionReference } from 'firebase/firestore'
import { mdiMagnify, mdiAccount, mdiArrowTopRight } from '@mdi/js'
import { computed, ref } from 'vue'
import type { PropType } from 'vue'
import {
  useSelectedRows,
  pluralize,
  titleCase,
  navigateTo,
  fullName,
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
      <span class="text-h5 mt-1">{{ titleCase(namePlural) }}</span>

      <FirebaseListActions
        v-if="!disableCreate || exportFormats.length || !disableDelete"
        :formatted-data="formattedData"
        :root-url="rootUrl"
        :col-ref="colRef"
        :name="name"
        :disable-create="disableCreate"
        :export-formats="exportFormats"
        :disable-delete="disableDelete"
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
        :headers="headers"
        :sort-by="sortBy"
        :items="formattedData"
        :search="search"
        :items-per-page="25"
        :show-select="!disableSelect"
        :hover="!disableClick"
        @click:row="clickAction"
      >
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

        <!-- User slots -->
        <template
          v-if="name === 'user'"
          #item.photoURL="{ item }"
        >
          <v-avatar color="primary">
            <v-img
              v-if="item.photoURL"
              :src="item.photoURL"
              :alt="fullName(item.firstName, item.lastName) ?? 'User avatar'"
            />
            <v-icon
              v-else
              :icon="mdiAccount"
            />
          </v-avatar>
        </template>
        <template
          v-if="name === 'user'"
          #item.name="{ item }"
        >
          <NuxtLink :to="`/admin/users/${item.id}`">{{
            item.name || '(blank)'
          }}</NuxtLink>
        </template>
        <template #item.signupCompleted="{ item }">
          {{ formatDate(item.signupCompleted.toDate(), { type: 'datetime' }) }}
        </template>
        <template #item.firstActivity="{ item }">
          {{ formatDate(item.firstActivity.toDate(), { type: 'datetime' }) }}
        </template>
        <template #item.lastActivity="{ item }">
          {{ formatDate(item.lastActivity.toDate(), { type: 'datetime' }) }}
        </template>
        <template #item.subscribed="{ item }">
          {{ formatDate(item.subscribed.toDate(), { type: 'datetime' }) }}
        </template>

        <!-- Shared slots -->
        <template #item.created="{ item }">
          {{ formatDate(item.created.toDate(), { type: 'datetime' }) }}
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
