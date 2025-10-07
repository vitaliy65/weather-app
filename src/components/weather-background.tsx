"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { weatherEffects } from "@/config/weather-effects";
import { getWeatherKey } from "@/utils/getWeatherKey";
import { createParticles } from "@/utils/createParticles";
import type { Particle } from "@/types/weather-particles";

export function WeatherBackground({ condition }: { condition: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const key = getWeatherKey(condition);
    const config = weatherEffects[key] || weatherEffects.default;
    let particles: Particle[] = createParticles(
      canvas.width,
      canvas.height,
      config,
      key
    );

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        // Обновление позиции
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Сброс частицы, если она вышла за экран
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

        config.draw(ctx, particle);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      resize();
      particles = createParticles(canvas.width, canvas.height, config, key);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [condition]);

  // Показываем только для погод с эффектами
  const key = getWeatherKey(condition);
  if (
    !Object.keys(weatherEffects).includes(key) ||
    weatherEffects[key].count === 0
  ) {
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
