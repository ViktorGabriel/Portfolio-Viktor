import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Cpu, Layers, Terminal, ShieldCheck, Zap } from 'lucide-react';
import { Profile } from '@portfolio/shared';

interface HeroEngineeringProps {
  profile: Profile;
  onExploreProjects: () => void;
  onExploreArchitecture: () => void;
  onOpenTerminal: () => void;
}

export const HeroEngineering: React.FC<HeroEngineeringProps> = ({
  profile,
  onExploreProjects,
  onExploreArchitecture,
  onOpenTerminal
}) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Dynamic Cyber Light Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-cyber-cyan/15 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[300px] bg-cyber-purple/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[350px] h-[250px] bg-cyber-emerald/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyber-border text-xs font-mono text-cyber-cyan shadow-glow-cyan"
        >
          <span className="flex h-2 w-2 rounded-full bg-cyber-emerald animate-pulse" />
          <span className="text-white font-semibold">{profile.name}</span>
          <span className="text-cyber-dim">•</span>
          <span>Software Engineer & Backend Architect</span>
        </motion.div>

        {/* Master Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight"
        >
          Construindo Sistemas Escaláveis,{' '}
          <span className="bg-gradient-to-r from-cyber-cyan via-sky-400 to-cyber-purple bg-clip-text text-transparent">
            Clean Architecture
          </span>{' '}
          & Microsserviços Resilientes.
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-cyber-muted max-w-3xl mx-auto leading-relaxed"
        >
          Portfólio de engenharia de <strong className="text-white font-semibold">{profile.name}</strong>. Backends de alta performance com <strong className="text-white font-semibold">Node.js, TypeScript e Fastify</strong>, guiados pelos princípios <strong className="text-white font-semibold">SOLID</strong> e tolerância a falhas.
        </motion.p>

        {/* Core Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3 pt-2"
        >
          <div className="glass-panel px-3.5 py-1.5 rounded-lg text-xs font-mono text-white flex items-center space-x-2">
            <Layers className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>Clean Architecture</span>
          </div>
          <div className="glass-panel px-3.5 py-1.5 rounded-lg text-xs font-mono text-white flex items-center space-x-2">
            <ShieldCheck className="w-3.5 h-3.5 text-cyber-purple" />
            <span>SOLID Strict Patterns</span>
          </div>
          <div className="glass-panel px-3.5 py-1.5 rounded-lg text-xs font-mono text-white flex items-center space-x-2">
            <Zap className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>Sub-2ms Multi-Tier Cache</span>
          </div>
          <div className="glass-panel px-3.5 py-1.5 rounded-lg text-xs font-mono text-white flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-cyber-amber" />
            <span>Event-Driven & WebSockets</span>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6"
        >
          <button
            onClick={onExploreProjects}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-sm transition shadow-glow-cyan flex items-center justify-center space-x-2 group"
          >
            <span>Explorar Blueprints de Projetos</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>

          <button
            onClick={onExploreArchitecture}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl glass-panel hover:border-cyber-cyan text-white font-semibold text-sm transition flex items-center justify-center space-x-2"
          >
            <Layers className="w-4 h-4 text-cyber-cyan" />
            <span>Ver Arquitetura de Sistemas</span>
          </button>

          <button
            onClick={onOpenTerminal}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel hover:border-cyber-purple text-cyber-muted hover:text-white font-mono text-sm transition flex items-center justify-center space-x-2"
          >
            <Terminal className="w-4 h-4 text-cyber-purple" />
            <span>CLI Console</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
};