import { getDownloadURL, ref as storageRef } from 'firebase/storage'
import { useFirebaseStorage } from 'vuefire'

/**
 * Get the http version of a Firebase Storage URL.
 *
 * @param gsUrl Should be formatted as gs://...
 * @param version
 * @returns Downloadable URL (https://)
 */
export const useFirebaseStorageURL = async (gsUrl: string, version?: string): Promise<string> => {
  // Firebase
  const storage = useFirebaseStorage()

  // Get URL
  const fileRef = storageRef(storage, gsUrl)
  const storageUrl = await getDownloadURL(fileRef)
  let fileUrl = storageUrl

  if (version) {
    fileUrl += `&v=${version}`
  }

  return fileUrl
}
