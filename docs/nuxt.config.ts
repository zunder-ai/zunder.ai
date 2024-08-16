import { createResolver } from '@nuxt/kit'
import colors from 'tailwindcss/colors'
import module from '../src/module'
import { excludeColors } from '../src/runtime/utils/colors'
import pkg from '../package.json'

const { resolve } = createResolver(import.meta.url)

export default defineNuxtConfig({

  devtools: {
    enabled: true
  },

  // @ts-ignore
  extends: ['@nuxt/ui-pro'],
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/ui',
    'nuxt-og-image',
    module,
    '@nuxtjs/plausible',
    '@vueuse/nuxt',
    'nuxt-component-meta',
    'modules/content-examples-code'
  ],

  plausible: {
    // Prevent tracking on localhost
    ignoredHostnames: ['localhost']
  },

  runtimeConfig: {
    public: {
      version: pkg.version
    }
  },

  ui: {
    global: true,
    safelistColors: excludeColors(colors)
  },

  content: {
    highlight: {
      langs: ['postcss', 'mdc']
    }
    // sources: {
      // dev: {
      //   prefix: "/dev",
      //   driver: "fs",
      //   base: resolve("./content"),
      // },
      // overwrite default source AKA `content` directory
      // content: {
      //   driver: "github",
      //   repo: "nuxt/ui",
      //   branch: "main",
      //   dir: "docs/content",
      // }
    // },
  },

  image: {
    provider: 'ipx'
  },

  nitro: {
    prerender: {
      routes: [
        '/',
        '/getting-started'
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

  routeRules: {
    '/components': { redirect: '/components/chat-input', prerender: false }
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
  },

  typescript: {
    strict: false
  },

  site: {
    url: 'https://zunder.ai'
  },

  vite: {
    optimizeDeps: {
      include: ['date-fns']
    }
  },

  compatibilityDate: '2024-07-23'
})
