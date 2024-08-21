import { hexToRgb } from '../utils'
import colors from '#tailwind-config/theme/colors'

export default defineNuxtPlugin({
  enforce: 'post',
  setup () {
    const appConfig = useAppConfig()

    const root = computed(() => {
      const primary: Record<string, string> | undefined = colors[appConfig.ui.primary]
      const gray: Record<string, string> | undefined = colors[appConfig.ui.gray]

      return `:root {
        ${Object.entries(primary || colors.green).map(([key, value]) => `--color-primary-${key}: ${hexToRgb(value)};`).join('\n')}
        --color-primary-DEFAULT: var(--color-primary-500);

        ${Object.entries(gray || colors.cool).map(([key, value]) => `--color-gray-${key}: ${hexToRgb(value)};`).join('\n')}
        }

        .dark {
          --color-primary-DEFAULT: var(--color-primary-400);
        }
        `
    })

    if (import.meta.client) {
      watch(root, () => {
        window.localStorage.setItem('zunder-ui-root', root.value)
      })

      appConfig.ui.primary = window.localStorage.getItem('zunder-ui-primary') || appConfig.ui.primary
      appConfig.ui.gray = window.localStorage.getItem('zunder-ui-gray') || appConfig.ui.gray
    }
    if (import.meta.server) {
      useHead({
        script: [
          {
            innerHTML: `
                if (localStorage.getItem('zunder-ui-root')) {
                  document.querySelector('style#zunder-ui-colors').innerHTML = localStorage.getItem('zunder-ui-root')
                }`.replace(/\s+/g, ' '),
            type: 'text/javascript',
            tagPriority: -1
          }
        ]
      })
    }
  }
})
