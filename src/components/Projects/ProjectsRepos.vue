<template>
	<div
		class="projects-repos"
		v-if="repos"
		:class="{ light: theme.theme, dark: !theme.theme }"
	>
		<div class="header">
			<h1>Projects</h1>
			<p>Here are some of my open-source projects</p>
		</div>

		<div class="repos">
			<div class="repo" v-for="repo in repos">
				<span class="name">
					<a
						:href="repo.html_url"
						target="_blank"
						rel="noopener noreferrer"
						>{{ repo.name }}</a
					>
				</span>

				<span class="description">{{ repo.description }}</span>

				<span class="details">
					<span class="language">
						<b>{{ repo.language }}</b>
					</span>

					<span class="stars">
						<b>{{ repo.stars }}</b> stars
					</span>

					<span class="forks">
						<b>{{ repo.forks }}</b> forks
					</span>
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Github, GithubError, Repository } from "@/lib/github-helper";
import { onMounted, ref } from "vue";
import { useTheme } from "@/store/theme";

import projects_filter from "@/assets/json/projects_filter.json";

const github = new Github(import.meta.env.VITE_GITHUB_USERNAME);
const theme = useTheme();

const repos = ref<Repository[] | null>(null);

const getRepos = async () => {
	try {
		let res = await github.get_repos();
		// filter repos
		let filtered_repos = projects_filter.filtered_repositories;
		res = res.filter((repo) => {
			return filtered_repos.includes(repo.name);
		});

		let custom_details = projects_filter.custom_repository_details;
		res.forEach((repo) => {
			//@ts-ignore
			repo.description = custom_details[repo.name].description;
			//@ts-ignore
			repo.name = custom_details[repo.name].name;
		});

		repos.value = res;
	} catch (e) {
		if (e instanceof GithubError) {
			console.error(e.message);
		} else {
			console.error(e);
		}
	}
};

onMounted(() => {
	getRepos();
});
</script>

<style lang="scss">
.projects-repos {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100%;

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-bottom: 2rem;
		opacity: 0.5;
		text-align: center;

		h1 {
			font-size: 2.5rem;
			font-weight: 600;
			margin: 0 0 1rem 0;
		}

		p {
			font-size: 1.2rem;
			font-weight: 300;
			margin: 0;
		}
	}

	// create a grid of repos that can be responsive
	.repos {
		display: grid;
		grid-template-columns: repeat(2, minmax(300px, 1fr));
		grid-gap: 1rem;
		width: 100%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 1rem;

		.repo {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			text-align: center;

			width: 100%;
			height: 100%;

			gap: 1rem;
			padding: 1rem;
			border-radius: 15px;
			box-sizing: border-box;

			.name {
				font-size: 1.5rem;
				font-weight: 600;
				font-style: oblique;

				a {
					color: $accent-purple;
					text-decoration: none;
					transition: all 0.2s ease-in-out;

					&:hover {
						color: $accent-purple;
						text-decoration: underline;
					}
				}
			}

			.description {
				font-size: 1.2rem;
				font-weight: 300;
			}

			.details {
				display: flex;
				flex-direction: row;
				align-items: center;
				justify-content: center;
				gap: 1rem;

				.language {
					font-size: 1.2rem;
					font-weight: 300;
				}

				.stars {
					font-size: 1.2rem;
					font-weight: 300;
				}

				.forks {
					font-size: 1.2rem;
					font-weight: 300;
				}

				b {
					color: $accent-pink;
				}
			}
		}
	}

	&.dark {
		color: $dark-foreground;

		.repo {
			background-color: $dark-secondary;
		}
	}

	&.light {
		color: $light-foreground;

		.repo {
			background-color: $light-secondary;
		}
	}

	// responsive
	@media screen and (max-width: 1000px) {
		// header
		.header {
			margin-top: 1rem;
			width: 90%;
		}

		.repos {
			width: 90%;
			padding: 0;
			grid-template-columns: repeat(1, minmax(300px, 1fr));
		}
	}
}
</style>
