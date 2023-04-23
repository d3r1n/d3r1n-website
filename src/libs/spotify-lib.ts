export class SpotifyError extends Error {
    public cause: Object | undefined;
    constructor(message?: string, cause?: Object) {
        super(message);
        this.name = "SpotifyError";
        this.message = message ?? ""; // If message is undefined, set it to an empty string
        this.cause = cause;
    }
}

export interface Track {
    artUrl: string;
    trackUrl: string;
    name: string;
    artists: Array<string>;
}

export interface Artist {
    artUrl: string;
    artistUrl: string;
    name: string;
}

export interface CurrentlyPlaying {
    track: Track;
    progress: number;
    duration: number;
    isPlaying: boolean;
}

export interface AccessToken {
    acccessToken: string;
    expiresIn: number;
}

export class Spotify {
    public clientId: string;
    public clientSecret: string;
    public refreshToken: string;

    private accessToken: AccessToken | null = null

    public constructor(
        clientId: string,
        clientSecret: string,
        refreshToken: string
    ) {
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.refreshToken = refreshToken;
    }

    public async refreshAccessToken(): Promise<string> {
        if (
            this.accessToken !== null &&
            this.accessToken.expiresIn > Date.now()
        ) {
            return this.accessToken.acccessToken;
        }

        const response = await fetch("https://accounts.spotify.com/api/token", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${btoa(
                    `${this.clientId}:${this.clientSecret}`
                )}`,
            },
            body: `grant_type=refresh_token&refresh_token=${this.refreshToken}`,
        });

        if (response.status === 200) {
            const data = await response.json();
            this.accessToken = {
                acccessToken: data.access_token,
                expiresIn: Date.now() + data.expires_in,
            };
            return this.accessToken.acccessToken;
        } else {
            throw new SpotifyError("Error refreshing access token", response);
        }
    }

    public async getIsPlaying(): Promise<boolean> {
        const access_token = await this.refreshAccessToken();

        const response = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return data.is_playing;
        } else if (response.status === 204) {
            return false;
        } else {
            throw new SpotifyError("Error getting is playing", response);
        }
    }

    public async getCurrentlyPlaying(): Promise<CurrentlyPlaying> {
        const access_token = await this.refreshAccessToken();

        const response = await fetch(
            "https://api.spotify.com/v1/me/player/currently-playing",
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return {
                track: {
                    artUrl: data.item.album.images[0].url,
                    trackUrl: data.item.external_urls.spotify,
                    name: data.item.name,
                    artists: data.item.artists.map((artist: any) => { return artist.name; }),
                },
                progress: data.progress_ms,
                duration: data.item.duration_ms,
                isPlaying: data.is_playing,
            };
        } else if (response.status === 204) {
            throw new SpotifyError("No song currently playing");
        } else {
            throw new SpotifyError("Error getting currently playing", response);
        }
    }

    public async getRecentlyPlayed(limit: number): Promise<Array<Track>> {
        const access_token = await this.refreshAccessToken();

        const response = await fetch(
            `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return data.items.map((item: any) => {
                return {
                    art_url: item.track.album.images[0].url,
                    song_url: item.track.external_urls.spotify,
                    song_name: item.track.name,
                    artist: item.track.artists[0].name,
                };
            });
        } else {
            throw new SpotifyError("Error getting recently played", response);
        }
    }

    public async getTopTracks(limit: number): Promise<Array<Track>> {
        const access_token = await this.refreshAccessToken();

        const response = await fetch(
            `https://api.spotify.com/v1/me/top/tracks?limit=${limit}&time_range=short_term`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return data.items.map((item: any) => {
                return {
                    artUrl: item.album.images[0].url,
                    trackUrl: item.external_urls.spotify,
                    name: item.name,
                    artists: item.artists.map((artist: any) => { return artist.name; }),
                };
            });
        } else {
            throw new SpotifyError("Error getting top tracks", response);
        }
    }

    public async getTopArtists(limit: number): Promise<Array<Artist>> {
        const access_token = await this.refreshAccessToken();

        const response = await fetch(
            `https://api.spotify.com/v1/me/top/artists?limit=${limit}&time_range=short_term`,
            {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                },
            }
        );

        if (response.status === 200) {
            const data = await response.json();
            return data.items.map((item: any) => {
                return {
                    artUrl: item.images[0].url,
                    artistUrl: item.external_urls.spotify,
                    name: item.name,
                };
            });
        } else {
            throw new SpotifyError("Error getting top artists", response);
        }
    }
}
