import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import { Ref } from "vue"

export const useTheme = defineStore("theme", () => {
	const theme: Ref<boolean> = useStorage("theme", true);

	function toggle_theme() {
		theme.value = !theme.value
	}

	return {
		theme,
		toggle_theme,
	}
});
