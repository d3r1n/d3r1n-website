<template>
    <div class="project-skeleton sc-flex-center flex-col gap-5 w-64 md:w-96 font-nunito" v-for="_ in countRepo">
        <div class="name-desc w-full h-32 rd-2 bg-slate-100 dark:bg-neutral-900"></div>

        <div class="info sc-flex-center gap-5 w-full">
            <div class="stars basis-1/3 h-12 rd-2 bg-slate-100 dark:bg-neutral-900"></div>
            <div class="forks basis-2/3 h-12 rd-2 bg-slate-100 dark:bg-neutral-900"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import reposFilter from '@/assets/json/repos.json'

    const countRepo = ref(reposFilter.length)
</script>
