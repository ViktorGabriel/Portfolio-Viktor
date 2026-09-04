# Portfolio Viktor &mdash; Backend & BFF Architecture

[![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Fastify](https://img.shields.io/badge/Fastify-5.2-000000?style=flat-square&logo=fastify&logoColor=white)](https://fastify.dev/)
[![Zod](https://img.shields.io/badge/Zod-3.24-3E67B1?style=flat-square&logo=zod&logoColor=white)](https://zod.dev/)
[![Architecture](https://img.shields.io/badge/Architecture-Clean%20%2F%20Hexagonal-8A2BE2?style=flat-square)](#arquitetura)
[![License](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](LICENSE)

Backend For Frontend (BFF) de alta performance e resiliência responsável por agregar, enriquecer e servir dados consolidados do perfil e projetos do GitHub. O serviço orquestra chamadas com timeout, fallback offline resiliente para neutralizar _rate limits_ da API do GitHub, além de injetar metadados técnicos de engenharia (especificações executivas, SLAs e destaques de arquitetura) gerenciados internamente.

---

## 🏛️ Arquitetura

O projeto adota os princípios de **Clean Architecture**, **SOLID** e separação em **Monorepo (NPM Workspaces)**:

```
├── apps/
│   ├── api/                           # Backend BFF (Fastify + TypeScript)
│   │   ├── src/
│   │   │   ├── domain/                # Regras e contratos essenciais
│   │   │   │   └── repositories/      # Interfaces (IGitHubGateway, ICacheService, IShowcaseRepository)
│   │   │   ├── application/           # Casos de uso da aplicação
│   │   │   │   └── use-cases/         # GetPortfolioOverviewUseCase (orquestração, métricas e ranking)
│   │   │   └── infrastructure/        # Implementações e adaptadores externos
│   │   │       ├── http/              # Fastify Server, rotas e Composition Root (DI)
│   │   │       ├── external/          # GitHubApiClient com AbortController e fallback data
│   │   │       ├── cache/             # InMemoryCacheService (TTL configurável)
│   │   │       └── data/              # ShowcaseConfigRepository & showcase.config.json
│   └── web/                           # Frontend SPA (React 19, Vite, Tailwind CSS)
└── packages/
    └── shared/                        # Contratos e validações Zod compartilhadas
```

### Padrões e Decisões Técnicas
- **Composition Root / Inversão de Dependência:** As dependências são instanciadas e injetadas na inicialização do servidor Fastify (`server.ts`), desacoplando a camada de aplicação de detalhes de infraestrutura.
- **Resiliência a Rate Limits:** O cliente HTTP do GitHub utiliza requisições com timeout estrito de 4s (`AbortController`). Em cenários de rate limit (403/429), indisponibilidade ou ausência de conectividade, o serviço assume fallback automático e silencioso para mock técnico consolidado sem quebrar a camada consumidora.
- **Cache L1 em Memória:** As respostas consolidadas por usuário são cacheadas em memória por 30 minutos (1800s), minimizando tráfego externo e provendo latência sub-5ms em requisições subsequentes.
- **Metadados Curados (`showcase.config.json`):** Permite anexar métricas técnicas de produção (SLA, latência p95, snippets arquiteturais) aos repositórios do GitHub de forma declarativa.

---

## ⚙️ Variáveis de Ambiente

As configurações da API residem em `apps/api/.env`. Crie o arquivo a partir de `apps/api/.env.example`:

| Variável | Descrição | Obrigatória | Valor Padrão | Exemplo |
|---|---|:---:|---|---|
| `PORT` | Porta de escuta do servidor HTTP Fastify | Não | `3333` | `3333` |
| `HOST` | Interface de rede para bind do servidor | Não | `0.0.0.0` | `0.0.0.0` |
| `NODE_ENV` | Ambiente de execução da aplicação | Não | `development` | `development` / `production` |
| `GITHUB_USERNAME` | Nome de usuário padrão no GitHub consultado pelo BFF | Não | `ViktorGabriel` | `ViktorGabriel` |
| `GITHUB_TOKEN` | Personal Access Token (PAT) do GitHub para elevar limites de requisição (60 req/h → 5000 req/h) | Não | _Vazio_ | `ghp_xxxxxxxxxxxxxxxxxxxx` |

---

## 🚀 Setup e Execução Local

### Pré-requisitos
- **Node.js**: v20.x ou superior
- **npm**: v10.x ou superior

### 1. Clonar e Instalar Dependências
```bash
git clone https://github.com/ViktorGabriel/Portfolio-Viktor.git
cd Portfolio-Viktor
npm install
```

### 2. Configurar o Ambiente
Copie o template de variáveis de ambiente para a API:
```bash
# Windows (PowerShell)
Copy-Item apps/api/.env.example apps/api/.env

# Linux / macOS
cp apps/api/.env.example apps/api/.env
```

### 3. Build dos Pacotes Compartilhados
Como o backend consome `@portfolio/shared`, compile os contratos antes da primeira execução:
```bash
npm run build -w @portfolio/shared
```

### 4. Execução em Desenvolvimento
Para iniciar apenas a API em modo watch (`tsx` com reload instantâneo):
```bash
npm run dev:api
```
*A API estará acessível em `http://localhost:3333`.*

Para executar o Monorepo completo (API + Web Frontend concorrentemente):
```bash
npm run dev
```

### 5. Build e Execução de Produção
```bash
# Compilar todos os pacotes e aplicações
npm run build

# Iniciar o servidor compilado da API
npm run start -w @portfolio/api
```

---

## 🐳 Execução via Docker

Caso deseje empacotar e executar a API em contêiner Docker:

```bash
# Build da imagem a partir da raiz do monorepo
docker build -t portfolio-api -f apps/api/Dockerfile .

# Execução do contêiner expondo a porta 3333
docker run -d --name portfolio-api -p 3333:3333 --env-file apps/api/.env portfolio-api
```

> **Nota:** Para conveniência em ambientes de CI/CD ou deploys isolados, certifique-se de passar o contexto de build na raiz para que os pacotes do monorepo (`packages/shared`) sejam resolvidos.

---

## 📡 Documentação de Endpoints

Base URL local: `http://localhost:3333`

### 1. Health Check
Verifica se o servidor Fastify está operacional.

- **Método:** `GET`
- **Rota:** `/health`
- **Autenticação:** Nenhuma

#### Resposta de Sucesso (`200 OK`)
```json
{
  "status": "ok",
  "timestamp": "2026-09-03T19:30:00.000Z"
}
```

---

### 2. Obter Dados Consolidados do Portfólio
Recupera o perfil do desenvolvedor, projetos fixados (com especificações de arquitetura e desafios), repositórios completos e métricas agregadas (estrelas e ranking de linguagens).

- **Método:** `GET`
- **Rota:** `/api/portfolio/overview`
- **Query Params:**
  - `username` *(opcional, string)*: Usuário do GitHub a consultar. Se omitido, utiliza `GITHUB_USERNAME`.

#### Exemplo de Requisição
```bash
curl -X GET "http://localhost:3333/api/portfolio/overview?username=ViktorGabriel"
```

#### Resposta de Sucesso (`200 OK`)
```json
{
  "profile": {
    "username": "ViktorGabriel",
    "name": "Viktor Gabriel",
    "bio": "Software Engineer especializado em Clean Architecture, SOLID e TypeScript.",
    "avatarUrl": "https://avatars.githubusercontent.com/u/10000000?v=4",
    "githubUrl": "https://github.com/ViktorGabriel",
    "location": "Brasil",
    "company": "Open to Work / Freelance",
    "followers": 42,
    "following": 38,
    "publicRepos": 18,
    "status": "Building high-impact solutions with Clean Architecture & SOLID 🚀",
    "skills": [
      "Node.js",
      "TypeScript",
      "React",
      "Fastify",
      "Clean Architecture",
      "SOLID",
      "Tailwind CSS",
      "Docker"
    ]
  },
  "pinnedProjects": [
    {
      "id": "1a2b3c4d",
      "name": "Fila-Inteligente-Para-Cozinha",
      "displayName": "Real-Time Kitchen Display System (KDS)",
      "description": "Sistema de despacho e orquestração de pedidos em tempo real para cozinhas industriais e restaurantes com algoritmo de priorização dinâmica FIFO/SLA.",
      "primaryLanguage": "TypeScript",
      "languageColor": "#3178C6",
      "metrics": {
        "stars": 142,
        "forks": 38,
        "openIssues": 0,
        "watchers": 142
      },
      "githubUrl": "https://github.com/ViktorGabriel/Fila-Inteligente-Para-Cozinha",
      "homepageUrl": null,
      "thumbnailUrl": "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80",
      "topics": ["WebSocket", "Redis", "Event-Driven", "SLA-Engine"],
      "category": "backend",
      "isPinned": true,
      "architecture": [
        {
          "title": "Event-Driven & WebSockets",
          "description": "Notificações em milissegundos aos painéis de preparo de pratos conforme status avança."
        }
      ],
      "challenges": [
        "Evitar starvation de pedidos complexos através de algoritmo dinâmico"
      ],
      "executiveSpec": {
        "problem": "Engine de despacho FIFO com orquestração de pedidos em tempo real para controle rigoroso de SLA em cozinhas de alto volume.",
        "archHighlight": "Event-Driven via WebSockets + Redis FIFO queue, com SLA routing para repriorização dinâmica."
      },
      "techSpecs": [
        "P95 Latency < 45ms",
        "Throughput: 1.2k req/s",
        "Clean Architecture"
      ],
      "verifiedViaReadme": true,
      "updatedAt": "2026-09-03T19:00:00.000Z"
    }
  ],
  "allProjects": [],
  "stats": {
    "totalStars": 625,
    "totalRepos": 18,
    "topLanguages": [
      { "language": "TypeScript", "count": 12, "color": "#3178c6" },
      { "language": "Java", "count": 3, "color": "#b07219" },
      { "language": "C#", "count": 2, "color": "#178600" }
    ]
  },
  "cachedAt": "2026-09-03T19:30:15.123Z",
  "isCached": false
}
```

#### Resposta de Erro (`500 Internal Server Error`)
```json
{
  "error": "InternalServerError",
  "message": "Falha ao obter dados do portfólio."
}
```

---

### 3. Invalidação Manual de Cache
Limpa a chave de cache em memória associada ao usuário, forçando uma nova consulta aos gateways externos na próxima requisição.

- **Método:** `POST`
- **Rota:** `/api/portfolio/cache/clear`
- **Query Params:**
  - `username` *(opcional, string)*: Usuário cujo cache será purgado. Se omitido, utiliza `GITHUB_USERNAME`.

#### Exemplo de Requisição
```bash
curl -X POST "http://localhost:3333/api/portfolio/cache/clear?username=ViktorGabriel"
```

#### Resposta de Sucesso (`200 OK`)
```json
{
  "message": "Cache invalidado com sucesso."
}
```

---

## 🛠️ Scripts do Repositório

| Comando | Escopo | Descrição |
|---|---|---|
| `npm run dev` | Raiz (Monorepo) | Inicia simultaneamente API (`apps/api`) e Frontend Web (`apps/web`) |
| `npm run dev:api` | Raiz | Inicia o servidor da API em modo watch com `tsx` |
| `npm run dev:web` | Raiz | Inicia o servidor Vite do frontend |
| `npm run build` | Raiz (Monorepo) | Compila ordenadamente `@portfolio/shared`, `@portfolio/api` e `@portfolio/web` |
| `npm run build -w @portfolio/api` | API | Compila TypeScript e copia `showcase.config.json` para o diretório `dist` |
| `npm run start -w @portfolio/api` | API | Executa o bundle compilado Node.js em modo produção |

---

## 🔒 Boas Práticas e Fluxo de Manutenção

- **Atualização de Projetos em Destaque:** Para alterar desafios técnicos, problemas de negócio (`executiveSpec`) ou SLAs exibidos no portfólio, edite o arquivo declarativo [`apps/api/src/infrastructure/data/showcase.config.json`](apps/api/src/infrastructure/data/showcase.config.json).
- **Tipagem Estrita:** Ao alterar a estrutura de dados retornada pelos endpoints, atualize os esquemas Zod correspondentes em [`packages/shared/src/index.ts`](packages/shared/src/index.ts) e execute `npm run build -w @portfolio/shared` para sincronizar os tipos no backend e frontend.