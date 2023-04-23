<template>
    <div class="footer font-roboto-slab" v-if="lastCommitHash">
        <span class="footer-item">
            Made with <span class="heart">❤</span> by d3r1n
        </span>
        <span class="footer-sep small-seperator"></span>
        <span class="footer-item">
            <CommitIcon />
            <span>{{ GH_REPO }} - <a :href="`https://github.com/${GH_USERNAME}/${GH_REPO}/commit/${lastCommitHash}`">{{ lastCommitHash }}</a></span>
        </span>
    </div>

    <div class="footer font-roboto-slab" v-else>
        <span class="footer-item gh-error">
            Made with <span class="heart">❤</span> by d3r1n
        </span>
    </div>
</template>

<script setup lang="ts">
import CommitIcon from "~/assets/icons/icon-commit.vue"

import { GitHub, GitHubError } from "~/libs/github-lib"

const GH_USERNAME = import.meta.env.VITE_GH_USERNAME
const GH_REPO = import.meta.env.VITE_GH_WEBSITE_REPO

const github = new GitHub(GH_USERNAME)

const lastCommitHash: Ref<string | null> = ref(null)

const getHash = async () => {
    try {
        lastCommitHash.value = (await github.get_repo_last_commit_hash(GH_REPO)).slice(0, 7)
    } catch (err) {
        if (err instanceof GitHubError) {
            console.error(err)
            setTimeout(getHash, 10000)
        } else {
            throw err
        }
    }
}

onMounted(async () => {
    getHash()
})
</script>

<style lang="scss">
.footer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    width: 100%;
    height: 3rem;

    padding: 0.5rem 1rem;

    background-color: var(--crust);
    color: var(--text);

    font-size: 18px;


    .footer-item {
        display: flex;
        align-items: center;
        justify-content: center;

        margin: 0 1rem;

        .heart {
            margin: 0 0.25rem;
        }

        span {
            font-weight: bold;

            a {
                color: var(--teal);
                font-style: italic;
                font-weight: normal;
                text-decoration: underline;
            }
        }

        svg {
            width: 1.5rem;
            height: 1.5rem;
            margin-right: 0.25rem;

            path {
                fill: var(--text);
            }
        }
    }
}

</style>
