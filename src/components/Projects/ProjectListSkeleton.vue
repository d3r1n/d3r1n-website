<template>
    <div class="project-skeleton sc-flex-center font-nunito w-64 flex-col gap-5 md:w-96" v-for="_ in countRepo">
        <div class="name-desc rd-2 h-32 w-full bg-slate-100 dark:bg-neutral-900"></div>

        <div class="info sc-flex-center w-full gap-5">
            <div class="stars rd-2 h-12 basis-1/3 bg-slate-100 dark:bg-neutral-900"></div>
            <div class="forks rd-2 h-12 basis-2/3 bg-slate-100 dark:bg-neutral-900"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import reposFilter from '@/assets/json/repos.json'

    const countRepo = ref(reposFilter.length)
</script>
