<template>
    <RouterView v-slot="{ Component, route }">
        <Transition
            :enter-active-class="route.meta.enter as string"
            :leave-active-class="route.meta.leave as string"
            v-on:after-enter="show = true"
        >
            <KeepAlive>
                <component :is="Component" :key="route.path" />
            </KeepAlive>
        </Transition>
    </RouterView>
</template>

<script setup lang="ts">
    import { useThemeStore } from './stores/theme'

    const themeStore = useThemeStore()
    const theme = computed(() => themeStore.theme)

    const show = ref(false)

    // watch effect
    watchEffect(() => {
        if (theme.value) {
            document.documentElement.classList.remove('dark')
            document.documentElement.classList.add('light')
        } else {
            document.documentElement.classList.remove('light')
            document.documentElement.classList.add('dark')
        }
    })

    onMounted(() => {
        show.value = true
    })
</script>

<style></style>
