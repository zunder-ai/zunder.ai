import { createResolver } from '@nuxt/kit'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/global.css'],

  // @ts-ignore
  extends: ['@nuxt/ui-pro', '@zunderai/ui'],
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-og-image',
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    'nuxt-component-meta',
    'modules/content-examples-code',
    '@nuxtjs/sitemap'
  ],

  site: {
    url: 'https://zunder.ai',
    name: 'zunder.ai',
    defaultLocale: 'en'
  },

  plausible: {
    // Prevent tracking on localhost
    ignoredHostnames: ['localhost']
  },

  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },

  sitemap: {
    sources: [ '/api/__sitemap__/urls'
    ]
  },

  content: {
    navigation: {
      fields: ['tags']
    },
    highlight: {
      langs: ['postcss', 'mdc']
    },
    sources: {
      // @TODO Remove this or change it to github
      content: {
        driver: 'fs',
        prefix: '/docs',
        base: resolve(__dirname, 'content/docs')
      },
      guide: {
        driver: 'fs',
        prefix: '/tutorials',
        base: resolve(__dirname, 'content/tutorials')
      }
    }
  },

  image: {
    provider: 'ipx'
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        '/docs/getting-started'
        // '/api/search.json'
        // '/api/releases.json',
        // '/api/pulls.json'
      ],
      ignore:
        !process.env.NUXT_UI_PRO_PATH && !process.env.NUXT_GITHUB_TOKEN
          ? ['/pro']
          : []
    }
  },

  // routes: (_routes) => [
  //   {
  //     name: 'tutorials-category',
  //     path: '/tutorials/ai-chat',
  //     component: () => import('~/pages/tutorials/index.vue').then(r => r.default || r)
  //   }
  // ],



  routeRules: {
    '/docs': { redirect: '/docs/getting-started/introduction', prerender: false },
    '/docs/getting-started': { redirect: '/docs/getting-started/introduction', prerender: false },
    '/docs/components': { redirect: '/docs/components/chat-input', prerender: false }
    // '/dev/components': {
    //   redirect: '/dev/components/accordion',
    //   prerender: false
    // }
  },

  componentMeta: {
    exclude: [
      '@nuxt/content',
      '@nuxt/ui-templates',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      '@nuxt/ui',
      '@nuxt/ui-pro',
      'nuxt/dist',
      'nuxt-og-image',
      'nuxt-site-config',
      resolve('./components'),
      process.env.NUXT_UI_PRO_PATH
        ? resolve(process.env.NUXT_UI_PRO_PATH, '.docs', 'components')
        : '.c12'
    ],
    metaFields: {
      type: false,
      props: true,
      slots: true,
      events: false,
      exposed: false
    }
  },

  // cloudflareAnalytics: {
  //   token: "",
  //   scriptPath: false,
  // },

  hooks: {
    // Related to https://github.com/nuxt/nuxt/pull/22558
    'components:extend': (components) => {
      components.forEach((component) => {
        if (
          component.shortPath.includes('@nuxt/ui-pro')
        ) {
          component.global = true
        } else if (component.global) {
          component.global = 'sync'
        }
      })
    }
    // 'pages:extend': (pages) => {
    //   const types = ['ai-chat', 'seo', 'ai-knowledge-base']

    //   types.forEach((type) =>
    //     pages.push({
    //       name: `tags-${type}`,
    //       path: `/tutorials/${type}`,
    //       file: resolve(__dirname, 'pages/tutorials/index.vue')
    //     })
    //   )
    // }
  },

  typescript: {
    strict: false
  },

  vite: {
    optimizeDeps: {
      include: ['date-fns']
    }
  },

  compatibilityDate: '2024-07-23'
})