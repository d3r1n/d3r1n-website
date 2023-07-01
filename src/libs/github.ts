export interface GitHubRepo {
    name: string
    description: string
    html_url: string
    language: string
    stargazers_count: number
    forks_count: number
    fork: boolean
}

export class GitHub {
    constructor(public username: string) {
        this.username = username
    }

    async getRepos(): Promise<GitHubRepo[]> {
        const response = await fetch(`https://api.github.com/users/${this.username}/repos`)
        const data = await response.json()
        return data
    }
}
