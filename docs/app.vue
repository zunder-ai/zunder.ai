<!-- eslint-disable vue/no-v-html -->
<template>
  <div ref="backgroundRef">
    <NuxtLoadingIndicator />

    <ClientOnly>
      <HomeAbstractRaycast />
      <HomeSparks :container-ref="backgroundRef" />
    </ClientOnly>

    <Banner v-if="!$route.path.startsWith('/examples')" />

    <Header v-if="!$route.path.startsWith('/examples')" :links="links" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Footer v-if="!$route.path.startsWith('/examples')" />

    <ClientOnly>
      <LazyUContentSearch
        ref="searchRef"
        :files="files"
        :navigation="navigation"
        :links="links"
        :fuse="{ resultLimit: 42 }"
      />
    </ClientOnly>

    <UNotifications>
      <template #title="{ title }">
        <span v-html="title" />
      </template>
    </UNotifications>
    <UModals />
    <USlideovers />
  </div>
</template>

<script setup lang="ts">
import { withoutTrailingSlash } from 'ufo'
import { debounce } from 'perfect-debounce'
import type { ParsedContent } from '@nuxt/content'
const backgroundRef = ref<HTMLElement | null>(null)

const searchRef = ref()

const route = useRoute()
const colorMode = useColorMode()

const { data: nav } = await useAsyncData('navigation', () => fetchContentNavigation())
const { data: files } = useLazyFetch<ParsedContent[]>('/api/search.json', { default: () => [], server: false })

// Computed
const navigation = computed(() => {
  return nav.value?.filter(item => item._path !== '/dev') || []
})

const color = computed(() => colorMode.value === 'dark' ? '#18181b' : 'white')

const links = computed(() => {
  return [{
    label: 'Docs',
    icon: 'i-heroicons-book-open',
    to: '/docs/getting-started',
    active: (route.path.startsWith('/docs/getting-started') || route.path.startsWith('/docs/components'))
  }].filter(Boolean)
})

// Watch

watch(() => searchRef.value?.commandPaletteRef?.query, debounce((query: string) => {
  if (!query) {
    return
  }

  useTrackEvent('Search', { props: { query: `${query} - ${searchRef.value?.commandPaletteRef.results.length} results` } })
}, 500))

// Head

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' },
    { rel: 'canonical', href: `https://zunder.ai${withoutTrailingSlash(route.path)}` }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useServerSeoMeta({
  ogSiteName: 'Zunder',
  twitterCard: 'summary_large_image'
})

// Provide

provide('navigation', navigation)
provide('files', files)
</script>