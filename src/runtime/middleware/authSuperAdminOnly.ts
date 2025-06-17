import { getCurrentUser } from 'vuefire'
import { defineNuxtRouteMiddleware, navigateTo, useNuxtifyConfig, isSuperAdmin } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  // App state
  const nuxtifyConfig = useNuxtifyConfig()
  const currentUser = await getCurrentUser()

  // Redirect the user to the home page
  if (!isSuperAdmin(currentUser, nuxtifyConfig.auth?.adminDomain ?? '')) {
    return navigateTo({
      path: '/signin',
      query: {
        redirect: to.fullPath,
      },
    })
  }
})
