import React from 'react';
import { Project } from '@portfolio/shared';
import { Code2, ArrowRight, ShieldCheck, Github } from 'lucide-react';

interface CoreSystemCardProps {
  project: Project;
  onOpenDetails: (p: Project) => void;
}

export const CoreSystemCard: React.FC<CoreSystemCardProps> = ({ project, onOpenDetails }) => {
  return (
    <div className="flex flex-col bg-[#0a0a0a] border border-zinc-800 rounded-sm overflow-hidden group hover:border-zinc-700 transition-colors">
      
      {/* ── Top: Code Snippet (Replaces stock image) ── */}
      <div className="relative h-48 bg-[#050505] border-b border-zinc-800 p-4 overflow-hidden">
        <div className="absolute top-2 left-3 flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
          <div className="w-2 h-2 rounded-full bg-zinc-700" />
        </div>
        
        {project.codeSnippet ? (
          <pre className="mt-4 font-mono text-[10px] sm:text-xs text-zinc-300 overflow-x-auto">
            <code>{project.codeSnippet}</code>
          </pre>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Code2 className="w-8 h-8 text-zinc-800" />
          </div>
        )}
        
        {/* Subtle vignette/fade at bottom of code block */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
      </div>

      {/* ── Bottom: Details & Specs ── */}
      <div className="flex flex-col flex-1 p-5 md:p-6 bg-[#121212]">
        <div className="flex items-start justify-between mb-3">
          <h4 className="font-display text-lg font-bold text-zinc-100 tracking-tight">
            {project.displayName}
          </h4>
          <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" onClick={(e) => e.stopPropagation()}>
            <Github className="w-4 h-4" />
          </a>
        </div>

        {project.executiveSpec && (
          <div className="space-y-4 mb-6 flex-1">
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">PROBLEM SPACE</span>
              <p className="font-body text-xs text-zinc-300 leading-relaxed line-clamp-3">
                {project.executiveSpec.problem}
              </p>
            </div>
            <div className="space-y-1">
              <span className="font-mono text-[9px] tracking-widest text-zinc-500 uppercase">ARCH HIGHLIGHT</span>
              <p className="font-body text-xs text-zinc-200 leading-relaxed font-medium line-clamp-3">
                {project.executiveSpec.archHighlight}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-800/50">
          <div className="flex gap-2">
            {project.topics.slice(0, 2).map(topic => (
              <span key={topic} className="px-1.5 py-0.5 bg-[#050505] border border-zinc-700 font-mono text-[9px] text-zinc-400">
                {topic}
              </span>
            ))}
          </div>
          <button 
            onClick={() => onOpenDetails(project)}
            className="flex items-center gap-1 font-mono text-[10px] font-bold text-zinc-400 hover:text-[#00FFFF] transition-colors"
          >
            <span>INSPECT</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        
        {project.verifiedViaReadme && (
           <div className="mt-3 flex items-center gap-1">
             <ShieldCheck className="w-3 h-3 text-teal-600" />
             <span className="font-mono text-[8px] text-teal-600 tracking-widest uppercase">DOCS: VERIFIED VIA README</span>
           </div>
        )}
      </div>
    </div>
  );
};