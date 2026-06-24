export default defineAppConfig({
  nuxtify: {
    // Brand
    brand: {
      name: '@nuxtify/app',
      tagline: 'This is a sample tagline for the @nuxtify/app module.',
      logo: {
        lightUrl: '/img/nuxtify-logo-light.png',
        darkUrl: '/img/nuxtify-logo-dark.png',
        width: 200,
        height: 40,
      },
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
          icon: 'mdi-home',
        },
        {
          text: 'Features',
          to: '/features',
          icon: 'mdi-star',
        },
        {
          text: 'Config',
          to: '/config',
          icon: 'mdi-cog',
        },
        {
          text: 'Firebase',
          to: '/firebase',
          icon: 'mdi-firebase',
        },
        {
          text: 'Sign In',
          to: '/signin',
          icon: 'mdi-login',
        },
        {
          text: 'Sign Up',
          to: '/signup',
          icon: 'mdi-account-plus',
        },
      ],
      // User menu
      secondary: [
        {
          text: 'Account',
          to: '/account',
          icon: 'mdi-account-cog',
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
              icon: 'mdi-television-play',
            },
          ],
        },
        {
          title: 'GET IN TOUCH',
          links: [
            {
              text: 'Join Our Community',
              href: '/community',
              icon: 'mdi-forum',
              openInNew: true,
            },
            {
              text: 'Help & Support',
              to: '/support',
              icon: 'mdi-lifebuoy',
            },
            {
              text: 'Leave A Review',
              to: '/review',
              icon: 'mdi-comment-quote',
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
          icon: 'mdi-view-dashboard',
        },
        {
          text: 'Users',
          to: '/admin/users',
          icon: 'mdi-account-multiple',
        },
      ],
    },

    // Announcement
    announcement: {
      show: true,
      chipText: 'News',
      message: 'This is a site wide announcement!',
      buttonText: 'Click me',
      buttonUrl: 'https://nuxtify.dev/',
      exclude: ['/privacy', '/terms'],
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
