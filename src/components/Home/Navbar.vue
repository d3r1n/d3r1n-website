<template>
    <div class="navbar sc-flex-center gap-sm">
        <RouterLink :to="{name: nav}" 
            class="
                nav-btn py-3 px-5 rd-full
                bg-slate-200 hover:bg-slate-300 text-slate-400
                dark:bg-neutral-800 dark:hover:bg-neutral-700
                dark:text-neutral-700 dark:hover:text-neutral-600
                font-nunito transition-colors duration-250
                text-lg font-bold no-underline" 
            v-for="nav in navs"
        >
            {{ nav.charAt(0).toUpperCase() + nav.slice(1) }}
        </RouterLink>

        <button class="group nav-theme-button border-none sc-flex-center p-3 rd-full bg-slate-200 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700" @click="toggleTheme">
            <Sun class="stroke-neutral-700 group-hover:stroke-neutral-600" v-if="!theme"/>
            <Moon class="stroke-slate-400 group-hover:stroke-slate-500" v-else/>
        </button>
    </div>    
</template>

<script setup lang="ts">
import Moon from '@/assets/svg/Moon.vue';
import Sun from '@/assets/svg/Sun.vue';
import { useThemeStore } from '@/stores/theme';

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);
const toggleTheme = themeStore.toggleTheme;


const navs = [
    "about",
    "projects",
    "songs"
]
</script>