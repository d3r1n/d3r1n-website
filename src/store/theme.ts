import { defineStore } from "pinia";
import { ref, Ref } from "vue"

export const useTheme = defineStore("theme", () => {
	const theme: Ref<boolean> = ref(true)

	function toggle_theme() {
		theme.value = !theme.value
		console.log(theme.value)
	}

	return {
		theme,
		toggle_theme,
	}
});
