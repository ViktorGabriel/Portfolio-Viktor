import React from 'react';
import { Star, GitFork, ExternalLink, Github, Sparkles, Layers } from 'lucide-react';
import { Project } from '@portfolio/shared';

interface ProjectCardProps {
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetails }) => {
  return (
    <div className="group rounded-xl border border-gh-border bg-gh-subtle hover:border-gh-accent/60 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-gh-accent/5">
      {/* Imagem Mockup Ilustrativa com Efeito Hover */}
      <div className="relative h-48 w-full overflow-hidden bg-gh-muted cursor-pointer" onClick={() => onOpenDetails(project)}>
        <img
          src={project.thumbnailUrl}
          alt={project.displayName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gh-subtle via-transparent to-black/30" />

        <div className="absolute top-3 left-3 flex gap-2">
          {project.isPinned && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-gh-accent text-white flex items-center space-x-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Pinned</span>
            </span>
          )}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-gh-text border border-white/10 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenDetails(project);
          }}
          className="absolute bottom-3 right-3 px-2.5 py-1 rounded-md text-xs font-medium bg-gh-canvas/80 backdrop-blur-md border border-gh-border text-gh-text group-hover:bg-gh-accent group-hover:text-white transition flex items-center space-x-1"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Ver Arquitetura</span>
        </button>
      </div>

      {/* Conteúdo do Card */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3
              onClick={() => onOpenDetails(project)}
              className="font-bold text-base text-gh-text hover:text-gh-accent transition cursor-pointer"
            >
              {project.displayName}
            </h3>
            <div className="flex items-center space-x-2 flex-shrink-0">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 rounded text-gh-textMuted hover:text-white transition"
                title="Abrir no GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              {project.homepageUrl && (
                <a
                  href={project.homepageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 rounded text-gh-textMuted hover:text-white transition"
                  title="Abrir Demonstração"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          <p className="text-xs text-gh-textMuted line-clamp-3 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tags e Tópicos */}
        <div className="space-y-3 pt-2 border-t border-gh-border/50">
          <div className="flex flex-wrap gap-1.5">
            {project.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="px-2 py-0.5 rounded text-[11px] font-mono bg-gh-muted text-gh-accent/90 border border-gh-border/50"
              >
                #{topic}
              </span>
            ))}
          </div>

          {/* Rodapé do Card com Métricas do GitHub */}
          <div className="flex items-center justify-between text-xs text-gh-textMuted pt-1">
            <div className="flex items-center space-x-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: project.languageColor }}
              />
              <span className="font-mono text-gh-text">{project.primaryLanguage}</span>
            </div>

            <div className="flex items-center space-x-3 font-mono">
              <span className="flex items-center space-x-1 hover:text-yellow-400 transition cursor-default">
                <Star className="w-3.5 h-3.5" />
                <span>{project.metrics.stars}</span>
              </span>
              <span className="flex items-center space-x-1 hover:text-blue-400 transition cursor-default">
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
