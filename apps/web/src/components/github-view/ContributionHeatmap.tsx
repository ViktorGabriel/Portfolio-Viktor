import React from 'react';
import { Calendar, GitCommit, Flame, Award } from 'lucide-react';

export const ContributionHeatmap: React.FC = () => {
  // Generate a mock matrix of 52 weeks x 7 days
  const weeks = Array.from({ length: 42 }, (_, wIndex) => {
    return Array.from({ length: 7 }, (_, dIndex) => {
      // Deterministic activity variation
      const val = (wIndex * 3 + dIndex * 7) % 10;
      if (val > 7) return 3; // high
      if (val > 4) return 2; // medium
      if (val > 2) return 1; // low
      return 0; // none
    });
  });

  const getColor = (level: number) => {
    switch (level) {
      case 3:
        return 'bg-[#39d353]';
      case 2:
        return 'bg-[#26a641]';
      case 1:
        return 'bg-[#0e4429]';
      default:
        return 'bg-[#161b22] border border-gh-border/30';
    }
  };

  return (
    <div className="rounded-xl border border-gh-border bg-gh-subtle p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gh-border/60 pb-3">
        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gh-accent" />
          <h2 className="text-sm font-semibold text-gh-text">
            Histórico de Contribuições e Entregas
          </h2>
        </div>
        <div className="flex items-center space-x-4 text-xs text-gh-textMuted font-mono">
          <span className="flex items-center space-x-1">
            <GitCommit className="w-3.5 h-3.5 text-gh-success" />
            <strong className="text-gh-text">840+</strong> commits
          </span>
          <span className="flex items-center space-x-1">
            <Flame className="w-3.5 h-3.5 text-orange-400" />
            <strong className="text-gh-text">42 dias</strong> streak
          </span>
          <span className="flex items-center space-x-1">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <strong className="text-gh-text">100%</strong> code review
          </span>
        </div>
      </div>

      {/* Grid do Heatmap */}
      <div className="overflow-x-auto pb-2">
        <div className="inline-flex gap-1 min-w-[680px]">
          {weeks.map((week, w) => (
            <div key={w} className="flex flex-col gap-1">
              {week.map((level, d) => (
                <div
                  key={d}
                  className={`w-3 h-3 rounded-sm transition-transform hover:scale-125 cursor-pointer ${getColor(
                    level
                  )}`}
                  title={`Nível de atividade: ${level}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-between text-xs text-gh-textMuted pt-2">
        <span className="text-xs">Consistência e rigor técnico contínuos</span>
        <div className="flex items-center space-x-1.5">
          <span>Menos</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-[#161b22] border border-gh-border/30" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#0e4429]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#26a641]" />
          <div className="w-2.5 h-2.5 rounded-sm bg-[#39d353]" />
          <span>Mais</span>
        </div>
      </div>
    </div>
  );
};
