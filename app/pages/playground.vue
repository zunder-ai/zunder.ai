<script setup lang="ts">
const title = 'Playground'
const description = 'Play online with our interactive Zunder playground.'

useSeoMeta({
  titleTemplate: '%s - Zunder',
  title,
  ogTitle: 'Zunder Playground',
  description
})

defineOgImageComponent('Docs')
</script>

<template>
  <div class="h-[calc(100vh-var(--header-height)-var(--header-height)-1px)]">
    <ClientOnly>
      <iframe
        :src="`https://stackblitz.com/edit/zunder-ui?embed=1&file=app.config.ts,app.vue&theme=${$colorMode.preference}`"
        width="100%"
        height="100%"
      />
    </ClientOnly>
  </div>
</template>
