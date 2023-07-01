<template>
    <div class="not-found sc-page sc-flex-center flex-col gap-3 font-nunito">
        <h1 class="text-9xl m-0 font-bold text-slate-700 dark:text-neutral-300 font-roboto">404</h1>
        <h2 class="text-3xl font-bold text-slate-700 dark:text-neutral-300">Page Not Found</h2>
        <p class="text-lg text-slate-500 dark:text-neutral-600 text-center">
            The page you are looking for does not exist. <br />
            Where you goin' partner?
        </p>
        <RouterLink
            to="/"
            class="border-solid border-2 border-sky-500 p-3 rd-2 no-underline font-bold text-lg text-sky-500"
            >Go Home</RouterLink
        >
    </div>
</template>
