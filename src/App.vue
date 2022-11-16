<template>
	<RouterView />
</template>

<script lang="ts">
</script>

<style lang="scss">
body, html, #app {
  height: 100%;
}
body {
	margin: 0;
	padding: 0;
	font-family: 'JetBrains Mono', monospace;
	scrollbar-width:none;
  	-ms-overflow-style:none;
}

body::-webkit-scrollbar {
  display:none;
}
</style>