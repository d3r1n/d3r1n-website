<template>
    <div class="top-music" v-if="topArtists && topTracks" id="other">
        <div class="top-container">
            <h1 class="font-roboto-slab">Top Artists</h1>
            <div class="top-item font-fira-code" v-for="artist in topArtists">
                <img :src="artist.artUrl" alt="Artist Image" />
                <a :href="artist.artistUrl" class="name">{{ substr20(artist.name) }}</a>
            </div>
        </div>
        <div class="top-container">
            <h1 class="font-roboto-slab">Top Tracks</h1>
            <div class="top-item font-fira-code" v-for="track in topTracks">
                <img :src="track.artUrl" alt="Track Image" />
                <div class="info-container">
                    <a :href="track.trackUrl" class="name">{{ substr20(track.name) }}</a>
                    <div class="track-artist">{{ substr20(track.artists.join(", ")) }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAppState } from '~/composables/app-state';
import { Track, Artist } from '~/libs/spotify-lib';
const { spotifyObject } = useAppState();

const topArtists: Ref<Artist[] | null> = ref(null);
const topTracks: Ref<Track[] | null> = ref(null);

const substr20 = (str: string) => {
    if (str.length > 20) {
        return str.substring(0, 20) + '...';
    }
    return str;
};

const getTop = async () => {
    try {
        topArtists.value = await spotifyObject.value.getTopArtists(3);
        topTracks.value = await spotifyObject.value.getTopTracks(3);
    } catch (e) {
        console.error(e);
    }
};

onMounted(async () => {
    // Set interval, if fetch is successful, clear interval
    const interval = setInterval(async () => {
        await getTop();
        if (topArtists.value && topTracks.value) {
            clearInterval(interval);
        }
    }, 1000);

    // If interval is not cleared, clear it after 10 seconds
    setTimeout(() => {
        clearInterval(interval);
    }, 10000);
});
</script>

<style lang="scss">

.top-music {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 100%;
    gap: 2rem;

    .top-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 50%;
        gap: 1rem;

        h1 {
            font-size: 2rem;
            font-weight: bold;
            color: var(--text);
        }

        .top-item {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: flex-start;

            width: 100%;
            gap: 1.5rem;

            background: var(--mantle);
            outline: solid 2px var(--overlay0);
            border-radius: 0.5rem;
            overflow: hidden;

            img {
                width: 100px;
                height: 100px;

                object-fit: cover;
            }

            .info-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;

                width: 100%;
                gap: 0.5rem;
            }

            .name {
                font-size: 1.5rem;
                font-weight: 500;
                color: var(--subtext0);
                text-align: center;
            }

            .track-artist {
                box-sizing: border-box;
                font-size: 1rem;
                font-weight: 400;
                color: var(--subtext1);
                text-align: center;
            }
        }
    }
}

</style>