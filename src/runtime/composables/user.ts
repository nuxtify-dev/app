import type { UserDoc } from '../../types/firestore'
import { useState } from '#imports'

export const useUserDoc = () =>
  useState<UserDoc | null>('userDoc', () => {
    return null
  })
