<template>
	<div class="navbar" :class="{'light': theme.theme, 'dark': !theme.theme}">
		<span class="left-side-buttons">
			<router-link :to="{name: 'home'}" class="navbar-button" v-html="smile">
			</router-link>

			<router-link :to="{name: 'music'}" class="navbar-button" v-html="music">
			</router-link>

			<router-link :to="{name: 'not-found'}" class="navbar-button" v-html="git_branch">
			</router-link>

			<router-link :to="{name: 'not-found'}" class="navbar-button" v-html="at_sign">
			</router-link>
		</span>

		<span class="theme-button" v-on:click="theme.toggle_theme()" v-html="moon">
		</span>
	</div>
</template>

<script setup lang="ts">
import { useTheme } from "@/store/theme";
import { onMounted, ref, } from "vue";

import at_sign from "@/assets/svg/at-sign.svg?raw";
import git_branch from "@/assets/svg/git-branch.svg?raw";
import smile from "@/assets/svg/smile.svg?raw";
import music from "@/assets/svg/music.svg?raw";
import moon from "@/assets/svg/moon.svg?raw";

const theme = useTheme();
</script>

<style lang="scss">
@import "@/styles/variables.scss";

.navbar {
	overflow: hidden;
	display: flex;
	align-items: center;
	justify-content: space-between;

	width: 90%;
	height: 100%;
	margin-top: 15px;
	overflow: visible;

	.left-side-buttons {
		display: flex;
		align-items: center;
		justify-content: space-between;
		align-self: flex-start;

		width: min-content;
		height: 100%;
	}

	.navbar-button, .theme-button {
		display: flex;
		align-items: center;
		justify-content: center;

		width: 75px;
		height: 75px;

		border-radius: 10px;
		transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;

		svg {
			width: 50px;
			height: 50px;
		}

		&:hover {
			cursor: pointer;
			transform: scale(1.05);
		}
	}

	.navbar-button {
		margin-right:15px;

		&:last-child {
			margin-right: 0;
		}
	}

	&.light, &.dark {
		.navbar-button:hover {
			background-color: rgba(120, 104, 230, 0.5);
		}
	}

	&.light {
		.navbar-button, .theme-button {
			background-color: $light-secondary;
			
			svg {
				stroke: $light-foreground;
			}
		}
	}

	&.dark {
		.navbar-button, .theme-button {
			background-color: $dark-secondary;
			
			svg {
				stroke: $dark-foreground;
			}
		}
	}
}

@media (max-width: 1000px) {
	.navbar {
		justify-content: space-evenly;

		.navbar-button, .theme-button {
			width: 60px;
			height: 60px;

			svg {
				width: 60%;
				height: 60%;
			}
		}

		.theme-button {
			margin-left: 10px;
		}

		.navbar-button {
			margin-right: 10px;
		}

		.navbar-button:last-child {
			margin-right: 0;
		}
	}
}
</style>