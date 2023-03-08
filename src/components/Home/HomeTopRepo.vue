<template>
    <div class="home-top-repo" v-if="topRepo !== null">
        <span class="top-repo-title" :class="{ light: theme.theme, dark: !theme.theme }">
            Top Repository
        </span>

        <div class="top-repo-wrapper" :class="{ light: theme.theme, dark: !theme.theme }">
            <div class="repo-title" @click="openGithub">
                {{ topRepo.name }}
            </div>

            <div class="repo-desc">
                {{ topRepo.description }}
            </div>

            <div class="repo-info">
                <span class="info-stars">
                    <b>{{ topRepo.stars }}</b> stars
                </span>

                <span class="info-forks">
                    <b>{{ topRepo.forks }}</b> forks
                </span>

                <span class="info-lang">
                    <b>{{ topRepo.language }}</b> language
                </span>
            </div>
        </div>

        <button class="btn-widget" @click="openGithub">Github</button>
    </div>
</template>

<script setup lang="ts">
import { useTheme } from "@/store/theme";
import { Github, GithubError, Repository } from "@/lib/github-helper";
import { onMounted, ref } from "vue";

const theme = useTheme();
const topRepo = ref<Repository | null>(null);

const github = new Github(import.meta.env.VITE_GITHUB_USERNAME);

const openGithub = () => {
    window.open(topRepo.value?.html_url, "_blank");
};

const getTopRepo = async () => {
    try {
        const repos = await github.get_repos();
        topRepo.value = Github.sort_by_stars(repos)[0];
    } catch (e) {
        if (e instanceof GithubError) {
            console.error(e.message);
        } else {
            console.error(e);
        }
    }
};

onMounted(() => {
    getTopRepo();
});
</script>

<style lang="scss">
.home-top-repo {
    display: flex;
    flex-direction: column;
    align-items: center;

    .top-repo-title {
        align-self: flex-start;
        margin-bottom: 15px;

        font-size: 1.75em;
        font-weight: 200;
        font-style: italic;
        opacity: 0.5;

        &.light {
            color: $light-foreground;
        }

        &.dark {
            color: $dark-foreground;
        }
    }

    .top-repo-wrapper {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        width: 100%;
        padding: 15px;

        border-radius: 15px;

        .repo-title {
            font-size: 2em;
            font-weight: 400;
            margin-bottom: 15px;

            &:hover {
                cursor: pointer;
            }
        }

        .repo-desc {
            font-size: 1.25em;
            margin-bottom: 15px;
        }

        .repo-info {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-around;

            width: 100%;

            span {
                font-size: 1.25em;
                font-weight: 200;
            }

            b {
                font-weight: 600;
                color: $accent-pink;
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
}
</style>
