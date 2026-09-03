import React from 'react';
import { Users, MapPin, Building, Link as LinkIcon, Smile, Send, Check } from 'lucide-react';
import { Profile } from '@portfolio/shared';

interface ProfileSidebarProps {
  profile: Profile;
  onContactClick: () => void;
}

export const ProfileSidebar: React.FC<ProfileSidebarProps> = ({ profile, onContactClick }) => {
  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* Avatar & Identidade */}
      <div className="flex flex-row lg:flex-col items-center lg:items-start gap-4">
        <div className="relative group">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-24 h-24 sm:w-36 sm:h-36 lg:w-64 lg:h-64 rounded-full border-2 border-gh-border shadow-xl object-cover bg-gh-muted"
          />
          <div className="hidden lg:flex absolute bottom-2 right-2 p-2 rounded-full bg-gh-subtle border border-gh-border text-gh-textMuted hover:text-white transition shadow cursor-pointer">
            <Smile className="w-4 h-4 text-yellow-400" />
          </div>
        </div>

        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-bold text-gh-text leading-tight">{profile.name}</h1>
          <p className="text-base text-gh-textMuted font-mono">@{profile.username}</p>
        </div>
      </div>

      {/* Status GitHub */}
      <div className="p-3 rounded-lg bg-gh-subtle border border-gh-border text-xs text-gh-text flex items-center space-x-2">
        <span className="text-base">🚀</span>
        <span className="font-medium text-gh-textMuted">{profile.status}</span>
      </div>

      {/* Bio */}
      <p className="text-sm text-gh-text leading-relaxed">
        {profile.bio}
      </p>

      {/* CTA Button estilo GitHub */}
      <button
        onClick={onContactClick}
        className="w-full py-2 px-4 rounded-md bg-gh-muted hover:bg-gh-border border border-gh-border text-gh-text font-semibold text-sm transition flex items-center justify-center space-x-2"
      >
        <Send className="w-4 h-4 text-gh-accent" />
        <span>Entrar em Contato</span>
      </button>

      {/* Métricas sociais do GitHub */}
      <div className="flex items-center space-x-4 text-xs text-gh-textMuted">
        <div className="flex items-center space-x-1 hover:text-gh-accent transition cursor-pointer">
          <Users className="w-4 h-4" />
          <span className="font-bold text-gh-text">{profile.followers}</span>
          <span>followers</span>
        </div>
        <span>•</span>
        <div className="flex items-center space-x-1 hover:text-gh-accent transition cursor-pointer">
          <span className="font-bold text-gh-text">{profile.following}</span>
          <span>following</span>
        </div>
      </div>

      {/* Localização, Empresa, Link */}
      <div className="space-y-2 text-xs text-gh-textMuted border-t border-gh-border pt-4">
        {profile.company && (
          <div className="flex items-center space-x-2">
            <Building className="w-4 h-4 flex-shrink-0" />
            <span className="text-gh-text">{profile.company}</span>
          </div>
        )}
        {profile.location && (
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>{profile.location}</span>
          </div>
        )}
        <div className="flex items-center space-x-2">
          <LinkIcon className="w-4 h-4 flex-shrink-0" />
          <a
            href={profile.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gh-accent hover:underline truncate"
          >
            {profile.githubUrl.replace('https://', '')}
          </a>
        </div>
      </div>

      {/* Habilidades & Tecnologias */}
      <div className="border-t border-gh-border pt-4 space-y-2">
        <h3 className="text-xs font-semibold text-gh-text uppercase tracking-wider">
          Principais Tecnologias
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {profile.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md text-xs font-mono bg-gh-subtle border border-gh-border text-gh-text"
            >
              <Check className="w-3 h-3 text-gh-success" />
              <span>{skill}</span>
            </span>
          ))}
        </div>
      </div>
    </aside>
  );
};
