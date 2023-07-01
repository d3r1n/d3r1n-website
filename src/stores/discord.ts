import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DiscordUser, Discord } from '@/libs/discord'

const discord = new Discord(import.meta.env.VITE_DC_ID)

export const useDiscordStore = defineStore('discord', () => {
    const user = ref<DiscordUser | null>(null)

    async function fetchUser() {
        user.value = await discord.fetch()
    }

    return {
        user,
        fetchUser
    }
})
