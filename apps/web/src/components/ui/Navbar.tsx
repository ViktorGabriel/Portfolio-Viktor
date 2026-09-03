import React from 'react';
import { Github, Terminal, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  isCached?: boolean;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ isCached, onNavigate }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gh-border bg-gh-header/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onNavigate('hero')}>
          <div className="p-2 bg-gh-muted rounded-full border border-gh-border text-gh-text hover:text-white transition">
            <Github className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gh-text hover:text-gh-accent transition text-sm sm:text-base">
              ViktorGabriel
            </span>
            <span className="text-gh-textMuted">/</span>
            <span className="text-gh-text font-bold text-sm sm:text-base">Portfolio</span>
            <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gh-muted text-gh-accent border border-gh-border">
              v2.0 • Clean Arch
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <button
            onClick={() => onNavigate('hero')}
            className="text-gh-textMuted hover:text-gh-text transition"
          >
            Início
          </button>
          <button
            onClick={() => onNavigate('profile-view')}
            className="text-gh-textMuted hover:text-gh-text transition flex items-center space-x-1"
          >
            <span>Perfil GitHub</span>
          </button>
          <button
            onClick={() => onNavigate('showcase')}
            className="text-gh-textMuted hover:text-gh-text transition flex items-center space-x-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-gh-accent" />
            <span>Projetos & Mockups</span>
          </button>
          <button
            onClick={() => onNavigate('terminal')}
            className="text-gh-textMuted hover:text-gh-text transition flex items-center space-x-1"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          {isCached && (
            <span className="hidden sm:inline-flex items-center space-x-1 text-xs px-2 py-1 rounded bg-gh-success/10 text-gh-success border border-gh-success/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>BFF Cache Active</span>
            </span>
          )}
          <a
            href="https://github.com/ViktorGabriel"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-gh-muted border border-gh-border text-gh-text hover:bg-gh-border transition"
          >
            <span>GitHub Real</span>
            <ExternalLink className="w-3 h-3 text-gh-textMuted" />
          </a>
        </div>
      </div>
    </header>
  );
};
