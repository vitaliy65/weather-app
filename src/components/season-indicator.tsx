"use client";

import { motion } from "framer-motion";
import { Leaf, Sun, Wind, Snowflake } from "lucide-react";
import { useGeolocation } from "@/hooks/useGeolocation";

export function SeasonIndicator() {
  const { weather } = useGeolocation();

  const seasonConfig = {
    spring: {
      icon: Leaf,
      label: "Spring",
      color: "text-green-500",
    },
    summer: {
      icon: Sun,
      label: "Summer",
      color: "text-yellow-500",
    },
    autumn: {
      icon: Wind,
      label: "Autumn",
      color: "text-orange-500",
    },
    winter: {
      icon: Snowflake,
      label: "Winter",
      color: "text-blue-400",
    },
  };

  const config =
    seasonConfig[weather?.season as keyof typeof seasonConfig] ||
    seasonConfig.spring;
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex items-center gap-2 px-4 py-2 rounded-full card-bg-${weather?.current?.condition.toLowerCase()}`}
    >
      <Icon className={`w-5 h-5 ${config.color}`} />
      <span className="text-sm font-medium">{config.label}</span>
    </motion.div>
  );
}
