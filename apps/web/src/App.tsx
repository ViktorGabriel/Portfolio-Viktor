import React, { useState } from 'react';
import { NavbarEngineering } from './components/ui/NavbarEngineering';
import { HeroEngineering } from './components/landing/HeroEngineering';
import { TelemetryHUD } from './components/dashboard/TelemetryHUD';
import { ArchitectureVisualizer } from './components/architecture/ArchitectureVisualizer';
import { TerminalIntro } from './components/landing/TerminalIntro';
import { EngineerProfileCard } from './components/dashboard/EngineerProfileCard';
import { ProjectBlueprintCard } from './components/showcase/ProjectBlueprintCard';
import { ProjectModal } from './components/showcase/ProjectModal';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Project } from '@portfolio/shared';
import { Cpu, Filter, Github, Radio } from 'lucide-react';

export const App: React.FC = () => {
  const { data } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredProjects = data.pinnedProjects.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#07090e] text-[#f8fafc] flex flex-col selection:bg-teal-500/30 selection:text-white font-sans">
      {/* Top Floating Navbar */}
      <NavbarEngineering
        isCached={data.isCached}
        onNavigate={scrollToSection}
      />

      {/* Hero Section */}
      <div id="hero">
        <HeroEngineering
          profile={data.profile}
          onExploreProjects={() => scrollToSection('showcase')}
          onExploreArchitecture={() => scrollToSection('architecture')}
          onOpenTerminal={() => scrollToSection('terminal')}
        />
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-14">
        {/* Telemetria em Tempo Real & KPIs */}
        <div id="telemetry">
          <TelemetryHUD
            isCached={data.isCached}
            totalProjects={data.pinnedProjects.length}
          />
        </div>

        {/* Visualizador de Arquitetura Interativo */}
        <div id="architecture">
          <ArchitectureVisualizer />
        </div>

        {/* Terminal Interativo CLI */}
        <div id="terminal">
          <TerminalIntro />
        </div>

        {/* Revised Section: Blueprints de Engenharia & Projetos */}
        <section id="showcase" className="space-y-8 pt-6 relative">
          {/* Faint Engineering Schematic Lines in Negative Space */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] overflow-hidden -z-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="schematicGrid" width="60" height="60" patternUnits="userSpaceOnUse">
                  <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#38bdf8" strokeWidth="0.8" />
                  <circle cx="60" cy="60" r="1.5" fill="#38bdf8" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#schematicGrid)" />
            </svg>
          </div>

          {/* Revised Section Header (Top) */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#1e293b] pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Cpu className="w-5 h-5 text-teal-400" />
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Blueprints de Engenharia &amp; Projetos
                </h2>
              </div>
              <p className="text-sm text-slate-400 font-sans max-w-2xl leading-relaxed">
                Microsserviços de alto throughput, orquestração em tempo real e arquiteturas limpas desacopladas. Especificações técnicas prontas para inspeção de código e modelagem.
              </p>
            </div>

            {/* Top-Right Tactile Filters (Physical buttons with #008080 active state) */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Filter className="w-4 h-4 text-slate-400" />
              <div className="flex items-center space-x-1.5 p-1 rounded-xl bg-[#0a0f1d] border border-[#1e293b] shadow-inner font-sans text-xs font-semibold">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    selectedCategory === 'all'
                      ? 'bg-[#008080] text-white border border-teal-300/40 shadow-[0_2px_10px_rgba(0,128,128,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedCategory('backend')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    selectedCategory === 'backend'
                      ? 'bg-[#008080] text-white border border-teal-300/40 shadow-[0_2px_10px_rgba(0,128,128,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Backend
                </button>
                <button
                  onClick={() => setSelectedCategory('fullstack')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    selectedCategory === 'fullstack'
                      ? 'bg-[#008080] text-white border border-teal-300/40 shadow-[0_2px_10px_rgba(0,128,128,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  Fullstack
                </button>
                <button
                  onClick={() => setSelectedCategory('api')}
                  className={`px-3.5 py-1.5 rounded-lg transition-all duration-200 ${
                    selectedCategory === 'api'
                      ? 'bg-[#008080] text-white border border-teal-300/40 shadow-[0_2px_10px_rgba(0,128,128,0.5)]'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
                  }`}
                >
                  APIs
                </button>
              </div>
            </div>
          </div>

          {/* Grid Principal: Wider Engineer Dossier + 2-Column Dynamic Blueprints */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Refactored Engineer Profile Card (Wider: 5 cols on lg/xl) */}
            <div className="lg:col-span-5 w-full">
              <EngineerProfileCard
                profile={data.profile}
                onContactClick={() => scrollToSection('contact')}
              />
            </div>

            {/* Refactored Project Cards (Right: 7 cols on lg/xl) */}
            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project, index) => {
                // First card ('Fila Inteligente Para Cozinha') is Featured
                const isKDS = project.name.toLowerCase().includes('fila') || index === 0;
                return (
                  <ProjectBlueprintCard
                    key={project.id}
                    project={project}
                    onOpenDetails={(p) => setSelectedProject(p)}
                    isFeatured={isKDS}
                    perfMetrics={isKDS ? '1,000 req/sec • SLA < 50ms' : undefined}
                    hasSpinner={isKDS}
                  />
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Command Center */}
      <footer id="contact" className="border-t border-[#1e293b] bg-[#050810] mt-24 py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#0c121d] border border-[#1e293b] text-xs font-mono text-teal-400 shadow-md">
            <Radio className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
            <span>COMMUNICATION CHANNEL OPEN</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight font-serif">
            Pronto para Construir Soluções de Alto Impacto?
          </h2>

          <p className="text-sm text-slate-400 max-w-lg mx-auto leading-relaxed font-sans">
            Disponível para posições de engenharia de software, arquitetura de backend e projetos desafiadores com foco em performance e robustez.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4 font-sans">
            <a
              href="https://github.com/ViktorGabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl bg-[#0c121d] hover:bg-[#162030] border border-[#1e293b] text-white text-xs font-bold transition flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Oficial /ViktorGabriel</span>
            </a>
          </div>

          <p className="text-xs font-mono text-slate-500 pt-8 border-t border-[#1e293b]/40">
            © {new Date().getFullYear()} Viktor Gabriel • Arquitetura de Sistemas, Clean Architecture & SOLID.
          </p>
        </div>
      </footer>

      {/* Modal de Detalhes Técnicos */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};