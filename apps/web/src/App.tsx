import React, { useState } from 'react';
import { NavbarFuturistic } from './components/ui/NavbarFuturistic';
import { NeonBackground } from './components/effects/NeonBackground';
import { HeroFuturistic } from './components/landing/HeroFuturistic';
import { SystemStatusPanel } from './components/dashboard/SystemStatusPanel';
import { ArchitectureVisualizer } from './components/architecture/ArchitectureVisualizer';
import { TerminalIntro } from './components/landing/TerminalIntro';
import { FlagshipProject } from './components/showcase/FlagshipProject';
import { CoreSystemCard } from './components/showcase/CoreSystemCard';
import { SystemDirectory } from './components/showcase/SystemDirectory';
import { ProjectModal } from './components/showcase/ProjectModal';
import { TechnicalDossier } from './components/about/TechnicalDossier';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Project } from '@portfolio/shared';
import { Radio, Github } from 'lucide-react';
import { useI18n } from './locales/i18n';
export const App: React.FC = () => {
  const { data } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { t } = useI18n();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <div className="relative min-h-screen bg-[#050505] text-ink-hi flex flex-col overflow-x-hidden font-body selection:bg-[#00FFFF33] selection:text-white">
      {/* Animated canvas background */}
      <NeonBackground />

      {/* Scanlines overlay across entire page */}
      <div className="fixed inset-0 scanlines pointer-events-none z-[1]" />

      {/* Futuristic Navbar */}
      <div className="relative z-50">
        <NavbarFuturistic isCached={data.isCached} onNavigate={scrollTo} />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <div id="hero">
        <HeroFuturistic
          profile={data.profile}
          onExploreProjects={() => scrollTo('showcase')}
          onExploreArchitecture={() => scrollTo('architecture')}
          onOpenTerminal={() => scrollTo('terminal')}
        />
      </div>

      {/* ── MAIN CONTENT ─────────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 space-y-20 pb-24">

        {/* Live System Status KPIs */}
        <SystemStatusPanel isCached={data.isCached} totalProjects={data.pinnedProjects.length} />

        {/* ── ABOUT: Technical Dossier ─────────────────────────── */}
        <TechnicalDossier
          avatarUrl={data.profile.avatarUrl}
          name={data.profile.name}
        />

        {/* Architecture Visualizer */}
        <div id="architecture">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-px h-6 bg-[#FF00FF]" />
            <h2 className="font-display text-xs tracking-[0.4em] text-[#FF00FF] uppercase">
              {t('app.archTitle')}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#FF00FF22] to-transparent" />
          </div>
          <ArchitectureVisualizer />
        </div>

        {/* CLI Terminal */}
        <div id="terminal">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-px h-6 bg-[#FFD700]" />
            <h2 className="font-display text-xs tracking-[0.4em] text-[#FFD700] uppercase">
              {t('app.cliTitle')}
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#FFD70022] to-transparent" />
          </div>
          <TerminalIntro />
        </div>

        {/* ── BLUEPRINTS & PROJECTS ───────────────────────────────── */}
        <section id="showcase" className="space-y-10">
          
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center space-x-3">
              <div className="w-px h-6 bg-[#00FFFF]" />
              <h2 className="font-display text-xs tracking-[0.4em] text-[#00FFFF] uppercase">
                {t('app.blueprintsTitle')}
              </h2>
              <div className="flex-1 h-px bg-gradient-to-r from-[#00FFFF22] to-transparent" />
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink-hi tracking-tight mt-2">
              {t('app.blueprintsSubtitle')}
            </h3>
            <p className="font-body text-sm text-ink-mid max-w-2xl leading-relaxed">
              {t('app.blueprintsDesc')}
            </p>
          </div>

          {/* Tier 1: Flagship Project */}
          {data.allProjects.find(p => p.name === 'Fila-Inteligente-Para-Cozinha') && (
            <div className="mb-10">
              <FlagshipProject 
                project={data.allProjects.find(p => p.name === 'Fila-Inteligente-Para-Cozinha')!} 
                onOpenDetails={setSelectedProject} 
              />
            </div>
          )}

          {/* Tier 2: Core Systems */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            {data.allProjects.filter(p => ['Projeto-Carrinho-Shoppe-Backend', 'Controle-de-Fluxo'].includes(p.name)).map(project => (
              <CoreSystemCard 
                key={project.id} 
                project={project} 
                onOpenDetails={setSelectedProject} 
              />
            ))}
          </div>

          {/* Tier 3: System Directory */}
          <SystemDirectory 
            projects={data.allProjects.filter(p => !['Fila-Inteligente-Para-Cozinha', 'Projeto-Carrinho-Shoppe-Backend', 'Controle-de-Fluxo'].includes(p.name))} 
            onOpenDetails={setSelectedProject} 
          />

        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer id="contact" className="relative z-10 border-t border-white/[0.06] bg-[#050505]/90 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-sm glass font-mono text-[11px] tracking-widest text-[#00FFFF]">
            <Radio className="w-3.5 h-3.5 animate-pulse-slow" />
            <span>{t('app.footerChannel')}</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-ink-hi tracking-tight">
            {t('app.footerTitle')}
          </h2>

          <p className="font-body text-sm text-ink-mid max-w-lg mx-auto leading-relaxed">
            {t('app.footerDesc')}
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            {/* WhatsApp */}
            <a
              href="https://wa.me/5531993952463"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-sm glass font-mono font-bold text-xs tracking-wider hover:border-[#25d36644] hover:text-[#25d366] transition"
            >
              {/* WhatsApp SVG icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>(31) 9 9395-2463</span>
            </a>

            {/* Gmail */}
            <a
              href="mailto:gabryoliver22@gmail.com"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-sm glass font-mono font-bold text-xs tracking-wider hover:border-[#ea433544] hover:text-[#ea4335] transition"
            >
              {/* Gmail SVG icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.642l8.073-6.149C21.69 2.28 24 3.434 24 5.457z"/>
              </svg>
              <span>gabryoliver22@gmail.com</span>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/ViktorGabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-sm glass font-mono font-bold text-xs tracking-wider hover:border-[#00FFFF44] transition"
            >
              <Github className="w-4 h-4" />
              <span>github.com/ViktorGabriel</span>
            </a>
          </div>

          <p className="font-mono text-[11px] text-ink-lo pt-6 border-t border-white/[0.04]">
            {t('app.footerCopyright', { year: new Date().getFullYear().toString() })}
          </p>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};