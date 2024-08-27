<script setup lang="ts">
const handleSubmit = async (text: string) => {
  alert(text)
}
const loading = ref(false)
</script>

<template>
  <ZChatInput :loading="loading" placeholder="Type your message here..." class="w-full" @submit="handleSubmit" />
</template>
