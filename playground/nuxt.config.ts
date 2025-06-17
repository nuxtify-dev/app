import { mdiAccountMultiple, mdiViewDashboard } from '@mdi/js'

export default defineNuxtConfig({
  modules: ['../src/module'],
  devtools: { enabled: true },
  compatibilityDate: '2025-06-16',
  nuxtifyApp: {
    // Logs
    verboseLogs: true,

    // Brand
    brand: {
      tagline: 'This is a sample tagline for the app module.',
    },

    // Email
    email: {
      general: 'hello@nuxtify.dev',
      support: 'support@nuxtify.dev',
    },

    // Navigation
    navigation: {
      admin: [
        {
          text: 'Dashboard',
          to: '/admin',
          icon: mdiViewDashboard,
        },
        {
          text: 'Users',
          to: '/admin/users',
          icon: mdiAccountMultiple,
        },
      ],
    },
  },
})
