import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // Override default Vuetify options
  nuxtApp.hook('vuetify:before-create', ({ vuetifyOptions }) => {
    vuetifyOptions.defaults = {
      VNavigationDrawer: { floating: true },
    }
  })
})
