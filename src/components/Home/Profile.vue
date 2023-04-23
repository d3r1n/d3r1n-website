<template>
    <div class="profile font-fira-code">
        <div id="avatar">
            <img :src="avatar" alt="" />
        </div>

        <div class="info">
            <div class="name">
                Derin Önder
                <p id="nickname">"d3r1n"</p>
                Eren
            </div>

            <div class="status">
                <div id="status" :style="statusBgColor">{{ status }}</div>
                <div id="presence">and {{ presenceString }}</div>
            </div>

            <div class="links">
                <a href="https://linkedin.com/in/d3r1n" class="icon">
                    <iconLinkedin />
                </a>
                <a href="https://github.com/d3r1n" class="icon">
                    <iconGithub />
                </a>
                <a href="https://signal.me/#p/+905306353896" class="icon">
                    <iconSignal />
                </a>
                <a href="https://open.spotify.com/user/derin9999" class="icon">
                    <iconSpotify />
                </a>
                <a href="mailto:me@d3r1n.com" class="icon">
                    <iconMailVue />
                </a>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// Icons
import iconLinkedin from "~/assets/icons/icon-linkedin.vue"
import iconGithub from "~/assets/icons/icon-github.vue"
import iconSpotify from "~/assets/icons/icon-spotify.vue"
import iconMailVue from "~/assets/icons/icon-mail.vue"
import iconSignal from "~/assets/icons/icon-signal.vue"

import { DiscordError, DiscordPresence, Status } from "~/libs/discord-lib"
import { SpotifyError } from "~/libs/spotify-lib"
import { useAppState } from "~/composables/app-state"

const { discordObject, spotifyObject } = useAppState()

const dc = discordObject
const sp =spotifyObject 

const dcData = ref<DiscordPresence | null>(null)
const spIsPlaying = ref<boolean>(false)

const avatar = computed(() => {
    return dcData.value?.avatarUrl
})

const status = computed(() => {
    let _status = dcData.value?.status
    if (_status) {
        if (_status == "dnd") {
            return "Do Not Disturb"
        }
        // capitalize first letter
        return _status.charAt(0).toUpperCase() + _status.slice(1)
    } else {
        return "Offline"
    }
})

const presenceString = computed(() => {
    let presence = dcData.value?.presence
    let activity = dcData.value?.activity
    let isPlaying = spIsPlaying.value

    if (activity && !presence) {
        return "Playing " + activity.name
    } else if (activity && presence) {
        return presence
    } else if (!activity && presence) {
        return presence
    } else if (isPlaying) {
        return "Listening to Spotify"
    } else {
        return "Doing nothing."
    }
})

const statusBgColor = computed(() => {
    switch (dcData.value?.status) {
        case Status.Online:
            return { color: "var(--green)" }
        case Status.Idle:
            return { color: "var(--peach)" }
        case Status.DoNotDisturb:
            return { color: "var(--red)" }
        case Status.Offline:
            return { color: "var(--text)" }
        default:
            return { color: "var(--text)" }
    }
})

let fetchInterval: any

const fetch = async () => {
    try {
        dcData.value = await dc.value.getPresence()
        spIsPlaying.value = await sp.value.getIsPlaying()
    } catch (e) {
        if (e instanceof DiscordError || e instanceof SpotifyError) {
            console.error(e.message)
        } else {
            console.error(e)
        }
    }
}

onMounted(() => {
    fetch()
    fetchInterval = setInterval(fetch, 5000)
})

onUnmounted(() => {
    clearInterval(fetchInterval)
})
</script>

<style lang="scss">
@import "~/assets/styles/variables.scss";

.profile {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    width: 100%;

    padding: 0 1rem;
    gap: 2rem;

    #avatar {
        display: flex;
        align-items: center;
        justify-content: center;

        width: auto;
        height: auto;

        border-radius: 50%;
        background: var(--surface0);
        box-shadow: 0 0 0.6rem 0.5rem var(--surface0);

        img {
            width: 250px;
            height: 250px;
            border-radius: 50%;
        }
    }

    .info {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;

        width: max-content;

        gap: 0.5rem;

        color: var(--text);

        .name {
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 2rem;

            gap: 0.8rem;

            #nickname {
                margin: 0;
                font-size: inherit;
                color: var(--mauve);
            }
        }

        .status {
            display: flex;
            align-items: center;
            justify-content: center;

            font-size: 1.2rem;

            gap: 0.5rem;

            #status {
                font-weight: bold;
            }

            #presence {
                font-weight: normal;
                color: var(--subtext0);
            }
        }
    }

    .links {
        display: flex;
        align-items: center;
        justify-content: center;

        gap: 1rem;

        .icon {
            display: flex;
            align-items: center;
            justify-content: center;

            box-sizing: content-box;

            width: 30px;
            height: 30px;

            padding: 0.5em;
            outline: 2px dashed var(--overlay0);
            border-radius: 50%;

            transition: background 0.2s ease-in-out;

            &:hover {
                background: var(--surface0);
            }

            svg {
                width: 100%;
                height: 100%;

                fill: var(--text);
            }
        }
    }
}
</style>
