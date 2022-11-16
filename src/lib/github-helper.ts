export interface Repository {
	name: string;
	html_url: string;
	description: string;
	stars: number;
	forks: number;
	language: string;
}

export function sort_by_stars(repos: Repository[]): Repository[] {
	return repos.sort((a, b) => b.stars - a.stars);
}

export class GithubError extends Error {
	constructor(message: string, cause?: unknown) {
		super(message);
		this.name = "GithubError";
		this.cause = cause;
	}
}

export class Github {
	public username: string;

	public constructor(username: string) {
		this.username = username;
	}

	public async get_repos(): Promise<Repository[]> {
		const response = await fetch(`https://api.github.com/users/${this.username}/repos`);
		if (!response.ok) {
			throw new GithubError("Failed to fetch repositories");
		}

		const repos = await response.json();
		return repos.map((repo: any) => ({
			name: repo.name,
			html_url: repo.html_url,
			description: repo.description,
			stars: repo.stargazers_count,
			forks: repo.forks_count,
			language: repo.language,
		}));
	}

	public static sort_by_stars(repos: Repository[]): Repository[] {
		return repos.sort((a, b) => b.stars - a.stars);
	}
}