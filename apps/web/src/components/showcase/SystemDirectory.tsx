import React, { useState } from 'react';
import { Project } from '@portfolio/shared';
import { Terminal, Github, ShieldCheck } from 'lucide-react';

interface SystemDirectoryProps {
  projects: Project[];
  onOpenDetails: (p: Project) => void;
}

const TABS = [
  { id: 'all', label: 'ALL' },
  { id: 'api', label: 'BACKEND APIs' },
  { id: 'utilities', label: 'SYSTEM UTILITIES' }
];

export const SystemDirectory: React.FC<SystemDirectoryProps> = ({ projects, onOpenDetails }) => {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = projects.filter(p => {
    if (activeTab === 'all') return true;
    return p.category === activeTab;
  });

  return (
    <div className="w-full flex flex-col bg-[#050505] border border-zinc-800 rounded-sm">
      
      {/* ── Header & Tabs ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 p-4 gap-4 bg-[#0a0a0a]">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-zinc-500" />
          <h4 className="font-mono text-xs font-bold text-zinc-300 tracking-widest uppercase">System Directory / Engineering Index</h4>
        </div>
        <div className="flex gap-1 p-1 bg-[#121212] border border-zinc-800 rounded-sm self-start sm:self-auto">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 font-mono text-[9px] font-bold tracking-widest transition-colors ${
                activeTab === tab.id 
                  ? 'bg-zinc-800 text-zinc-100' 
                  : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Table / Log View ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-left font-mono text-[10px] sm:text-xs">
          <thead className="text-zinc-500 border-b border-zinc-800/50 bg-[#080808]">
            <tr>
              <th className="px-4 py-3 font-normal tracking-widest whitespace-nowrap">ID / SYSTEM</th>
              <th className="px-4 py-3 font-normal tracking-widest">ARCHITECTURE & FOCUS</th>
              <th className="px-4 py-3 font-normal tracking-widest hidden md:table-cell">TECH STACK</th>
              <th className="px-4 py-3 font-normal tracking-widest text-right">LINK</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/30">
            {filtered.map(project => (
              <tr 
                key={project.id}
                onClick={() => onOpenDetails(project)}
                className="group hover:bg-[#0a0a0a] transition-colors cursor-pointer"
              >
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-1">
                    <span className="text-zinc-500 tracking-widest">{project.id.slice(0,8).toUpperCase()}</span>
                    <span className="text-zinc-200 font-bold group-hover:text-[#00FFFF] transition-colors">{project.displayName}</span>
                    {project.verifiedViaReadme && (
                      <div className="flex items-center gap-1 mt-1">
                        <ShieldCheck className="w-3 h-3 text-teal-700" />
                        <span className="text-[8px] text-teal-700 tracking-widest">VERIFIED</span>
                      </div>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 align-top">
                  <div className="flex flex-col gap-2 max-w-sm">
                    <p className="text-zinc-400 font-body text-xs line-clamp-2">
                      {project.executiveSpec?.problem || project.description}
                    </p>
                    {project.executiveSpec?.archHighlight && (
                      <p className="text-zinc-300 font-medium mt-1">
                        &gt; {project.executiveSpec.archHighlight}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-4 py-4 align-top hidden md:table-cell">
                  <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                    {project.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="px-1.5 py-0.5 bg-[#121212] border border-zinc-700 text-zinc-400 text-[9px]">
                        {topic}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-4 py-4 align-top text-right">
                  <div className="flex items-center justify-end gap-3">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-white transition-colors" onClick={e => e.stopPropagation()}>
                      <Github className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-zinc-600">
                  NO SYSTEMS FOUND MATCHING FILTER
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};