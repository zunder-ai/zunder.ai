<script setup>
const aiMessage = {
  content: 'Hello! How can I assist you today?',
  isUser: false
}

const userMessage = {
  content: 'Hi there! I have a question about Vue.js.',
  isUser: true
}
</script>

<template>
  <div class="grid grid-cols-6 gap-y-2">
    <ZChatMessage :message="aiMessage" />
    <ZChatMessage :message="userMessage" />
  </div>
</template>