<template>
    <div
        class="sc-flex-center rd-2 font-nunito flex-col gap-5 bg-slate-100 p-5 shadow-md dark:bg-neutral-900 dark:shadow-none"
    >
        <h1 class="font-roboto m-0 text-2xl tracking-wide text-slate-800 dark:text-neutral-100">{{ title }}</h1>
        <p class="m-0 w-auto text-base leading-6 text-slate-700 dark:text-neutral-200" lang="eng" v-if="isText">
            <slot></slot>
        </p>
        <slot name="content"></slot>
    </div>
</template>

<script setup lang="ts">
    defineProps({
        title: {
            type: String,
            required: true
        },
        isText: {
            type: Boolean,
            default: true
        }
    })
</script>
