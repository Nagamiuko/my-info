export default defineNuxtConfig({
  compatibilityDate: '2025-12-01',
  modules: ['@nuxt/icon'],
  icon: {
    clientBundle: {
      scan: true,
    },
  },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      htmlAttrs: { lang: 'th' },
      title: 'Phutthisan Kongkha | Portfolio',
      meta: [
        { name: 'description', content: 'โปรไฟล์ของนักพัฒนาเว็บ (Frontend Developer)' },
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/vite.svg',
        },
      ],
    },
  },
  typescript: {
    strict: true,
  },
})