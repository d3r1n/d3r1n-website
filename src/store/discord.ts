import { defineStore } from "pinia"
import { ref, Ref } from "vue"
import { DiscordPresence } from "../lib/discord-helper"


export const useDiscordPresence = defineStore("discord-presence", () => {
	const presence: Ref<DiscordPresence | null> = ref(null)

	function set_presence(_presence: DiscordPresence) {
		presence.value = _presence
	}

	return {
		presence
	}
})

