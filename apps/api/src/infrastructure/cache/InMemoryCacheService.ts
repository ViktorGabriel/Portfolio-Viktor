import { ICacheService } from '../../domain/repositories/ICacheService.js';

interface CacheEntry<T> {
  data: T;
  expiresAt: number;
}

export class InMemoryCacheService implements ICacheService {
  private cache = new Map<string, CacheEntry<unknown>>();

  async get<T>(key: string): Promise<T | null> {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  async set<T>(key: string, value: T, ttlSeconds: number = 1800): Promise<void> {
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.cache.set(key, { data: value, expiresAt });
  }

  async invalidate(key: string): Promise<void> {
    this.cache.delete(key);
  }
}
