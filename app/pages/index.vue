<!-- eslint-disable vue/no-v-html -->
<template>
  <div>
    <ULandingHero :ui="{ wrapper: 'py-12 sm:pt-16 sm:pb-8 mb-0', base: 'relative z-[1]', container: 'max-w-4xl', title: 'font-medium font-heading tracking-[-4px]' }">
      <template #headline>
        <UBadge
          variant="subtle"
          size="md"
          class="hover:bg-primary-100 dark:bg-primary-950/100 dark:hover:bg-primary-900 transition-color relative font-medium rounded-full shadow-none"
        >
          <NuxtLink
            :to="`https://github.com/zunder-ai/ui/releases/tag/v${config.version}`"
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
    <UContainer :ui="{ padding: 'pb-12 sm:pb-16' }">
      <ULandingGrid>
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-swatch"
          title="Complete Starter Kit"
          description="Get a fully equipped Nuxt.js boilerplate with pre-built UI components to jumpstart your AI web app."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-heroicons-wrench-screwdriver"
          title="Customizable Components"
          description="Easily modify the appearance and behavior of every component through simple configurations."
        />
        <ULandingCard
          class="col-span-6 row-span-4"
          icon="i-heroicons-face-smile"
          title="Out-of-the-Box LLM Support"
          description="Seamlessly integrate multiple LLMs like OpenAI, Claude, and Ollama into your app."
        />
        <ULandingCard
          class="col-span-6 row-span-2"
          icon="i-heroicons-computer-desktop"
          title="Pre-built API and Dashboard"
          description="Includes a fully coded server API and a customizable dashboard with sidebar for easy project management."
        />
      </ULandingGrid>
    </UContainer>
    <!-- <ULandingSection :ui="{ wrapper: 'py-12 sm:py-16' }">
      <TablePricing :blok="blokPricing" />
    </ULandingSection> -->
  </div>
</template>

<script setup lang="ts">
import { useElementBounding, useWindowScroll } from '@vueuse/core'

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


// const links = computed(() => {
//   return [{
//     label: 'Docs',
//     icon: 'i-heroicons-book-open',
//     to: '/docs/getting-started/installation',
//     active: (route.path.startsWith('/docs/getting-started') || route.path.startsWith('/docs/components'))
//   }].filter(Boolean)
// })

const blokPricing = ref({
  title: 'Pricing',
  description: 'Choose the plan that fits your needs',
  items: [
    // {
    //   title: 'Free',
    //   description: 'Open Source chat app starter to build your own AI web app',
    //   price: '0€',
    //   monthlyPrice: '0€',
    //   isMonthlyPrice: false,
    //   cancellationText: ' ',
    //   features: [
    //     { title: 'Simple Chat Logic with OpenAI' },
    //     { title: 'Basic Chat Interface Customization' },
    //     { title: 'Community Support' }
    //   ],
    //   button: { label: 'Get Started', action: 'modal' }
    // },
    {
      title: 'Starter',
      description: 'Professional AI Starter Kit to ship your AI web app fast',
      cancellationText: '1 year of free updates',
      price: '99€',
      originalPrice: '249€',
      monthlyPrice: '99€',
      isMonthlyPrice: false,
      isPresale: true,
      saleEndDate: '2024-09-14',
      features: [
        { title: 'Everything in Free' },
        { title: 'Supports multiple LLMs (OpenAI, Claude, Ollama)' },
        { title: 'Fully coded Server API' },
        { title: 'Demo apps & Dashboard with Sidebar' },
        { title: 'Rate limits' },
        { title: 'Support & 1 year of updates' }
      ],
      button: { label: 'Preorder Now', action: 'redirect', href: 'https://macherjek.lemonsqueezy.com/buy/70015d0a-f665-4fe8-bf67-312071121bc3' }
    },
    {
      title: 'Enterprise',
      description: 'Custom AI solutions for your business needs',
      cancellationText: 'A zunder.ai SaaS deployment',
      price: 'From 10k',
      monthlyPrice: 'Custom',
      isMonthlyPrice: false,
      features: [
        { title: 'Everything in Starter' },
        { title: 'Zunder AI SaaS setup installed for you' },
        { title: 'Custom implementations' },
        { title: 'Managed deployments' },
        { title: 'Personalized 1-on-1 consulting' }
      ],
      button: { label: 'Contact Us', action: 'email' }
    }
  ],
  itemsSubscription: []
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