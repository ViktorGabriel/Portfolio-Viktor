import React from 'react';
import { Download, Github, ShieldCheck, Database, Wrench, ExternalLink } from 'lucide-react';

/* ─── Static Data ──────────────────────────────────────────── */

const META_ROWS = [
  { key: 'ROLE',         value: 'Backend Engineer / Software Engineering Student (6th Sem)' },
  { key: 'LOCATION',     value: 'Contagem, Minas Gerais, Brazil' },
  { key: 'LANGUAGES',    value: 'English (B2 / Technical) · Portuguese (Native)' },
  { key: 'AVAILABILITY', value: 'Open to Backend Internships / Junior Roles' },
];

const PILLARS = [
  {
    id: 'arch',
    icon: ShieldCheck,
    label: 'Architecture & Patterns',
    tags: [
      'Clean Architecture',
      'SOLID Principles',
      'DDD (Domain-Driven Design)',
      'Dependency Injection',
      'Repository Pattern',
      'Use-Case Layer',
    ],
    accent: '#5eead4',   // muted teal
  },
  {
    id: 'data',
    icon: Database,
    label: 'Data & Persistence',
    tags: [
      'PostgreSQL',
      'SQL (Advanced Queries)',
      'Prisma ORM',
      'Redis Cache',
      'In-Memory TTL Cache',
      'Zod Schema Validation',
    ],
    accent: '#a3e635',   // muted terminal-green
  },
  {
    id: 'devops',
    icon: Wrench,
    label: 'DevOps & Tooling',
    tags: [
      'Docker & Compose',
      'Git & GitHub',
      'Fastify v5',
      'Node.js v24',
      'TypeScript (Strict)',
      'Vite / Monorepo',
    ],
    accent: '#93c5fd',   // muted blue
  },
];

const CREDENTIALS = [
  {
    issuer: 'Cisco Networking Academy',
    title: 'Endpoint Security',
    year: '2025',
  },
  {
    issuer: 'DIO',
    title: 'Node.js Formation',
    year: '2025',
  },
  {
    issuer: 'Aceler.AI',
    title: 'AI Engineering Track',
    year: '2026',
  },
];

/* ─── Sub-components ───────────────────────────────────────── */

/** Left column: photo + metadata block */
const ProfileLeft: React.FC<{ avatarUrl: string; name: string }> = ({ avatarUrl, name }) => (
  <div className="flex flex-col gap-0">

    {/* Photo area with technical overlay */}
    <div className="relative w-full aspect-[4/5] bg-zinc-950 border border-zinc-800 overflow-hidden">
      {/* Desaturated / muted photo */}
      <img
        src={avatarUrl}
        alt={name}
        className="w-full h-full object-cover grayscale-[30%] contrast-110 opacity-85"
        loading="eager"
      />

      {/* Coordinate-mark overlays */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        {/* Corner ticks – top-left */}
        <line x1="0"   y1="18" x2="18"  y2="18"  stroke="#5eead4" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="18"  y1="0"  x2="18"  y2="18"  stroke="#5eead4" strokeWidth="0.8" strokeOpacity="0.6" />
        {/* Corner ticks – bottom-right */}
        <line x1="100%" y1="calc(100% - 18px)" x2="calc(100% - 18px)" y2="calc(100% - 18px)" stroke="#5eead4" strokeWidth="0.8" strokeOpacity="0.6" />
        <line x1="calc(100% - 18px)" y1="100%" x2="calc(100% - 18px)" y2="calc(100% - 18px)" stroke="#5eead4" strokeWidth="0.8" strokeOpacity="0.6" />
        {/* Centre cross-hair */}
        <line x1="50%" y1="46%" x2="50%" y2="54%" stroke="#5eead4" strokeWidth="0.6" strokeOpacity="0.35" />
        <line x1="46%" y1="50%" x2="54%" y2="50%" stroke="#5eead4" strokeWidth="0.6" strokeOpacity="0.35" />
        <circle cx="50%" cy="50%" r="18" fill="none" stroke="#5eead4" strokeWidth="0.5" strokeOpacity="0.25" />
      </svg>

      {/* Bottom label strip */}
      <div className="absolute bottom-0 left-0 right-0 bg-zinc-950/80 backdrop-blur-xs px-3 py-1.5 flex items-center justify-between border-t border-zinc-800">
        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">VG.PORTRAIT</span>
        <span className="font-mono text-[10px] text-teal-400/80 tracking-wider">◈ ACTIVE</span>
      </div>
    </div>

    {/* Monospace Metadata block */}
    <div className="border border-t-0 border-zinc-800 bg-[#080808]">
      {META_ROWS.map(({ key, value }, i) => (
        <div
          key={key}
          className={`px-4 py-3 flex flex-col gap-0.5 ${i !== META_ROWS.length - 1 ? 'border-b border-zinc-800/70' : ''}`}
        >
          <span className="font-mono text-[9px] tracking-[0.25em] text-zinc-500 uppercase select-none">
            [{key}]
          </span>
          <span className="font-mono text-xs text-zinc-200 leading-snug">{value}</span>
        </div>
      ))}
    </div>
  </div>
);

/** Right column: system profile + spec grid + credentials + action bar */
const ProfileRight: React.FC = () => (
  <div className="flex flex-col gap-0 h-full">

    {/* Section label */}
    <div className="px-6 pt-5 pb-4 border-b border-zinc-800">
      <p className="font-mono text-[10px] tracking-[0.3em] text-teal-400/90 uppercase select-none">
        // SYSTEM PROFILE & ARCHITECTURE FOCUS
      </p>
    </div>

    {/* High-impact summary */}
    <div className="px-6 py-5 border-b border-zinc-800 space-y-3">
      <h2 className="font-sans text-xl font-bold text-zinc-50 leading-snug tracking-tight">
        Viktor Gabriel
      </h2>
      <p className="font-sans text-sm text-zinc-300 leading-relaxed max-w-prose">
        Backend engineer and software engineering student (6th semester) with a focus on
        building <strong className="text-zinc-100 font-semibold">production-grade, decoupled systems</strong> using
        <strong className="text-zinc-100 font-semibold"> Node.js, TypeScript, and Java</strong>.
        Advocates for strict <strong className="text-zinc-100 font-semibold">Clean Architecture & SOLID</strong> discipline,
        persistence with <strong className="text-zinc-100 font-semibold">PostgreSQL / SQL</strong>, and
        container-first delivery with <strong className="text-zinc-100 font-semibold">Docker</strong>.
        Targets roles where engineering rigour, domain modelling, and system resilience matter.
      </p>
    </div>

    {/* Technical Spec Grid – 3 pillars */}
    <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-zinc-800 border-b border-zinc-800">
      {PILLARS.map(({ id, icon: Icon, label, tags, accent }) => (
        <div key={id} className="px-5 py-5 flex flex-col gap-3">
          {/* Pillar header */}
          <div className="flex items-center gap-2">
            <span style={{ color: accent }}>
              <Icon className="w-3.5 h-3.5" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase" style={{ color: accent }}>
              {label}
            </span>
          </div>

          {/* Tags */}
          <ul className="flex flex-col gap-1.5">
            {tags.map((tag) => (
              <li key={tag} className="flex items-center gap-2">
                <span className="w-px h-3 bg-zinc-700 flex-shrink-0" />
                <span className="font-mono text-xs text-zinc-300">{tag}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>

    {/* Credentials strip */}
    <div className="px-6 py-4 border-b border-zinc-800">
      <p className="font-mono text-[9px] tracking-[0.3em] text-zinc-500 uppercase mb-3 select-none">
        // CREDENTIALS & CERTIFICATIONS
      </p>
      <div className="flex flex-wrap gap-2">
        {CREDENTIALS.map(({ issuer, title, year }) => (
          <div
            key={title}
            className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-700/70 hover:border-zinc-500 transition-colors duration-150"
          >
            <ShieldCheck className="w-3 h-3 text-teal-400/80 flex-shrink-0" />
            <div className="flex flex-col leading-none">
              <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-wider">{issuer}</span>
              <span className="font-mono text-[10px] text-zinc-200">{title}</span>
            </div>
            <span className="font-mono text-[9px] text-zinc-600 ml-1">{year}</span>
          </div>
        ))}
      </div>
    </div>

    {/* ── Action Row / Quick Access Bar ──────────────────────── */}
    <div className="px-6 py-4 flex flex-wrap items-center gap-3">
      {/* Primary: Download CV */}
      <a
        href="/cv.pdf"
        download
        className={[
          'inline-flex items-center gap-2 px-4 py-2',
          'border border-zinc-200 bg-transparent',
          'font-mono text-xs uppercase tracking-widest text-zinc-100',
          'hover:bg-zinc-100 hover:text-zinc-900',
          'transition-colors duration-150',
          'group',
        ].join(' ')}
      >
        <Download className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform duration-150" />
        <span>[ Download Full CV.pdf ]</span>
      </a>

      {/* Secondary: GitHub */}
      <a
        href="https://github.com/ViktorGabriel"
        target="_blank"
        rel="noopener noreferrer"
        className={[
          'inline-flex items-center gap-2 px-4 py-2',
          'border border-zinc-700 bg-transparent',
          'font-mono text-xs uppercase tracking-widest text-zinc-400',
          'hover:border-zinc-400 hover:text-zinc-100',
          'transition-colors duration-150',
        ].join(' ')}
      >
        <Github className="w-3.5 h-3.5" />
        <span>[ Inspect Source / GitHub ]</span>
        <ExternalLink className="w-2.5 h-2.5 text-zinc-600" />
      </a>

      {/* Micro-detail: verified timestamp */}
      <span className="font-mono text-[9px] text-zinc-600 tracking-wider whitespace-nowrap ml-auto hidden sm:block">
        LAST_UPDATED: 2026.08 // VERIFIED_ARTIFACT
      </span>
    </div>
  </div>
);

/* ─── Main Export ───────────────────────────────────────────── */

interface TechnicalDossierProps {
  avatarUrl: string;
  name: string;
}

export const TechnicalDossier: React.FC<TechnicalDossierProps> = ({ avatarUrl, name }) => {
  return (
    <section id="about" className="relative z-10 w-full">
      {/* Section label row */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-px h-5 bg-teal-400/70" />
        <p className="font-mono text-[10px] tracking-[0.4em] text-teal-400/80 uppercase select-none">
          // ABOUT // TECHNICAL DOSSIER
        </p>
        <div className="flex-1 h-px bg-zinc-800" />
        <span className="font-mono text-[9px] text-zinc-600 tracking-widest hidden sm:block">
          SYS:ENGINEER_PROFILE_v1
        </span>
      </div>

      {/* Two-column asymmetric grid */}
      <div
        className="grid grid-cols-1 lg:grid-cols-[37%_1fr] border border-zinc-800 bg-[#080808]"
        style={{ background: '#080808' }}
      >
        {/* Left column */}
        <div className="border-b lg:border-b-0 lg:border-r border-zinc-800">
          <ProfileLeft avatarUrl={avatarUrl} name={name} />
        </div>

        {/* Right column */}
        <ProfileRight />
      </div>
    </section>
  );
};
