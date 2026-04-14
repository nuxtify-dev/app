import { getCurrentUser } from 'vuefire'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const currentUser = await getCurrentUser()

  // Redirect if the user is already signed in
  if (currentUser) {
    const redirect = to.query.redirect as string | undefined
    return navigateTo(redirect || '/')
  }
})
