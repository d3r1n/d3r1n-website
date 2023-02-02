<template>
	<div class="page-widget projects-page">
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
</script>

<style lang="scss">
.projects-repos {
	margin-bottom: 1rem;
}

.last-commit {
	margin-bottom: 1rem;
}
</style>