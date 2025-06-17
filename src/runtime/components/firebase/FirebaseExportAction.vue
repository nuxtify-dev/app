<script setup lang="ts">
import { Timestamp } from 'firebase/firestore'
import type { ComputedRef } from 'vue'
import { computed, inject } from 'vue'
import { mdiDownload } from '@mdi/js'
import {
  useDialog,
  useSelectedRows,
  pluralize,
  titleCase,
  timestampToISOString,
  downloadCSV,
} from '#imports'

// Props
const props = defineProps({
  formattedData: {
    type: Array,
    required: true,
  },
  name: {
    type: String,
    default: 'item',
  },
  exportFormats: {
    type: Array<string>,
    required: true,
  },
})

// App state
const dialog = useDialog()
const selectedRows = useSelectedRows()

// Component state
const isSelected = computed(() => !!selectedRows.value.length)
const selectedData = computed(() => {
  if (isSelected.value) {
    // Find selected rows
    return selectedRows.value.map(rowId =>
      props.formattedData.find((data: any) => data.id === rowId),
    )
  }
  return props.formattedData
})

// Inject
const exportFilename = inject<ComputedRef<string>>(
  'exportFilename',
  computed(() => 'export'),
)

// Export related functionality
function showExportDialog(exportFormat: string) {
  // Format specific logic
  let exportFunction: () => Promise<void>
  const exportMessageAppend = 'This process may take up to a minute or longer.'
  if (exportFormat === 'CSV') {
    exportFunction = exportCSV
  }
  else {
    // Invalid export format
    return
  }

  // Set dialog values
  dialog.value.title = `Export ${titleCase(props.name)}`
  dialog.value.message = `This will download ${pluralize(
    selectedData.value.length,
    props.name,
    true,
  )} as a ${exportFormat} file. ${exportMessageAppend}`
  dialog.value.action.buttonText = 'Export'
  dialog.value.action.buttonColor = 'secondary'
  dialog.value.action.function = exportFunction

  // Show dialog
  dialog.value.show = true
}

function prepareForExport() {
  // Make a deep copy of the data
  const toExport = JSON.parse(JSON.stringify(selectedData.value))

  toExport.forEach((item: any) => {
    // Convert shard dates to ISO format
    item.created = timestampToISOString(
      new Timestamp(item.created.seconds, item.created.nanoseconds),
    )
    item.lastUpdated = timestampToISOString(
      new Timestamp(item.lastUpdated.seconds, item.lastUpdated.nanoseconds),
    )

    // User
    if (props.name === 'user') {
      item.lastActivity
        = item.lastActivity
          && timestampToISOString(
            new Timestamp(
              item.lastActivity.seconds,
              item.lastActivity.nanoseconds,
            ),
          )

      // Rename id to uid
      item.uid = item.id
    }
  })

  return toExport
}

async function exportCSV() {
  // Hide dialog
  dialog.value.show = false

  // Prepare data
  const toExport = prepareForExport()

  // Delete unused properties
  toExport.forEach((item: any) => {
    delete item.id
  })

  // Export
  downloadCSV(toExport, exportFilename.value)
}
</script>

<template>
  <v-btn
    v-if="selectedData.length"
    variant="text"
    color="gray"
    :prepend-icon="mdiDownload"
  >
    Export

    <v-menu activator="parent">
      <v-list
        nav
        density="compact"
      >
        <v-list-item
          v-for="exportFormat in exportFormats"
          :key="exportFormat"
          @click="showExportDialog(exportFormat)"
        >
          <v-list-item-title>Download as {{ exportFormat }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-btn>
</template>
