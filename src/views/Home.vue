<template>
	<div class="home-page" :class="{'light': theme.theme, 'dark': !theme.theme}">
		<Navbar />
		<HomeProfile />
		<MusicSpotifyWidget />
	</div>
</template>

<script setup lang="ts">
import Navbar from "@/components/TheNavbar.vue";
import HomeProfile from "@/components/Home/HomeProfile.vue";
import MusicSpotifyWidget from "@/components/Music/MusicSpotifyWidget.vue";

import { useTheme } from "@/store/theme";

const theme = useTheme();



</script>

<style lang="scss">
@import "@/styles/variables.scss";

.home-page {
	display: flex;
	flex-direction: column;
	align-items: center;

	&.light {
		background-color: $light-background;

		.profile {
			color: $light-foreground;
		}
	}

	&.dark {
		background-color: $dark-background;

		.profile {
			color: $dark-foreground;
		}
	}

	.profile {
		margin-bottom: 30px;
	}
}
</style>