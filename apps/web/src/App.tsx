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
    <div className="min-h-screen bg-cyber-bg text-cyber-text flex flex-col selection:bg-cyber-cyan/30 selection:text-white font-sans">
      {/* Top Floating Navbar */}
      <NavbarEngineering
        isCached={data.isCached}
        onNavigate={scrollToSection}
      />

      {/* Hero Section: Master Software Engineer Headline */}
      <div id="hero">
        <HeroEngineering
          profile={data.profile}
          onExploreProjects={() => scrollToSection('showcase')}
          onExploreArchitecture={() => scrollToSection('architecture')}
          onOpenTerminal={() => scrollToSection('terminal')}
        />
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-12">
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

        {/* Showcase de Projetos em Bento Grid */}
        <section id="showcase" className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cyber-border/70 pb-4">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <Cpu className="w-4 h-4 text-cyber-cyan" />
                <h2 className="text-xl font-bold text-white tracking-tight">
                  Blueprints de Engenharia & Projetos
                </h2>
              </div>
              <p className="text-xs text-cyber-muted font-mono">
                Sistemas distribuídos, microsserviços e APIs com Clean Architecture e SOLID aplicados.
              </p>
            </div>

            {/* Filtros de Categoria */}
            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-cyber-dim" />
              <div className="flex rounded-xl bg-cyber-surface border border-cyber-border p-1 text-xs font-mono">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedCategory === 'all'
                      ? 'bg-cyber-cyan/20 text-cyber-cyan font-bold border border-cyber-cyan/30'
                      : 'text-cyber-muted hover:text-white'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setSelectedCategory('backend')}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedCategory === 'backend'
                      ? 'bg-cyber-cyan/20 text-cyber-cyan font-bold border border-cyber-cyan/30'
                      : 'text-cyber-muted hover:text-white'
                  }`}
                >
                  Backend
                </button>
                <button
                  onClick={() => setSelectedCategory('fullstack')}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedCategory === 'fullstack'
                      ? 'bg-cyber-cyan/20 text-cyber-cyan font-bold border border-cyber-cyan/30'
                      : 'text-cyber-muted hover:text-white'
                  }`}
                >
                  Fullstack
                </button>
                <button
                  onClick={() => setSelectedCategory('api')}
                  className={`px-3 py-1 rounded-lg transition ${
                    selectedCategory === 'api'
                      ? 'bg-cyber-cyan/20 text-cyber-cyan font-bold border border-cyber-cyan/30'
                      : 'text-cyber-muted hover:text-white'
                  }`}
                >
                  APIs
                </button>
              </div>
            </div>
          </div>

          {/* Grid Principal: Sidebar do Engenheiro + Cards de Projetos */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="w-full">
              <EngineerProfileCard
                profile={data.profile}
                onContactClick={() => scrollToSection('contact')}
              />
            </div>

            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <ProjectBlueprintCard
                  key={project.id}
                  project={project}
                  onOpenDetails={(p) => setSelectedProject(p)}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer Command Center */}
      <footer id="contact" className="border-t border-cyber-border bg-cyber-surface/90 mt-24 py-14 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyber-card border border-cyber-border text-xs font-mono text-cyber-cyan shadow-glow-cyan">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>COMMUNICATION CHANNEL OPEN</span>
          </div>

          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Pronto para Construir Soluções de Alto Impacto?
          </h2>

          <p className="text-sm text-cyber-muted max-w-lg mx-auto leading-relaxed">
            Disponível para posições de engenharia de software, arquitetura de backend e projetos desafiadores com foco em performance e robustez.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <a
              href="https://github.com/ViktorGabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-xl glass-panel hover:border-cyber-cyan text-white text-xs font-mono font-bold transition flex items-center space-x-2"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Oficial /ViktorGabriel</span>
            </a>
          </div>

          <p className="text-xs font-mono text-cyber-dim pt-8 border-t border-cyber-border/40">
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