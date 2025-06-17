import { getCurrentUser } from 'vuefire'
import { defineNuxtRouteMiddleware, navigateTo } from '#imports'

export default defineNuxtRouteMiddleware(async () => {
  const currentUser = await getCurrentUser()

  // redirect the user to the home page
  // if the user is already signed in
  if (currentUser) {
    return navigateTo({ path: '/' })
  }
})
