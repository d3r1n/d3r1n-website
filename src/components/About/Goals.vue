<template>
    <Card title="My Goals" :isText="false">
        <template v-slot:content>
            <div class="flex flex-col items-start justify-center gap-3">
                <div
                    class="w-full flex items-center justify-start gap-2 p-2 rd-2 shadow-lg bg-slate-200 dark:shadow-none dark:bg-neutral-800"
                >
                    <span
                        class="px-2 py-1 text-xs bg-green-200 text-green-400 dark:bg-green-700 dark:text-green-500 rd-full"
                        >Done</span
                    >
                    <span class="text-base text-slate-700 dark:text-neutral-200"
                        >Go to Canada with an International Exchange Program</span
                    >
                </div>

                <ArrowDown class="stroke-slate-300 dark:stroke-neutral-600 self-center" />

                <div
                    class="w-full flex items-center justify-start gap-2 p-2 rd-2 bg-slate-200 shadow-lg dark:shadow-none dark:bg-neutral-800"
                >
                    <span
                        class="px-2 py-1 text-xs bg-yellow-200 text-yellow-400 dark:bg-yellow-700 dark:text-yellow-500 rd-full"
                        >Current</span
                    >
                    <span class="text-base text-slate-700 dark:text-neutral-200"
                        >Win a collage in Canada or America</span
                    >
                </div>

                <ArrowDown class="stroke-slate-300 dark:stroke-neutral-600 self-center" />

                <div
                    class="w-full flex items-center justify-start gap-2 p-2 rd-2 bg-slate-200 shadow-lg dark:shadow-none dark:bg-neutral-800"
                >
                    <span
                        class="px-2 py-1 text-xs bg-blue-200 text-blue-400 dark:bg-blue-700 dark:text-blue-500 rd-full"
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
