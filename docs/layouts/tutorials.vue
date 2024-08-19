<template>
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UAside :links="links" />
          <UNavigationTree
            v-if="shouldShowNavigation"
            :links="mapContentNavigation(navigation)"
            :default-open="1"
          />
        </template>

        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import { ref, computed, inject } from 'vue'
import { useRoute } from 'vue-router'

const nav = inject<Ref<NavItem[]>>('navigation')
const route = useRoute()

const tagSetup = {
  'ai-chat': {
    icon: 'i-heroicons-chat-bubble-left-right',
    label: 'AI Chat'
  },
  'machine-learning': {
    icon: 'i-heroicons-cpu-chip',
    label: 'Machine Learning'
  },
  'seo': {
    icon: 'i-heroicons-chart-bar',
    label: 'SEO'
  },
  'ai-knowledge-base': {
    icon: 'i-heroicons-book-open',
    label: 'AI Knowledge Base'
  },
  'mobile-app': {
    icon: 'i-heroicons-device-phone-mobile',
    label: 'Mobile App'
  },
  'cloud-computing': {
    icon: 'i-heroicons-cloud',
    label: 'Cloud Computing'
  }
  // Add more tags and their corresponding icons and labels as needed
}

const activeTag = computed(() => {
  const tutorialsNav = nav!.value.find(item => item._path.startsWith('/tutorials'))
  const currentTutorial = tutorialsNav?.children?.find(child => route.path.startsWith(child._path))
  return currentTutorial?.tags?.[0]
})

const isTagRoute = computed(() => {
  return Object.keys(tagSetup).some(tag => route.path === `/tutorials/${tag}`)
})

const shouldShowNavigation = computed(() => {
  return route.path !== '/tutorials' && !isTagRoute.value && activeTag.value
})

const links = computed(() => {
  const baseLinks = [
    {
      label: 'All Tutorials',
      to: '/tutorials',
      icon: 'i-heroicons-book-open',
      active: route.path === '/tutorials'
    }
  ]

  const tutorialChildren = nav!.value.find(item => item._path.startsWith('/tutorials'))?.children || []
  const categories = tutorialChildren.reduce((acc, child) => {
    child.tags?.forEach(tag => {
      if (tagSetup[tag] && !acc.includes(tag)) {
        acc.push(tag)
      }
    })
    return acc
  }, [] as string[])

  const categoryLinks = categories.map(category => ({
    label: tagSetup[category].label,
    to: `/tutorials/${category}`,
    icon: tagSetup[category].icon,
    active: isTagRoute.value ? route.path === `/tutorials/${category}` : activeTag.value === category
  }))

  return [...baseLinks, ...categoryLinks]
})

const navigation = computed(() => {
  if (!shouldShowNavigation.value) {
    return []
  }

  const tutorialsNav = nav!.value.find(item => item._path.startsWith('/tutorials'))

  if (!tutorialsNav || !activeTag.value) {
    return []
  }

  return tutorialsNav.children?.filter(child =>
    child.tags?.includes(activeTag.value)
  ) || []
})
</script>