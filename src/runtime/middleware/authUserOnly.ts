import { getCurrentUser } from 'vuefire'
import { defineNuxtRouteMiddleware, navigateTo, useSelectedRows } from '#imports'

export default defineNuxtRouteMiddleware(async (to) => {
  // Skip if the route is public
  if (to.meta.auth === false) {
    return
  }

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
