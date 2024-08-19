<template>
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UAside :links="sidebarLinks" />
          <UNavigationTree
            v-if="currentCategory"
            :links="mapContentNavigation(categoryNav)"
            class="mt-4"
          />
        </template>

        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import { mapContentNavigation } from '#imports'

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

const defaultIcon = 'i-heroicons-tag'

const route = useRoute()

const { data: currentTutorial, refresh: refreshCurrentTutorial } = await useAsyncData(
  'current-tutorial',
  () => queryContent('/tutorials' + route.path).findOne(),
  { server: false }
)

const { data: tutorials, refresh: refreshTutorials } = await useAsyncData(
  'all-tutorials',
  () => queryContent('/tutorials').find(),
  { server: false }
)

const tags = computed(() => {
  const allTags = tutorials.value?.flatMap(tutorial => tutorial.tags || []) || []
  return [...new Set(allTags)]
})

const currentCategory = computed(() => {
  if (!currentTutorial.value || !currentTutorial.value.tags) return null
  return currentTutorial.value.tags[0]
})

const sidebarLinks = computed(() => [
  {
    label: 'All Tutorials',
    to: '/tutorials',
    icon: 'i-heroicons-book-open'
  },
  ...tags.value.map(tag => ({
    label: tagSetup[tag]?.label || tag,
    to: `/tutorials/${tag}`,
    icon: tagSetup[tag]?.icon || defaultIcon,
    active: currentCategory.value === tag
  }))
])

const categoryPosts = computed(() => {
  if (!currentCategory.value) return []

  return tutorials.value
    ?.filter(tutorial => tutorial.tags?.includes(currentCategory.value))
    .map(tutorial => ({
      ...tutorial,
      children: []
    })) || []
})

const categoryNav = computed(() => [
  {
    _path: `/tutorials/${currentCategory.value}`,
    title: 'Tutorials',
    children: categoryPosts.value
  }
])

// Watch for route changes and refresh data
watch(
  () => route.path,
  async () => {
    await refreshCurrentTutorial()
    await refreshTutorials()
  }
)
</script>