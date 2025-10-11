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

/**
 * Generates a Firebase Console URL for a given project and path.
 *
 * @param projectId The Firebase project ID.
 * @param path An array of strings representing the path within Firestore (e.g., ['collection', 'docId', 'subcollection']).
 * @returns The full URL to the Firebase Console for the specified path.
 */
export function getFirebaseConsoleUrl(
  projectId: string,
  path: string[],
) {
  const firebaseConsoleUrl = `https://console.firebase.google.com/project/${projectId}/firestore/databases/-default-/data/${
    path.length > 0 ? `~2F${path.join('~2F')}` : ''
  }`
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
