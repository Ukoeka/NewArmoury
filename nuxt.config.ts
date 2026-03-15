export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      // In production, NUXT_PUBLIC_API_BASE must be set to the full backend URL (https://...)
      apiBase: process.env.NUXT_PUBLIC_API_BASE ?? 'http://localhost:5000',
      appName: process.env.APP_NAME ?? 'Tactical Armoury System',
    },
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vee-validate/zod',
        'vee-validate',
        'zod',
        'vue3-apexcharts',
        '@vueuse/core',
        'lucide-vue-next',
        'vue-sonner',
        'clsx',
        'tailwind-merge',
      ]
    }
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/icon',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  colorMode: {
    classSuffix: '',
    preference: 'dark',
  },
  pinia: {
    storesDirs: ['./stores/**', './custom-folder/stores/**'],
  },
})