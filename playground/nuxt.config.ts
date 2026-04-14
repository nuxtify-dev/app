export default defineNuxtConfig({
  modules: ['../src/module'],
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-06-16',
  nuxtifyApp: {
    verboseLogs: true,
  },
})
