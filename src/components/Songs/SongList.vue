<template>
    <div class="top-tracks sc-flex-center flex-col gap-10">
        <h1 class="font-roboto m-0 text-3xl tracking-wide text-slate-800 dark:text-neutral-200">Top Tracks</h1>

        <div class="sc-flex-center flex-wrap gap-10">
            <SongCard v-for="track in topAll?.tracks" :key="track.name" :track="track" />
        </div>
    </div>

    <div class="top-artists sc-flex-center flex-col gap-10">
        <h1 class="font-roboto m-0 text-3xl tracking-wide text-slate-800 dark:text-neutral-200">Top Artists</h1>

        <div class="sc-flex-center flex-wrap gap-10">
            <SongCard v-for="artist in topAll?.artists" :key="artist.name" :artist="artist" />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useSpotifyStore } from '@/stores/spotify'
    import { TopAll } from '@/libs/spotify'

    const spotifyStore = useSpotifyStore()

    const topAll = ref<TopAll | null>(null)

    try {
        topAll.value = await spotifyStore.getTopAll()
    } catch (error) {
        console.error(error)
    }
</script>
