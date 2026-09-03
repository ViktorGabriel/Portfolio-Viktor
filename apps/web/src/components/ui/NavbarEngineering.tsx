import React from 'react';
import { Cpu, Terminal, Layers, Github, Activity, Send } from 'lucide-react';

interface NavbarEngineeringProps {
  isCached?: boolean;
  onNavigate: (sectionId: string) => void;
}

export const NavbarEngineering: React.FC<NavbarEngineeringProps> = ({ isCached, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-cyber-border bg-cyber-bg/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Engineer Callout */}
        <div
          onClick={() => onNavigate('hero')}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-cyber-purple p-0.5 shadow-glow-cyan">
            <div className="w-full h-full bg-cyber-bg rounded-[10px] flex items-center justify-center font-mono font-black text-sm text-cyber-cyan group-hover:text-white transition">
              VG
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-sm sm:text-base text-white tracking-tight">
                Viktor Gabriel
              </span>
              <span className="text-cyber-dim text-xs font-mono">•</span>
              <span className="text-cyber-cyan text-xs font-mono font-semibold hidden sm:inline">
                Software Engineer
              </span>
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono">
          <button
            onClick={() => onNavigate('hero')}
            className="text-cyber-muted hover:text-white transition"
          >
            // INÍCIO
          </button>
          <button
            onClick={() => onNavigate('telemetry')}
            className="text-cyber-muted hover:text-white transition flex items-center space-x-1.5"
          >
            <Activity className="w-3.5 h-3.5 text-cyber-cyan" />
            <span>TELEMETRIA</span>
          </button>
          <button
            onClick={() => onNavigate('architecture')}
            className="text-cyber-muted hover:text-white transition flex items-center space-x-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-cyber-purple" />
            <span>ARQUITETURA</span>
          </button>
          <button
            onClick={() => onNavigate('showcase')}
            className="text-cyber-muted hover:text-white transition flex items-center space-x-1.5"
          >
            <Cpu className="w-3.5 h-3.5 text-cyber-emerald" />
            <span>PROJETOS</span>
          </button>
          <button
            onClick={() => onNavigate('terminal')}
            className="text-cyber-muted hover:text-white transition flex items-center space-x-1.5"
          >
            <Terminal className="w-3.5 h-3.5 text-cyber-amber" />
            <span>TERMINAL</span>
          </button>
        </nav>

        {/* Status indicator & Actions */}
        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1 rounded-full glass-panel border border-cyber-border text-[11px] font-mono">
            <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
            <span className="text-cyber-muted">BFF Gateway:</span>
            <span className="text-cyber-cyan font-bold">{isCached ? 'CACHE HIT (<2ms)' : 'ACTIVE'}</span>
          </div>

          <a
            href="https://github.com/ViktorGabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-xl glass-panel border border-cyber-border text-cyber-muted hover:text-white hover:border-cyber-cyan transition"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <button
            onClick={() => onNavigate('contact')}
            className="px-3.5 py-1.5 rounded-xl bg-cyber-cyan/15 hover:bg-cyber-cyan/25 border border-cyber-cyan/50 text-cyber-cyan text-xs font-mono font-bold transition shadow-glow-cyan flex items-center space-x-1.5"
          >
            <Send className="w-3 h-3" />
            <span>CONTATO</span>
          </button>
        </div>
      </div>
    </header>
  );
};