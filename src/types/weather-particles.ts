export type ParticleDirection = "left" | "right" | "up" | "down";

export interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  length: number;
  direction: ParticleDirection;
}

export interface WeatherEffectConfig {
  count: number;
  size: number;
  opacity: number;
  length: number;
  direction: ParticleDirection;
  draw: (ctx: CanvasRenderingContext2D, particle: Particle) => void;
}
