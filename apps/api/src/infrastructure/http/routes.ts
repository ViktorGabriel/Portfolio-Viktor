import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { GetPortfolioOverviewUseCase } from '../../application/use-cases/GetPortfolioOverviewUseCase.js';
import { ICacheService } from '../../domain/repositories/ICacheService.js';

interface RouteOptions {
  getOverviewUseCase: GetPortfolioOverviewUseCase;
  cacheService: ICacheService;
  defaultUsername: string;
}

export const portfolioRoutes = (options: RouteOptions): FastifyPluginAsync => {
  return async (fastify: FastifyInstance) => {
    fastify.get('/health', async () => {
      return { status: 'ok', timestamp: new Date().toISOString() };
    });

    fastify.get('/api/portfolio/overview', async (request, reply) => {
      try {
        const query = request.query as { username?: string };
        const username = query.username || options.defaultUsername;

        const overview = await options.getOverviewUseCase.execute(username);
        return reply.status(200).send(overview);
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({
          error: 'InternalServerError',
          message: 'Falha ao obter dados do portfólio.'
        });
      }
    });

    fastify.post('/api/portfolio/cache/clear', async (request, reply) => {
      try {
        const query = request.query as { username?: string };
        const username = query.username || options.defaultUsername;
        await options.cacheService.invalidate(`portfolio:overview:${username.toLowerCase()}`);
        return reply.status(200).send({ message: 'Cache invalidado com sucesso.' });
      } catch (error) {
        fastify.log.error(error);
        return reply.status(500).send({ error: 'Falha ao limpar cache.' });
      }
    });
  };
};
