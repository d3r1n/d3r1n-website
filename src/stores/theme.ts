import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
    const theme = useLocalStorage('theme', true)

    function toggleTheme() {
        theme.value = !theme.value
    }

    return {
        theme,
        toggleTheme
    }
})
