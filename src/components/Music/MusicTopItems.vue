<template>
	<div class="top-items" :class="{'light': theme.theme, 'dark': !theme.theme}">
		<div class="header" v-if="currently_selected == 'tracks'">Top Tracks</div>
		<div class="header" v-else>Top Artists</div>

		<div class="items" v-if="currently_selected == 'tracks'">
			<div class="item" v-for="track in top_tracks">
				<img :src="track.art_url" alt="Album Art" draggable="false">

				<span class="item-info">
					<span class="item-name" @click="on_click(track)">
						{{ track.song_name }}
					</span>
					<span class="item-artist">
						{{ track.artist }}
					</span>
				</span>
			</div>
		</div>

		<div class="items" v-else>
			<div class="item" v-for="artist in top_artists">
				<img :src="artist.art_url" alt="Album Art" draggable="false">

				<span class="item-info">
					<span class="item-name" @click="on_click(artist)">
						{{ artist.artist_name }}
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
// Libraries
import { ref, onMounted, Ref, watch, onBeforeUnmount } from "vue";
// Spotify Helper
import { Track, Artist } from "@/lib/spotify-helper";
// Stores
import { useSpotify } from "@/store/spotify";
import { useTheme } from "@/store/theme";

// Setup Stores
const theme = useTheme();
const spotify = useSpotify();

// Setup Refs and Reactives
const top_tracks: Ref<Track[] | null> = ref(null);
const top_artists: Ref<Artist[] | null> = ref(null);
const currently_selected: Ref<"tracks" | "artists"> = ref("tracks");

function on_click(item: Track | Artist) {
	// If the item is a track, open the track url
	if ("song_url" in item) {
		window.open(item.song_url, "_blank");
	}
	// If the item is an artist, open the artist url
	else {
		window.open(item.artist_url, "_blank");
	}
}

let anim_interval: any;

// Assign Tracks and Artists
onMounted(() => {
	let interval: any;
	let interval_function = () => {
		if (spotify.top_tracks != null && spotify.top_artists != null) {
			top_tracks.value = spotify.top_tracks.map((track) => {
				if (track.song_name.length > 20) {
					track.song_name = track.song_name.substring(0, 20) + "...";
				}
				return track;
			});
			top_artists.value = spotify.top_artists;
			clearInterval(interval);
		}
	}

	interval = setInterval(interval_function, 100);

	// Change the currently selected item
	anim_interval = setInterval(() => {
		const elm_items = document.getElementsByClassName("top-items") as HTMLCollectionOf<HTMLElement>;
		elm_items[0].classList.toggle("fade");

		setTimeout(() => {
			if (currently_selected.value == "tracks") {
				currently_selected.value = "artists";
			}
			else {
				currently_selected.value = "tracks";
			}

			elm_items[0].classList.toggle("fade");
		}, 1000);

	}, 10 * 1000);
});

// Clear the interval when the component is unmounted
onBeforeUnmount(() => {
	clearInterval(anim_interval);
});
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.top-items {
	display: flex;
	font-size: 12px;

	transition: opacity 1s ease-in;
	flex-direction: column;

	width: 80%;

	.header {
		font-size: 2em;
		font-weight: 300;
		font-style: italic;
		opacity: 0.5;
		margin-bottom: 15px;
	}

	.items {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: max-content;

		gap: 15px;

		.item {
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

			.item-info {
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 15px;
				margin-right: 15px;

				.item-name {
					font-size: 1.5em;
					font-weight: 500;

					&:hover {
						cursor: pointer;
					}
				}

				.item-artist {
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

		.items .item {
			background-color: $light-secondary;
			color: $light-foreground;
		}
	}

	&.dark {
		.header {
			color: $dark-foreground;
		}

		.items .item {
			background-color: $dark-secondary;
			color: $dark-foreground;
		}
	}

	&.fade {
		opacity: 0;
	}
}
</style>