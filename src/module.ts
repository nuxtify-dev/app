import {
  addComponentsDir,
  addImportsDir,
  addLayout,
  addRouteMiddleware,
  createResolver,
  defineNuxtModule,
  extendPages,
  useLogger,
  extendRouteRules,
} from '@nuxt/kit'
import { defu } from 'defu'
import { name, version } from '../package.json'
import type { ModuleOptions } from './types/module'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'nuxtifyApp',
    compatibility: {
      nuxt: '>=4.0.0',
    },
  },
  moduleDependencies: {
    '@nuxtify/core': {
      version: '>=0.8.0',
    },
    'nuxt-vuefire': {
      version: '>=1.1.2',
      defaults: {
        config: {
          apiKey: '',
          authDomain: '',
          projectId: '',
          storageBucket: '',
          messagingSenderId: '',
          appId: '',
          measurementId: '',
        },
        auth: true,
        appCheck: {
          debug: process.env.NODE_ENV !== 'production',
          isTokenAutoRefreshEnabled: true,
          provider: 'ReCaptchaEnterprise',
          key: '',
        },
      },
    },
  },
  defaults: {
    // Auth
    auth: {
      providers: {
        password: {
          enabled: true,
        },
        google: {
          enabled: true,
        },
      },
    },

    // Navigation
    navigation: {
      admin: [],
    },
  },
  async setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const logger = useLogger('nuxtify-app')

    // Warn if SSR
    if (nuxt.options.ssr) {
      logger.warn('Not compatible with SSR. For the most reliable experience, please set `ssr: false` in your nuxt.config.ts.')
      nuxt.options.ssr = false
    }

    // Expose module options to app config
    nuxt.options.appConfig.nuxtify = defu(nuxt.options.appConfig.nuxtify, {
      ...options,
    })

    // Components
    addComponentsDir({
      path: resolve('./runtime/components'),
    })

    // Composables
    addImportsDir(resolve('./runtime/composables'))
    addImportsDir(resolve('./runtime/composables/firebase'))

    // Utils
    addImportsDir(resolve('./runtime/utils'))

    // Middleware
    addRouteMiddleware({
      name: 'auth-public',
      path: resolve('./runtime/middleware/authPublic'),
    }, { prepend: true })
    addRouteMiddleware({
      name: 'auth-user-only',
      path: resolve('./runtime/middleware/authUserOnly'),
    }, { prepend: true })
    addRouteMiddleware({
      name: 'auth-super-admin-only',
      path: resolve('./runtime/middleware/authSuperAdminOnly'),
    }, { prepend: true })

    // Route rules
    extendRouteRules('/**', {
      appMiddleware: ['auth-user-only'],
    })
    extendRouteRules('/signin', {
      appMiddleware: ['auth-public'],
    })
    extendRouteRules('/signup', {
      appMiddleware: ['auth-public'],
    })
    extendRouteRules('/admin/**', {
      appMiddleware: ['auth-super-admin-only'],
    })

    // Layouts
    addLayout(
      {
        src: resolve('./runtime/layouts/DefaultLayout.vue'),
      },
      'default',
    )
    addLayout(
      {
        src: resolve('./runtime/layouts/PublicLayout.vue'),
      },
      'public',
    )
    addLayout(
      {
        src: resolve('./runtime/layouts/SignupLayout.vue'),
      },
      'signup',
    )

    // Pages
    extendPages((pages) => {
      // Index
      pages.unshift({
        name: 'index',
        path: '/',
        file: resolve('./runtime/pages/IndexPage.vue'),
      })

      // Sign In
      pages.unshift({
        name: 'signin',
        path: '/signin',
        file: resolve('./runtime/pages/SignIn.vue'),
        meta: { auth: false },
      })

      // Sign Up
      pages.unshift({
        name: 'signup',
        path: '/signup',
        file: resolve('./runtime/pages/SignUp.vue'),
        meta: { auth: false },
      })

      // Sign Out
      pages.unshift({
        name: 'signout',
        path: '/signout',
        file: resolve('./runtime/pages/SignOut.vue'),
        meta: { auth: false },
      })

      // Account
      pages.unshift({
        name: 'account',
        path: '/account',
        file: resolve('./runtime/pages/AccountPage.vue'),
      })

      // Admin
      pages.unshift({
        name: 'admin',
        path: '/admin',
        file: resolve('./runtime/pages/admin/AdminIndex.vue'),
      })
      pages.unshift({
        name: 'admin-users',
        path: '/admin/users',
        file: resolve('./runtime/pages/admin/users/UsersIndex.vue'),
      })
      pages.unshift({
        name: 'admin-users-uid',
        path: '/admin/users/:uid',
        file: resolve('./runtime/pages/admin/users/[uid]/UserIndex.vue'),
      })
    })

    // Public
    nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })
    })

    // Remove duplicate imports (to suppress Nuxt warnings)
    nuxt.hook('imports:extend', (imports) => {
      // Find and remove the 'useNuxtifyConfig' import that comes from '@nuxtify/core'
      const coreImportIndex = imports.findIndex((imp) => {
        // The 'name' property refers to the exported name of the composable.
        // The 'from' property is the path to the source file.
        return (
          (imp.as || imp.name) === 'useNuxtifyConfig'
          && imp.from.includes('@nuxtify/core')
        )
      })

      if (coreImportIndex > -1) {
        imports.splice(coreImportIndex, 1)
        if (options.verboseLogs)
          logger.info('Intentionally overriding useNuxtifyConfig from @nuxtify/core.')
      }
    })
  },
})
