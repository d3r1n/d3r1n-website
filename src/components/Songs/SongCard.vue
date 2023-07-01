<template>
    <div class="song-card group relative flex-col w-64 h-64 rd-2 overflow-hidden">
        <img :src="song.cover" class="w-full h-full object-cover z-0" />

        <!-- Background Overlay -->
        <div
            class="absolute w-full h-full top-0 left-0 bg-slate-100 bg-opacity-0 z-10 transition-all duration-500 group-hover:bg-opacity-80 group-hover:backdrop-blur"
        ></div>

        <div
            class="song-info absolute flex flex-col items-start justify-center gap-3 font-nunito z-20 bottom-5 left-5 transition-all duration-800 translate-y-20 group-hover:translate-y-0 opacity-0 group-hover:opacity-100"
        >
            <Link :label="song.name" :href="song.url" class="text-xl text-slate-800 dark:text-neutral-100" />
            <span class="text-slate-700 dark:text-neutral-400 text-lg font-light">{{ song.artist }}</span>
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
