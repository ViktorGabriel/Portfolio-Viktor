import React from 'react';
import { Project } from '@portfolio/shared';
import { ArrowRight, Activity, Database, Zap, ShieldCheck } from 'lucide-react';

interface FlagshipProjectProps {
  project: Project;
  onOpenDetails: (p: Project) => void;
}

export const FlagshipProject: React.FC<FlagshipProjectProps> = ({ project, onOpenDetails }) => {
  return (
    <div className="w-full flex flex-col md:flex-row bg-[#121212] border border-zinc-800 rounded-sm overflow-hidden group">
      
      {/* ── Left Side: Technical Breakdown ── */}
      <div className="w-full md:w-[45%] flex flex-col justify-between p-6 md:p-8 border-b md:border-b-0 md:border-r border-zinc-800">
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-[#00FFFF] rounded-full animate-pulse-slow" />
              <span className="font-mono text-[10px] tracking-widest text-[#00FFFF] uppercase font-bold">FLAGSHIP SYSTEM</span>
            </div>
            <h3 className="font-display text-2xl lg:text-3xl font-bold text-zinc-100 tracking-tight leading-tight">
              {project.displayName}
            </h3>
          </div>
          
          {/* Executive Spec */}
          {project.executiveSpec && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">PROBLEM SPACE</span>
                <p className="font-body text-sm text-zinc-300 leading-relaxed">
                  {project.executiveSpec.problem}
                </p>
              </div>
              <div className="space-y-1">
                <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">ARCHITECTURE HIGHLIGHT</span>
                <p className="font-body text-sm text-zinc-300 leading-relaxed font-semibold">
                  {project.executiveSpec.archHighlight}
                </p>
              </div>
            </div>
          )}

          {/* Action */}
          <button 
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-[#00FFFF] hover:text-white transition-colors duration-200 mt-4 group/btn"
          >
            <span>[ INSPECT ARCHITECTURE ]</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {project.topics.slice(0, 4).map(topic => (
            <span key={topic} className="px-2 py-1 bg-[#050505] border border-zinc-800 font-mono text-[9px] text-zinc-400">
              {topic}
            </span>
          ))}
          {project.verifiedViaReadme && (
             <span className="px-2 py-1 bg-teal-900/20 border border-teal-500/30 font-mono text-[9px] text-teal-400 flex items-center gap-1">
               <ShieldCheck className="w-2.5 h-2.5" /> DOCS: VERIFIED VIA README
             </span>
          )}
        </div>
      </div>

      {/* ── Right Side: Interactive Schematic & Metrics ── */}
      <div className="w-full md:w-[55%] flex flex-col bg-[#0a0a0a] relative overflow-hidden">
        {/* Schematic Area */}
        <div className="flex-1 min-h-[250px] relative flex items-center justify-center p-6">
          <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />
          {/* Node Diagram SVG */}
          <svg className="w-full h-full max-h-[300px]" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00FFFF" stopOpacity="0.8" />
              </linearGradient>
            </defs>
            {/* Paths */}
            <path d="M 60 100 L 140 60" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 60 100 L 140 140" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 140 60 L 260 100" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 140 140 L 260 100" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
            <path d="M 260 100 L 340 100" fill="none" stroke="#27272a" strokeWidth="2" strokeDasharray="4 4" />
            
            {/* Animated Data Packets */}
            <circle cx="60" cy="100" r="2" fill="#00FFFF">
              <animateMotion dur="2s" repeatCount="indefinite" path="M 60 100 L 140 60" />
            </circle>
            <circle cx="60" cy="100" r="2" fill="#00FFFF">
              <animateMotion dur="2.5s" repeatCount="indefinite" path="M 60 100 L 140 140" />
            </circle>
            
            {/* Nodes */}
            <g transform="translate(60,100)">
              <rect x="-30" y="-15" width="60" height="30" rx="2" fill="#121212" stroke="#3f3f46" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="Space Mono">CLIENT</text>
            </g>
            <g transform="translate(140,60)">
              <rect x="-35" y="-15" width="70" height="30" rx="2" fill="#121212" stroke="#00FFFF" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#00FFFF" fontSize="8" fontFamily="Space Mono">API G/W</text>
            </g>
            <g transform="translate(140,140)">
              <rect x="-35" y="-15" width="70" height="30" rx="2" fill="#121212" stroke="#FF00FF" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#FF00FF" fontSize="8" fontFamily="Space Mono">WS HUB</text>
            </g>
            <g transform="translate(260,100)">
              <rect x="-40" y="-20" width="80" height="40" rx="2" fill="#121212" stroke="#FFD700" strokeWidth="1" />
              <circle cx="-30" cy="-10" r="2" fill="#FFD700" className="animate-ping" />
              <text x="5" y="-2" textAnchor="middle" fill="#FFD700" fontSize="8" fontFamily="Space Mono">REDIS FIFO</text>
              <text x="5" y="10" textAnchor="middle" fill="#d4d4d8" fontSize="6" fontFamily="Space Mono">SLA ROUTING</text>
            </g>
            <g transform="translate(340,100)">
              <rect x="-30" y="-15" width="60" height="30" rx="2" fill="#121212" stroke="#3f3f46" strokeWidth="1" />
              <text x="0" y="3" textAnchor="middle" fill="#a1a1aa" fontSize="8" fontFamily="Space Mono">DB</text>
            </g>
          </svg>
        </div>

        {/* Metrics Strip */}
        {project.techSpecs && project.techSpecs.length > 0 && (
          <div className="border-t border-zinc-800 bg-[#080808] p-4 flex flex-wrap justify-around gap-4 z-10">
            {project.techSpecs.map((spec, i) => (
              <div key={i} className="flex items-center gap-2">
                {i === 0 && <Zap className="w-3.5 h-3.5 text-yellow-400" />}
                {i === 1 && <Activity className="w-3.5 h-3.5 text-cyan-400" />}
                {i === 2 && <Database className="w-3.5 h-3.5 text-magenta-400" />}
                <span className="font-mono text-[10px] text-zinc-300 tracking-wider">{spec}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};