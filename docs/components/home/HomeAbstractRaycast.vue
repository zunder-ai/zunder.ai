<template>
  <Transition appear name="fade">
    <div ref="beamRef" class="light-beam" />
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useCssVar } from '@vueuse/core'

const colorMode = useColorMode()
const beamRef = ref(null)

const beamColor = useCssVar('--beam-color', beamRef)
const beamColorFaded = useCssVar('--beam-color-faded', beamRef)
const beamColorTransparent = useCssVar('--beam-color-transparent', beamRef)

const updateBeamColors = () => {
  if (colorMode.value === 'dark') {
    beamColor.value = 'rgba(255,140,0,0.15)'
    beamColorFaded.value = 'rgba(255,140,0,0.07)'
    beamColorTransparent.value = 'rgba(255,140,0,0)'
  } else {
    beamColor.value = 'rgba(255,140,0,0.15)'
    beamColorFaded.value = 'rgba(255,140,0,0.12)'
    beamColorTransparent.value = 'rgba(255,140,0,0)'
  }
}

watch(colorMode, updateBeamColors, { immediate: true })
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.light-beam {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 80%;
  height: 80%;
  background: radial-gradient(
    ellipse at top left,
    var(--beam-color) 10%,
    var(--beam-color-faded) 50%,
    var(--beam-color-transparent) 70%
  );
  filter: blur(3px);
}
</style>