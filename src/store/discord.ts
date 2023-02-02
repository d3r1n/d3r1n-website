import { defineStore } from "pinia"
import { computed, ref, Ref } from "vue"
import { DiscordPresence } from "../lib/discord-helper"


export const useDiscordPresence = defineStore("discord-presence", () => {
	const presence: Ref<DiscordPresence | null> = ref(null)

	function set_presence(_presence: DiscordPresence) {
		presence.value = _presence
	}

	const image_url = computed(() => {
		if (presence.value === null) {
			return ""
		}
		return presence.value.image_url
	})

	const presence_text = computed(() => {
		if (presence.value === null) {
			return ""
		}
		return presence.value.presence
	})

	const status = computed(() => {
		if (presence.value === null) {
			return ""
		}
		return presence.value.status
	})

	return {
		presence,
		set_presence,
		fetch,
		image_url,
		presence_text,
		status,
	}
})

