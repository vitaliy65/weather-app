"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// S: Single Responsibility Principle
// Каждый класс/функция отвечает только за одну задачу

interface WeatherBackgroundProps {
  condition: string;
}

// O: Open/Closed Principle
// Легко расширять новые погодные эффекты, не меняя существующий код

type ParticleDirection = "left" | "right" | "up" | "down";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  length: number;
  direction: ParticleDirection;
}

interface WeatherEffectConfig {
  count: number;
  size: number;
  opacity: number;
  length: number;
  direction: ParticleDirection;
}

const WEATHER_EFFECTS: Record<string, WeatherEffectConfig> = {
  rain: {
    count: 150,
    size: 2,
    opacity: 0.3,
    length: 15,
    direction: "down",
  },
  snow: {
    count: 100,
    size: 3,
    opacity: 0.4,
    length: 1,
    direction: "down",
  },
  cloud: {
    count: 0,
    size: 0,
    opacity: 0.0,
    length: 0,
    direction: "down",
  },
  default: {
    count: 0,
    size: 0,
    opacity: 0,
    length: 0,
    direction: "right",
  },
};

// L: Liskov Substitution Principle
// Любой новый погодный эффект должен работать с тем же интерфейсом

function getWeatherKey(condition: string): string {
  const lower = condition.toLowerCase();
  if (lower.includes("rain")) return "rain";
  if (lower.includes("storm")) return "rain";
  if (lower.includes("snow")) return "snow";
  if (lower.includes("cloud")) return "cloud";
  return "default";
}

// I: Interface Segregation Principle
// Используем отдельные функции для генерации и отрисовки частиц

function createParticles(
  canvas: HTMLCanvasElement,
  config: WeatherEffectConfig,
  key: string
): Particle[] {
  const particles: Particle[] = [];
  for (let i = 0; i < config.count; i++) {
    const particleSize = config.size + Math.random();
    const particleOpacity = config.opacity + Math.random() * 0.2 - 0.1;
    const particleLength =
      key === "rain" ? config.length + Math.random() * 10 : config.length;
    const particleDirection = config.direction;

    let vx = 0,
      vy = 0;
    switch (particleDirection) {
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
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx,
      vy,
      size: particleSize,
      opacity: Math.max(0, Math.min(1, particleOpacity)),
      length: particleLength,
      direction: particleDirection,
    });
  }
  return particles;
}

function drawParticle(
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  key: string
) {
  ctx.save();
  ctx.globalAlpha = particle.opacity;

  if (key === "rain") {
    ctx.beginPath();
    ctx.strokeStyle = `rgba(255,255,255,${particle.opacity})`;
    ctx.lineWidth = particle.size;
    ctx.moveTo(particle.x, particle.y);
    ctx.lineTo(particle.x, particle.y + particle.length);
    ctx.stroke();
  } else if (key === "snow") {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${particle.opacity})`;
    ctx.fill();
  } else if (key === "cloud") {
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size * 8, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${particle.opacity * 0.2})`;
    ctx.fill();
  }

  ctx.restore();
}

// D: Dependency Inversion Principle
// Высокоуровневый модуль (WeatherBackground) не зависит от деталей генерации/отрисовки

export function WeatherBackground({ condition }: WeatherBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const key = getWeatherKey(condition);
    const config = WEATHER_EFFECTS[key];
    let particles = createParticles(canvas, config, key);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // Обновляем позицию
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Сброс частицы, если она выходит за пределы экрана
        switch (particle.direction) {
          case "down":
            if (particle.y > canvas.height) {
              particle.y = -10;
              particle.x = Math.random() * canvas.width;
            }
            break;
          case "up":
            if (particle.y < -10) {
              particle.y = canvas.height + 10;
              particle.x = Math.random() * canvas.width;
            }
            break;
          case "left":
            if (particle.x < -10) {
              particle.x = canvas.width + 10;
              particle.y = Math.random() * canvas.height;
            }
            break;
          case "right":
            if (particle.x > canvas.width + 10) {
              particle.x = -10;
              particle.y = Math.random() * canvas.height;
            }
            break;
          default:
            if (particle.y > canvas.height) {
              particle.y = -10;
              particle.x = Math.random() * canvas.width;
            }
            if (particle.x > canvas.width) {
              particle.x = 0;
            }
            if (particle.x < 0) {
              particle.x = canvas.width;
            }
        }

        drawParticle(ctx, particle, key);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      // Пересоздаём частицы при изменении размера
      particles = createParticles(canvas, config, key);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [condition]);

  // Показываем частицы только для определённых погодных условий
  const key = getWeatherKey(condition);
  if (!["rain", "snow", "cloud"].includes(key)) {
    return null;
  }

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="weather-particles"
    />
  );
}
