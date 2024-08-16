<template>
  <Transition appear name="fade">
    <div ref="backgroundRef" class="lightning-background">
      <div class="lightning-effect" />
      <HomeSparks :container-ref="backgroundRef" />
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import HomeSparks from './HomeSparks.vue'

const backgroundRef = ref<HTMLElement | null>(null)
</script>

<style scoped>
.lightning-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: -1;
}

.lightning-effect {
  position: absolute;
  top: -150%;
  left: -50%;
  width: 200%;
  height: 400%;
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 15%,
    rgba(255, 255, 255, 0.05) 30%,
    rgba(255, 255, 255, 0) 60%
  );
  opacity: 0.7;
  transform: rotate(-30deg);
  animation: pulse 30s ease-in-out infinite alternate;
}

@keyframes pulse {
  0% {
    transform: rotate(-30deg) scale(1);
  }
  50% {
    transform: rotate(-25deg) scale(1.05);
  }
  100% {
    transform: rotate(-30deg) scale(1);
  }
}

/* Nuxt 3 fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>