import React, { useState } from 'react';
import { Cpu, Layers, BarChart2, Terminal, Github, Radio } from 'lucide-react';
import { useI18n } from '../../locales/i18n';

interface NavbarProps {
  isCached?: boolean;
  onNavigate: (id: string) => void;
}

// Abstracted VG geometric logomark rendered in SVG
const VGLogomark: React.FC = () => (
  <svg width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Tech container with micro-border */}
    <rect width="38" height="38" rx="6" fill="#050505" stroke="rgba(0,255,255,0.3)" strokeWidth="1" />
    
    {/* Subtle technical background grid line */}
    <line x1="19" y1="6" x2="19" y2="32" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="2 2" />
    
    {/* Sharp, clean 'V' on left (Electric Cyan) */}
    <path
      d="M7 11 L13.5 27 L18.5 11"
      stroke="#00FFFF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Technical, angular 'G' on right (Vibrant Magenta) */}
    <path
      d="M31 15.5 C31 11.5 28.5 10 24.5 10 C20 10 18 13.5 18 19 C18 24.5 20.5 28 25 28 C29 28 31 25.5 31 21.5 L24.5 21.5"
      stroke="#FF00FF"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Micro-tech corner accents (Gold) */}
    <line x1="3" y1="3" x2="6" y2="3" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="3" y1="3" x2="3" y2="6" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="35" y1="35" x2="32" y2="35" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
    <line x1="35" y1="35" x2="35" y2="32" stroke="#FFD700" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
);

const NAV_ITEMS = [
  { id: 'about',        labelKey: 'nav.dossier',      Icon: Cpu,        color: 'text-teal-400' },
  { id: 'telemetry',    labelKey: 'nav.telemetry',    Icon: BarChart2,  color: 'text-cyan-DEFAULT' },
  { id: 'architecture', labelKey: 'nav.architecture',   Icon: Layers,     color: 'text-magenta-DEFAULT' },
  { id: 'showcase',     labelKey: 'nav.blueprints',    Icon: Cpu,        color: 'text-gold-DEFAULT' },
  { id: 'terminal',     labelKey: 'nav.cli',           Icon: Terminal,   color: 'text-cyan-dim' },
];

export const NavbarFuturistic: React.FC<NavbarProps> = ({ isCached, onNavigate }) => {
  const [hovered, setHovered] = useState<string | null>(null);
  const { t, language, setLanguage } = useI18n();

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top scanline bar */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-[#00FFFF44] to-transparent" />

      <div className="glass border-b border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
          {/* Brand Logomark + Identity */}
          <button
            onClick={() => onNavigate('hero')}
            className="flex items-center space-x-3 group flex-shrink-0"
          >
            <VGLogomark />
            <div className="hidden sm:flex flex-col leading-none">
              <span className="font-display text-sm font-bold tracking-[0.15em] text-ink-hi group-hover:text-[#00FFFF] transition-colors duration-300">
                VIKTOR GABRIEL
              </span>
              <span className="font-body text-[9px] tracking-[0.35em] text-ink-lo uppercase mt-0.5">
                {t('nav.role')}
              </span>
            </div>
          </button>

          {/* Navigation: micro-icon items with status-update hover */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map(({ id, labelKey, Icon }) => {
              const isHov = hovered === id;
              return (
                <button
                  key={id}
                  onClick={() => onNavigate(id)}
                  onMouseEnter={() => setHovered(id)}
                  onMouseLeave={() => setHovered(null)}
                  className={`relative flex items-center space-x-1.5 px-3.5 py-2 rounded text-[11px] font-mono font-bold tracking-widest transition-all duration-200 ${
                    isHov
                      ? 'text-[#00FFFF] bg-[#00FFFF0f]'
                      : 'text-ink-lo hover:text-ink-mid'
                  }`}
                >
                  {/* Status update dot animation on hover */}
                  {isHov && (
                    <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#00FFFF] blink" />
                  )}
                  <Icon className={`w-3 h-3 ${isHov ? 'text-[#00FFFF]' : 'text-ink-lo'}`} />
                  <span>{t(labelKey)}</span>
                </button>
              );
            })}
          </nav>

          {/* Right: Status indicators + GitHub */}
          <div className="flex items-center space-x-3 flex-shrink-0">
            {/* Live gateway metric */}
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded bg-[#0d1117] border border-[#00FFFF1a] text-[10px] font-mono">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FFFF] opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#00FFFF]" />
              </span>
              <span className="text-[#00FFFF] font-bold">{isCached ? '<1.8ms' : 'live'}</span>
              <span className="text-ink-lo">{t('nav.bff')}</span>
            </div>

            {/* Radio / system online */}
            <div className="hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded bg-[#0d1117] border border-[#FF00FF1a] text-[10px] font-mono text-[#FF00FF]">
              <Radio className="w-3 h-3 animate-pulse-slow" />
              <span>{t('nav.online')}</span>
            </div>

            <a
              href="https://github.com/ViktorGabriel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded text-ink-lo hover:text-white hover:bg-white/5 transition border border-transparent hover:border-white/10"
            >
              <Github className="w-4 h-4" />
            </a>

            {/* Language Switcher */}
            <div className="flex items-center space-x-1 font-mono text-[10px]">
              <button
                onClick={() => setLanguage('pt-BR')}
                className={`px-1.5 py-0.5 rounded transition-colors ${language === 'pt-BR' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                PT
              </button>
              <button
                onClick={() => setLanguage('en-US')}
                className={`px-1.5 py-0.5 rounded transition-colors ${language === 'en-US' ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white'}`}
              >
                EN
              </button>
            </div>

            <button
              onClick={() => onNavigate('contact')}
              className="relative overflow-hidden px-4 py-2 rounded text-xs font-mono font-bold tracking-widest text-black bg-[#00FFFF] hover:bg-[#00FFFF] transition group clip-corner"
              style={{ boxShadow: '0 0 20px rgba(0,255,255,0.5)' }}
            >
              <span className="relative z-10">{t('nav.contact')}</span>
              <span className="absolute inset-0 bg-gradient-to-r from-[#00FFFF] to-[#00c8c8] group-hover:from-[#00FFFF] group-hover:to-[#FF00FF] transition-all duration-500" />
              <span className="absolute inset-0 z-10 flex items-center justify-center font-mono font-bold text-xs tracking-widest text-black">{t('nav.contact')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="w-full h-px bg-gradient-to-r from-[#00FFFF22] via-[#FF00FF22] to-[#FFD70022]" />
    </header>
  );
};
