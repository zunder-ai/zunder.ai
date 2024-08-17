<template>
  <Transition appear name="fade">
    <div ref="backgroundRef" class="gradient-container">
      <div class="light-beam" />
      <div class="lightning-effect" />
      <HomeSparks :container-ref="backgroundRef" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import HomeSparks from './HomeSparks.vue'

const backgroundRef = ref<HTMLElement | null>(null)
const colorMode = useColorMode()

const isDark = computed({
  get () {
    return colorMode.value === 'dark'
  },
  set () {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  }
})

const gradientStart = computed(() => isDark.value ? '#000000' : '#ffffff')
const gradientEnd = computed(() => isDark.value ? '#0a0a0a' : '#f0f0f0')
const beamColor = computed(() => isDark.value ? 'rgba(255,140,0,0.15)' : 'rgba(255,140,0,0.1)')
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.gradient-container {
  background: v-bind('`linear-gradient(135deg, ${gradientStart} 0%, ${gradientEnd} 70%)`');
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  overflow: hidden;
}

.light-beam {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: v-bind('`radial-gradient(ellipse at top left, ${beamColor} 0%, ${beamColor.replace("0.15", "0.05")} 30%, ${beamColor.replace("0.15", "0")} 70%)`');
  filter: blur(3px);
}

/*
.gradient-container {
  background: linear-gradient(135deg, #000000 0%, #0a0a0a 70%);
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  overflow: hidden;
}

.light-beam {
  position: absolute;
  top: -20%;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(ellipse at top left, rgba(255,140,0,0.15) 0%, rgba(255,140,0,0.05) 30%, rgba(255,140,0,0) 70%);
  filter: blur(3px);
} */
</style>