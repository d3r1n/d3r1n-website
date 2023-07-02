<template>
    <div class="spotify sc-flex-center font-nunito flex-wrap gap-5" v-if="currentlyPlaying || recentlyPlayed">
        <img
            :src="currentlyPlaying?.coverArt || recentlyPlayed?.coverArt"
            alt="Cover Art"
            class="spotify-cover rd-2 h-48 w-48 shadow-lg shadow-zinc-400 dark:shadow-none"
        />

        <div
            class="spotify-info flex w-max flex-col items-center justify-center gap-3 text-lg text-slate-700 dark:text-neutral-300 md:items-start"
        >
            <Link
                :href="link"
                :label="shortenText(currentlyPlaying?.name || recentlyPlayed?.name || '', 25)"
                color="text-slate-700 dark:text-neutral-200"
                class="text-2xl font-medium"
            />
            <span class="artist text-md mb-1 font-light">
                {{ currentlyPlaying?.artist || recentlyPlayed?.artist }}
            </span>
            <span
                class="sc-flex-center rd-2 gap-2 bg-emerald-100 p-2 shadow-md shadow-emerald-200 dark:bg-emerald-900 dark:shadow-none"
            >
                <Music class="stroke-emerald-400 dark:stroke-emerald-600" />

                <span id="spotify-text" class="text-base text-emerald-400 dark:text-emerald-600">
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
