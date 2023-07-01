import { encode } from 'js-base64'

export class SpotifyError extends Error {
    public cause: object | undefined
    constructor(message?: string, cause?: object) {
        super(message)
        this.cause = cause
    }
}

export interface Track {
    coverArt: string
    link: string
    name: string
    artist: string
}

export interface Artist {
    name: string
    link: string
    image: string
}

export interface AccessToken {
    token: string
    expiresIn: number
}

export interface TopAll {
    tracks: Array<Track>
    artists: Array<Artist>
}

export class Spotify {
    private clientId: string
    private clientSecret: string
    private refreshToken: string
    private accessToken: AccessToken | null

    constructor(clientId: string, clientSecret: string, refreshToken: string) {
        this.clientId = clientId
        this.clientSecret = clientSecret
        this.refreshToken = refreshToken
        this.accessToken = null
    }

    private async request(endpoint: string, method: string, body?: string): Promise<Response> {
        await this.refreshAccessToken()

        let url = 'https://api.spotify.com/v1/me/' + endpoint

        let headers: HeadersInit = {
            Authorization: `Bearer ${this.accessToken?.token}`
        }

        return fetch(url, { method, headers, body })
    }

    public async refreshAccessToken() {
        // Early return if the access token isn't expired
        if (this.accessToken !== null && this.accessToken.expiresIn > Date.now()) return

        const options: RequestInit = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${encode(`${this.clientId}:${this.clientSecret}`)}`
            },
            body: `grant_type=refresh_token&refresh_token=${this.refreshToken}`
        }

        const response = await fetch('https://accounts.spotify.com/api/token', options)
        if (response.status !== 200) throw new SpotifyError('Error refreshing access token', response)

        const data = await response.json()
        this.accessToken = {
            token: data['access_token'],
            expiresIn: Date.now() + data['expires_in'] * 1000 // expires_in is in seconds, convert to ms
        }
    }

    public async getIsPlaying(): Promise<boolean> {
        const response = await this.request('player', 'GET')
        if (response.status === 204) return false
        else if (response.status !== 200) throw new SpotifyError('Error getting isPlaying', response)

        const data = await response.json()

        return data['is_playing']
    }

    public async getCurrentlyPlaying(): Promise<Track | null> {
        const response = await this.request('player/currently-playing', 'GET')
        if (response.status === 204) return null
        if (response.status !== 200) throw new SpotifyError('Error getting currently playing', response)

        const json = await response.json()

        if (json['currently_playing_type'] !== 'track' || json['is_playing'] === false) return null

        const data = json['item']

        return {
            coverArt: data['album']['images'][0]['url'] || data['images'][0]['url'],
            link: data['external_urls']['spotify'],
            name: data['name'],
            artist: (data['artists'] as Array<any>).map((x) => x['name']).join(', ')
        }
    }

    public async getRecentlyPlayed(): Promise<Track> {
        const response = await this.request('player/recently-played?limit=1', 'GET')
        if (response.status !== 200) throw new SpotifyError('Error getting recently played', response)

        const data = (await response.json())['items'][0]['track']

        return {
            coverArt: data['album']['images'][0]['url'] || data['images'][0]['url'],
            link: data['external_urls']['spotify'],
            name: data['name'],
            artist: (data['artists'] as Array<any>).map((x) => x['name']).join(', ')
        }
    }

    public async getTopAll(): Promise<TopAll> {
        const responses = await Promise.all([
            this.request('top/tracks?limit=10', 'GET'),
            this.request('top/artists?limit=10', 'GET')
        ])

        const [tracksResponse, artistsResponse] = responses

        if (tracksResponse.status !== 200)
            throw new SpotifyError('Error getting top tracks and artists', tracksResponse)
        const tracks = (await tracksResponse.json())['items'].map((x: any) => {
            return {
                coverArt: x['album']['images'][0]['url'] || x['images'][0]['url'],
                link: x['external_urls']['spotify'],
                name: x['name'],
                artist: (x['artists'] as Array<any>).map((x) => x['name']).join(', ')
            }
        })

        if (artistsResponse.status !== 200) throw new SpotifyError('Error getting top artists', artistsResponse)
        const artists = (await artistsResponse.json())['items'].map((x: any) => {
            return {
                name: x['name'],
                link: x['external_urls']['spotify'],
                image: x['images'][0]['url']
            }
        })

        return { tracks, artists }
    }
}
