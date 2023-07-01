<template>
    <div class="navbar sc-flex-center w-auto flex-wrap gap-3">
        <RouterLink
            :to="{ name: nav }"
            class="nav-btn rd-full font-nunito bg-slate-200 px-6 py-3 text-lg font-bold text-slate-400 no-underline transition-colors duration-300 hover:bg-slate-300 dark:bg-neutral-800 dark:text-neutral-600 dark:hover:bg-neutral-700 dark:hover:text-neutral-500"
            v-for="nav in navs"
        >
            {{ nav.charAt(0).toUpperCase() + nav.slice(1) }}
        </RouterLink>

        <button
            class="nav-theme-button sc-flex-center rd-full group border-none bg-slate-200 p-3 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            @click="toggleTheme"
        >
            <Sun class="stroke-neutral-700 group-hover:stroke-neutral-600" v-if="!theme" />
            <Moon class="stroke-slate-400 group-hover:stroke-slate-500" v-else />
        </button>
    </div>
</template>

<script setup lang="ts">
    import Moon from '@/assets/svg/Moon.vue'
    import Sun from '@/assets/svg/Sun.vue'
    import { useThemeStore } from '@/stores/theme'

    const themeStore = useThemeStore()
    const theme = computed(() => themeStore.theme)
    const toggleTheme = themeStore.toggleTheme

    const navs = ['about', 'projects', 'songs']
</script>
