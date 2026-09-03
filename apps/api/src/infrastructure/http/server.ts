import fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { GitHubApiClient } from '../external/GitHubApiClient.js';
import { InMemoryCacheService } from '../cache/InMemoryCacheService.js';
import { ShowcaseConfigRepository } from '../data/ShowcaseConfigRepository.js';
import { GetPortfolioOverviewUseCase } from '../../application/use-cases/GetPortfolioOverviewUseCase.js';
import { portfolioRoutes } from './routes.js';

dotenv.config();

const port = Number(process.env.PORT) || 3333;
const host = process.env.HOST || '0.0.0.0';
const defaultUsername = process.env.GITHUB_USERNAME || 'ViktorGabriel';

export async function buildServer() {
  const app = fastify({
    logger: true
  });

  await app.register(cors, {
    origin: true,
    methods: ['GET', 'POST', 'OPTIONS']
  });

  // Dependency Inversion Principle (Composition Root)
  const gitHubGateway = new GitHubApiClient();
  const cacheService = new InMemoryCacheService();
  const showcaseRepository = new ShowcaseConfigRepository();
  const getOverviewUseCase = new GetPortfolioOverviewUseCase(
    gitHubGateway,
    showcaseRepository,
    cacheService
  );

  await app.register(
    portfolioRoutes({
      getOverviewUseCase,
      cacheService,
      defaultUsername
    })
  );

  return app;
}

async function start() {
  try {
    const server = await buildServer();
    await server.listen({ port, host });
    console.log(`🚀 API BFF rodando com sucesso em http://localhost:${port}`);
  } catch (err) {
    console.error('Erro ao iniciar servidor:', err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'test') {
  start();
}

