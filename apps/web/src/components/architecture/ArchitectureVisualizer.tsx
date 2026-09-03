import React, { useState } from 'react';
import { Layers, ShieldCheck, CheckCircle, Info } from 'lucide-react';

interface NodeInfo {
  id: string;
  title: string;
  badge: string;
  description: string;
  tech: string[];
  solidPattern: string;
}

const NODES: NodeInfo[] = [
  {
    id: 'client',
    title: 'Client Web Layer',
    badge: 'FRONTEND SPA',
    description: 'Interface reativa de alto desempenho construída em React 19 com Framer Motion, gerando renderizações a 60 FPS com contratos Zod estritos compartilhados.',
    tech: ['React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    solidPattern: 'Single Responsibility Principle (SRP) no desacoplamento de hooks e componentes visuais.'
  },
  {
    id: 'gateway',
    title: 'BFF Fastify Gateway',
    badge: 'REVERSE PROXY & API',
    description: 'Camada de orquestração de microsserviços e BFF de baixíssima latência com Fastify, validação de payload em tempo de execução e sanitização de requisições.',
    tech: ['Fastify v5', 'Zod Schemas', 'Node.js', 'CORS Security'],
    solidPattern: 'Dependency Inversion Principle (DIP) entre controllers e casos de uso de negócio.'
  },
  {
    id: 'cache',
    title: 'Multi-Tier Cache Layer',
    badge: 'IN-MEMORY / REDIS',
    description: 'Serviço de cache resiliente com TTL configurável (1800s) e fallback automático para dados offline, garantindo resposta em sub-2ms e tolerância a falhas de rate limit.',
    tech: ['InMemoryCache', 'Redis Interface', 'TTL Policy', 'Fault-Tolerance'],
    solidPattern: 'Interface Segregation Principle (ISP) e Liskov Substitution (LSP) para troca transparente de provedor de cache.'
  },
  {
    id: 'domain',
    title: 'Clean Architecture Domain Core',
    badge: 'BUSINESS LOGIC',
    description: 'Casos de uso e entidades puras, totalmente livres de qualquer dependência externa ou framework web, testáveis em 100% de isolamento.',
    tech: ['Use Cases', 'Entities', 'Gateways Interfaces', 'Strict Contracts'],
    solidPattern: 'Open/Closed Principle (OCP) permitindo adicionar novos serviços sem tocar nas regras de domínio.'
  }
];

export const ArchitectureVisualizer: React.FC = () => {
  const [selectedNode, setSelectedNode] = useState<NodeInfo>(NODES[1]);

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 my-10 border border-cyber-border relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyber-cyan/5 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyber-border/70 pb-5 mb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-cyber-cyan" />
            <h3 className="text-sm font-mono uppercase tracking-wider text-white font-bold">
              Interactive System Architecture & SOLID Blueprints
            </h3>
          </div>
          <p className="text-xs text-cyber-muted">
            Clique em qualquer nó do pipeline para inspecionar os princípios de Clean Architecture e SOLID aplicados.
          </p>
        </div>

        <div className="flex items-center space-x-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded-md bg-cyber-surface border border-cyber-border text-cyber-cyan flex items-center space-x-1.5">
            <CheckCircle className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>Decoupled Monorepo</span>
          </span>
        </div>
      </div>

      {/* Pipeline Interativo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {NODES.map((node) => {
          const isSelected = selectedNode.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`p-4 rounded-xl border text-left transition-all duration-300 relative ${
                isSelected
                  ? 'bg-cyber-surface/90 border-cyber-cyan shadow-glow-cyan text-white'
                  : 'bg-cyber-surface/40 border-cyber-border/80 text-cyber-muted hover:border-cyber-cyan/50 hover:text-white'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 border border-cyber-border text-cyber-cyan font-semibold">
                  {node.badge}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-cyber-cyan animate-pulse" />}
              </div>
              <div className="font-bold text-xs sm:text-sm text-white mb-1">{node.title}</div>
              <div className="text-[11px] text-cyber-dim font-mono truncate">
                {node.tech.slice(0, 2).join(' • ')}
              </div>
            </button>
          );
        })}
      </div>

      {/* Detalhamento do Nó Selecionado */}
      <div className="rounded-xl bg-cyber-surface/80 border border-cyber-border p-5 space-y-4 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyber-border/50 pb-3">
          <div className="space-y-0.5">
            <div className="text-xs font-mono text-cyber-cyan flex items-center space-x-1.5">
              <Info className="w-3.5 h-3.5" />
              <span>INSPEÇÃO ARQUITETURAL: {selectedNode.badge}</span>
            </div>
            <h4 className="text-base font-bold text-white">{selectedNode.title}</h4>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {selectedNode.tech.map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-black/50 border border-cyber-border text-cyber-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <p className="text-xs sm:text-sm text-cyber-muted leading-relaxed">
          {selectedNode.description}
        </p>

        <div className="p-3.5 rounded-lg bg-black/40 border border-cyber-border/80 flex items-start space-x-3">
          <ShieldCheck className="w-4 h-4 text-cyber-purple flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="text-xs font-bold text-cyber-purple block">
              Princípio SOLID Aplicado
            </span>
            <p className="text-xs text-cyber-text leading-relaxed">
              {selectedNode.solidPattern}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};