---
title: ChatPage
description: A layout component for chat applications.
links:
  - label: GitHub
    icon: i-simple-icons-github
    to: https://github.com/zunder-ui/blob/dev/src/runtime/components/chat/ChatPage.vue
---

## Usage

The ChatPage component provides a structured layout for chat applications, including a header, main chat area, and footer.

:component-example{component="chat-page-example-basic"}

## Props

:component-props

## Slots

### `messages`

Use the `#messages` slot to add the chat messages content.

### `input`

Use the `#input` slot to add the chat input component.

### `footer`

Use the `#footer` slot to add custom content to the footer area.

## Structure

The ChatPage component is structured as follows:

1. Header: Contains the title "ZUNDER AI CHAT" and buttons for settings and color mode toggle.
2. Main: Includes slots for messages and input.
3. Footer: Provides a slot for custom footer content.

## Config

The component uses the following default configuration:

```yml
{
  wrapper: 'flex flex-col h-screen bg-gray-50 dark:bg-gray-900',
  header: {
    base: 'bg-white dark:bg-gray-800 shadow',
    container: 'flex justify-between items-center py-4',
    title: 'text-2xl text-gray-900 dark:text-white font-bold',
    buttons: 'flex items-center space-x-4'
  },
  main: {
    base: 'flex-grow overflow-hidden',
    container: 'h-full flex flex-col',
    messages: 'flex-grow overflow-y-auto py-4',
    input: 'py-4'
  },
  footer: {
    base: 'bg-white dark:bg-gray-800 shadow',
    container: 'py-2 text-center text-sm text-gray-500 dark:text-gray-400'
  }
}
```