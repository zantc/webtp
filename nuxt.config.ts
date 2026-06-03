export default defineNuxtConfig({
  modules: ['@pinia/nuxt', 'nuxt-particles'],
  runtimeConfig: {
    apiSecret: '123456',
    jwtSecret: process.env.JWT_SECRET || 'secret-key',
    public: {
      apiBase: '/api'
    },
  },
  css: [
    '~/assets/css/main.scss',
  ],
  components: [
    '~/components',
  ],
  typescript: {
    strict: true,
    typeCheck: true,
    shim: false
  },
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Đại Mỗ 360',
      meta: [
        { name: 'description', content: 'Trang thông tin Văn hóa, du lịch, sự kiện,... Phường Đại Mỗ Thành Phố Hà Nội' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { property: 'og:title', content: 'Đại Mỗ 360' },
        { property: 'og:description', content: 'Trang thông tin Văn hóa, du lịch, sự kiện,... Phường Đại Mỗ Thành Phố Hà Nội' },
        { property: 'og:image', content: '/images/Logo.png' },
        { property: 'og:image:alt', content: 'Hình ảnh Đại Mỗ 360' },
        { property: 'og:image:width', content: '900' },
        { property: 'og:image:height', content: '603' },
        { property: 'og:url', content: '/' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'Tây Hồ 360' },
        { property: 'fb:admins', content: '' },
        { property: 'fb:app_id', content: '1695746487308818' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Đại Mỗ 360' },
        { name: 'twitter:description', content: 'Trang thông tin Văn hóa, du lịch, sự kiện,... Phường Đại Mỗ Thành Phố Hà Nội' },
        { name: 'twitter:image', content: '/images/Logo.png' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/Logo.png' }
      ]
    }
  },
  generate: {
    routes: ['/']
  },
})