import type { WeatherEffectConfig, Particle } from "@/types/weather-particles";

export function createParticles(
  width: number,
  height: number,
  config: WeatherEffectConfig,
  key: string
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < config.count; i++) {
    const size = config.size + Math.random();
    const opacity = Math.max(
      0,
      Math.min(1, config.opacity + Math.random() * 0.2 - 0.1)
    );
    const length =
      key === "rain" ? config.length + Math.random() * 10 : config.length;
    const direction = config.direction;

    let vx = 0,
      vy = 0;
    switch (direction) {
      case "down":
        vx = (Math.random() - 0.5) * 2;
        vy = key === "rain" ? Math.random() * 5 + 5 : Math.random() * 2 + 1;
        break;
      case "up":
        vx = (Math.random() - 0.5) * 2;
        vy = -(Math.random() * 2 + 1);
        break;
      case "left":
        vx = -(Math.random() * 2 + 1);
        vy = (Math.random() - 0.5) * 2;
        break;
      case "right":
        vx = Math.random() * 2 + 1;
        vy = (Math.random() - 0.5) * 2;
        break;
      default:
        vx = Math.random() * 2 - 1;
        vy = Math.random() * 2 - 1;
    }

    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx,
      vy,
      size,
      opacity,
      length,
      direction,
    });
  }
  return particles;
}
