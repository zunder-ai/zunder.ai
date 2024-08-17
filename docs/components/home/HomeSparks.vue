<template>
  <div>
    <div
      v-for="spark in sparks"
      :key="spark.id"
      class="spark"
      :style="{ left: `${spark.x}px`, top: `${spark.y}px` }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useMouse, useRafFn, useThrottleFn } from '@vueuse/core'

const props = defineProps<{
  containerRef: HTMLElement | null
}>()

const { x, y } = useMouse()
const sparks = ref<{ id: number; x: number; y: number }[]>([])
let sparkId = 0

const isMouseOverContainer = ref(false)

const createSpark = computed(() => useThrottleFn(() => {
  if (Math.random() > 0.3) return // 30% chance to create a spark

  sparkId++
  sparks.value.push({
    id: sparkId,
    x: x.value,
    y: y.value
  })

  if (sparks.value.length > 20) {
    sparks.value.shift()
  }

}, 50))

const animateSparks = () => {
  sparks.value = sparks.value.map(spark => ({
    ...spark,
    x: spark.x + (Math.random() - 0.5) * 2,
    y: spark.y - 1 - Math.random()
  })).filter(spark => spark.y > 0)
}

const { pause: pauseAnimation, resume: resumeAnimation } = useRafFn(animateSparks)

// Only create sparks when mouse is over the container
const { pause: pauseWatchingMouse, resume: resumeWatchingMouse } = useRafFn(() => {
  if (props.containerRef) {
    const rect = props.containerRef.getBoundingClientRect()
    isMouseOverContainer.value = x.value >= rect.left && x.value <= rect.right && y.value >= rect.top && y.value <= rect.bottom
    if (isMouseOverContainer.value) {
      createSpark.value()
    }
  }
})

onMounted(() => {
  resumeAnimation()
  resumeWatchingMouse()
})

onUnmounted(() => {
  pauseAnimation()
  pauseWatchingMouse()
})
</script>

<style scoped>
.spark {
  position: absolute;
  width: 4px;
  height: 4px;
  background-color: rgb(var(--color-primary-DEFAULT));
  border-radius: 50%;
  pointer-events: none;
  animation: sparkle 1s ease-out forwards;
}

@keyframes sparkle {
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0);
  }
}

.debug-info {
  position: fixed;
  top: 10px;
  left: 10px;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  font-family: monospace;
  z-index: 9999;
}
</style>