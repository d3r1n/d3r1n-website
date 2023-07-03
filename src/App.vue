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

    useHead({
        titleTemplate: (title?: string) => (title ? `${title} | d3r1n.com` : 'd3r1n.com'),
        meta: [
            { name: 'description', content: "d3r1n's portfolio, built with Vue.js, TypeScript and UnoCSS" },
            { name: 'keywords', content: 'd3r1n, portfolio, derin onder eren' },
            { name: 'og:title', content: 'd3r1n.com' },
            { name: 'og:description', content: "d3r1n's portfolio, built with Vue.js, TypeScript and UnoCSS" },
            { name: 'og:type', content: 'website' },
            { name: 'og:url', content: 'https://d3r1n.com' },
            { name: 'og:image', content: `https://d3r1n.com/banner.png?v=${Date.now()}` },
            { name: 'og:site_name', content: 'd3r1n.com' },
            { name: 'twitter:card', content: 'summary_large_image' }
        ],
        link: [{ rel: 'icon', type: 'image/svg+xml', sizes: 'any', href: '/favicon.svg' }]
    })

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
