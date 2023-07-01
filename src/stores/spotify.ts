import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Spotify, Track } from '@/libs/spotify'

const env = import.meta.env

const spotify = new Spotify(env.VITE_SP_CLIENT_ID, env.VITE_SP_CLIENT_SECRET, env.VITE_SP_REFRESH_TOKEN)

export const useSpotifyStore = defineStore('spotify', () => {
    const isPlaying = ref<boolean>(false)
    const currentlyPlaying = ref<Track | null>(null)
    const recentlyPlayed = ref<Track | null>(null)

    // Intervals
    const intervalFn = async () => {
        // Refresh access token to prevent repeated refreshing
        // for parallel requests
        await spotify.refreshAccessToken()

        const requests = [spotify.getIsPlaying(), spotify.getCurrentlyPlaying(), spotify.getRecentlyPlayed()]
        // @ts-ignore
        const response: [boolean, Track | null, Track] = await Promise.all(requests)
        const [playing, current, recent] = response

        isPlaying.value = playing
        currentlyPlaying.value = current
        recentlyPlayed.value = recent
    }

    intervalFn()
    setInterval(intervalFn, 10000)

    async function getTopAll() {
        return await spotify.getTopAll()
    }

    // Async function that does not resolve until everything is loaded
    // Used in the Spotify component for Suspense
    // I know it's kinda hacky but it works :P
    // TODO: better solution?
    async function isLoaded(): Promise<void> {
        return new Promise((resolve) => {
            const interval = setInterval(() => {
                if (currentlyPlaying.value || recentlyPlayed.value) {
                    clearInterval(interval)
                    resolve()
                }
            }, 100)
        })
    }

    return {
        currentlyPlaying,
        isPlaying,
        recentlyPlayed,
        isLoaded,
        getTopAll
    }
})
