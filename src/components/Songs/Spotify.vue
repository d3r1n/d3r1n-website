<template>
    <div class="spotify sc-flex-center gap-5 font-nunito flex-wrap" v-if="currentlyPlaying || recentlyPlayed">
        <img 
            :src="currentlyPlaying?.coverArt || recentlyPlayed?.coverArt" alt="Cover Art" 
            class="spotify-cover rd-2 w-48 shadow-lg shadow-zinc-500 dark:shadow-zinc-700"
        >

        <div class="spotify-info items-center md:items-start w-max flex justify-center flex-col gap-2 text-slate-700 dark:text-neutral-300 text-lg">
            <span class="name text-2xl font-bold">
                {{ shortenText(currentlyPlaying?.name || recentlyPlayed?.name || "", 25) }}
            </span>
            <span class="artist">
                {{ currentlyPlaying?.artist || recentlyPlayed?.artist }}
            </span>
            <span class="outline outline-offset-2 outline-2 outline-slate-300 dark:outline-neutral-700 status sc-flex-center gap-2 bg-slate-200 p-2 rd-full dark:bg-neutral-800">
                <Music
                    class="stroke-green-400 dark:stroke-green-800"
                />
                <span id="spotify-text" class="text-base text-slate-500 dark:text-neutral-600">
                    {{ currentlyPlaying ? "Currently playing on Spotify" : "Recently Played on Spotify" }}
                </span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSpotifyStore } from '@/stores/spotify';

const spotifyStore = useSpotifyStore();
const currentlyPlaying = computed(() => spotifyStore.currentlyPlaying);
// const isPlaying = computed(() => spotifyStore.isPlaying);
const recentlyPlayed = computed(() => spotifyStore.recentlyPlayed);

function shortenText(text: string, maxLength: number) {
    if (text.length > maxLength) {
        return text.slice(0, maxLength) + "...";
    }

    return text;
}

// TODO: Hack (look at spotify store)
await spotifyStore.isLoaded();
</script>

<style scoped>
    
</style>