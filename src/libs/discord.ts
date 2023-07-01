interface DiscordActivity {
    type: number
    state: string
    name: string
}

interface LanyardResponse {
    discord_user: {
        id: string
        username: string
        avatar: string
    }
    discord_status: string
    activities: DiscordActivity[]
}

export interface DiscordUser {
    id: string
    username: string
    avatar: string
    status: string
    custom_status: string | null
}

export class DiscordResponse {
    constructor(private response: LanyardResponse) {
        this.response = response
    }

    get id(): string {
        return this.response.discord_user.id
    }

    get username(): string {
        return this.response.discord_user.username
    }

    get status(): string {
        return this.response.discord_status
    }

    get custom_status(): string | null {
        // find the custom status
        const custom_status = this.response.activities.find((activity) => activity.type === 4)

        if (custom_status) {
            return custom_status.state
        }

        return null
    }

    get avatar(): string {
        const avatar = this.response.discord_user.avatar
        // check if it's a gif
        const is_gif = avatar.startsWith('a_')
        return `https://cdn.discordapp.com/avatars/${this.id}/${avatar}.${is_gif ? 'gif' : 'png'}?size=256`
    }
}

export class Discord {
    constructor(public id: string) {
        this.id = id
    }

    async fetch(): Promise<DiscordResponse> {
        const lanyard_url = `https://api.lanyard.rest/v1/users/${this.id}`
        const response = await fetch(lanyard_url)
        const json = await response.json()

        return new DiscordResponse(json.data)
    }
}
