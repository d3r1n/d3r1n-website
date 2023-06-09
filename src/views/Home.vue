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
</template>

<script setup lang="ts">
   
</script>

<style scoped>
   
</style>