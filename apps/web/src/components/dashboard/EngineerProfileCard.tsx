import React, { useState } from 'react';
import { Mail, MapPin, Building, ChevronRight, Terminal, Cpu, Database, Server, Layers, ShieldCheck, Zap } from 'lucide-react';
import { Profile } from '@portfolio/shared';

interface EngineerProfileCardProps {
  profile: Profile;
  onContactClick: () => void;
}

interface SkillItem {
  name: string;
  category: string;
  color: string;
  borderColor: string;
  bgGlow: string;
  icon: React.ComponentType<{ className?: string }>;
  detail: string;
}

const SKILLS: SkillItem[] = [
  {
    name: 'Node.js',
    category: 'Runtime V24',
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40 hover:border-emerald-400',
    bgGlow: 'hover:bg-emerald-950/30',
    icon: Server,
    detail: 'Event-loop, async non-blocking execution & performance tuning.'
  },
  {
    name: 'TypeScript',
    category: 'Strict Typing',
    color: 'text-blue-400',
    borderColor: 'border-blue-500/40 hover:border-blue-400',
    bgGlow: 'hover:bg-blue-950/30',
    icon: Terminal,
    detail: 'Zero-any policy, advanced generics, strict type contracts with Zod.'
  },
  {
    name: 'Fastify',
    category: 'HTTP Framework',
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40 hover:border-amber-400',
    bgGlow: 'hover:bg-amber-950/30',
    icon: Zap,
    detail: 'Low-overhead microsecond routing, plugins and schema serialization.'
  },
  {
    name: 'Docker',
    category: 'Containerization',
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40 hover:border-cyan-400',
    bgGlow: 'hover:bg-cyan-950/30',
    icon: Database,
    detail: 'Multi-stage production containers & isolated local orchestration.'
  },
  {
    name: 'React 19',
    category: 'Reactive UI',
    color: 'text-sky-400',
    borderColor: 'border-sky-500/40 hover:border-sky-400',
    bgGlow: 'hover:bg-sky-950/30',
    icon: Cpu,
    detail: 'High-performance component architecture & Framer Motion.'
  },
  {
    name: 'Clean Arch',
    category: 'Core Discipline',
    color: 'text-purple-400',
    borderColor: 'border-purple-500/40 hover:border-purple-400',
    bgGlow: 'hover:bg-purple-950/30',
    icon: Layers,
    detail: 'Strict Domain, Application and Infrastructure layer decoupling.'
  },
  {
    name: 'SOLID Strict',
    category: 'OOP Principles',
    color: 'text-teal-400',
    borderColor: 'border-teal-500/40 hover:border-teal-400',
    bgGlow: 'hover:bg-teal-950/30',
    icon: ShieldCheck,
    detail: 'Dependency Inversion and Single Responsibility enforced throughout.'
  },
  {
    name: 'Redis Cache',
    category: 'In-Memory Store',
    color: 'text-rose-400',
    borderColor: 'border-rose-500/40 hover:border-rose-400',
    bgGlow: 'hover:bg-rose-950/30',
    icon: Zap,
    detail: 'TTL policies, sub-2ms caching layer and fault-tolerant fallbacks.'
  }
];

export const EngineerProfileCard: React.FC<EngineerProfileCardProps> = ({ profile, onContactClick }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>('Node.js');

  return (
    <div className="rounded-2xl p-6 sm:p-7 border border-[#1e293b] bg-[#0c121d] space-y-6 shadow-2xl relative overflow-hidden">
      {/* Schematic Lines Background Accent */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-teal-500/5 via-purple-500/5 to-transparent rounded-full blur-3xl pointer-events-none" />

      {/* Header: System Engineer Dossier Header */}
      <div className="border-b border-[#1e293b] pb-5">
        <div className="flex items-center space-x-4">
          <div className="relative flex-shrink-0">
            <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl p-0.5 bg-gradient-to-tr from-teal-400 via-sky-500 to-purple-500 shadow-lg">
              <img
                src={profile.avatarUrl}
                alt={profile.name}
                className="w-full h-full object-cover rounded-[14px] bg-[#07090e]"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[#07090e] border border-[#1e293b]">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center space-x-1.5 text-[10px] font-mono tracking-wider uppercase text-teal-400 font-bold">
              <Terminal className="w-3 h-3" />
              <span>System Engineer Dossier</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-none">
              {profile.name}
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              @{profile.username} • Software Engineer
            </p>
          </div>
        </div>

        {/* Clear biographical description */}
        <p className="text-xs text-slate-300 leading-relaxed mt-4 font-normal">
          Software Engineer focado em arquitetura de sistemas distribuídos, Clean Architecture, SOLID e microsserviços de alta disponibilidade com Node.js e TypeScript.
        </p>

        {/* Location & Company specs */}
        <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-400 pt-3">
          {profile.location && (
            <span className="flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-teal-400" />
              <span>{profile.location}</span>
            </span>
          )}
          {profile.company && (
            <span className="flex items-center space-x-1.5">
              <Building className="w-3.5 h-3.5 text-purple-400" />
              <span>{profile.company}</span>
            </span>
          )}
        </div>
      </div>

      {/* Expanded SKILLS INVENTORY Panel */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Skills Inventory
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">
            8 Certified Stacks
          </span>
        </div>

        {/* Structured 2-column Grid of Substantial Color-Coded Skill Badges */}
        <div className="grid grid-cols-2 gap-2.5">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            const isHovered = activeTooltip === skill.name;
            return (
              <div
                key={skill.name}
                onMouseEnter={() => setActiveTooltip(skill.name)}
                onMouseLeave={() => setActiveTooltip(null)}
                className={`p-2.5 rounded-xl border bg-[#080d16] ${skill.borderColor} ${skill.bgGlow} transition-all duration-200 cursor-pointer relative group flex items-center space-x-2.5 shadow-sm`}
              >
                <div className={`p-1.5 rounded-lg bg-black/40 border border-white/5 ${skill.color}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="block text-xs font-bold text-white tracking-tight truncate">
                    {skill.name}
                  </span>
                  <span className="block text-[9px] font-mono text-slate-400 truncate">
                    {skill.category}
                  </span>
                </div>

                {/* Simulated Interactive Tooltip on hover */}
                {isHovered && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30 px-2.5 py-1.5 rounded-lg bg-[#04060a] border border-teal-500/50 text-[10px] font-sans text-teal-200 whitespace-nowrap shadow-2xl animate-in fade-in pointer-events-none">
                    <span>{skill.detail}</span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#04060a] border-b border-r border-teal-500/50 rotate-45" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Refactored 'Iniciar Contato / Proposta' Button (Textured Dark Steel Blue) */}
      <div className="pt-2">
        <button
          onClick={onContactClick}
          className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-b from-[#24344d] via-[#1c293d] to-[#151f2e] hover:from-[#2c3f5c] hover:to-[#1a273b] border border-[#3b5378]/70 text-slate-100 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 shadow-[0_4px_16px_0_rgba(15,23,42,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] active:translate-y-0.5 flex items-center justify-center space-x-2.5 group"
        >
          <Mail className="w-4 h-4 text-teal-300 group-hover:scale-110 transition-transform" />
          <span>Iniciar Contato / Proposta</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};