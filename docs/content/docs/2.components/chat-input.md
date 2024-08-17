---
title: ChatInput
description: Input component for sending chat messages.
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/zunder-ui/blob/dev/src/runtime/components/chat/ChatInput.vue
---

## Usage

Use the ChatInput component to allow users to type and send messages in a chat interface.

:component-example{component="chat-input-example-basic"}

## Props

:component-props

## Events

- `@submit` - Emitted when the user submits the input (e.g., by pressing Enter or clicking the send button).

## Slots

### `prepend`

Use the `#prepend` slot to add content before the input field.

### `append`

Use the `#append` slot to add content after the input field (e.g., a send button).

## Config

:component-preset