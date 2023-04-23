<template>
    <div class="presence font-fira-code" v-if="(spIsPlaying || dcHasActivitiy) && presence.artUrl != ''">
        <img :src="presence.artUrl">

        <div class="details">
            <div id="large-text" @click="openTrack()">{{ presence.largeText }}</div>

            <div id="small-text">{{ presence.smallText }}</div>

            <div id="duration-text">{{ presence.subText }}</div>
        </div>
    </div>

    <div class="presence font-fira-code" v-else>
        <img src="https://picsum.photos/500/500/?blur">

        <div class="details">
            <div id="large-text">Doing Nothing</div>

            <div id="small-text">why not visit my github?</div>

            <div id="duration-text" v-show="false"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { SpotifyError } from '~/libs/spotify-lib';
import { DiscordError } from '~/libs/discord-lib';
import { useAppState } from "~/composables/app-state"

// global state aliases
const sp = useAppState().spotifyObject
const dc = useAppState().discordObject

// local state
const spIsPlaying = ref<boolean>(false)
const dcHasActivitiy = ref<boolean>(false)

const presence = ref({
    artUrl: "",
    largeText: "",
    smallText: "",
    subText: "",
    trackUrl: "",
})

function formatDurationText(progress: number, duration: number): string {
    let _progress = progress / 1000
    let _duration = duration / 1000

    let _minutes = Math.floor(_progress / 60)
    let _seconds = Math.floor(_progress - _minutes * 60)

    let _totalMinutes = Math.floor(_duration / 60)
    let _totalSeconds = Math.floor(_duration - _totalMinutes * 60)

    let _progressText = `${_minutes}:${_seconds < 10 ? "0" + _seconds : _seconds}`
    let _durationText = `${_totalMinutes}:${_totalSeconds < 10 ? "0" + _totalSeconds : _totalSeconds}`

    return `${_progressText} / ${_durationText}`
}

function openTrack() {
    if (spIsPlaying.value) {
        window.open(presence.value.trackUrl, "_blank")
    }
}

async function updateSpotify() {
    try {
        if (spIsPlaying.value) {
            let _currentlyPlaying = await sp.value.getCurrentlyPlaying()

            let _track = _currentlyPlaying.track
            let _prog = _currentlyPlaying.progress
            let _dur = _currentlyPlaying.duration

            let _durationText = formatDurationText(_prog, _dur)

            // max 30 characters
            let _largeText = _track.name.substring(0, 30) + (_track.name.length > 30 ? "..." : "")
            let _smallText = _track.artists.join(", ").substring(0, 30) + (_track.artists.length > 1 ? "..." : "")

            let _tempPresence = {
                artUrl: _track.artUrl,
                largeText: _largeText,
                smallText: _smallText,
                subText: _durationText,
                trackUrl: _track.trackUrl
            }

            presence.value = _tempPresence
        }
    }
    catch (e) {
        if (e instanceof SpotifyError) {
            console.error(e.message)
        }
    }
}

async function updateDiscord() {
    try {
        if (dcHasActivitiy.value) {
            let { activity } = await dc.value.getPresence()

            if (!activity) return
            if (activity.assets.large_text === presence.value.largeText) return // no need to update
            
            let _assets = activity.assets

            const substr30 = (str: string | null | undefined) => {
                if (!str) return ""
                return str.substring(0, 30) + (str.length > 30 ? "..." : "")
            } 

            // max 30 characters
            let _largeText;
            if (activity.state) _largeText = substr30(activity.state)
            else _largeText = substr30(activity.name)
            
            let _smallText = substr30(activity.details)
            let _subText = substr30(_assets.small_text)

            let _tempPresence = {
                artUrl: _assets.large_image ?? "",
                largeText: _largeText,
                smallText: _smallText,
                subText: _subText,
                trackUrl: ""
            }

            presence.value = _tempPresence
        }
    }
    catch (e) {
        if (e instanceof DiscordError) {
            console.error(e.message)
        }
    }
}

onMounted(() => {
    let fetchFunction = async () => {
        spIsPlaying.value = await sp.value.getIsPlaying()
        dcHasActivitiy.value = await dc.value.getHasActivity()
        
        if (spIsPlaying.value && dcHasActivitiy.value) {
            await updateDiscord()
        }
        else if (dcHasActivitiy.value) {
            await updateDiscord()
        }
        else if (spIsPlaying.value) {
            await updateSpotify()
        }
        else {
            presence.value = {
                artUrl: "",
                largeText: "",
                smallText: "",
                subText: "",
                trackUrl: "",
            }
        }
    }

    fetchFunction()
    setInterval(fetchFunction, 5000)
})

</script>

<style lang="scss">

.presence {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    img {
        width: 175px;
        height: 175px;
        border-radius: 0.7rem;
        margin-right: 2rem;
    }

    .details {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;

        gap: 0.5rem;

        #large-text {
            font-size: 1.5rem;
            font-weight: bold;
            cursor: pointer;
            color: var(--text);
        }

        #small-text {
            font-size: 1.5rem;
            color: var(--subtext0);
        }

        #duration-text {
            font-size: 1.25rem;
            color: var(--subtext1);
        }
    }
}

</style>