<template>
	<div class="spotify-widget" :class="{'light': theme.theme, 'dark': !theme.theme}" v-if="currently_playing != null">
		<div class="track">
			<img class="cover" :src="currently_playing.track.art_url" alt="Track/Album Cover" draggable="false">

			<div class="details">
				<span class="title">
					{{ currently_playing.track.song_name }}
				</span>

				<span class="artist">
					{{ currently_playing.track.artist }}
				</span>
			</div>
		</div>

		<span class="progress"></span>

		<button class="widget-btn" @click="open_on_spotify">Play</button>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref, onUpdated, watchEffect } from "vue";
import ProgressBar from 'progressbar.js';

import { Spotify, SpotifyError, CurrentlyPlaying } from "@/lib/spotify-helper";
import { useTheme } from "@/store/theme";

const theme = useTheme();

// Import env variables
const _client_id = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const _client_secret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const _refresh_token = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const client = new Spotify(_client_id, _client_secret, _refresh_token);
const currently_playing = ref<CurrentlyPlaying | null>(null);

const duration = ref(0);
const progress = ref(0);

const trail_dark = "#61605f32"
const trail_light = "#1d1c1a32"

const progress_bar: Ref<any | null> = ref(null);
const progress_bar_config = ref({
	strokeWidth: 2,
	color: '#1DB954',
	trailWidth: 2,
	trailColor: "",
	easing: 'linear',
	duration: 1000,
});

function normalize (val: number, max: number, min: number): number { return (val - min) / (max - min); }

function open_on_spotify(): void {
	if (currently_playing.value != null) {
		window.open(currently_playing.value.track.song_url, '_blank');
	}
}

onMounted(async () => {
	// Set an interval to update presence every 500ms
	setInterval(async () => {
		// Get currently playing
		const _currently_playing = await client.get_currently_playing();

		// Check Error
		if (_currently_playing instanceof SpotifyError) {
			if (_currently_playing.message === "Error refreshing access token") {
				// Refresh token
				await client.refresh_access_token();
			}
			return;
		}

		// Check if track is playing
		if (!_currently_playing.is_playing) {
			currently_playing.value = null;
			return;
		}

		// If track is changed, update current track
		if (currently_playing.value?.track.song_name !== _currently_playing.track.song_name) {
			currently_playing.value = _currently_playing;
		}

		// Update progress
		// Convert duration and progress to seconds
		duration.value = Math.floor(_currently_playing.duration / 1000);
		progress.value = Math.floor(_currently_playing.progress / 1000);
	}, 1000);
});

onUpdated(() => {
	if (currently_playing.value == null) {
		progress_bar.value?.destroy();
		progress_bar.value = null;
		return;
	}
	else {
		if (progress_bar.value == null) {
			progress_bar.value = new ProgressBar.Line('.progress', progress_bar_config.value);
		}
	}
})

// Update progress bar
watch([duration, progress], ([duration, progress]) => {
	if (progress_bar.value != null) {
		(progress_bar.value as any).animate(normalize(progress, duration, 0));
	}
});

// Update bar color
watchEffect(() => {
	if (progress_bar.value != null) {
		progress_bar_config.value.trailColor = theme.theme ? trail_light : trail_dark;
		progress_bar.value.destroy();
		progress_bar.value = new ProgressBar.Line('.progress', progress_bar_config.value);
		progress_bar.value.set(normalize(progress.value, duration.value, 0));
	}
});
</script>

<style lang="scss">	
@import '@/styles/variables.scss';

.spotify-widget {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	max-width: 30%;
	height: min-content;
	padding: 15px;
	border-radius: 15px;

	.track {
		display: flex;
		align-items: center;
		justify-content: center;

		.cover {
			width: 40%;
			border-radius: 15px;	
		}

		.details {
			display: flex;
			flex-direction: column;
			margin-left: 15px;

			width: 60%;

			.title {
				font-size: 1.5em;
				font-weight: 600;
			}

			.artist {
				font-size: 1em;
				font-weight: 400;
			}
		}
	}

	.progress {
		width: 100%;

		svg {
			width: 100%;
			margin-top: 10px;
			border-radius: 2em;

			path {
				stroke-linecap: round;
			}
		}
	}

	.widget-btn {
		font-family: inherit;
		font-size: 18px;
		font-weight: 400;

		width: 30%;
		height: 3em;
		margin-top: 10px;

		border: none;
		border-radius: 4em;

		color: $light-background;
		background-color: $accent-purple;

		transition: transform 0.2s ease-in-out;

		&:hover {
			cursor: pointer;
			transform: scale(1.05);
		}
	}

	&.light {
		color: $light-foreground;
		background: $light-secondary;
	}

	&.dark {
		color: $dark-foreground;
		background: $dark-secondary;
	}
}


</style>