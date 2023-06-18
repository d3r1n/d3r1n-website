import { defineStore } from "pinia";
import { ref } from "vue";
import { Spotify, Track } from "@/libs/spotify";

const env = import.meta.env

const spotify = new Spotify(
    env.VITE_SP_CLIENT_ID,
    env.VITE_SP_CLIENT_SECRET,
    env.VITE_SP_REFRESH_TOKEN
)

export const useSpotifyStore = defineStore("spotify", () => {
    const isPlaying = ref<boolean>(false)
    const currentlyPlaying = ref<Track | null>(null)
    const recentlyPlayed = ref<Track | null>(null)

    // Intervals
    const intervalFn = async () => {
        const promises = [
            spotify.getIsPlaying(),
            spotify.getCurrentlyPlaying(),
            spotify.getRecentlyPlayed()
        ]
        // @ts-ignore
        const response: [boolean, Track | null, Track] = await Promise.all(promises)
        const [playing, current, recent] = response

        isPlaying.value = playing
        currentlyPlaying.value = current
        recentlyPlayed.value = recent
        console.log("Updated Spotify")
    }

    intervalFn()
    setInterval(intervalFn, 5000)

    async function getTopAll() {
        return await spotify.getTopAll()
    }

    return {
        currentlyPlaying,
        isPlaying,
        recentlyPlayed,
        getTopAll,
    }
})