import { defineStore } from "pinia";
import { ref, Ref } from "vue"

enum Themes {
	Dark,
	Light,
}

export const theme = defineStore("theme", () => {
	const theme: Ref<Themes> = ref(Themes.Dark)

	// setters
	function set_theme(_theme: Themes) {
		theme.value = _theme
	}

	return {
		theme,
		set_theme,
	}
});
