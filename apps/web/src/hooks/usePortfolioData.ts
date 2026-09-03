import { useState, useEffect, useCallback } from 'react';
import { PortfolioOverviewResponse } from '@portfolio/shared';

const FALLBACK_DATA: PortfolioOverviewResponse = {
  profile: {
    username: 'ViktorGabriel',
    name: 'Viktor Gabriel',
    bio: 'Software Engineer com foco em Clean Architecture, SOLID, Node.js, TypeScript e React. Construindo sistemas escaláveis e resilientes.',
    avatarUrl: 'https://avatars.githubusercontent.com/u/10000000?v=4',
    githubUrl: 'https://github.com/ViktorGabriel',
    location: 'Brasil',
    company: 'Open to Work / Freelance',
    followers: 42,
    following: 38,
    publicRepos: 18,
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
  },
  pinnedProjects: [
    {
      id: 'shoppe-cart',
      name: 'Projeto-Carrinho-Shoppe-Backend',
      displayName: 'Shoppe Cart Backend API',
      description: 'Microsserviço de carrinho de compras de alta performance com Clean Architecture, validação Zod, regras de negócio isoladas e persistência desacoplada.',
      primaryLanguage: 'TypeScript',
      languageColor: '#3178c6',
      metrics: { stars: 14, forks: 3, openIssues: 0, watchers: 14 },
      githubUrl: 'https://github.com/ViktorGabriel/Projeto-Carrinho-Shoppe-Backend',
      homepageUrl: 'https://shoppe-cart-demo.vercel.app',
      thumbnailUrl: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&auto=format&fit=crop&q=80',
      topics: ['clean-architecture', 'solid', 'nodejs', 'fastify', 'zod'],
      category: 'backend',
      isPinned: true,
      architecture: [
        {
          title: 'Clean Architecture & SOLID',
          description: 'Camadas estritamente separadas de Domain (Entidades/Regras de cálculo), Application (Use Cases) e Infrastructure (Controllers Fastify).'
        },
        {
          title: 'Idempotência & Resiliência',
          description: 'Garantia de que requisições repetidas não causem duplicação de saldo ou pedidos concorrentes.'
        }
      ],
      challenges: [
        'Cálculo atômico de descontos progressivos e cupons por item sem concorrência',
        'Modelagem desacoplada com injeção de dependências em TypeScript nativo'
      ],
      updatedAt: new Date().toISOString()
    },
    {
      id: 'fila-cozinha',
      name: 'Fila-Inteligente-Para-Cozinha',
      displayName: 'Fila Inteligente Para Cozinha (KDS)',
      description: 'Sistema em tempo real de despacho e orquestração de pedidos com algoritmo dinâmico de priorização FIFO/SLA e WebSockets.',
      primaryLanguage: 'TypeScript',
      languageColor: '#3178c6',
      metrics: { stars: 9, forks: 2, openIssues: 1, watchers: 9 },
      githubUrl: 'https://github.com/ViktorGabriel/Fila-Inteligente-Para-Cozinha',
      homepageUrl: null,
      thumbnailUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80',
      topics: ['websockets', 'event-driven', 'queue', 'nodejs'],
      category: 'backend',
      isPinned: true,
      architecture: [
        {
          title: 'Event-Driven & WebSockets',
          description: 'Notificações em milissegundos aos painéis de preparo de pratos conforme status avança.'
        },
        {
          title: 'SLA Engine',
          description: 'Repriorização automática com base no tempo de espera do cliente e complexidade do prato.'
        }
      ],
      challenges: [
        'Evitar starvation de pedidos complexos através de algoritmo dinâmico',
        'Garantia de entrega de eventos mesmo com oscilações de rede'
      ],
      updatedAt: new Date().toISOString()
    },
    {
      id: 'f1-api',
      name: 'Formula1-MinimalAPI',
      displayName: 'F1 Telemetry & Minimal API',
      description: 'API ultraleve e de baixíssima latência para telemetria de corridas de F1 com cache em múltiplos níveis.',
      primaryLanguage: 'TypeScript',
      languageColor: '#3178c6',
      metrics: { stars: 12, forks: 1, openIssues: 0, watchers: 12 },
      githubUrl: 'https://github.com/ViktorGabriel/Formula1-MinimalAPI',
      homepageUrl: null,
      thumbnailUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&auto=format&fit=crop&q=80',
      topics: ['minimal-api', 'cache', 'fast-serialization', 'telemetry'],
      category: 'api',
      isPinned: true,
      architecture: [
        {
          title: 'Zero-Overhead Endpoints',
          description: 'Minimal API focada em latência inferior a 10ms utilizando fast serialization.'
        }
      ],
      challenges: [
        'Otimização de serialização JSON para grandes volumes de dados de voltas'
      ],
      updatedAt: new Date().toISOString()
    },
    {
      id: 'dashboard-fin',
      name: 'Dashboard-Financeiro',
      displayName: 'FinTrack - Analytics Financeiro',
      description: 'Plataforma de inteligência financeira pessoal e corporativa com agregação de despesas e gráficos reativos.',
      primaryLanguage: 'TypeScript',
      languageColor: '#3178c6',
      metrics: { stars: 8, forks: 1, openIssues: 0, watchers: 8 },
      githubUrl: 'https://github.com/ViktorGabriel/Dashboard-Financeiro',
      homepageUrl: null,
      thumbnailUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
      topics: ['react', 'dashboard', 'charts', 'finance'],
      category: 'fullstack',
      isPinned: true,
      architecture: [
        {
          title: 'Data Aggregation Pipelines',
          description: 'Processamento e categorização automática de transações.'
        }
      ],
      challenges: [
        'Consistência de casas decimais em cálculos de juros'
      ],
      updatedAt: new Date().toISOString()
    }
  ],
  allProjects: [],
  stats: {
    totalStars: 43,
    totalRepos: 18,
    topLanguages: [
      { language: 'TypeScript', count: 12, color: '#3178c6' },
      { language: 'JavaScript', count: 4, color: '#f1e05a' },
      { language: 'HTML', count: 2, color: '#e34c26' }
    ]
  },
  cachedAt: new Date().toISOString(),
  isCached: true
} as unknown as PortfolioOverviewResponse;

export function usePortfolioData() {
  const [data, setData] = useState<PortfolioOverviewResponse>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      const res = await fetch('http://localhost:3333/api/portfolio/overview', {
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const json = (await res.json()) as PortfolioOverviewResponse;
      setData(json);
    } catch (err) {
      console.warn('Usando dados de fallback para resiliência imediata:', err);
      setData(FALLBACK_DATA);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
