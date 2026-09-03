import React from 'react';
import { Layers, Star, GitFork, ExternalLink, Github, Sparkles, ArrowUpRight, Cpu } from 'lucide-react';
import { Project } from '@portfolio/shared';

interface ProjectBlueprintCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectBlueprintCard: React.FC<ProjectBlueprintCardProps> = ({ project, onOpenDetails }) => {
  return (
    <div
      onClick={() => onOpenDetails(project)}
      className="glass-panel glass-panel-hover rounded-2xl overflow-hidden border border-cyber-border hover:border-cyber-cyan/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-card relative"
    >
      {/* Blueprint Header Bar */}
      <div className="bg-cyber-surface/90 px-4 py-2.5 border-b border-cyber-border flex items-center justify-between font-mono text-[11px]">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-cyber-emerald animate-pulse" />
          <span className="text-cyber-muted uppercase font-bold tracking-wider">{project.category} ENGINE</span>
        </div>
        <div className="flex items-center space-x-2 text-cyber-dim">
          <span className="text-cyber-cyan">ID: {project.id.slice(0, 8)}</span>
          <span>•</span>
          <span className="text-white font-semibold">{project.primaryLanguage}</span>
        </div>
      </div>

      {/* Visual Thumbnail com Blueprint Grid Overlay */}
      <div className="relative h-52 w-full overflow-hidden bg-cyber-surface">
        <img
          src={project.thumbnailUrl}
          alt={project.displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cyber-card via-transparent to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {project.isPinned && (
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-cyber-cyan/90 text-black flex items-center space-x-1 shadow-glow-cyan">
              <Sparkles className="w-3 h-3" />
              <span>FLAGSHIP SYSTEM</span>
            </span>
          )}
        </div>

        {/* Blueprint Quick Action Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-cyber-surface/90 backdrop-blur-md border border-cyber-border text-white group-hover:bg-cyber-cyan group-hover:text-black transition flex items-center space-x-1.5 shadow-lg"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Inspecionar Blueprint</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-bold text-lg text-white group-hover:text-cyber-cyan transition">
              {project.displayName}
            </h3>
            <div className="flex items-center space-x-1.5">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-cyber-muted hover:text-white hover:bg-cyber-border transition"
                title="Ver Código Fonte"
              >
                <Github className="w-4 h-4" />
              </a>
              {project.homepageUrl && (
                <a
                  href={project.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-cyber-muted hover:text-white hover:bg-cyber-border transition"
                  title="Abrir Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-cyber-muted leading-relaxed line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* Architecture Highlights Pillbox */}
        <div className="space-y-3 pt-3 border-t border-cyber-border/60">
          <div className="flex flex-wrap gap-1.5">
            {project.architecture.slice(0, 2).map((arch, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-[11px] font-mono bg-cyber-surface border border-cyber-border/80 text-cyber-cyan"
              >
                <Cpu className="w-3 h-3 text-cyber-cyan" />
                <span>{arch.title}</span>
              </span>
            ))}
          </div>

          {/* Metrics & Languages Footer */}
          <div className="flex items-center justify-between text-xs font-mono text-cyber-dim pt-1">
            <div className="flex items-center space-x-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.languageColor }}
              />
              <span className="text-white font-medium">{project.primaryLanguage}</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-cyber-muted hover:text-yellow-400 transition">
                <Star className="w-3.5 h-3.5" />
                <span>{project.metrics.stars}</span>
              </span>
              <span className="flex items-center space-x-1 text-cyber-muted hover:text-cyber-cyan transition">
                <GitFork className="w-3.5 h-3.5" />
                <span>{project.metrics.forks}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};