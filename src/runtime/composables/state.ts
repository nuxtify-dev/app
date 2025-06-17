import { useState } from '#imports'

// App
export const useSelectedRows = () =>
  useState<Array<string>>('selectedRows', () => [])
