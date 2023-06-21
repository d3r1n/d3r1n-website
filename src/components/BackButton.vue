<template>
    <span class="sc-flex-center gap-5 w-max">
        <RouterLink :to="{name: 'home'}" class="group sc-social-link rd-full">
            <ArrowLeft class="sc-link-svg w-8 h-8" />
        </RouterLink>
        <span class="page-name font-nunito text-3xl text-slate-800 dark:text-neutral-400">
            <slot></slot>
        </span>
    </span>
</template>