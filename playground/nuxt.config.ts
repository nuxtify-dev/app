import { mdiAccountMultiple, mdiViewDashboard, mdiHome, mdiFirebase, mdiTestTube, mdiLogin, mdiAccountPlus, mdiAccountCog } from '@mdi/js'

export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: false,
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

    // Auth
    auth: {
      adminDomain: 'nuxtify.dev',
    },

    // Navigation
    navigation: {
      // Main nav
      primary: [
        {
          text: 'Home',
          to: '/',
          icon: mdiHome,
        },
        {
          text: 'Firebase',
          to: '/firebase',
          icon: mdiFirebase,
        },
        {
          text: 'Test',
          to: '/test',
          icon: mdiTestTube,
        },
        {
          text: 'Sign In',
          to: '/signin',
          icon: mdiLogin,
        },
        {
          text: 'Sign Up',
          to: '/signup',
          icon: mdiAccountPlus,
        },
      ],
      // User menu
      secondary: [
        {
          text: 'Account',
          to: '/account',
          icon: mdiAccountCog,
        },
      ],
      // Overflow menu
      altSecondary: [
        {
          text: 'About',
          href: 'https://nuxtify.dev/about',
        },
        {
          text: 'Contact',
          href: 'https://nuxtify.dev/contact',
        },
        {
          text: 'Articles',
          href: 'https://nuxtify.dev/articles',
        },
        {
          text: 'Accessibility',
          href: 'https://nuxtify.dev/accessibility',
        },
        {
          text: 'Privacy',
          href: 'https://nuxtify.dev/privacy',
        },
        {
          text: 'Terms',
          href: 'https://nuxtify.dev/terms',
        },
      ],
      // Admin
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

    // Credits
    credits: {
      creator: {
        name: 'Nuxtify',
        domain: 'nuxtify.dev',
      },
      prependText: 'Made with love by',
      appendText: ' Ship weirdly fast.',
    },
  },
})
