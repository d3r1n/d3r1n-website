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

export class GitHubError extends Error {
    constructor(message?: string) {
        super(message);
        this.name = "GitHubError";
        this.message = message ?? ""; // If message is undefined, set it to an empty string
    }
}

export class GitHub {
    public username: string;

    public constructor(username: string) {
        this.username = username;
    }

    public async get_repos(): Promise<Repository[]> {
        const response = await fetch(
            `https://api.github.com/users/${this.username}/repos`
        );
        if (!response.ok) {
            throw new GitHubError("Failed to fetch repositories");
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

    public get_repo_last_commit_hash(repo_name: string): Promise<string> {
        const hash = fetch(
            `https://api.github.com/repos/${this.username}/${repo_name}/commits`
        )
            .then((response) => {
                // Check if the response is ok
                if (!response.ok) {
                    throw new GitHubError("Failed to fetch commits");
                }
                return response.json();
            })
            .then((commits) => commits[0].sha);

        return hash;
    }
}
