<template>
    <span class="sc-flex-center gap-5 w-max">
        <RouterLink
            to="/"
            class="group sc-flex-center p-2 rd-full bg-slate-200 dark:bg-neutral-800 transition-all duration-300 hover:bg-slate-300 dark:hover:bg-neutral-700"
        >
            <ArrowLeft
                class="w-8 h-8 stroke-slate-400 dark:stroke-neutral-600 group-hover:stroke-slate-500 dark:group-hover:stroke-neutral-500"
            />
        </RouterLink>
        <span class="page-name font-nunito text-3xl text-slate-700 dark:text-neutral-400 display-none md:block">
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
