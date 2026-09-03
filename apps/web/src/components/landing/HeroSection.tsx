import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Code2, Layers, Cpu, CheckCircle2 } from 'lucide-react';
import { Profile } from '@portfolio/shared';

interface HeroSectionProps {
  profile: Profile;
  onExplore: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onExplore }) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gh-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[300px] h-[200px] bg-gh-success/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gh-muted/80 border border-gh-border text-xs font-mono text-gh-accent mb-6 shadow-sm"
        >
          <span className="flex h-2 w-2 rounded-full bg-gh-success animate-pulse" />
          <span>Segundo Perfil do GitHub • Edição Portfólio Interativo</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6"
        >
          Engenharia de Software,{' '}
          <span className="bg-gradient-to-r from-gh-accent via-blue-400 to-teal-300 bg-clip-text text-transparent">
            Clean Architecture
          </span>{' '}
          & Resiliência.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-gh-textMuted max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Olá, sou <span className="text-white font-semibold">{profile.name}</span>. Este espaço expande meu GitHub tradicional com mockups de projetos, arquiteturas detalhadas, micro-serviços e princípios SOLID aplicados na prática.
        </motion.p>

        {/* Highlight badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gh-subtle border border-gh-border text-xs font-medium text-gh-text">
            <Layers className="w-4 h-4 text-gh-accent" />
            <span>Clean Architecture</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gh-subtle border border-gh-border text-xs font-medium text-gh-text">
            <CheckCircle2 className="w-4 h-4 text-gh-success" />
            <span>SOLID Principles</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gh-subtle border border-gh-border text-xs font-medium text-gh-text">
            <Cpu className="w-4 h-4 text-purple-400" />
            <span>Node.js & Fastify BFF</span>
          </div>
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gh-subtle border border-gh-border text-xs font-medium text-gh-text">
            <Code2 className="w-4 h-4 text-yellow-400" />
            <span>TypeScript Estrito</span>
          </div>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onExplore}
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gh-success hover:bg-emerald-600 text-white font-semibold text-sm transition shadow-lg shadow-gh-success/20 flex items-center justify-center space-x-2 group"
          >
            <span>Explorar Projetos & Mockups</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
          <a
            href="https://github.com/ViktorGabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-lg bg-gh-muted hover:bg-gh-border border border-gh-border text-gh-text font-semibold text-sm transition flex items-center justify-center space-x-2"
          >
            <span>Ver no GitHub</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
