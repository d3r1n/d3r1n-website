<template>
    <div class="profile gap-5 md:gap-10 sc-flex-center flex-row flex-wrap-reverse font-nunito" v-if="user">
        <div class="profile-info w-auto flex flex-col flex-items-start flex-content-center gap-4">
            <span class="name text-slate-800 dark:text-neutral-100 font-roboto font-bold text-5xl tracking-wide">
                d3r1n
            </span>

            <div class="presence sc-flex-center gap-3 text-lg">
                <span class="status sc-flex-center">
                    <span
                        class="status-icon inline-block w-4 h-4 rounded-full mr-1"
                        :style="{ backgroundColor: statusColor }"
                    ></span>
                    <span class="status-text text-slate-700 dark:text-neutral-400">{{ user.status }}</span>
                </span>

                <span class="divider inline-block w-1 h-1 rounded-full bg-slate-300 dark:bg-neutral-900"></span>
                <span class="custom-status text-slate-500 dark:text-neutral-400">{{
                    user.custom_status || randomQuote
                }}</span>
            </div>

            <span class="links w-full flex items-center justify-start gap-4">
                <a
                    v-for="link in links"
                    :href="link.href"
                    target="_blank"
                    class="group sc-flex-center p-2 rd-2 bg-slate-200 dark:bg-neutral-800 transition-all duration-300 hover:bg-slate-300 dark:hover:bg-neutral-700"
                >
                    <component
                        :is="link.icon"
                        class="w-7 h-7 stroke-slate-400 dark:stroke-neutral-700 group-hover:stroke-slate-500 dark:group-hover:stroke-neutral-600"
                    />
                </a>
            </span>
        </div>

        <img :src="user.avatar" alt="" class="profile-avatar rd-2 w-64 h-64 shadow-lg shadow-avatar-color" />
    </div>
</template>

<script setup lang="ts">
    import { useDiscordStore } from '@/stores/discord'
    // @ts-ignore
    import ColorThief from '@/assets/js/color-thief.mjs'
    const colorThief = new ColorThief()

    const discordStore = useDiscordStore()
    const user = computed(() => discordStore.user)

    const colors = {
        online: '#43b581',
        idle: '#faa61a',
        dnd: '#f04747',
        offline: '#747f8d'
    }

    const statusColor = computed((): string => {
        const status = user.value?.status
        if (!status) return colors.offline
        // @ts-ignore
        return colors[status]
    })

    const randomQuote = computed(() => {
        const quotes = [
            '0xDEADBEEF',
            '0xCAFEBABE',
            '127.1.0.1',
            'i like stoicism',
            '9 + 10 = 21',
            'i like to code',
            'i like stem',
            "gaslighting isn't real",
            '10x html developer',
            'i like to play chess',
            '💀',
            '👨‍💻',
            '👨‍🚀',
            '👻',
            '🏢🛩️🏢🔥'
        ]
        return quotes[Math.floor(Math.random() * quotes.length)]
    })

    // https://discord.com/users/704758931343278162
    const links = [
        {
            href: 'mailto:contact@d3r1n.com',
            icon: defineAsyncComponent(() => import('@/assets/svg/AtSign.vue'))
        },
        {
            href: 'https://linkedin.com/in/d3r1n',
            icon: defineAsyncComponent(() => import('@/assets/svg/LinkedIn.vue'))
        },
        {
            href: 'https://github.com/d3r1n',
            icon: defineAsyncComponent(() => import('@/assets/svg/GitHub.vue'))
        },
        {
            href: 'https://discord.com/users/704758931343278162',
            icon: defineAsyncComponent(() => import('@/assets/svg/Discord.vue'))
        }
    ]

    const emit = defineEmits(['fetch-failed'])

    const fetchUser = async () => {
        try {
            await discordStore.fetchUser()
        } catch (error) {
            emit('fetch-failed', error)
        }
    }

    // initial fetch for suspense
    await fetchUser()

    onMounted(() => {
        // fetch user every 30 seconds
        setInterval(fetchUser, 1000 * 30)

        const img: HTMLImageElement | null = document.querySelector('.profile-avatar')
        if (!img) return
        img.crossOrigin = 'Anonymous'
        if (img.complete) {
            const color = colorThief.getColor(img)
            document.documentElement.style.setProperty('--avatar-color', `rgb(${color.join(',')}, 0.7)`)
        } else {
            img.addEventListener('load', () => {
                const color = colorThief.getColor(img)
                document.documentElement.style.setProperty('--avatar-color', `rgb(${color.join(',')}, 0.7)`)
            })
        }
    })
</script>
