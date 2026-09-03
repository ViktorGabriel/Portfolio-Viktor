import { Profile, Project } from '@portfolio/shared';

export interface RawGitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  watchers_count: number;
  language: string | null;
  topics?: string[];
  updated_at: string;
  fork: boolean;
}

export interface RawGitHubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  location: string | null;
  company: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

export interface IGitHubGateway {
  getUserProfile(username: string): Promise<Profile>;
  getUserRepositories(username: string): Promise<RawGitHubRepo[]>;
}
