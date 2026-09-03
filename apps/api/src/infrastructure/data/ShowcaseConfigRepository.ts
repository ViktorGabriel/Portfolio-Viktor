import { IShowcaseRepository, ShowcaseProjectMetadata } from '../../domain/repositories/IShowcaseRepository.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class ShowcaseConfigRepository implements IShowcaseRepository {
  private metadata: ShowcaseProjectMetadata[] = [];

  constructor() {
    this.loadConfig();
  }

  private loadConfig(): void {
    try {
      const filePath = path.join(__dirname, 'showcase.config.json');
      if (fs.existsSync(filePath)) {
        const raw = fs.readFileSync(filePath, 'utf8');
        this.metadata = JSON.parse(raw);
      }
    } catch {
      this.metadata = [];
    }
  }

  async getShowcaseMetadata(): Promise<ShowcaseProjectMetadata[]> {
    return this.metadata;
  }

  async getMetadataForRepo(repoName: string): Promise<ShowcaseProjectMetadata | null> {
    const found = this.metadata.find(
      (m) => m.repoName.toLowerCase() === repoName.toLowerCase()
    );
    return found || null;
  }
}
