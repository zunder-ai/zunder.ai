<template>
  <UContainer class="min-h-screen flex flex-col w-full">
    <ZChatMessages :messages="messages" />
    <ZChatInput placeholder="Type your message here..." />
  </UContainer>
</template>

<script setup lang="ts">
import type { ChatMessage } from '../src/runtime/types/index'

const messages: ChatMessage[] = [
  { isUser: true, avatar: '/user-avatar.png', content: 'How do I create a Vue component?' },
  { isUser: false, avatar: '/ai-avatar.png', content: 'To create a Vue component, you can start by creating a new .vue file with a template, script, and style section.' },
  { isUser: true, avatar: '/user-avatar.png', content: 'What\'s the difference between ref and reactive in Vue 3?' },
  { isUser: false, avatar: '/ai-avatar.png', content: 'ref is used for primitive values, while reactive is used for objects. ref requires .value to access or modify, but reactive doesn\'t.' },
  { isUser: true, avatar: '/user-avatar.png', content: 'Can you explain Vue\'s composition API?' },
  { isUser: false, avatar: '/ai-avatar.png', content: 'The Composition API is a set of function-based APIs in Vue 3 that allows you to organize component logic by feature rather than by option type, making it easier to reuse and test code.' }
]
</script>