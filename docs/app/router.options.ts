import type { RouterConfig } from '@nuxt/schema'
import { resolve } from 'path'

const types = ['ai-chat', 'seo', 'ai-knowledge-base'] as const
type TutorialType = typeof types[number]

export default {
  routes: (_routes) => {
    const routes = [..._routes]  // Create a new array from _routes

    types.forEach((type: TutorialType) => {
      routes.push({
        name: `tutorials-${type}`,
        path: `/tutorials/${type}`,
        component: () => import('~/pages/tutorials/index.vue').then(r => r.default || r),
        meta: {
          layout: 'tutorials'
        }
      })
    })

    return routes
  }
} satisfies RouterConfig