import { signOut as firebaseSignOut } from 'firebase/auth'
import { useFirebaseAuth } from 'vuefire'
import { navigateTo } from '#imports'

export const useSignOut = () => {
  // App state
  const auth = useFirebaseAuth()

  const signOut = async (redirectTo = '/signin') => {
    // Sign out from Firebase Auth
    if (auth) await firebaseSignOut(auth)

    // Redirect
    await navigateTo(redirectTo)
  }

  return {
    signOut,
  }
}
