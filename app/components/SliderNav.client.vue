<template>
  <div :class="[rootClass]">
    <div :class="[containerClass]">
      <div :class="[itemsClass]">
        <button
          v-for="(item, index) in items"
          :key="index"
          ref="button"
          :class="[
            buttonClass,
            activeIndex === index
              ? buttonActiveClass + ' active'
              : buttonInactiveClass,
          ]"
          @click="handleClick(index)"
        >
          <slot name="item" v-bind="{ item: item }">
            {{ item }}
          </slot>
        </button>
        <div :class="[sliderClass]" :style="sliderStyle" />
      </div>
    </div>
  </div>
</template>

  <script lang="ts" setup>
interface Theme {
  root?: string;
  container?: string;
  items?: string;
  button?: string;
  buttonInactive?: string;
  buttonActive?: string;
  slider?: string;
}

const themes: Record<string, Theme> = {
  dark: {
    root: 'shadow-2xl rounded-2xl',
    container:
      'border border-cod-gray-300 p-2 bg-cod-gray-50 rounded-2xl relative w-full overflow-hidden shadow-[inset_0_0.1rem_0.4rem_0_black]',
    items: 'flex relative flex-col lg:flex-row',
    button:
      'w-full font-semibold lg:w-auto text-white font-alliance rounded-2xl p-4 inline-block bg-none border-none cursor-pointer text-[1rem] relative z-[1] flex-1',
    buttonInactive: 'text-white/70 transition-color duration-300 ease',
    buttonActive: 'text-white transition-color duration-300 ease',
    slider:
      'bg-cod-gray-200 rounded-2xl gradient-border shadow-md !absolute transition-all duration-300 z-0'
  },
  light: {
    root: 'rounded-2xl',
    container:
      'border border-stone-200 p-2 bg-white rounded-2xl relative w-full overflow-hidden shadow-mj-inset-light',
    items: 'flex relative flex-col lg:flex-row',
    button:
      'w-full font-semibold lg:w-auto text-cod-gray-100 font-alliance rounded-2xl p-4 inline-block border-none cursor-pointer text-[1rem] relative z-[1] flex-1 bg-none',
    buttonInactive: 'text-cod-gray-100/70 transition-color duration-300 ease',
    buttonActive: 'text-cod-gray-100 transition-color duration-300 ease',
    slider:
      'gradient-btn-light rounded-2xl border border-stone-200 !absolute transition-all duration-300 z-0'
  },
  light_high: {
    root: 'rounded-2xl',
    container:
      'border border-stone-50 p-2 bg-white rounded-2xl relative w-full overflow-hidden shadow-mj-inset-light',
    items: 'flex relative flex-col lg:flex-row',
    button:
      'w-full font-semibold lg:w-auto text-cod-gray-100 font-alliance rounded-2xl p-4 inline-block border-none cursor-pointer text-[1rem] relative z-[1] flex-1 bg-none',
    buttonInactive: 'text-cod-gray-100/70 transition-color duration-300 ease',
    buttonActive: 'text-white transition-color duration-300 ease',
    slider:
      'bg-cod-gray-200 rounded-2xl gradient-border shadow-md !absolute transition-all duration-300 z-0'
  }
}

const props = defineProps({
  items: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  modelValue: {
    type: Number,
    default: 0
  },
  theme: {
    type: String as PropType<keyof typeof themes>,
    default: 'dark'
  }
})

const emit = defineEmits(['click', 'update:modelValue'])

const activeIndex = ref(props.modelValue)
const sliderStyle = ref({})
const button = ref<HTMLButtonElement[]>()

const rootClass = computed(() => themes[props.theme]?.root || '')
const containerClass = computed(() => themes[props.theme]?.container || '')
const itemsClass = computed(() => themes[props.theme]?.items || '')
const buttonClass = computed(() => themes[props.theme]?.button || '')
const buttonInactiveClass = computed(
  () => themes[props.theme]?.buttonInactive || ''
)
const buttonActiveClass = computed(
  () => themes[props.theme]?.buttonActive || ''
)
const sliderClass = computed(() => themes[props.theme]?.slider || '')

const setActive = (index: number) => {
  activeIndex.value = index
  updateSliderStyle()
}

const handleClick = (index: number) => {
  setActive(index)
  emit('update:modelValue', index)
  emit('click', index)
}

const updateSliderStyle = () => {
  nextTick(() => {
    if (!button.value) {
      return
    }
    const activeButton = button.value[activeIndex.value]
    if (activeButton) {
      sliderStyle.value = {
        width: `calc(${activeButton.offsetWidth}px - 2px)`,
        height: `${activeButton.offsetHeight}px`,
        transform: `translate(${activeButton.offsetLeft}px, ${activeButton.offsetTop}px)`
      }
    }
  })
}

const handleResize = () => {
  updateSliderStyle()
}

onMounted(() => {
  updateSliderStyle()
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
  </script>