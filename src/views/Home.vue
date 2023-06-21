<template>
<div class="home sc-page sc-flex-center">
    <div class="content w-9/10 mb-sm mt-sm flex flex-col justify-start items-center gap-5xl">
        <Suspense>
            <Profile />
    
            <template #fallback>
                <ProfileSkeleton />
            </template>
        </Suspense>
    
        <Navbar />
    
        <Suspense>
            <Spotify />
    
            <template #fallback>
                <SpotifySkeleton />
            </template>
        </Suspense>
    </div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped>
   
</style>