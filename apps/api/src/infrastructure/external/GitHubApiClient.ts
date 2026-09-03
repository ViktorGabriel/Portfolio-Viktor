import { Profile } from '@portfolio/shared';
import { IGitHubGateway, RawGitHubRepo, RawGitHubUser } from '../../domain/repositories/IGitHubGateway.js';
import { mockGitHubRepos, mockGitHubUser } from './mockGitHubData.js';

export class GitHubApiClient implements IGitHubGateway {
  private readonly baseUrl = 'https://api.github.com';
  private readonly token = process.env.GITHUB_TOKEN;

  private getHeaders(): Record<string, string> {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'Portfolio-Viktor-BFF'
    };

    if (this.token) {
      headers['Authorization'] = `token ${this.token}`;
    }

    return headers;
  }

  async getUserProfile(username: string): Promise<Profile> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/users/${username}`, {
        headers: this.getHeaders(),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn(`[GitHubApiClient] User API returned ${res.status}. Using fallback profile.`);
        return this.mapUserToProfile(mockGitHubUser);
      }

      const data = (await res.json()) as RawGitHubUser;
      return this.mapUserToProfile(data);
    } catch (error) {
      console.warn('[GitHubApiClient] Error fetching user profile. Using fallback data.', error);
      return this.mapUserToProfile(mockGitHubUser);
    }
  }

  async getUserRepositories(username: string): Promise<RawGitHubRepo[]> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const res = await fetch(`${this.baseUrl}/users/${username}/repos?per_page=100&sort=updated`, {
        headers: this.getHeaders(),
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        console.warn(`[GitHubApiClient] Repos API returned ${res.status}. Using fallback repos.`);
        return mockGitHubRepos;
      }

      const data = (await res.json()) as RawGitHubRepo[];
      if (!Array.isArray(data) || data.length === 0) {
        return mockGitHubRepos;
      }

      return data.filter((r) => !r.fork);
    } catch (error) {
      console.warn('[GitHubApiClient] Error fetching repositories. Using fallback repos.', error);
      return mockGitHubRepos;
    }
  }

  private mapUserToProfile(user: RawGitHubUser): Profile {
    return {
      username: user.login,
      name: user.name || user.login,
      bio: user.bio || 'Software Engineer especializado em Clean Architecture, SOLID e TypeScript.',
      avatarUrl: user.avatar_url,
      githubUrl: user.html_url,
      location: user.location || 'Brasil',
      company: user.company || 'Open to Work / Freelance',
      followers: user.followers,
      following: user.following,
      publicRepos: user.public_repos,
      status: 'Building high-impact solutions with Clean Architecture & SOLID 🚀',
      skills: [
        'Node.js',
        'TypeScript',
        'React',
        'Fastify',
        'Clean Architecture',
        'SOLID',
        'Tailwind CSS',
        'Docker'
      ]
    };
  }
}
