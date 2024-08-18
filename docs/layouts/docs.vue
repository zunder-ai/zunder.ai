<template>
  <UMain>
    <UContainer>
      <UPage>
        <template #left>
          <UAside>
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

const nav = inject<Ref<NavItem[]>>('navigation')


const navigation = computed(() => nav!.value.find(item => item._path.startsWith('/docs'))?.children || [])

</script>
