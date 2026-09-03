import React from 'react';
import { Star, GitFork, ExternalLink, Github, Sparkles, FileCode2, Zap, Activity, Loader2 } from 'lucide-react';
import { Project } from '@portfolio/shared';

interface ProjectBlueprintCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
  isFeatured?: boolean;
  perfMetrics?: string;
  hasSpinner?: boolean;
}

export const ProjectBlueprintCard: React.FC<ProjectBlueprintCardProps> = ({
  project,
  onOpenDetails,
  isFeatured = false,
  perfMetrics,
  hasSpinner = false
}) => {
  return (
    <div
      onClick={() => onOpenDetails(project)}
      className={`rounded-2xl overflow-hidden border border-[#1e293b] bg-[#0c121d] hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between group cursor-pointer shadow-xl relative ${
        isFeatured ? 'col-span-1 md:col-span-2' : ''
      }`}
    >
      {/* Blueprint Header Bar */}
      <div className="bg-[#080d16] px-4 py-2.5 border-b border-[#1e293b] flex items-center justify-between font-mono text-xs">
        <div className="flex items-center space-x-2">
          {hasSpinner ? (
            <Loader2 className="w-3.5 h-3.5 text-teal-400 animate-spin" />
          ) : (
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          )}
          <span className="text-slate-300 font-bold uppercase tracking-wider text-[11px]">
            {project.category} ENGINE
          </span>
          <span className="text-slate-500 text-[10px]">• ID: {project.id.slice(0, 8)}</span>
        </div>

        <div className="flex items-center space-x-2 text-[11px] text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.languageColor }} />
          <span className="text-white font-semibold">{project.primaryLanguage}</span>
        </div>
      </div>

      {/* Visual Thumbnail */}
      <div className={`relative w-full overflow-hidden bg-[#07090e] ${isFeatured ? 'h-64 sm:h-72' : 'h-48 sm:h-52'}`}>
        <img
          src={project.thumbnailUrl}
          alt={project.displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c121d] via-[#0c121d]/40 to-black/40" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          {isFeatured && (
            <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-teal-500 text-black flex items-center space-x-1.5 shadow-[0_2px_12px_rgba(20,184,166,0.5)]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>★ FLAGSHIP SYSTEM</span>
            </span>
          )}
        </div>

        {/* Micro Performance Metrics Overlay (Featured) */}
        {perfMetrics && (
          <div className="absolute bottom-3 left-3 px-3 py-1.5 rounded-lg bg-[#07090e]/90 backdrop-blur-md border border-[#1e293b] text-xs font-mono text-emerald-400 flex items-center space-x-2 shadow-lg">
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>{perfMetrics}</span>
          </div>
        )}

        {/* Subtle Realistic 'Inspect Blueprint' Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          className="absolute bottom-3 right-3 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[#0c121d]/90 backdrop-blur-md border border-slate-700 text-slate-200 group-hover:border-teal-400 group-hover:text-white transition flex items-center space-x-1.5 shadow-lg"
        >
          <FileCode2 className="w-3.5 h-3.5 text-teal-400" />
          <span>Inspect Blueprint</span>
        </button>
      </div>

      {/* Card Content Body */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-bold text-lg sm:text-xl text-white group-hover:text-teal-300 transition">
              {project.displayName}
            </h3>

            <div className="flex items-center space-x-1.5 flex-shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition"
                title="GitHub Repo"
              >
                <Github className="w-4 h-4" />
              </a>
              {project.homepageUrl && (
                <a
                  href={project.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1e293b] transition"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
            {project.description}
          </p>
        </div>

        {/* Detailed Tech Stack & Architecture Highlights */}
        <div className="space-y-3 pt-3 border-t border-[#1e293b]/70">
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Tech Stack &amp; Architecture:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.topics.map((topic) => (
                <span
                  key={topic}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-[#080d16] border border-[#1e293b] text-teal-300"
                >
                  #{topic}
                </span>
              ))}
              {project.architecture.slice(0, isFeatured ? 3 : 2).map((arch, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded text-[11px] font-mono bg-purple-950/40 border border-purple-500/30 text-purple-300 flex items-center space-x-1"
                >
                  <Activity className="w-3 h-3 text-purple-400" />
                  <span>{arch.title}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Metrics Footer */}
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-1 border-t border-[#1e293b]/40">
            <div className="flex items-center space-x-1.5">
              <span className="text-slate-400">SLA:</span>
              <span className="text-emerald-400 font-bold">99.99%</span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="flex items-center space-x-1 text-slate-400 hover:text-yellow-400 transition">
                <Star className="w-3.5 h-3.5" />
                <span>{project.metrics.stars}</span>
              </span>
              <span className="flex items-center space-x-1 text-slate-400 hover:text-teal-400 transition">
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