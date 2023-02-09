<template>
	<div
		class="last-commit"
		v-if="lastCommit"
		:class="{ light: theme.theme, dark: !theme.theme }"
	>
		<div class="icon" v-html="git_commit"></div>

		<div class="commit-info">
			<span class="repo-name">{{ repo_name }} -</span>
			<span class="commit-hash">
				<a
					:href="`https://github.com/${github.username}/${repo_name}/commit/${lastCommit}`"
					target="_blank"
					rel="noopener noreferrer"
				>
					{{ lastCommit.slice(0, 7) }}
				</a>
			</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Github, GithubError } from "@/lib/github-helper";
import { onMounted, ref } from "vue";
import { useTheme } from "@/store/theme";

import git_commit from "@/assets/svg/git-commit.svg?raw";

const github = new Github(import.meta.env.VITE_GITHUB_USERNAME);
const theme = useTheme();

const lastCommit = ref<null | string>(null);
const repo_name = "d3r1n-website";

onMounted(() => {
	github
		.get_repo_last_commit_hash(repo_name)
		.then((hash) => {
			lastCommit.value = hash;
		})
		.catch((e) => {
			if (e instanceof GithubError) {
				console.error(e.message);
			} else {
				console.error(e);
			}
		});
});
</script>

<style lang="scss">
.last-commit {
	display: flex;
	align-items: center;
	justify-content: center;

	width: max-content;
	padding: 10px;

	box-sizing: border-box;
	border-radius: 10px;

	.icon {
		width: 1.5rem;
		height: 1.5rem;
		margin-right: 0.5rem;
	}

	.commit-info {
		display: flex;
		align-items: center;

		.repo-name {
			font-weight: 600;
			margin-right: 0.5rem;
		}

		.commit-hash {
			font-style: oblique;

			a {
				color: $accent-pink;
				text-decoration: underline;
			}
		}
	}

	&.light {
		background-color: $light-secondary;
		color: $light-foreground;
	}

	&.dark {
		background-color: $dark-secondary;
		color: $dark-foreground;
	}
}
</style>
