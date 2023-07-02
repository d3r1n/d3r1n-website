<template>
    <div class="track-card rd-2 group relative h-56 w-56 flex-col overflow-hidden" v-if="track || artist">
        <img :src="track?.coverArt || artist?.image" class="z-0 h-full w-full object-cover" />

        <!-- Background Overlay -->
        <div
            class="absolute left-0 top-0 z-10 h-full w-full bg-slate-100 bg-opacity-0 transition-all duration-500 group-hover:bg-opacity-60 group-hover:backdrop-blur dark:bg-neutral-900 dark:bg-opacity-0"
        ></div>

        <div
            class="track-info font-nunito duration-800 absolute bottom-5 left-5 z-20 flex translate-y-20 flex-col items-start justify-center gap-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
            <Link :label="shorten(artist?.name || track?.name, 20)" :href="track?.link || artist?.link" class="text-xl text-slate-800 dark:text-neutral-100" />
            <span class="text-lg font-light text-slate-700 dark:text-neutral-400" v-if="track">{{ shorten(track.artist, 20) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { Track, Artist } from '@/libs/spotify';

// either track or artist
defineProps<{
    track?: Track
    artist?: Artist
}>()

function shorten(str: string | undefined, maxLen: number) {
    if (!str) return '';
    if (str.length <= maxLen) return str;
    return `${str.substring(0, maxLen - 3)}...`;
}
</script>
