export class DiscordError extends Error {
    constructor(message: string) {
        super(message);
        this.name = "DiscordError";
    }
}

export enum Status {
    Online = "online",
    Offline = "offline",
    DoNotDisturb = "dnd",
    Idle = "idle",
}

export interface DiscordPresence {
    avatarUrl: string;
    status: Status;
    presence: string | null;
    activity: Activity | null;
}

export interface Activity {
    name: string;
    state: string | null;
    details: string | null;
    type: number;
    application_id: string;
    assets: {
        large_image: string | null;
        large_text: string | null;
        small_image: string | null; // I won't use this
        small_text: string | null;
    };
}

export class Discord {
    public userId = "";
    private lanyardUrl = "";

    public constructor(userId: string) {
        this.userId = userId;
        this.lanyardUrl = `https://api.lanyard.rest/v1/users/${this.userId}`;
    }

    private async getData(): Promise<any> {
        const response = await fetch(this.lanyardUrl);
        if (!response.ok) {
            throw new DiscordError("Failed to fetch discord presence");
        }

        let data = await response.json();
        if (data.success === false) {
            throw new DiscordError("Failed to fetch discord presence");
        }
        data = data.data;

        return data;
    }

    public async getHasActivity(): Promise<boolean> {
        const data = await this.getData();

        if (data.activities === null || data.activities === undefined) {
            return false;
        }

        // Filter activities with assets
        const activities: Array<Activity> = data.activities.filter(
            (activity: any) => {
                return activity.assets && activity.assets.large_image;
            }
        )

        // Remove spotify if it exists
        const spotify = activities.find((_activity: any) => {
            return _activity.name === "Spotify";
        });

        if (spotify !== undefined)
            activities.splice(activities.indexOf(spotify), 1);

        return activities.length > 0;
    }

    public async getPresence(): Promise<DiscordPresence> {
        const data = await this.getData();
        
        const avatarUrl = `https://cdn.discordapp.com/avatars/${this.userId}/${data.discord_user.avatar}.png?size=512`;
        const status = data.discord_status as Status;

        // Filter activities with assets
        const activities: Array<Activity> = data.activities.filter(
            (activity: any) => {
                return activity.assets && activity.assets.large_image;
            }
        );

        let activity: Activity | null = null;
        let presence: string | null = null;

        if (activities.length > 0) {
            // Search for spotify and vscode
            const spotify = activities.find((_activity: any) => {
                return _activity.name === "Spotify";
            });

            const vscode = activities.find((_activity: any) => {
                return _activity.name === "Visual Studio Code";
            });

            /*
                Spotify:    Presence: Listening to Spotify  - Activity: Spotify (Activity will be ignored because we get data from Spotify's API instead)
                VSCode:     Presence: Coding in VSCode      - Activity: VSCode
                Both:       Presence: Codin' and Vibin'     - Activity: VSCode
                Otherwise:  Presence: Activity name         - Activity: Activity
                None:       Presence: null                  - Activity: null
            */
            if (spotify && !vscode) {
                presence = `Listening to Spotify`;
                activity = spotify;
            } else if (vscode && !spotify) {
                presence = `Coding in VSCode`;
                activity = vscode;
            } else if (vscode && spotify) {
                presence = `Codin' and Vibin'`;
                activity = vscode;
            } else {
                if (activities[0].type === 0) {
                    presence = "Playing " + activities[0].name;
                }
                else if (activities[0].type === 1) {
                    presence = "Streaming " + activities[0].name;
                }
                else if (activities[0].type === 2) {
                    presence = "Listening to " + activities[0].name;
                }
                else if (activities[0].type === 3) {
                    presence = "Watching " + activities[0].name;
                }
                else if (activities[0].type === 4) {
                    presence = "Competing in " + activities[0].name;
                }
                else {
                    presence = activities[0].name;
                }
                activity = activities[0];
            }

            // edit activity image
            activity.assets.large_image = `https://cdn.discordapp.com/app-assets/${activity?.application_id}/${activity?.assets.large_image}.png?size=512`;
        }
        
        return {
            avatarUrl,
            status,
            presence,
            activity,
        };
    }
}
