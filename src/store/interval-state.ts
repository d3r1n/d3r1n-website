import { defineStore } from "pinia";
import { ref, Ref } from "vue";

export const useIntervalState = defineStore("interval-state", () => {
	const interval: Ref<boolean | null> = ref(null);

  	function set_interval(pause: boolean) {
		interval.value = pause;
  	}

  	return {
		interval,
		set_interval,
  	};
})