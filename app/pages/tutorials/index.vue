<template>
  <UPage>
    <UPageHeader title="Guides & Tutorials" />
    <UPageBody>
      <UCard>
        <ul v-if="tutorials.length" class="space-y-4">
          <li v-for="tutorial in tutorials" :key="tutorial._path" class="flex items-start">
            <UIcon name="i-heroicons-play" class="mr-2 mt-1 text-gray-400" />
            <div>
              <NuxtLink :to="tutorial._path" class="font-medium hover:text-primary-500">
                {{ tutorial.title }}
              </NuxtLink>
              <p class="text-sm text-gray-500">
                {{ formatDate(tutorial.date) }} by
                <span v-for="(author, index) in tutorial.authors" :key="author" class="text-amber-500">
                  {{ author }}{{ index < tutorial.authors.length - 1 ? ', ' : '' }}
                </span>
              </p>
            </div>
          </li>
        </ul>
        <template #footer>
          <UButton
            v-if="showLoadMore"
            class="w-full"
            color="amber"
            variant="solid"
            :disabled="!hasMore"
            @click="loadMore"
          >
            Load more
          </UButton>
        </template>
      </UCard>
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'tutorials'
})

const route = useRoute()
const currentTag = computed(() => {
  const pathParts = route.path.split('/')
  return pathParts[pathParts.length - 1]
})

console.log('Current tag:', currentTag.value)


const perPage = 10
const page = ref(1)
const hasMore = ref(false)
const showLoadMore = ref(false)
const tutorials = ref([])

// Initial load of tutorials
const { data: initialTutorials } = await useAsyncData('tutorials', () => {
  const query = queryContent('tutorials').sort({ date: -1 })

  if (currentTag.value && currentTag.value !== 'tutorials') {
    query.where({ tags: { $contains: currentTag.value } })
  }

  return query.limit(perPage + 1).find()
})

tutorials.value = initialTutorials.value.slice(0, perPage)
hasMore.value = initialTutorials.value.length > perPage
showLoadMore.value = hasMore.value

const loadMore = async () => {
  page.value++
  const query = queryContent('tutorials').sort({ date: -1 })

  if (currentTag.value && currentTag.value !== 'tutorials') {
    query.where({ tags: { $contains: currentTag.value } })
  }

  const newTutorials = await query
    .skip(page.value * perPage)
    .limit(perPage + 1)
    .find()

  hasMore.value = newTutorials.length > perPage
  tutorials.value = [...tutorials.value, ...newTutorials.slice(0, perPage)]
}

const formatDate = (date: string) => {
  // ... (keep the existing formatDate function)
  return date
}
</script>