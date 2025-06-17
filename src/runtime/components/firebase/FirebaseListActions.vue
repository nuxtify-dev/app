<script setup lang="ts">
import type { CollectionReference } from 'firebase/firestore'
import { mdiClockPlus, mdiPlus } from '@mdi/js'
import { computed } from 'vue'
import type { PropType } from 'vue'
import { useErrorMessage, titleCase } from '#imports'

// Props
const props = defineProps({
  formattedData: {
    type: Array,
    required: true,
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
    default: 'item',
  },
  disableCreate: {
    type: Boolean,
    default: false,
  },
  disableDelete: {
    type: Boolean,
    default: false,
  },
  exportFormats: {
    type: Array<string>,
    default: [],
  },
})

// App state
const errorMessage = useErrorMessage()

// Create related functionality
const createIcon = computed(() => {
  switch (props.name) {
    case 'activity':
      return mdiClockPlus
    default:
      return mdiPlus
  }
})
</script>

<template>
  <div class="d-print-none">
    <v-alert
      v-if="errorMessage"
      type="error"
      density="compact"
      class="mb-4"
    >
      {{ errorMessage }}
    </v-alert>

    <!-- Delete -->
    <LazyFirebaseDeleteAction
      v-if="!disableDelete"
      :formatted-data="formattedData"
      :name="name"
      :col-ref="colRef"
    />

    <!-- Export -->
    <LazyFirebaseExportAction
      v-if="exportFormats.length"
      :formatted-data="formattedData"
      :export-formats="exportFormats"
      :name="name"
      class="ml-sm-2"
    />

    <!-- New -->
    <v-btn
      v-if="!disableCreate"
      :to="`${rootUrl}/new`"
      :prepend-icon="createIcon"
      class="ml-sm-2"
    >
      New {{ titleCase(name) }}
    </v-btn>
  </div>
</template>
