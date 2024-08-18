<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <ULandingHero :ui="{ base: 'relative z-[1]', container: 'max-w-4xl', title: 'font-medium tracking-[-4px]' }" class="mb-[calc(var(--header-height)*2)]">
      <template #headline>
        <UBadge
          variant="subtle"
          size="md"
          class="hover:bg-primary-100 dark:bg-primary-950/100 dark:hover:bg-primary-900 transition-color relative font-medium rounded-full shadow-none"
        >
          <NuxtLink
            :to="`https://github.com/regenrek/zunder-ui/releases/tag/v${config.version}`"
            target="_blank"
            class="focus:outline-none"
            aria-label="Go to last relase"
            tabindex="-1"
          >
            <span class="absolute inset-0" aria-hidden="true" />
          </NuxtLink>

          <span class="flex items-center gap-1">
            Try Zunder UI Alpha v{{ config.version }} for free
          </span>
        </UBadge>
      </template>

      <template #title>
        <span>A library for building AI Web Apps fast</span>
      </template>

      <template #description>
        <span>Zunder is a Nuxt UI compatible Library for building AI Apps, powered by Vue & Tailwind CSS</span>
      </template>

      <template #links>
        <UButton
          label="Get Started"
          trailing-icon="i-heroicons-arrow-right-20-solid"
          size="lg"
          to="/docs/getting-started/installation"
        />

        <UInput
          v-model="source"
          color="gray"
          readonly
          autocomplete="off"
          icon="i-heroicons-command-line"
          class="w-72"
          input-class="focus:ring-1 focus:ring-gray-300 dark:focus:ring-gray-700"
          aria-label="Install @zunderai/ui"
          size="lg"
          :ui="{ icon: { trailing: { pointer: '' } } }"
        >
          <template #trailing>
            <UButton
              aria-label="Copy Code"
              :color="copied ? 'primary' : 'gray'"
              variant="link"
              size="2xs"
              :icon="copied ? 'i-heroicons-clipboard-document-check' : 'i-heroicons-clipboard-document'"
              @click="copy(source)"
            />
          </template>
        </UInput>
      </template>
    </ULandingHero>
  </div>
</template>

<script setup lang="ts">
import { useElementBounding, useWindowScroll } from '@vueuse/core'
const route = useRoute()

// const { data: page } = await useAsyncData('index', () => queryContent('/dev').findOne())

useSeoMeta({
  titleTemplate: '',
  title: 'ZUNDER AI - Build smarter, launch faster, and make your AI web apps a reality.',
  ogTitle: 'ZUNDER AI - Build smarter, launch faster, and make your AI web apps a reality.',
  description: 'Build and launch AI web apps quickly with ease. Ignite your ideas, create efficiently, and go live faster. Perfect for startups and developers looking to accelerate their AI app development.',
  ogDescription: 'Build and launch AI web apps quickly with ease. Ignite your ideas, create efficiently, and go live faster. Perfect for startups and developers looking to accelerate their AI app development.',
  ogImage: 'https://zunder.ai/social-card.png',
  twitterImage: 'https://zunder.ai/social-card.png'
})


const links = computed(() => {
  return [{
    label: 'Docs',
    icon: 'i-heroicons-book-open',
    to: '/docs/getting-started/installation',
    active: (route.path.startsWith('/docs/getting-started') || route.path.startsWith('/docs/components'))
  }].filter(Boolean)
})


const source = ref('pnpm add @zunderai/ui')
const sectionRef = ref()
const start = ref(0)

const { top } = useElementBounding(sectionRef)
const { y } = useWindowScroll()
const config = useRuntimeConfig().public
const { copy, copied } = useClipboard({ source })

// Hooks

onMounted(() => {
  setTimeout(() => {
    start.value = top.value + y.value
  }, 100)
})
</script>

<style scoped lang="postcss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

._screen_xl {
  display: none;
}

@media (min-width: 1280px) and (min-height: 955px) {
  ._screen_xl {
    display: block;
  }

  ._not_screen_xl {
    display: none;
  }
}
</style>
