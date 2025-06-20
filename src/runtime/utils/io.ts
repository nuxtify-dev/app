import { saveAs } from 'file-saver'
import { stringify } from 'csv-stringify/browser/esm/sync'

/**
 * Converts an array of data into a CSV string and initiates a download.
 */
export function downloadCSV(data: unknown[], filename = 'export') {
  // Convert to CSV
  const csv = stringify(data, {
    header: true,
  })

  // Download File
  const blob = new Blob([csv], {
    type: 'text/plain;charset=utf-8',
  })
  saveAs(blob, `${filename}.csv`)
}
