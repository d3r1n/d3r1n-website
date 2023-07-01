<template>
    <Card title="Donate Me" :isText="false">
        <template v-slot:content>
            <p class="font-nunito m-0 w-auto text-base leading-6 text-slate-700 dark:text-neutral-200">
                If you like my work and want to support me, you can donate to me via Ko-Fi. Your donation will go
                towards my college tuition, I want to study Computer Science in USA or Canada.
            </p>
            <a
                href="https://ko-fi.com/d3r1n"
                target="_blank"
                class="sc-flex-center rd-2 group w-full gap-2 border-2 border-solid border-blue-500 py-2 text-xl font-bold text-blue-500 no-underline transition-all duration-300 hover:scale-105 hover:bg-blue-500 hover:text-white active:scale-95"
            >
                <Heart class="h-6 w-6 stroke-blue-500 group-hover:fill-white group-hover:stroke-white" />
                Ko-Fi
            </a>
        </template>
    </Card>
</template>
