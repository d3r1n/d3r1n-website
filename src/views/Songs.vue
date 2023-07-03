<template>
    <div class="sc-page sc-flex-center">
        <BackButton name="Songs" class="absolute left-5 top-5" />

        <div class="content sc-flex-center w-9/10 mt-25 mb-5 flex-col gap-10">
            <Suspense>
                <SongList />
            </Suspense>
        </div>
    </div>
</template>

<script setup lang="ts">
    useHead({
        title: 'Songs'
    })
</script>
