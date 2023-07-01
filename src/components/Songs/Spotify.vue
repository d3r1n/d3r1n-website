<template>
    <div class="spotify sc-flex-center gap-5 font-nunito flex-wrap" v-if="currentlyPlaying || recentlyPlayed">
        <img
            :src="currentlyPlaying?.coverArt || recentlyPlayed?.coverArt"
            alt="Cover Art"
            class="spotify-cover rd-2 w-48 h-48 shadow-lg shadow-zinc-400 dark:shadow-none"
        />

        <div
            class="spotify-info items-center md:items-start w-max flex justify-center flex-col gap-3 text-slate-700 dark:text-neutral-300 text-lg"
        >
            <Link
                :href="link"
                :label="shortenText(currentlyPlaying?.name || recentlyPlayed?.name || '', 25)"
                color="text-slate-700 dark:text-neutral-200"
                class="text-2xl font-medium"
            />
            <span class="artist mb-1 text-md font-light">
                {{ currentlyPlaying?.artist || recentlyPlayed?.artist }}
            </span>
            <span
                class="sc-flex-center gap-2 rd-2 p-2 bg-sky-100 dark:bg-sky-900 shadow-md shadow-sky-200 dark:shadow-none"
            >
                <Music class="stroke-sky-400 dark:stroke-sky-600" />

                <span id="spotify-text" class="text-base text-sky-400 dark:text-sky-600">
                    {{ currentlyPlaying ? 'Currently playing on Spotify' : 'Recently Played on Spotify' }}
                </span>
            </span>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useSpotifyStore } from '@/stores/spotify'

    const spotifyStore = useSpotifyStore()
    const currentlyPlaying = computed(() => spotifyStore.currentlyPlaying)
    // const isPlaying = computed(() => spotifyStore.isPlaying);
    const recentlyPlayed = computed(() => spotifyStore.recentlyPlayed)

    function shortenText(text: string, maxLength: number) {
        if (text.length > maxLength) {
            return text.slice(0, maxLength) + '...'
        }

        return text
    }

    const link = computed(() => {
        return currentlyPlaying.value?.link || recentlyPlayed.value?.link
    })

    // TODO: Hack (look at spotify store)
    await spotifyStore.isLoaded()
</script>

<style scoped></style>
