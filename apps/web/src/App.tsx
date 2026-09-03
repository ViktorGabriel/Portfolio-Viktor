import React, { useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { HeroSection } from './components/landing/HeroSection';
import { TerminalIntro } from './components/landing/TerminalIntro';
import { ProfileSidebar } from './components/github-view/ProfileSidebar';
import { ContributionHeatmap } from './components/github-view/ContributionHeatmap';
import { ProjectCard } from './components/showcase/ProjectCard';
import { ProjectModal } from './components/showcase/ProjectModal';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Project } from '@portfolio/shared';
import { BookOpen, Sparkles, Filter, Mail, Layers, ShieldCheck } from 'lucide-react';

export const App: React.FC = () => {
  const { data } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'pinned' | 'all' | 'architecture'>('pinned');

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
    <div className="min-h-screen bg-gh-canvas text-gh-text flex flex-col selection:bg-gh-accent/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        isCached={data.isCached}
        onNavigate={scrollToSection}
      />

      {/* Hero Section (Landing Page de Impacto) */}
      <div id="hero">
        <HeroSection
          profile={data.profile}
          onExplore={() => scrollToSection('profile-view')}
        />
      </div>

      {/* Terminal Interativo */}
      <div id="terminal">
        <TerminalIntro />
      </div>

      {/* Seção Principal: Segundo Perfil do GitHub + Showcase */}
      <main id="profile-view" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Coluna Esquerda: Perfil Lateral Estilo GitHub */}
          <ProfileSidebar
            profile={data.profile}
            onContactClick={() => scrollToSection('contact')}
          />

          {/* Coluna Direita: Abas, Heatmap e Grid de Projetos */}
          <section className="flex-1 w-full space-y-6">
            {/* Navegação de Abas Estilo GitHub */}
            <div className="border-b border-gh-border flex items-center space-x-6 text-sm overflow-x-auto pb-px">
              <button
                onClick={() => setActiveTab('pinned')}
                className={`py-3 px-1 border-b-2 font-medium flex items-center space-x-2 transition ${
                  activeTab === 'pinned'
                    ? 'border-orange-500 text-gh-text'
                    : 'border-transparent text-gh-textMuted hover:text-gh-text'
                }`}
              >
                <BookOpen className="w-4 h-4 text-gh-textMuted" />
                <span>Visão Geral & Destaques</span>
                <span className="ml-1 px-1.5 py-0.5 rounded-full text-xs bg-gh-muted text-gh-textMuted">
                  {data.pinnedProjects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('architecture')}
                className={`py-3 px-1 border-b-2 font-medium flex items-center space-x-2 transition ${
                  activeTab === 'architecture'
                    ? 'border-orange-500 text-gh-text'
                    : 'border-transparent text-gh-textMuted hover:text-gh-text'
                }`}
              >
                <Layers className="w-4 h-4 text-purple-400" />
                <span>Padrões de Arquitetura</span>
              </button>
            </div>

            {/* Heatmap de Contribuições */}
            <ContributionHeatmap />

            {/* Showcase de Projetos com Mockups Ilustrativos */}
            <div id="showcase" className="space-y-4 pt-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-white flex items-center space-x-2">
                    <Sparkles className="w-4 h-4 text-gh-accent" />
                    <span>Repositórios em Destaque (Showcase Visual)</span>
                  </h2>
                  <p className="text-xs text-gh-textMuted">
                    Projetos acompanhados de mockups e especificações de Clean Architecture e SOLID.
                  </p>
                </div>

                {/* Filtro por Categoria */}
                <div className="flex items-center space-x-2">
                  <Filter className="w-3.5 h-3.5 text-gh-textMuted" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="bg-gh-subtle border border-gh-border text-gh-text text-xs rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-gh-accent font-mono"
                  >
                    <option value="all">Todas as Categorias</option>
                    <option value="backend">Backend APIs</option>
                    <option value="fullstack">Fullstack</option>
                    <option value="api">Minimal APIs</option>
                  </select>
                </div>
              </div>

              {/* Grid de Cards com Mockups */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onOpenDetails={(p) => setSelectedProject(p)}
                  />
                ))}
              </div>
            </div>

            {/* Painel Especial de Arquitetura */}
            {activeTab === 'architecture' && (
              <div className="rounded-xl border border-gh-border bg-gh-subtle p-6 space-y-4 mt-6 animate-in fade-in">
                <h3 className="text-base font-bold text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-gh-success" />
                  <span>Princípios Aplicados no Monorepo</span>
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-4 rounded-lg bg-gh-canvas border border-gh-border space-y-2">
                    <strong className="text-gh-accent block text-sm">Clean Architecture</strong>
                    <p className="text-gh-textMuted leading-relaxed">
                      Regras de negócio isoladas no core de Domain e Application, permitindo trocar o Fastify por qualquer outro framework sem encostar na lógica dos casos de uso.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-gh-canvas border border-gh-border space-y-2">
                    <strong className="text-gh-success block text-sm">Princípios SOLID</strong>
                    <p className="text-gh-textMuted leading-relaxed">
                      Inversão de dependência (DIP) entre gateways de dados e cache; interfaces segregadas (ISP) para resiliência offline contra rate limit da API do GitHub.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Seção Contato / Footer */}
      <footer id="contact" className="border-t border-gh-border bg-gh-header mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-gh-muted border border-gh-border text-xs text-gh-accent">
            <Mail className="w-3.5 h-3.5" />
            <span>Vamos construir algo extraordinário juntos?</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Disponível para Projetos e Oportunidades</h2>
          <p className="text-xs text-gh-textMuted max-w-md mx-auto">
            Focado em resolver problemas complexos com código limpo, arquitetura sustentável e alto desempenho.
          </p>
          <div className="pt-2 flex justify-center gap-4">
            <a
              href="https://github.com/ViktorGabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-md bg-gh-muted hover:bg-gh-border border border-gh-border text-xs font-semibold text-gh-text transition"
            >
              GitHub /ViktorGabriel
            </a>
          </div>
          <p className="text-[11px] text-gh-textMuted/60 pt-6">
            © {new Date().getFullYear()} Viktor Gabriel • Segundo Perfil do GitHub construído com React, Fastify, TypeScript, Tailwind CSS e Framer Motion.
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
