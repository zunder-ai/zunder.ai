<template>
  <div class="w-full h-px bg-gray-200 dark:bg-gray-800 flex items-center justify-center" />

  <UFooter :ui="{ top: { container: 'py-2 bg-red-500' } }">
    <template #left>
      <NuxtLink
        to="https://github.com/zunder-ai/zunder-ui"
        target="_blank"
        class="text-sm text-gray-500 dark:text-gray-400"
      >
        Published under <span class="text-gray-900 dark:text-white">MIT License</span>
      </NuxtLink>
    </template>

    <template #right>
      <UButton
        aria-label="Nuxt UI Website"
        icon="i-simple-icons-nuxtdotjs"
        to="https://ui.nuxt.com/"
        target="_blank"
        v-bind="($ui.button.secondary as any)"
      />
      <UButton
        aria-label="Zunder on X"
        icon="i-simple-icons-x"
        to="https://x.com/kregenrek"
        target="_blank"
        v-bind="($ui.button.secondary as any)"
      />
      <UButton
        aria-label="Zunder on GitHub"
        icon="i-simple-icons-github"
        to="https://github.com/zunder-ai/zunder-ui"
        target="_blank"
        v-bind="($ui.button.secondary as any)"
      />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const { $ui } = useNuxtApp()
</script>
