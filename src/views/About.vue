<template>
    <div class="about sc-page sc-flex-center">
        <BackButton name="About" class="absolute left-5 top-5" />

        <div class="content sc-flex-center w-9/10 md:max-w-234 mt-25 mb-5 flex-col gap-8 md:m-0">
            <Info />

            <div class="sc-flex-center container flex-wrap gap-8 md:flex-nowrap">
                <Goals class="w-max md:grow" />
                <Donate class="max-w-80 md:max-w-2/5" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
useHead({
    title: 'About',
})
</script>