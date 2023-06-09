<template>
    <RouterView />
</template>

<script setup lang="ts">
import { useThemeStore } from './stores/theme';

const themeStore = useThemeStore();
const theme = computed(() => themeStore.theme);

// watch effect
watchEffect(() => {
    if (theme.value) {
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
    }
    else {
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
    }
// @ts-ignore
});
</script>

<style>
   
</style>