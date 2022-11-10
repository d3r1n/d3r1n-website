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
	image_url: string;
	status: Status;
	presence: string | null;
}

export interface Activity {
	name: string;
}

export class Discord {
	public user_id: string = "";

	public constructor(user_id: string) {
		this.user_id = user_id;
	}

	public async get_presence(): Promise<DiscordPresence | DiscordError> {
		const lanyard_url = `https://api.lanyard.rest/v1/users/${this.user_id}`;
		let response = await fetch(lanyard_url);
		if (!response.ok) {
			return new DiscordError("Failed to fetch discord presence");
		}

		let data = await response.json();
		if (data.success === false) {
			return new DiscordError("Failed to fetch discord presence");
		}
		data = data.data;
		let avatar_url = `https://cdn.discordapp.com/avatars/${this.user_id}/${data.discord_user.avatar}.png?size=512`;
		let status = data.discord_status as Status;

		// Get Spotify and VSCode from activities
		let activities: Array<Activity> = data.activities.filter(
			(activity: any) => {
				return (
					activity.name === "Spotify" ||
					activity.name === "Visual Studio Code"
				);
			}
		);
		let presence: string | null = null;
		if (activities.length === 1) {
			if (activities[0].name === "Spotify") {
				presence = "Listening to Spotify";
			} else presence = "Coding in Vscode";
		} else if (activities.length > 1) {
			presence = "Vibin' & Codin'";
		}

		return {
			image_url: avatar_url,
			status: status,
			presence: presence,
		};
	}
}
