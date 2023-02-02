<template>
	<div class="recently-played" v-if="(tracks !== null)" :class="{'light': theme.theme, 'dark': !theme.theme}">
		<h1 class="header">Recently Played</h1>
		<div class="tracks">
			<div class="track" v-for="track in tracks" >
				<img :src="track.art_url" alt="Album Art" draggable="false">

				<span class="track-info">
					<span class="track-name" @click="on_click(track)">
						{{ track.song_name }}
					</span>
					<span class="track-artist">
						{{ track.artist }}
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Libraries
import { ref, onMounted, Ref, watch } from "vue";
// Spotify Helper
import { Track } from "@/lib/spotify-helper";
// Stores
import { useSpotify } from "@/store/spotify";
import { useTheme } from "@/store/theme";

// Setup Stores
const theme = useTheme();
const spotify = useSpotify();

// Setup Refs
const tracks: Ref<Track[] | null> = ref(null);

function on_click(track: Track) {
	window.open(track.song_url, "_blank");
}

// Assign Tracks
onMounted(() => {
	let interval: any;
	let interval_function = () => {
		if (spotify.recent_tracks !== null) {
			tracks.value = spotify.recent_tracks;
			clearInterval(interval);
		}
	}

	interval = setInterval(interval_function, 100);
});

// Shorten all track names
watch(tracks, (new_tracks) => {
	if (new_tracks === null) return;

	new_tracks.forEach((track) => {
		if (track.song_name.length > 20) {
			track.song_name = track.song_name.substring(0, 20) + "...";
		}
	});

	tracks.value = new_tracks;
});

</script>

<style lang="scss">
.recently-played {
	display: flex;
	font-size: 12px;

	width: 90%;

	flex-direction: column;

	.header {
		font-size: 2em;
		font-weight: 300;
		font-style: italic;
		opacity: 0.5;
		margin-bottom: 15px;
	}

	.tracks {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: max-content;

		gap: 15px;

		.track {
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: center;
			height: 100px;
			width: 100%;

			border-radius: 15px;
			overflow: hidden;
			
			img {
				width: 100px;
				border-radius: 15px 0 0 15px;
			}

			.track-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 15px;
				margin-right: 15px;

				.track-name {
					font-size: 1.5em;
					font-weight: 500;

					&:hover {
						cursor: pointer;
					}
				}

				.track-artist {
					font-size: 1em;
					font-weight: 300;
				}
			}
		}
	}

	&.light {
		.header {
			color: $light-foreground;
		}

		.tracks .track {
			background-color: $light-secondary;
			color: $light-foreground;
		}
	}

	&.dark {
		.header {
			color: $dark-foreground;
		}

		.tracks .track {
			background-color: $dark-secondary;
			color: $dark-foreground;
		}
	}
}
</style>