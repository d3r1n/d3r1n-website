<template>
	<div class="music-page" :class="{ light: theme.theme, dark: !theme.theme }">
		<Navbar />

		<div class="content">
			<div class="grid">
				<MusicSpotifyWidget />
				<MusicTopItems />
				<MusicRecentlyPlayed />
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from "@/components/TheNavbar.vue";
import MusicSpotifyWidget from "@/components/Music/MusicSpotifyWidget.vue";
import MusicRecentlyPlayed from "@/components/Music/MusicRecentlyPlayed.vue";
import MusicTopItems from "@/components/Music/MusicTopItems.vue";

import { useTheme } from "@/store/theme";
import { useSpotify } from "@/store/spotify";
import { useIntervalState } from "@/store/interval-state";

import { onMounted, watch } from "vue";

const theme = useTheme();
const spotify = useSpotify();
const interval_state = useIntervalState();

onMounted(() => {
	// Change interval state
	interval_state.set_interval(true);

	watch(spotify, (val) => {
		let spotify_elm = document.querySelector(
			".spotify-widget-wrapper"
		) as HTMLElement;
		let recenlty_played = document.querySelector(
			".recently-played"
		) as HTMLElement;

		if (spotify_elm && recenlty_played) {
			if (
				val.currently_playing === null ||
				val.currently_playing.is_playing === false
			) {
				recenlty_played.style.gridRow = "1/3";
				recenlty_played.style.alignSelf = "flex-start";
			} else {
				recenlty_played.style.gridRow = "2/3";
				recenlty_played.style.alignSelf = "center";
			}
		}
	});
});
</script>

<style lang="scss">
.music-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100%;

	.navbar {
		justify-self: flex-start;
		margin-bottom: 30px;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		flex: 1;

		.grid {
			justify-self: center;
			display: grid;
			width: 90%;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 1fr 2fr;
			align-items: center;
			justify-items: center;

			row-gap: 15px;
			column-gap: 30px;

			margin-bottom: 30px;

			.spotify-widget-wrapper {
				justify-self: center;

				height: max-content;
			}

			.top-items {
				justify-self: center;
				align-self: flex-start;
				grid-row: 1 / 3;
				grid-column: 3 / 4;
			}

			.recently-played {
				justify-self: flex-start;

				grid-row: 2 / 3;
				grid-column: 1 / 2;
			}

			// Media tags
			@media (max-width: 1000px) {
				grid-template-columns: 1fr;
				grid-template-rows: auto auto auto;

				.top-items,
				.recently-played {
					justify-self: center;
				}

				.top-items {
					grid-row: 3 / 4;
					grid-column: 1 / 2;

					width: 90%;

					margin-bottom: 30px;
				}

				.recently-played {
					grid-row: 2 / 3;
					grid-column: 1 / 2;
				}
			}
		}
	}

	&.light {
		background-color: $light-background;
		color: $light-foreground;
	}

	&.dark {
		background-color: $dark-background;
		color: $dark-foreground;
	}
}
</style>
