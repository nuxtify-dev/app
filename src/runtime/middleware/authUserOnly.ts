import { getCurrentUser } from 'vuefire'
import { defineNuxtRouteMiddleware, navigateTo, useSelectedRows } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  const currentUser = await getCurrentUser()

  // Redirect to the login page if the user is not signed in
  if (!currentUser) {
    return navigateTo({
      path: '/signin',
      query: {
        redirect: to.fullPath,
      },
    })
  }

  // Reset row state
  const selectedRows = useSelectedRows()
  selectedRows.value = []
})
