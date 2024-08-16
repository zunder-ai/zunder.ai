<script setup>
import { ref } from 'vue'

const messages = ref([
  { id: 1, content: 'Hello!', sender: 'user' },
  { id: 2, content: 'Hi there!', sender: 'bot' },
  { id: 3, content: 'How are you?', sender: 'user' }
])
</script>

<template>
  <ZChatMessages :messages="messages" />
</template>