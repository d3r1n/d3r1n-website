<template>
	<div class="home-page" :class="{'light': theme.theme, 'dark': !theme.theme}">
		<Navbar />
		
		<div class="home-page-content">
			<HomeProfile />
			<MusicSpotifyWidget />
			<HomeAbout />
			<HomeTopRepo />	
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
@import "@/styles/variables.scss";

.home-page {
	display: flex;
	flex-direction: column;
	align-items: center;

	min-height: 100%;

	.navbar {
		justify-self: flex-start;
		margin-bottom: 30px;
	}

	.home-page-content {
		justify-self: center;
		display: grid;
		width: 90%;
		grid-template-columns: 6fr 3fr;
		align-items: center;
		justify-items: center;

		gap: 30px;

		.home-profile {
			justify-self: stretch;
		}

		.home-about {
			width: 80%;
			height: 90%;
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
