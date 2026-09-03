import React, { useState } from 'react';
import { Project } from '@portfolio/shared';
import { Terminal, Github, ShieldCheck } from 'lucide-react';

interface SystemDirectoryProps {
  projects?: Project[];
  onOpenDetails?: (p: Project) => void;
}

const TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'api', label: 'BACKEND APIs' },
  { id: 'utilities', label: 'SYSTEM UTILITIES' }
];

const DIRECTORY_DATA = [
  {
    id: 'sys-001',
    category: 'api',
    name: 'App Previsão do Tempo',
    desc: 'Consumo de APIs climáticas, tratamento de dados assíncronos e cache local de requisições.',
    stack: ['Node.js', 'TypeScript', 'API REST'],
    link: 'https://github.com/ViktorGabriel/Weather-Forecast'
  },
  {
    id: 'sys-002',
    category: 'utilities',
    name: 'Controle de Fluxo',
    desc: 'Algoritmos de controle de concorrência, filas e orquestração de rotinas em Node.js/Python.',
    stack: ['Node.js', 'Python', 'Redis'],
    link: 'https://github.com/ViktorGabriel/Controle-de-Fluxo'
  },
  {
    id: 'sys-003',
    category: 'utilities',
    name: 'QR Code & Password Generator',
    desc: 'Utilitário de segurança criptográfica, entropia de senhas e geração vetorial de QR codes.',
    stack: ['TypeScript', 'Cryptography', 'React'],
    link: 'https://github.com/ViktorGabriel/Gerador-QRCode'
  },
  {
    id: 'sys-004',
    category: 'api',
    name: 'Dashboard Financeiro',
    desc: 'Painel analítico fullstack de finanças e ativos com modelagem relacional de transações.',
    stack: ['React', 'PostgreSQL', 'Prisma'],
    link: 'https://github.com/ViktorGabriel/Dashboard-Financeiro'
  },
  {
    id: 'sys-005',
    category: 'api',
    name: 'Projeto Kart NodeJs BackEnd',
    desc: 'Simulador de corrida e pontuação usando POO avançada, regras de negócio isoladas e TypeScript.',
    stack: ['Node.js', 'TypeScript', 'POO'],
    link: 'https://github.com/ViktorGabriel/Projeto-Kart-NodeJs-BackEnd'
  },
  {
    id: 'sys-006',
    category: 'api',
    name: 'API Champions League',
    desc: 'API REST para gestão e estatísticas esportivas com estruturação de rotas e validação de schema.',
    stack: ['Fastify', 'Zod', 'PostgreSQL'],
    link: 'https://github.com/ViktorGabriel/API-Champions-League'
  },
  {
    id: 'sys-007',
    category: 'api',
    name: 'Gerenciador de Podcasts',
    desc: 'Backend para streaming de metadados, feeds RSS e categorização de episódios em tempo real.',
    stack: ['Node.js', 'Docker', 'PostgreSQL'],
    link: 'https://github.com/ViktorGabriel/Gerenciador-de-podcasts'
  }
];

export const SystemDirectory: React.FC<SystemDirectoryProps> = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = DIRECTORY_DATA.filter(p => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <div className="w-full flex flex-col bg-[#050505] border border-zinc-800 rounded-sm">
      
      {/* ── Header & Tabs ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 p-4 gap-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-500" />
          <h4 className="font-mono text-xs font-bold text-zinc-300 tracking-widest uppercase">System Directory / Engineering Index</h4>
        </div>
        <div className="flex gap-1 p-1 bg-[#121212] border border-zinc-800 rounded-sm self-start sm:self-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 font-mono text-[9px] font-bold tracking-widest transition-colors ${
                activeTab === tab.id 
                  ? 'bg-zinc-800 text-zinc-100' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table / Log View ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-[10px] sm:text-xs">
          <thead className="text-zinc-500 border-b border-zinc-800/50 bg-[#080808]">
            <tr>
              <th className="px-4 py-3 font-normal tracking-widest whitespace-nowrap">ID / SYSTEM</th>
              <th className="px-4 py-3 font-normal tracking-widest">ARCHITECTURE & FOCUS</th>
              <th className="px-4 py-3 font-normal tracking-widest hidden md:table-cell">TECH STACK</th>
              <th className="px-4 py-3 font-normal tracking-widest text-right">LINK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {filtered.map(project => (
              <tr 
                key={project.id}
                className="group hover:bg-[#0a0a0a] transition-colors"
              >
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 tracking-widest">{project.id.toUpperCase()}</span>
                    <span className="text-zinc-200 font-bold group-hover:text-[#00FFFF] transition-colors">{project.name}</span>
                    <div className="flex items-center gap-1 mt-1">
                      <ShieldCheck className="w-3 h-3 text-teal-700" />
                      <span className="text-[8px] text-teal-700 tracking-widest">VERIFIED</span>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-2 max-w-sm">
                    <p className="text-zinc-300 font-medium">
                      &gt; {project.desc}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-4 align-top hidden md:table-cell">
                  <div className="flex flex-wrap gap-1.5 max-w-[220px]">
                    {project.stack.map(topic => (
                      <span key={topic} className="font-mono text-[11px] px-2 py-0.5 border border-zinc-800 bg-zinc-900/60 text-zinc-300">
                        {topic}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-right">
                  <div className="flex items-center justify-end gap-3">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors">
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-600">
                  NO SYSTEMS FOUND MATCHING FILTER
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};