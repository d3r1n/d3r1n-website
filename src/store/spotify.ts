import { defineStore } from "pinia"
import { ref, Ref } from "vue"
import { CurrentlyPlaying, Track, Artist } from "../lib/spotify-helper"

export const useSpotify = defineStore("spotify", () => {
	const currently_playing: Ref<CurrentlyPlaying | null> = ref(null)
	const recent_tracks: Ref<Array<Track> | null> = ref(null)
	const top_tracks: Ref<Array<Track> | null> = ref(null)
	const top_artists: Ref<Array<Artist> | null> = ref(null)

	// setters
	function set_currently_playing(_currently_playing: CurrentlyPlaying) {
		currently_playing.value = _currently_playing
	}

	function set_recent_tracks(_recent_tracks: Array<Track>) {
		recent_tracks.value = _recent_tracks
	}

	function set_top_tracks(_top_tracks: Array<Track>) {
		top_tracks.value = _top_tracks
	}

	function set_top_artists(_top_artists: Array<Artist>) {
		top_artists.value = _top_artists
	}

	return {
		currently_playing,
		recent_tracks,
		top_tracks,
		top_artists,
		set_currently_playing,
		set_recent_tracks,
		set_top_tracks,
		set_top_artists
	}
})
