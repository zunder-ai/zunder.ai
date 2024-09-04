<template>
  <component :is="tag" :class="mergedClasses">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { extendTailwindMerge } from 'tailwind-merge'

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [
        {
          text: [
            'sm',
            'base',
            'lg',
            'xl',
            '2xl',
            '3xl',
            '4xl'
          ]
        }
      ]
    }
  }
})

const attrs = useAttrs()

const SIZES = {
  none: '',
  sm: 'text-sm',
  base: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
  xxl: 'text-3xl',
  xxxl: 'text-4xl'
}

// Define props
const props = defineProps({
  variant: {
    type: String as PropType<keyof typeof SIZES>,
    default: ''
  },
  size: {
    type: String as PropType<keyof typeof SIZES>,
    default: ''
  },
  tag: {
    type: String as PropType<
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'body'
      | 'small'
      | 'p'
      | 'div'
      | 'span'
      | 'ul'
    >,
    default: 'p'
  },
  theme: {
    type: String as PropType<'light' | 'dark'>,
    default: undefined
  }
})

const themeClass = computed(() => {
  switch (props.theme) {
  case 'light':
    return 'text-black'
  case 'dark':
    return 'text-white'
  default:
    return ''
  }
})

// Define the class computation
const mergedClasses = computed(() => {
  const defaultClasses = ''
  const sizeClassDeprecated = SIZES[props.variant] || ''
  const sizeClass = SIZES[props.size] || ''
  const classAttribute = attrs.class as string | undefined
  return twMerge(
    defaultClasses,
    themeClass.value,
    sizeClassDeprecated,
    sizeClass,
    classAttribute
  )
})
</script>

<style scoped></style>