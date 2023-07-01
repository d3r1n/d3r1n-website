<template>
    <span class="sc-flex-center w-max gap-5">
        <RouterLink
            to="/"
            class="sc-flex-center rd-full group bg-slate-200 p-2 transition-all duration-300 hover:bg-slate-300 dark:bg-neutral-800 dark:hover:bg-neutral-700"
        >
            <ArrowLeft
                class="h-8 w-8 stroke-slate-400 group-hover:stroke-slate-500 dark:stroke-neutral-600 dark:group-hover:stroke-neutral-500"
            />
        </RouterLink>
        <span class="page-name font-nunito display-none text-3xl text-slate-700 dark:text-neutral-400 md:block">
            {{ name }}
        </span>
    </span>
</template>

<script setup lang="ts">
    defineProps({
        name: {
            type: String,
            required: true
        }
    })
</script>
