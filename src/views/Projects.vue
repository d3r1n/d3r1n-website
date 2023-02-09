<template>
	<div
		class="page-widget projects-page"
		:class="{ light: theme.theme, dark: !theme.theme }"
	>
		<Navbar />

		<div class="content">
			<ProjectsRepos />
			<ProjectsLastCommit />
		</div>
	</div>
</template>

<script setup lang="ts">
import Navbar from "@/components/TheNavbar.vue";
import ProjectsLastCommit from "@/components/Projects/ProjectsLastCommit.vue";
import ProjectsRepos from "@/components/Projects/ProjectsRepos.vue";

import { useTheme } from "@/store/theme";
import { useIntervalState } from "@/store/interval-state";

import { onBeforeMount } from "vue";

const theme = useTheme();
const interval_state = useIntervalState();

onBeforeMount(() => {
	// Change interval state
	interval_state.set_interval(false);
});
</script>

<style lang="scss">
.projects-page {
	&.light {
		background-color: $light-background;
	}

	&.dark {
		background-color: $dark-background;
	}
}

.projects-repos {
	margin-bottom: 1rem;
}

.last-commit {
	margin-bottom: 1rem;
}
</style>
