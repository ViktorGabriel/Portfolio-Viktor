import {
  PortfolioOverviewResponse,
  Project,
  LanguageStat
} from '@portfolio/shared';
import { IGitHubGateway, RawGitHubRepo } from '../../domain/repositories/IGitHubGateway.js';
import { ICacheService } from '../../domain/repositories/ICacheService.js';
import { IShowcaseRepository, ShowcaseProjectMetadata } from '../../domain/repositories/IShowcaseRepository.js';

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  'C#': '#178600',
  Go: '#00ADD8',
  Rust: '#dea584',
  Shell: '#89e051',
  Vue: '#41b883'
};

export class GetPortfolioOverviewUseCase {
  constructor(
    private readonly gitHubGateway: IGitHubGateway,
    private readonly showcaseRepository: IShowcaseRepository,
    private readonly cacheService: ICacheService
  ) {}

  async execute(username: string): Promise<PortfolioOverviewResponse> {
    const cacheKey = `portfolio:overview:${username.toLowerCase()}`;
    const cached = await this.cacheService.get<PortfolioOverviewResponse>(cacheKey);

    if (cached) {
      return {
        ...cached,
        isCached: true
      };
    }

    const [profile, rawRepos, showcaseList] = await Promise.all([
      this.gitHubGateway.getUserProfile(username),
      this.gitHubGateway.getUserRepositories(username),
      this.showcaseRepository.getShowcaseMetadata()
    ]);

    const showcaseMap = new Map<string, ShowcaseProjectMetadata>();
    for (const item of showcaseList) {
      showcaseMap.set(item.repoName.toLowerCase(), item);
    }

    const projects: Project[] = rawRepos.map((repo) =>
      this.enrichProject(repo, showcaseMap.get(repo.name.toLowerCase()))
    );

    // Also include any showcase project that might not be in the rawRepos list
    for (const showcase of showcaseList) {
      const alreadyIncluded = projects.some(
        (p) => p.name.toLowerCase() === showcase.repoName.toLowerCase()
      );
      if (!alreadyIncluded) {
        projects.push(this.createProjectFromShowcaseOnly(showcase, username));
      }
    }

    // Sort: pinned first, then by stars desc, then updatedAt desc
    projects.sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      if (b.metrics.stars !== a.metrics.stars) return b.metrics.stars - a.metrics.stars;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });

    const pinnedProjects = projects.filter((p) => p.isPinned);
    const topLanguages = this.calculateTopLanguages(rawRepos);
    const totalStars = projects.reduce((acc, p) => acc + p.metrics.stars, 0);

    const result: PortfolioOverviewResponse = {
      profile,
      pinnedProjects,
      allProjects: projects,
      stats: {
        totalStars,
        totalRepos: profile.publicRepos || projects.length,
        topLanguages
      },
      cachedAt: new Date().toISOString(),
      isCached: false
    };

    // Cache for 30 minutes
    await this.cacheService.set(cacheKey, result, 1800);

    return result;
  }

  private enrichProject(
    repo: RawGitHubRepo,
    showcase?: ShowcaseProjectMetadata
  ): Project {
    const lang = repo.language || 'TypeScript';
    return {
      id: String(repo.id),
      name: repo.name,
      displayName: showcase?.displayName || repo.name.replace(/-/g, ' '),
      description:
        showcase?.customDescription ||
        repo.description ||
        'Projeto de engenharia de software desenvolvido com foco em boas práticas.',
      primaryLanguage: lang,
      languageColor: LANGUAGE_COLORS[lang] || '#8b949e',
      metrics: {
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        openIssues: repo.open_issues_count,
        watchers: repo.watchers_count
      },
      githubUrl: repo.html_url,
      homepageUrl: repo.homepage,
      thumbnailUrl:
        showcase?.thumbnailUrl ||
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      topics: repo.topics || [],
      category: showcase?.category || 'backend',
      isPinned: showcase?.isPinned ?? (repo.stargazers_count > 0),
      architecture: showcase?.architecture || [
        {
          title: 'Arquitetura Modular',
          description: 'Separação de responsabilidades e desacoplamento de componentes.'
        }
      ],
      challenges: showcase?.challenges || [
        'Organização de código limpo e padrões de projeto sustentáveis.'
      ],
      executiveSpec: showcase?.executiveSpec,
      codeSnippet: showcase?.codeSnippet,
      techSpecs: showcase?.techSpecs,
      verifiedViaReadme: showcase?.verifiedViaReadme ?? false,
      updatedAt: repo.updated_at
    };
  }

  private createProjectFromShowcaseOnly(
    showcase: ShowcaseProjectMetadata,
    username: string
  ): Project {
    return {
      id: showcase.repoName,
      name: showcase.repoName,
      displayName: showcase.displayName,
      description: showcase.customDescription || 'Projeto em destaque do portfólio.',
      primaryLanguage: showcase.primaryLanguage || 'TypeScript',
      languageColor: showcase.languageColor || LANGUAGE_COLORS['TypeScript'],
      metrics: showcase.metrics 
        ? { stars: showcase.metrics.stars, forks: showcase.metrics.forks, openIssues: 0, watchers: 0 }
        : { stars: 12, forks: 2, openIssues: 0, watchers: 12 },
      githubUrl: showcase.githubUrl || `https://github.com/${username}/${showcase.repoName}`,
      homepageUrl: null,
      thumbnailUrl: showcase.thumbnailUrl || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=80',
      topics: showcase.topics || ['clean-architecture', 'typescript', 'backend'],
      category: showcase.category,
      isPinned: showcase.isPinned,
      architecture: showcase.architecture || [],
      challenges: showcase.challenges || [],
      executiveSpec: showcase.executiveSpec,
      codeSnippet: showcase.codeSnippet,
      techSpecs: showcase.techSpecs,
      verifiedViaReadme: showcase.verifiedViaReadme ?? false,
      updatedAt: new Date().toISOString()
    };
  }

  private calculateTopLanguages(repos: RawGitHubRepo[]): LanguageStat[] {
    const counts: Record<string, number> = {};
    for (const repo of repos) {
      if (repo.language) {
        counts[repo.language] = (counts[repo.language] || 0) + 1;
      }
    }

    return Object.entries(counts)
      .map(([language, count]) => ({
        language,
        count,
        color: LANGUAGE_COLORS[language] || '#8b949e'
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }
}
