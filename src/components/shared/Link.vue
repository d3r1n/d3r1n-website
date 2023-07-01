<template>
    <a :href="href" target="_blank" :class="color" class="after:ml-1 after:content-['_↗'] no-underline font-bold">{{
        label
    }}</a>
</template>

<script setup lang="ts">
    defineProps({
        label: {
            type: String,
            required: true
        },
        href: {
            type: String,
            required: true
        },
        // optional
        color: {
            type: String,
            default: 'text-blue-500'
        }
    })
</script>
