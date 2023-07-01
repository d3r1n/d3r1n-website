<template>
    <div class="not-found sc-page sc-flex-center font-nunito flex-col gap-3">
        <h1 class="font-roboto m-0 text-9xl font-bold text-slate-700 dark:text-neutral-300">404</h1>
        <h2 class="text-3xl font-bold text-slate-700 dark:text-neutral-300">Page Not Found</h2>
        <p class="text-center text-lg text-slate-500 dark:text-neutral-600">
            The page you are looking for does not exist. <br />
            Where you goin' partner?
        </p>
        <RouterLink
            to="/"
            class="rd-2 border-2 border-solid border-sky-500 p-3 text-lg font-bold text-sky-500 no-underline"
            >Go Home</RouterLink
        >
    </div>
</template>
