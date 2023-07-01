import { presetUno, presetTypography, defineConfig } from 'unocss'
import Theme from './theme.json'
export default defineConfig({
    presets: [presetUno(), presetTypography()],
    shortcuts: {
        'sc-flex-center': 'flex items-center justify-center',
        'sc-page': 'w-full min-h-100vh absolute'
    },
    rules: [
        ['font-nunito', { 'font-family': 'Nunito, sans-serif' }],
        ['font-roboto', { 'font-family': 'Roboto, sans-serif' }]
    ],
    theme: {
        colors: {
            'avatar-color': 'var(--avatar-color)',
            'action-color': Theme['action-color']
        }
    }
})
