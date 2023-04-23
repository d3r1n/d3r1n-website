import { Spotify } from "~/libs/spotify-lib";
import { Discord } from "~/libs/discord-lib";

export const useAppState = () => {
    const theme = useStorage("theme", true); // true = light, false = dark
    const spotifyObject= ref(new Spotify(
        import.meta.env.VITE_SPOTIFY_CLIENT_ID,
        import.meta.env.VITE_SPOTIFY_CLIENT_SECRET,
        import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN
    ));
    const discordObject = ref(new Discord(
        import.meta.env.VITE_DC_ID
    ));

    const toggleTheme = () => {
        theme.value = !theme.value;
    };

    const isMobile = ref(false);

    setInterval(() => {
        if (window.innerWidth < 768) {
            isMobile.value = true;
        } else {
            isMobile.value = false;
        }
    }, 1000);

    return { theme, toggleTheme, spotifyObject, discordObject, isMobile };
};
