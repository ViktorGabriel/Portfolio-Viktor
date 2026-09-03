# Arquitetura do Projeto: Portfolio-Viktor

Documento consolidado resultante da sessao de Brainstorming e Design Tecnico.

## 1. Resumo do Entendimento
- Objetivo: Criar um portfolio de alta performance e apelo visual no formato de segundo perfil do GitHub, com landing page dinamica e scroll-driven layout.
- Publico-alvo: Recrutadores, lideres tecnicos e desenvolvedores.
- Estrutura: Monorepo (apps/web, apps/api, packages/shared).

## 2. Registro de Decisões (Decision Log)
- Monorepo com NPM Workspaces
- Backend: Node.js + Fastify + TypeScript + Zod (Clean Architecture & SOLID)
- Padrao BFF com Cache em Memoria e Fallback Resiliente para evitar rate limits do GitHub
- Frontend: React (Vite) + Tailwind CSS + Shadcn/UI + Lucide React + Framer Motion
- Metadados ricos dos repositorios gerenciados via showcase.config.json no backend

## 3. Estrutura de Diretorios
- apps/web: Frontend React SPA
- apps/api: Backend BFF Fastify com camadas domain, application e infrastructure
- packages/shared: Tipos e schemas Zod compartilhados
