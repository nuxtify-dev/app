import { signOut } from 'firebase/auth'
import { useFirebaseAuth, useFirebaseStorage } from 'vuefire'
import { navigateTo } from '#imports'

export const useSignOut = async (redirectTo = '/signin') => {
  // App state
  const auth = useFirebaseAuth()!

  // Sign out from Firebase Auth
  await signOut(auth)

  // Redirect
  navigateTo(redirectTo)
}

export const usePublicStorageUrl = (fileRef: string, lastUpdated?: number | string) => {
  // Constructs a public download URL
  // @fileRef: gs:// formatted Firebase Storage URI
  // Requires allow read storage security rules.
  // Note: Enforcing AppCheck for Storage breaks this.
  // See: https://stackoverflow.com/questions/58443123/firebase-storage-using-download-url-instead-of-storage-ref

  // Example: https://firebasestorage.googleapis.com/v0/b/elora2.appspot.com/o/meditations%2Fimages%2F5yef40JTKEU8VzwcYLH4.webp?alt=media

  // Return an empty string if the fileRef is invalid to prevent errors
  if (!fileRef || !fileRef.startsWith('gs://')) {
    return ''
  }

  // Firebase
  const storage = useFirebaseStorage()

  // Construct URL
  const bucketName = storage.app.options.storageBucket
  const filePath = fileRef.split(`gs://${bucketName}/`)[1]
  let publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(
    filePath,
  )}?alt=media`

  if (lastUpdated) {
    publicUrl += `&v=${lastUpdated}`
  }

  return publicUrl
}
