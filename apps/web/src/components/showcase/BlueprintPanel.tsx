import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, GitFork, ExternalLink, Github, FileCode2, Zap, Activity, Cpu } from 'lucide-react';
import { Project } from '@portfolio/shared';

interface BlueprintPanelProps {
  project: Project;
  onOpenDetails: (p: Project) => void;
  variant?: 'featured' | 'standard' | 'compact';
  perfMetric?: string;
}

// Animated architecture diagram for card hover overlay
const ArchDiagram: React.FC<{ color: string }> = ({ color }) => (
  <svg className="w-full h-full opacity-80" viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
    {/* Nodes */}
    {[
      { cx: 25, cy: 60, label: 'CLIENT' },
      { cx: 80, cy: 30, label: 'BFF' },
      { cx: 80, cy: 90, label: 'CACHE' },
      { cx: 145, cy: 60, label: 'DOMAIN' },
      { cx: 185, cy: 60, label: 'DB' },
    ].map(({ cx, cy, label }) => (
      <g key={label}>
        <rect x={cx - 20} y={cy - 10} width={40} height={20} rx={3}
          fill={`${color}15`} stroke={`${color}60`} strokeWidth={0.8} />
        <text x={cx} y={cy + 4} textAnchor="middle" fontSize={6} fill={color} fontFamily="Space Mono">
          {label}
        </text>
      </g>
    ))}
    {/* Edges */}
    {[
      [45, 50, 60, 35], [45, 70, 60, 85],
      [100, 35, 125, 55], [100, 85, 125, 65],
      [165, 60, 175, 60]
    ].map(([x1, y1, x2, y2], i) => (
      <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
        stroke={`${color}40`} strokeWidth={0.8} strokeDasharray="3 4" />
    ))}
  </svg>
);

export const BlueprintPanel: React.FC<BlueprintPanelProps> = ({
  project,
  onOpenDetails,
  variant = 'standard',
  perfMetric,
}) => {
  const [hovered, setHovered] = useState(false);

  const isFeatured = variant === 'featured';
  const accentColor = isFeatured ? '#00FFFF' : project.isPinned ? '#FF00FF' : '#FFD700';

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onClick={() => onOpenDetails(project)}
      className={`relative glass rounded-sm overflow-hidden cursor-pointer group transition-all duration-300 ${
        isFeatured ? 'md:col-span-2' : ''
      }`}
      style={{
        borderColor: hovered ? `${accentColor}40` : 'rgba(255,255,255,0.06)',
        boxShadow: hovered ? `0 0 30px ${accentColor}22` : '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {/* ── Header bar with category & ID ──────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#07090e]/90 border-b border-white/[0.06]">
        <div className="flex items-center space-x-2">
          <span
            className="w-1.5 h-1.5 rounded-full animate-pulse-slow"
            style={{ background: accentColor }}
          />
          <span className="font-mono text-[10px] font-bold tracking-widest text-ink-mid uppercase">
            {project.category} ENGINE
          </span>
        </div>
        <div className="flex items-center space-x-2 font-mono text-[10px]">
          <span className="text-ink-lo">ID: {project.id.slice(0, 8)}</span>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: project.languageColor }} />
          <span className="text-ink-mid font-bold">{project.primaryLanguage}</span>
        </div>
      </div>

      {/* ── Thumbnail / Architecture visualization ─────────────── */}
      <div
        className={`relative w-full overflow-hidden bg-[#050505] ${
          isFeatured ? 'h-60 sm:h-72' : 'h-44 sm:h-48'
        }`}
      >
        {/* Static image */}
        <img
          src={project.thumbnailUrl}
          alt={project.displayName}
          className={`w-full h-full object-cover transition-all duration-700 ${
            hovered ? 'opacity-25 scale-105' : 'opacity-60'
          }`}
          loading="lazy"
        />

        {/* On-hover: Architecture diagram overlay (animated code/diagram) */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-[90%] h-[70%]">
            <ArchDiagram color={accentColor} />
          </div>
        </div>

        {/* Scanlines */}
        <div className="absolute inset-0 scanlines pointer-events-none" />

        {/* Gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#05050566]" />

        {/* Featured badge */}
        {isFeatured && (
          <span
            className="absolute top-3 left-3 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-black rounded-sm"
            style={{ background: accentColor, boxShadow: `0 0 16px ${accentColor}88` }}
          >
            ★ FLAGSHIP SYSTEM
          </span>
        )}

        {/* Perf metric */}
        {perfMetric && (
          <div
            className="absolute bottom-3 left-3 flex items-center space-x-2 px-3 py-1.5 rounded-sm glass font-mono text-[11px]"
            style={{ borderColor: `${accentColor}40`, color: accentColor }}
          >
            <Zap className="w-3 h-3" />
            <span>{perfMetric}</span>
          </div>
        )}

        {/* Inspect Blueprint button */}
        <button
          onClick={(e) => { e.stopPropagation(); onOpenDetails(project); }}
          className="absolute bottom-3 right-3 flex items-center space-x-1.5 px-3 py-1.5 rounded-sm glass font-mono text-[11px] text-ink-mid hover:text-white transition border border-white/10 hover:border-white/30"
        >
          <FileCode2 className="w-3.5 h-3.5" style={{ color: accentColor }} />
          <span>View Blueprint</span>
        </button>
      </div>

      {/* ── Card body ────────────────────────────────────────────── */}
      <div className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-display text-lg sm:text-xl font-bold text-ink-hi leading-tight group-hover:transition-colors"
            style={{ color: hovered ? accentColor : undefined }}
          >
            {project.displayName}
          </h3>

          <div className="flex items-center space-x-1.5 flex-shrink-0">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="p-1.5 rounded text-ink-lo hover:text-white hover:bg-white/5 transition"
            >
              <Github className="w-4 h-4" />
            </a>
            {project.homepageUrl && (
              <a href={project.homepageUrl} target="_blank" rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded text-ink-lo hover:text-white hover:bg-white/5 transition"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>

        <p className="font-body text-sm text-ink-mid leading-relaxed line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack (detailed on featured) */}
        <div className="space-y-2 border-t border-white/[0.05] pt-3">
          <span className="font-mono text-[10px] tracking-widest text-ink-lo uppercase">TECH STACK & PATTERNS:</span>
          <div className="flex flex-wrap gap-1.5">
            {project.topics.slice(0, isFeatured ? 6 : 3).map((t) => (
              <span key={t} className="px-2 py-0.5 rounded-sm font-mono text-[10px] bg-white/[0.04] border border-white/[0.08]"
                style={{ color: accentColor }}>
                #{t}
              </span>
            ))}
            {project.architecture.slice(0, isFeatured ? 3 : 1).map((a, i) => (
              <span key={i} className="flex items-center space-x-1 px-2 py-0.5 rounded-sm font-mono text-[10px] bg-white/[0.04] border border-white/[0.08] text-ink-mid">
                <Activity className="w-2.5 h-2.5" />
                <span>{a.title}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Footer metrics */}
        <div className="flex items-center justify-between font-mono text-[11px] pt-1">
          <div className="flex items-center space-x-1 text-ink-lo">
            <Cpu className="w-3 h-3" />
            <span>SLA:</span>
            <span className="font-bold" style={{ color: '#FFD700' }}>99.99%</span>
          </div>
          <div className="flex items-center space-x-3 text-ink-lo">
            <span className="flex items-center space-x-1 hover:text-yellow-400 transition">
              <Star className="w-3.5 h-3.5" />
              <span>{project.metrics.stars}</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-[#00FFFF] transition">
              <GitFork className="w-3.5 h-3.5" />
              <span>{project.metrics.forks}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Left accent stripe */}
      <div
        className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
        style={{ background: hovered ? `linear-gradient(to bottom, ${accentColor}, transparent)` : 'transparent' }}
      />
    </motion.div>
  );
};
