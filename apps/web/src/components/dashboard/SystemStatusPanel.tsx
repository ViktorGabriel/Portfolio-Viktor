import React, { useState, useEffect } from 'react';
import { Zap, ShieldCheck, Activity, Server, Cpu } from 'lucide-react';

interface SystemStatusPanelProps {
  isCached?: boolean;
  totalProjects: number;
}

interface Metric {
  key: string;
  label: string;
  value: string;
  unit: string;
  color: string;
  Icon: React.ComponentType<{ className?: string }>;
  subtext: string;
}

export const SystemStatusPanel: React.FC<SystemStatusPanelProps> = ({ isCached, totalProjects }) => {
  const [latency, setLatency] = useState(1.6);
  const [load, setLoad] = useState(87);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(+(1.1 + Math.random() * 0.9).toFixed(1));
      setLoad(Math.floor(80 + Math.random() * 15));
      setTick(t => t + 1);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  const metrics: Metric[] = [
    {
      key: 'latency',
      label: 'BFF LATENCY',
      value: isCached ? String(latency) : '14.2',
      unit: 'ms',
      color: '#00FFFF',
      Icon: Zap,
      subtext: isCached ? 'Cache HIT (InMemory)' : 'Cold fetch',
    },
    {
      key: 'sla',
      label: 'AVAILABILITY SLA',
      value: '99.99',
      unit: '%',
      color: '#FFD700',
      Icon: Activity,
      subtext: 'Zero downtime target',
    },
    {
      key: 'arch',
      label: 'SOLID COMPLIANCE',
      value: '100',
      unit: '/100',
      color: '#FF00FF',
      Icon: ShieldCheck,
      subtext: 'DIP + Clean Arch validated',
    },
    {
      key: 'engines',
      label: 'ACTIVE ENGINES',
      value: String(totalProjects),
      unit: 'sys',
      color: '#00FFFF',
      Icon: Server,
      subtext: 'Microservices & APIs',
    },
    {
      key: 'load',
      label: 'SYSTEM LOAD',
      value: String(load),
      unit: '%',
      color: '#FFD700',
      Icon: Cpu,
      subtext: `Tick #${tick} • Auto-refresh`,
    },
  ];

  return (
    <section id="telemetry" className="relative z-10 py-6">
      {/* Section header */}
      <div className="flex items-center space-x-3 mb-5">
        <div className="w-px h-6 bg-[#00FFFF]" />
        <h2 className="font-display text-xs tracking-[0.4em] text-[#00FFFF] uppercase">
          // LIVE SYSTEM TELEMETRY &amp; KPIs
        </h2>
        <div className="flex-1 h-px bg-gradient-to-r from-[#00FFFF22] to-transparent" />
        <span className="text-[10px] font-mono text-ink-lo">
          REAL-TIME • {new Date().toLocaleTimeString()}
        </span>
      </div>

      {/* Metrics grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {metrics.map(({ key, label, value, unit, color, Icon, subtext }) => (
          <div
            key={key}
            className="relative glass rounded-sm p-4 overflow-hidden group hover:scale-[1.02] transition-transform duration-200 corner-tick"
            style={{ borderColor: `${color}18` }}
          >
            {/* Glow in BG */}
            <div
              className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"
              style={{ background: color }}
            />

            <div className="flex items-center justify-between text-[10px] font-mono text-ink-lo mb-2">
              <span className="tracking-widest">{label}</span>
              <span style={{ color }}><Icon className="w-3.5 h-3.5" /></span>
            </div>

            <div className="flex items-baseline space-x-1">
              <span className="text-2xl font-display font-bold" style={{ color }}>
                {value}
              </span>
              <span className="text-xs font-mono text-ink-lo">{unit}</span>
            </div>

            <p className="text-[10px] font-mono text-ink-lo mt-1.5 leading-snug">{subtext}</p>

            {/* Bottom accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, ${color}40, transparent)` }} />
          </div>
        ))}
      </div>
    </section>
  );
};
