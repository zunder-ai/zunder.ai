<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue'

interface Props {
  title: string;
  description: string;
  price: string;
  isMonthlyPrice: boolean;
  cancellationText?: string;
  features: Array<{ title: string }>;
  button: {
    label: string;
    action: 'modal' | 'redirect' | 'email';
    href?: string;
    disabled?: boolean;
  };
  isPresale?: boolean;
  originalPrice?: string;
  saleEndDate?: string;
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  price: '',
  isMonthlyPrice: false,
  features: [],
  button: { label: '', action: 'modal' },
  isPresale: false
})

const emit = defineEmits(['buttonClick'])

const isSaleActive = computed(() => {
  if (!props.saleEndDate) return false
  const endDate = new Date(props.saleEndDate)
  return endDate > new Date()
})

const handleButtonClick = () => {
  emit('buttonClick', props.button.action, props.title)
}
</script>

<template>
  <div
    class="relative group isolate rounded-xl background-gradient ring-1 ring-gray-200 dark:ring-gray-800 before:hidden before:lg:block before:absolute before:-inset-[2px] before:h-[calc(100%+4px)] before:w-[calc(100%+4px)] before:z-[-1] before:rounded-[13px] flex-1 flex flex-col shadow bg-white dark:bg-gray-900 hover:bg-opacity-90 dark:hover:bg-opacity-90 transition-[background-opacity] p-8"
  >
    <div class="absolute top-4 right-4 flex items-center space-x-2">
      <UBadge v-if="isPresale" color="green" variant="solid" size="lg" class="font-semibold">
        Pre-sale now open
      </UBadge>
    </div>
    <div class="flex-1 flex flex-col gap-y-6">
      <!-- title -->
      <div class="flex flex-col gap-y-2">
        <Typo tag="h3" size="lg" class="font-semibold">
          {{ title }}
        </Typo>
        <Typo
          v-if="description"
          tag="p"
          size="sm"
          class="whitespace-pre-wrap"
        >
          {{ description }}
        </Typo>
      </div>

      <!-- price -->
      <div class="mt-4 flex items-baseline">
        <span class="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">{{ price }}</span>
        <span v-if="originalPrice" class="ml-2 text-2xl font-medium text-red-500 line-through-thin">{{ originalPrice }}</span>
      </div>

      <p v-if="isSaleActive" class="mt-2 text-sm font-semibold text-yellow-500">
        Sale ends on {{ new Date(saleEndDate).toLocaleDateString() }}<br>
        Release date: {{ new Date(saleEndDate).toLocaleDateString() }}
      </p>

      <div v-if="button" class="pt-8">
        <UButton
          :label="button.label"
          :disabled="button.disabled"
          class="w-full"
          size="xl"
          @click="handleButtonClick"
        />
      </div>

      <!-- benefits -->
      <div v-if="features && features.length" class="flex flex-col text-lg">
        <hr class="mb-2">
        <Typo tag="ul" size="base" class="flex flex-col gap-y-3.5 pt-4">
          <li v-for="(feature, index) in features" :key="index" class="flex gap-x-1 items-start">
            <Icon name="lucide:arrow-up-right" class="opacity-50 mr-1" />
            <Typo tag="span" size="sm" class="leading-none">
              {{ feature.title }}
            </Typo>
          </li>
        </Typo>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-through-thin {
  position: relative;
}
.line-through-thin:before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
  background-color: red;
}
</style>