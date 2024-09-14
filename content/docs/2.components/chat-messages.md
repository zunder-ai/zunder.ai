---
title: ChatMessages
description: Display a list of chat messages.
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/zunder-ai/ui/blob/dev/src/runtime/components/chat/ChatMessages.vue
---

## Usage

Use the ChatMessages component to display a list of messages in a chat interface.

:component-example{component="chat-messages-example-basic"}

## Props

:component-props

## Slots

### `default`

Use the `#default` slot to customize the rendering of each message. You'll have access to the `message` object in the slot scope.

## Config


```yml
{
  wrapper: 'grid grid-cols-6 gap-y-2'
}
```