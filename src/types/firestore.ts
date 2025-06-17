import type { Timestamp } from 'firebase/firestore'

interface Doc {
  id: string
  created: Timestamp
  lastUpdated: Timestamp
}

export interface UserDoc extends Doc {
  lastActivity: Timestamp
  disabled: boolean
  email: string
  firstName: string
  lastName: string
  photoURL: string | null
}
