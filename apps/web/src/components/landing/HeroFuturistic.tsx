import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Layers, ShieldCheck, Zap, Cpu, Database, Server, ArrowRight } from 'lucide-react';
import { Profile } from '@portfolio/shared';
import { useI18n } from '../../locales/i18n';

interface SkillNode {
  id: string;
  label: string;
  metric: string;
  detail: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
  glow: string;
  border: string;
}

const SKILL_NODES: SkillNode[] = [
  {
    id: 'arch',
    label: 'Clean Architecture',
    metric: '100% Domain Isolation',
    detail: 'Layers fully decoupled. Zero framework in domain.',
    Icon: Layers,
    color: '#00FFFF',
    glow: '0 0 24px rgba(0,255,255,0.5)',
    border: 'rgba(0,255,255,0.4)',
  },
  {
    id: 'solid',
    label: 'SOLID Strict',
    metric: '100% Adherence',
    detail: 'DIP enforced via gateways. SRP per use-case.',
    Icon: ShieldCheck,
    color: '#FF00FF',
    glow: '0 0 24px rgba(255,0,255,0.5)',
    border: 'rgba(255,0,255,0.4)',
  },
  {
    id: 'cache',
    label: 'Sub-2ms Cache',
    metric: '< 1.8ms avg p99',
    detail: 'InMemoryCache TTL 1800s, Redis-ready interface.',
    Icon: Zap,
    color: '#FFD700',
    glow: '0 0 24px rgba(255,215,0,0.5)',
    border: 'rgba(255,215,0,0.4)',
  },
  {
    id: 'node',
    label: 'Node.js',
    metric: 'v24 + 50+ projects',
    detail: 'Non-blocking I/O, async/await, event-loop mastery.',
    Icon: Server,
    color: '#00FFFF',
    glow: '0 0 24px rgba(0,255,255,0.4)',
    border: 'rgba(0,255,255,0.3)',
  },
  {
    id: 'events',
    label: 'Event-Driven',
    metric: '1,000+ req/sec',
    detail: 'WebSockets, EventEmitter, real-time pipelines.',
    Icon: Cpu,
    color: '#FF00FF',
    glow: '0 0 24px rgba(255,0,255,0.4)',
    border: 'rgba(255,0,255,0.3)',
  },
  {
    id: 'ts',
    label: 'TypeScript',
    metric: 'Strict zero-any',
    detail: 'Advanced generics + Zod runtime validation.',
    Icon: Database,
    color: '#FFD700',
    glow: '0 0 24px rgba(255,215,0,0.4)',
    border: 'rgba(255,215,0,0.3)',
  },
];

interface HeroFuturisticProps {
  profile: Profile;
  onExploreProjects: () => void;
  onExploreArchitecture: () => void;
  onOpenTerminal: () => void;
}

export const HeroFuturistic: React.FC<HeroFuturisticProps> = ({
  profile,
  onExploreProjects,
}) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useI18n();

  const handleCtaClick = () => {
    onExploreProjects();
  };

  return (
    <section className="relative z-10 min-h-[92vh] flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">

      {/* ── Top status ticker ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center space-x-3"
      >
        <div className="flex items-center space-x-2 px-4 py-1.5 rounded-sm glass-cyan text-[11px] font-mono tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00FFFF] blink" />
          <span className="text-[#00FFFF] font-bold">SYSTEM.ONLINE</span>
          <span className="text-ink-lo">•</span>
          <span className="text-ink-mid">{profile.name}</span>
        </div>

        <div className="px-3 py-1.5 rounded-sm glass text-[11px] font-mono text-ink-lo tracking-widest">
          BACKEND &amp; DISTRIBUTED SYSTEMS
        </div>
      </motion.div>

      {/* ── Master Headline ──────────────────────────────────────── */}
      <div className="max-w-5xl text-center space-y-4 mb-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="font-mono text-xs tracking-[0.4em] text-ink-lo uppercase"
        >
          {t('hero.label')}
        </motion.p>

        {/* Line 1: Angular display font */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-ink-hi tracking-tight leading-none"
        >
          {t('hero.title1')}
        </motion.h1>

        {/* Line 2: Display font */}
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-ink-hi tracking-tight leading-none"
        >
          {t('hero.title2')}
        </motion.h1>

        {/* Line 3: Dynamic multi-layered gradient (tri) */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-grad-tri tracking-tight leading-snug"
        >
          {t('hero.subtitle')}
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55, duration: 0.5 }}
          className="font-body text-base sm:text-lg text-ink-mid max-w-3xl mx-auto leading-relaxed mt-4"
        >
          {t('hero.desc1')}<strong className="text-ink-hi">{profile.name}</strong>{t('hero.desc2')}
        </motion.p>
      </div>

      {/* ── Floating Interconnected Skill Nodes ─────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="relative w-full max-w-4xl mx-auto mb-12"
      >
        {/* SVG connector lines between nodes */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00FFFF" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#FF00FF" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FFD700" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          <line x1="16%" y1="50%" x2="50%" y2="50%" stroke="url(#lineGrad)" strokeWidth="0.8" strokeDasharray="4 6"/>
          <line x1="50%" y1="50%" x2="84%" y2="50%" stroke="url(#lineGrad)" strokeWidth="0.8" strokeDasharray="4 6"/>
          <line x1="16%" y1="50%" x2="33%" y2="90%" stroke="url(#lineGrad)" strokeWidth="0.6" strokeDasharray="3 8"/>
          <line x1="84%" y1="50%" x2="67%" y2="90%" stroke="url(#lineGrad)" strokeWidth="0.6" strokeDasharray="3 8"/>
        </svg>

        {/* Nodes grid */}
        <div className="relative grid grid-cols-3 md:grid-cols-6 gap-3">
          {SKILL_NODES.map((node) => {
            const { id, label, metric, detail, Icon, color, glow, border } = node;
            const isActive = activeNode === id;
            return (
              <div key={id} className="relative group">
                <motion.button
                  onMouseEnter={() => setActiveNode(id)}
                  onMouseLeave={() => setActiveNode(null)}
                  whileHover={{ y: -4, scale: 1.04 }}
                  transition={{ duration: 0.2 }}
                  className="w-full p-3 rounded-sm glass flex flex-col items-center space-y-2 transition-all duration-300"
                  style={{
                    borderColor: isActive ? border : 'rgba(255,255,255,0.06)',
                    boxShadow: isActive ? glow : 'none',
                  }}
                >
                  {/* Abstract data-viz icon */}
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center relative"
                    style={{ background: `${color}15`, border: `1px solid ${color}30` }}
                  >
                    <span style={{ color }}><Icon className="w-4 h-4" /></span>
                    {/* Pulsing ring on active */}
                    {isActive && (
                      <span
                        className="absolute inset-0 rounded animate-ping opacity-30"
                        style={{ background: color }}
                      />
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] font-mono font-bold text-ink-hi leading-tight">{label}</p>
                    <p className="text-[9px] font-mono mt-0.5" style={{ color }}>{metric}</p>
                  </div>
                </motion.button>

                {/* Tooltip-style detail popup */}
                {isActive && (
                  <div
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 p-3 rounded glass z-30 pointer-events-none"
                    style={{ borderColor: border, boxShadow: glow }}
                  >
                    <p className="text-[10px] font-mono text-ink-hi leading-snug">{detail}</p>
                    <div
                      className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 glass"
                      style={{ borderColor: border }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* ── CTA: Sophisticated pulsating data-input field ─────── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        <div
          className="flex items-center rounded-sm overflow-hidden"
          style={{
            boxShadow: inputFocused
              ? '0 0 0 1px #00FFFF, 0 0 30px rgba(0,255,255,0.25)'
              : '0 0 0 1px rgba(0,255,255,0.25), 0 0 20px rgba(0,255,255,0.1)',
            transition: 'box-shadow 0.3s',
          }}
        >
          {/* Prompt prefix */}
          <div className="flex-shrink-0 px-3 py-3 bg-[#0d1117] border-r border-[#00FFFF22] font-mono text-xs text-[#00FFFF]">
            &gt;_
          </div>

          {/* Fake data input */}
          <input
            ref={inputRef}
            type="text"
            placeholder="explore --blueprints --all"
            onFocus={() => setInputFocused(true)}
            onBlur={() => setInputFocused(false)}
            onClick={handleCtaClick}
            readOnly
            className="flex-1 px-4 py-3 bg-[#07090e] text-xs font-mono text-ink-mid placeholder-ink-lo outline-none cursor-pointer"
          />

          {/* Submit arrow */}
          <button
            onClick={handleCtaClick}
            className="flex-shrink-0 px-4 py-3 font-mono font-bold text-xs text-black flex items-center space-x-2 transition-all duration-200"
            style={{
              background: 'linear-gradient(90deg, #00FFFF, #00c8c8)',
              boxShadow: '0 0 15px rgba(0,255,255,0.4)',
            }}
          >
            <span>EXEC</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Pulsing glow below the input */}
        <div
          className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2/3 h-4 rounded-full blur-xl opacity-30 animate-pulse-slow"
          style={{ background: '#00FFFF' }}
        />
      </motion.div>
    </section>
  );
};
