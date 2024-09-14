---
title: ChatMessage
description: Display a single chat message with avatar, content, and metadata.
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/zunder-ai/ui/blob/dev/src/runtime/components/chat/ChatMessage.vue
---

## Usage

Use the ChatMessage component to display a single message in a chat interface.

:component-example{component="chat-message-example-basic"}

## Props

:component-props

## Slots

### `avatar`

Use the `#avatar` slot to customize the avatar display.

### `content`

Use the `#content` slot to customize the message content.

### `metadata`

Use the `#metadata` slot to customize the message metadata (e.g., timestamp, status).

## Config


```yml
{
  wrapper: {
    base: 'p-3 rounded-lg',
    user: 'col-start-6',
    assistant: 'col-start-1 col-end-3'
  },
  container: {
    base: 'flex items-center',
    user: 'justify-start flex-row-reverse',
    assistant: 'flex-row'
  },
  avatar: {
    background: 'bg-gray-500',
    text: 'text-white font-medium'
  },
  message: {
    base: 'relative text-sm py-2 px-4 shadow rounded-xl',
    user: 'mr-3 bg-gray-100 dark:bg-gray-800',
    assistant: 'ml-3 bg-gray-50 dark:bg-gray-800'
  }
}
```