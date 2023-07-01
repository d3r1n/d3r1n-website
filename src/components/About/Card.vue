<template>
    <div
        class="sc-flex-center flex-col gap-5 p-5 rd-2 font-nunito bg-slate-100 shadow-md dark:shadow-none dark:bg-neutral-900"
    >
        <h1 class="m-0 font-roboto text-2xl tracking-wide text-slate-800 dark:text-neutral-100">{{ title }}</h1>
        <p class="text-base text-slate-700 leading-6 dark:text-neutral-200 w-auto m-0" lang="eng" v-if="isText">
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
