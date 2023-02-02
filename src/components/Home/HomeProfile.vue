<template>
	<div class="home-profile">
		<div class="avatar" v-if="presence.image_url">
			<div id="avatar-frame">
				<svg width="0" height="0">
					<clipPath id="avatar-mask" >
						<path
						d="M212.802 166.904C226.528 168.367 244.037 165.691 247.029 152.216C248.974 143.455 250 134.347 250 125C250 55.9644 194.036 0 125 0C55.9644 0 0 55.9644 0 125C0 194.036 55.9644 250 125 250C134.347 250 143.455 248.974 152.216 247.029C165.691 244.037 168.367 226.528 166.904 212.802C166.747 211.334 166.667 209.843 166.667 208.333C166.667 185.321 185.321 166.667 208.333 166.667C209.843 166.667 211.334 166.747 212.802 166.904Z"
						></path>
					</clipPath>
				</svg>

				<img :src="presence.image_url" draggable="false" alt="Discord Profile Image"/>
			</div>
			<span id="status_circle" :style="{ 'backgroundColor': status_color }"></span>
		</div>

		<div class="info">
			<span class="greeting">Merhaba!</span>

			<span class="name">
				<p>I'm Derin Önder <span>"d3r1n"</span> Eren</p>
			</span>

			<span class="presence">{{ presence_text }}</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useDiscordPresence } from "@/store/discord"
import { Discord, DiscordError } from "@/lib/discord-helper"
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useSpotify } from "@/store/spotify";

const presence = useDiscordPresence()
const spotify = useSpotify();

const presence_text = ref("")
const status_color = ref("")

const helper = new Discord(import.meta.env.VITE_DISCORD_ID)

let interval: any;

onMounted(async () => {
	// Set an interval to update presence every 500ms
	const interval_function = () => {
		helper.get_presence().then((_presence) => {
			// Update Presence
			presence.presence = _presence;
		}).catch((err: DiscordError) => {
			console.error(err);
		});
	}
	interval_function();
	interval = setInterval(interval_function, 5000);
});

// Watch for presence changes
watch([presence, spotify], ([new_presence, new_spotify]) => {
	// Set status text
	if (new_presence.status === "online") {
		presence_text.value = "Online"
		status_color.value = " #2ecc71"
	} else if (new_presence.status === "idle") {
		presence_text.value = "Idle"
		status_color.value = "#e67e22"
	} else if (new_presence.status === "dnd") {
		presence_text.value = "Do Not Disturb"
		status_color.value = "#ED4245"
	} else if (new_presence.status === "offline") {
		presence_text.value = "Offline"
		status_color.value = "#99aab5"
	}

	if (new_presence.presence_text !== null) {
		if (new_presence.presence_text.length > 0) {
			presence_text.value += ` | ${presence.presence_text}`
		}
	}

	if (new_presence.presence_text === null) {
		if (new_spotify.currently_playing !== null && new_spotify.currently_playing.is_playing) {
			presence_text.value += " | Listening to Spotify"
		}
	}
})

onBeforeUnmount(() => {
	clearInterval(interval);
})

</script>

<style lang="scss">
.home-profile {
	user-select: none;

	display: flex;
	align-items: center;
	justify-content: center;
	width: fit-content;
	height: fit-content;

	.avatar {
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		width: 250px;
		height: 100%;

		#avatar-frame {
			width: 100%;
			height: 100%;
			clip-path: url(#avatar-mask);

			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
		}

		#status_circle {
			display: inline-block;
			position: absolute;

			top: 72%;
			left: 72%;

			width: 65px;
			height: 65px;
			border-radius: 50%;
		}
	}

	.info {
		display: flex;
		flex-direction: column;
		justify-content: center;

		margin-left: 50px;

		.greeting {
			display: flex;
			align-items: center;
			font-size: 2em;
			font-weight: 600;
			color: $accent-purple;
		}

		.name {
			font-size: 1.5em;
			font-weight: 400;
			display: flex;
			flex-direction: row;
			margin-top: 10px;
			margin-bottom: 10px;
			text-align: center;

			p {
				margin: 0;

				span {
					font-weight: 600;
					color: $accent-pink;
				}
			}
		}

		.presence {
			font-size: 1em;
			font-weight: 200;
			opacity: 50%;
			font-style: italic;
		}
	}

	@media screen and (max-width: 1000px) {
		flex-direction: column;
		margin-left: 0;

		.avatar {
			#avatar-frame svg clipPath path {
				transform: scale(0.8);
			}

			width: 200px;
			height: 200px;
			margin-bottom: 15px;
		}

		.info {
			font-size: 0.8em;

			align-items: center;
			margin-left: 0;
		}
	}
}
</style>