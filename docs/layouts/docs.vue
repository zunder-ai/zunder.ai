<template>
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UAside :links="links">
            <BranchSelect />

            <UNavigationTree :links="mapContentNavigation(navigation)" :default-open="1" />
          </UAside>
        </template>

        <slot />
      </UPage>
    </UContainer>
  </UMain>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
const route = useRoute()

const nav = inject<Ref<NavItem[]>>('navigation')

const links = computed(() => {
  return [{
    label: 'Docs',
    icon: 'i-ph-book-open',
    to: '/docs/getting-started',
    active: (route.path.startsWith('/docs'))
  }]
  // }, {
  //   label: 'Guide',
  //   icon: 'i-ph-book-duotone',
  //   to: '/guide/beginner/chatgpt-clone',
  //   active: (route.path.startsWith('/guide'))
  // }]
})


const navigation = computed(() => nav!.value.find(item => item._path.startsWith('/docs'))?.children || [])

</script>
