import { presetUno, presetTypography, defineConfig } from 'unocss'
import Theme from "./theme.json"
export default defineConfig({
    presets: [
        presetUno(),
        presetTypography(),
    ],
    shortcuts: {
        'sc-flex-center': 'flex items-center justify-center',
        'sc-social-link': 'sc-flex-center p-2 rounded-2 bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 transition-colors duration-250',
        'sc-link-svg': 'w-7 h-7 stroke-slate-400 group-hover:stroke-slate-500 dark:stroke-neutral-700 dark:group-hover:stroke-neutral-600 transition-all duration-250',
    },
    rules: [
        ['font-nunito', {'font-family': 'Nunito, sans-serif'}],
        ['font-roboto', {'font-family': 'Roboto, sans-serif'}],
    ],
    theme: {
        colors: {
            'avatar-color': 'var(--avatar-color)',
            'action-color': Theme['action-color'],
        }
    }
})