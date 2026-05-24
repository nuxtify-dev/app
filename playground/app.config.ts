import {
  mdiAccountCog,
  mdiAccountMultiple,
  mdiAccountPlus,
  mdiCog,
  mdiCommentQuote,
  mdiFirebase,
  mdiForum,
  mdiHome,
  mdiLifebuoy,
  mdiLogin,
  mdiStar,
  mdiTelevisionPlay,
  mdiViewDashboard,
} from '@mdi/js'

export default defineAppConfig({
  nuxtify: {
    // Brand
    brand: {
      logo: {
        lightUrl: '/img/nuxtify-logo-light.png',
        darkUrl: '/img/nuxtify-logo-dark.png',
      },
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
          text: 'Features',
          to: '/features',
          icon: mdiStar,
        },
        {
          text: 'Config',
          to: '/config',
          icon: mdiCog,
        },
        {
          text: 'Firebase',
          to: '/firebase',
          icon: mdiFirebase,
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
      // Help menu
      altPrimary: [
        {
          title: '',
          links: [
            {
              text: 'Getting Started',
              href: '/signup/complete',
              icon: mdiTelevisionPlay,
            },
          ],
        },
        {
          title: 'GET IN TOUCH',
          links: [
            {
              text: 'Join Our Community',
              href: '/community',
              icon: mdiForum,
              openInNew: true,
            },
            {
              text: 'Help & Support',
              to: '/support',
              icon: mdiLifebuoy,
            },
            {
              text: 'Leave A Review',
              to: '/review',
              icon: mdiCommentQuote,
            },
          ],
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
