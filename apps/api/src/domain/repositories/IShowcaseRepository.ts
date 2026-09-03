import { ArchitectureHighlight } from '@portfolio/shared';

export interface ShowcaseProjectMetadata {
  repoName: string;
  displayName: string;
  customDescription?: string;
  thumbnailUrl: string;
  category: 'backend' | 'fullstack' | 'frontend' | 'mobile' | 'api';
  isPinned: boolean;
  architecture: ArchitectureHighlight[];
  challenges: string[];
}

export interface IShowcaseRepository {
  getShowcaseMetadata(): Promise<ShowcaseProjectMetadata[]>;
  getMetadataForRepo(repoName: string): Promise<ShowcaseProjectMetadata | null>;
}
