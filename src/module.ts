import {
  defineNuxtModule,
  addComponentsDir,
  addImportsDir,
  createResolver,
  installModule
} from '@nuxt/kit'
import { name, version } from '../package.json'
import createTemplates from './templates'
import installTailwind from './tailwind'


export interface ModuleOptions {
  /**
   * @default 'u'
   */
  prefix?: string;

  /**
   * @default false
   */
  global?: boolean;

  safelistColors?: string[];
  /**
   * Disables the global css styles added by the module.
   */
  disableGlobalStyles?: boolean;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: 'zunder',
    compatibility: {
      nuxt: '>=3.10.0'
    }
  },
  defaults: {
    prefix: 'Z',
    disableGlobalStyles: false
  },
  async setup (options, nuxt) {
    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = resolve('./runtime')
    nuxt.options.build.transpile.push(runtimeDir)


    nuxt.options.alias['#zunderui'] = runtimeDir

    // if (!options.disableGlobalStyles) {
    //   nuxt.options.css.push(resolve(runtimeDir, 'ui.css'))
    // }

    // createTemplates(nuxt)


    await installModule('@nuxt/ui')
    await installModule('@nuxt/icon')
    // await installModule('@nuxtjs/color-mode', { classSuffix: '' })
    // await installTailwind(options, nuxt, resolve)

    // Components
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'elements'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'forms'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })
    addComponentsDir({
      path: resolve(runtimeDir, 'components', 'layout'),
      prefix: options.prefix,
      global: options.global,
      watch: false
    })

    // Composables
    addImportsDir(resolve(runtimeDir, 'composables'))
  }
})
