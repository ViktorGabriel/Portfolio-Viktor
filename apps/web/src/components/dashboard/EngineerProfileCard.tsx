import React from 'react';
import { ShieldCheck, MapPin, Building, Send, Terminal, Check } from 'lucide-react';
import { Profile } from '@portfolio/shared';

interface EngineerProfileCardProps {
  profile: Profile;
  onContactClick: () => void;
}

export const EngineerProfileCard: React.FC<EngineerProfileCardProps> = ({ profile, onContactClick }) => {
  return (
    <div className="glass-panel rounded-2xl p-6 border border-cyber-border space-y-6 relative overflow-hidden shadow-card">
      {/* Background cyber accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-purple/10 rounded-full blur-2xl pointer-events-none" />

      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        <div className="relative group">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl p-0.5 bg-gradient-to-tr from-cyan-400 via-cyber-purple to-emerald-400 shadow-glow-cyan">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-full h-full object-cover rounded-[14px] bg-cyber-surface"
            />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-black/90 border border-cyber-border text-[10px] font-mono text-cyber-emerald flex items-center space-x-1 shadow">
            <span className="w-1.5 h-1.5 rounded-full bg-cyber-emerald animate-ping" />
            <span>ONLINE</span>
          </div>
        </div>

        <div className="space-y-1 text-center sm:text-left">
          <div className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded bg-black/40 border border-cyber-border text-[10px] font-mono text-cyber-cyan">
            <Terminal className="w-3 h-3" />
            <span>BACKEND & DISTRIBUTED SYSTEMS</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">{profile.name}</h2>
          <p className="text-xs text-cyber-dim font-mono">@{profile.username} • Core Engineer</p>
        </div>
      </div>

      {/* Bio Statement */}
      <p className="text-xs text-cyber-muted leading-relaxed">
        {profile.bio}
      </p>

      {/* System Status Pill */}
      <div className="p-3 rounded-xl bg-cyber-surface/90 border border-cyber-border/80 text-xs font-mono space-y-1">
        <div className="text-[10px] text-cyber-dim uppercase font-bold flex items-center justify-between">
          <span>STATUS DO ENGENHEIRO</span>
          <span className="text-cyber-emerald">AVAILABLE</span>
        </div>
        <div className="text-cyber-text text-[11px] leading-snug">
          {profile.status}
        </div>
      </div>

      {/* Meta Specs */}
      <div className="space-y-2 text-xs font-mono text-cyber-muted border-t border-cyber-border/60 pt-4">
        {profile.company && (
          <div className="flex items-center space-x-2">
            <Building className="w-3.5 h-3.5 text-cyber-dim" />
            <span>{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-3.5 h-3.5 text-cyber-dim" />
            <span>{profile.location}</span>
          </div>
        )}
      </div>

      {/* Core Tech Stack Badges */}
      <div className="space-y-2 border-t border-cyber-border/60 pt-4">
        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-cyber-cyan flex items-center justify-between">
          <span>STACK ESSENCIAL</span>
          <ShieldCheck className="w-3.5 h-3.5 text-cyber-emerald" />
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyber-surface border border-cyber-border text-white hover:border-cyber-cyan/50 transition"
            >
              <Check className="w-3 h-3 text-cyber-emerald" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Quick Contact CTA */}
      <button
        onClick={onContactClick}
        className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-cyber-purple/20 hover:from-cyan-500/30 hover:to-cyber-purple/30 border border-cyber-cyan/40 text-cyber-cyan font-mono font-bold text-xs transition shadow-glow-cyan flex items-center justify-center space-x-2"
      >
        <Send className="w-3.5 h-3.5" />
        <span>Iniciar Contato / Proposta</span>
      </button>
    </div>
  );
};