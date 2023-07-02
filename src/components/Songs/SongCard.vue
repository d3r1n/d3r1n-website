<template>
    <div class="song-card rd-2 group relative h-64 w-64 flex-col overflow-hidden">
        <img :src="song.cover" class="z-0 h-full w-full object-cover" />

        <!-- Background Overlay -->
        <div
            class="absolute left-0 top-0 z-10 h-full w-full bg-slate-100 bg-opacity-0 transition-all duration-500 group-hover:bg-opacity-60 group-hover:backdrop-blur dark:bg-neutral-900 dark:bg-opacity-0"
        ></div>

        <div
            class="song-info font-nunito duration-800 absolute bottom-5 left-5 z-20 flex translate-y-20 flex-col items-start justify-center gap-3 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
            <Link :label="song.name" :href="song.url" class="text-xl text-slate-800 dark:text-neutral-100" />
            <span class="text-lg font-light text-slate-700 dark:text-neutral-400">{{ song.artist }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    interface Song {
        name: string
        artist: string
        cover: string
        url: string
    }

    defineProps({
        song: {
            type: Object as PropType<Song>,
            required: true
        }
    })
</script>
