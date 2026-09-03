import React, { useState } from 'react';
import { Terminal as TerminalIcon, Play, RotateCcw, Copy, Check } from 'lucide-react';

export const TerminalIntro: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'status' | 'architecture' | 'stack'>('status');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 px-4">
      <div className="rounded-xl border border-gh-border bg-gh-subtle/90 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm">
        {/* Terminal Header */}
        <div className="bg-gh-muted/90 px-4 py-3 border-b border-gh-border flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex space-x-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <span className="text-gh-textMuted text-xs pl-2 flex items-center space-x-1">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>viktor@workstation: ~/portfolio-viktor (main)</span>
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleCopy('git clone https://github.com/ViktorGabriel/Portfolio-Viktor.git')}
              className="p-1 rounded text-gh-textMuted hover:text-gh-text transition"
              title="Copiar comando clone"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-gh-success" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="flex border-b border-gh-border bg-gh-canvas/40 px-3 pt-2 gap-2 text-xs">
          <button
            onClick={() => setActiveTab('status')}
            className={`px-3 py-1.5 rounded-t-md transition border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'status'
                ? 'border-gh-accent text-white font-semibold bg-gh-muted/40'
                : 'border-transparent text-gh-textMuted hover:text-gh-text'
            }`}
          >
            <Play className="w-3 h-3 text-gh-accent" />
            <span>system-status.sh</span>
          </button>
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-t-md transition border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'architecture'
                ? 'border-gh-accent text-white font-semibold bg-gh-muted/40'
                : 'border-transparent text-gh-textMuted hover:text-gh-text'
            }`}
          >
            <TerminalIcon className="w-3 h-3 text-purple-400" />
            <span>architecture-overview.ts</span>
          </button>
          <button
            onClick={() => setActiveTab('stack')}
            className={`px-3 py-1.5 rounded-t-md transition border-b-2 flex items-center space-x-1.5 ${
              activeTab === 'stack'
                ? 'border-gh-accent text-white font-semibold bg-gh-muted/40'
                : 'border-transparent text-gh-textMuted hover:text-gh-text'
            }`}
          >
            <RotateCcw className="w-3 h-3 text-emerald-400" />
            <span>tech-stack.json</span>
          </button>
        </div>

        {/* Terminal Body */}
        <div className="p-5 text-gh-text space-y-3 leading-relaxed min-h-[220px]">
          {activeTab === 'status' && (
            <div className="space-y-2">
              <p className="text-gh-textMuted">
                $ <span className="text-emerald-400">./check-portfolio-health.sh</span>
              </p>
              <p className="text-blue-400">==&gt; Inicializando verificação de conformidade de engenharia...</p>
              <p className="text-gh-text">
                [OK] BFF Fastify ativo com cache resiliente (TTL: 1800s)
              </p>
              <p className="text-gh-text">
                [OK] Validação de contratos de dados via Zod: 100% tipado
              </p>
              <p className="text-gh-text">
                [OK] Regras de negócio desacopladas sob Clean Architecture & SOLID
              </p>
              <p className="text-gh-text">
                [OK] Proteção contra XSS ativa para renderização de dados do GitHub
              </p>
              <p className="text-emerald-400 font-bold pt-2">
                ✔ Todos os subsistemas operando em alta performance e sem bugs!
              </p>
            </div>
          )}

          {activeTab === 'architecture' && (
            <div className="space-y-1.5 text-xs">
              <p className="text-gh-textMuted">
                $ <span className="text-emerald-400">cat docs/clean-architecture.mermaid</span>
              </p>
              <pre className="text-teal-300 font-mono text-xs overflow-x-auto p-2 bg-gh-canvas/60 rounded border border-gh-border/50">
{`Domain (Entities & Interfaces)
   ▲
   │ (Dependency Inversion)
Application (Use Cases: GetPortfolioOverview, EnrichShowcase)
   ▲
   │
Infrastructure (Fastify HTTP, GitHubApiClient, InMemoryCache)`}
              </pre>
              <p className="text-gh-textMuted pt-2">
                &quot;Software architecture is the art of drawing lines that divide things.&quot; — Robert C. Martin
              </p>
            </div>
          )}

          {activeTab === 'stack' && (
            <div className="space-y-1.5">
              <p className="text-gh-textMuted">
                $ <span className="text-emerald-400">jq .tech_stack ./package.json</span>
              </p>
              <pre className="text-yellow-300 font-mono text-xs overflow-x-auto">
{`{
  "runtime": "Node.js (v24)",
  "language": "TypeScript 5.7 Strict",
  "backend_bff": "Fastify + Zod Contracts",
  "frontend": "React 19 + Vite + Tailwind CSS",
  "animations": "Framer Motion (Scroll-Driven)",
  "monorepo": "NPM Workspaces"
}`}
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
