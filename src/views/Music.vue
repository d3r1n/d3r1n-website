<template>
	<div class="music-page" :class="{'light': theme.theme, 'dark': !theme.theme}">
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

const theme = useTheme();

</script>

<style lang="scss">
@import "@/styles/variables.scss";

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
		flex: 1;

		.grid {
			justify-self: center;
			display: grid;
			width: 90%;
			grid-template-columns: 2fr 1fr 2fr;
			grid-template-rows: 1fr 2fr;
			align-items: center;
			justify-items: center;

			row-gap: 15px;
			column-gap: 30px;


			.spotify-widget-wrapper {
				justify-self: stretch;

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

				.top-items, .recently-played {
					justify-self: center;
				}

				.top-items {
					grid-row: 3 / 4;
					grid-column: 1 / 2;

					width: 90%;
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
