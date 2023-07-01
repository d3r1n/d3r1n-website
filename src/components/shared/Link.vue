<template>
    <a :href="href" target="_blank" :class="color" class="font-bold no-underline after:ml-1 after:content-['_↗']">{{
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
