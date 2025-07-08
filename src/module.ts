import { defu } from 'defu'
import {
  addComponentsDir,
  addImportsDir,
  addLayout,
  addRouteMiddleware,
  createResolver,
  defineNuxtModule,
  extendPages,
  installModule,
  useLogger,
  extendRouteRules,
} from '@nuxt/kit'
import { name, version } from '../package.json'
import type { ModuleOptions } from './types/module'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'nuxtifyApp',
    compatibility: {
      nuxt: '>=3.16.0',
    },
  },
  defaults: {
    // Brand
    brand: {
      name,
    },

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
  async setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)
    const logger = useLogger('Nuxtify App')

    // Warn if SSR
    if (_nuxt.options.ssr) {
      logger.warn('[Nuxtify App]', 'Not compatible with SSR. For the most reliable experience, please set `ssr: false` in your nuxt.config.ts.')
      _nuxt.options.ssr = false
    }

    // Expose module options to app config
    _nuxt.options.appConfig.nuxtify = defu(_nuxt.options.appConfig.nuxtify, {
      ..._options,
    })

    // Modules
    await installModule('@nuxtify/core', {
      verboseLogs: _options.verboseLogs,
    })
    await installModule('nuxt-vuefire', {
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
    })

    // Components
    addComponentsDir({
      path: resolver.resolve('./runtime/components'),
    })

    // Composables
    addImportsDir(resolver.resolve('./runtime/composables'))

    // Utils
    addImportsDir(resolver.resolve('./runtime/utils'))

    // Middleware
    addRouteMiddleware({
      name: 'auth-public',
      path: resolver.resolve('./runtime/middleware/authPublic'),
    }, { prepend: true })
    addRouteMiddleware({
      name: 'auth-user-only',
      path: resolver.resolve('./runtime/middleware/authUserOnly'),
    }, { prepend: true })
    addRouteMiddleware({
      name: 'auth-super-admin-only',
      path: resolver.resolve('./runtime/middleware/authSuperAdminOnly'),
    }, { prepend: true })

    // Route rules
    extendRouteRules('/', {
      appMiddleware: ['auth-user-only'],
    })
    extendRouteRules('/account/**', {
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
        src: resolver.resolve('./runtime/layouts/DefaultLayout.vue'),
      },
      'default',
    )
    addLayout(
      {
        src: resolver.resolve('./runtime/layouts/PublicLayout.vue'),
      },
      'public',
    )
    addLayout(
      {
        src: resolver.resolve('./runtime/layouts/SignupLayout.vue'),
      },
      'signup',
    )

    // Pages
    extendPages((pages) => {
      // Index
      pages.unshift({
        name: 'index',
        path: '/',
        file: resolver.resolve('./runtime/pages/IndexPage.vue'),
      })

      // Sign In
      pages.unshift({
        name: 'signin',
        path: '/signin',
        file: resolver.resolve('./runtime/pages/SignIn.vue'),
      })

      // Sign Up
      pages.unshift({
        name: 'signup',
        path: '/signup',
        file: resolver.resolve('./runtime/pages/SignUp.vue'),
      })

      // Account
      pages.unshift({
        name: 'account',
        path: '/account',
        file: resolver.resolve('./runtime/pages/AccountPage.vue'),
      })

      // Admin
      pages.unshift({
        name: 'admin',
        path: '/admin',
        file: resolver.resolve('./runtime/pages/admin/AdminIndex.vue'),
      })
      pages.unshift({
        name: 'admin-users',
        path: '/admin/users',
        file: resolver.resolve('./runtime/pages/admin/users/UsersIndex.vue'),
      })
      pages.unshift({
        name: 'admin-users-uid',
        path: '/admin/users/:uid',
        file: resolver.resolve('./runtime/pages/admin/users/[uid]/UserIndex.vue'),
      })
    })

    // Public
    _nuxt.hook('nitro:config', async (nitroConfig) => {
      nitroConfig.publicAssets ||= []
      nitroConfig.publicAssets.push({
        dir: resolver.resolve('./runtime/public'),
        maxAge: 60 * 60 * 24 * 365, // 1 year
      })
    })

    // Remove duplicate imports (to suppress Nuxt warnings)
    _nuxt.hook('imports:extend', (imports) => {
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
        if (_options.verboseLogs)
          logger.info('[Nuxtify App]',
            'Intentionally overriding useNuxtifyConfig from @nuxtify/core.',
          )
      }
    })
  },
})
