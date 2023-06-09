import { defineStore } from 'pinia';
import { ref } from 'vue';
import { DiscordUser, Discord } from '@/libs/discord';

const discord = new Discord(import.meta.env.VITE_DISCORD_ID);

export const useDiscordStore = defineStore('discord', () => {
    const user = ref<DiscordUser | null>(null);

    async function fetchUser() {
        const response = await discord.fetch();

        user.value = response;
    }

    return {
        user,
        fetchUser
    };
});