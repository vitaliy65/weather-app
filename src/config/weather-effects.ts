import type { WeatherEffectConfig, Particle } from "@/types/weather-particles";

export const weatherEffects: Record<string, WeatherEffectConfig> = {
  rain: {
    count: 150,
    size: 2,
    opacity: 0.3,
    length: 15,
    direction: "down",
    draw: (ctx, p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.strokeStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.lineWidth = p.size;
      ctx.moveTo(p.x, p.y);
      ctx.lineTo(p.x, p.y + p.length);
      ctx.stroke();
      ctx.restore();
    },
  },
  snow: {
    count: 100,
    size: 3,
    opacity: 0.4,
    length: 1,
    direction: "down",
    draw: (ctx, p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.opacity})`;
      ctx.fill();
      ctx.restore();
    },
  },
  // Пример для облаков, можно расширять
  cloud: {
    count: 0,
    size: 0,
    opacity: 0.0,
    length: 0,
    direction: "down",
    draw: (ctx, p) => {
      ctx.save();
      ctx.globalAlpha = p.opacity * 0.2;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * 8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.opacity * 0.2})`;
      ctx.fill();
      ctx.restore();
    },
  },
  // Для новых погодных эффектов просто добавьте новый объект!
  default: {
    count: 0,
    size: 0,
    opacity: 0,
    length: 0,
    direction: "right",
    draw: () => {},
  },
};
