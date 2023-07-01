<template>
    <Card title="Donate Me" :isText="false">
        <template v-slot:content>
            <p class="text-base leading-6 font-nunito w-auto text-slate-700 dark:text-neutral-200 m-0">
                If you like my work and want to support me, you can donate to me via Ko-Fi. Your donation will go
                towards my college tuition, I want to study Computer Science in USA or Canada.
            </p>
            <a
                href="https://ko-fi.com/d3r1n"
                target="_blank"
                class="sc-flex-center gap-2 group no-underline text-xl font-bold w-full py-2 text-blue-500 border-solid border-2 border-blue-500 transition-all duration-300 hover:bg-blue-500 hover:text-white rd-2 hover:scale-105 active:scale-95"
            >
                <Heart class="w-6 h-6 stroke-blue-500 group-hover:stroke-white group-hover:fill-white" />
                Ko-Fi
            </a>
        </template>
    </Card>
</template>
