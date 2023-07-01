<template>
    <Card title="My Goals" :isText="false">
        <template v-slot:content>
            <div class="flex flex-col items-start justify-center gap-3">
                <div
                    class="rd-2 flex w-full items-center justify-start gap-2 bg-slate-200 p-2 shadow-lg dark:bg-neutral-800 dark:shadow-none"
                >
                    <span
                        class="rd-full bg-green-200 px-2 py-1 text-xs text-green-400 dark:bg-green-700 dark:text-green-500"
                        >Done</span
                    >
                    <span class="text-base text-slate-700 dark:text-neutral-200"
                        >Go to Canada with an International Exchange Program</span
                    >
                </div>

                <ArrowDown class="self-center stroke-slate-300 dark:stroke-neutral-600" />

                <div
                    class="rd-2 flex w-full items-center justify-start gap-2 bg-slate-200 p-2 shadow-lg dark:bg-neutral-800 dark:shadow-none"
                >
                    <span
                        class="rd-full bg-yellow-200 px-2 py-1 text-xs text-yellow-400 dark:bg-yellow-700 dark:text-yellow-500"
                        >Current</span
                    >
                    <span class="text-base text-slate-700 dark:text-neutral-200"
                        >Win a collage in Canada or America</span
                    >
                </div>

                <ArrowDown class="self-center stroke-slate-300 dark:stroke-neutral-600" />

                <div
                    class="rd-2 flex w-full items-center justify-start gap-2 bg-slate-200 p-2 shadow-lg dark:bg-neutral-800 dark:shadow-none"
                >
                    <span
                        class="rd-full bg-blue-200 px-2 py-1 text-xs text-blue-400 dark:bg-blue-700 dark:text-blue-500"
                        >Next</span
                    >
                    <span class="text-base text-slate-700 dark:text-neutral-200"
                        >Get a job as a developer in Canada or America</span
                    >
                </div>
            </div>
        </template>
    </Card>
</template>
