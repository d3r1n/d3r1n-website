import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'url'

import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import UnoCSS from 'unocss/vite'
import { unheadVueComposablesImports } from '@unhead/vue'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('src', import.meta.url))
        }
    },
    plugins: [
        vue(),
        UnoCSS(),
        AutoImport({
            imports: ['vue', 'vue-router', '@vueuse/core', unheadVueComposablesImports],
            dts: 'src/auto-imports.d.ts'
        }),
        Components({
            dirs: ['src/components', 'src/views', 'src/assets/svg'],
            extensions: ['vue'],
            dts: 'src/components.d.ts'
        })
    ]
})
