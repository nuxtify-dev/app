import type { ModuleOptions as CoreModuleOptions } from '@nuxtify/core'

// Extend core types
type CoreNavigationOptions = NonNullable<CoreModuleOptions['navigation']>
type Link = NonNullable<
  NonNullable<CoreModuleOptions['navigation']>['primary']
>[number]
interface Navigation extends CoreNavigationOptions {
  admin?: Link[]
}

// Providers interface
interface Providers {
  password?: {
    enabled?: boolean
  }
  google?: {
    enabled?: boolean
  }
}

// App interface
interface AppModuleOptions {
  auth?: {
    adminDomain?: string
    providers?: Providers
  }

  // Navigation
  navigation?: Navigation
}

export type ModuleOptions = Omit<CoreModuleOptions, keyof AppModuleOptions> &
  AppModuleOptions
