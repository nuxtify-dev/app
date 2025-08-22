import type { User } from 'firebase/auth'
import type { Timestamp } from 'firebase/firestore'

// Collection names
export const usersColName = 'users'

// Utility functions

// This is only designed to hide parts of the UI and prevent navigation.
// Data access must be blocked via Firestore rules!
export function isSuperAdmin(
  currentUser: User | null | undefined,
  domain: string,
) {
  if (currentUser) {
    const googleProvider = currentUser.providerData.find(
      provider => provider.providerId === 'google.com',
    )

    if (googleProvider?.email) {
      const regex = new RegExp(`[a-zA-Z0-9+._-]+@${domain}$`)
      return !!googleProvider.email.match(regex)
    }
  }

  return false
}

export function getFirebaseConsoleUrl(
  projectId: string,
  collectionName: string,
  documentId?: string,
) {
  let firebaseConsoleUrl = 'https://console.firebase.google.com'
  firebaseConsoleUrl += `/project/${projectId}/firestore/databases/-default-/data/~2F${collectionName}`

  if (documentId) {
    firebaseConsoleUrl += `~2F${documentId}`
  }

  return firebaseConsoleUrl
}

export function timestampToISOString(
  timestamp: Timestamp,
  defaultString = '-',
) {
  if (timestamp && timestamp.seconds) {
    return timestamp.toDate().toISOString() || defaultString
  }
  else {
    return defaultString
  }
}
