<template>
   <br>
   <br>
   <Suspense>
      <Profile />
      
      <template #fallback>
         <ProfileSkeleton />
      </template>
   </Suspense>
   <br>
   <br>
   <Navbar />
   <br>
   <br>
   <Suspense>
      <Spotify />
   </Suspense>
</template>

<script setup lang="ts">
   
</script>

<style scoped>
   
</style>