import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowDown, Layers, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { Profile } from '@portfolio/shared';

interface HeroEngineeringProps {
  profile: Profile;
  onExploreProjects: () => void;
  onExploreArchitecture: () => void;
  onOpenTerminal: () => void;
}

export const HeroEngineering: React.FC<HeroEngineeringProps> = ({
  onExploreProjects
}) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden bg-[#07090e]">
      {/* Intricate Multi-Layered Organic Mesh Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Subtle mesh wave gradients */}
        <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-gradient-to-b from-teal-500/10 via-purple-600/10 to-transparent rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-1/3 -left-[10%] w-[600px] h-[500px] bg-gradient-to-tr from-sky-600/10 via-indigo-600/10 to-transparent rounded-full blur-[160px] opacity-60" />
        <div className="absolute top-1/2 -right-[10%] w-[650px] h-[500px] bg-gradient-to-bl from-purple-600/10 via-teal-600/10 to-transparent rounded-full blur-[150px] opacity-60" />

        {/* Organic topological lines SVG overlay */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.07] stroke-cyan-400"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="meshGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#008080" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#38bdf8" />
            </linearGradient>
          </defs>
          <path
            d="M-200,300 C200,100 400,600 800,400 C1200,200 1400,500 1800,350"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="1.5"
          />
          <path
            d="M-150,380 C250,180 450,680 850,480 C1250,280 1450,580 1850,430"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="1.2"
          />
          <path
            d="M-100,460 C300,260 500,760 900,560 C1300,360 1500,660 1900,510"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="1"
          />
          <path
            d="M-50,540 C350,340 550,840 950,640 C1350,440 1550,740 1950,590"
            fill="none"
            stroke="url(#meshGrad)"
            strokeWidth="0.8"
          />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10 space-y-9">
        {/* Main Refactored Headline (Sophisticated Serif + Bold Gradients) */}
        <div className="space-y-2 select-none">
          {/* Line 1: High-end Serif Font (Playfair Display) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[0.02em] text-white"
          >
            CONSTRUINDO SISTEMAS ESCALÁVEIS
          </motion.div>

          {/* Line 2: Bold Sans-serif with Teal-to-Purple Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            <span>&amp; </span>
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
              CLEAN ARCHITECTURE
            </span>
          </motion.div>

          {/* Line 3: Bold Sans-serif with Deep Blue-to-Purple Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-sans text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white"
          >
            <span>&amp; </span>
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
              MICROSERVIÇOS RESILIENTES
            </span>
          </motion.div>
        </div>

        {/* Revised Sub-headline in Clean Inter Sans-serif */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="font-sans text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal"
        >
          Engenharia de software focada em arquiteturas desacopladas, alta vazão e tolerância a falhas. Backends robustos em Node.js e TypeScript com Clean Architecture, SOLID e caching multicamadas.
        </motion.p>

        {/* Refactored Skill Badges: Substantial, Layered with Depth and Clean Borders */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-4 pt-2"
        >
          {/* Badge 1: Clean Architecture */}
          <div className="group px-5 py-3 rounded-2xl bg-[#0c1322]/90 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 shadow-badge-layered flex items-center space-x-3">
            <div className="p-1.5 rounded-lg bg-teal-950/60 border border-teal-500/30 text-teal-300 group-hover:scale-110 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-left font-sans">
              <span className="block text-sm font-bold text-white tracking-wide">Clean Architecture</span>
              <span className="block text-[10px] font-mono text-teal-400/80">Domain Isolation</span>
            </div>
          </div>

          {/* Badge 2: SOLID Strict Patterns */}
          <div className="group px-5 py-3 rounded-2xl bg-[#0c1322]/90 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 shadow-badge-layered flex items-center space-x-3">
            <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-left font-sans">
              <span className="block text-sm font-bold text-white tracking-wide">SOLID Strict Patterns</span>
              <span className="block text-[10px] font-mono text-purple-400/80">DIP &amp; Single Responsibility</span>
            </div>
          </div>

          {/* Badge 3: Sub-2ms Multi-Tier Cache */}
          <div className="group px-5 py-3 rounded-2xl bg-[#0c1322]/90 border border-teal-500/30 hover:border-teal-400/60 transition-all duration-300 shadow-badge-layered flex items-center space-x-3">
            <div className="p-1.5 rounded-lg bg-teal-950/60 border border-teal-500/30 text-teal-300 group-hover:scale-110 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <div className="text-left font-sans">
              <span className="block text-sm font-bold text-white tracking-wide">Sub-2ms Multi-Tier Cache</span>
              <span className="block text-[10px] font-mono text-teal-400/80">In-Memory / Redis</span>
            </div>
          </div>

          {/* Badge 4: Event-Driven & WebSockets */}
          <div className="group px-5 py-3 rounded-2xl bg-[#0c1322]/90 border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 shadow-badge-layered flex items-center space-x-3">
            <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-300 group-hover:scale-110 transition-transform">
              <Cpu className="w-4 h-4" />
            </div>
            <div className="text-left font-sans">
              <span className="block text-sm font-bold text-white tracking-wide">Event-Driven &amp; WebSockets</span>
              <span className="block text-[10px] font-mono text-purple-400/80">Real-Time Streams</span>
            </div>
          </div>
        </motion.div>

        {/* Button Refactor (Bottom Center): Dark Teal (#008080) with Animated Particle Effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="pt-6 flex justify-center"
        >
          <button
            onClick={onExploreProjects}
            className="relative group px-8 py-4 rounded-xl bg-[#008080] hover:bg-[#006666] border border-teal-300/40 text-white font-sans font-bold text-sm tracking-wide transition-all duration-300 shadow-[0_4px_25px_0_rgba(0,128,128,0.45)] hover:shadow-[0_4px_35px_0_rgba(0,128,128,0.65)] active:translate-y-0.5 flex items-center space-x-3 overflow-hidden"
          >
            {/* Animated Particle Sparkles Icon */}
            <motion.div
              animate={{
                rotate: [0, 15, -15, 0],
                scale: [1, 1.15, 0.95, 1]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="p-1 rounded-md bg-teal-900/60 text-teal-200"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>

            <span>Explorar Blueprints</span>

            <ArrowDown className="w-4 h-4 text-teal-200 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};