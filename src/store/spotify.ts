import { defineStore } from "pinia"
import { ref, Ref } from "vue"
import { CurrentlyPlaying, Track } from "../lib/spotify-helper"

export const useSpotify = defineStore("spotify", () => {
	const currently_playing: Ref<CurrentlyPlaying | null> = ref(null)
	const recent_songs: Ref<Array<Track> | null> = ref(null)
	const top_songs: Ref<Array<Track> | null> = ref(null)

	// setters
	function set_currently_playing(_currently_playing: CurrentlyPlaying) {
		currently_playing.value = _currently_playing
	}

	function set_recent_songs(_recent_songs: Array<Track>) {
		recent_songs.value = _recent_songs
	}

	function set_top_songs(_top_songs: Array<Track>) {
		top_songs.value = _top_songs
	}

	return {
		currently_playing,
		recent_songs,
		top_songs,
		set_currently_playing,
		set_recent_songs,
		set_top_songs,
	}
})
