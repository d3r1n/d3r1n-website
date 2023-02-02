<template>
	<div class="home-page" :class="{'light': theme.theme, 'dark': !theme.theme}">
		<Navbar />
		
		<div class="content">
			<div class="grid">
				<HomeProfile />
				<MusicSpotifyWidget />
				<HomeAbout />
				<HomeTopRepo />	
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from "@/components/TheNavbar.vue";
import HomeProfile from "@/components/Home/HomeProfile.vue";
import MusicSpotifyWidget from "@/components/Music/MusicSpotifyWidget.vue";
import HomeTopRepo from "@/components/Home/HomeTopRepo.vue";
import HomeAbout from "@/components/Home/HomeAbout.vue";

import { useTheme } from "@/store/theme";

const theme = useTheme();
</script>

<style lang="scss">
.home-page {
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 100%;

	.navbar {
		justify-self: flex-start;
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
			height: min-content;
			grid-template-columns: 7fr 3fr;
			grid-template-rows: 1fr 1fr;
			align-items: center;
			justify-items: center;

			gap: 30px;

			.home-profile {
				justify-self: stretch;
			}

			.spotify-widget-wrapper {
				max-width: 550px;
			}

			.home-about {
				justify-self: stretch;
				width: 80%;
				height: max-content;
				max-width: 800px;
			}

			@media (max-width: 1000px) {
				grid-template-columns: 1fr;
				grid-template-rows: auto auto auto auto;

				.home-profile {
					justify-self: center;
				}

				.home-about {
					width: 90%;
					height: auto;

					font-size: 16px;
				}

				.home-top-repo {
					margin-bottom: 30px;

					.repo-name {
						font-size: 20px;
					}

					.repo-desc, .repo-info span {
						font-size: 18px;
					}
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

	@media screen and (max-width: 1000px) {
		.navbar {
			margin-bottom: 30px
		}
	}
}
</style>
