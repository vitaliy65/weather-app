"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Sunrise, Sunset, Droplets, Wind, Eye, Gauge } from "lucide-react";
import { WeatherDisplayData } from "@/types/apiTypes";

interface WeatherDetailsProps {
  data: WeatherDisplayData;
}

export function WeatherDetails({ data }: WeatherDetailsProps) {
  const { current, sunrise, sunset } = data;

  const details = [
    {
      icon: Sunrise,
      label: "Sunrise",
      value: sunrise,
    },
    {
      icon: Sunset,
      label: "Sunset",
      value: sunset,
    },
    {
      icon: Droplets,
      label: "Humidity",
      value: `${current.humidity}%`,
    },
    {
      icon: Wind,
      label: "Wind Speed",
      value: `${current.windSpeed} km/h`,
    },
    {
      icon: Eye,
      label: "Visibility",
      value: `${current.visibility} km`,
    },
    {
      icon: Gauge,
      label: "Pressure",
      value: `${current.pressure} hPa`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <Card
        className={`p-6 h-full card-bg card-bg-${current.condition.toLowerCase()}`}
      >
        <h3 className="text-xl font-semibold mb-6">Weather Details</h3>
        <div className="space-y-4">
          {details.map((detail, index) => (
            <motion.div
              key={detail.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
              className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-3">
                <detail.icon className="w-5 h-5" />
                <span className="text-sm">{detail.label}</span>
              </div>
              <span className="text-sm font-semibold">{detail.value}</span>
            </motion.div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
