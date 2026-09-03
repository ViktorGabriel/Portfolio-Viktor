import { RawGitHubRepo, RawGitHubUser } from '../../domain/repositories/IGitHubGateway.js';

export const mockGitHubUser: RawGitHubUser = {
  login: 'ViktorGabriel',
  name: 'Viktor Gabriel',
  bio: 'Software Engineer com foco em Clean Architecture, SOLID, Node.js, TypeScript e React. Desenvolvendo sistemas de alto desempenho, resiliência e código limpo.',
  avatar_url: 'https://avatars.githubusercontent.com/u/10000000?v=4',
  html_url: 'https://github.com/ViktorGabriel',
  location: 'Brasil',
  company: 'Open to Opportunities / Tech Consulting',
  followers: 42,
  following: 38,
  public_repos: 18
};

export const mockGitHubRepos: RawGitHubRepo[] = [
  {
    id: 101,
    name: 'Projeto-Carrinho-Shoppe-Backend',
    description: 'Microsserviço de carrinho de compras de alta performance com Clean Architecture, validação Zod e isolamento de regras de negócio.',
    html_url: 'https://github.com/ViktorGabriel/Projeto-Carrinho-Shoppe-Backend',
    homepage: 'https://shoppe-cart-demo.vercel.app',
    stargazers_count: 14,
    forks_count: 3,
    open_issues_count: 0,
    watchers_count: 14,
    language: 'TypeScript',
    topics: ['clean-architecture', 'solid', 'nodejs', 'fastify', 'zod'],
    updated_at: new Date().toISOString(),
    fork: false
  },
  {
    id: 102,
    name: 'Fila-Inteligente-Para-Cozinha',
    description: 'Sistema em tempo real de despacho e orquestração de pedidos com algoritmo dinâmico de priorização e WebSockets.',
    html_url: 'https://github.com/ViktorGabriel/Fila-Inteligente-Para-Cozinha',
    homepage: null,
    stargazers_count: 9,
    forks_count: 2,
    open_issues_count: 1,
    watchers_count: 9,
    language: 'TypeScript',
    topics: ['websockets', 'event-driven', 'queue', 'nodejs'],
    updated_at: new Date().toISOString(),
    fork: false
  },
  {
    id: 103,
    name: 'Formula1-MinimalAPI',
    description: 'API ultraleve e de baixíssima latência para telemetria de corridas de F1 com cache em múltiplos níveis.',
    html_url: 'https://github.com/ViktorGabriel/Formula1-MinimalAPI',
    homepage: null,
    stargazers_count: 12,
    forks_count: 1,
    open_issues_count: 0,
    watchers_count: 12,
    language: 'TypeScript',
    topics: ['minimal-api', 'cache', 'fast-serialization', 'telemetry'],
    updated_at: new Date().toISOString(),
    fork: false
  },
  {
    id: 104,
    name: 'Dashboard-Financeiro',
    description: 'Plataforma de inteligência financeira pessoal e corporativa com agregação de despesas e gráficos reativos.',
    html_url: 'https://github.com/ViktorGabriel/Dashboard-Financeiro',
    homepage: null,
    stargazers_count: 8,
    forks_count: 1,
    open_issues_count: 0,
    watchers_count: 8,
    language: 'TypeScript',
    topics: ['react', 'dashboard', 'charts', 'finance'],
    updated_at: new Date().toISOString(),
    fork: false
  },
  {
    id: 105,
    name: 'Gerenciador-de-podcasts',
    description: 'Hub de agregação e streaming de podcasts com parser de feeds RSS XML assíncrono.',
    html_url: 'https://github.com/ViktorGabriel/Gerenciador-de-podcasts',
    homepage: null,
    stargazers_count: 6,
    forks_count: 0,
    open_issues_count: 0,
    watchers_count: 6,
    language: 'TypeScript',
    topics: ['podcast', 'rss', 'streaming'],
    updated_at: new Date().toISOString(),
    fork: false
  }
];
