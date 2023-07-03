<template>
    <div class="repo sc-flex-center flex-col md:flex-row">
        <div
            class="content rd-2 font-nunito flex h-auto w-full flex-col items-start justify-start gap-3 bg-slate-100 p-5 dark:bg-neutral-900 md:h-64 md:w-96"
        >
            <div class="header sc-flex-center w-full gap-2">
                <span class="name basis-3/5 text-2xl font-bold text-slate-800 dark:text-neutral-200">{{ name }}</span>

                <div
                    class="stats rd-2 flex basis-2/5 items-center justify-evenly bg-green-200 p-2 text-xl text-green-500 dark:bg-green-800 dark:text-green-500"
                >
                    <span class="stars sc-flex-center gap-2">
                        <Star class="h-6 w-6 stroke-green-400 dark:stroke-green-500" />
                        {{ stars }}
                    </span>
                    <span class="forks sc-flex-center gap-2">
                        <Branch class="h-6 w-6 stroke-green-400 dark:stroke-green-500" />
                        {{ forks }}
                    </span>
                </div>
            </div>

            <span
                class="description mb-5 break-words text-lg font-light text-slate-700 dark:text-neutral-300 md:m-0 md:w-4/5"
                >{{ computedDescription }}</span
            >
        </div>

        <a
            :href="url"
            class="sc-flex-center rd-full outline-10 hover:ring-10 relative bottom-5 z-20 bg-blue-100 p-3 outline outline-slate-50 ring-0 transition-all duration-300 hover:outline-transparent hover:ring-blue-200 dark:bg-blue-900 dark:outline-neutral-950 dark:hover:ring-sky-800 md:bottom-0 md:right-5"
        >
            <ArrowUpRight class="h-12 w-12 stroke-blue-500" />
        </a>
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
        return props.description.length > 120 ? props.description.slice(0, 120) + '...' : props.description
    })
</script>

<style></style>
