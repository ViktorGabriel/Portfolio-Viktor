import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { NavbarFuturistic } from './components/ui/NavbarFuturistic';
import { NeonBackground } from './components/effects/NeonBackground';
import { HeroFuturistic } from './components/landing/HeroFuturistic';
import { SystemStatusPanel } from './components/dashboard/SystemStatusPanel';
import { ArchitectureVisualizer } from './components/architecture/ArchitectureVisualizer';
import { TerminalIntro } from './components/landing/TerminalIntro';
import { BlueprintPanel } from './components/showcase/BlueprintPanel';
import { ProjectModal } from './components/showcase/ProjectModal';
import { usePortfolioData } from './hooks/usePortfolioData';
import { Project } from '@portfolio/shared';
import { Filter, Github, Radio, MapPin, Building, Mail } from 'lucide-react';

const CATEGORIES = [
  { id: 'all',       label: 'TODOS' },
  { id: 'backend',   label: 'BACKEND' },
  { id: 'fullstack', label: 'FULLSTACK' },
  { id: 'api',       label: 'APIS' },
];

export const App: React.FC = () => {
  const { data } = usePortfolioData();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const filtered = data.pinnedProjects.filter(
    (p) => selectedCategory === 'all' || p.category === selectedCategory
  );

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

        {/* Architecture Visualizer */}
        <div id="architecture">
          <div className="flex items-center space-x-3 mb-5">
            <div className="w-px h-6 bg-[#FF00FF]" />
            <h2 className="font-display text-xs tracking-[0.4em] text-[#FF00FF] uppercase">
              // SYSTEM ARCHITECTURE INSPECTOR
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
              // CLI CONSOLE INTERFACE
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-[#FFD70022] to-transparent" />
          </div>
          <TerminalIntro />
        </div>

        {/* ── BLUEPRINTS GRID ───────────────────────────────────── */}
        <section id="showcase" className="space-y-8">
          {/* Section header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-px h-6 bg-[#00FFFF]" />
                <h2 className="font-display text-xs tracking-[0.4em] text-[#00FFFF] uppercase">
                  // ENGINEERING BLUEPRINTS
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#00FFFF22] to-transparent" />
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink-hi tracking-tight">
                Blueprints de Engenharia &amp; Projetos
              </h3>
              <p className="font-body text-sm text-ink-mid max-w-2xl leading-relaxed">
                Microsserviços de alto throughput, orquestração em tempo real e arquiteturas desacopladas.
                Passe o cursor em qualquer card para inspecionar o diagrama arquitetural interno.
              </p>
            </div>

            {/* Category filter — tactile buttons with teal active */}
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-ink-lo" />
              <div className="flex items-center gap-1 p-1 rounded-sm glass">
                {CATEGORIES.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedCategory(id)}
                    className={`px-3.5 py-1.5 rounded-sm font-mono text-[11px] font-bold tracking-widest transition-all duration-200 ${
                      selectedCategory === id
                        ? 'text-black'
                        : 'text-ink-lo hover:text-ink-mid'
                    }`}
                    style={
                      selectedCategory === id
                        ? { background: '#00FFFF', boxShadow: '0 0 14px rgba(0,255,255,0.5)' }
                        : {}
                    }
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Asymmetrical Grid Layout ─────────────────────────── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Profile Dossier sidebar */}
            <div className="md:col-span-4 glass rounded-sm p-6 space-y-6 corner-tick"
              style={{ borderColor: 'rgba(255,0,255,0.2)' }}>

              {/* Avatar + identity */}
              <div className="flex items-start space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded p-0.5"
                    style={{ background: 'linear-gradient(135deg, #00FFFF, #FF00FF)' }}>
                    <img
                      src={data.profile.avatarUrl}
                      alt={data.profile.name}
                      className="w-full h-full object-cover rounded bg-[#050505]"
                    />
                  </div>
                  <span className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center rounded-sm bg-[#050505] border border-[#FF00FF44]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] blink" />
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[10px] tracking-widest text-[#FF00FF] uppercase">
                    System Engineer Dossier
                  </p>
                  <h3 className="font-display text-xl font-bold text-ink-hi">{data.profile.name}</h3>
                  <p className="font-mono text-xs text-ink-lo">@{data.profile.username}</p>
                </div>
              </div>

              {/* Bio */}
              <p className="font-body text-xs text-ink-mid leading-relaxed border-t border-white/[0.05] pt-4">
                {data.profile.bio}
              </p>

              {/* Location / company */}
              <div className="flex flex-wrap gap-3 text-xs font-mono text-ink-lo">
                {data.profile.location && (
                  <span className="flex items-center space-x-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#00FFFF]" />
                    <span>{data.profile.location}</span>
                  </span>
                )}
                {data.profile.company && (
                  <span className="flex items-center space-x-1.5">
                    <Building className="w-3.5 h-3.5 text-[#FF00FF]" />
                    <span>{data.profile.company}</span>
                  </span>
                )}
              </div>

              {/* Skills inventory - color-coded grid */}
              <div className="space-y-3 border-t border-white/[0.05] pt-4">
                <p className="font-mono text-[10px] tracking-widest text-[#FFD700] uppercase">
                  Skills Inventory
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {data.profile.skills.map((skill, i) => {
                    const colors = ['#00FFFF', '#FF00FF', '#FFD700', '#00FFFF', '#FF00FF', '#FFD700', '#00FFFF', '#FF00FF'];
                    const c = colors[i % colors.length];
                    return (
                      <div key={skill} className="flex items-center space-x-2 px-2.5 py-2 rounded-sm glass group hover:scale-[1.02] transition-transform cursor-default"
                        style={{ borderColor: `${c}25` }}>
                        <span className="w-1 h-4 rounded-full flex-shrink-0" style={{ background: c }} />
                        <span className="font-mono text-[10px] font-bold text-ink-mid group-hover:text-ink-hi transition-colors truncate">
                          {skill}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact CTA */}
              <button
                onClick={() => scrollTo('contact')}
                className="w-full flex items-center justify-center space-x-2.5 py-3 rounded-sm font-mono font-bold text-xs tracking-widest transition-all duration-200"
                style={{
                  background: 'linear-gradient(90deg, rgba(0,255,255,0.12), rgba(255,0,255,0.12))',
                  border: '1px solid rgba(0,255,255,0.25)',
                  color: '#00FFFF',
                }}
                onMouseEnter={e => { (e.target as HTMLElement).style.boxShadow = '0 0 20px rgba(0,255,255,0.3)'; }}
                onMouseLeave={e => { (e.target as HTMLElement).style.boxShadow = 'none'; }}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>INICIAR CONTATO / PROPOSTA</span>
              </button>
            </div>

            {/* Asymmetric projects grid — varies sizes */}
            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filtered.map((project, index) => {
                const isFeatured = project.name.toLowerCase().includes('fila') || index === 0;
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                    className={isFeatured ? 'sm:col-span-2' : ''}
                  >
                    <BlueprintPanel
                      project={project}
                      onOpenDetails={setSelectedProject}
                      variant={isFeatured ? 'featured' : 'standard'}
                      perfMetric={isFeatured ? '1,000 req/sec • SLA < 50ms' : undefined}
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ────────────────────────────────────────────────── */}
      <footer id="contact" className="relative z-10 border-t border-white/[0.06] bg-[#050505]/90 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-sm glass font-mono text-[11px] tracking-widest text-[#00FFFF]">
            <Radio className="w-3.5 h-3.5 animate-pulse-slow" />
            <span>COMMUNICATION CHANNEL OPEN</span>
          </div>

          <h2 className="font-display text-3xl font-bold text-ink-hi tracking-tight">
            Pronto para Construir Soluções de Alto Impacto?
          </h2>

          <p className="font-body text-sm text-ink-mid max-w-lg mx-auto leading-relaxed">
            Disponível para posições de engenharia de software, arquitetura de backend e projetos com foco em alta performance.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
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
            © {new Date().getFullYear()} Viktor Gabriel • Clean Architecture • SOLID • Distributed Systems
          </p>
        </div>
      </footer>

      {/* Project Detail Modal */}
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </div>
  );
};