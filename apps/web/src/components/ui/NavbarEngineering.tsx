import React from 'react';
import { Terminal, Activity, Layers, Cpu, Github, Send } from 'lucide-react';

interface NavbarEngineeringProps {
  isCached?: boolean;
  onNavigate: (sectionId: string) => void;
}

export const NavbarEngineering: React.FC<NavbarEngineeringProps> = ({ isCached, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#1e293b]/90 bg-[#05070c]/95 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        {/* New Brand Identity: Refined Minimalist Text-Mark */}
        <div
          onClick={() => onNavigate('hero')}
          className="flex flex-col cursor-pointer group select-none"
        >
          <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.08em] text-white group-hover:text-teal-300 transition-colors">
            VIKTOR GABRIEL
          </span>
          <span className="font-sans text-[9px] sm:text-[10px] tracking-[0.3em] font-bold text-teal-400/90 -mt-0.5 uppercase">
            SOFTWARE ENGINEER
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs font-sans font-medium tracking-wide">
          <button
            onClick={() => onNavigate('hero')}
            className="text-slate-400 hover:text-white transition"
          >
            Início
          </button>
          <button
            onClick={() => onNavigate('telemetry')}
            className="text-slate-400 hover:text-white transition flex items-center space-x-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-teal-400" />
            <span>Telemetria</span>
          </button>
          <button
            onClick={() => onNavigate('architecture')}
            className="text-slate-400 hover:text-white transition flex items-center space-x-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            <span>Arquitetura</span>
          </button>
          <button
            onClick={() => onNavigate('showcase')}
            className="text-slate-400 hover:text-white transition flex items-center space-x-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-sky-400" />
            <span>Blueprints</span>
          </button>
        </nav>

        {/* Revised Header Top Right: System Status Indicators & Refined Teal Button */}
        <div className="flex items-center space-x-3">
          {/* Latency / Gateway System Status Indicator */}
          <div className="flex items-center space-x-2.5 px-3 py-1.5 rounded-lg bg-[#0a0f1d] border border-[#1e293b] text-xs font-mono shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <div className="flex flex-col leading-none">
              <span className="text-emerald-400 font-bold text-[11px]">
                {isCached ? '< 1.8ms' : 'Active'}
              </span>
              <span className="text-slate-400 text-[9px] font-sans">Fastify Gateway</span>
            </div>
          </div>

          {/* Terminal System Button */}
          <button
            onClick={() => onNavigate('terminal')}
            className="p-2 rounded-lg bg-[#0a0f1d] border border-[#1e293b] text-slate-300 hover:text-teal-400 hover:border-teal-500/40 transition shadow-sm"
            title="Abrir Terminal CLI"
          >
            <Terminal className="w-4 h-4" />
          </button>

          {/* GitHub Icon Link */}
          <a
            href="https://github.com/ViktorGabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-[#0a0f1d] border border-[#1e293b] text-slate-300 hover:text-white hover:border-slate-600 transition"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          {/* Revised 'CONTATO' Button: Dark Rich Teal (#008080) with Thin Clean Outline & Depth */}
          <button
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-lg bg-[#008080] hover:bg-[#006666] border border-teal-300/40 text-white text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 shadow-[0_4px_14px_0_rgba(0,128,128,0.35)] active:translate-y-0.5 flex items-center space-x-1.5"
          >
            <Send className="w-3 h-3 text-teal-200" />
            <span>CONTATO</span>
          </button>
        </div>
      </div>
    </header>
  );
};