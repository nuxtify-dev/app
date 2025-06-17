import type { ModuleOptions } from '../../types/module'
import { useAppConfig } from '#imports'

export const useNuxtifyConfig = (): ModuleOptions => useAppConfig().nuxtify
