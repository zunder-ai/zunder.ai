<script setup lang="ts">
import { ref } from 'vue'

const message = ref('')
const messages = ref<string[]>([])

const sendMessage = () => {
  if (message.value.trim()) {
    messages.value.push(message.value)
    message.value = ''
  }
}
</script>

<template>
  <UContainer :ui="{ width: 'max-w-md' }">
    <UCard>
      <template #header>
        <h3 class="text-lg font-bold">
          Chat Messages
        </h3>
      </template>

      <div class="h-64 overflow-y-auto mb-4">
        <p v-for="(msg, index) in messages" :key="index" class="mb-2">
          {{ msg }}
        </p>
      </div>

      <template #footer>
        <form class="flex gap-2" @submit.prevent="sendMessage">
          <UInput
            v-model="message"
            placeholder="Type a message..."
            :ui="{ width: 'w-full' }"
          />
          <UButton type="submit" color="primary">
            Send
          </UButton>
        </form>
      </template>
    </UCard>
  </UContainer>
</template>