<template>
    <div class="about sc-page sc-flex-center">
        <BackButton name="About" class="absolute top-5 left-5" />

        <div class="content sc-flex-center flex-col gap-8 w-9/10 md:max-w-234 mt-25 mb-5 md:m-0">
            <Info />

            <div class="container sc-flex-center gap-8 flex-wrap md:flex-nowrap">
                <Goals class="w-max md:grow" />
                <Donate class="max-w-80 md:max-w-2/5" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts"></script>

<style></style>
