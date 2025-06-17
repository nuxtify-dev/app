import saveAs from 'file-saver'
import { unparse } from 'papaparse'

export function downloadCSV(data: unknown[], filename = 'export') {
  // Convert to CSV
  const csv = unparse(data)

  // Download File
  const blob = new Blob([csv], {
    type: 'text/plain;charset=utf-8',
  })
  saveAs(blob, `${filename}.csv`)
}
