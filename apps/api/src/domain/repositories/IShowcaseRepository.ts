import { ArchitectureHighlight } from '@portfolio/shared';

export interface ShowcaseProjectMetadata {
  repoName: string;
  displayName: string;
  customDescription?: string;
  thumbnailUrl: string;
  category: 'backend' | 'fullstack' | 'frontend' | 'mobile' | 'api' | 'utilities';
  isPinned: boolean;
  architecture: ArchitectureHighlight[];
  challenges: string[];
  executiveSpec?: {
    problem: string;
    archHighlight: string;
  };
  codeSnippet?: string;
  techSpecs?: string[];
  verifiedViaReadme?: boolean;
  primaryLanguage?: string;
  languageColor?: string;
  metrics?: { stars: number; forks: number };
  topics?: string[];
  githubUrl?: string;
}

export interface IShowcaseRepository {
  getShowcaseMetadata(): Promise<ShowcaseProjectMetadata[]>;
  getMetadataForRepo(repoName: string): Promise<ShowcaseProjectMetadata | null>;
}
