export class SpotifyError extends Error {
	constructor(message: string, cause?: unknown) {
		super(message);
		this.name = "SpotifyError";
		this.cause = cause;
	}
}

export interface Track {
	art_url: string;
	song_url: string;
	song_name: string;
	artist: string;
}

export interface CurrentlyPlaying {
	track: Track;
	progress: number;
	duration: number;
	is_playing: boolean;
}

export interface AccessToken {
	access_token: string;
	expires_in: number;
}

export class Spotify {
	public client_id: string;
	public client_secret: string;
	public refresh_token: string;
	private access_token: AccessToken | null;

	public constructor(
		client_id: string,
		client_secret: string,
		refresh_token: string
	) {
		this.client_id = client_id;
		this.client_secret = client_secret;
		this.refresh_token = refresh_token;
		this.access_token = null;
	}

	public async refresh_access_token(): Promise<string | SpotifyError> {
		if (
			this.access_token != null &&
			this.access_token.expires_in > Date.now()
		) {
			return this.access_token.access_token;
		}

		const response = await fetch("https://accounts.spotify.com/api/token", {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Authorization: `Basic ${btoa(
					`${this.client_id}:${this.client_secret}`
				)}`,
			},
			body: `grant_type=refresh_token&refresh_token=${this.refresh_token}`,
		});

		if (response.status == 200) {
			const data = await response.json();
			this.access_token = {
				access_token: data.access_token,
				expires_in: Date.now() + data.expires_in,
			};
			return this.access_token.access_token;
		} else {
			return new SpotifyError("Error refreshing access token", response);
		}
	}
	
	public async get_currently_playing(): Promise<CurrentlyPlaying | SpotifyError> {
		const access_token = await this.refresh_access_token();
		
		if (access_token instanceof SpotifyError) {
			return access_token;
		}

		const response = await fetch(
			"https://api.spotify.com/v1/me/player/currently-playing",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);

		if (response.status == 200) {
			const data = await response.json();
			return {
				track: {
					art_url: data.item.album.images[0].url,
					song_url: data.item.external_urls.spotify,
					song_name: data.item.name,
					artist: data.item.artists[0].name,
				},
				progress: data.progress_ms,
				duration: data.item.duration_ms,
				is_playing: data.is_playing,
			};
		} else if (response.status == 204) {
			return new SpotifyError("No song currently playing");
		} else {
			return new SpotifyError("Error getting currently playing", response);
		}
	}
	

	public async get_recently_played(): Promise<Array<Track> | SpotifyError> {
		const access_token = await this.refresh_access_token();

		if (access_token instanceof SpotifyError) {
			return access_token;
		}

		const response = await fetch(
			"https://api.spotify.com/v1/me/player/recently-played",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);

		if (response.status == 200) {
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
			return new SpotifyError("Error getting recently played", response);
		}
	}

	public async get_top_tracks(): Promise<Array<Track> | SpotifyError> {
		const access_token = await this.refresh_access_token();

		if (access_token instanceof SpotifyError) {
			return access_token;
		}

		const response = await fetch(
			"https://api.spotify.com/v1/me/top/tracks",
			{
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			}
		);

		if (response.status == 200) {
			const data = await response.json();
			return data.items.map((item: any) => {
				return {
					art_url: item.album.images[0].url,
					song_url: item.external_urls.spotify,
					song_name: item.name,
					artist: item.artists[0].name,
				};
			});
		} else {
			return new SpotifyError("Error getting top tracks", response);
		}
	}
}
