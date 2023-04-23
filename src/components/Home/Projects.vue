<template>
    <div class="projects font-fira-code" v-if="repos" id="projects">
        <div class="project" v-for="(repo, index) of repos" :id="'repo-' + index">
            <a class="name font-roboto-slab" :href="repo.html_url" target="_blank">{{ repo.name }}</a>
            <span class="description">{{ repo.description }}</span>
            <span class="info">{{ repoInfo(repo) }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { GitHub, GitHubError, Repository } from '~/libs/github-lib';
import VanillaTilt from 'vanilla-tilt';

import projectsFilterJson from '~/assets/json/projects-filter.jsonc?raw';

import { useAppState } from "~/composables/app-state"

const { isMobile } = useAppState()

const GH_USERNAME = import.meta.env.VITE_GH_USERNAME;
const github = new GitHub(GH_USERNAME);

const repos: Ref<Repository[] | null> = ref(null);

const filter: Array<{
    name: string;
    description: string;
    'raw-name': string;
}> = JSON.parse(projectsFilterJson)["projects"];

const getRepos = async () => {
    try {
        let _repos = await github.get_repos();

        // Apply Filter
        _repos = _repos.filter((repo) => {
            return filter.find((f) => f["raw-name"] === repo.name);
        });

        _repos = _repos.map((repo) => {
            const f = filter.find((f) => f["raw-name"] === repo.name);
            if (!f) throw new Error("Filter not found");

            repo.name = f.name;
            repo.description = f.description;
            return repo;
        });

        // Sort by stars
        _repos = _repos.sort((a, b) => b.stars - a.stars);

        repos.value = _repos;
    } catch (err) {
        if (err instanceof GitHubError) {
            console.error(err);
            setTimeout(getRepos, 1000);
        } else {
            throw err;
        }
    }
};

const repoInfo = (repo: Repository) => {
    return `${repo.language} • ${repo.stars} stars • ${repo.forks} forks`;
};

onMounted(async () => {
    await getRepos();
    
    // VanillaTilt
    let projects: any = document.getElementsByClassName("project");
    projects = Array.from(projects);

    watchEffect(() => {
        if (isMobile.value) {
            projects.forEach((project: any) => {
                project.vanillaTilt.destroy();
            });
        } else {
            projects.forEach((project: any) => {
                VanillaTilt.init(project, {
                    max: 5,
                    speed: 400,
                    perspective: 500,
                    glare: false,
                });
            });
        }
    });
});
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.projects {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(2, 1fr);
    grid-gap: 2rem;

    .project {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        padding: 1rem;

        border-radius: 0.5rem;
        background-color: var(--mantle);
        outline: solid 2px var(--overlay0);

        .name {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--text);
            text-decoration: none;
            width: fit-content;
        }

        .description {
            margin-top: 0.5rem;
            font-size: 1rem;
            color: var(--subtext0);
        }

        .info {
            margin-top: 0.5rem;
            font-size: 0.8rem;
            color: var(--subtext1);
        }
    }
}
</style>