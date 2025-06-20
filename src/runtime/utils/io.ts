import { stringify } from 'csv-stringify/browser/esm/sync'

/**
 * Converts an array of data into a CSV string and initiates a download.
 */
export function downloadCSV(data: unknown[], filename = 'export') {
  // Convert to CSV
  const csv = stringify(data, {
    header: true,
  })

  // Create a Blob from the CSV string
  const blob = new Blob([csv], {
    type: 'text/plain;charset=utf-8',
  })

  // Trigger the download
  saveBlobAsFile(blob, `${filename}.csv`)
}

/**
 * Triggers a browser download for a Blob object.
 */
export function saveBlobAsFile(blob: Blob, filename: string) {
  // Create a temporary URL for the Blob
  const url = URL.createObjectURL(blob)

  // Create a temporary <a> element to trigger the download
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()

  // Clean up
  // The timeout ensures the download starts before the URL is revoked
  setTimeout(() => {
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }, 100)
}
