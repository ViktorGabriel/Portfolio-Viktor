import React, { useEffect, useRef } from 'react';

const CODE_STRINGS = [
  'const cache = new InMemoryCache({ ttl: 1800 });',
  'type Result<T> = { data: T; meta: Metadata };',
  'await useCase.execute({ userId, filters });',
  'class KitchenQueueService implements IQueueService {',
  'interface IGateway<T> { fetch(id: string): Promise<T>; }',
  'export const schema = z.object({ id: z.string().uuid() });',
  'SOLID.DIP.validate(container); // 100% adherence',
  'fastify.register(cors, { origin: allowedOrigins });',
  'const latency = performance.now() - start; // 1.8ms',
  'docker build -t portfolio-api:latest --no-cache .',
];

export const NeonBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const pulse = Math.sin(t * 0.001) * 0.5 + 0.5;

      // ── Diagonal mesh lines
      ctx.save();
      ctx.strokeStyle = 'rgba(0,255,255,0.03)';
      ctx.lineWidth = 0.6;
      const step = 60;
      const shift = (t * 0.01) % step;
      for (let x = -step + shift; x < canvas.width + step; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + canvas.height * 0.25, canvas.height);
        ctx.stroke();
      }
      for (let y = -step; y < canvas.height + step; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y + shift);
        ctx.lineTo(canvas.width, y + shift);
        ctx.stroke();
      }
      ctx.restore();

      // ── Blueprint dots
      ctx.save();
      ctx.fillStyle = 'rgba(0,255,255,0.1)';
      for (let x = (t * 0.01) % step; x < canvas.width; x += step) {
        for (let y = (t * 0.01) % step; y < canvas.height; y += step) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // ── Faint code rain
      ctx.save();
      ctx.font = '10px "Space Mono", monospace';
      const cols = Math.floor(canvas.width / 240);
      for (let c = 0; c < cols; c++) {
        const x = c * 240 + 20;
        const y = ((t * 0.03 + c * 140) % (canvas.height + 200)) - 100;
        const line = CODE_STRINGS[c % CODE_STRINGS.length];
        ctx.fillStyle = `rgba(0,255,255,${0.035 + (c % 3) * 0.01})`;
        ctx.fillText(line, x, y);
      }
      ctx.restore();

      // ── Neon orbs
      const orbs = [
        { x: 0.15, y: 0.22, r: 360, color: `rgba(0,255,255,${0.06 + pulse * 0.04})` },
        { x: 0.85, y: 0.78, r: 400, color: `rgba(255,0,255,${0.05 + pulse * 0.03})` },
        { x: 0.50, y: 0.48, r: 220, color: `rgba(255,215,0,${0.025 + pulse * 0.015})` },
      ];
      orbs.forEach(({ x, y, r, color }) => {
        const g = ctx.createRadialGradient(canvas.width * x, canvas.height * y, 0, canvas.width * x, canvas.height * y, r);
        g.addColorStop(0, color);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      });
    };

    const loop = (t: number) => {
      draw(t);
      animFrameId = requestAnimationFrame(loop);
    };
    animFrameId = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};
