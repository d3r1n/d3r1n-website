<template>
    <Repo
        v-if="repos"
        v-for="repo in repos"
        :key="repo.name"
        :name="repo.name"
        :description="repo.description"
        :url="repo.html_url"
        :stars="repo.stargazers_count"
        :forks="repo.forks_count"
    />
</template>

<script setup lang="ts">
    import repoFilter from '@/assets/json/repos.json'
    import { GitHub, GitHubRepo } from '@/libs/github'

    const github = new GitHub(import.meta.env.VITE_GH_USERNAME)

    const repos = ref<GitHubRepo[] | null>(null)

    let response = await github.getRepos()

    // filter out repos that are not in the repoFilter
    response = response.filter((repo) => repoFilter.some((filter) => filter.repo === repo.name))

    // apply repoFilter descriptions
    response.forEach((repo) => {
        const filter = repoFilter.find((filter) => filter.repo === repo.name)
        if (filter) repo.description = filter.description
    })

    // sort by stars
    repos.value = response.sort((a, b) => b.stargazers_count - a.stargazers_count)
</script>

<style></style>
