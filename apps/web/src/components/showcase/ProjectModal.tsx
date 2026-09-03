import React from 'react';
import { X, Github, ExternalLink, Layers, CheckCircle2, ShieldAlert } from 'lucide-react';
import { Project } from '@portfolio/shared';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-gh-border bg-gh-subtle shadow-2xl p-6 sm:p-8 space-y-6 text-gh-text"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gh-textMuted hover:text-white hover:bg-gh-muted transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header do Modal */}
        <div className="space-y-2 border-b border-gh-border pb-4">
          <div className="flex items-center space-x-2">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: project.languageColor }}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-gh-accent">
              {project.category} • {project.primaryLanguage}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">{project.displayName}</h2>
          <p className="text-sm text-gh-textMuted leading-relaxed">{project.description}</p>
        </div>

        {/* Thumbnail Preview no Modal */}
        <div className="rounded-xl overflow-hidden border border-gh-border h-56 bg-gh-muted">
          <img
            src={project.thumbnailUrl}
            alt={project.displayName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Destaques Arquiteturais (Clean Architecture & SOLID) */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gh-accent flex items-center space-x-2">
            <Layers className="w-4 h-4" />
            <span>Destaques de Arquitetura & Padrões de Projeto</span>
          </h3>

          <div className="grid gap-3">
            {project.architecture.map((arch, index) => (
              <div
                key={index}
                className="p-3.5 rounded-lg bg-gh-canvas border border-gh-border space-y-1"
              >
                <h4 className="text-xs font-bold text-white flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-gh-success" />
                  <span>{arch.title}</span>
                </h4>
                <p className="text-xs text-gh-textMuted leading-relaxed">
                  {arch.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Desafios Técnicos Resolvidos */}
        {project.challenges.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-yellow-400 flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4" />
              <span>Desafios Técnicos e Complexidade Superada</span>
            </h3>
            <ul className="space-y-1.5">
              {project.challenges.map((challenge, idx) => (
                <li key={idx} className="text-xs text-gh-text flex items-start space-x-2">
                  <span className="text-yellow-400 mt-0.5">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Links de Ação */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-gh-border">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gh-muted hover:bg-gh-border border border-gh-border text-xs font-semibold text-white transition flex items-center justify-center space-x-2"
          >
            <Github className="w-4 h-4" />
            <span>Ver Repositório no GitHub</span>
          </a>

          {project.homepageUrl && (
            <a
              href={project.homepageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2 rounded-lg bg-gh-accent hover:bg-blue-600 text-xs font-semibold text-white transition flex items-center justify-center space-x-2"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Acessar Demonstração</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

