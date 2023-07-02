<template>
    <div class="project-skeleton sc-flex-center font-nunito w-full flex-col md:flex-row" v-for="_ in countRepo">
        <div class="box rd-2 h-60 w-full bg-slate-100 dark:bg-neutral-900 md:w-80"></div>

        <div
            class="button w-18 h-18 rd-full outline-10 relative bottom-5 z-20 bg-slate-100 outline outline-slate-50 after:content-['\200B'] dark:bg-neutral-900 dark:outline-neutral-950 md:bottom-0 md:right-5"
        ></div>
    </div>
</template>

<script setup lang="ts">
    import reposFilter from '@/assets/json/repos.json'

    const countRepo = ref(reposFilter.length)
</script>
