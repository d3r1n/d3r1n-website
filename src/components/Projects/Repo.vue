<template>
    <div class="sc-flex-center flex-col gap-5 w-full md:max-w-96 font-nunito">
        <div
            class="flex flex-col items-start justify-center gap-5 w-full p-5 rd-2 bg-slate-100 dark:bg-neutral-900 shadow-md dark:shadow-none"
        >
            <h1 class="m-0 font-roboto tracking-wide font-bold text-2xl text-slate-800 dark:text-neutral-100">
                {{ name }}
            </h1>
            <p class="m-0 text-base text-slate-700 dark:text-neutral-200">{{ computedDescription }}</p>
        </div>

        <div class="sc-flex-center gap-5 w-full text-green-500 font-normal">
            <div class="sc-flex-center gap-5 p-3 rd-2 text-lg bg-green-100 dark:bg-green-900">
                <span class="sc-flex-center gap-2">
                    <Star class="stroke-green-400 dark:stroke-green-600" />
                    {{ stars }}
                </span>

                <span class="sc-flex-center gap-2">
                    <Branch class="stroke-green-400 dark:stroke-green-600" />
                    {{ forks }}
                </span>
            </div>

            <a
                :href="url"
                target="_blank"
                class="p-3 rd-2 bg-blue-100 dark:bg-blue-900 transition-all duration-300 hover:bg-blue-200 dark:hover:bg-blue-800 grow sc-flex-center after:ml-1 after:content-['↗'] no-underline text-lg font-bold text-blue-600 dark:text-blue-400"
                >Go</a
            >
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
        name: {
            type: String,
            required: true
        },
        description: {
            // string or null
            type: String,
            default: null
        },
        url: {
            type: String,
            required: true
        },
        stars: {
            type: Number,
            required: true
        },
        forks: {
            type: Number,
            required: true
        }
    })

    const computedDescription = computed(() => {
        if (!props.description) return 'No description provided.'
        return props.description.length > 100 ? props.description.slice(0, 100) + '...' : props.description
    })
</script>

<style></style>
